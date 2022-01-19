import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../../api/keys/firebase";
import { FirebaseAdapter } from "./firebase-adapter";

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
