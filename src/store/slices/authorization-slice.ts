import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { createAuthUser } from 'store/actions/authorization-actions';
import { Code, Loading } from 'types/loading';

type InitialState = {
  code: Code;
  loading: Loading;
  jwt: string;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  code: null,
  jwt: localStorage.getItem('jwt') || '',
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = '';
      state.loading = Statuses.IDLE;
      state.code = null;

      localStorage.setItem('jwt', '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAuthUser.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(createAuthUser.fulfilled, (state, { payload }) => {
      state.code = payload.status;
      state.jwt = payload.jwt;
      state.loading = Statuses.SUCCEDED;

      localStorage.setItem('jwt', payload.jwt);
    });
    builder.addCase(createAuthUser.rejected, (state, { payload }) => {
      if (typeof payload === 'number') state.code = payload;
      state.loading = Statuses.FAILED;
    });
  },
});

export const { logout } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
