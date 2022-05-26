import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import { Preload } from './src/components/Progress';

export default function AuthenticatePage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  async () => {
    await getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  };

  if (isLoading) {
    return <Preload />;
  }

  return;
}
