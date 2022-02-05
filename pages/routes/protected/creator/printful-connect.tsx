// import { getSession } from "next-auth/react";
import * as React from "react";
import AccountSetup from "../../../src/components/Printful/AccountSetup";

export default function PrintfulConnect() {
  return (
    <>
      <AccountSetup />
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
