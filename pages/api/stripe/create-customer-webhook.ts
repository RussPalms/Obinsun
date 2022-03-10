import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import axios from 'axios';

const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const customerCreation = async (customerAccount: any) => {
  const customer = await stripe.customers.retrieve(customerAccount.id);

  console.log('Creating customer account:', customer);
  app
    .firestore()
    .collection('users')
    .doc(customer.metadata.firebaseID)
    .collection('customer')
    .doc(customer.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    });

  return app
    .firestore()
    .collection('users')
    .doc(customer.metadata.firebaseID)
    .update({
      //   stripeId: customer.id,
      customerId: customer.id,
    })
    .then(() => {
      console.log(`SUCCESS: Customer ${customer.id} has been added to the DB`);
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

    if (event.type === 'customer.created') {
      const customerCreationEvents = event.data.object;
      // console.log(account);

      const customerAccount = customerCreationEvents;

      console.log(customerAccount);

      return (
        customerCreation(customerAccount)
          .then(() => res.status(200))
          // .then(() =>
          //   res.status(201).json({
          //     message: "Custom account created successfully!",
          //     account,
          //   })
          // )
          .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
      );
    }

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
