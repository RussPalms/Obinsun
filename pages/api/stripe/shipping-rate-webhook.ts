import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import axios from 'axios';

// const serviceAccount = require("../keys/obinsun-merch-eae07f27cfc7.json");
const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;
// const serviceAccount = require(`${ const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6');}`);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const createShippingRate = async (shippingRate: any) => {
  const rate = await stripe.shippingRates.retrieve(shippingRate.id);

  console.log('Creating shipping rate:', rate);

  return app
    .firestore()
    .collection('users')
    .doc(rate.metadata.firebaseID)
    .collection('custom_account')
    .doc(rate.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Shipping Rate ${rate.id} has been added to the DB`);
    });
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

    // if (event.type === "shipping_rate.updated") {
    //   const shippingRateEvents = event.data.object;
    //   const shippingRate = shippingRateEvents;

    // //   console.log(shippingRate)

    //   return (
    //     createShippingRate(shippingRate)
    //       .then(
    //         () => res.status(200)
    //       )
    //       .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
    //   );
    // }

    // if (event.pending_webhooks === 0) {
    //   return res.status(200);
    // }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
