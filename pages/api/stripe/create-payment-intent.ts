// const express = require("express");
// const app = express();
// // This is a public sample test API key.
// // Don’t submit any personally identifiable information in requests made with this key.
// // Sign in to see your own test API key embedded in code samples.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// app.use(express.static("public"));
// app.use(express.json());

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "eur",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.listen(4242, () => console.log("Node server listening on port 4242!"));

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);

// import {stripe} from '@types/stripe'
import { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';

type stripeType = Stripe;

const stripeApi: stripeType = require('stripe')(
  `${process.env.STRIPE_SECRET_KEY}`
);

// const stripe = require("stripe")

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { items } = req.body;

  const paymentIntent = await stripeApi.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // console.log(paymentIntent);

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

  // res.status(200);
};
