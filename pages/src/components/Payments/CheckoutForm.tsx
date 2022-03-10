import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { GetStaticProps } from 'next';
import axios from 'axios';

export default function CheckoutForm() {
  const stripe = useStripe() as any;
  const elements = useElements() as any;

  const [message, setMessage] = useState(null) as any;
  const [isLoading, setIsLoading] = useState(false) as any;

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // const clientSecret =
    //   "pi_3KSwtZHgBISqeUGd1ttgV776_secret_bgYNmBk5bldxCwAcKhqMEjhbT";

    // console.log(clientSecret);
    // console.log(elements._commonOptions.clientSecret.clientSecret);
    // console.log(stripe);
    // const {_commonOptions} = elements

    // const clientSecret = elements!._commonOptions.clientSecret.clientSecret;

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(e:any);
    // console.log(elements);
    // console.log(stripe);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    // console.log();

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${process.env.NEXTAUTH_URL}`,
        return_url: `${process.env.NEXTAUTH_URL}/success`,
        // return_url: "/success",
        // redirect: "if_required",
      },
      //   redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      console.log(error);
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

// export const getStaticProps: GetStaticProps = async (res) => {
//   //   const clientSecret = await axios.get("api/stripe/create-payment-intent");

//   //   console.log("client secret: ", clientSecret);

//   console.log(res);

//   return {
//     props: {},
//   };
// };
