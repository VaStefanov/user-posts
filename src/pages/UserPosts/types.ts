import { UserData } from '../../shared/types';

export type UserPosts = {
  userId?: string;
  id: string;
  title: string;
  body: string;
  handleDeletePost: (id: string) => void;
};

export type PostInput = {
  titleText: string;
  bodyText: string;
};

export type UserPostsState = {
  userData: UserData;
  userPosts: UserPosts[];
  isLoading: boolean;
};

export type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};
