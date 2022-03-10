import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// import "./App.css";
import CheckoutForm from './src/components/Payments/CheckoutForm';
import { GetStaticProps } from 'next';
import axios from 'axios';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe(process.env.stript_public_key as string);
const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

export default function Payments() {
  const [clientSecret, setClientSecret] = useState('');

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
    <div className="App">
      {clientSecret && (
        <Elements options={options as any} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
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
