import { Card, Form, Row } from 'antd';
import { useState } from 'react';
import { UserPosts } from '../types';
import TitleForm from './TitleForm';
import BodyForm from './BodyForm';
import { ConfirmEdit, DeletePost, StartEdit } from '../actions';

const UserPost = ({ title, body, id, handleDeletePost, userId }: UserPosts) => {
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
    setTitleText,
    setBodyText,
    id,
    isEditing,
    userId,
    setIsEditing,
    titleText,
    bodyText,
  };

  const actions: React.ReactNode[] = [
    <StartEdit setIsEditing={setIsEditing} />,
    <ConfirmEdit {...confirmEditProps} />,
    <DeletePost handleDeletePost={handleDeletePost} id={id} />,
  ];

  return (
    <Row style={{ padding: '10px' }}>
      <Card
        title={isEditing ? <TitleForm {...titleProps} /> : titleText}
        actions={actions}
        style={{ width: 600 }}
      >
        {isEditing ? <BodyForm {...bodyProps} /> : <p>{bodyText}</p>}
      </Card>
    </Row>
  );
};

export default UserPost;
