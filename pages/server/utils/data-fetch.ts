import type { WhereFilterOp } from '@google-cloud/firestore';
import type { Firestore } from 'firebase/firestore';
import { collection, query, getDocs, where } from 'firebase/firestore';
import type { JWT } from 'next-auth/jwt';
import { db } from '../lib/database/firebaseStorage';

export const firestoreGet = async (
  // base: Firestore,
  // db: Firestore,
  collectionPath: string,
  fieldQuery: string,
  queryFilter: WhereFilterOp,
  searchValue: Record<string, unknown> | string
) => {
  const firestoreQuery = query(
    collection(db, collectionPath),
    where(fieldQuery, queryFilter, searchValue)
  );

  const querySnapshot = await getDocs(firestoreQuery);

  const createdCollection: Record<string, unknown> = {};

  querySnapshot.forEach((document) => {
    const values = document.data();
    values['_id'] = document.id;
    createdCollection[document.id] = values;
  });

  const retrievedValue = Object.values(createdCollection[0] as unknown[]);

  return retrievedValue;
};
