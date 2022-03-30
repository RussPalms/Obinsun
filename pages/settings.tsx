import { getSession, useSession } from 'next-auth/react';
import Content from './Production/Layout/Content';
import UserSettings from './src/components/Settings/UserSettings';
import type Stripe from 'stripe';
import { useEffect } from 'react';
import type { Session } from 'next-auth';
// import SessionHTMLAttributes from 'react'

import react from 'react';
// import type {JSX} from 'jsx'
import type SessionProviderProps from 'next-auth';
import { GetServerSidePropsContext } from 'next';

// type Props = {
//   session: SessionProviderProps
// };

// interface SessionProps extends React.HTMLAttributes<HTMLButtonElement> {
//   valid: Boolean;
// }

// interface SessionProps extends React.HTMLAttributes<JSX.Element> {
//   session: Session;
// }

// interface SessionProps extends React.HTMLAttributes<typeof SessionProviderProps | JSX.Element> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<react.JSXElementConstructor<Session>> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<string extends react.JSXElementConstructor<any>> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<react.JSXElementConstructor<Session>> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<Session extends keyof JSX.IntrinsicElements> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<Session extends react.JSXElementConstructor<infer P> ? P : Session extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Session]> {
//   session?: Session;
// }

// interface SessionProps extends React.ComponentProps<Session extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[Session]> {
//   session?: Session;
// }

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function SettingsPage() {
  // useEffect(() => {
  //   console.log('session loaded');
  // }, []);

  return (
    <>
      <Content title="Settings" description={`${title} - ${subtitle}`}>
        <UserSettings />
      </Content>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

  // console.log(process.env);

  const session = await getSession({ req: context.req });
  const retrievedAccount = await stripe.accounts.retrieve(
    session.user.stripeId
  );

  console.log(retrievedAccount);

  // console.log(retrievedAccount.requirements);
  // console.log(retrievedAccount.future_requirements);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
