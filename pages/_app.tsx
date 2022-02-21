import './app/styles/globals.css';
//  import "tailwindcss/tailwind.css";

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './app/features';
import { DefaultSeo } from 'next-seo';
import { WishlistProvider } from './app/context/wishlist';
import { defaultSEO } from '../next-seo.config';
import Layout from './src/components/ProductIntegration/Layout';
import { Provider } from 'react-redux';
import { store } from './app/state/store';

import { ThemeProvider } from 'next-themes';
import { MdxComponentsProvider } from './app/context/MdxComponents';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Progress, Preload } from './src/components/Progress';
import { useProgressStore } from './app/state/progressing';

import { AnimatePresence } from 'framer-motion';

// import {Preload} from '.src/components/Progress'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [loading, setLoading] = useState(false);

  const setIsAnimating = useProgressStore((state: any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state: any) => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
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
    setTimeout(() => setLoading(!loading), 600);
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    console.log(router.events);
    // console.log(isAnimating);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);

      console.log(router.events);
    };
  }, [router]);

  return (
    <>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        {loading ? (
          <>
            <Progress isAnimating={isAnimating} />
            {/* <ThemeProvider attribute="class"> */}
            <MdxComponentsProvider>
              <SessionProvider session={session}>
                <Provider store={store}>
                  <WishlistProvider>
                    <UserProvider>
                      {/* <Layout> */}
                      {/* <AnimatePresence
                        exitBeforeEnter
                        initial={false}
                        onExitComplete={() => window.scrollTo(0, 0)}
                      > */}
                      <DefaultSeo {...defaultSEO} />
                      <Component {...pageProps} />
                      {/* </AnimatePresence> */}
                      {/* </Layout> */}
                    </UserProvider>
                  </WishlistProvider>
                </Provider>
              </SessionProvider>
            </MdxComponentsProvider>
            {/* </ThemeProvider> */}
          </>
        ) : (
          <Preload />
        )}
      </AnimatePresence>
    </>
  );
}

export default MyApp;

// import "./app/styles/globals.css";
// //  import "tailwindcss/tailwind.css";

// import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
// import { UserProvider } from "./app/features";
// import { DefaultSeo } from "next-seo";
// import { WishlistProvider } from "./app/context/wishlist";
// import { defaultSEO } from "../next-seo.config";
// import Layout from "./src/components/ProductIntegration/Layout";
// import { Provider } from "react-redux";
// import { store } from "./app/state/store";

// function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
