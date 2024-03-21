import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@nemo/common-styles';
import { TestScreen } from '@nemo/common-screens';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TestScreen />
    </ThemeProvider>
  );
};

export default App;
