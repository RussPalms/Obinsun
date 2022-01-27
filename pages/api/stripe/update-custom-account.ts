const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, stripeId, date, ip } = req.body;

  const accountUpdate = await stripe.accounts.update(stripeId, {
    // type: "custom",
    tos_acceptance: { date: date, ip: ip },
    metadata: { firebaseID },
  });

  res.status(200);
};
