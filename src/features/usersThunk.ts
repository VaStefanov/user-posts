import { GetThunkAPI } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../store';
import customFetch from '../utils/axios';
import { UserData } from './usersSlice';

export const getAllUsersThunk = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  const url = 'users';

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editUserThunk = async (data: { id: string; userData: UserData }, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  const url = `users/${data.id}`;

  try {
    const resp = await customFetch.put(url, data);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
