// import { ISyncProduct } from 'pages/api/products';
// import { formatVariantName } from 'pages/server/lib/format-variant-name';
// import { printful } from 'pages/server/lib/printful-client';

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

export default function getSyncedProducts() {}
