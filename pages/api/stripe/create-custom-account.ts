const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: any, res: any) => {
  // const { firebaseID, account, person } = req.body;

  // const accountResult = await stripe.tokens.create({
  //   // business_type: 'company',
  //   account: account,
  // });

  // const personResult = await stripe.tokens.create({
  //   person: person,
  // });

  // console.log(personResult, accountResult);

  // if (accountResult.token && personResult.token) {
  //   await axios.post('/api/stripe/create-custom-account', {
  //     firebaseID: session?.id,
  //     accountTokenId: accountResult.token.id,
  //     personTokenId: personResult.token.id,
  //   });
  // }
  // console.log(req.body);

  const { firebaseID, date, ip, formData } = req.body;

  console.log(formData);

  const {
    // business_type,
    mcc,
    url,
    firstName,
    lastName,
    // day,
    // month,
    // year,
    dob,
    line1,
    postalCode,
    city,
    state,
    email,
    phone,
    ssnLast4,
  } = formData;

  // var o = Number("000000000");

  const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  const birthDate = datePattern.exec(dob);
  const birthYear = birthDate[1];
  const birthMonth = birthDate[2];
  const birthDay = birthDate[3];

  await stripe.accounts.create({
    country: 'US',
    type: 'custom',
    business_profile: {
      // mcc: 7333,
      mcc: mcc,
      // url: "https://obinsun.com",
      url: `https://${url}.com`,
    },
    // business_type: "individual",
    business_type: 'individual',
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
      first_name: firstName,
      // last_name: "Palma",
      last_name: lastName,
      dob:
        // dob,
        {
          // day: 1,
          day: Number(birthDay),
          // month: 1,
          month: Number(birthMonth),
          // year: 1901,
          year: Number(birthYear),
        },
      address: {
        // line1: "3067 Canyon Vista Dr",
        line1: line1,
        // city: "Colton",
        city: city,
        // state: "CA",
        state: state,
        // postal_code: 92324,
        postal_code: postalCode,
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
      ssn_last_4: `${ssnLast4}`,
    },
    tos_acceptance: { date: date, ip: ip },
    metadata: {
      firebaseID,
    },
  });
  res.status(200).send('account updating');
};
