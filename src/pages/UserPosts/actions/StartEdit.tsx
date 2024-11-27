import { EditOutlined } from '@ant-design/icons';

const StartEdit = ({ setIsEditing }: any) => {
  return <EditOutlined key='edit' onClick={() => setIsEditing(true)} />;
};

export default StartEdit;
