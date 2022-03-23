// import { NextPage } from 'next';

// import * as React from 'react';
// import { GetStaticProps } from 'next';
// import shuffle from 'lodash.shuffle';
// import { PrintfulProduct } from './types';
// import ProductGrid from './src/components/ProductIntegration/ProductGrid';
// import { formatVariantName } from './server/lib/format-variant-name';
// import { printful } from './server/lib/printful-client';
// import { getSession } from 'next-auth/react';

// type IndexPageProps = {
//   products: PrintfulProduct[];
// };

// const IndexPage: React.FC<IndexPageProps> = ({ products }) => (
//   <>
//     <div className="text-center pb-6 md:pb-12">
//       <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
//         All Products
//       </h1>
//     </div>

//     <ProductGrid products={products} />
//   </>
// );

// export const getStaticProps: GetStaticProps = async () => {
//   const util = require('util');

//   const { result: productIds } = await printful.get('sync/products', '');

//   // console.log(productIds);

//   const allProducts = await Promise.all(
//     productIds.map(
//       async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
//     )
//   );

//   // console.log(allProducts[0].result);
//   // console.log(util.inspect(allProducts[0], { maxArrayLength: null }));
//   // console.dir(allProducts, {
//   //   depth: null,
//   //   colors: true,
//   //   maxArrayLength: null,
//   // });

//   const products: PrintfulProduct[] = allProducts.map(
//     ({ result: { sync_product, sync_variants } }) => ({
//       ...sync_product,
//       variants: sync_variants.map(({ name, ...variant }: any) => ({
//         name: formatVariantName(name),
//         ...variant,
//       })),
//     })
//   );

//   // console.log(products);
//   // console.log(products.price);

//   return {
//     props: {
//       products: shuffle(products),
//     },
//   };
// };

// export default IndexPage;

export default function IndexPage2() {}
