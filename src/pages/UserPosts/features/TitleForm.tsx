import { FormInstance, Input } from 'antd';
import React from 'react';

type TitleFormProps = {
  form: FormInstance;
  titleText: string;
  setTitleText: React.Dispatch<React.SetStateAction<string>>;
};

const TitleForm = ({ titleText, setTitleText }: TitleFormProps) => {
  return (
    <Input value={titleText} onChange={(e) => setTitleText(e.target.value)} />
  );
};

export default TitleForm;
