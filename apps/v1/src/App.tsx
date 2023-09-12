import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@nemo/ui';
import { Box, Button } from '@mui/material';
import { FormTextField } from '@nemo/ui';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
  name: string;
};

const schema = yup.object({
  name: yup.string().required(),
});

const App: FC = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    alert(data.name);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Form */}
      <Box maxWidth={500} p={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <FormTextField control={control} name="name" label="Name" />
          </Box>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default App;
