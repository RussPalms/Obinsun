// // // import * as firebase from "firebase/app";

import { firebaseConfig } from '../../../api/keys/firebase';
// // // import { getStorage } from "firebase/storage";
// import "firebase/storage";
// // // import "@google-cloud/storage";

// // // import initializeApp from "firebase/compat/app";

// import * as firebase from "firebase-admin";

import firebase from 'firebase/compat/app';
// // import "firebase/compat/storage";
// // import "firebase/compat/firestore";
// // import "firebase/compat/getStorage";

// // // import "firebase/storage";
// // // import "firebase/firestore";

// import * as admin from "firebase-admin";

// // const serviceAccount =  const serviceAccount = require('../keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6'); as string;

// // // const application = !admin.apps.length
// // //   ? admin.initializeApp({
// // //       credential: admin.credential.cert(serviceAccount),
// // //       storageBucket: firebaseConfig.storageBucket,
// // //     })
// // //   : admin.app();

// // // const app = !admin.apps.length
// // //   ? admin.initializeApp({
// // //       credential: admin.credential.cert(serviceAccount),
// // //       storageBucket: firebaseConfig.storageBucket,
// // //     })
// // //   : admin.app();

// // //  import { initializeApp, cert } from 'firebase-admin/app';
// // // import{ getStorage } from 'firebase-admin/storage';

// // // const serviceAccount = require('./path/to/serviceAccountKey.json');

// // // initializeApp({
// // //   credential: cert(serviceAccount),
// // //   storageBucket: firebaseConfig.storageBucket
// // // });

// // // const bucket = getStorage().bucket();

// // // const projectStorage = getStorage(firebaseApp);
// // // const projectStorage = firebase.storage();

// // // const app = (
// // // 		!firebase.apps.length
// // // 			? firebase.initializeApp(firebaseConfig)
// // // 			: firebase.app()
// // // 	).firestore();

// // const app = !firebase.apps.length
// //   ? firebase.initializeApp(firebaseConfig)
// //   : firebase.app();

// // // firebase.initializeApp(firebaseConfig);

// // // const storage = firebase.app().storage('gs://your-project.appspot.com');
// // // const storage = firebase.app().storage(firebaseConfig.gsUrl);

// // // const storageRef = storage.ref();

// // // const bucket = app.storage(firebaseConfig.gsUrl).getStorage().bucket();

// // const db = app.firestore();

// // // firebase.initializeApp(firebaseConfig);

// // // const projectStorage = firebase.storage('https://console.firebase.google.com/project/obinsun-merch/storage/obinsun-merch.appspot.com/files#:~:text=gs%3A//obinsun%2Dmerch.appspot.com');
// // const projectStorage = app.storage(firebaseConfig.gsUrl);
// // // const projectStorage = firebase.storage('gs://obinsun-merch.appspot.com');
// // // const projectStorage = app.storage();
// // // const projectStorage = firebaseApplication.storage();
// // // const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// // // const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// // const timestamp = firebase.firestore.FieldValue.serverTimestamp;
// // export { projectStorage, timestamp, db };

// // import { initializeApp, cert, App } from 'firebase-admin/app';
// // import { getStorage} from 'firebase-admin/storage';
// // import { getFirestore } from 'firebase-admin/firestore';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// import serviceAccount from './path/to/serviceAccountKey.json';

// initializeApp(firebaseConfig);

// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

// const app = !firebase.apps.length
//   ? getStorage(initializeApp({ storageBucket: "gs://obinsun-merch.appspot.com" })) | getFirestore(initializeApp(firebaseConfig))
//   : firebase.app();

// let storage = getStorage(initializeApp(firebaseConfig));
// let database = getFirestore(initializeApp(firebaseConfig));

// const app = !firebase.apps.length ? (storage | database) : firebase.app()

// const storage = getStorage(initializeApp(firebaseConfig));
// const storage = getStorage(
//   initializeApp({ storageBucket: "gs://obinsun-merch.appspot.com" })
// );

// const storage = getStorage(initializeApp(firebaseConfig));
// const database = getFirestore(initializeApp(firebaseConfig));

// initializeApp({
// //   credential: cert(serviceAccount),
//   storageBucket: firebaseConfig.gsUrl
// });

// initializeApp({
// //   credential: cert(serviceAccount),
//   storageBucket: firebaseConfig.gsUrl
// });

// const bucket = getStorage().bucket();

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getFirestore(app);

// const projectStorage = getStorage().bucket(firebaseConfig.gsUrl);
// const projectStorage = getStorage({ storageBucket: firebaseConfig.gsUrl })
// const projectStorage = ref(storage)
const projectStorage = storage;
// // const db = admin.firestore();
const db = database;

// const timestamp = admin.firestore.FieldValue.serverTimestamp;
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const timestamp = serverTimestamp();
export { projectStorage, timestamp, db };
// export { app, timestamp };

// import * as firebase from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/storage";
// import "firebase/firestore";

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
// const db = firebase.firestore();
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// export { projectStorage, db, timestamp };

export default function _() {
  const div = document.createElement('div');
  return div;
}
