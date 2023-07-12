import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, resetPassword } from 'store/actions/recovery-actions';
import { Loading } from 'types/loading';

type InitialState = {
  loading: Loading;
  errorMessage: string;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  errorMessage: '',
};

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    resetRecovery: (state) => {
      state.loading = Statuses.IDLE;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.errorMessage = '';
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.errorMessage = payload;
      state.loading = Statuses.FAILED;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
  },
});

export const { resetRecovery } = recoverySlice.actions;
export const recoveryReducer = recoverySlice.reducer;
