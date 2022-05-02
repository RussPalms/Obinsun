import type { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import type Stripe from 'stripe';
import React from 'react';
import Content from './Production/Layout/Content';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function DashboardPage({}: Props) {
  return (
    <Content title="Dashboard" description={`${title} - ${subtitle}`}>
      <h1>Dashboard</h1>
    </Content>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  let obinsunUser = session.user;

  const obinsunAccessors = {
    stripeAccess: obinsunUser.stripeId,
    firestoreAccess: obinsunUser.firestoreId,
    printfulAccess: '',
    nextAccess: '',
  };

  const getRetrieval = {
    method: 'GET',
    // body: JSON.stringify(obinsunAccessors),
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${session.user.obinsunId}`,
      message: '~ retrieving gets ~',
      stripe_accessor: obinsunAccessors.stripeAccess,
      firestore_accessor: obinsunAccessors.firestoreAccess,
    },
  };

  const getData = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get/${obinsunUser.obinsunId}`,
    getRetrieval
  ).catch((retrievalErrors) => console.error(retrievalErrors));
  // backend response data
  // .then((getResponse) =>
  //   {
  //     console.dir(
  //       {
  //         'get-retrieval-directory': getResponse,
  //       },
  //       {
  //         depth: null,
  //         maxArrayLength: null,
  //         colors: true,
  //       }
  //     );
  //   }
  // )
  // .catch((retrievalErrors) =>
  //   console.error({ 'error-retrieval': retrievalErrors })
  // );
  //

  // backend sent data
  // console.dir(
  //   {
  //     'get-data-directory': getData,
  //   },
  //   {
  //     depth: null,
  //     maxArrayLength: null,
  //     colors: true,
  //   }
  // );

  // console.log(getData);

  // const balanceRetrieval = {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'Application/json',
  //     Authorization: `Bearer ${session.user.obinsunId}`
  //   },
  // };

  // const { balanceData } = await fetch(
  // const balanceData = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/balance`,
  //   balanceRetrieval
  // ).then((balanceResponse) => {
  //   console.dir(
  //     {
  //       'balance-retrieval-logger': balanceResponse,
  //     },
  //     {
  //       depth: null,
  //       maxArrayLength: null,
  //       colors: true,
  //     }
  //   );
  // });

  // .then((balanceResponse) => balanceResponse.json());
  // .then((balanceData) => balanceData )

  // console.log(balanceData);

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
