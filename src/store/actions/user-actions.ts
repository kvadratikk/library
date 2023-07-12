import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { interceptor } from 'store/interceptor';
import { RootState } from 'store/store';
import { ProfileInputs } from 'types/inputs';

export const getUser = createAsyncThunk('users/getUser', async (_, { rejectWithValue }) => {
  try {
    const response = await interceptor.get(Urls.ME);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});

export const createUserAvatar = createAsyncThunk(
  'users/createUserAvatar',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await interceptor.post(Urls.UPLOAD, data);

      return response.data[0].id;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);

export const changeUserAvatar = createAsyncThunk<number, number, { state: RootState }>(
  'users/changeUserAvatar',
  async (avatarId: number, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await interceptor.put(`${Urls.USERS}/${state.user.user.id}`, { avatar: avatarId });

      return response.status;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);

export const changeUserInfo = createAsyncThunk<number, ProfileInputs, { state: RootState }>(
  'users/changeUserInfo',
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response = await interceptor.put(`${Urls.USERS}/${state.user.user.id}`, data);

      return response.status;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
