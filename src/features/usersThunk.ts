import { GetThunkAPI } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../store';
import customFetch from '../utils/axios';

export const getAllUsersThunk = async (thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
  const url = 'users';

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
