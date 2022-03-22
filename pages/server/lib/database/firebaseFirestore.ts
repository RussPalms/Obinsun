// import * as firebase from "firebase/app";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'pages/api/keys/firebase';
// import { firebaseConfig } from '../../../api/keys/firebase';
import { FirebaseAdapter } from './firebase-adapter';
// import { getStorage } from "firebase/storage";

// import "firebase/storage";
// import "firebase/firestore";
// import '@google-cloud/storage'

// import firebase from "firebase/compat/app";
// import firebase from "firebase/app/lite;
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

// import * as admin from "firebase-admin";

// const serviceAccount =  const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6'); as string;

// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

//  import { initializeApp, cert } from 'firebase-admin/app';
// import{ getStorage } from 'firebase-admin/storage';

// const serviceAccount = require('./path/to/serviceAccountKey.json');

// initializeApp({
//   credential: cert(serviceAccount),
//   // storageBucket: '<BUCKET_NAME>.appspot.com'
//   storageBucket: firebaseConfig.storageBucket
// });

// const bucket = getStorage().bucket();

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();
// export const db = firebase.firestore();
// export const db = firebase.firestore();
// export const db = app.firestore();
// const auth = firebase.auth();
// const projectStorage = getStorage(firebaseApp);
// const projectStorage = firebase.storage();
// const projectStorage = app.storage();
// const projectStorage = firebaseApplication.storage();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// export { projectStorage, timestamp };

export async function connectToFirebase() {
  const firestoreConnect = await getFirestore(initializeApp(firebaseConfig));

  return firestoreConnect;
}

export const firestoreConnect = getFirestore(initializeApp(firebaseConfig));

const firestore = () => {
  const FirebaseClientObject = {
    db: firestoreConnect,
  };

  return FirebaseClientObject;
};

export const adapterInstance = FirebaseAdapter(firestore());
