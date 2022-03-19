import { GetStaticProps } from 'next';
import Obinsun from 'pages/Production/Layout/Obinsun';
import shuffle from 'lodash.shuffle';
import { PrintfulProduct } from './types';
import { formatVariantName } from './server/lib/format-variant-name';
import { access_code, printful } from './server/lib/printful-client';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';
import IHomePageDesigns from 'pages/Production/interfaces/IHomePageDesigns';
import Content from './Production/Layout/Content';
import { useAppDispatch, useAppSelector } from './server/hooks/reduxHooks';
import { ISyncProduct } from './api/products';
import { useEffect } from 'react';
import axios from 'axios';

type IndexPageProps = {
  synced_products: ISyncProduct[];
};

interface IProps {
  designs: IHomePageDesigns;
  products: IndexPageProps;
}

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

const IndexPage = ({ products }: IProps): JSX.Element => {
  const retrieveProducts = async () => {
    const url = `/api/checkout-success`;
    const response = await fetch(url, {
      method: 'GET',
    });
    const data = await response.json();
  };

  useEffect(() => {
    retrieveProducts();
  }, []);
  return (
    <>
      <Content title="Home" description={`${title} - ${subtitle}`}>
        <div className="text-center pb-6 md:pb-12">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
            All Products
          </h1>
        </div>

        <ProductGrid products={products} />
      </Content>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const { result: productIds } = await printful.get('sync/products', '');
  // console.log(productIds);
  // const allProducts = await Promise.all(
  //   productIds.map(
  //     async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
  //   )
  // );
  // console.log(allProducts);
  // const products: PrintfulProduct[] = allProducts.map(
  //   ({ result: { sync_product, sync_variants } }) => ({
  //     ...sync_product,
  //     variants: sync_variants.map(({ name, ...variant }: any) => ({
  //       name: formatVariantName(name),
  //       ...variant,
  //     })),
  //   })
  // );

  // retrievePrintful();

  const getProducts = await axios.get(
    'https://api.printful.com/store/products',
    {
      headers: {
        Authorization: `Bearer ${access_code}`,
      },
    }
  );
  const { result: productIds } = getProducts.data;

  const synced_products = await Promise.all(
    productIds.map(
      async ({ id }: any) =>
        await axios
          .get(`https://api.printful.com/store/products/${id}`, {
            headers: {
              Authorization: `Bearer ${access_code}`,
            },
          })
          .then((response) => {
            const { data } = response;
            return data;
          })
    )
  );

  // console.log(synced_products);

  const products = synced_products.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }: any) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  // console.log(products);

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
