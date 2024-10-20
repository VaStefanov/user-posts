import { createBrowserRouter } from 'react-router-dom';
import { Landing, Error, UserPosts } from './pages';
import { UserPostsProvider } from './context/context';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/:id',
    element: (
      <UserPostsProvider>
        <UserPosts />
      </UserPostsProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: '/error',
    element: <Error />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);
