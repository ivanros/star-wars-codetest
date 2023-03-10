import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const notificacionesSlice = createSlice({
  name: 'notificaciones',
  initialState,
  reducers: {
    showNotificacion(state, action) {
      const { type, message } = action.payload;
      state = { type, message, show: true };
    },
    closeNotificacion(state, action) {
      const { type, message } = action.payload;
      state = { type, message, show: false };
    },
    clearNotificacion(state) {
      state = initialState;
    },
  },
});

export const { showNotificacion, closeNotificacion } = notificacionesSlice.actions;
