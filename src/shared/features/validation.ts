import { UserFormErrorFields, UserFormFields } from '../types';

export const validateFields = (
  values: UserFormFields,
  setErrors: React.Dispatch<React.SetStateAction<UserFormErrorFields>>
): boolean => {
  let hasErrors = false;
  const obj: UserFormErrorFields = {
    username: false,
    email: false,
    street: false,
    suite: false,
    city: false,
  };
  Object.keys(values).map(
    (value: string) =>
      (obj[value as keyof UserFormErrorFields] =
        values[value as keyof UserFormErrorFields]?.length === 0)
  );
  setErrors(obj);
  if (Object.values(obj).some((value) => value)) {
    hasErrors = true;
  }
  return hasErrors;
};
