import * as yup from 'yup';

export const userFormSchema = yup.object({
  name: yup.string().required(),
  age: yup.string().required(),
});
