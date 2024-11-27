import { Button, Col, Form, Input, Row, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { memo, useState } from 'react';
import { editUser } from '../../pages/Users/usersSlice';
import { UserData, UserFormFields } from '../types';
import { useAppDispatch } from '../../redux-hooks';
import { validateFields } from './validation';
import InputWrapper from '../components/InputWrapper';

type UserFormProps = {
  user: UserData;
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
  const [hasError, setHasError] = useState<boolean>(false);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    marginBottom: 30,
  };

  const resetData = () => {
    setUserData(userData);
    form.setFieldsValue(userData);
    setChangesMade(false);
  };

  const inputProps = {
    formStyle,
    isEditing,
    setChangesMade,
    setHasError,
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
    >
      <Row gutter={30}>
        {Object.keys(userData).map((field: string) => {
          return <InputWrapper field={field} {...inputProps} />;
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
          <Button
            type='primary'
            htmlType='submit'
            disabled={!changesMade || hasError}
          >
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
