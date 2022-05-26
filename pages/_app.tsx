process.on('warning', (e) => console.warn(e.stack));
import React from 'react';

import 'normalize.css';

import './app/styles/globals.css';
import 'tailwindcss/tailwind.css';

import Head from 'next/head';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './app/features';
import { DefaultSeo } from 'next-seo';
import { WishlistProvider } from './app/context/wishlist';
import { Provider } from 'react-redux';
import store from './app/state/store';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Progress, Preload } from './src/components/Progress';
import { useProgressStore } from './app/state/progressing';

import { AnimatePresence } from 'framer-motion';
import Obinsun from 'pages/Production/Layout/Obinsun';

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  const url = `${process.env.NEXTAUTH_URL}${router.route}`;

  const [loading, setLoading] = useState(false);

  const setIsAnimating = useProgressStore((state: any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state: any) => state.isAnimating);
  const loadingRouter = useRouter();

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  useEffect(() => {
    setTimeout(() => setLoading(!loading), 500);
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    loadingRouter.events.on('routeChangeStart', handleStart);
    loadingRouter.events.on('routeChangeComplete', handleStop);
    loadingRouter.events.on('routeChangeError', handleStop);

    return () => {
      loadingRouter.events.off('routeChangeStart', handleStart);
      loadingRouter.events.off('routeChangeComplete', handleStop);
      loadingRouter.events.off('routeChangeError', handleStop);
    };
  }, [loadingRouter]);

  return (
    <>
      <Head>
        <link rel="icon" href="/Grim2021.svg" type="image/svg>" />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Obinsun"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url,
          description:
            'The personal website for Joel Robinson, graphic artist.',
          site_name: 'Joel Robinson | obinsun.com',
          images: [],
        }}
        canonical={url}
      />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        {loading ? (
          <>
            <Progress isAnimating={isAnimating} />
            <SessionProvider session={session}>
              <Provider store={store}>
                <WishlistProvider>
                  <UserProvider>
                    <Obinsun>
                      <Component {...pageProps} />
                    </Obinsun>
                  </UserProvider>
                </WishlistProvider>
              </Provider>
            </SessionProvider>
          </>
        ) : (
          <Preload />
        )}
      </AnimatePresence>
    </>
  );
}

export default MyApp;
