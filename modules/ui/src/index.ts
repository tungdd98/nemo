import { createTheme } from '@mui/material/styles';
import { themeOptions } from './constants/theme';

export const theme = createTheme(themeOptions);
export { default as FormTextField } from './components/FormElements/FormTextField';
