import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import Router from 'next/router';
// import ProfileForm from './ProfileForm';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
// import OnboardingForm from './OnboardingForm';
import Link from 'next/link';

// const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// async function createCustomAccount({firebaseID: session.id})

export default function AccountSetup() {
  // const { data: session, status } = useSession() as any;

  const [authCode, setAuthCode] = useState('') as any;
  const [stateValue, setStateValue] = useState('') as any;
  const [success, setSuccess] = useState('') as any;

  const clientId = process.env.PRINTFUL_CLIENT_ID;
  //   const redirectUrl = `${process.env.NEXTAUTH_URL}/routes/protected/creator/printful-connect`;
  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/printful/account-connect`;
  //    const redirectUrl = `${process.env.NEXTAUTH_URL}/routes/protected/creator/document-verification`;

  // const stateValue = session?.id;
  //   useEffect(() => {
  //     setStateValue(`${session?.id}`);
  //   }, []);

  const printfulLogin = `https://www.printful.com/oauth/authorize?grant_type=authorize&client_id=${clientId}&state={stateValue}&redirect_url=${redirectUrl}`;

  //   const { data: session, status } = useSession();
  //   const loading = status === "loading";
  //   console.log(status, session);

  return (
    <section className="relative flex justify-center align-center w-screen min-h-screen bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff] overflow-hidden">
      <div className="color" />
      <div className="color bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#fffd87]" />
      <div className="color bottom-[50px] right-[100px] w-[300px] h-[300px] bg-[#00d2ff]" />
      <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div
          className="square border-bottom-right-glass square-delay"
          style={{ '--i': '0' } as any}
        />
        <div
          className="square border-bottom-right-glass top-[150px] left-[-100px] w-[120px] h-[120px] z-20 square-delay"
          style={{ '--i': '1' } as any}
        />
        <div
          className="square border-bottom-right-glass bottom-[50px] right-[-60px] w-[80px] h-[80px] z-20 square-delay"
          style={{ '--i': '2' } as any}
        />
        <div
          className="square border-bottom-right-glass bottom-[-80px] left-[100px] w-[50px] h-[50px] square-delay"
          style={{ '--i': '3' } as any}
        />
        <div
          className="square border-bottom-right-glass top-[-80px] left-[140px] w-[60px] h-[60px] delay-[-7000ms] square-delay"
          style={{ '--i': '4' } as any}
        />
        <div className="relative top-0 left-0 w-[400px] min-h-[400px] bg-white/10 border rounded-[10px] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 border-bottom-right-glass border-white/50">
          <div className="relative w-full h-full p-[40px]">
            <h2 className="relative text-white text-[24px] font-semibold tracking-[1px] mb-[40px] before:absolute before:left-0 before:bottom-[-10px] before:w-[80px] before:h-[4px] before:bg-white">
              Printful Login
            </h2>
            {/* <button onClick={externalAccount}>
              Click To Connect Printful Account
            </button>
            <OnboardingForm onSubmitValidation={submitValidationHandler} /> */}
          </div>
        </div>
        <Link href={printfulLogin}>Click to log in to Printful</Link>
      </div>
    </section>
  );
}

// export default CreatorSetup;

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }
