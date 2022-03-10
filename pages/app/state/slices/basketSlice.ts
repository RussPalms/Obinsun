import { createSlice } from '@reduxjs/toolkit';
// import type { total } from "../../../types";

const initialState = {
  items: [],
  multiples: [],
  count: 1,
  // total: 0,
  cart: {
    basketItems: {
      items: [],
      count: 0,
    },
  },
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // let basketItems = [...state.items, action.payload] as any;

      // let basketItems = [...state.basketItems, action.payload] as any;
      // let basketItems = {...state.cart.basketItems} as any;
      // let basketItems = [...state.items]
      // state.items = [...state.items, action.payload] as any;

      // const index = state.items.findIndex(
      //   (basketItem) => (basketItem as any).id === action.payload.id
      // );

      // const index = state.cart.basketItems.items.findIndex(
      //   (basketItem) => (basketItem as any).id === action.payload.id
      // );

      // if (index < 0) {
      //   basketItems.push({ ...state.items, count: 1 });
      //   // basketItems.push({ ...state.cart.basketItems.items, count: 1 });
      //   // basketItems.push({ count: 1 });
      //   // basketItems.push({ ...state.cart.basketItems.items, count: 1 });
      //   // state.basketItems = basketItems;
      //   // state.basketItems.count = basketItems;
      //   // state.items = basketItems;
      //   // state.basketItems = basketItems;
      // } else {
      //   const updatedItem = {
      //     ...basketItems[index],
      //     // ...basketItems.items[index],
      //   };
      //   updatedItem.count++;
      //   basketItems[index] = updatedItem;
      //   // state.items = basketItems;
      //   // state.basketItems = basketItems;
      //   // console.log(basketItems);
      //   // state.basketItems = basketItems;
      //   // console.log(state.items);
      // }
      // state.cart = basketItems;

      // if (state.items.length == 0) {
      state.items = [...state.items, action.payload] as any;
      // } else {
      //   state.items = [...state.items, action.payload] as any;
      // }
      // state.count = state.items.reduce(item => item.count)
    },
    // addExtra: (state, action) => {
    //   const index = state.items.findIndex(
    //     (basketItem) => (basketItem as any).id === action.payload.id
    //   );

    //   // state.items = [...state.items, action.payload] as any;

    //   // const basketItem = [...state.items]

    //   // let newBasket = [...state.items];
    //   // let newBasket = [...state.items];

    //   if (index >= 0) {
    //     newBasket.splice(0, newBasket.length);
    //     // return newBasket[index];
    //   } else {
    //     console.warn(
    //       `Can't add the product (id: ${action.payload.id}) as it's not in the basket.`
    //     );
    //   }

    //   // newBasket.push(basketItem);

    //   state.multiples = newBasket;
    // },
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
export const selectBasket = (state: any) => state.basket.cart;
export const selectMultiples = (state: any) => state.basket.multiples;

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
