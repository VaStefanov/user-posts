import { DeleteOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { Card, Form, Input, Popconfirm, Row } from "antd";
import { useState } from "react";
import customFetch from "../../../utils/axios";
import { UserPosts } from "../types";

const UserPost = ({ title, body, userId, id, handleDeletePost }: UserPosts) => {
  const [titleText, setTitleText] = useState(title);
  const [bodyText, setBodyText] = useState(body);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const titleForm = (
    <Form name={`user_form-${titleText}`} form={form}>
      <Input value={titleText} onChange={(e) => setTitleText(e.target.value)} />
    </Form>
  );

  const bodyForm = (
    <Form name={`user_form-${bodyText}`} form={form}>
      <TextArea
        value={bodyText}
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={(e) => setBodyText(e.target.value)}
      />
    </Form>
  );

  const onEditPost = () => {
    if (!isEditing) return;
    setIsEditing(false);
  };

  const actions: React.ReactNode[] = [
    <EditOutlined key="edit" onClick={() => setIsEditing(true)} />,
    <CheckOutlined key="check" onClick={onEditPost} />,
    <Popconfirm
      title="You will delete this post"
      description="Are you sure to delete this post?"
      onConfirm={() => handleDeletePost(id)}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined key="trash" />
    </Popconfirm>,
  ];

  return (
    <Row style={{ padding: "10px" }}>
      <Card
        title={isEditing ? titleForm : titleText}
        actions={actions}
        style={{ width: 600 }}
      >
        {isEditing ? bodyForm : <p>{bodyText}</p>}
      </Card>
    </Row>
  );
};

export default UserPost;
