import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { getBook } from 'store/actions/book-actions';
import { BookItem } from 'types/book-item';
import { Loading } from 'types/loading';

type InitialState = {
  book: BookItem;
  loading: Loading;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  book: {} as BookItem,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    resetBookAll: (state) => {
      state.loading = Statuses.IDLE;
      state.book = {} as BookItem;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(getBook.fulfilled, (state, { payload }) => {
      state.book = payload;
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(getBook.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
  },
});

export const { resetBookAll } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
