import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AuthInputs } from 'types/inputs';

export const createAuthUser = createAsyncThunk(
  'users/createAuthUser',
  async (data: AuthInputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(Urls.AUTH, data);

      const { jwt, user } = response.data;

      return {
        status: response.status,
        jwt,
        user,
      };
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
