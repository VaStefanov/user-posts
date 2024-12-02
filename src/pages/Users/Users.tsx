import { Flex, Row } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import Loading from '../../shared/components/Loading';
import { fetchUsers, selectUsersState } from './usersSlice';
import User from './components/User';
import { useEffect } from 'react';

const Users = () => {
  const { users, isLoading } = useAppSelector(selectUsersState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users.length && isLoading) {
    return <Loading />;
  }

  if (!users.length) {
    return <Row style={{ padding: '10px' }}>No users</Row>;
  }

  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Flex vertical style={{ width: '800px' }}>
        {users.map((user) => {
          return <User user={user} key={user.id} />;
        })}
      </Flex>
    </Row>
  );
};

export default Users;
