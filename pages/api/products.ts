// import shuffle from 'lodash.shuffle';
// import { GetStaticProps } from 'next';
// import { ISyncVariant, Variants } from 'pages/app/state/slices/variantSlice';
// import { formatVariantName } from 'pages/server/lib/format-variant-name';
// import { printful } from 'pages/server/lib/printful-client';
// import { PrintfulProduct } from 'pages/types';

// export interface ISyncProduct {
//   id: string;
//   external_id: string;
//   name: string;
//   variants: ISyncVariant;
//   // variants: Variants[];
//   // variants: Variants;
//   synced: number;
//   thumbnail_url: string;
//   is_ignored: boolean;
// }

// // export const getStaticProps: GetStaticProps = async () => {
// //   const { result: productIds } = await printful.get('sync/products', '');
// //   const allProducts = await Promise.all(
// //     productIds.map(
// //       async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
// //     )
// //   );
// //   const products: PrintfulProduct[] = allProducts.map(
// //     ({ result: { sync_product, sync_variants } }) => ({
// //       ...sync_product,
// //       variants: sync_variants.map(({ name, ...variant }: any) => ({
// //         name: formatVariantName(name),
// //         ...variant,
// //       })),
// //     })
// //   );
// //   return {
// //     props: {
// //       products: shuffle(products),
// //     },
// //   };
// // };

// // export interface Product {
// //     id: string;
// //     name: string;
// //     price: number;
// //     description: string;
// //     imageURL: string;
// //     imageAlt: string;
// //     imageCredit: string;
// //   }

// // export interface Product {
// //   id: string;
// //   name: string;
// //   price: number;
// //   description: string;
// //   image: string;
// //   url: string;
// //   // imageCredit: string;
// // }

// //   export async function getProducts(): Promise<Product[]> {
// export async function getProducts(): Promise<ISyncProduct[]> {
//   const { result: productIds } = await printful.get('sync/products', '');
//   const allProducts = await Promise.all(
//     productIds.map(
//       async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
//     )
//   );
//   const products: ISyncProduct[] = allProducts.map(
//     ({ result: { sync_product, sync_variants } }) => ({
//       ...sync_product,
//       variants: sync_variants.map(({ name, ...variant }: any) => ({
//         name: formatVariantName(name),
//         ...variant,
//       })),
//     })
//   );

//   return products;
// }

// //   const results = await fetch("/products.json");
// //   const products = results.json();
// //   return products;

// export type CartItems = { [productID: string]: number };
// export type CheckoutResponse = { success: boolean; error?: string };

// // export async function checkout(items: CartItems): Promise<CheckoutResponse> {
// //   const modifier = Object.keys(items).length > 0 ? 'success' : 'error';
// //   // const url = `${process.env.NEXTAUTH_URL}/pages/api/checkout-${modifier}.json`;
// //   // const url = `/api/checkout-${modifier}`;
// //   const url = `${process.env.NEXTAUTH_URL}/pages/api/checkout-${modifier}`;
// //   await sleep(500);
// //   const response = await fetch(url, {
// //     method: 'POST',
// //     body: JSON.stringify(items),
// //   });
// //   const data = await response.json();
// //   if (!data.success) {
// //     throw new Error(data.error);
// //   }
// //   return data as CheckoutResponse;
// // }

// // utility function to simulate slowness in an API call
// const sleep = (time: number) => new Promise((res) => setTimeout(res, time));

export {};
