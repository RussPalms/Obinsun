import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './slices/basketSlice';
import imagesReducer from './slices/imagesSlice';
import cameraReducer from './slices/cameraSlice';
// import loginReducer from './slices/loginSlice';
// import { createStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    images: imagesReducer,
    camera: cameraReducer,
    // login: loginReducer,
  },
});
