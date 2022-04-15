import { getSession } from 'next-auth/react';
import Content from 'pages/Production/Layout/Content';
import React from 'react';
import ImageCaputure from '../../../src/components/Payments/Uploads/ImageCaputure';

type Props = {};

export default function VerifyDocument({}: Props) {
  return (
    <Content title="" description="">
      {/* <div className=""> */}
      <ImageCaputure />
      {/* </div> */}
    </Content>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

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
