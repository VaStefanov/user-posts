import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { useUserPostsContext } from '../UserPostsContext';

type DeletePostProps = {
  id: string;
};

const DeletePost = ({ id }: DeletePostProps) => {
  const { deletePost, onDeleteSuccess } = useUserPostsContext();
  return (
    <Popconfirm
      title='You will delete this post'
      description='Are you sure to delete this post?'
      onConfirm={() => deletePost({ id, onDeleteSuccess })}
      okText='Yes'
      cancelText='No'
    >
      <DeleteOutlined key='trash' />
    </Popconfirm>
  );
};

export default DeletePost;
