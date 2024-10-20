import { createAsyncThunk, createSlice, GetThunkAPI } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../store';
import { editUserThunk, getAllUsersThunk } from './usersThunk';

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
  users: UserData[];
};

const initialState: UsersState = {
  isLoading: false,
  users: [],
};

export const getAllUsers = createAsyncThunk('users/getUsers', (_, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  return getAllUsersThunk(thunkAPI);
});

export const editUser = createAsyncThunk(
  'users/editUser',
  (data: { id: string; userData: UserData }, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
    return editUserThunk(data, thunkAPI);
  }
);

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
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const newUsers = state.users?.map((user) => {
          if (user.id === payload.id) {
            user = { ...payload };
          }
          return user;
        });
        state.users = [...newUsers];
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

//export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;
