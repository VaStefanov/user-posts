import { Dispatch, SetStateAction } from 'react';
import { UserData } from '../../shared/types';
import { DeletePostArgs } from './hooks/useDeleteUserPost';
import { EditPostArgs } from './hooks/useEditUserPost';

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
  deletePost: ({ id, onDeleteSuccess }: DeletePostArgs) => void;
  onDeleteSuccess: (id: string) => void;
  onEditSuccess: (data: UserPost) => void;
  editPost: ({
    id,
    userId,
    titleText,
    bodyText,
    onEditSuccess,
  }: EditPostArgs) => void;
};

export type EditUserState = {
  id: string;
  userId: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  titleText: string;
  bodyText: string;
};

export type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};
