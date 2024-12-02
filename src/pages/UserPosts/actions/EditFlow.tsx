import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useUserPostsContext } from '../UserPostsContext';
import { UserPost } from '../types';

type EditFlowProps = {
  updatedPost: UserPost;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditFlow = ({
  updatedPost: post,
  isEditing,
  setIsEditing,
}: EditFlowProps) => {
  const { editPost } = useUserPostsContext();

  const handleEdit = async () => {
    await editPost(post);
    setIsEditing(false);
  };
  return isEditing ? (
    <CheckOutlined key='check' onClick={handleEdit} />
  ) : (
    <EditOutlined key='edit' onClick={() => setIsEditing(true)} />
  );
};

export default EditFlow;
