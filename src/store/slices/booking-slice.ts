import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { changeBooking, createBooking, deleteBooking } from 'store/actions/booking-actions';
import { Loading } from 'types/loading';

type InitialState = {
  loading: Loading;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingLoading: (state) => {
      state.loading = Statuses.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(createBooking.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(createBooking.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
    builder.addCase(changeBooking.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(changeBooking.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(changeBooking.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(deleteBooking.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(deleteBooking.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
  },
});

export const { resetBookingLoading } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
