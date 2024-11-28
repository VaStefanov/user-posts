import { Button, Form, Row, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { memo, useState } from 'react';
import { editUser } from '../../pages/Users/usersSlice';
import { UserData, UserFormErrorFields, UserFormFields } from '../types';
import { useAppDispatch } from '../../redux-hooks';
import InputWrapper from '../components/InputWrapper';
import { validateFields } from './validation';

type UserFormProps = {
  user: UserData;
};

const initialErrorState = {
  username: false,
  email: false,
  street: false,
  suite: false,
  city: false,
};

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
  const [errors, setErrors] = useState<UserFormErrorFields>(initialErrorState);

  const resetData = () => {
    setUserData(fields);
    form.setFieldsValue(fields);
    setErrors(initialErrorState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChangesMade(true);
    setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = () => {
    const validateResult = validateFields(userData, setErrors);
    if (validateResult) return;
    const obj = { id, userData };
    dispatch(editUser(obj));
    setIsEditing(false);
    setChangesMade(false);
  };

  const inputProps = {
    isEditing,
    handleChange,
  };

  return (
    <Form
      name={username}
      form={form}
      initialValues={fields}
      onFinish={handleSubmit}
      variant={!isEditing ? 'borderless' : 'outlined'}
      style={{ padding: '25px' }}
    >
      <Row gutter={30}>
        {Object.keys(userData).map((field: string) => {
          return (
            <InputWrapper
              key={field}
              field={field}
              error={errors[field as keyof UserFormErrorFields]}
              {...inputProps}
            />
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
