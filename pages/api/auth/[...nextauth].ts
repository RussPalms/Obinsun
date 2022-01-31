//@ts-nocheck

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { html, text } from "../emails/email-create";
import {
  adapterInstance,
  // connectToFirebase,
  // firestore,
  firestoreConnect,
} from "../../server/lib/database/firebaseFirestore";
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
import { verifyPassword } from "../../server/lib/password-auth";
import { ac } from "../../server/services";

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
        // const db = await connectToFirebase();
        // const db = firestoreConnect;

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
        return { email: user.email, role: user.role };
        // 		const payload = {
        // 			email: user.email,
        // 			password: user.password
        // 		}
        // 		const res = await fetch('http://localhost:3000/api/auth/session', {
        //   method: 'POST',
        //   body: JSON.stringify(payload),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     tenant: credentials.tenantKey,
        //     'Accept-Language': 'en-US',
        //   },
        // });
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
        // adapterInstance.useVerificationToken;
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
    // async jwt({ token, user, account }) {
    // 	if (account && user) {
    // 		return {
    // 			...token,
    // 			accessToken: user.data.token,
    // 			refreshToken: user.data.refreshToken,
    // 		};
    // 	}

    // 	return token;
    // },

    // async session({ session, token }) {
    // 	session.user.accessToken = token.accessToken;
    // 	session.user.refreshToken = token.refreshToken;
    // 	session.user.accessTokenExpires = token.accessTokenExpires;

    // 	return session;
    // },

    jwt: async ({ token }) => {
      // const db = await connectToFirebase();

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
        token.stripeId = userToken.stripeId;
        token.images = userToken.images;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) session.id = token.id;
      session.user.role = token.role;
      session.user.stripeId = token.stripeId;
      session.user.images = token.images;

      const grants = ac.getGrants();
      // expose only the current role permissions
      session.user.permissions =
        token.role in grants ? { [token.role]: grants[token.role] } : {};

      console.log(session);

      return Promise.resolve(session);
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
});
