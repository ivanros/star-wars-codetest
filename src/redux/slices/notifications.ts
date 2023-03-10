import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'error' as String,
  message: '' as String,
  show: false as Boolean,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const { type, message } = action.payload;
      return { type, message, show: true };
    },
    closeNotification(state, action) {
      const { type, message } = action.payload;
      return { type, message, show: false };
    },
    clearNotification(state) {
      return initialState;
    },
  },
});

export const { showNotification, closeNotification, clearNotification } = notificationSlice.actions;
