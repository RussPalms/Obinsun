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
import { getSession } from 'next-auth/react';
// import ProductGrid from '@/components/ProductIntegration/ProductGrid';
// import { formatVariantName } from 'server/lib/format-variant-name';
import { getToken, JWT } from 'next-auth/jwt';
import { keyCreation } from './Production/interfaces/objects/obinsun-objects';
import { buffer } from 'micro';

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
  // const getTestResults = async () => {
  //   fetch(
  //     `https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/documents/accessCodes/Authorization`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

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
      {/* <button onClick={getTestResults}>Retrieve</button> */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  // export const getServerSideProps = async (ctx) => {
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
          // console.log(Date.now());
          // console.log('Using current access token', current_access_token);
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
    // console.log('Using refreshed access token', new_access_token);

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

  // const getProviders = async () => {
  //   await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`).then(
  //     (response) => console.log(response)
  //   );
  //   // .then((data) => console.log(data));
  // };

  // getProviders();

  // const getProviders = async () => {
  //   await fetch(`${process.env.NEXTAUTH_URL}/api/auth/examples/jwt`).then(
  //     (response) => console.log(response)
  //   );
  //   // .then((data) => console.log(data));
  // };

  // getProviders();

  // console.log(products);

  // const getTestResults = async () => {
  //   fetch(
  //     `https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/documents/accessCodes/Authorization`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };

  // // console.log(getTestResults);
  // getTestResults();

  // const nextSession = await getSession(ctx);
  // console.log({ nextAuthSession: nextSession });

  const dbAttributes: keyCreation[] = [
    {
      obinsunKey: `string`,
      username: `string`,
      firstname: `string`,
      lastname: `string`,
      email: `string`,
      password: `string`,
      ip: `string`,
      cc: `string`,
    },
  ];

  const addDBKeys = {
    method: 'POST',
    body: JSON.stringify(dbAttributes),
    headers: {
      'Content-Type': 'application/json',
      // 'obinsun-db': `Piece 0`,
      'obinsun-db': `Piece 0`,
      // Authorization: `Bearer token`,
    },
  };

  console.log(dbAttributes);

  const runRetrieval = async () => {
    // const reader = new FileReader();

    // const requestBuffer = await buffer(req);
    // const payload = requestBuffer.toString();
    // const sig = req.headers['stripe-signature'];
    // const retrieveDBkeys =
    await fetch(`${process.env.NEXTAUTH_URL}/api/dbs/`, addDBKeys).then(
      (keys) =>
        // console.log({ returnedKeys: keys.body})
        {
          // const jsonString = Buffer.from(keys.body).toString('utf8');
          // async ({id}) => {await keys.text()};
          // console.log({ jsonString });
          // const {sentKeys} = keys.body
          // console.log(keys.text());
          const getKeys = async () => {
            const keyRetrieval = await keys.text();
            console.log(keyRetrieval);
          };
          // full retrieval of html document?

          getKeys();
          // const parsedData = JSON.parse(jsonString);

          // console.log(parsedData);
        }
    );
    // .then((text) => console.log(text));
    // .then((array) => console.log(array.body)
    // );
    // console.log({ retrievedKeys: retrieveDBkeys });
  };
  runRetrieval();

  return {
    props: {
      products: shuffle(products),
      // nextSession,
    },
  };
};

export default IndexPage;

// const getStaticProps: GetStaticProps = async(ctx) => {
//   const nextSession = await getSession(ctx);
//   console.log({ nextAuthSession: nextSession });

//   return {}
// }

// export const getServerSideProps = async () => {
//   const obinsunKey = uuidv4();

//   const dbAttributes: keyCreation[] = [
//     {
//       obinsunKey: `string`,
//       username: `string`,
//       firstname: `string`,
//       lastname: `string`,
//       email: `string`,
//       password: `string`,
//       ip: `string`,
//       cc: `string`,
//     },
//   ];

//   const addDBKeys = {
//     method: 'POST',
//     body: JSON.stringify(dbAttributes),
//     headers: {
//       Database: `Piece 0`,
//     },
//   };

//   console.log(dbAttributes);

//   const runRetrieval = async () => {
//     const retrieveDBkeys = await fetch(`/api/dbs/`, addDBKeys);
//     console.log({ retrievedKeys: retrieveDBkeys });
//   };

//   runRetrieval();

//   return {};
// };

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// export const getServerSideProps = async ({
//   req: NextApiRequest,
//   res: NextApiResponse,
// }) => {};
