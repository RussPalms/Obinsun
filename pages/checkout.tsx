import * as React from 'react';
// import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from './app/state/slices/basketSlice';
import CheckoutProduct from './src/components/StripeCheckout/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { getSession, useSession } from 'next-auth/react';
// import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Content from './Production/Layout/Content';
import { useAppDispatch, useAppSelector } from './server/hooks/reduxHooks';
import {
  checkoutCart,
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from './app/state/slices/cartSlice';
import classNames from 'classnames';

export interface IAppProps {}

// const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function CheckoutPage() {
  // const dispatch = useAppDispatch();
  // const products = useAppSelector((state) => state.products.products);
  // const items = useAppSelector((state) => state.cart.items);
  // const totalPrice = useAppSelector(getTotalPrice);
  // const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  // const errorMessage = useAppSelector((state) => state.cart.errorMessage);

  // function onQuantityChanged(
  //   e: React.FocusEvent<HTMLInputElement>,
  //   id: string
  // ) {
  //   const quantity = Number(e.target.value) || 0;
  //   dispatch(updateQuantity({ id, quantity }));
  // }

  // function onCheckout(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   dispatch(checkoutCart());
  // }

  // const tableClasses = classNames({
  // 	[styles.table]: true,
  // 	[styles.checkoutError]: checkoutState === "ERROR",
  // 	[styles.checkoutLoading]: checkoutState === "LOADING",
  // });

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal) as number;

  // console.log(total);
  // console.log({ checkout: items, total });

  const { data: session } = useSession();

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
  return (
    <Content title="Profile" description={`${title} - ${subtitle}`}>
      <div className="vs:w-full  lg:flex max-w-screen-2xl mx-auto bg-gray-300/50 dark:bg-gray-800/60 rounded-[0.625em]">
        <div className="flex-grow m-5 shadow-sm rounded-[0.625em]">
          <div className="flex flex-col p-5 space-y-10 rounded-[0.625em]">
            <h1 className="vs:text-base mobile-l:text-lg tablet:text-3xl border-b border-gray-800/60 dark:border-gray-300/60 pb-4">
              {items.length === 0 ? 'Your Obincart is empty.' : 'Obincart'}
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

            {/* {Object.entries(items).map(([id, quantity]) => (
              <tr key={id}>
                <td>{products[id].name}</td>
                <td>
                  <input
                    type="text"
                    // className={styles.input}
                    defaultValue={quantity}
                    onBlur={(e) => onQuantityChanged(e, id)}
                  />
                </td>
                <td>${products[id].price}</td>
                <td>
                  <button
                    onClick={() => dispatch(removeFromCart(id))}
                    aria-label={`Remove ${products[id].name} from Shopping Cart`}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))} */}
          </div>
        </div>

        <div className="flex items-center justify-start flex-col tablet:flex-row laptop-l:flex-col bg-gray-300/70 dark:bg-gray-800/70 p-10 shadow-md rounded-[0.625em] flex-1 gap-[1em]">
          {items.length > 0 && (
            <>
              <h2 className="flex flex-col whitespace-nowrap laptop-l:flex-row">
                Subtotal {items.length} items:{' '}
                <span className="font-bold">
                  {' '}
                  {/* <Currency quantity={Number(totalPrice)} /> */}
                  <Currency quantity={Number(total)} />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`submit-input button mt-2 ${
                  !session &&
                  `border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 cursor-not-allowed`
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
