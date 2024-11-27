import { Form, FormInstance, Input } from 'antd';
import React from 'react';

type TitleFormProps = {
  form: FormInstance;
  titleText: string;
  setTitleText: React.Dispatch<React.SetStateAction<string>>;
};

const TitleForm = ({ form, titleText, setTitleText }: TitleFormProps) => {
  return (
    <Form name={titleText} form={form}>
      <Input value={titleText} onChange={(e) => setTitleText(e.target.value)} />
    </Form>
  );
};

export default TitleForm;
