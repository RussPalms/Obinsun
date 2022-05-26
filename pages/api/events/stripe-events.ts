import { NextApiRequest, NextApiResponse } from 'next';
import {
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

    currency,
    routing_number,
    account_number,
    number,
    exp_month_year,
    cvc,
    bankName,
    cardName,
  }: ExternalSetup = formData;

  let selectedChange: any;
  try {
    selectedChange = change;
  } catch (err: any) {
    res.status(400).send(`${change} is not an option`);
  }

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
          url: `https://${url}.com`,
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
      console.log(object);
      if (object === 'bank_account') {
        const bankToken = await stripe.tokens.create({
          bank_account: {
            country,
            currency,
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
        const expPattern = /(\d{4})-(\d{1,2})/;
        const expDate = expPattern.exec(exp_month_year);
        const expYear = expDate[1];
        const expMonth = expDate[2];
        const cardToken = await stripe.tokens.create({
          card: {
            currency,
            number,
            exp_month: expMonth,
            exp_year: expYear,
            cvc,
          },
        });

        console.log(cardToken);

        const addCard = await stripe.accounts
          .createExternalAccount(stripeId, {
            external_account: cardToken.id,
            metadata: { transactId, cardName },
          })
          .catch((errors) => {
            const { message } = errors.raw;
            console.error({
              ExternalAccountCardErrorMessage: message,
            });
            console.dir(
              {
                'external-account-card-error-logger': errors,
              },
              {
                depth: null,
                maxArrayLength: null,
                colors: true,
              }
            );
            return { errorMessage: message };
          });
        console.dir(
          {
            'external-account-card-logger': addCard,
          },
          {
            depth: null,
            maxArrayLength: null,
            colors: true,
          }
        );
        res.status(200).send(`adding ${object}`);
      }
      break;

    default:
      console.log(`Unhandled action ${selectedChange}`);
  }
};
