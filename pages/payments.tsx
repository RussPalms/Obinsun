import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// import "./App.css";
import CheckoutForm from './src/components/Payments/CheckoutForm';
import { GetServerSideProps, GetStaticProps } from 'next';
import axios from 'axios';
import Content from './Production/Layout/Content';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe(process.env.stript_public_key as string);
const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

export default function Payments() {
  const [clientSecret, setClientSecret] = useState('');

  const personTokenCreation = async () => {
    const stripeResolver = await Promise.resolve(stripePromise);

    const { token, error } = await stripeResolver.createToken('person', {
      first_name: 'Jane',
      last_name: 'Doe',
      relationship: { owner: true },
    });

    console.log(token);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  //   console.log(clientSecret);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Content title="" description="">
      <div className="relative flex items-center justify-center">
        {clientSecret && (
          <Elements options={options as any} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
        <button onClick={personTokenCreation}>Create Person</button>
      </div>
    </Content>
  );
}

// import React from 'react'

// type Props = {}

// function payments({}: Props) {
//   return (
//     <div>payments</div>
//   )
// }

// export default payments
// export const getStaticProps: GetStaticProps = async (res) => {
//   //   const clientSecret = await axios.get("api/stripe/create-payment-intent");

//   // console.log("client secret: ", clientSecret);

//   console.log(await res);

//   return {
//     props: {},
//   };
// };

// export const getServerSideProps = async () => {
//   const keyGet = async () => {
//     const getting = {
//       method: 'GET',
//       // body: JSON.stringify(dbAttributes),
//       headers: {
//         'Content-Type': 'application/json',
//         // 'obinsun-db': `Piece 0`,
//         'obinsun-db': `Piece 0`,
//         // Authorization: `Bearer token`,
//       },
//     };

//     await fetch(`${process.env.NEXTAUTH_URL}/api/dbs/keys`, getting).then(
//       (gotKeys) => {
//         const theKeys = async () => {
//           // const keyRetrieval = await keys.text();
//           // console.log(keyRetrieval);

//           const keyGetting = await gotKeys.json();
//           console.log(keyGetting);
//         };
//         theKeys();
//       }
//     );
//   };
//   keyGet();

//   return;
// };

// export default function _() {}
