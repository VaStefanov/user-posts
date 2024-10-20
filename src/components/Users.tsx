import { Flex } from 'antd';
import User from './User';
import { useAppSelector } from '../redux-hooks';
import Loading from './Loading';

const Users = () => {
  const { users } = useAppSelector((store) => store.users);

  if (!users) {
    return <Loading />;
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
