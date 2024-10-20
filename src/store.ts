import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};
