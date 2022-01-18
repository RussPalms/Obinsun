//@ts-nocheck

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { html, text } from "../emails/email-create";
import {
	adapterInstance,
	firestore,
	firestoreConnect,
} from "../../lib/database/firebaseFirestore";
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
import { verifyPassword } from "../../lib/password-auth";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

const db = firestoreConnect;

export default NextAuth({
	// pages: {
	// 	signIn: "/login",
	// 	verifyRequest: "/verify-request",
	// },
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: THIRTY_DAYS,
		updateAge: THIRTY_MINUTES,
	},
	adapter: adapterInstance,
	providers: [
		CredentialsProvider({
			authorize: async (credentials) => {
				const AuthenticationQuery = query(
					collection(db, "users"),
					where("email", "==", credentials?.email)
				);

				const authSnapshot = await getDocs(AuthenticationQuery);

				const userCollection = {};

				authSnapshot.forEach((doc) => {
					let a = doc.data();
					a["_id"] = doc.id;
					userCollection[doc.id] = a;
				});

				const user = Object.values(userCollection)[0];

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					throw new Error("Could not log you in!");
				}

				console.log(user);

				return { email: user.email };
			},
		}),
		EmailProvider({
			server: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			from: process.env.SMTP_FROM,
			async sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from },
			}) {
				adapterInstance.useVerificationToken;

				const { host } = new URL(url);
				const transport = nodemailer.createTransport(server);
				await transport.sendMail({
					to: email,
					from,
					subject: `Sign in to ${host}`,
					text: text({ url, host }),
					html: html({ url, host, email }),
				});
			},
		}),
	],
	callbacks: {
		jwt: async ({ token }) => {
			const authTokenQuery = query(
				collection(db, "users"),
				where("email", "==", token.email)
			);

			const authTokenSnapshot = await getDocs(authTokenQuery);

			const userCollection = {};

			await authTokenSnapshot.forEach((doc) => {
				let a = doc.data();
				a["_id"] = doc.id;
				userCollection[doc.id] = a;
			});

			const userToken = Object.values(userCollection)[0];

			if (userToken) {
				token.id = userToken._id;
				token.role = userToken.role;
			}

			return token;
		},
	},
	session: async ({ session, token }) => {
		if (token) session.id = token.id;
		session.user.role = token.role;

		const grants = ac.getGrants();
		// expose only the current role permissions
		session.user.permissions =
			token.role in grants ? { [token.role]: grants[token.role] } : {};

		console.log(session);

		return Promise.resolve(session);
	},
});
