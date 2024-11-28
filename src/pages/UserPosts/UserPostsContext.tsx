import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { fetchUsers, selectUserById } from '../Users/usersSlice';
import { useGetUserPosts } from './hooks/useGetUserPosts';
import { UserPostsState, UserPostsProviderProps, UserPost } from './types';
import { useEditUserPost } from './hooks/useEditUserPost';
import { useDeleteUserPost } from './hooks/useDeleteUserPost';

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  const userData = useAppSelector(selectUserById(Number(id)));
  const { userPosts, isLoading } = useGetUserPosts(Number(id));
  const [posts, setPosts] = useState<UserPost[]>(userPosts!);
  const { editPost } = useEditUserPost();
  const { deletePost } = useDeleteUserPost();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userData) {
      dispatch(fetchUsers());
    }
  }, [dispatch, userData]);

  useEffect(() => {
    setPosts(userPosts!);
  }, [userPosts]);

  if (!userData || !posts) return null;

  const onDeleteSuccess = (id?: string) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const onEditSuccess = (data: UserPost) => {
    const newPosts: UserPost[] = posts.map((post) => {
      if (post.id === data.id) {
        post.title = data.title;
        post.body = data.body;
      }
      return post;
    });
    setPosts(newPosts);
  };

  const value = {
    userData,
    posts: posts,
    isLoading,
    deletePost,
    onDeleteSuccess,
    onEditSuccess,
    editPost,
  };

  return (
    <UserPostsContext.Provider value={value}>
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
