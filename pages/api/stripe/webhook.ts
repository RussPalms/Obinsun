import { buffer } from "micro";
import * as admin from "firebase-admin";
import axios from "axios";

// const serviceAccount = require("../keys/obinsun-merch-eae07f27cfc7.json");
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;
// const serviceAccount = require(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

// const fulfillAccountCreation = async (account: any) => {
const fulfillAccountCreation = async (stripeAccount: any) => {
  // console.log(account);

  // console.log(account.metadata.firebaseID);

  // console.log(account.id);

  const account = await stripe.accounts.retrieve(stripeAccount.account);

  console.log("Creating custom account:", account);
  app
    .firestore()
    .collection("users")
    .doc(account.metadata.firebaseID)
    .collection("custom_account")
    .doc(account.id)
    .set({
      last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
    });

  return (
    app
      .firestore()
      .collection("users")
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
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

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
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // const eventList = await stripe.events.list({
    //   limit: 2,
    // });

    // console.log(eventList);

    // console.log(event);

    if (event.type === "capability.updated") {
      // if (event.type === "capability.person.updated") {
      // if (
      // event.type === "capability.updated" &&
      // event.pending_webhooks === 2
      // event.pending_webhooks !== 0
      // )
      // {
      // const account = event.data.object;
      const accountCreationEvents = event.data.object;
      // console.log(account);

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
            () => res.status(200)
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
