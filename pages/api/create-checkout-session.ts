const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const {
    items,
    // email
    firebaseID,
  } = req.body;
  const transformedItems = items.map((item: any) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        // name: item.title,
        name: item.name,
        images: [item.image],
        // url: item.url,
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // default_tax_rates: ["txr_1KJrfvHgBISqeUGdOdJvjoXe"],
    shipping_rates: ["shr_1KJrdeHgBISqeUGdzitDzzIN"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      // email,
      firebaseID,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
