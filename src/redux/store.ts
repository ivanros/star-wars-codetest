import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notificationSlice } from './slices/notifications';
import { planetsApi } from './slices/planets';

const reducerMap = {
  [notificationSlice.name]: notificationSlice.reducer,
  [planetsApi.reducerPath]: planetsApi.reducer,
};

export const store = configureStore({
  reducer: combineReducers(reducerMap),
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(planetsApi.middleware),
});
