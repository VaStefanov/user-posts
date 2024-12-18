import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { CSSProperties } from 'react';
import { UserData } from '../../../shared/types';
import UserForm from '../../../shared/features/UserForm';

type UserProps = {
  user: UserData;
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
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </section>
  );
};

export default User;
