import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// const serviceAccount = require('../keys/obinsun-merch-firebase-adminsdk-muak1-802398644d.json');
const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string; // const serviceAccount =  const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6'); as string;
// const serviceAccount = require(`${ const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6');}`);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const fulfillOrder = async (session: any) => {
  console.log('Fulfilling order', session);

  return (
    app
      .firestore()
      .collection('users')
      // .doc(session.metadata.email)
      .doc(session.metadata.firebaseID)
      .collection('orders')
      .doc(session.id)
      .set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
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
    } catch (err: any) {
      console.log('ERROR', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200))
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
