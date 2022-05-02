// import type Fetch from 'node-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';

// const fetch: typeof Fetch = require('node-fetch');
import fetch from 'node-fetch';
const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
import { getSession } from 'next-auth/react';

import {
  runTransaction,
  collection,
  query,
  orderBy,
  onSnapshot,
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
} from 'firebase/firestore';

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import {
  db,
  projectStorage,
  timestamp,
} from 'pages/server/lib/database/firebaseStorage';

const obinsunBase = `${process.env.NEXTAUTH_URL}`;

export default async function getter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const obinsunSession = await getSession({ req });
  //   const obinsunRequest = req.body;
  const obinsunMessage = req.headers;

  if (
    // !obinsunSession
    // || (
    req.method !== 'GET'
    // || !req.headers.Authorization
    // )
  ) {
    return res.redirect(307, obinsunBase).send({
      obinsunError:
        'You must be sign in to view access this protected api route.',
    });
  } else {
    const retrievalResponse = 'sending retrieval data';
    // console.log(obinsunSession);
    console.dir(
      {
        // 'obinsun-session-logger': obinsunSession,
        // 'obinsun-request-logger': obinsunRequest,
        'obinsun-message-logger': obinsunMessage,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );

    const accessingStripe = `${obinsunMessage.stripe_accessor}`;
    const accessingFirestore = `${obinsunMessage.firestore_accessor}`;

    // console.log(accessingStripe.length, accessingFirestore.length);

    const putBalance = async (sA: string, fA: string) => {
      //   const stripeBalanceLocation = `users/${fA}/stripeBalance`;
      //   const stripeBalanceLocation = `users/${fA}`;
      const stripeBalanceDoc = doc(db, 'users', `${fA}`);
      //   const stripeBalanceRef = collection(db, stripeBalanceLocation);

      const getBalance = await stripe.balance.retrieve({
        stripeAccount: sA,
      });

      //   console.log(getBalance);

      console.dir(
        {
          'stripe-balance-logger': getBalance,
        },
        {
          depth: null,
          maxArrayLength: null,
          colors: true,
        }
      );

      const balanceGetParams = {
        stripeBalance: {
          balanceGotten: timestamp,
          availableBalance: getBalance.available,
          // initial field
          // connectReservedBalance: getBalance.connect_reserved,
          instantAvailableBalance: getBalance.instant_available,
          pendingBalance: getBalance.pending,
        },
      };

      //   await addDoc(stripeBalanceRef, balanceGetParams);
      await updateDoc(stripeBalanceDoc, balanceGetParams);
    };

    return putBalance(accessingStripe, accessingFirestore).then(
      (puttingBalance) => res.send({ gotBalance: puttingBalance })
    );

    // res.send(JSON.stringify(obinsunSession, null, 3));
    // return res.send({ 'retrieval-response': retrievalResponse });
    // return res.send({ 'retrieval-response': retrievalResponse, getBalance });
    // return res.status(200).send({''});
  }
}
