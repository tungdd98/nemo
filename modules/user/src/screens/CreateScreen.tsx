import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormValues } from '../types/user.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormCheckbox, FormSelect, FormTextField } from '@nemo/ui';

const schema = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
  agree: yup.boolean().required(),
});

const CreateScreen: FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
      age: '',
      agree: false,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Box maxWidth={500} p={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          control={control}
          name="name"
          label="Name"
          textFieldProps={{ sx: { mb: 2 } }}
        />
        <FormSelect
          control={control}
          name="age"
          label="Age"
          options={[
            { value: '10', label: 'Ten' },
            { value: '20', label: 'Twenty' },
          ]}
          formControlProps={{ sx: { mb: 2 } }}
        />
        <FormCheckbox
          name="agree"
          control={control}
          label="Agree"
          formControlProps={{ sx: { mb: 2 } }}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateScreen;
