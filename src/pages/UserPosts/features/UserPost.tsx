import { Card, Form, Row } from 'antd';
import { useState } from 'react';
import { UserPost as UserPostType } from '../types';
import TitleForm from './TitleForm';
import BodyForm from './BodyForm';
import { EditFlow, DeletePost } from '../actions';

const UserPost = ({
  title: titleText,
  body: bodyText,
  id,
  userId,
}: UserPostType) => {
  const [title, setTitle] = useState(titleText);
  const [body, setBody] = useState(bodyText);
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

  const post = {
    id,
    userId,
    title,
    body,
  };

  const editProps = { post, isEditing, setIsEditing };

  const actions = [<EditFlow {...editProps} />, <DeletePost id={id} />];

  return (
    <Row style={{ padding: '10px' }}>
      <Form form={form}>
        <Card
          title={isEditing ? <TitleForm {...titleProps} /> : titleText}
          actions={actions}
          style={{ width: 600 }}
        >
          {isEditing ? <BodyForm {...bodyProps} /> : bodyText}
        </Card>
      </Form>
    </Row>
  );
};

export default UserPost;
