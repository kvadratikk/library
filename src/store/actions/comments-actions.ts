import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { interceptor } from 'store/interceptor';
import { RootState } from 'store/store';
import { Review } from 'types/review';

export const createComment = createAsyncThunk('comments/createComment', async (data: Review, { rejectWithValue }) => {
  try {
    await interceptor.post(Urls.COMMENTS, { data });

    return null;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});

export const changeComment = createAsyncThunk<number, Review, { state: RootState }>(
  'comments/changeComment',
  async (data: Review, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { comments } = state.user.user;
      const { id } = state.book.book;
      const commentId = comments.find((comment) => comment.bookId === id)?.id;

      const response = await interceptor.put(`${Urls.COMMENTS}/${commentId}`, { data });

      return response.status;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
