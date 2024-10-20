import { Link, useParams } from 'react-router-dom';
import { useUserPostsContext } from '../context/context';
import { UserForm, UserPost } from '../components';
import { Flex, Row, theme } from 'antd';
import Loading from '../components/Loading';
import Error from './Error';

const UserPosts = () => {
  const { userPosts, userData, isLoading } = useUserPostsContext();
  const { id } = useParams();
  const { token } = theme.useToken();

  if (isLoading) {
    return <Loading />;
  }

  if (!userData || !userPosts) {
    return <Error />;
  }

  return (
    <Flex vertical>
      <Link to='/' className='btn back' style={{ display: 'flex', alignSelf: 'flex-end' }}>
        Back
      </Link>
      <Row align='top' justify='center' style={{ height: '100%', padding: '25px', backgroundColor: token.colorFillAlter }}>
        <UserForm user={userData as any} />
      </Row>
      <Row align='top' justify='center' style={{ height: '100%', padding: '25px' }}>
        {userPosts.map((post: any, index: number) => {
          const { title, body } = post;
          return <UserPost title={title} body={body} id={id} key={`${title}-${index}`} />;
        })}
      </Row>
    </Flex>
  );
};
export default UserPosts;
