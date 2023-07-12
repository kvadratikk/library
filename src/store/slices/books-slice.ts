import { AMOUNT_OF_BOOKS_PER_PAGE } from 'constants/amount-of-books-per-page';
import { Statuses } from 'constants/statuses';

import { createSlice } from '@reduxjs/toolkit';
import { addCategoryBooks, getCategoryBooks, getGenres, getSearchedBooks } from 'store/actions/books-actions';
import { BookPreview } from 'types/book-preview';
import { GenreItem } from 'types/genre-item';
import { Loading } from 'types/loading';

type InitialState = {
  categoryBooks: BookPreview[];
  genres: GenreItem[];
  loading: Loading;
  loadingCategoryBooks: Loading;
  isAllPages: boolean;
};

const initialState: InitialState = {
  loading: Statuses.IDLE,
  categoryBooks: [],
  genres: [],
  loadingCategoryBooks: Statuses.IDLE,
  isAllPages: false,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.genres = payload;
      state.loading = state.loading === Statuses.SUCCEDED ? Statuses.SUCCEDED : Statuses.PENDING;
    });
    builder.addCase(getGenres.rejected, (state) => {
      state.loading = Statuses.FAILED;
    });
    builder.addCase(getSearchedBooks.pending, (state) => {
      state.loadingCategoryBooks = Statuses.PENDING;
    });
    builder.addCase(getSearchedBooks.fulfilled, (state, { payload }) => {
      state.isAllPages = payload.length < AMOUNT_OF_BOOKS_PER_PAGE ? true : false;
      state.categoryBooks = payload;
      state.loadingCategoryBooks = Statuses.SUCCEDED;
    });
    builder.addCase(getCategoryBooks.pending, (state) => {
      state.loading = Statuses.PENDING;
    });
    builder.addCase(getCategoryBooks.fulfilled, (state, { payload }) => {
      state.isAllPages = payload.length < AMOUNT_OF_BOOKS_PER_PAGE ? true : false;
      state.categoryBooks = payload;
      state.loading = Statuses.SUCCEDED;
    });
    builder.addCase(addCategoryBooks.pending, (state) => {
      state.loadingCategoryBooks = Statuses.PENDING;
    });
    builder.addCase(addCategoryBooks.fulfilled, (state, { payload }) => {
      if (payload.length < AMOUNT_OF_BOOKS_PER_PAGE) state.isAllPages = true;
      state.categoryBooks.push(...payload);
      state.loadingCategoryBooks = Statuses.SUCCEDED;
    });
    builder.addCase(addCategoryBooks.rejected, (state) => {
      state.loadingCategoryBooks = Statuses.FAILED;
    });
  },
});

export const booksReducer = booksSlice.reducer;
