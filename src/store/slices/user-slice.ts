import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { changeUserAvatar, changeUserInfo, createUserAvatar, getUser } from 'store/actions/user-actions';
import { Loading } from 'types/loading';
import { User } from 'types/user';

type InitialState = {
  loading: Loading;
  loadingAvatar: Loading;
  loadingInfo: Loading;
  uploadAvatar: Loading;
  user: User;
  avatarId: number;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  loadingAvatar: Statuses.IDLE,
  loadingInfo: Statuses.IDLE,
  uploadAvatar: Statuses.IDLE,
  user: {} as User,
  avatarId: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = Statuses.PENDING;
      state.loadingAvatar = Statuses.IDLE;
      state.loadingInfo = Statuses.IDLE;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
    builder.addCase(createUserAvatar.rejected, (state) => {
      state.uploadAvatar = Statuses.FAILED;
      state.loadingAvatar = Statuses.IDLE;
    });
    builder.addCase(createUserAvatar.fulfilled, (state, { payload }) => {
      state.uploadAvatar = Statuses.SUCCEDED;
      state.loadingAvatar = Statuses.IDLE;
      state.avatarId = payload;
    });
    builder.addCase(changeUserAvatar.rejected, (state) => {
      state.loadingAvatar = Statuses.FAILED;
    });
    builder.addCase(changeUserAvatar.fulfilled, (state) => {
      state.loadingAvatar = Statuses.SUCCEDED;
      state.avatarId = 0;
    });
    builder.addCase(changeUserInfo.rejected, (state) => {
      state.loadingInfo = Statuses.FAILED;
    });
    builder.addCase(changeUserInfo.fulfilled, (state) => {
      state.loadingInfo = Statuses.SUCCEDED;
    });
  },
});

export const userReducer = userSlice.reducer;
