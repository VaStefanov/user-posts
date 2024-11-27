import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

const DeletePost = ({ handleDeletePost, id }: any) => {
  return (
    <Popconfirm
      title='You will delete this post'
      description='Are you sure to delete this post?'
      onConfirm={() => handleDeletePost(id)}
      okText='Yes'
      cancelText='No'
    >
      <DeleteOutlined key='trash' />
    </Popconfirm>
  );
};

export default DeletePost;
