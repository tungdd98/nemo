import { createTheme } from '@mui/material/styles';
import { themeOptions } from './constants/theme';

export const theme = createTheme(themeOptions);
export { default as FormTextField } from './components/FormElements/FormTextField';
export { default as FormSelect } from './components/FormElements/FormSelect';
export { default as FormCheckbox } from './components/FormElements/FormCheckbox';
