/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormInputProps = {
  name: string;
  control: any;
  label?: string;
  setValue?: any;
  id?: string;
};

export type SelectOption = {
  value: string | number;
  label: string;
};
