import { createContext, useContext } from 'react';
import useAxios from '../utils/useAxios';
import { useParams } from 'react-router';

type UserPostsState = {
  userData: any;
  userPosts: any;
  isLoading: boolean;
};

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  
  const userData = useAxios(`users/${id}`);
  const userPosts = useAxios(`posts?userId=${id}`);
  return (
    <UserPostsContext.Provider value={{ userData, userPosts, isLoading: userData.loading || userPosts.loading }}>
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
