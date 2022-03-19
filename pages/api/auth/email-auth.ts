// import { DateTime } from "luxon";

// import {
// 	runTransaction,
// 	collection,
// 	query,
// 	getDocs,
// 	where,
// 	limit,
// 	doc,
// 	getDoc,
// 	addDoc,
// 	updateDoc,
// 	deleteDoc,
// 	Firestore,
// 	FirestoreDataConverter,
// 	getFirestore,
// 	setDoc,
// } from "firebase/firestore";
// import { firestoreConnect } from "../../server/lib/database/firebaseFirestore";
// import { hashEmail } from "../../server/lib/password-auth";
// // import { connectToFirebase } from "../../server/lib/database/firebaseFirestore";

// async function emailHandler(req: any, res: any) {
// 	const ONE_DAY = { days: 1 };
// 	const dt = DateTime.now();
// 	const tokenExpiration = dt.plus(ONE_DAY).toISO();

// 	if (req.method !== "POST") {
// 		return;
// 	}

// 	const data = req.body;

// 	const { email } = data;

// 	const token = await hashEmail(email);

// 	// const db = await connectToFirebase();
// 	const db = firestoreConnect;

// 	const CreatorVerificationInfo = {
// 		// identifier: email,
// 		// token: token,
// 		// expires: tokenExpiration,
// 		requester: email,
// 		verified: false,
// 	};

// 	await addDoc(
// 		collection(db, "CreatorVerification"),
// 		CreatorVerificationInfo
// 	);

// 	const VerificationQuery = query(
// 		collection(db, "CreatorVerification"),
// 		where("requester", "==", email)
// 	);

// 	const TokenSnapshot = await getDocs(VerificationQuery);

// 	const TokenCollection: any = {};

// 	TokenSnapshot.forEach((doc) => {
// 		let t = doc.data();
// 		t["_id"] = doc.id;
// 		TokenCollection[doc.id] = t;
// 	});

// 	const CreatorVerification = await Object.values(TokenCollection)[0];

// 	console.log(CreatorVerification);

// 	res.status(200).json(CreatorVerification);
// }

// export default emailHandler;

export default {};
