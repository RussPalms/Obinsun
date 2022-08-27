import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { html, text } from '../emails/email-create';
import {
  adapterInstance,
  firestoreConnect,
} from '../../server/lib/database/firebaseFirestore';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { verifyPassword } from '../../server/lib/password-auth';
import { ac } from '../../server/services';
import { firestoreGet } from 'pages/server/utils/data-fetch';
import { WhereFilterOp } from '@google-cloud/firestore';
import { db } from 'pages/server/lib/database/firebaseStorage';

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  adapter: adapterInstance,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'email' },
        password: { label: 'Password', type: 'password', placeholder: 'email' },
      },
      async authorize(credentials, req) {
        const AuthenticationQuery = query(
          collection(db, 'users'),
          where('email', '==', credentials?.email)
        );
        const authSnapshot = await getDocs(AuthenticationQuery);
        // const userCollection: Record<string, unknown> = {};
        const userCollection: any = {};
        authSnapshot.forEach((doc) => {
          const a = doc.data();
          a['_id'] = doc.id;
          userCollection[doc.id] = a;
        });
        // const user = Object.values(userCollection)[0] as Record<
        //   string,
        //   unknown
        // >;

        const user = Object.values(userCollection)[0] as any;

        const isValid = await verifyPassword(
          credentials?.password,
          user.password
        );
        if (!isValid) {
          throw new Error('Could not log you in!');
        }
        if (user) {
          return {
            id: user.obinsunUuid,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
          };
        }
        return req;
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
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn: async () =>
      // { user, account, profile, email, credentials }
      {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
          return true;
        } else {
          return false;
        }
      },

    jwt: async ({
      token,
      // , user, account, profile, isNewUser
    }) => {
      // const userRefrence = 'users';
      // const querySearch = 'email';
      // const filtering = '=' as WhereFilterOp;
      // const searchReference = token.email as string;
      const authTokenQuery = query(
        collection(db, 'users'),
        where('email', '==', token.email)
      );

      const authTokenSnapshot = await getDocs(authTokenQuery);

      const userCollection: Record<string, unknown> = {};

      await authTokenSnapshot.forEach((doc) => {
        const a = doc.data();
        a['_id'] = doc.id;
        userCollection[doc.id] = a;
      });

      const userToken: any = Object.values(userCollection)[0];

      // const userToken = (await firestoreGet(
      //   userRefrence,
      //   querySearch,
      //   filtering,
      //   searchReference
      //   // ) as Record<string, unknown>[];
      // )) as any;

      if (userToken) {
        token.name = userToken.name;

        token.id = userToken._id;
        token.firestoreId = userToken._id;
        token.role = userToken.role;
        token.stripeId = userToken.stripeId;
        token.customerId = userToken.customerId;
        token.images = userToken.images;
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
        token.company_verification = userToken.company_verification;
        token.individual_verification = userToken.individual_verification;
        token.stripe_metadata = userToken.stripe_metadata;
        token.stripeBalance = userToken.stripeBalance;
      }
      return token;
    },
    session: async ({ session, user, token }: any) => {
      if (token) session.id = token.id;
      session.user.role = token.role;
      session.user.stripeId = token.stripeId;
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
      session.user.company_verification = token.company_verification;
      session.user.individual_verification = token.individual_verification;
      session.user.stripe_metadata = token.stripe_metadata;
      session.user.stripeBalance = token.stripeBalance;

      const grants = ac.getGrants();
      session.user.permissions =
        token.role in grants ? { [token.role]: grants[token.role] } : {};
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  events: {},
});
