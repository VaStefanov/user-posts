import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";

export const useGetUserPosts = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState(null);
  useEffect(() => {
    const url = `posts?userId=${id}`;
    setIsLoading(true);

    const fetchUserPosts = async () => {
      try {
        const { data } = await customFetch.get(url);
        setUserPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [id]);

  return { userPosts, setUserPosts, isLoading };
};
