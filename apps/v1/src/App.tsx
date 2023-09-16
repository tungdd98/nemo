import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@nemo/ui';
import { CreateScreen as UserCreateScreen } from '@nemo/user';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <UserCreateScreen />
    </ThemeProvider>
  );
};

export default App;
