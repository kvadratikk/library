import { AMOUNT_OF_BOOKS_PER_PAGE } from 'constants/amount-of-books-per-page';
import { ALL_BOOKS_CATEGORY } from 'constants/app-routes';
import { ParamsKeys } from 'constants/params-keys';
import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { interceptor } from 'store/interceptor';
import { displaySelector } from 'store/selectors/display-selector';
import { RootState } from 'store/store';
import { BookPreview } from 'types/book-preview';
import { GenreItem } from 'types/genre-item';
import { Sort } from 'types/sort';

type BooksFilterParams = {
  page: number;
  category: string;
  search?: string;
};

type Params = Record<string, string | number>;

type BooksParams = {
  category: string;
  sort: Sort;
  page: number;
  search?: string;
  isBookingHidden: boolean;
};

export const getGenres = createAsyncThunk('books/getGenres', async (_, { rejectWithValue }) => {
  try {
    const response = await interceptor.get(Urls.CATEGORIES);

    return response.data as GenreItem[];
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});

const getBooks = async ({ search, sort, category, page, isBookingHidden }: BooksParams) => {
  const params: Params = {
    [ParamsKeys.PAGE_SIZE]: AMOUNT_OF_BOOKS_PER_PAGE,
    [ParamsKeys.PAGE]: page,
  };

  const isSorted = Object.keys(sort).length;
  const isAllCategory = category === ALL_BOOKS_CATEGORY;

  if (isBookingHidden) params[ParamsKeys.BOOKING] = String(isBookingHidden);

  if (!isAllCategory) params[ParamsKeys.CATEGORY] = category;

  if (search) {
    params[ParamsKeys.SEARCH] = search;
    params[ParamsKeys.SEARCH_AUTHORS] = search;
  }

  if (isSorted) {
    params[ParamsKeys.SORT] = Object.entries(sort)
      .map(([sortName, sortType]) => `${sortName}:${sortType}`)
      .join(',');
  }

  const response = await interceptor.get(`${Urls.BOOKS}`, { params });

  return response.data as BookPreview[];
};

export const getSearchedBooks = createAsyncThunk<BookPreview[], Omit<BooksFilterParams, 'page'>, { state: RootState }>(
  'books/getSearchedBooks',
  async ({ category, search = '' }: Omit<BooksFilterParams, 'page'>, { rejectWithValue, getState }) => {
    try {
      const { sort, isBookingHidden } = displaySelector(getState());

      return await getBooks({ sort, category, search, page: 1, isBookingHidden });
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);

export const getCategoryBooks = createAsyncThunk<BookPreview[], string, { state: RootState }>(
  'books/getCategoryBooks',
  async (category: string, { rejectWithValue, getState }) => {
    try {
      const { sort, isBookingHidden } = displaySelector(getState());

      return await getBooks({ sort, category, page: 1, isBookingHidden });
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);

export const addCategoryBooks = createAsyncThunk<BookPreview[], BooksFilterParams, { state: RootState }>(
  'books/addCategoryBooks',
  async ({ page, category, search = '' }: BooksFilterParams, { rejectWithValue, getState }) => {
    try {
      const { sort, isBookingHidden } = displaySelector(getState());

      return await getBooks({ sort, category, search, page, isBookingHidden });
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
