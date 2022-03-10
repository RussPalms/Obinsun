import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
// import Authentication from "../../src/components/Authentication";
import { Preload } from 'pages/src/components/Progress';
import Authorization from 'pages/Production/Layout/Authorization';

export default function Authenticate() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    await getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Preload />;
  }

  return <Authorization />;
}
