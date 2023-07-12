import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { createUser } from 'store/actions/registration-actions';
import { Code, Loading } from 'types/loading';

type InitialState = {
  code: Code;
  loading: Loading;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  code: null,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.code = null;
      state.loading = Statuses.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.code = payload;
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      if (typeof payload === 'number') state.code = payload;
      state.loading = Statuses.FAILED;
    });
  },
});

export const { resetRegistration } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
