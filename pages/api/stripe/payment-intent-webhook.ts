import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount =
  require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

// const externalAccount = async (addExternalAccount: any) => {
//   console.log("Adding external account", addExternalAccount);

//   app
//     .firestore()
//     .collection("users")
//     .doc(addExternalAccount.metadata.firebaseID)
//     .collection("custom_account")
//     .doc(addExternalAccount.account)
//     .collection("external_account")
//     .doc(addExternalAccount.id)
//     .set({
//       last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
//     });

//   return app
//     .firestore()
//     .collection("users")
//     .doc(addExternalAccount.metadata.firebaseID)
//     .update({
//       externalAccountId: addExternalAccount.id,
//     })
//     .then(() => {
//       console.log(
//         `SUCCESS: Account ${addExternalAccount.id} has been updated in the DB`
//       );
//     });
// };

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      console.log(event);
    } catch (err: any) {
      console.log('ERROR', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'payment_intent.created') {
      const addPaymentIntentEvent = event.data.object;

      console.log(addPaymentIntentEvent);

      //   const addExternalAccount = await stripe.accounts.retrieveExternalAccount(
      //     event.account,
      //     addExternalAccountEvent.id
      //   );

      //   console.log(addExternalAccount);

      //   return externalAccount(addExternalAccount)
      //     .then(() => res.status(200).json({ id: addExternalAccount.id }))
      //     .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
      return res.status(200);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
