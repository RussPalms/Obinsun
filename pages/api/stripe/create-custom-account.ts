const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  const { firebaseID, date, ip, validationData } = req.body;

  const {
    business_type,
    mcc,
    url,
    first_name,
    last_name,
    day,
    month,
    year,
    line1,
    postal_code,
    city,
    state,
    email,
    phone,
    ssn_last_4,
  } = validationData;

  // var o = Number("000000000");

  const account = await stripe.accounts.create({
    country: "US",
    type: "custom",
    business_profile: {
      // mcc: 7333,
      mcc: mcc,
      // url: "https://obinsun.com",
      url: url,
    },
    // business_type: "individual",
    business_type: business_type,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    // company: {
    //   external_accounts: {
    //     object: "bank_account",
    //     country: "US",
    //     currency: "usd",
    //     routing_number: "110000000",
    //     account_number: "000999999991",
    //   },
    // },
    individual: {
      // id_number: 000000001,
      // id_number: 0o0 * 9,
      // id_number: 0o000000000,
      // id_number: "000000000",
      // first_name: "Russell",
      first_name: first_name,
      // last_name: "Palma",
      last_name: last_name,
      dob: {
        // day: 1,
        day: Number(day),
        // month: 1,
        month: Number(month),
        // year: 1901,
        year: Number(year),
      },
      address: {
        // line1: "3067 Canyon Vista Dr",
        line1: line1,
        // city: "Colton",
        city: city,
        // state: "CA",
        state: state,
        // postal_code: 92324,
        postal_code: postal_code,
      },
      // email: "russb.palms@gmail.com",
      email: email,
      // phone: 9092895924,
      phone: phone,
      // tax_id: 00000000
      //   tax_id: 0o00000000,
      // tax_id: 0o0,
      //   // tax_id: {var o = 00000000}
      // ssn_last_4: "0000",
      ssn_last_4: `${ssn_last_4}`,
    },
    tos_acceptance: { date: date, ip: ip },
    metadata: {
      firebaseID,
    },
  });
  res.status(200);
};
