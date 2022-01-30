const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, stripeId } = req.body;

  const card = await stripe.accounts.createExternalAccount(stripeId, {
    external_account: {
      object: "card",
      number: "",
      exp_month: "",
      exp_year: "",
      // cvc:''
      currency: "usd",
    },
    metadata: { firebaseID },
  });

  res.status(200);
};
