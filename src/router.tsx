import { createBrowserRouter } from 'react-router-dom';
import { UserPostsProvider } from './pages/UserPosts/UserPostsContext';
import Users from './pages/Users/Users';
import Error from './pages/Error/Error';
import UserPosts from './pages/UserPosts/UserPosts';
import Tasks from './pages/Tasks/Tasks';
import { TasksProvider } from './pages/Tasks/TasksContext';
import HeaderLayout from './shared/components/HeaderLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HeaderLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Users />,
        errorElement: <Error />,
      },
      {
        path: 'userPosts/:id',
        element: (
          <UserPostsProvider>
            <UserPosts />
          </UserPostsProvider>
        ),
        errorElement: <Error />,
      },
      {
        path: 'tasks',
        element: (
          <TasksProvider>
            <Tasks />
          </TasksProvider>
        ),
        errorElement: <Error />,
      },
    ],
  },

  {
    path: '*',
    element: <Error />,
  },
]);
