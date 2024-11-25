import { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { fetchTasks, selectTasksState } from './TasksSlice';
import { filterData } from './utils';
import { TasksState } from './types';

const TasksContext = createContext<TasksState | undefined>(undefined);

type TasksProviderProps = {
  children: React.ReactNode | JSX.Element;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading, activeFilters } = useAppSelector(selectTasksState);
  const [tasksState, setTasksState] = useState(tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0 || Object.keys(activeFilters).length === 0) return;
    const newState = filterData(activeFilters, tasks);
    setTasksState(newState);
  }, [activeFilters, tasks]);

  if (tasksState.length === 0 && tasks.length === 0) return null;
  return (
    <TasksContext.Provider
      value={{
        tasksState,
        isLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error('useTasksContext must be use within TasksProvider');
  }

  return context;
};
