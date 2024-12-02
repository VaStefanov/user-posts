import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import { resetPaginationState, setActiveFilters } from '../TasksSlice';
import { useAppDispatch } from '../../../redux-hooks';
import { tasksFilters } from './filters';
import { renderFilter } from '../utils';
import { FilterOptions } from '../types';
import { useState } from 'react';

const initialValues = {
  completed: null,
  title: null,
  userId: null,
};

const TasksFilters = () => {
  const [state, setState] = useState<FilterOptions>(initialValues);
  const filters = tasksFilters();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onSearch = () => {
    dispatch(setActiveFilters(state));
    dispatch(resetPaginationState());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (typeof e === 'object' && e !== null) {
      setState({ ...state, title: e.target.value });
    } else if (typeof e === 'string') {
      const isCompleted = e === 'Completed';
      setState({ ...state, completed: isCompleted });
    } else if (typeof e === 'number' || e === null) {
      setState({ ...state, userId: e });
    }
  };

  const onClear = () => {
    form.resetFields();
    setState(initialValues);
  };

  return (
    <>
      <Form
        id='task-form'
        onFinish={onSearch}
        style={{ width: '100%' }}
        form={form}
      >
        <Row gutter={[16, 5]} align={'top'} className='inputs-wrapper'>
          {filters.map((filter) => {
            return (
              <Col span={6} key={filter.name}>
                <label htmlFor={filter.name}>{filter.label}</label>
                <Form.Item name={filter.type}>
                  {renderFilter({
                    type: filter.type,
                    options: filter?.options,
                    name: filter.name,
                    value: state[filter.name as keyof FilterOptions],
                    onChange,
                  })}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row
          justify='center'
          align='middle'
          style={{ padding: '24px 12px 12px' }}
        >
          <Space>
            <Button onClick={onClear} icon={<CloseCircleOutlined />}>
              Clear
            </Button>
            <Button icon={<SearchOutlined />} htmlType='submit'>
              Search
            </Button>
          </Space>
        </Row>
      </Form>
    </>
  );
};

export default TasksFilters;
