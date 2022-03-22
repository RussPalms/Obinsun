import { NextPage } from 'next';

import * as React from 'react';
import { GetStaticProps } from 'next';
import shuffle from 'lodash.shuffle';
import { getSession } from 'next-auth/react';
// import { access_code } from '../../../server/lib/printful-client';
import CatalogGrid from '../../../src/components/Printful/CatalogGrid';
import { formatVariantName } from '../../../server/lib/format-variant-name';
import { PrintfulCatalog, PrintfulProduct } from '../../../types';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { formatProductVariantName } from '../../../src/components/Printful/format-product-variant-name';
import * as admin from 'firebase-admin';

type IndexPageProps = {
  products: PrintfulProduct[];
  catalog: PrintfulCatalog[];
};

// interface item  {
//   id: number;
//   type: string;
//   type_name: string;
//   title: string;
//   brand: any;
//   model: string;
//   image: string;
//   variant_count: number;
//   curency: string;
//   files: [];
//   options: [];
//   dimentions: any;
//   is_discontinued: boolean;
//   avg_fulfillment_time: any;
// }

const IndexPage: React.FC<IndexPageProps> = ({ catalog }) => (
  <>
    <div className="text-center pb-6 md:pb-12">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
        All Products
      </h1>
    </div>

    {/* <CatalogGrid catalog={catalog} /> */}
  </>
);

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
    'https://api.printful.com/files/413660347',
    {
      headers: {
        Authorization: `Bearer ${access_code}`,
      },
    }
  );
  const { result: productIds } = getProducts.data;

  console.log(productIds);

  //   const synced_products = await Promise.all(
  //     productIds.map(
  //       async ({ id }: any) =>
  //         await axios
  //           .get(`https://api.printful.com/store/products/${id}`, {
  //             headers: {
  //               Authorization: `Bearer ${access_code}`,
  //             },
  //           })
  //           .then((response) => {
  //             const { data } = response;
  //             return data;
  //           })
  //     )
  //   );

  //   const products = synced_products.map(
  //     ({ result: { sync_product, sync_variants } }) => ({
  //       ...sync_product,
  //       variants: sync_variants.map(({ name, ...variant }: any) => ({
  //         name: formatVariantName(name),
  //         ...variant,
  //       })),
  //     })
  //   );

  //   console.log(products);

  //   console.log(synced_products[`productId`]);
  // const {result: {sync_product, sync_variants}

  //   const { result } = getProducts.data;
  //   console.log(result);

  //   const clientId = process.env.PRINTFUL_CLIENT_ID;

  //   const clientSecret = process.env.PRINTFUL_SECRET_KEY;

  //   const util = require('util');
  //   // console.log(util.inspect(array, { maxArrayLength: null }))

  //   // const { result: productIds } = await printful.get("products");

  //   // console.log(productIds);

  //   const getPrintfulCatalogId = rateLimit(axios.create(), {
  //     // maxRequests: 2,
  //     // perMilliseconds: 225,
  //     // maxRPS: 0.5,

  //     maxRequests: 120,
  //     perMilliseconds: 2000,
  //     maxRPS: 2,
  //   });

  //   let catalogId: any = [];
  //   let retrieved: any = [];

  //   const axiosHeaders = {
  //     headers: {
  //       token_type: 'Bearer',
  //       access_token: access_code,
  //       client_id: clientId,
  //       client_secret: clientSecret,
  //     },
  //   };

  //   await getPrintfulCatalogId
  //     // .get('https://api.printful.com/products', axiosHeaders)
  //     .get('https://api.printful.com/store/products', axiosHeaders)

  // .then((response) => {
  //   console.log(response.request.res);

  //   const printfulRateLimit = Number(response.headers['x-ratelimit-limit']);

  //   catalogId.push(printfulRateLimit);

  //   const { result } = response.data;
  //   retrieved.push(result);

  //   result.forEach((item: any) => {
  //     const { id } = item;
  //     catalogId['_id'] = id;
  //   });
  // });
  //   console.dir(retrieved, {
  //     depth: null,
  //     colors: true,
  //     maxArrayLength: null,
  //   });

  //   let catalogList = [];
  //   let requestList = [];

  //   for (let p = 1; p <= catalogId['_id']; p++) {
  //     catalogList.push({ _id: p });
  //   }

  //   const numberOfRequests = Math.ceil(catalogId['_id'] / catalogId[0]);
  //   console.log(
  //     `Max number of request per minute: ${catalogId[0]}\nNumber of request to make: ${numberOfRequests}`
  //   );

  //   function sliceIntoChunks(arr: any, chunkSize: any) {
  //     const res = [];
  //     for (let i = 0; i < arr.length; i += chunkSize) {
  //       const chunk = arr.slice(i, i + chunkSize);
  //       res.push(chunk);
  //     }
  //     return res;
  //   }
  //   const slicedRequests = sliceIntoChunks(catalogList, catalogId[0]);
  //   const requestNumber = catalogList.length;
  //   let requestQueue = slicedRequests[0];
  //   let errorList: any = [];
  //   let productCatalog: any = [];

  //   const catalogListing = await Promise.all(
  //     slicedRequests[0].slice(0, 3).map(
  //       async ({ _id }: any) =>
  //         await axios
  //           .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
  //           .then((response) => {
  //             const { result } = response.data;
  //             return response.data;
  //           })
  //           .catch((err) => {
  //             errorList.push(err.response.config.url);
  //           })
  //     )
  //   );

  //   let catalogListingBucket: any = [];

  //   const catalogListing0 = await Promise.all(
  //     slicedRequests[0].slice(0, 3).map(
  //       async ({ _id }: any) =>
  //         await axios
  //           .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
  //           .then((response) => {
  //             const { result } = response.data;
  //             catalogListingBucket.push(response.data);
  //             return response.data;
  //           })
  //           .catch((err) => {
  //             errorList.push(err.response.config.url);
  //           })
  //     )
  //   );

  //   const catalogListing1 = await Promise.all(
  //     slicedRequests[0].slice(3, 4).map(
  //       async ({ _id }: any) =>
  //         await axios
  //           .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
  //           .then((response) => {
  //             const { result } = response.data;
  //             catalogListingBucket.push(response.data);
  //             return response.data;
  //           })
  //           .catch((err) => {
  //             errorList.push(err.response.config.url);
  //           })
  //     )
  //   );

  //   const catalog: PrintfulCatalog[] = catalogListing.map(
  //     ({ result: { product, variants } }) => ({
  //       ...product,
  //       variant_count: variants.map(({ name, ...variant }: any) => ({
  //         name: formatProductVariantName(name),
  //         ...variant,
  //       })),
  //     })
  //   );

  return {
    props: {
      //   catalog,
    },
  };
};

export default IndexPage;
