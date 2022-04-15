import { getSession } from 'next-auth/react';
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
} from 'firebase/firestore';
import {
  // connectToFirebase,
  firestoreConnect,
} from '../../server/lib/database/firebaseFirestore';
import { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

async function shippingHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return;
  }

  //   const session = await getSession({ req: req });

  //   if (!session) {
  //     res.status(401).json({ message: 'Not authenticated!' });
  //     return;
  //   }

  const {
    first,
    last,
    city,
    country,
    line1,
    line2,
    postal_code,
    state,
    stripeAccess,
  } = req.body;

  //   const { userData } = stripeAccess;
  //   console.log(stripeAccess);

  //   const userUsername = session?.user?.username;

  await stripe.customers.update(stripeAccess, {
    address: { city, country, line1, line2, postal_code, state },
    shipping: {
      address: {
        city,
        country,
        line1,
        line2,
        postal_code,
        state,
      },
      name: `${first} ${last}`,
    },
  });

  //   const db = firestoreConnect;

  //   const userReference = doc(db, 'users', userUsername);

  // //   const AuthenticationQuery = query(
  // //     collection(db, 'users'),
  // //     where('email', '==', userEmail)
  // //   );

  //   const authSnapshot = await getDocs(AuthenticationQuery);

  //   const userCollection: any = [];

  //   authSnapshot.forEach((doc) => {
  //     let a = doc.data();
  //     a['_id'] = doc.id;
  //     userCollection[doc.id] = a;
  //   });

  //   const user = Object.values(userCollection)[0] as any;

  //   if (!user) {
  //     res.status(404).json({ message: 'User not found.' });
  //     return;
  //   }

  //   const currentPassword = user.password;
  //   const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  //   if (!passwordsAreEqual) {
  //     res.status(403).json({ message: 'Invalid Password!' });
  //     return;
  //   }

  //   const hashedPassword = await hashPassword(newPassword);

  //   const userRef = doc(db, 'users', user._id);

  //   await updateDoc(userRef, {
  //     email: userEmail,
  //     password: hashedPassword,
  //   });

  //   console.log(user);

  res.status(200).json({ message: 'Updating Shipping Details!' });
}

export default shippingHandler;
