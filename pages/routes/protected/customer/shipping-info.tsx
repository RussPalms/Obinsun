// import { getSession } from "next-auth/react";
import * as React from 'react';
import CustomerInfo from '../../../src/components/Payments/CustomerInfo';

export default function ShippingInfo() {
  return (
    <>
      <CustomerInfo />
    </>
  );
}

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }
