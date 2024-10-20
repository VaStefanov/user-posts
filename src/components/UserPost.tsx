import { Card, Form, Input, Popconfirm, Row } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import customFetch from '../utils/axios';
import { useUserPostsContext } from '../context/context';
import { Post } from '../context/types';

const UserPost = ({ title, body, userId, id }: Post) => {
  const [titleText, setTitleText] = useState(title);
  const [bodyText, setBodyText] = useState(body);
  const [isEditing, setIsEditing] = useState(false);
  const { deletePost } = useUserPostsContext();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const titleForm = (
    <Form name={`user_form-${titleText}`} form={form}>
      <Input value={titleText} onChange={(e) => setTitleText(e.target.value)} />
    </Form>
  );

  const bodyForm = (
    <Form name={`user_form-${bodyText}`} form={form}>
      <TextArea value={bodyText} autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => setBodyText(e.target.value)} />
    </Form>
  );

  const onEditPost = () => {
    customFetch
      .put(`posts/${userId}`, {
        id,
        title: titleText,
        body: bodyText,
        userId: userId,
      })
      .then((response) => setBodyText(response.data.body))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsEditing(false));
  };

  const onDeletePost = () => {
    deletePost(id as string);
  };

  const actions: React.ReactNode[] = [
    <EditOutlined key='edit' onClick={() => setIsEditing(true)} />,
    <CheckOutlined key='check' onClick={onEditPost} />,
    <Popconfirm
      title='You will delete this post'
      description='Are you sure to delete this post?'
      onConfirm={onDeletePost}
      okText='Yes'
      cancelText='No'
    >
      <DeleteOutlined key='trash' />
    </Popconfirm>,
  ];

  return (
    <Row style={{ padding: '10px' }}>
      <Card title={isEditing ? titleForm : titleText} actions={actions} style={{ width: 600 }}>
        {isEditing ? bodyForm : <p>{bodyText}</p>}
      </Card>
    </Row>
  );
};

export default UserPost;
