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
} from "firebase/firestore";
import {
	// connectToFirebase,
	firestoreConnect,
} from "../../server/lib/database/firebaseFirestore";
import { hashPassword } from "../../server/lib/password-auth";

async function handler(req: any, res: any) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;

	const { email, password, role } = data;

	if (
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 7
	) {
		res.status(422).json({
			message:
				"Invalid input - password should also be at least 7 characters long.",
		});
		return;
	}

	const db = firestoreConnect;
	// const db = await connectToFirebase();

	const hashedPassword = await hashPassword(password);

	const registerData = { email: email, password: hashedPassword, role: role };

	const checkExistingUser = await query(
		collection(db, "users"),
		where("email", "==", email)
	);

	const existingUserSnapshot = await getDocs(checkExistingUser);

	const existingStatus: any = {};

	existingUserSnapshot.forEach((doc) => {
		if (!doc.data().empty) {
			existingStatus["userExistence"] = true;
		}
	});

	const existence = Object.values(existingStatus)[0];

	if (existence) {
		res.status(422).json({ message: "User already exists!" });
		return;
	}

	await addDoc(collection(db, "users"), registerData);

	const getRegisteredUser = await query(
		collection(db, "users"),
		where("email", "==", email)
	);

	const registeredUser = await getDocs(getRegisteredUser);

	// const registeredStatus: any = {};

	// registeredUser.forEach((doc) => {
	// 	// doc.data()
	// 	// 		registeredStatus["userExistence"] = true;
	// 	let a = doc.data();
	// 	a["_id"] = doc.id;
	// 	registeredStatus[doc.id] = a;
	// });

	// const registered = Object.values(registeredStatus)[0];

	res.status(201).json({
		message: "Created user!",
		// User: JSON.stringify(registered),
		registeredUser,
	});
}

export default handler;
