import { Button, Col, Form, Input, Row, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { memo, useState } from 'react';
import { editUser } from '../../pages/Users/usersSlice';
import { UserData, UserFormFields } from '../types';
import { useAppDispatch } from '../../redux-hooks';

type UserFormProps = {
  user: UserData;
};

const requiredFields = ['username', 'email', 'street', 'suite', 'city'];

const UserForm = memo(({ user }: UserFormProps) => {
  const [form] = Form.useForm();
  const { id, username, email } = user;
  const { street, suite, city } = user.address;
  const fields: UserFormFields = {
    username,
    email,
    street,
    suite,
    city,
  };

  const dispatch = useAppDispatch();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [userData, setUserData] = useState(fields);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    marginBottom: 30,
  };

  const resetData = () => {
    setUserData(userData);
    form.setFieldsValue(userData);
    setIsEditing(false);
    setChangesMade(false);
  };

  return (
    <Form
      name={username}
      form={form}
      initialValues={fields}
      onFinish={(formValues) => {
        const obj = { id, ...formValues };

        dispatch(editUser(obj));
        setIsEditing(false);
        setChangesMade(false);
      }}
      variant={!isEditing ? 'borderless' : 'outlined'}
      style={{ padding: '25px' }}
      onChange={() => setChangesMade(true)}
    >
      <Row gutter={30}>
        {Object.keys(userData).map((field: string) => {
          return (
            <Col span={8} key={field} style={formStyle}>
              <Form.Item
                label={field.replace('_', ' ')}
                name={field}
                layout='vertical'
                rules={[{ required: requiredFields.includes(field) }]}
                style={{ minHeight: '35px' }}
              >
                <Input
                  name={field}
                  style={{ pointerEvents: !isEditing ? 'none' : 'all' }}
                  required={requiredFields.includes(field)}
                />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <div style={{ textAlign: 'right', marginTop: '15px' }}>
        <Space size='small'>
          <Button
            disabled={changesMade}
            onClick={() => setIsEditing(!isEditing)}
            className='btn edit-data'
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button type='primary' htmlType='submit' disabled={!changesMade}>
            Submit
          </Button>
          <Button onClick={resetData} disabled={!changesMade}>
            Revert
          </Button>
          {!params.id && (
            <Link to={`/userPosts/${id}`} className='btn posts-link'>
              See posts
            </Link>
          )}
        </Space>
      </div>
    </Form>
  );
});

export default UserForm;
