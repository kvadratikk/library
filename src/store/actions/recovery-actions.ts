import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { EmailInputs, PasswordsInputsWithCode } from 'types/inputs';

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (data: EmailInputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(Urls.FORGOT, data);

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const { message } = error;

      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (data: PasswordsInputsWithCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(Urls.RESET, data);

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
