const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, stripeId } = req.body;

  const card = await stripe.accounts.createExternalAccount(stripeId, {
    external_account: {
      object: "card",
      number: "4000000000004202",
      // token: "4000000000004202",
      // exp_month: "4",
      // exp_year: "24",
      // cvc:''
      currency: "usd",
    },
    metadata: { firebaseID },
  });

  console.log(card);

  res.status(200);
};
