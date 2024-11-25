export type UserPosts = {
  userId?: string;
  id: string;
  title: string;
  body: string;
  handleDeletePost: (id: string) => void;
};
