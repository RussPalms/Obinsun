// // import { PrintfulClient } from './printful-request';

// import * as admin from 'firebase-admin';
// import axios from 'axios';
// import rateLimit from 'axios-rate-limit';

// // import axios from "axios";
// // import { useEffect, useState } from "react";

// // const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;
// const serviceAccount =
//   require('pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

// const clientId = process.env.PRINTFUL_CLIENT_ID;

// const clientSecret = process.env.PRINTFUL_SECRET_KEY;

// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

// const code: any = {};

// export const getAccessCode = async () => {
//   const accessCode = await app
//     .firestore()
//     .collection('accessCodes')
//     .doc('Authorization')
//     .get()
//     .then((snapshot) => {
//       const current_access_token = snapshot.data()?.access_token;
//       const current_expires_at = snapshot.data()?.expires_at;
//       const current_refresh_token = snapshot.data()?.refresh_token;
//       if (Date.now() < current_expires_at) {
//         console.log(Date.now());
//         console.log('Using current access token', current_access_token);
//         return current_access_token;
//       } else {
//         return getRefreshedCode(current_refresh_token);
//       }
//     });
//   // console.log("Using access token", accessCode);
//   return accessCode;
// };

// const getRefreshedCode = async (current_refresh_token: any) => {
//   const getRefreshedToken = axios.post('https://www.printful.com/oauth/token', {
//     grant_type: 'refresh_token',
//     client_id: clientId,
//     client_secret: clientSecret,
//     refresh_token: current_refresh_token,
//   });
//   const response = await getRefreshedToken;
//   const refreshedToken = response.data;
//   let new_access_token = refreshedToken.access_token;
//   let new_expires_at = refreshedToken.expires_at;
//   let new_refresh_token = refreshedToken.refresh_token;
//   app.firestore().collection('accessCodes').doc('Authorization').set({
//     access_token: new_access_token,
//     expires_at: new_expires_at,
//     refresh_token: new_refresh_token,
//   });
//   // const new_access_token = refreshedToken.access_token;
//   console.log('Using refreshed access token', new_access_token);
//   // async () => {
//   //   // await
//   //   let c = await new_access_token;
//   //   code['code'] = c;
//   //   // code.push(new_access_token);
//   // };

//   // const getPrintfulCatalogId = rateLimit(axios.create(), {
//   //   maxRequests: 120,
//   //   perMilliseconds: 2000,
//   //   maxRPS: 2,
//   // });
//   // let catalogId: any = [];
//   // let retrieved: any = [];
//   // const axiosHeaders = {
//   //   headers: {
//   //     token_type: "Bearer",
//   //     access_token: new_access_token,
//   //   },
//   // };
//   // await getPrintfulCatalogId
//   //   // .get("https://api.printful.com/products", axiosHeaders)
//   //   .get("https://api.printful.com/sync/products", axiosHeaders)
//   //   .then((response) => {
//   //     const printfulRateLimit = Number(response.headers["x-ratelimit-limit"]);
//   //     catalogId.push(printfulRateLimit);
//   //     const { result } = response.data;
//   //     retrieved.push(result);
//   //     result.forEach((item: any) => {
//   //       const { id } = item;
//   //       catalogId["_id"] = id;
//   //     });
//   //   });

//   return new_access_token;
// };

// // console.log(getAccessCode());
// // getAccessCode();

// // var access_code = await getAccessCode();
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// export const access_code = await getAccessCode();

// // const access_code = getAccessCode();
// // console.log(code);

// // const access_code = Promise.resolve(getAccessCode());
// // const accessCodeGet = async () => {
// // const access_code = await getAccessCode();
// //   return access_code;
// // };

// // export const printful = new PrintfulClient(access_code);

// // export const printful = new PrintfulClient(
// //   'qrRWnZjMiNBYUCUQV9ZnK9rCMIdM7QP1SRSXWmud'
// // );
// // export const printful = new PrintfulClient(accessCodeGet());
// // export const printful = new PrintfulClient(getAccessCode());

export {};
