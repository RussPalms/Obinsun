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
import { hashPassword, verifyPassword } from '../../server/lib/password-auth';

async function passwordHandler(req: any, res: any) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session?.user?.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const db = firestoreConnect;
  // const db = await connectToFirebase();

  const AuthenticationQuery = query(
    collection(db, 'users'),
    where('email', '==', userEmail)
  );

  const authSnapshot = await getDocs(AuthenticationQuery);

  const userCollection: any = [];

  authSnapshot.forEach((doc) => {
    let a = doc.data();
    a['_id'] = doc.id;
    userCollection[doc.id] = a;
  });

  const user = Object.values(userCollection)[0] as any;

  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid Password!' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const userRef = doc(db, 'users', user._id);

  await updateDoc(userRef, {
    email: userEmail,
    password: hashedPassword,
  });

  console.log(user);

  res.status(200).json({ message: 'Password updated!' });
}

export default passwordHandler;
