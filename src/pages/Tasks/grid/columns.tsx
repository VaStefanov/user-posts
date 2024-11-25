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
    render: (a: boolean) => (
      <Switch defaultChecked={a} onChange={(e) => console.log(a)} />
    ),
  },
];
