import { configureStore } from '@reduxjs/toolkit';
import { f1Api } from './services/f1Api';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    [f1Api.reducerPath]: f1Api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(f1Api.middleware).concat(thunk)
});

