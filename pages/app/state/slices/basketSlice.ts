import { createSlice } from '@reduxjs/toolkit';
// import type { total } from "../../../types";

const initialState = {
  items: [],
  // total: 0,
};

export const basketSlice = createSlice({
  name: 'basket',
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

// export declare type total = { total: number };

// useEffect(() =>{
//    const selectTotal = (state: any) =>
//   state.basket.items.reduce(
//     (total: number, item: any) =>
//       Number((total as number) + item.price) as number
//   );

//   return selectTotal
// },[])

export const selectTotal = (state: any) =>
  state.basket.items.reduce(
    (total: number, item: any) =>
      (Number(total) + Number(item.price)) as number,
    ''
  );

const basketReducer = basketSlice.reducer;

export default basketReducer;
// export default basketSlice.reducer;
