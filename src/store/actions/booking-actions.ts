import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { interceptor } from 'store/interceptor';
import { Booking, ChangedBooking } from 'types/booking';

export const createBooking = createAsyncThunk('booking/createBooking', async (data: Booking, { rejectWithValue }) => {
  try {
    return await interceptor.post(Urls.BOOKING, { data });
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});

export const changeBooking = createAsyncThunk(
  'booking/changeBooking',
  async (data: ChangedBooking, { rejectWithValue }) => {
    try {
      return await interceptor.put(`${Urls.BOOKING}/${data.bookingId}`, { data });
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);

export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (id: number, { rejectWithValue }) => {
  try {
    return await interceptor.delete(`${Urls.BOOKING}/${id}`);
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});
