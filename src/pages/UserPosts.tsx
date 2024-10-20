import { useParams } from 'react-router-dom';
import { useUserPostsContext } from '../context/context';
import { UserForm, UserPost } from '../components';
import { Flex, Row } from 'antd';

const UserPosts = () => {
  const { userPosts, userData } = useUserPostsContext();
  const { id } = useParams();

  if (!userData.current || !userPosts.current) {
    return <h1>No data</h1>;
  }

  return (
    <Flex vertical>
      <Row align='top' justify='center' style={{ height: '100%', padding: '25px' }}>
        <UserForm user={userData.current as any} />
      </Row>
      <Row align='top' justify='center' style={{ height: '100%', padding: '25px' }}>
        {userPosts.current.map((post: any, index: number) => {
          const { title, body } = post;
          return <UserPost title={title} body={body} id={id} key={`${title}-${index}`} />;
        })}
      </Row>
    </Flex>
  );
};
export default UserPosts;
