import { buffer } from 'micro';
import * as admin from 'firebase-admin';
// import axios from 'axios';

// const serviceAccount = require("../keys/obinsun-merch-eae07f27cfc7.json");
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

// const fulfillAccountCreation = async (account: any) => {
const fulfillAccountCreation = async (stripeAccount: any) => {
  // console.log(account);

  // console.log(account.metadata.firebaseID);

  // console.log(account.id);

  const account = await stripe.accounts.retrieve(stripeAccount.account);

  // console.log('Creating custom account:', account);
  console.log('neccessary actions:', account.requirements.currently_due[0]);
  app.firestore().collection('accessCodes').doc('Payment').set({
    obinsunId: account.id,
  });

  app
    .firestore()
    .collection('users')
    .doc(account.metadata.firebaseID)
    .collection('custom_account')
    .doc(account.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    });

  return (
    app
      .firestore()
      .collection('users')
      .doc(account.metadata.firebaseID)
      // .collection("custom_account")
      // .doc(account.id)
      .update({
        stripeId: account.id,
        personId: account.individual.id,
      })
      // .update({
      //   stripeId: account.id,
      //   // timestamp: admin.firestore.FieldValue.serverTimestamp(),
      // })
      .then(() => {
        console.log(`SUCCESS: Account ${account.id} has been added to the DB`);
      })
  );
};

export default async (req: any, res: any) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    // console.log(req);

    // const events = await stripe.events.list({
    //   limit: 3,
    // });

    // console.log(events);

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      // console.log(event);
    } catch (err: any) {
      console.log('ERROR', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // const eventList = await stripe.events.list({
    //   limit: 2,
    // });

    // console.log(eventList);

    console.log(event);

    if (
      event.type === 'capability.updated'
      // event.type === 'capability.updated' &&
      // event.pending_webhooks === 0
      // || "person.created" | 'account.updated' | 'person.updated'
    ) {
      const accountCreationEvents = event.data.object;
      const stripeAccount = accountCreationEvents;

      // const account = await stripe.accounts.retrieve(
      //   accountCreationEvents.account
      // );

      // console.log("stripe accout event retrieved: ", account);

      // return res.status(206);

      // if (account.requirements.currently_due !== []) {
      //   // return res.status(201);
      //   return res.status(206);
      // }

      return (
        fulfillAccountCreation(stripeAccount)
          .then(
            () => res.status(200).send('account successfully updated')
            // .json({ id: account.id })
          )
          // .then(() =>
          //   res.status(201).json({
          //     message: "Custom account created successfully!",
          //     account,
          //   })
          // )
          .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
      );
    }

    // if (event.type === 'capability.updated') {
    //   return res.status(200).send('capability.updated');
    // }

    if (event.type === 'person.created') {
      return res.status(200).send('person created');
    }

    if (event.type === 'person.updated') {
      return res.status(200).send('person updated');
    }

    if (event.type === 'account.updated') {
      return res.status(200).send('account updated');
    }

    if (event.pending_webhooks === 0) {
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
