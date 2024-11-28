import { CheckOutlined } from '@ant-design/icons';
import { useUserPostsContext } from '../UserPostsContext';
import { EditUserState } from '../types';

const ConfirmEdit = ({
  id,
  userId,
  setIsEditing,
  titleText,
  bodyText,
}: EditUserState) => {
  const { editPost, onEditSuccess } = useUserPostsContext();

  return (
    <CheckOutlined
      key='check'
      onClick={() =>
        editPost({
          id,
          titleText,
          bodyText,
          onEditSuccess,
          userId,
          setIsEditing,
        })
      }
    />
  );
};

export default ConfirmEdit;
