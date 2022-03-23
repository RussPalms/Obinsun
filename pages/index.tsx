import { GetStaticProps } from 'next';
// import Obinsun from 'pages/Production/Layout/Obinsun';
import shuffle from 'lodash.shuffle';
import { PrintfulProduct } from './types';
import { formatVariantName } from './server/lib/format-variant-name';
// import { access_code } from './server/lib/printful-client';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';
// import IHomePageDesigns from 'pages/Production/interfaces/IHomePageDesigns';
// import Content from './Production/Layout/Content';
// import { useAppDispatch, useAppSelector } from './server/hooks/reduxHooks';
import { ISyncProduct } from './api/products';
import { useEffect } from 'react';
import axios from 'axios';
import * as admin from 'firebase-admin';
import rateLimit from 'axios-rate-limit';
// import IHomePageDesigns from 'pages/Production/interfaces/IHomePageDesigns';
import Content from 'pages/Production/Layout/Content';
import { IHomePageDesigns } from './Production/interfaces/IHomePageDesigns';
// import ProductGrid from '@/components/ProductIntegration/ProductGrid';
// import { formatVariantName } from 'server/lib/format-variant-name';

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
  // const retrieveProducts = async () => {
  //   const url = `/api/checkout-success`;
  //   const response = await fetch(url, {
  //     method: 'GET',
  //   });
  //   const data = await response.json();
  // };

  // useEffect(() => {
  //   retrieveProducts();
  // }, []);
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
  const serviceAccount =
    require('pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

  const clientId = process.env.PRINTFUL_CLIENT_ID;

  const clientSecret = process.env.PRINTFUL_SECRET_KEY;

  const app = !admin.apps.length
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      })
    : admin.app();

  const code: any = {};

  const getAccessCode = async () => {
    const accessCode = await app
      .firestore()
      .collection('accessCodes')
      .doc('Authorization')
      .get()
      .then((snapshot) => {
        const current_access_token = snapshot.data()?.access_token;
        const current_expires_at = snapshot.data()?.expires_at;
        const current_refresh_token = snapshot.data()?.refresh_token;
        if (Date.now() < current_expires_at) {
          console.log(Date.now());
          console.log('Using current access token', current_access_token);
          return current_access_token;
        } else {
          return getRefreshedCode(current_refresh_token);
        }
      });
    return accessCode;
  };

  const getRefreshedCode = async (current_refresh_token: any) => {
    const getRefreshedToken = axios.post(
      'https://www.printful.com/oauth/token',
      {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: current_refresh_token,
      }
    );
    const response = await getRefreshedToken;
    const refreshedToken = response.data;
    let new_access_token = refreshedToken.access_token;
    let new_expires_at = refreshedToken.expires_at;
    let new_refresh_token = refreshedToken.refresh_token;
    app.firestore().collection('accessCodes').doc('Authorization').set({
      access_token: new_access_token,
      expires_at: new_expires_at,
      refresh_token: new_refresh_token,
    });
    console.log('Using refreshed access token', new_access_token);

    return new_access_token;
  };
  const access_code = await getAccessCode();

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
    // 'https://api.printful.com/store/products',
    'https://api.printful.com/sync/products',
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
          .get(`https://api.printful.com/sync/products/${id}`, {
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
