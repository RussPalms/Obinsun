//@ts-nocheck

import { getSession } from 'next-auth/react';
import UserProfile from '../../src/components/Profile/UserProfile';

export default function ProfilePage() {
  return <UserProfile />;
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/routes/loading/authenticate',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
