import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../shared/store/store';
import customFetch from '../../utils/axios';
import { UsersState } from './types';

const initialState: UsersState = {
  isLoading: false,
  isUsersFetched: false,
  isUserDataFetched: false,
  error: '',
  users: [],
  userData: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersInit(state) {
      state.isLoading = true;
    },
    fetchUsersSuccess(state, { payload }) {
      state.isLoading = false;
      state.isUsersFetched = true;
      state.users = payload;
    },
    fetchUsersFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    fetchUserByIdInit(state) {
      state.isLoading = true;
    },
    fetchUserByIdSuccess(state, { payload }) {
      state.isLoading = false;
      state.userData = payload;
    },
    fetchUserByIdFailure(state, { payload }) {
      state.isLoading = false;
      state.isUsersFetched = false;
      state.error = payload;
    },
    editUser(state, { payload }) {
      const newUsers = state.users?.map((user) => {
        if (user.id === payload.id) {
          user = {
            ...user,
            username: payload.username,
            email: payload.email,
            address: {
              ...user.address,
              street: payload.street,
              suite: payload.suite,
              city: payload.city,
            },
          };
        }
        return user;
      });
      state.users = newUsers;
    },
  },
});

const {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdInit,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
} = usersSlice.actions;
export const { editUser } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsersState = (state: RootState) => state.users;
export const selectUserById = (id: number) => (state: RootState) =>
  state.users.users.find((user) => user.id === id);

export const fetchUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = 'users';
    const isFetched = getState().users.isUsersFetched;
    if (isFetched) return;

    dispatch(fetchUsersInit());
    try {
      const { data } = await customFetch.get(url);
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure(error));
    }
  };

export const fetchUserById =
  (id: string | undefined) => async (dispatch: Dispatch) => {
    const url = `users/${id}`;
    dispatch(fetchUserByIdInit());
    try {
      const { data } = await customFetch.get(url);
      dispatch(fetchUserByIdSuccess(data));
    } catch (error) {
      dispatch(fetchUserByIdFailure(error));
    }
  };
