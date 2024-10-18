import { Flex } from 'antd';
import User from './User';
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const Users = () => {
  return (
    <Flex vertical style={{ width: '600px' }}>
      {arr.map((a, index) => (
        <User key={index} />
      ))}
    </Flex>
  );
};
export default Users;
