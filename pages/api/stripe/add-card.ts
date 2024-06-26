const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, stripeId } = req.body;

  const card = await stripe.accounts.createExternalAccount(stripeId, {
    external_account: {
      object: 'card',
      // number: '4000000000004202',
      number: '4000056655665556',
      // token: "4000000000004202",
      // exp_month: 3,
      // exp_year: 2023,
      // cvc: '314',
      currency: 'usd',
    },
    metadata: { firebaseID },
  });

  console.log(card);

  res.status(200);
};
