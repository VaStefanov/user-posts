import { createContext, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { fetchUsers, selectUserById } from '../Users/usersSlice';
import { useGetUserPosts } from './hooks/useGetUserPosts';
import { UserPostsState, UserPostsProviderProps } from './types';

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  const userData = useAppSelector(selectUserById(Number(id)));
  const { userPosts, isLoading } = useGetUserPosts(Number(id));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userData]);

  if (!userData || !userPosts) return null;

  return (
    <UserPostsContext.Provider
      value={{
        userData,
        userPosts,
        isLoading,
      }}
    >
      {children}
    </UserPostsContext.Provider>
  );
};

export const useUserPostsContext = () => {
  const context = useContext(UserPostsContext);

  if (context === undefined) {
    throw new Error('useUserPostsContext must be use within UserPostsProvider');
  }

  return context;
};
