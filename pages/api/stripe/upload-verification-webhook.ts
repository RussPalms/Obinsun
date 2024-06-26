import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// const serviceAccount = require("../keys/obinsun-merch-eae07f27cfc7.json");
const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string; // const serviceAccount = require(`${ const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6');}`);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const externalAccount = async (updateIndividualPerson: any) => {
  console.log('Updating individual person', updateIndividualPerson);

  app
    .firestore()
    .collection('users')
    .doc(updateIndividualPerson.metadata.firebaseID)
    .collection('custom_account')
    .doc(updateIndividualPerson.account)
    .collection('individual')
    .doc(updateIndividualPerson.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    });

  return (
    app
      .firestore()
      .collection('users')
      .doc(updateIndividualPerson.metadata.firebaseID)
      // .collection("custom_account")
      // .doc(updateIndividualPerson.id)
      .update({
        personId: updateIndividualPerson.id,
      })
      // .update({
      //   // stripeId: account.id,
      //   last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
      // })
      .then(() => {
        console.log(
          `SUCCESS: Individual ${updateIndividualPerson.id} has been updated in the DB`
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

    console.log(event.account);

    // if (event.type === "person.updated") {
    if (event.type === 'account.updated') {
      const updatePerson = event.data.object;
      // const updatePerson = event.account;

      //   console.log(addExternalAccountEvent);

      const updateIndividualPerson =
        // await stripe.accounts.retrieveExternalAccount(
        await stripe.accounts.retrieve(
          // event.account,
          updatePerson.id
        );

      // const individualExternalAccount = await stripe.accounts.retrieveExternalAccount(updatePerson.id, updatePerson.matadata.firebaseID.custom_account.external_account)

      //   console.log(addExternalAccount);

      console.log(updateIndividualPerson);

      // return externalAccount(updateIndividualPerson)
      //   .then(
      //     () => res.status(200)
      //     // .json({ id: addExternalAccount.id })
      //   )
      //   .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
