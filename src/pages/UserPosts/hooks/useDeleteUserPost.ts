import { useCallback, useState } from 'react';
import customFetch from '../../../utils/axios';

export type DeletePostArgs = {
  id: string;
  onSuccessfulPostDelete: (id: string) => void;
};

export const useDeleteUserPost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = useCallback(
    async ({ id, onSuccessfulPostDelete }: DeletePostArgs) => {
      const url = `posts/${id}`;
      setIsLoading(true);
      try {
        await customFetch.delete(url);
        onSuccessfulPostDelete(id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { handleDeletePost, isLoading };
};
