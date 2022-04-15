import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { html, text } from '../emails/email-create';
import {
  adapterInstance,
  // connectToFirebase,
  // firestore,
  firestoreConnect,
} from '../../server/lib/database/firebaseFirestore';
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
// import {
//   adapterInstance,
//   firestoreConnect,
// } from 'server/lib/database/firebaseFirestore';
// import { verifyPassword } from 'server/lib/password-auth';
// import { ac } from 'server/services';
import { verifyPassword } from '../../server/lib/password-auth';
import { ac } from '../../server/services';
import { v4 as uuidv4 } from 'uuid';
import { getToken, JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import type { CookieSerializeOptions } from 'cookie';

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
    strategy: 'jwt',
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  adapter: adapterInstance,
  providers: [
    // CredentialsProvider({
    //   authorize: async (credentials: any) => {
    //     console.log(credentials);
    //     // const db = await connectToFirebase();
    //     // const db = firestoreConnect;
    //     const AuthenticationQuery = query(
    //       collection(db, 'users'),
    //       where('email', '==', credentials?.email)
    //     );
    //     const authSnapshot = await getDocs(AuthenticationQuery);
    //     const userCollection: any = {};
    //     authSnapshot.forEach((doc) => {
    //       let a = doc.data();
    //       a['_id'] = doc.id;
    //       userCollection[doc.id] = a;
    //     });
    //     const user: any = Object.values(userCollection)[0];
    //     const isValid = await verifyPassword(
    //       credentials.password,
    //       user.password
    //     );
    //     if (!isValid) {
    //       throw new Error('Could not log you in!');
    //     }
    //     // if (isValid) {
    //     return { email: user.email, role: user.role };
    //     // } else {
    //     //   return null;
    //     // }
    //     // console.log(user);
    //     // 		const payload = {
    //     // 			email: user.email,
    //     // 			password: user.password
    //     // 		}
    //     // 		const res = await fetch('http://localhost:3000/api/auth/session', {
    //     //   method: 'POST',
    //     //   body: JSON.stringify(payload),
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //     tenant: credentials.tenantKey,
    //     //     'Accept-Language': 'en-US',
    //     //   },
    //     // });
    //   },
    // } as any),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'email' },
      },
      async authorize(credentials, req) {
        // async authorize(req, res) {
        // console.log(req);
        // return res;
        const AuthenticationQuery = query(
          collection(db, 'users'),
          where('email', '==', credentials?.email)
        );
        const authSnapshot = await getDocs(AuthenticationQuery);
        const userCollection: any = {};
        authSnapshot.forEach((doc) => {
          let a = doc.data();
          a['_id'] = doc.id;
          userCollection[doc.id] = a;
        });
        const user: any = Object.values(userCollection)[0];
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        // return { email: user.email, role: user.role };
        if (user) {
          return {
            // name: 'Fill Murray',
            id: user.obinsunUuid,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            // image: 'https://www.fillmurray.com/64/64',
            // role: user.role,
          };
        }
        // return null;
        return req;
      },
    }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     // email: { label: 'email', type: 'email' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     if (credentials.password === 'pw') {
    //       return {
    //         name: 'Fill Murray',
    //         email: 'bill@fillmurray.com',
    //         image: 'https://www.fillmurray.com/64/64',
    //       };
    //     }
    //     return null;
    //   },
    // }),
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

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // signIn: async (credentials)=> {},
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log({
    //     signIn: {
    //       user: user,
    //       account: account,
    //       profile: profile,
    //       email: email,
    //       credentials: credentials,
    //     },
    //   });
    //   const isAllowedToSignIn = true;
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
    signIn: async ({ user, account, profile, email, credentials }) => {
      // const signedInProperties = {
      //   user, account, profile, email, credentials
      // }
      // console.log({ß

      // const signedInJWT = await getToken(req:NextApiRequest);
      // const signedInJWT = getToken();

      // console.log({ signedInJWT: signedInJWT });

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        // return true;
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    // async redirect({ url, baseUrl }) {
    //   console.log(url);
    //   return baseUrl;
    // },
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

    jwt: async ({ token, user, account, profile, isNewUser }) => {
      // console.log('jwt', user);
      // const db = await connectToFirebase();
      // console.log({ß

      // if (token) {

      // }

      const authTokenQuery = query(
        collection(db, 'users'),
        where('email', '==', token.email)
      );

      const authTokenSnapshot = await getDocs(authTokenQuery);

      const userCollection: any = {};

      await authTokenSnapshot.forEach((doc) => {
        let a = doc.data();
        a['_id'] = doc.id;
        userCollection[doc.id] = a;
      });

      const userToken: any = Object.values(userCollection)[0];

      if (userToken) {
        token.name = userToken.name;

        token.id = userToken._id;
        token.firestoreId = userToken._id;
        token.role = userToken.role;
        token.stripeId = userToken.stripeId;
        // token.personId = userToken.personId;
        token.customerId = userToken.customerId;
        token.images = userToken.images;
        // token.obinsunId = userToken.obinsunId;
        token.obinsunId = userToken.obinsunUuid;
        token.printful = userToken.printful;
        token.registeredInfo = userToken.registeredInfo;
        token.firstname = userToken.firstname;
        token.lastname = userToken.lastname;
        token.username = userToken.username;
        token.shipping = userToken.shipping;
        token.neccessary_actions = userToken.neccessary_actions;
        token.personal_info = userToken.personal_info;
        token.verification = userToken.verification;
        token.external_accounts = userToken.external_accounts;
      }

      // if (userToken) {
      //   token.name = userToken.name;

      // }

      // console.log({
      //   injectedJWT: {
      //     token: token,
      //     user: user,
      //     account: account,
      //     profile: profile,
      //     isNewUser: isNewUser,
      //   },
      // });
      return token;
    },
    session: async ({ session, user, token }: any) => {
      // console.log({ retrievedSession: { session, user, token } });ß

      // if (token) session.id = token.id;
      if (token) session.id = token.id;
      session.user.role = token.role;
      session.user.stripeId = token.stripeId;
      // session.user.personId = token.personId;
      session.user.customerId = token.customerId;
      session.user.images = token.images;
      session.user.obinsunId = token.obinsunId;
      session.user.firestoreId = token.firestoreId;
      session.user.printful = token.printful;
      session.user.registeredInfo = token.registeredInfo;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.user.username = token.username;
      session.user.shipping = token.shipping;
      session.user.neccessary_actions = token.neccessary_actions;
      session.user.personal_info = token.personal_info;
      session.user.verification = token.verification;
      session.user.external_accounts = token.external_accounts;

      const grants = ac.getGrants();
      // expose only the current role permissions
      session.user.permissions =
        token.role in grants ? { [token.role]: grants[token.role] } : {};

      // console.log({ injectedSession: { session, user, token } });ß

      // return Promise.resolve(session);
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log({ redirect: { url, baseUrl } });

    //   if (url.startsWith(baseUrl)) return url;
    //   // Allows relative callback URLs
    //   else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // },
    redirect: async ({ url, baseUrl }) => {
      // console.log({ redirect: { url, baseUrl } });ß

      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  // debug: true,
  events: {
    // signIn: async () => {
    //   console.log('signing in');
    // },
    // async signIn(message) {
    //   /* on successful sign in */
    //   console.log({ signIn: `${message.user} signed in (immutable)`, message });
    // },
    // async signOut(message) {
    //   /* on signout */
    //   // console.log({ß
    // },
    // async createUser(message) {
    //   /* user created */
    //   console.log({ createUser: 'new user created (immutable)', message });
    // },
    // async updateUser(message) {
    //   /* user updated - e.g. their email was verified */
    //   console.log({ updateUser: 'user updated (immutable)', message });
    // },
    // async linkAccount(message) {
    //   /* account (e.g. Twitter) linked to a user */
    //   console.log({ linkAccount: 'account linked (immutable)', message });
    // },
    // async session(message) {
    //   /* session is active */
    //   console.log({ session: 'active session (immutable)', message });
    // },
    //   async error(message) { /* error in authentication flow */
    //   console.log({error: 'authentication flow error', message})
    // }
    // error: async() => {}
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(credentials);
    //   const isAllowedToSignIn = true;
    //   if (isAllowedToSignIn) {
    //     return true;
    //   } else {
    //     // Return false to display a default error message
    //     return false;
    //     // Or you can return a URL to redirect to:
    //     // return '/unauthorized'
    //   }
    // },
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   // error: '/auth/error',
  //   error: '/auth/error',
  //   verifyRequest: '/auth/verify-request',
  //   newUser: '/auth/new-user',
  // },
  // cookies: {
  //   sessionToken: {
  //     // name: `__Secure-next-auth.session-token`,
  //     name: `__Secure-obinsun.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: true
  //     }
  //   },
  //   callbackUrl: {
  //     // name: `__Secure-next-auth.callback-url`,
  //     name: `__Secure-obinsun.callback-url`,
  //     options: {
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: true
  //     }
  //   },
  //   csrfToken: {
  //     // name: `__Host-next-auth.csrf-token`,
  //     name: `__Host-obinsun.csrf-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: true
  //     }
  //   },
  //   pkceCodeVerifier: {
  //     // name: `${cookiePrefix}next-auth.pkce.code_verifier`,
  //     name: `${cookiePrefix}obinsun.pkce.code_verifier`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: useSecureCookies: CookieSerializeOptions
  //     }
  //   },
  //   state: {
  //     // name: `${cookiePrefix}next-auth.state`,
  //     name: `${cookiePrefix}obinsun.state`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: useSecureCookies: CookieSerializeOptions,
  //     },
  //   },
  // },
  // jwt: {
  //   async encode(params: {
  //     token: JWT
  //     secret: string
  //     maxAge: number
  //   }): Promise<string> {
  //     // return a custom encoded JWT string
  //     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //   },
  //   async decode(params: {
  //     token: string
  //     secret: string
  //   }): Promise<JWT | null> {
  //     // return a `JWT` object, or `null` if decoding failed
  //     return {}
  //   },
  // }
});
