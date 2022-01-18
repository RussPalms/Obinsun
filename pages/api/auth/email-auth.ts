import { DateTime } from "luxon";

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
	setDoc,
} from "firebase/firestore";
import { firestoreConnect } from "../../lib/database/firebaseFirestore";
import { hashEmail } from "../../lib/password-auth";

async function emailHandler(req: any, res: any) {
	const ONE_DAY = { days: 1 };
	const dt = DateTime.now();
	const tokenExpiration = dt.plus(ONE_DAY).toISO();

	if (req.method !== "POST") {
		return;
	}

	const data = req.body;

	const { email } = data;

	const token = await hashEmail(email);

	// const db = await connectToFirebase();
	const db = firestoreConnect;

	const VerificationTokenInfo = {
		identifier: email,
		token: token,
		expires: tokenExpiration,
	};

	await addDoc(collection(db, "VerificationToken"), VerificationTokenInfo);

	const VerificationQuery = query(
		collection(db, "VerificationToken"),
		where("identifier", "==", email)
	);

	const TokenSnapshot = await getDocs(VerificationQuery);

	const TokenCollection: any = {};

	TokenSnapshot.forEach((doc) => {
		let t = doc.data();
		t["_id"] = doc.id;
		TokenCollection[doc.id] = t;
	});

	const VerificationToken = await Object.values(TokenCollection)[0];

	console.log(VerificationToken);

	res.status(200).json(VerificationToken);
}

export default emailHandler;
