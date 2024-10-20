import { UserFormFields } from '../context/types';

export const flatten = (obj: Record<string, any>): UserFormFields => {
  return Object.keys(obj).reduce((acc: any, k) => {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flatten(obj[k]));
    } else {
      acc[k] = obj[k];
      if (k === 'username') {
        k = 'user_name';
      }
    }
    return acc;
  }, {});
};
