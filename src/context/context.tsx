import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import customFetch from '../utils/axios';

type UserPostsState = {
  userData: any;
  userPosts: any;
  deletePost: any;
  isLoading: boolean;
};

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id }: any = useParams();
  const [userData, setUserData] = useState();
  const [userPosts, setUserPosts] = useState<any>();
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(true);

  useEffect(() => {
    customFetch(`users/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsUserDataLoading(false));
  }, []);

  useEffect(() => {
    customFetch(`posts?userId=${id}`)
      .then((res) => setUserPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsUserPostsLoading(false));
  }, []);

  const deletePost = (id: any) => {
    const newUserPosts = userPosts.filter((post: any) => post.id !== +id);
    setUserPosts(newUserPosts);
  };

  return (
    <UserPostsContext.Provider value={{ userData, userPosts, deletePost, isLoading: isUserDataLoading || isUserPostsLoading }}>
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
