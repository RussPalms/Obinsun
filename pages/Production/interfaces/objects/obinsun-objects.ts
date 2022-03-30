import type { DocumentSnapshot } from 'firebase/firestore';
import type { Account, DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';

export interface AccountSetup {
  mcc?: string;
  url?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  line1?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  email?: string;
  phone?: string;
  ssnLast4?: string;
}

export interface ExternalSetup extends AccountSetup {
  // country?: string;
  currency?: string;
  bank_name?: string;
  routing_number?: string;
  account_number?: string;
  card_name?: string;
  number?: string;
  exp_month?: string;
  exp_year?: string;
  cvc?: string;
}

export interface ObinsunId extends Account {
  firebaseId?: DocumentSnapshot['id'];
}

export interface InitialAccount {
  transactId: ObinsunId['firebaseId'];
  change: string;
  formData?: ExternalSetup;
  date?: number;
  ip?: string;
  cc?: string;
  country?: string;
  stripeId?: string;
  object?: string;
}

// export interface ObinsunSession extends DefaultSession {

// }

// export type obinsunItem = DefaultSession['user']

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       role: string;
//       stripeId: string;
//       personId: string;
//       permissions: { admin: {}[] };
//     } & DefaultSession['user']
//   }
// }

export interface UserCreation {
  enteredUsername?: string;
  enteredFirstname?: string;
  enteredLastname?: string;
  enteredEmail: string;
  enteredPassword: string;
  // role: string;
}

export interface keyCreation {
  obinsunKey: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  ip: string;
  cc: string;
}

// export interface

// export interface InputRefrences {

// }
