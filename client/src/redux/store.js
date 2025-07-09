import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import cropReducer from './cropSlice';
import farmReducer from './farmSlice';
import chatReducer from './chatSlice'; // Import your chat slice reducer

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
    auth: authReducer,
    crop: cropReducer,
    farms: farmReducer,
    chat: chatReducer,   // Add chat reducer here
  },
});

export default store;
