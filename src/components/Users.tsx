import { Flex, Row } from 'antd';
import User from './User';
import { useAppSelector } from '../redux-hooks';
import Loading from './Loading';

const Users = () => {
  const { users, isLoading } = useAppSelector((store) => store.users);

  if (!users.length && isLoading) {
    return <Loading />;
  }

  if (!users.length) {
    return <Row style={{ padding: '10px' }}>No users</Row>;
  }

  return (
    <Flex vertical style={{ width: '800px' }}>
      {users.map((user) => {
        return <User user={user} key={`${user.name}-${user.id}`} />;
      })}
    </Flex>
  );
};

export default Users;
