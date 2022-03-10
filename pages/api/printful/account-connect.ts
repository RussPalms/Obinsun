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
import { hashPassword } from '../../server/lib/password-auth';
import { buffer } from 'micro';

import * as admin from 'firebase-admin';
import axios from 'axios';
import { useState } from 'react';

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;

const clientId = process.env.PRINTFUL_CLIENT_ID;

const clientSecret = process.env.PRINTFUL_SECRET_KEY;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const createAccessCode = async (printfulTokenData: any) => {
  return app
    .firestore()
    .collection('accessCodes')
    .doc('Authorization')
    .set({
      access_token: printfulTokenData.access_token,
      expires_at: printfulTokenData.expires_at,
      token_type: printfulTokenData.token_type,
      refresh_token: printfulTokenData.refresh_token,
    })
    .then(() => {
      console.log(
        `SUCCESS: Printful code ${printfulTokenData.access_token} has been added to the DB`
      );
    });
};

async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // console.log(req);
    // console.log(req.body);
    console.log(req.client.body);

    const printfulAccess = req.query.code;

    // const getPrintfulToken = axios.get(
    //   "https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/collections/accessCodes/documents/fields/printful_access_code"
    // );

    // const getPrintfulTokenPath = await axios.get(
    //   "https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/collectionGroups/accessCodes/fields/printful_access_token"
    // );

    // const getPrintfulTokenPath = await fetch(
    //   "https://firestore.googleapis.com/v1/projects/photo-gallery-upload/databases/(default)/collectionGroups/accessCodes/fields/printful_access_token"
    // );

    const getPrintfulToken = await axios.post(
      'https://www.printful.com/oauth/token',
      {
        grant_type: 'access_token',
        client_id: clientId,
        client_secret: clientSecret,
        code: printfulAccess,
      }
    );

    const response = await getPrintfulToken;

    // const { body } = req;
    // console.log(body);

    // console.log(response.body);

    const printfulTokenData = response.data;
    console.log(printfulTokenData);

    return createAccessCode(printfulTokenData)
      .then(() => res.redirect(307, 'http://localhost:3000/settings'))
      .catch((err) => res.status(400).send(`Error: ${err.message}`));
  }
}

export default handler;
