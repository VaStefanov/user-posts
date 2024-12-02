import { Flex, Row, theme } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux-hooks';
import TasksFilters from './filters/TasksFilters';
import TasksGrid from './grid/TasksGrid';
import {
  resetActiveFilters,
  resetPaginationState,
  resetTasksState,
} from './TasksSlice';

const Tasks = () => {
  const { token } = theme.useToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetActiveFilters());
      dispatch(resetPaginationState());
      dispatch(resetTasksState());
    };
  }, [dispatch]);

  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Flex vertical style={{ width: '1200px' }}>
        <Row
          align='top'
          justify='center'
          style={{
            height: '100%',
            width: '100%',
            padding: '25px',
            backgroundColor: 'white',
          }}
        >
          <TasksFilters />
        </Row>
        <Row
          align='top'
          justify='center'
          style={{
            height: '100%',
            width: '100%',
            padding: '25px',
            backgroundColor: token.colorFillAlter,
          }}
        >
          <TasksGrid />
        </Row>
      </Flex>
    </Row>
  );
};

export default Tasks;
