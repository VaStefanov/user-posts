import { createBrowserRouter } from 'react-router-dom';
import { Landing, Error, UserPosts } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/:id',
    element: <UserPosts />,
    errorElement: <Error />,
  },
]);
