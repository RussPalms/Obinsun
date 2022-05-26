import { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
  orderBy,
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
      return res.status(201).json({
        message: `Added ${name}!`,
      });
    }
  }

  if (req.method === 'GET') {
    const requestedDesigns = query(
      collection(db, 'designs'),
      orderBy('createdAt', 'desc')
    );

    const allDesigns = await getDocs(requestedDesigns);

    let designCollection = [];

    allDesigns.forEach((designDocument) => {
      designCollection.push({
        ...designDocument.data(),
        id: designDocument.id,
      });
    });

    const retrievedDesigns = Object.values(designCollection);

    return res.status(201).json(retrievedDesigns);
  }

  if (req.method === 'PUT') {
  }

  if (req.method === 'DELETE') {
  }
};
