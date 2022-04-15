import {
  runTransaction,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Firestore,
  FirestoreDataConverter,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { firestoreConnect } from 'pages/server/lib/database/firebaseFirestore';
import { hashPassword } from 'pages/server/lib/password-auth';
import type Stripe from 'stripe';
import fetch from 'node-fetch';
import { async } from '@firebase/util';

// import {
//   // connectToFirebase,
//   firestoreConnect,
// } from '../../server/lib/database/firebaseFirestore';
// import { hashPassword } from '../../server/lib/password-auth';

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
    // accountToken,
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

  const db = firestoreConnect;

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

  // const customerSearch = await stripe.customers.search({
  //   query: 'email:\'sally@rocketrides.io\'',
  // });

  // console.log(personToken);

  const { client_ip } = personToken;

  // console.log(client_ip);

  const getVisitorCountry = () => {
    return new Promise((resolve, reject) => {
      // window.
      fetch(`https://ip2c.org/${client_ip}`)
        .then((response) => response.text())
        .then((data) => {
          const [status, country] = String(data).split(';');
          if (status !== '1') {
            throw new Error('Unable to fetch country');
          }
          // console.log(data);
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

  // console.log(getCountryCurrency);

  const retrievedCountryCurrency = Object.keys(
    getCountryCurrency[0].currencies
  )[0].toLowerCase();

  // const retrievedCurrencySymbol = Object.values(
  //   getCountryCurrency[0].currencies
  // )[0];

  const retrievedCountryFlag = getCountryCurrency[0].flag;

  // console.log(retrievedCountryCurrency);

  await stripe.customers.create({
    email,
    metadata: {
      oId: obinsunUuid,
      ipAddress: client_ip,
      userCountry: `${countryCode}`,
      username,
      // userCurrency: retrievedCountryCurrency,
      // userFlag: `${retrievedCountryFlag}`,
    },
    name: `${firstname} ${lastname}`,
    tax: {
      ip_address: client_ip,
    },
  });

  // console.log(addStripeCustomer)
  // .then(async (createdUser) => {
  //   console.log(createdUser);

  //   const customerData = {
  //     obinsunUuid,
  //     username,
  //     firstname,
  //     lastname,
  //     email: createdUser.email,
  //     password: hashedPassword,
  //     role,
  //   };

  //   // const createCustomer = async (customerData: any) => {
  //   await addDoc(collection(db, 'users'), customerData);

  //   const getRegisteredUser = query(
  //     collection(db, 'users'),
  //     where('email', '==', createdUser.email)
  //   );

  //   const registeredUser = await getDocs(getRegisteredUser);

  //   return res.status(201).json({
  //     message: `Welcome ${createdUser.name}`,
  //     registeredUser,
  //   });
  //   // };

  //   // return createCustomer(customerData);
  // });

  // console.log({ createdCustomer: newCustomer });

  // const getNewUser = async () => {
  // await fetch(`${process.env.NEXTAUTH_URL}/api/webhooks/stripe/transact`).then(
  //   (response) =>
  //     // response.json())
  //     // .then((data) =>
  //     {
  //       console.log(response);

  //       async () => {

  // await addDoc(collection(db, 'users'), registerData);

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

  // const getRegisteredUser = await query(
  //   collection(db, 'users'),
  //   // collection(db, `users/${username}`)
  //   where('email', '==', email)
  //   // doc(db,'users', username)
  // );

  // const registeredUser = await getDocs(getRegisteredUser);
  const registeredUser = await getDoc(userReference);

  const registered = registeredUser.data();

  // console.log(registeredUser.id, registered);

  // console.log(registeredUser);

  // const registeredStatus: any = {};

  // registeredUser.forEach((doc) => {
  //   // doc.data()
  //   // 		registeredStatus["userExistence"] = true;
  //   let a = doc.data();
  //   a['_id'] = doc.id;
  //   registeredStatus[doc.id] = a;
  // });

  // const registered = Object.values(registeredStatus)[0];

  // console.log(registered);

  return res.status(201).json({
    message: 'Created user!',
    // User: JSON.stringify(registered),
    registered,
  });
  // };
  // }
  // );
  // };

  // await getNewUser;
}

export default handler;
