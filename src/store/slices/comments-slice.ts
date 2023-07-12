import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { changeComment, createComment } from 'store/actions/comments-actions';
import { Loading } from 'types/loading';

type InitialState = {
  loading: Loading;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentsLoading: (state) => {
      state.loading = Statuses.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
    builder.addCase(changeComment.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(changeComment.fulfilled, (state) => {
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(changeComment.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
  },
});

export const { resetCommentsLoading } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
