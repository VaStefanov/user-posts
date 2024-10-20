export type Post = {
  userId?: number;
  id: number | string | undefined;
  title: string;
  body: string;
};

export type UserFormFields = {
  id: number;
  mainName: string;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
  phone: string;
  website: string;
  companyName: string;
  catchPhrase: string;
  bs: string;
};
