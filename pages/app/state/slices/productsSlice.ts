// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { ISyncProduct } from 'pages/api/products';
// // import { Product } from "pages/api/products";
// // import { CartProduct, PrintfulProduct } from 'pages/types';
// // import type { Product } from "../../app/api";

// export type Products = { [id: string]: ISyncProduct };
// export interface ProductsState {
//   products: Products;
// }

// const initialState: ProductsState = {
//   products: {},
// };

// const productsSlice = createSlice({
//   initialState,
//   name: 'products',
//   reducers: {
//     // receivedProducts(state, action: PayloadAction<Product[]>) {
//     receivedProducts(state, action: PayloadAction<ISyncProduct[]>) {
//       const products = action.payload;
//       products.forEach((product) => {
//         state.products[product.id] = product;
//       });
//     },
//     // defaultVariant(state, action: PayloadAction<ISyncProduct[]>) {
//     //   const products = action.payload;
//     //   products.forEach((product) => {
//     //     const variants = product.variants
//     //     variants.forEach((variant)=> {
//     //       state.products.variants[]
//     //     })
//     //   });
//     // },
//   },
// });

// export const { receivedProducts } = productsSlice.actions;
// export default productsSlice.reducer;

export {};
