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

  const { id, file, name, description } = designData;

  if (req.method === 'POST') {
    const checkExistingDesign = query(
      collection(db, 'designs'),
      where('name', '==', name)
    );

    const design = {
      id,
      file,
      name,
      description,
      createdAt: timestamp,
    };

    const existingDesignSnapshot = await getDocs(checkExistingDesign);

    let existingDesignStatus: Object = {};

    existingDesignSnapshot.forEach((designDoc) => {
      if (!designDoc.data().empty) {
        existingDesignStatus['designExistence'] = true;
      }
    });

    const designExistence = Object.values(existingDesignStatus)[0];

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
        id: designDocument.id,
      });
    });

    // const retrievedDesigns = JSON.stringify(Object.values(designCollection));
    const retrievedDesigns = Object.values(designCollection);
    // console.log(retrievedDesigns);

    return (
      res
        .status(201)
        // .json({ success: 'returning designs...', retrievedDesigns });
        .json(retrievedDesigns)
    );
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
};
