import { Dispatch, SetStateAction, useState } from 'react';
import customFetch from '../../../utils/axios';
import { UserPost } from '../types';

export type EditPostArgs = {
  id: string;
  userId: string;
  titleText: string;
  bodyText: string;
  onEditSuccess: (data: UserPost) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const useEditUserPost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editPost = async ({
    id,
    titleText,
    bodyText,
    onEditSuccess,
    setIsEditing,
    userId,
  }: EditPostArgs) => {
    const url = `posts/${id}`;
    setIsLoading(true);
    const requestObj = {
      id,
      userId,
      title: titleText,
      body: bodyText,
    };

    try {
      const { data } = await customFetch.put(url, requestObj);
      onEditSuccess(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return { editPost, isLoading };
};
