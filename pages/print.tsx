import { getSession } from 'next-auth/react';
import Content from './Production/Layout/Content';
import { formatVariantName } from './server/lib/format-variant-name';
import { printful } from './server/lib/printful-client';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';
import { PrintfulProduct } from './types';

function PrintPage({ products }: any) {
  return (
    <Content title="" description="">
      {/* <Print /> */}
      <ProductGrid products={products} />
    </Content>
  );
}

export default PrintPage;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const { result: productIds } = await printful.get('sync/products', '');
  const allProducts = await Promise.all(
    productIds.map(
      async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
    )
  );

  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }: any) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  const printfulProducts = { productArray: products };

  const productSyncing = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(printfulProducts),
  };

  await fetch(`${process.env.NEXTAUTH_URL}/api/product`, productSyncing);
  //   .then(
  //     (productResponse) =>
  //       console.dir(
  //         {
  //           'product-response': productResponse,
  //         },
  //         {
  //           depth: null,
  //           maxArrayLength: null,
  //           colors: true,
  //         }
  //       )
  //   );

  // .then((productJson) => console.log(productJson));

  //   console.dir(
  //     {
  //       'printful-products': products,
  //     },
  //     {
  //       depth: null,
  //       maxArrayLength: null,
  //       colors: true,
  //     }
  //   );

  return {
    props: {
      session,
      products: products,
    },
  };
};
