import { UserData } from '../../shared/types';

export type UserPost = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

export type PostInput = {
  titleText: string;
  bodyText: string;
};

export type UserPostsState = {
  userData: UserData;
  posts: UserPost[];
  isLoading: boolean;
  deletePost: (id: string) => void;
  editPost: (post: EditUserState) => void;
};

export type EditUserState = {
  id: string;
  userId: string;
  title: string;
  body: string;
};

export type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};
