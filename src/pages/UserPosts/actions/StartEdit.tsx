import { EditOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction } from 'react';

type StartEditProps = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const StartEdit = ({ setIsEditing }: StartEditProps) => {
  return <EditOutlined key='edit' onClick={() => setIsEditing(true)} />;
};

export default StartEdit;
