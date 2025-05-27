import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
; /// exporting the store