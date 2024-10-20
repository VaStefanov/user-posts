export const flatten = (obj: any) => {
  return Object.keys(obj).reduce((acc: any, k) => {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flatten(obj[k]));
    } else {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
};
