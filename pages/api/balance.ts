import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';
// import type Fetch from 'node-fetch'

// const fetch: typeof Fetch = require('node-fetch')
const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const balanceHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const stripeUrl = 'https://api.stripe.com/v1/'
  // const stripeHeaders = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  //     "Stripe-Account": "CONNECTED_STRIPE_ACCOUNT_ID"
  // }
  const connectedAccounts = await stripe.accounts
    .list({ limit: 3 })
    .catch((errors) => {
      const { message } = errors.raw;
      console.error({
        AccountRetrievalErrorMessage: message,
      });
      console.dir(
        {
          'account-retrieval-error-logger': errors,
        },
        {
          depth: null,
          maxArrayLength: null,
          colors: true,
        }
      );
      return { errorMessage: message };
    });
  if (req.method === 'GET') {
    console.dir(
      {
        'account-retrieval-logger': connectedAccounts,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );

    // return res.status(200).send(connectedAccounts);
    // return res.status(200).send('retrieved accounts');
    return res.status(200);
  }
};

export default balanceHandler;
