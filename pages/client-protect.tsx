import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function ClientProtected() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/api/auth/signin');
    },
  });

  if (status === 'loading') {
    return 'Loading or not authenticated...';
  }

  return 'User is logged in';
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin',
      },
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
};
