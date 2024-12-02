import { Input } from 'antd';

type BodyFormProps = {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

const BodyForm = ({ body, setBody }: BodyFormProps) => {
  const { TextArea } = Input;
  return (
    <TextArea
      value={body}
      autoSize={{ minRows: 3, maxRows: 5 }}
      onChange={(e) => setBody(e.target.value)}
    />
  );
};

export default BodyForm;
