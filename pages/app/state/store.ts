import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './slices/basketSlice';
import imagesReducer from './slices/imagesSlice';
import cameraReducer from './slices/cameraSlice';
// import productsReducer from './slices/productsSlice';
// import cartReducer from './slices/cartSlice';
// import variantReducer from './slices/variantSlice';
// import loginReducer from './slices/loginSlice';
import { createStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    images: imagesReducer,
    camera: cameraReducer,
    // login: loginReducer,

<<<<<<< HEAD
    products: productsReducer,
    cart: cartReducer,
    variant: variantReducer,
=======
    // products: productsReducer,
    // cart: cartReducer,
    // variant: variantReducer,
>>>>>>> refs/remotes/origin/main
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
