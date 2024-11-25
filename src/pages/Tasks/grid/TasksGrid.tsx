import { useTasksContext } from '../TasksContext';
import { Table, TablePaginationConfig } from 'antd';
import { getColumns } from './columns';
import { setPaginationState, updateTaskStatus } from '../TasksSlice';
import { useAppDispatch } from '../../../redux-hooks';
import Loading from '../../../shared/components/Loading';

const TasksGrid = () => {
  const { tasksState: tasks } = useTasksContext();
  const dispatch = useAppDispatch();
  const columns = getColumns();

  const onTableChange = (paginationOptions: TablePaginationConfig) => {
    dispatch(setPaginationState(paginationOptions.current));
  };

  if (tasks.length === 0) return <Loading />;

  return (
    <Table
      pagination={{
        showSizeChanger: false,
        position: ['bottomCenter'],
        total: tasks.length,
        pageSize: 10,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            const { id } = record;
            dispatch(updateTaskStatus(id));
          },
        };
      }}
      rowKey='id'
      columns={columns}
      dataSource={tasks}
      style={{ width: '100%' }}
      onChange={onTableChange}
    />
  );
};

export default TasksGrid;
