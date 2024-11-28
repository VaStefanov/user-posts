import { Col, Input, Form } from 'antd';

type InputWrapperProps = {
  field: string;
  isEditing: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
};

const InputWrapper = ({
  field,
  isEditing,
  handleChange,
  error,
}: InputWrapperProps) => {
  return (
    <Col
      span={8}
      style={{
        maxWidth: 'none',
        marginBottom: 30,
      }}
    >
      <Form.Item
        label={field.replace('_', ' ')}
        name={field}
        layout='vertical'
        style={{ minHeight: '35px' }}
      >
        <Input
          name={field}
          disabled={!isEditing}
          onChange={(e) => handleChange(e)}
        />
      </Form.Item>
      <span
        style={{
          color: 'red',
          display: error ? 'block' : 'none',
        }}
      >
        This field is required
      </span>
    </Col>
  );
};

export default InputWrapper;
