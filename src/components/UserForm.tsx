import { Button, Col, Form, Input, Row, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { editUser, UserData } from '../features/usersSlice';
import { flattenUserData } from '../utils/flattenUserData';
import { UserFormFields } from '../context/types';
import { useAppDispatch } from '../redux-hooks';

type UserFormProps = {
  user: UserData;
};

const requiredFields = ['username', 'email', 'street', 'suite', 'city'];

const UserForm = ({ user }: UserFormProps) => {
  const [form] = Form.useForm();
  const { id } = user;
  const dispatch = useAppDispatch();
  const params = useParams();
  const userFields: UserFormFields = flattenUserData(user);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(userFields);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    marginBottom: 30,
  };

  const resetData = () => {
    setUserData(userData);
    form.setFieldsValue(userData);
    setIsEditing(false);
  };

  return (
    <Form
      name={`user_form-${userData.username}`}
      form={form}
      initialValues={userFields}
      onFinish={(formValues) => {
        const obj = { id, ...formValues };

        dispatch(editUser(obj));
        setIsEditing(false);
      }}
      variant={!isEditing ? 'borderless' : 'outlined'}
      style={{ padding: '25px' }}
    >
      <Row gutter={30}>
        {Object.keys(userData).map((field: string) => {
          if (field === 'id') {
            return null;
          }
          return (
            <Col span={8} key={`${userData[field as keyof UserFormFields]}-${id}`} style={formStyle}>
              <Form.Item label={field.replace('_', ' ')} name={field} layout='vertical'>
                <Input name={field} style={{ pointerEvents: !isEditing ? 'none' : 'all' }} required={requiredFields.includes(field)} />
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <div style={{ textAlign: 'right', marginTop: '15px' }}>
        <Space size='small'>
          <Button htmlType='submit' disabled={isEditing} onClick={() => setIsEditing(true)} className='btn edit-data'>
            Edit
          </Button>
          <Button type='primary' htmlType='submit' disabled={!isEditing}>
            Submit
          </Button>
          <Button onClick={resetData} disabled={!isEditing}>
            Revert
          </Button>
          {!params.id && (
            <Link to={`/${id}`} className='btn posts-link'>
              See posts
            </Link>
          )}
        </Space>
      </div>
    </Form>
  );
};

export default UserForm;
