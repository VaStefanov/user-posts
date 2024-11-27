import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../shared/store/store';

const userPostsSlice = createSlice({
  initialState: 'initialState',
  name: 'usersPostsSlice',
  reducers: {},
});

export default userPostsSlice.reducer;

const {} = userPostsSlice.actions;
export const {} = userPostsSlice.actions;

export const selectTasksState = (state: RootState) => state.tasks;

export const fetchTasks = () => async (dispatch: Dispatch) => {};
