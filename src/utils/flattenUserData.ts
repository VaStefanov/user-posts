import { UserFormFields } from '../shared/types';

export const flattenUserData = (obj: Record<string, any>): UserFormFields => {
  console.log('called');

  return Object.keys(obj).reduce((acc: any, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenUserData(obj[key]));
    } else {
      if (key === 'name' && Object.keys(acc).length === 0) {
        const companyName = 'company_name';
        acc[companyName] = obj[key];
        return acc;
      }
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
