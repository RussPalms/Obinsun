const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, validationData } = req.body;

  const {
    first_name,
    last_name,
    line1,
    postal_code,
    city,
    state,
    email,
    phone,
  } = validationData;

  const account = await stripe.customers.create({
    // country: "US",
    email: email,
    shipping: {
      address: {
        city: city,
        country: "US",
        line1: line1,
        postal_code: postal_code,
        state: state,
      },
      name: first_name + last_name,

      phone: phone,
    },
    metadata: {
      firebaseID,
    },
  });
  res.status(200);
};
