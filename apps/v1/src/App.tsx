import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button } from '@mui/material';
import { FormTextField, FormSelect, FormCheckbox, theme } from '@nemo/ui';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  name: string;
  age: string;
  agree: boolean;
};

const schema = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
  agree: yup.boolean().required(),
});

const App: FC = () => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Form */}
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
    </ThemeProvider>
  );
};

export default App;
