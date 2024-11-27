import { Layout, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header } = Layout;

const HeaderLayout = () => {
  const { token } = theme.useToken();
  const { pathname } = useLocation();

  return (
    <>
      <Layout
        style={{
          marginBottom: '35px',
        }}
      >
        <Header
          style={{
            display: 'flex',
            justifyContent: 'end',
            backgroundColor: token.colorFillAlter,
          }}
        >
          <Link
            to={pathname.includes('tasks') ? '/' : '/tasks'}
            className='btn back'
            style={{ display: 'flex', alignSelf: 'flex-end' }}
          >
            {pathname.includes('tasks') ? 'Users' : 'Tasks'}
          </Link>
        </Header>
      </Layout>
      <Outlet />
    </>
  );
};

export default HeaderLayout;
