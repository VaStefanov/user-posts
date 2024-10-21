import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import customFetch from '../utils/axios';
import { UserData } from '../features/usersSlice';
import { Post } from './types';

type UserPostsState = {
  userData: UserData;
  userPosts: Post[];
  deletePost: (id: string) => void;
  isLoading: boolean;
};

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(true);

  useEffect(() => {
    customFetch(`users/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsUserDataLoading(false));
  }, [id]);

  useEffect(() => {
    customFetch(`posts?userId=${id}`)
      .then((res) => setUserPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsUserPostsLoading(false));
  }, [id]);

  const deletePost = (id: string): void => {
    customFetch.delete(`posts/${id}`);
    const newUserPosts = userPosts?.filter((post: Post) => post.id !== +id);
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
