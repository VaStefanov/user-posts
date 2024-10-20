import { Row } from 'antd';
import { Users } from '../components';
import { useEffect } from 'react';
import { getAllUsers } from '../features/usersSlice';
import { useAppDispatch } from '../redux-hooks';

const Landing = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Users />
    </Row>
  );
};
export default Landing;
