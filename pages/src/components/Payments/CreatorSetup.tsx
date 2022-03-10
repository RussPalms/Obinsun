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

export default function CreatorSetup() {
  const { data: session, status } = useSession() as any;
  const loading = status === 'loading';
  console.log(status, session);

  const router = useRouter();

  //creating IP state
  const [ip, setIP] = useState('');
  const [ts, setTS] = useState(null);

  // const ipRef = useRef();
  // const tsRef = useRef();

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    // console.log(res.data);
    setIP(res.data.IPv4);
    // const ts = Math.round(new Date().getTime() / 1000);
    // UNIX timestamp in milliseconds
    // setTS(Math.round(new Date().getTime() / 1000));
  };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  //   console.log(ts);
  //   console.log(ip);
  // }, [updateCustomAccount]);

  //   async function changeRegistrationHandler(registrationData) {
  //     const response = await fetch("/api/user/change-registration", {
  //       method: "PATCH",
  //       body: JSON.stringify(registrationData),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     console.log(data);
  //   }

  // async function submitValidationHandler(ValidationData) {
  //   // const response = await fetch("/api/user/change-password", {
  //   //   method: "PATCH",
  //   //   body: JSON.stringify(passwordData),
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // });
  //   // const data = await response.json();
  //   // console.log(data);
  // }

  // const createCustomAccount = async (e:any) => {
  const submitValidationHandler = async (validationData: any) => {
    // e.preventDefault();

    // const stripe = await stripePromise;
    const createAccount = await axios.post(
      '/api/stripe/create-custom-account',
      {
        firebaseID: session?.id,
        date: ts,
        ip: ip,
        validationData,
      }
    );
    // const result = await stripe!.redirectToCheckout({
    //   sessionId: checkoutSession.data.id,
    // });

    // const result = await stripe

    // const accountData = await response.json();
    // if (accountData.error) alert(accountData.error.message);

    // console.log(accountData);

    // if (response.ok) {
    //   router.replace("/routes/protected/creator/AccountUpdate");
    // } else {
    //   throw new Error(tokenData.message || "Something went wrong!");
    // }

    return;
  };

  // const externalAccount = async (e:any) => {
  //   e.preventDefault();

  //   const externalAccountAddition = await axios.post(
  //     "/api/stripe/create-external-account",
  //     {
  //       firebaseID: session?.id,
  //       stripeId: session?.user.stripeId,
  //     }
  //   );
  // };

  const addingCard = async (e: any) => {
    e.preventDefault();

    //   const externalAccountAddition = await axios.post(
    //     "/api/stripe/create-external-account",
    //     {
    //       firebaseID: session?.id,
    //       stripeId: session?.user.stripeId,
    //     }
    //   );
  };

  const externalAccount = async (e: any) => {
    e.preventDefault();

    // await axios.post("/api/stripe/create-external-account", {
    await axios.post('/api/stripe/add-card', {
      firebaseID: session?.id,
      stripeId: session?.user.stripeId,
    });
  };

  const shippingRate = async (e: any) => {
    e.preventDefault();

    // await axios.post("/api/stripe/create-external-account", {
    await axios.post('/api/stripe/create-shipping-rate', {
      firebaseID: session?.id,
      stripeId: session?.user.stripeId,
    });
  };

  const updateCustomAccount = async (e: any) => {
    e.preventDefault();
    // const enteredIP = ipInputRef.current.value;
    // const enteredTS = tsInputRef.current.value;
    // //creating IP state
    // const [ip, setIP] = useState("");
    // //creating function to load ip address from the API
    // const getData = async () => {
    //   const res = await axios.get("https://geolocation-db.com/json/");
    //   console.log(res.data);
    //   setIP(res.data.IPv4);
    // };
    // useEffect(() => {
    //   //passing getData method to the lifecycle method
    //   getData();
    // }, []);
    // const ONE_DAY = { days: 1 };
    // const dt = DateTime.now();
    // const datetime = new Date(fromDate).getTime()
    // const ts = Math.round(new Date().getTime() / 1000);
    // const tokenExpiration = dt.plus(ONE_DAY).toISO();
    // console.log(date);
    // console.log(ts);
    const updateAccount = await axios.post(
      '/api/stripe/create-custom-account',
      {
        firebaseID: session?.id,
        stripeId: session?.stripeId,
        // date: enteredTS,
        // ip: enteredIP,
        date: ts,
        ip: ip,
      }
    );
    // const stripeAccount = await stripe.accounts.retrieve(session?.stripeId);
    // console.log(stripeAccount);
    // console.log(ts);
    // console.log(ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
    console.log(ts);
    console.log(ip);
  }, []);

  // console.log(session);

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
              Password Form
            </h2>
            {/* <ProfileForm onChangeRegistration={changeRegistrationHandler} /> */}
            {/* <button onClick={createCustomAccount}>
              Click To Create Custom Account
            </button> */}
            {/* <button onClick={updateCustomAccount}> */}
            <button onClick={externalAccount}>Click To Update Account</button>
            <button onClick={addingCard}>Click To Add Card</button>
            <button onClick={shippingRate}>Click To Add Shipping Rate</button>
            {/* <OnboardingForm onSubmitValidation={submitValidationHandler} /> */}
            {/* <ProfileForm /> */}
          </div>
        </div>
        <Link
          href="/routes/protected/creator/document-verification"
          // onClick={router.push(
          //   "routes/protected/creator/document-verification"
          // )}
        >
          Click to verify documents
        </Link>
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
