import { createContext, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { UserData } from "../../shared/types";
import { useAppSelector } from "../../redux-hooks";
import { selectUserById } from "../../shared/slices/usersSlice";
import { UserPosts } from "./types";
import { useGetUserPosts } from "./hooks/useGetUserPosts";

type UserPostsState = {
  userData: UserData;
  userPosts: UserPosts[];
  isLoading: boolean;
};

const UserPostsContext = createContext<UserPostsState | undefined>(undefined);

type UserPostsProviderProps = {
  children: React.ReactNode | JSX.Element;
};

export const UserPostsProvider = ({ children }: UserPostsProviderProps) => {
  const { id } = useParams();
  const userData = useAppSelector(selectUserById(Number(id)));
  const { userPosts, isLoading } = useGetUserPosts(Number(id));

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
    throw new Error("useUserPostsContext must be use within UserPostsProvider");
  }

  return context;
};
