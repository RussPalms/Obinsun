import { getSession } from 'next-auth/react';
import React, { useRef } from 'react';
import Authorization from './Production/Layout/Authorization';
import Content from './Production/Layout/Content';
import LoginModal from './Production/Layout/LoginModal';
import UserProfile from './src/components/Profile/UserProfile';

type Props = {};

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function ProfilePage({}: Props) {
  return (
    <>
      <Content title="Profile" description={`${title} - ${subtitle}`}>
        <UserProfile />
      </Content>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession({ req: context.req });

  console.log({ currentSession: session });

  if (!session) {
    console.log({ redirectedSession: session });
    // return (
    //   <LoginModal>
    //     <Authorization />
    //   </LoginModal>
    // );
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
