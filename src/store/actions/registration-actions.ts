import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RegInputs } from 'types/inputs';

export const createUser = createAsyncThunk('users/createUser', async (data: RegInputs, { rejectWithValue }) => {
  try {
    const response = await axios.post(Urls.REGISTER, data);

    return response.status;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});
