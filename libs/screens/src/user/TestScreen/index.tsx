import React, { FC, memo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Container, Typography } from '@mui/material';
import { FormTextField } from '@nemo/common-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  cart: {
    name: string;
  }[];
};

const schema = yup.object().shape({
  cart: yup
    .array()
    .required()
    .of(
      yup.object().shape({ name: yup.string().required('Name is required') })
    ),
});

const TestScreen: FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { cart: [{ name: '' }] },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'cart',
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Container>
      <Typography sx={{ mb: 2 }} variant="h4">
        React Hook Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box mb={2}>
            <FormTextField
              key={field.id}
              name={`cart.${index}.name`}
              control={control}
              label={`Product ${index + 1}`}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          type="button"
          onClick={() => append({ name: '' })}
        >
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export default memo(TestScreen);
