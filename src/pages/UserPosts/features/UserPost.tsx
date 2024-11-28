import { Card, Form, Row } from 'antd';
import { useState } from 'react';
import { UserPost as UserPostType } from '../types';
import TitleForm from './TitleForm';
import BodyForm from './BodyForm';
import { ConfirmEdit, DeletePost, StartEdit } from '../actions';

const UserPost = ({ title, body, id, userId }: UserPostType) => {
  const [titleText, setTitleText] = useState(title);
  const [bodyText, setBodyText] = useState(body);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const titleProps = {
    form,
    titleText,
    setTitleText,
  };
  const bodyProps = {
    form,
    bodyText,
    setBodyText,
  };

  const confirmEditProps = {
    id,
    userId,
    setIsEditing,
    titleText,
    bodyText,
  };

  const actions: React.ReactNode[] = [
    <StartEdit setIsEditing={setIsEditing} />,
    <ConfirmEdit {...confirmEditProps} />,
    <DeletePost id={id} />,
  ];

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
