import { useState } from 'react';
import customFetch from '../../../utils/axios';

export type DeletePostArgs = {
  id: string;
  onDeleteSuccess: (id: string) => void;
};

export const useDeleteUserPost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deletePost = async ({ id, onDeleteSuccess }: DeletePostArgs) => {
    const url = `posts/${id}`;
    setIsLoading(true);
    try {
      await customFetch.delete(url);
      onDeleteSuccess(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deletePost, isLoading };
};
