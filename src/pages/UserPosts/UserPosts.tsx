import { Link } from 'react-router-dom';
import { Flex, Row, theme } from 'antd';
import { useUserPostsContext } from './UserPostsContext';
import UserForm from '../../shared/features/UserForm';
import Loading from '../../shared/components/Loading';
import UserPost from './features/UserPost';
import Error from '../Error/Error';
import { useState } from 'react';
import customFetch from '../../utils/axios';

const UserPosts = () => {
  const { userPosts, userData, isLoading } = useUserPostsContext();
  const [posts, setPosts] = useState(userPosts);
  const { token } = theme.useToken();

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <Error />;
  }

  const noUserPosts = <Row style={{ padding: '10px' }}>User has no posts</Row>;

  const handleDeletePost = async (id: string) => {
    const url = `posts/${id}`;
    try {
      const { data } = await customFetch.delete(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <Row align='middle' justify='center'>
      <Flex vertical style={{ width: '800px' }}>
        <Link
          to='/'
          className='btn back'
          style={{ display: 'flex', alignSelf: 'flex-end' }}
        >
          Back
        </Link>
        <Row
          align='top'
          justify='center'
          style={{
            height: '100%',
            padding: '25px',
            backgroundColor: token.colorFillAlter,
          }}
        >
          <UserForm user={userData} />
        </Row>
        <Row
          align='top'
          justify='center'
          style={{ height: '100%', padding: '25px' }}
        >
          {posts.length === 0
            ? noUserPosts
            : posts.map((post) => {
                return (
                  <UserPost
                    {...post}
                    key={post.id}
                    handleDeletePost={handleDeletePost}
                  />
                );
              })}
        </Row>
      </Flex>
    </Row>
  );
};

export default UserPosts;
