import { CheckOutlined } from '@ant-design/icons';
import customFetch from '../../../utils/axios';
import { PostInput } from '../types';

const ConfirmEdit = ({
  setTitleText,
  setBodyText,
  id,
  isEditing,
  userId,
  setIsEditing,
  titleText,
  bodyText,
}: any) => {
  const onEditPost = async (id: string, input: PostInput) => {
    if (!isEditing) return;
    const url = `posts?userId=${id}`;
    const requestObj = {
      id,
      userId,
      title: input.titleText,
      body: input.bodyText,
    };
    try {
      const { data } = await customFetch.post(url, requestObj);

      setTitleText(data.title);
      setBodyText(data.body);
    } catch (error) {}
    setIsEditing(false);
  };
  return (
    <CheckOutlined
      key='check'
      onClick={() => onEditPost(id, { titleText, bodyText })}
    />
  );
};

export default ConfirmEdit;
