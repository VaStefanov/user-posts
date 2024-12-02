import { useCallback, useState } from 'react';
import customFetch from '../../../utils/axios';
import { EditUserState } from '../types';

export type EditPostArgs = {
  post: EditUserState;
  onSuccessfulEdit: (post: EditUserState) => void;
};

export const useEditUserPost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditPost = useCallback(
    async ({ post, onSuccessfulEdit }: EditPostArgs) => {
      const { id, userId, title, body } = post;
      const url = `posts/${id}`;
      setIsLoading(true);
      const requestObj = {
        id,
        userId,
        title,
        body,
      };

      try {
        const { data } = await customFetch.put(url, requestObj);
        onSuccessfulEdit(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { handleEditPost, isLoading };
};
