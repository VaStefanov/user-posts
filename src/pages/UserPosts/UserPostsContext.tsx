import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { fetchUsers, selectUserById } from '../Users/usersSlice';
import { useGetUserPosts } from './hooks/useGetUserPosts';
import {
  UserPostsState,
  UserPostsProviderProps,
  UserPost,
  EditUserState,
} from './types';
import { useEditUserPost } from './hooks/useEditUserPost';
import { useDeleteUserPost } from './hooks/useDeleteUserPost';

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  const userData = useAppSelector(selectUserById(Number(id)));
  const { userPosts, isLoading } = useGetUserPosts(Number(id));
  const [posts, setPosts] = useState<UserPost[]>(userPosts!);
  const { handleEditPost } = useEditUserPost();
  const { handleDeletePost } = useDeleteUserPost();

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

  const editPost = async (post: EditUserState) => {
    await handleEditPost({ post, onSuccessfulEdit });
  };

  const onSuccessfulEdit = (data: EditUserState) => {
    const newPosts: UserPost[] = posts.map((post) => {
      if (post.id === data.id) {
        post.title = data.title;
        post.body = data.body;
      }
      return post;
    });
    setPosts(newPosts);
  };

  const deletePost = async (id: string) => {
    await handleDeletePost({ id, onSuccessfulPostDelete });
  };

  const onSuccessfulPostDelete = (id: string) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const value = {
    userData,
    posts,
    isLoading,
    deletePost,
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
