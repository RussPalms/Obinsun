import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import imagesReducer from "./slices/imagesSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    images: imagesReducer,
  },
});
