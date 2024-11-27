import { Form, FormInstance, Input } from 'antd';

type BodyFormProps = {
  form: FormInstance;
  bodyText: string;
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
};

const BodyForm = ({ form, bodyText, setBodyText }: BodyFormProps) => {
  const { TextArea } = Input;
  return (
    <Form name={bodyText} form={form}>
      <TextArea
        value={bodyText}
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={(e) => setBodyText(e.target.value)}
      />
    </Form>
  );
};

export default BodyForm;
