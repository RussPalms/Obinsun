import { createSlice } from "@reduxjs/toolkit";
// import { hasStripe } from "../lib/has-stripe";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload] as any;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => (basketItem as any).id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove the product (id: ${action.payload.id}) as it's not in the basket.`
        );
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: any) => state.basket.items;
export const selectTotal = (state: any) =>
  state.basket.items.reduce((total: any, item: any) => total + item.price);

// const basketReducer = basketSlice.reducer;

// export default basketReducer;
export default basketSlice.reducer;
