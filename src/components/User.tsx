import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';
import UserForm from './UserForm';
import { User as UserType } from '../features/usersSlice';

type UserProps = {
  user: UserType;
};

export type field = {
  for: string;
  value: string;
};

const User = ({ user }: UserProps) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    maxWidth: 'none',
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const getItems = (panelStyle: CSSProperties) => {
    return [
      {
        key: user.id,
        label: user.name,
        children: <UserForm user={user} />,
        style: panelStyle,
      },
    ];
  };
  return (
    <section>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </section>
  );
};
export default User;
