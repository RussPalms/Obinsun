import * as React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from './app/state/slices/basketSlice';
import CheckoutProduct from './src/components/StripeCheckout/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { getSession, useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Content from './Production/Layout/Content';

export interface IAppProps {}

// const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}` as string);
const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function CheckoutPage(props: IAppProps) {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal) as number;

  console.log(total);
  console.log({ checkout: items, total });
  // console.log(items.price);
  // [data:session, status] = useSession()

  const { data: session, status } = useSession();
  // console.log(session);

  // const createCheckoutSession = async () => {
  //   const stripe = await stripePromise;
  //   const checkoutSession = await axios.post("/api/create-checkout-session", {
  //     items: items,
  //     // email: session?.user?.email,
  //     firebaseID: session?.id,
  //     name: session?.user?.email,
  //   });
  //   const result = await stripe!.redirectToCheckout({
  //     sessionId: checkoutSession.data.id,
  //   });

  //   if (result.error) alert(result.error.message);
  // };

  const createCheckoutSession = async () => {
    const productSession = await axios.post('/api/create-product-session', {
      items: items,
      firebaseID: session?.id,
      name: session?.user?.email,
      // customerId: session?.user?.customerId,
    });
    const result = await productSession;
    console.log(result);
  };

  // const formattedRetailPrice = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: activeVariant.currency,
  // }).format(total);

  return (
    <Content title="Profile" description={`${title} - ${subtitle}`}>
      <div className="vs:w-full  lg:flex max-w-screen-2xl mx-auto bg-gray-300/50 dark:bg-gray-800/60 rounded-[0.625em]">
        <div className="flex-grow m-5 shadow-sm rounded-[0.625em]">
          {/* <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          /> */}

          <div className="flex flex-col p-5 space-y-10 rounded-[0.625em]">
            <h1 className="vs:text-base mobile-l:text-lg tablet:text-3xl border-b border-gray-800/60 dark:border-gray-300/60 pb-4">
              {items.length === 0
                ? 'Your Amazon Basket is empty.'
                : 'Shopping Basket'}
            </h1>

            {items.map((item: any, i: any) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                price={item.price}
                url={item.url}
                description={item.description}
                image={item.image}
                name={item.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center flex-col tablet:flex-row laptop-l:flex-col bg-gray-300/70 dark:bg-gray-800/70 p-10 shadow-md rounded-[0.625em] flex-1 gap-[1em]">
          {items.length > 0 && (
            <>
              <h2 className="flex flex-col whitespace-nowrap laptop-l:flex-row">
                Subtotal {items.length} items:{' '}
                <span className="font-bold">
                  {' '}
                  <Currency quantity={total} />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`submit-input button mt-2 ${
                  !session &&
                  `from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed`
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </div>
    </Content>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  console.log(session);

  return {
    props: {
      session,
    },
  };
}
