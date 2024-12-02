import { Table, TablePaginationConfig } from 'antd';
import {
  fetchTasks,
  selectTasksState,
  setPaginationState,
  updateTaskStatus,
} from '../TasksSlice';
import Loading from '../../../shared/components/Loading';
import { useAppDispatch, useAppSelector } from '../../../redux-hooks';
import { getColumns } from './columns';
import { useEffect, useState } from 'react';
import { filterData } from '../utils';

const TasksGrid = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading, activeFilters } = useAppSelector(selectTasksState);
  const columns = getColumns();
  const [tasksState, setTasksState] = useState(tasks);
  const onTableChange = (paginationOptions: TablePaginationConfig) => {
    dispatch(setPaginationState(paginationOptions.current));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0 || Object.keys(activeFilters).length === 0) return;
    const newState = filterData(activeFilters, tasks);
    setTasksState(newState);
  }, [activeFilters, tasks]);

  if (tasks.length === 0 || isLoading) return <Loading />;

  return (
    <Table
      pagination={{
        showSizeChanger: false,
        position: ['bottomCenter'],
        total: tasksState.length,
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
      dataSource={tasksState}
      style={{ width: '100%' }}
      onChange={onTableChange}
    />
  );
};

export default TasksGrid;
