import { NextApiRequest, NextApiResponse } from 'next';
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
  onSnapshot,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { firestoreConnect as db } from 'pages/server/lib/database/firebaseFirestore';
import { timestamp } from 'pages/server/lib/database/firebaseStorage';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const designData = req.body;

  const { id, file, url, name, description } = designData;

  if (req.method === 'POST') {
    // console.log(designData);

    const checkExistingDesign = query(
      collection(db, 'designs'),
      where('name', '==', name)
    );

    // console.log(checkExistingDesign);

    const design = {
      id,
      // file,
      url,
      name,
      description,
      //   createdAt: serverTimestamp(),
      createdAt: timestamp,
    };

    // console.log(design);

    const existingDesignSnapshot = await getDocs(checkExistingDesign);

    // console.log(existingDesignSnapshot);

    let existingDesignStatus: Object = {};

    existingDesignSnapshot.forEach((designDoc) => {
      if (!designDoc.data().empty) {
        existingDesignStatus['designExistence'] = true;
      }
    });

    const designExistence = Object.values(existingDesignStatus)[0];

    // console.log(designExistence);

    if (designExistence) {
      return res.status(422).json({
        message:
          'Design name already exists, please choose different design name.',
      });
    } else {
      await addDoc(collection(db, 'designs'), design);

      //   const getAddedDesign = query(
      //     collection(db, 'designs'),
      //     where('name', '==', name)
      //   );

      //   const addedDesign = await getDocs(getAddedDesign);

      return res.status(201).json({
        message: `Added ${name}!`,
        // addedDesign,
      });
    }
  }

  if (req.method === 'GET') {
    const requestedDesigns = query(
      collection(db, 'designs'),
      orderBy('createdAt', 'desc')
    );

    const allDesigns = await getDocs(requestedDesigns);

    // onSnapshot(requestedDesigns, (designSnapshot) => {
    //   let designDocuments = [];
    //   designSnapshot.forEach((doc) => {
    //     designDocuments.push({ ...doc.data(), id: doc.id });
    //   });
    // });

    let designCollection = [];

    allDesigns.forEach((designDocument) => {
      //   let a = designDocument.data();
      //   a['_id'] = designDocument.id;
      //   designCollection[designDocument.id] = a;
      designCollection.push({
        ...designDocument.data(),
        // id: designDocument.id,
      });
    });

    // console.log(designCollection);

    const retrievedDesigns = JSON.stringify(Object.values(designCollection));

    return res.status(201).json(retrievedDesigns);
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
};
