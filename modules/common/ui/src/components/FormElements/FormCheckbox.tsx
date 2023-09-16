import React, { FC, memo } from 'react';
import { FormInputProps } from '../../types/form.types';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type FormCheckboxProps = FormInputProps & {
  formControlProps?: FormControlProps;
  checkboxProps?: CheckboxProps;
};

const FormCheckbox: FC<FormCheckboxProps> = ({
  name,
  label,
  control,
  formControlProps,
  checkboxProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl
          component="fieldset"
          variant="standard"
          fullWidth
          {...formControlProps}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={onChange}
                size="small"
                {...checkboxProps}
              />
            }
            label={label}
          />
          {error?.message && (
            <FormHelperText error>{error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default memo(FormCheckbox);
