import "./app/styles/globals.css";
// import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./app/features";
import { DefaultSeo } from "next-seo";
import { WishlistProvider } from "./app/context/wishlist";
import { defaultSEO } from "../next-seo.config";
import Layout from "./src/components/ProductIntegration/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <WishlistProvider>
        <UserProvider>
          <Layout>
            <DefaultSeo {...defaultSEO} />
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </WishlistProvider>
    </SessionProvider>
  );
}

export default MyApp;
