import { Switch } from 'antd';

export const getColumns = () => [
  {
    dataIndex: 'userId',
    title: 'Owner',
  },
  {
    dataIndex: 'id',
    title: 'id',
  },
  {
    dataIndex: 'title',
    title: 'title',
  },
  {
    dataIndex: 'completed',
    title: 'completed',
    render: (value: boolean) => <Switch defaultChecked={value} />,
  },
];
