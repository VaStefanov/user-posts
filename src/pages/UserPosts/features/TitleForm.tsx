import { Input } from 'antd';
import React from 'react';

type TitleFormProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const TitleForm = ({ title, setTitle }: TitleFormProps) => {
  return <Input value={title} onChange={(e) => setTitle(e.target.value)} />;
};

export default TitleForm;
