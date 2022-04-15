import { createSlice } from '@reduxjs/toolkit';

export const snapSlice = createSlice({
  name: 'snap',
  initialState: {
    user: null,
    selectedImage: null,
  },
  reducers: {
    // login: (state, action) => {
    //   state.user = action.payload;
    // },
    // logout: (state) => {
    //   state.user = null;
    // },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const {
  //  login, logout,
  selectImage,
  resetImage,
} = snapSlice.actions;

// export const selectUser = (state) => state.app.user;

export const selectSelectedImage = (state) => state.snap.selectedImage;

export default snapSlice.reducer;
