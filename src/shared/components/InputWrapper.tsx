import { Col, Input, Form } from 'antd';
import { validateFields } from '../features/validation';
import { useEffect, useState } from 'react';

const InputWrapper = ({
  field,
  formStyle,
  isEditing,
  setChangesMade,
  setHasError,
}: any) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [isEditing]);
  return (
    <Col span={8} key={field} style={formStyle}>
      <Form.Item
        label={field.replace('_', ' ')}
        name={field}
        layout='vertical'
        style={{ minHeight: '35px' }}
      >
        <Input
          name={field}
          style={{ pointerEvents: !isEditing ? 'none' : 'all' }}
          onChange={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const hasErrors = validateFields(e.target.value);
            setHasError(hasErrors);
            setError(hasErrors);
            setChangesMade(true);
          }}
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
