import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  text: string;
};

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  text: '',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.text = '';
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setIsError: (state, { payload }: PayloadAction<{ isError: boolean; text?: string }>) => {
      state.isError = payload.isError;
      state.text = payload.text || state.text;
    },
    setIsSuccess: (state, { payload }: PayloadAction<{ isSuccess: boolean; text: string }>) => {
      state.isSuccess = payload.isSuccess;
      state.text = payload.text;
    },
  },
});

export const { setIsError, setIsLoading, setIsSuccess, resetErrors } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
