import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { firestoreConnect } from 'pages/server/lib/database/firebaseFirestore';
import { hashPassword } from 'pages/server/lib/password-auth';
import type Stripe from 'stripe';
import fetch from 'node-fetch';
import { db } from 'pages/server/lib/database/firebaseStorage';

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const {
    obinsunUuid,
    username,
    firstname,
    lastname,
    email,
    password,
    role,
    personToken,
  } = data;

  if (
    !email ||
    !email.includes('@') ||
    !email.includes('.') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  // const db = firestoreConnect;

  const hashedPassword = await hashPassword(password);

  const checkExistingUser = await query(
    collection(db, 'users'),
    where('email', '==', email)
  );

  const existingUserSnapshot = await getDocs(checkExistingUser);

  const existingStatus: any = {};

  existingUserSnapshot.forEach((doc) => {
    if (!doc.data().empty) {
      existingStatus['userExistence'] = true;
    }
  });

  const existence = Object.values(existingStatus)[0];

  if (existence) {
    res.status(422).json({ message: 'User already exists!' });
    return;
  }

  const { client_ip } = personToken;

  const getVisitorCountry = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://ip2c.org/${client_ip}`)
        .then((response) => response.text())
        .then((data) => {
          const [status, country] = String(data).split(';');
          if (status !== '1') {
            throw new Error('Unable to fetch country');
          }
          resolve(country);
        })
        .catch(() => {
          resolve('US');
        });
    });
  };

  const countryCode = await getVisitorCountry().then((country) => {
    if (['PK', 'BD', 'TR', 'AF'].indexOf(`${country}`) !== -1) {
      return country;
    } else {
      return country;
    }
  });

  const getCountryCurrency = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } }
  )
    .then((response) => response.json())
    .then((data) => data);

  const retrievedCountryCurrency = Object.keys(
    getCountryCurrency[0].currencies
  )[0].toLowerCase();

  const retrievedCountryFlag = getCountryCurrency[0].flag;

  await stripe.customers.create({
    email,
    metadata: {
      oId: obinsunUuid,
      ipAddress: client_ip,
      userCountry: `${countryCode}`,
      username,
    },
    name: `${firstname} ${lastname}`,
    tax: {
      ip_address: client_ip,
    },
  });

  const registerData = {
    obinsunUuid,
    username,
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
    registeredInfo: {
      userCountryCode: countryCode,
      userCurrency: retrievedCountryCurrency,
      userFlag: retrievedCountryFlag,
    },
  };

  const userReference = doc(db, 'users', username);
  await setDoc(userReference, registerData);

  const registeredUser = await getDoc(userReference);

  const registered = registeredUser.data();

  return res.status(201).json({
    message: 'Created user!',
    registered,
  });
}

export default handler;
