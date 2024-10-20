import { createAsyncThunk, createSlice, GetThunkAPI } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../store';
import { getAllUsersThunk } from './usersThunk';

export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type UsersState = {
  isLoading: boolean;
  users: UserData[] | null;
};

const initialState: UsersState = {
  isLoading: false,
  users: null,
};

export const getAllUsers = createAsyncThunk('users/getUsers', (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  return getAllUsersThunk(thunkAPI);
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default usersSlice.reducer;
