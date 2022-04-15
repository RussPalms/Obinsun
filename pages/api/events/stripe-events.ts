import { NextApiRequest, NextApiResponse } from 'next';
import {
  AccountSetup,
  ExternalSetup,
  InitialAccount,
} from 'pages/Production/interfaces/objects/obinsun-objects';
import type Stripe from 'stripe';

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const nextRequest = req.body;
  const {
    transactId,
    change,
    formData,
    date,
    ip,
    cc,
    country,
    stripeId,

    object,
  }: InitialAccount = nextRequest;

  const {
    mcc,
    url,
    firstName,
    lastName,
    dob,
    line1,
    postalCode,
    city,
    state,
    email,
    phone,
    ssnLast4,

    // object,
    currency,
    routing_number,
    account_number,
    number,
    exp_month,
    exp_year,
    cvc,
    bankName,
    cardName,
  }: ExternalSetup = formData;

  // console.log(nextRequest);

  // const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  // const birthDate = datePattern.exec(dob);
  // const birthYear = birthDate[1];
  // const birthMonth = birthDate[2];
  // const birthDay = birthDate[3];

  //   const webhookEndpoint = await stripe.webhookEndpoints.retrieve(
  //     'we_1KganeHgBISqeUGdXkHy6gSd'
  //   );

  //   const selectedEvents = webhookEndpoint.enabled_events

  let selectedChange;
  try {
    selectedChange = change;
  } catch (err: any) {
    res.status(400).send(`${change} is not an option`);
  }

  // console.log(selectedChange);

  //   const createCustomAccount = async (selectedChange) => {
  switch (selectedChange) {
    case 'create-custom-account':
      const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
      const birthDate = datePattern.exec(dob);
      const birthYear = birthDate[1];
      const birthMonth = birthDate[2];
      const birthDay = birthDate[3];

      await stripe.accounts.create({
        country: cc,
        type: 'custom',
        business_profile: {
          mcc: mcc,
          // mcc: '7333',
          url: `https://${url}.com`,
          // url,
        },
        business_type: 'individual',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        individual: {
          first_name: firstName,
          last_name: lastName,
          dob: {
            day: Number(birthDay),
            month: Number(birthMonth),
            year: Number(birthYear),
          },
          address: {
            line1,
            city,
            state,
            postal_code: postalCode,
          },
          email: email,
          phone: phone,
          ssn_last_4: ssnLast4,
        },
        tos_acceptance: { date, ip },
        metadata: {
          transactId,
          change,
        },
      });
      res.status(200).send('creating custom account');
      break;

    case 'create-external-account':
      // switch(object) {
      //   case (object === 'bank'):
      console.log(object);
      if (object === 'bank_account') {
        const bankToken = await stripe.tokens.create({
          bank_account: {
            country,
            currency,
            // account_holder_name: '',
            // account_holder_type: '',
            routing_number,
            account_number,
          },
        });

        await stripe.accounts.createExternalAccount(stripeId, {
          external_account: bankToken.id,
          metadata: { transactId, bankName },
        });
        res.status(200).send(`adding ${object}`);
      }
      if (object === 'card') {
        const cardToken = await stripe.tokens.create({
          card: {
            currency,
            number,
            exp_month,
            exp_year,
            cvc,
          },
        });
        await stripe.accounts.createExternalAccount(stripeId, {
          external_account: cardToken.id,
          metadata: { transactId, cardName },
        });
        res.status(200).send(`adding ${object}`);
      }
      // else {
      //   return res
      //     .status(200)
      //     .send(`custom account option ${object} is not available`);
      // }
      break;

    default:
      console.log(`Unhandled action ${selectedChange}`);
    // }
  }
};
