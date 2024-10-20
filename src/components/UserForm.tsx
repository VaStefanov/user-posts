import { Button, Col, Form, Input, Row, Space, theme } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { User } from '../features/usersSlice';
import { flatten } from '../utils/flatten';

type UserFormProps = {
  user: User;
};

const requiredFields = ['user_name', 'email', 'street', 'suite', 'city'];

const UserForm = (props: UserFormProps) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { id } = props.user;
  const params = useParams();
  const userFields = flatten(props.user);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(userFields);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
    marginBottom: 30,
  };

  const resetData = () => {
    setUserData(userFields);
    form.setFieldsValue(userFields);
    setIsEditing(false);
  };

  return (
    <Form
      name={`user_form-${userData.name}`}
      form={form}
      initialValues={userFields}
      onFinish={() => setIsEditing(false)}
      variant={!isEditing ? 'borderless' : 'outlined'}
      style={{ padding: '25px' }}
    >
      <Row gutter={30}>
        {Object.keys(userFields).map((field) => {
          if (field === 'id') {
            return null;
          }
          return (
            <Col span={8} key={`${userFields[field]}-${id}`} style={formStyle}>
              <Form.Item label={field.includes('_') ? field.replace('_', ' ') : field} name={field} layout='vertical'>
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
