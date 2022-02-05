const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// export default async (req: any, res: any) => {
//   const { firebaseID, stripeId } = req.body;

//   const createShippingRate = await stripe.shippingRates.create({
//     display_name: "Obinsun Shipping",
//     type: "fixed_amount",
//     fixed_amount: {
//       amount: 500, //* 1000 for usd
//       currency: "usd",
//     },
//     delivery_estimate: {
//       maximum: {
//         unit: "day",
//         value: 3,
//       },
//     },

//     metadata: {
//       firebaseID,
//       stripeId,
//     },
//   });

//   //   console.log(createShippingRate);
//   res.status(200);
// };

export default async (req: any, res: any) => {
  const { firebaseID, stripeId } = req.body;

  const createTaxRate = await stripe.taxRates.create({
    display_name: "GST", // goods and service
    inclusive: true,
    percentage: 9.47,
    country: "US",
    description: "GST United States",

    metadata: {
      firebaseID,
      stripeId,
    },
  });

  console.log(createTaxRate);
  res.status(200);
};
