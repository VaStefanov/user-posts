export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserFormFields = {
  id?: number;
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
};

export type UserFormErrorFields = {
  username: boolean;
  email: boolean;
  street: boolean;
  suite: boolean;
  city: boolean;
};
