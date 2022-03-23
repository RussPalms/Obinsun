// import { buffer } from "micro";
// import * as admin from "firebase-admin";
// import axios from "axios";

// const serviceAccount =  const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6'); as string;

// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

// const fulfillAccountCreation = async (account: any) => {
//   console.log("Creating custom account", account);
//   app
//     .firestore()
//     .collection("users")
//     .doc(account.metadata.firebaseID)
//     .collection("custom_account")
//     .doc(account.id)
//     .set({
//       last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
//     });

//   return (
//     app
//       .firestore()
//       .collection("users")
//       .doc(account.metadata.firebaseID)
//       .update({
//         stripeId: account.id,
//       })
//       // })
//       .then(() => {
//         console.log(`SUCCESS: Account ${account.id} has been added to the DB`);
//       })
//   );
// };

// export default async (req: any, res: any) => {
//   if (req.method === "POST") {
//     const requestBuffer = await buffer(req);
//     const payload = requestBuffer.toString();
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (err: any) {
//       console.log("ERROR", err.message);
//       return res.status(400).send(`Webhook error: ${err.message}`);
//     }

//     if (event.type === "capability.updated") {
//       const accountCreationEvents = event.data.object;

//       const account = await stripe.accounts.retrieve(
//         accountCreationEvents.account
//       );

//       return fulfillAccountCreation(account)
//         .then(() => res.status(200).json({ id: account.id }))
//         .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
//     }
//   }
// };

// export const config = {
//   api: {
//     bodyParser: false,
//     externalResolver: true,
//   },
// };

export default function t0() {}
