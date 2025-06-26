import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import cropReducer from './cropSlice'
import farmReducer from './farmSlice'

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    auth: authReducer,
    crop: cropReducer,
    farms: farmReducer,
  },
});

export default store;
; /// exporting the store