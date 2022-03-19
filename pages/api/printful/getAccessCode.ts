// import * as admin from "firebase-admin";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const serviceAccount =  const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6'); as string;

// const clientId = process.env.PRINTFUL_CLIENT_ID;

// const clientSecret = process.env.PRINTFUL_SECRET_KEY;

// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

// const getAccessCode = async () => {
//     const accessCode = await app
//       .firestore()
//       .collection("accessCodes")
//       .doc("Authorization")
//       .get()
//       .then((snapshot) => snapshot.data()?.printful_access_token);
//     return  accessCode;
//   };

//   // console.log(await getAccessCode());

//   console.log(await getAccessCode());
export default {};
