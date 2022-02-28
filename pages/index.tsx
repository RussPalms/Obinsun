//@ts-nocheck

import type { NextPage } from 'next';

import // getSession,
//  useSession
'next-auth/react';
import Head from 'next/head';
import Designs from './src/components/Designs';
import Design from './src/components/Design';
import Entity from './src/components/EntityCreation/Entity';
import Entities from './src/components/EntityCreation/Entities';
import Header from './src/components/Header';
import Headers from './src/components/Headers';
import Heading from './src/components/Heading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import VerifyDocuments from "./src/components/Payments/VerifyDocuments";

import Link from 'next/link';
import LandingDesigns from './src/components/LandingDesigns';
import DesignMix from './src/components/DesignMix';
import DarkModeToggle from './src/components/DarkModeToggle';
import Hero from './src/components/Hero';
import Shop from './src/components/Shop';

export default function Home(): NextPage {
  // useEffect(async (error) => {
  // 	console.log(error);
  // console.log(errors);
  // window.addEventListener("unhandledrejection", (event) => {
  // 	console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  // });
  // window.onunhandledrejection = (event) => {
  // 	console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
  // };
  // window.addEventListener("unhandledrejection", function (event) {
  // 	// ...your code here to handle the unhandled rejection...
  // 	// Prevent the default handling (such as outputting the
  // 	// error to the console)
  // 	event.preventDefault();
  // });
  // }, []);

  // const { data: session, status } = useSession();
  // const loading = status === "loading";
  // console.log(status);
  // console.log(session);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // useEffect(async () => {
  // 	await getSession().then((session) => {
  // 		if (session) {
  // 			router.replace("/");
  // 		} else {
  // 			setIsLoading(false);
  // 		}
  // 	});
  // },
  // [router]
  // )
  // ;

  // if (status == "loading") {
  //   return <p>Loading...</p>;
  // }

  return (
    <>
      <Head>
        <title>Obinsun</title>
        <link rel="icon" href="/Grim2021.svg" />
      </Head>

      <main className="relative h-full">
        {/* <DarkModeToggle /> */}
        {/* <Heading /> */}
        {/* home */}
        {/* <Headers /> */}
        {/* <Header /> */}
        {/* <Designs /> */}
        {/* <LandingDesigns /> */}
        <div className="relative">
          <DesignMix />
          {/* <Hero /> */}
          {/* <Shop /> */}
        </div>
        <div className="relative">
          <Shop />
        </div>
        {/* <Design /> */}
        {/* <Entity /> */}
        {/* <Entities /> */}
        {/* <Login /> */}
        {/* <Log /> */}

        {/* <Link href="/gradient-testing">Gradient Testing</Link> */}

        {/* <VerifyDocuments /> */}
      </main>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }

// // import { NextPage } from "next";

// // import * as React from "react";
// // import { GetStaticProps } from "next";
// // import shuffle from "lodash.shuffle";
// // import { PrintfulProduct } from "./types";
// // import ProductGrid from "./src/components/ProductIntegration/ProductGrid";
// // import { formatVariantName } from "./server/lib/format-variant-name";
// // import { printful } from "./server/lib/printful-client";
// // import { getSession } from "next-auth/react";

// // type IndexPageProps = {
// //   products: PrintfulProduct[];
// // };

// // const IndexPage: React.FC<IndexPageProps> = ({ products }) => (
// //   // React.useEffect(() => {
// //   //   const getServerSideProps = async (context: any) => {
// //   //     const session = await getSession(context);
// //   //     return {
// //   //       props: {
// //   //         session,
// //   //       },
// //   //     };
// //   //   };
// //   // },[])

// //   <>
// //     <div className="text-center pb-6 md:pb-12">
// //       <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
// //         All Products
// //       </h1>
// //     </div>

// //     <ProductGrid products={products} />
// //   </>
// // );

// // export const getStaticProps: GetStaticProps = async () => {
// //   const { result: productIds } = await printful.get("sync/products");

// //   const allProducts = await Promise.all(
// //     productIds.map(
// //       async ({ id }: any) => await printful.get(`sync/products/${id}`)
// //     )
// //   );

// //   const products: PrintfulProduct[] = allProducts.map(
// //     ({ result: { sync_product, sync_variants } }: any) => ({
// //       ...sync_product,
// //       variants: sync_variants.map(({ name, ...variant }: any) => ({
// //         name: formatVariantName(name),
// //         ...variant,
// //       })),
// //     })
// //   );

// //   // console.log(products);

// //   return {
// //     props: {
// //       products: shuffle(products),
// //     },
// //   };
// // };

// // export default IndexPage;

// import React, { useState } from "react";
// import ImageGrid from "./src/components/Payments/Uploads/ImageGrid";
// import Modal from "./src/components/Payments/Uploads/Modal";
// import Title from "./src/components/Payments/Uploads/Title";
// import UploadForm from "./src/components/Payments/Uploads/UploadForm";

// type Props = {};

// function VerifyDocuments({}: Props) {
//   const [selectedImg, setSelectedImg] = useState(null);
//   console.log("this is the selected image", selectedImg);

//   return (
//     <div className="App">
//       <Title />
//       <UploadForm />
//       <ImageGrid setSelectedImg={setSelectedImg} />
//       {selectedImg && (
//         <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
//       )}
//     </div>
//   );
// }

// export default VerifyDocuments;
