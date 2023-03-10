import { configureStore } from '@reduxjs/toolkit';
import { notificacionesSlice } from './slices/notifications';
import { planetsApi } from './slices/planets';

export const store = configureStore({
  reducer: {
    [notificacionesSlice.name]: notificacionesSlice.reducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(planetsApi.middleware),
});
