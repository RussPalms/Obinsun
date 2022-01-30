const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  // const { firebaseID } = req.body;
  const { firebaseID, stripeId, date, ip } = req.body;

  const account = await stripe.accounts.create({
    country: "US",
    type: "custom",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    // success_url: `${process.env.NEXTAUTH_URL}/routes/protected/profile`,
    // cancel_url: `${process.env.NEXTAUTH_URL}/routes/protected/creator/payment-registration`,
    tos_acceptance: { date: date, ip: ip },
    metadata: {
      firebaseID,
    },
  });

  // console.log(account);

  // console.log(account.id);
  // return account.id;
  // res.status(200).json({ id: account.id });
  res.status(200);
  // res.status(201).json({
  //   message: "Custom account created successfully!",
  //   account,
  // })

  // res.status(200).json({ id: account.account });
  // res.status(200).json({ stripeId: account.account });
  // res.status(201).json({ stripeId: account.id });
  // res.status(200).json({ accountId: account.id });

  // const webhookEndpoint = await stripe.webhookEndpoints.create({
  //   url: `${process.env.NEXTAUTH_URL}/api/stripe/webhook`,
  //   enabled_events: [
  //     "account.updated",
  //     "account.application.authorized",
  //     "account.external_account.created",
  //     "account.external_account.updated",
  //     "capability.updated",
  //   ],
  // });

  // console.log(webhookEndpoint);

  // res.status(200).json({ webhookEndpoints: webhookEndpoint });

  // const accountUpdate = await stripe.accounts.update(stripeId, {
  //   tos_acceptance: { date: date, ip: ip },
  // });

  // res.status(200);
};
