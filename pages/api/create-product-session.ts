const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
import * as admin from "firebase-admin";

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// import obinsun_id from "../server/lib/stripe-client"

export default async (req: any, res: any) => {
  const { firebaseID } = req.body;

  const paymentId = await app
    .firestore()
    .collection("accessCodes")
    .doc("Payment")
    .get()
    .then((snapshot) => {
      snapshot.data()?.obinsunId;
    });

  const paymentIntent = await stripe.paymentIntents.create(
    {
      payment_method_types: ["card"],
      amount: 1000,
      currency: "usd",
      application_fee_amount: 123,
    },
    {
      stripeAccount: paymentId,
      metadata: {
        firebaseID,
      },
    }
  );
  res.status(200);
};
