import { UserData } from '../../shared/types';

export type UsersState = {
  isLoading: boolean;
  isUsersFetched: boolean;
  isUserDataFetched: boolean;
  error: string;
  users: UserData[];
  userData: UserData | null;
};
