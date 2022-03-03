import './app/styles/globals.css';
//  import "tailwindcss/tailwind.css";

import Head from 'next/head';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './app/features';
import { DefaultSeo } from 'next-seo';
import { WishlistProvider } from './app/context/wishlist';
// import { defaultSEO } from '../next-seo.config';
// import Layout from './src/components/ProductIntegration/Layout';
import { Provider } from 'react-redux';
import { store } from './app/state/store';
// import { stores } from './app/state/stores/store';
// import { store } from './app/state/stores/store';

// import { ThemeProvider } from 'next-themes';
import { MdxComponentsProvider } from './app/context/MdxComponents';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Progress, Preload } from './src/components/Progress';
import { useProgressStore } from './app/state/progressing';

import { AnimatePresence } from 'framer-motion';
import Obinsun from 'pages/Production/Layout/Obinsun';
// import Header from 'pages/Production/Layout/Header';
// import Sidebar from 'pages/Production/Layout/Sidebar';
// import Footer from 'pages/Production/Layout/Footer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

// export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric): void {
//   window.gtag('event', name, {
//       event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
//       value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
//       event_label: id, // id unique to current page load
//       non_interaction: true, // avoids affecting bounce rate.
//   })
// }

// import {Preload} from '.src/components/Progress'

function MyApp({
  Component,
  router,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  const url = `http://localhost:3000${router.route}`;

  const [loading, setLoading] = useState(false);

  const setIsAnimating = useProgressStore((state: any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state: any) => state.isAnimating);
  const loadingRouter = useRouter();

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
    setTimeout(() => setLoading(!loading), 1000);
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

    // console.log(loadingRouter.events);

    return () => {
      loadingRouter.events.off('routeChangeStart', handleStart);
      loadingRouter.events.off('routeChangeComplete', handleStop);
      loadingRouter.events.off('routeChangeError', handleStop);

      // console.log(loadingRouter.events);
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
            {/* <ThemeProvider attribute="class"> */}
            <MdxComponentsProvider>
              <SessionProvider session={session}>
                <Provider store={store}>
                  <WishlistProvider>
                    <UserProvider>
                      {/* <AnimatePresence
                        exitBeforeEnter
                        initial={false}
                        onExitComplete={() => window.scrollTo(0, 0)}
                      > */}
                      {/* <DefaultSeo {...defaultSEO} /> */}
                      {/* <Header /> */}
                      {/* <Sidebar /> */}
                      <Obinsun>
                        <Component {...pageProps} />
                      </Obinsun>
                      {/* <Footer /> */}
                      {/* </AnimatePresence> */}
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
