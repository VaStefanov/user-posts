import { Link, useParams } from 'react-router-dom';
import { useUserPostsContext } from '../context/context';
import { UserForm, UserPost } from '../components';
import { Flex, Row, theme } from 'antd';
import Loading from '../components/Loading';
import Error from './Error';

const UserPosts = () => {
  const { userPosts, userData, isLoading } = useUserPostsContext();
  const { token } = theme.useToken();

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <Error />;
  }

  const noUserPosts = <Row style={{ padding: '10px' }}>User has no posts</Row>;

  return (
    <Row align='middle' justify='center'>
      <Flex vertical style={{ width: '800px' }}>
        <Link to='/' className='btn back' style={{ display: 'flex', alignSelf: 'flex-end' }}>
          Back
        </Link>
        <Row align='top' justify='center' style={{ height: '100%', padding: '25px', backgroundColor: token.colorFillAlter }}>
          <UserForm user={userData} />
        </Row>
        <Row align='top' justify='center' style={{ height: '100%', padding: '25px' }}>
          {userPosts.length === 0
            ? noUserPosts
            : userPosts.map((post, index) => {
                const { title, body, id, userId } = post;
                return <UserPost title={title} body={body} userId={userId} id={id} key={`${title}-${index}`} />;
              })}
        </Row>
      </Flex>
    </Row>
  );
};

export default UserPosts;
