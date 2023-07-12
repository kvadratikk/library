import { Urls } from 'constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { interceptor } from 'store/interceptor';
import { BookItem } from 'types/book-item';

export const getBook = createAsyncThunk('books/getBookById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await interceptor.get(`${Urls.BOOKS}/${id}`);

    return response.data as BookItem;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});
