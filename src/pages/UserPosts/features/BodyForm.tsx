import { FormInstance, Input } from 'antd';

type BodyFormProps = {
  form: FormInstance;
  bodyText: string;
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
};

const BodyForm = ({ bodyText, setBodyText }: BodyFormProps) => {
  const { TextArea } = Input;
  return (
    <TextArea
      value={bodyText}
      autoSize={{ minRows: 3, maxRows: 5 }}
      onChange={(e) => setBodyText(e.target.value)}
    />
  );
};

export default BodyForm;
