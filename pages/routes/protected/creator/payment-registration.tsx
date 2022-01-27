import { getSession } from "next-auth/react";
import * as React from "react";
import CreatorSetup from "../../../src/components/Payments/CreatorSetup";

export interface IPaymenRegistrationProps {}

export default function PaymenRegistration(props: IPaymenRegistrationProps) {
  return (
    <>
      <CreatorSetup />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
