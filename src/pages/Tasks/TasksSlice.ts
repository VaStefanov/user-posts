import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { initialTasksSliceState, paginationOptions, Task } from './types';
import { RootState } from '../../shared/store/store';
import customFetch from '../../utils/axios';
import { filterData } from './utils';

const initialState: initialTasksSliceState = {
  tasks: [],
  isLoading: false,
  error: null,
  paginationState: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  activeFilters: {
    completed: null,
    title: null,
    userId: null,
  },
};

const tasksSlice = createSlice({
  initialState: initialState,
  name: 'tasksSlice',
  reducers: {
    fetchTasksInit(state) {
      state.isLoading = true;
    },
    fetchTasksSuccess(state, { payload }) {
      state.isLoading = false;
      state.tasks = payload;
    },
    fetchTasksFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    resetTasksState() {
      return initialState;
    },
    resetPaginationState(state) {
      state.paginationState = initialState.paginationState;
    },
    filterTasksState(state, { payload }) {
      const { tasks, activeFilters } = payload;
      state.tasks = filterData(activeFilters, tasks);
    },
    setActiveFilters(state, { payload }) {
      state.activeFilters = payload;
    },
    resetActiveFilters(state) {
      state.activeFilters = initialState.activeFilters;
    },
    setPaginationState(state, { payload }) {
      state.paginationState.page = payload;
    },
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    updateTaskStatus(state, { payload }) {
      const newTasks = state.tasks.map((task: Task) => {
        if (task.id === payload) {
          task.completed = !task.completed;
        }
        return task;
      });
      state.tasks = newTasks;
    },
  },
});

export default tasksSlice.reducer;

const { fetchTasksInit, fetchTasksSuccess, fetchTasksFailure, setLoading } =
  tasksSlice.actions;
export const {
  setActiveFilters,
  resetTasksState,
  setPaginationState,
  resetPaginationState,
  resetActiveFilters,
  filterTasksState,
  updateTaskStatus,
} = tasksSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;

export const fetchTasks =
  (paginationOptions?: paginationOptions) => async (dispatch: Dispatch) => {
    paginationOptions ? dispatch(setLoading(true)) : dispatch(fetchTasksInit());
    const url = 'todos';

    try {
      const { data } = await customFetch.get(url);
      dispatch(fetchTasksSuccess(data));
    } catch (error) {
      dispatch(fetchTasksFailure(error));
    }
  };
