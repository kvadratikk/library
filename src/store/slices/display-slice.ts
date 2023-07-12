import { Display } from 'constants/display';
import { SortName, SortType } from 'constants/sort';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sort } from 'types/sort';

type InitialState = {
  display: Display;
  sort: Sort;
  isBookingHidden: boolean;
};

const initialState: InitialState = {
  display: Display.TILE,
  sort: { title: SortType.ASCENDING },
  isBookingHidden: false,
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDisplay: (state, { payload }: PayloadAction<Display>) => {
      state.display = payload;
    },
    setSort: (state, { payload }: PayloadAction<[SortName, SortType]>) => {
      const [sortName, sortType] = payload;

      state.sort[sortName] = sortType;
    },
    deleteSort: (state, { payload }: PayloadAction<SortName>) => {
      delete state.sort[payload];
    },
    setIsBookingHidden: (state, { payload }: PayloadAction<boolean>) => {
      state.isBookingHidden = payload;
    },
  },
});

export const { setDisplay, setSort, deleteSort, setIsBookingHidden } = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
