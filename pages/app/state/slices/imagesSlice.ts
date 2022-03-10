import { createSlice } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';
// import { useEffect } from "react";
// import type { total } from "../../../types";

const initialState = {
  images: [],
  items: [],
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addToimages: (state, action) => {
      state.items = [...state.items, action.payload] as any;
    },
    removeFromimages: (state, action) => {
      const index = state.items.findIndex(
        (imagesItem) => (imagesItem as any).id === action.payload.id
      );

      let newimages = [...state.items];

      if (index >= 0) {
        newimages.splice(index, 1);
      } else {
        console.warn(
          `Can't remove the image (id: ${action.payload.id}) as it's not in your images bucket.`
        );
      }

      state.items = newimages;
    },
  },
});

export const { addToimages, removeFromimages } = imagesSlice.actions;

export const selectItems = (state: any) => state.images.items;

const imagesReducer = imagesSlice.reducer;

export default imagesReducer;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
