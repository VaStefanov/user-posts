import { Flex } from 'antd';
import User from './User';
import { useAppSelector } from '../redux-hooks';

const Users = () => {
  const { users } = useAppSelector((store) => store.users);
  if (!users) {
    return <h1>No users</h1>;
  }

  return (
    <Flex vertical style={{ width: '800px' }}>
      {users.map((user) => {
        return <User user={user} />;
      })}
    </Flex>
  );
};
export default Users;
