import { getSession, useSession } from 'next-auth/react';
import moment from 'moment';
import { db } from './server/lib/database/firebaseFirestore';

import * as React from 'react';
import Order from './src/components/StripeCheckout/Order';
import Content from './Production/Layout/Content';

// export interface IAppProps {
// }

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function OrdersPage({ orders }: any) {
  const { data: session, status } = useSession();
  //   console.log(orders);

  return (
    <Content title="Profile" description={`${title} - ${subtitle}`}>
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }: any) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </Content>
  );
}

export async function getServerSideProps(context: any) {
  const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection('users')
    // .doc(session.user.email)
    .doc(session.id as any)
    // .where("email", "==", session?.user?.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
