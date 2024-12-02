import { Card, Form, Row } from 'antd';
import { useState } from 'react';
import TitleForm from './TitleForm';
import BodyForm from './BodyForm';
import { EditFlow, DeletePost } from '../actions';

type UserPostProps = {
  post: {
    userId: string;
    id: string;
    title: string;
    body: string;
  };
};

const UserPost = ({ post }: UserPostProps) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const titleProps = {
    title,
    setTitle,
  };
  const bodyProps = {
    body,
    setBody,
  };

  const updatedPost = {
    id: post.id,
    userId: post.userId,
    title,
    body,
  };

  const editProps = { updatedPost, isEditing, setIsEditing };

  const actions = [<EditFlow {...editProps} />, <DeletePost id={post.id} />];

  return (
    <Row style={{ padding: '10px' }}>
      <Form form={form}>
        <Card
          title={isEditing ? <TitleForm {...titleProps} /> : post.title}
          actions={actions}
          style={{ width: 600 }}
        >
          {isEditing ? <BodyForm {...bodyProps} /> : post.body}
        </Card>
      </Form>
    </Row>
  );
};

export default UserPost;
