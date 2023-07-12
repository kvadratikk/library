import { configureStore } from '@reduxjs/toolkit';

import { authorizationReducer } from './slices/authorization-slice';
import { bookReducer } from './slices/book-slice';
import { bookingReducer } from './slices/booking-slice';
import { booksReducer } from './slices/books-slice';
import { commentsReducer } from './slices/comments-slice';
import { displayReducer } from './slices/display-slice';
import { loadingReducer } from './slices/loading-slice';
import { menuReducer } from './slices/menu-slice';
import { recoveryReducer } from './slices/recovery-slice';
import { registrationReducer } from './slices/registration-slice';
import { userReducer } from './slices/user-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    books: booksReducer,
    book: bookReducer,
    display: displayReducer,
    loading: loadingReducer,
    registration: registrationReducer,
    authorization: authorizationReducer,
    recovery: recoveryReducer,
    booking: bookingReducer,
    comments: commentsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
