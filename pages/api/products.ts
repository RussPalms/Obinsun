import shuffle from 'lodash.shuffle';
import { GetStaticProps } from 'next';
import { ISyncVariant, Variants } from 'pages/app/state/slices/variantSlice';
import { formatVariantName } from 'pages/server/lib/format-variant-name';
// import { printful } from 'pages/server/lib/printful-client';
import { PrintfulProduct } from 'pages/types';
import axios from 'axios';
// import { access_code } from 'pages/server/lib/printful-client';
import * as admin from 'firebase-admin';

export interface ISyncProduct {
  id: string;
  external_id: string;
  name: string;
  variants: ISyncVariant;
  // variants: Variants[];
  // variants: Variants;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

// export const getStaticProps: GetStaticProps = async () => {
//   const { result: productIds } = await printful.get('sync/products', '');
//   const allProducts = await Promise.all(
//     productIds.map(
//       async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
//     )
//   );
//   const products: PrintfulProduct[] = allProducts.map(
//     ({ result: { sync_product, sync_variants } }) => ({
//       ...sync_product,
//       variants: sync_variants.map(({ name, ...variant }: any) => ({
//         name: formatVariantName(name),
//         ...variant,
//       })),
//     })
//   );
//   return {
//     props: {
//       products: shuffle(products),
//     },
//   };
// };

// export interface Product {
//     id: string;
//     name: string;
//     price: number;
//     description: string;
//     imageURL: string;
//     imageAlt: string;
//     imageCredit: string;
//   }

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   url: string;
//   // imageCredit: string;
// }

//   export async function getProducts(): Promise<Product[]> {
export async function getProducts(): Promise<ISyncProduct[]> {
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
  // const allProducts = await Promise.all(
  //   productIds.map(
  //     async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
  //   )
  // );
  // const products: ISyncProduct[] = allProducts.map(
  //   ({ result: { sync_product, sync_variants } }) => ({
  //     ...sync_product,
  //     variants: sync_variants.map(({ name, ...variant }: any) => ({
  //       name: formatVariantName(name),
  //       ...variant,
  //     })),
  //   })
  // );

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

  const products: ISyncProduct[] = synced_products.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }: any) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  return products;
}

//   const results = await fetch("/products.json");
//   const products = results.json();
//   return products;

export type CartItems = { [productID: string]: number };
export type CheckoutResponse = { success: boolean; error?: string };

// export async function checkout(items: CartItems): Promise<CheckoutResponse> {
//   const modifier = Object.keys(items).length > 0 ? 'success' : 'error';
//   // const url = `${process.env.NEXTAUTH_URL}/pages/api/checkout-${modifier}.json`;
//   // const url = `/api/checkout-${modifier}`;
//   const url = `${process.env.NEXTAUTH_URL}/pages/api/checkout-${modifier}`;
//   await sleep(500);
//   const response = await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(items),
//   });
//   const data = await response.json();
//   if (!data.success) {
//     throw new Error(data.error);
//   }
//   return data as CheckoutResponse;
// }

// utility function to simulate slowness in an API call
const sleep = (time: number) => new Promise((res) => setTimeout(res, time));
