import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlice';
import tasksReducer from '../../pages/Tasks/TasksSlice';

const appReducer = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
});

const rootReducer = (state: any, action: any) => appReducer(state, action);

export default rootReducer;
