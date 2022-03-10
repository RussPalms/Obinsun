import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// const serviceAccount = require("../keys/obinsun-merch-eae07f27cfc7.json");
const serviceAccount =
  require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;
// const serviceAccount = require(`${ const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6');}`);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const updatingAccount = async (accountUpdate: any) => {
  console.log('Updating account', accountUpdate);

  app
    .firestore()
    .collection('users')
    .doc(accountUpdate.metadata.firebaseID)
    .collection('custom_account')
    .doc(accountUpdate.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    });

  return (
    app
      .firestore()
      .collection('users')
      .doc(accountUpdate.metadata.firebaseID)
      // .collection("custom_account")
      // .doc(accountUpdate.id)
      .update({
        stripeId: accountUpdate.id,
      })
      // .update({
      //   // stripeId: account.id,
      //   last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
      // })
      .then(() => {
        console.log(
          `SUCCESS: Account ${accountUpdate.id} has been updated in the DB`
        );
      })
  );
};

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

    if (event.type === 'capability.updated') {
      const accountUpdateEvent = event.data.object;

      const accountUpdate = await stripe.accounts.retrieve(
        accountUpdateEvent.accountUpdate
      );

      return updatingAccount(accountUpdate)
        .then(() => res.status(200).json({ id: accountUpdate.id }))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
