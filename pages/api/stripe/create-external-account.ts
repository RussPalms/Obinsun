import type Stripe from 'stripe';

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, stripeId } = req.body;

  const addExternalAccount = await stripe.accounts.createExternalAccount(
    stripeId,
    {
      external_account: `${{
        object: 'bank_account',
        country: 'US',
        currency: 'usd',
        routing_number: '110000000',
        account_number: '000999999991',
      }}`,
      metadata: { firebaseID },
    }
  );

  res.status(200);
};
