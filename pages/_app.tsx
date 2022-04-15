// require('dotenv').config();
// import * as dotenv from 'dotenv';
// dotenv.config();
// import './config';
// require('dotenv').config();
process.on('warning', (e) => console.warn(e.stack));
import React, { useCallback, useRef } from 'react';

// import { DB, dbApi } from './app/state/rtkApi';

import 'normalize.css';

// import './app/styles/sketchTest.css';

import './app/styles/globals.css';
import 'tailwindcss/tailwind.css';

import Head from 'next/head';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from './app/features';
import { DefaultSeo } from 'next-seo';
import { WishlistProvider } from './app/context/wishlist';
// import { defaultSEO } from '../next-seo.config';
// import Layout from './src/components/ProductIntegration/Layout';
import { Provider } from 'react-redux';
import { Provider as ProviderEnhancer } from 'react-redux';
import store from './app/state/store';
// import { stores } from './app/state/stores/store';
// import { store } from './app/state/stores/store';
import { todoApi } from './app/state/rtkApi';
import { ApiProvider } from '@reduxjs/toolkit/query/react';

// import { ThemeProvider } from 'next-themes';
// import { MdxComponentsProvider } from './app/context/MdxComponents';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Progress, Preload } from './src/components/Progress';
import { useProgressStore } from './app/state/progressing';

import { AnimatePresence } from 'framer-motion';
// import { Preload, Progress } from '@/components/Progress';
import Obinsun from 'pages/Production/Layout/Obinsun';
// import Obinsun from 'pages/Production/Layout/Obinsun';
// import Header from 'pages/Production/Layout/Header';
// import Sidebar from 'pages/Production/Layout/Sidebar';
// import Footer from 'pages/Production/Layout/Footer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// declare const window: any;

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
  const url = `${process.env.NEXTAUTH_URL}${router.route}`;

  const [loading, setLoading] = useState(false);

  const setIsAnimating = useProgressStore((state: any) => state.setIsAnimating);
  const isAnimating = useProgressStore((state: any) => state.isAnimating);
  const loadingRouter = useRouter();

  // useEffect(() => {
  //   // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  //   const windowDB = window.indexedDB;
  //   // window.indexedDB = window.indexedDB || window.webkitIndexedDB;
  //   // if (!windowDB) {
  //   //   alert();
  //   // }
  //   if (!windowDB) {
  //     alert();
  //   }
  //   let request = windowDB.open('ObinsunDB', 1),
  //     database: IDBDatabase,
  //     transaction: IDBTransaction,
  //     storage: IDBObjectStore,
  //     index: IDBIndex;

  //   request.onupgradeneeded = function (event) {
  //     event.preventDefault();
  //     let database = request.result,
  //       // storage = database.createObjectStore('ObinsunStorage', {
  //       //   keyPath: 'obinsunIdentification',
  //       // }),
  //       // or
  //       storage = database.createObjectStore('ObinsunStorage', {
  //         // autoIncrement: true,
  //         autoIncrement: false,
  //       });
  //     index = storage.createIndex('obinsunText', 'obinsunText', {
  //       // unique: false,
  //       unique: true,
  //     });
  //   };

  //   request.onerror = function (event) {
  //     event.preventDefault();
  //     // console.log(`There was an error: ${event.target.errorCode}`)
  //     // console.log(`There was an error: ${event}`);
  //     // console.log(`There was an error: ${event}`);
  //     console.log(`There was an error: ${event.target}`);
  //   };

  //   request.onsuccess = function (event) {
  //     event.preventDefault();
  //     database = request.result;
  //     transaction = database.transaction('ObinsunStorage', 'readwrite');
  //     storage = transaction.objectStore('ObinsunStorage');
  //     index = storage.index('obinsunText');
  //     database.onerror = function (event) {
  //       event.preventDefault();
  //       // console.log("ERROR" + event.target.error)
  //       // console.log('ERROR' + event);
  //       console.log('ERROR' + event.target);
  //     };
  //     storage.put({
  //       obinsunIdentification: 1,
  //       obinsunText: 'username',
  //       enteredEntry: 'obinsunUsername',
  //     });
  //     storage.put({
  //       obinsunIdentification: 2,
  //       obinsunText: 'firstname',
  //       enteredEntry: 'obinsunFirstname',
  //     });
  //     storage.put({
  //       obinsunIdentification: 3,
  //       obinsunText: 'firstname',
  //       enteredEntry: 'obinsunLastname',
  //     });
  //     let obinsun1 = storage.get(1);
  //     let obinsun = index.get('username');
  //     obinsun1.onsuccess = function () {
  //       console.log(obinsun1.result);
  //       console.log(obinsun1.result.obinsunText);
  //     };
  //     obinsun.onsuccess = function () {
  //       console.log(obinsun.result.obinsunText);
  //     };
  //     transaction.oncomplete = function () {
  //       database.close();
  //     };
  //   };
  // });

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

    // console.log(loadingRouter.events);

    return () => {
      loadingRouter.events.off('routeChangeStart', handleStart);
      loadingRouter.events.off('routeChangeComplete', handleStop);
      loadingRouter.events.off('routeChangeError', handleStop);

      // console.log(loadingRouter.events);
    };
  }, [loadingRouter]);

  // useEffect(() => {}, []);

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
            {/* <MdxComponentsProvider> */}
            <SessionProvider session={session}>
              {/* <ApiProvider api={todoApi}> */}
              {/* <ProviderEnhancer store={store}> */}
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
              {/* </ProviderEnhancer> */}
              {/* </ApiProvider> */}
            </SessionProvider>
            {/* </MdxComponentsProvider> */}
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
