import React, { FC, memo } from 'react';
import { FormInputProps, SelectOption } from '@nemo/common-types';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { Controller } from 'react-hook-form';

type FormSelectProps = FormInputProps & {
  selectProps?: SelectProps;
  formControlProps?: FormControlProps;
  options: SelectOption[];
};

const FormSelect: FC<FormSelectProps> = ({
  name,
  label,
  control,
  id,
  selectProps,
  formControlProps,
  options,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl size="small" fullWidth {...formControlProps}>
          {label && <InputLabel id={id ?? name}>{label}</InputLabel>}
          <Select
            labelId={id ?? name}
            value={value}
            label={label}
            onChange={onChange}
            {...selectProps}
          >
            {options.map((item, index) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {error?.message && (
            <FormHelperText error>{error?.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default memo(FormSelect);
