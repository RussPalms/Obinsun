import { getSession, useSession } from 'next-auth/react';
import Content from './Production/Layout/Content';
import UserSettings from './src/components/Settings/UserSettings';
import ExternalAccounts from './src/components/Settings/ExternalAccounts';
import type Stripe from 'stripe';
import { useEffect } from 'react';
import type { Session } from 'next-auth';
// import SessionHTMLAttributes from 'react'

import react from 'react';
// import type {JSX} from 'jsx'
import type SessionProviderProps from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import PrintfulSignin from './src/components/Settings/PrintfulSignin';
import WebcamCapture from './src/components/Payments/Uploads/WebcamCapture';
import ExistingDocument from './src/components/ExistingDocument';

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
  const payoutStatus = () => {
    let payoutsActivity = session.user.neccessary_actions.currently_due;
    if (payoutsActivity.length !== 0) {
      return 'PAYOUTS DISABLED. Please complete neccessary actions in order to recieve payments.';
    } else {
      return "You're all caught up and should now be able to recieve payments!";
    }
  };

  const { data: session } = useSession();

  useEffect(() => {
    console.log('session loaded', session.user.neccessary_actions);
    console.log('session loaded', session.user.verification);
  }, []);

  return (
    <>
      <Content title="Settings" description={`${title} - ${subtitle}`}>
        Todos: Neccessary Actions -{payoutStatus()}
        {/* {session.user.neccessary_actions?.currently_due[0]
          ? session.user.neccessary_actions.currently_due[0]
          : ''} */}
        {/* Neccessary Verifications - {session.user.verification} */}
        <UserSettings />
        <PrintfulSignin />
        <ExternalAccounts />
        <WebcamCapture />
        <ExistingDocument />
      </Content>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

  // // console.log(process.env);

  // const session = await getSession({ req: context.req });
  // const retrievedAccount = await stripe.accounts.retrieve(
  //   session.user.stripeId
  // );

  // console.log(retrievedAccount);

  const session = await getSession(context);
  console.log(session);

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
