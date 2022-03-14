import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import {  ISyncProduct} from 'pages/types';

export interface VariantProduct {
  variant_id: number;
  product_id: number;
  image: string;
  name: string;
}

export interface VariantFiles {
  id: number;
  type: string;
  hash: string | null;
  url: string | null;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  dpi: number;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
}

// export type OptionValues = string | []

export interface VariantOptions {
  id: string;
  value: [string];
}

export interface ISyncVariant {
  name: string;
  id: number;
  sync_product_id: number;
  synced: boolean;
  variant_id: number;
  warehouse_product_variant_id: number | null;
  retail_price: string;
  sku: string;
  currency: string;
  product: VariantProduct;
  files: [VariantFiles];
  options: [VariantOptions];
  is_ignored: boolean;
}

// export type ISyncVariant = {[id:string]: ProductVariants}

// export type Variants = { [id: string]: ISyncVariant };
export type Variants = { [id: string]: ISyncVariant };

// type SelectedVariant =

export interface VariantState {
  variants: Variants;
  //   selectedVariant: string;
}

const initialState: VariantState = {
  variants: {},
  //   selectedVariant: firstVariant(),
};

const variantsSlice = createSlice({
  initialState,
  name: 'variants',
  reducers: {
    displayVariants(state, action: PayloadAction<ISyncVariant[]>) {
      const variants = action.payload;
      variants.forEach((variant) => {
        state.variants[variant.id] = variant;
      });
    },
    // changeVariant(state, action: PayloadAction<ISyncVariant[]>) {
    //     // const variants = action.payload;
    //     // variants.forEach((variant) => {
    //     //   state.variants[variant.id] = variant;
    //     // });
    //     const variantIndex = state.variants.findIndex()
    //   },
  },
});

export function getFirstVariant(state: RootState) {
  console.log('retrieving first variant');
  let firstVariant = state.variant.variants[0];
  return firstVariant;
}

export const getMemoizedFirstVariant = createSelector(
  (state: RootState) => state.variant.variants,
  (variants) => {
    console.log('calling getMemoizedFirstVartant');
    let firstVariant = variants[0];
    return firstVariant;
  }
);

export const { displayVariants } = variantsSlice.actions;
export default variantsSlice.reducer;
