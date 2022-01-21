import "./app/styles/globals.css";
// import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./app/features";
import { DefaultSeo } from "next-seo";
import { WishlistProvider } from "./app/context/wishlist";
import { defaultSEO } from "../next-seo.config";
import Layout from "./src/components/ProductIntegration/Layout";
import { Provider } from "react-redux";
import { store } from "./app/state/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <WishlistProvider>
          <UserProvider>
            <Layout>
              <DefaultSeo {...defaultSEO} />
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </WishlistProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
