import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { User, UserFormValues, UserSearchParams } from '@nemo/common-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextField, Loader } from '@nemo/common-components';
import {
  USER_DEFAULT_PAGINATION,
  USER_FORM_DEFAULT_VALUES,
} from '@nemo/common-constants';
import { formatDate, userFormSchema } from '@nemo/common-helpers';
import {
  createUser,
  deleteUser,
  updateUser,
  useAppDispatch,
  useAppSelector,
} from '@nemo/common-redux';
import { getUsers } from '@nemo/common-redux';
import { useQueryState } from '@nemo/common-hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { DeleteRounded, EditRounded } from '@mui/icons-material';

const CreateScreen: FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  const [queries, setQueries] = useQueryState<UserSearchParams>(
    USER_DEFAULT_PAGINATION
  );
  const [loading, setLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: USER_FORM_DEFAULT_VALUES,
    mode: 'onChange',
    resolver: yupResolver(userFormSchema),
  });

  const handleGetUsers = useCallback(
    (newQueries: UserSearchParams) => {
      setLoading(true);
      setQueries(newQueries);
      dispatch(getUsers(newQueries)).finally(() => setLoading(false));
    },
    [dispatch, setQueries]
  );

  const onSubmit = async (values: UserFormValues) => {
    const data = {
      name: values.name,
      age: Number(values.age),
    };

    if (selectedUser) {
      return dispatch(
        updateUser({
          id: selectedUser.id,
          data,
        })
      )
        .then(unwrapResult)
        .then(() => {
          handleCloseFormDialog();
          handleGetUsers(USER_DEFAULT_PAGINATION);
        });
    }

    return dispatch(createUser(data))
      .then(unwrapResult)
      .then(() => {
        handleCloseFormDialog();
        handleGetUsers(USER_DEFAULT_PAGINATION);
      });
  };

  const handleOpenFormDialog = () => {
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setQueries({
      ...queries,
      page: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueries({
      page: USER_DEFAULT_PAGINATION.page,
      limit: parseInt(event.target.value, 10),
    });
  };

  const handleSelectRowEdit = (data: User) => {
    setOpenFormDialog(true);
    setSelectedUser(data);
  };

  const handleSelectRowDelete = (data: User) => {
    setOpenDeleteDialog(true);
    setSelectedUser(data);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setIsDeleting(true);
      dispatch(deleteUser(selectedUser.id))
        .then(unwrapResult)
        .finally(() => {
          setIsDeleting(false);
          setOpenDeleteDialog(false);
          handleGetUsers(USER_DEFAULT_PAGINATION);
        });
    }
  };

  useEffect(() => {
    if (!isFirstLoading) {
      return;
    }

    dispatch(getUsers(queries)).finally(() => {
      setIsFirstLoading(false);
    });
  }, [dispatch, isFirstLoading, queries]);

  useEffect(() => {
    if (selectedUser) {
      setValue('name', selectedUser.name);
      setValue('age', selectedUser.age.toString());
    }
  }, [selectedUser, setValue]);

  useEffect(() => {
    if (!openFormDialog) {
      reset(USER_FORM_DEFAULT_VALUES);
    }
  }, [openFormDialog, reset]);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        <Typography variant="h4">User Manager</Typography>
        <Button variant="contained" onClick={handleOpenFormDialog}>
          Add new
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ minHeight: 200, position: 'relative' }}
      >
        {loading && <Loader hasBackdrop />}
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="info"
                    onClick={() => handleSelectRowEdit(item)}
                  >
                    <EditRounded />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleSelectRowDelete(item)}
                  >
                    <DeleteRounded />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // TODO: Fake count data
          count={100}
          rowsPerPage={Number(queries.limit)}
          page={Number(queries.page) - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Form Dialog */}
      <Dialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        maxWidth="md"
        fullWidth
        keepMounted
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {selectedUser
              ? `Edit user with ID ${selectedUser.id}`
              : 'Create User'}
          </DialogTitle>
          <DialogContent>
            <FormTextField
              control={control}
              name="name"
              label="Name"
              textFieldProps={{ sx: { mb: 2, mt: 3 } }}
            />
            <FormTextField
              control={control}
              name="age"
              label="Age"
              textFieldProps={{ sx: { mb: 2, mt: 3 }, type: 'number' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFormDialog}>Cancel</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confirm delete dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        keepMounted
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Do you want delete user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
          <Button onClick={handleDeleteUser} autoFocus disabled={isDeleting}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateScreen;
