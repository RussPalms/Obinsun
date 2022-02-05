// //@ts-nocheck

// import * as admin from "firebase-admin";

// const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;

// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

// export const getPaymentId = async () => {
//   const paymentId = await app
//     .firestore()
//     .collection("accessCodes")
//     .doc("Payment")
//     .get()
//     .then((snapshot) => {
//       snapshot.data()?.obinsunId;
//     });
//   return paymentId;
// };

// export default obinsun_id = await getAccessCode();
export {};
