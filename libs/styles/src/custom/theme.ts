import { ThemeOptions } from '@mui/material/styles';
import { paletteOptions } from './colors';
import { typographyOptions } from './typography';

export const themeOptions: ThemeOptions = {
  palette: paletteOptions,
  typography: typographyOptions,
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'small' && {
            fontSize: '14px',
          }),
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'small' && {
            fontSize: '14px',
          }),
        }),
      },
    },
  },
};
