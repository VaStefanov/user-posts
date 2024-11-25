import { Flex, Row, theme } from 'antd';
import { Link } from 'react-router-dom';
import TasksGrid from './grid/TasksGrid';
import TasksFilters from './filters/TasksFilters';
import { useAppDispatch } from '../../redux-hooks';
import {
  resetActiveFilters,
  resetPaginationState,
  resetTasksState,
} from './TasksSlice';

const Tasks = () => {
  const { token } = theme.useToken();
  const dispatch = useAppDispatch();

  const clearData = () => {
    dispatch(resetActiveFilters());
    dispatch(resetPaginationState());
    dispatch(resetTasksState());
  };

  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Flex vertical style={{ width: '1200px' }}>
        <Link
          to='/users'
          className='btn back'
          style={{ display: 'flex', alignSelf: 'flex-end' }}
          onClick={clearData}
        >
          Back
        </Link>
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
