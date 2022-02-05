import { NextPage } from "next";

import * as React from "react";
import { GetStaticProps } from "next";
import shuffle from "lodash.shuffle";
import { getSession } from "next-auth/react";
import { printful } from "../../../server/lib/printful-client";
import CatalogGrid from "../../../src/components/Printful/CatalogGrid";
import { formatVariantName } from "../../../server/lib/format-variant-name";
import { PrintfulCatalog, PrintfulProduct } from "../../../types";
import axios from "axios";
import rateLimit from "axios-rate-limit";

type IndexPageProps = {
  products: PrintfulProduct[];
  catalog: PrintfulCatalog[];
};

// interface item  {
//   id: number;
//   type: string;
//   type_name: string;
//   title: string;
//   brand: any;
//   model: string;
//   image: string;
//   variant_count: number;
//   curency: string;
//   files: [];
//   options: [];
//   dimentions: any;
//   is_discontinued: boolean;
//   avg_fulfillment_time: any;
// }

const IndexPage: React.FC<IndexPageProps> = ({ catalog }) => (
  <>
    <div className="text-center pb-6 md:pb-12">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
        All Products
      </h1>
    </div>

    <CatalogGrid catalog={catalog} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  // const { result: productIds } = await printful.get("products");

  // console.log(productIds);

  const getPrintfulCatalogId = rateLimit(axios.create(), {
    // maxRequests: 2,
    // perMilliseconds: 225,
    // maxRPS: 0.5,

    maxRequests: 120,
    perMilliseconds: 2000,
    maxRPS: 2,
  });

  let catalogId: any = [];
  // let catalog: any = {};
  // let catalog: any = [];

  await getPrintfulCatalogId
    .get("https://api.printful.com/products", {
      headers: {
        token_type: "Bearer",
        access_token: "fm89rEM8YSGjxoIx7FWGMGBQmm1zfLNBnaqHIlYt",
        // Connection: "keep-alive",
      },
    })
    .then((response) => {
      // console.log(response.request.res);

      const { result: id } = response.data;
      id.forEach((item: any) => {
        const { id } = item;
        // catalogId["_id"] = id;

        const getAllProducts = async () => {
          // const allProducts = await Promise.all(
          //   catalogId["_id"].map(
          //     async ({ _id }: any) => await printful.get(`products/${_id}`)
          //   )
          // );

          const allItems = await printful.get(`products/${id}`);
          // console.log(allProducts);
          // console.log(allItems);

          // catalogId["_id"] = allItems;
          // console.log(catalogId);

          // catalogId.push({ ...allItems, id: id });
          // await catalogId.push(allItems);
          await catalogId.push(allItems);

          const catalog: PrintfulCatalog[] = await Promise.all(
            catalogId.map(({ result: { product, variants } }: any) => ({
              ...product,
              variants: variants.map(({ name, ...variant }: any) => ({
                name: formatVariantName(name),
                ...variant,
              })),
            }))
          );

          console.log(catalog);
        };
        getAllProducts();
        // catalogId["_id"] = id;
        // catalog[item.id] = item;
      });
    });

  // console.log(catalogId);

  let catalogList = [];
  // let catalogList = [{ _id: 119 }];

  // for (
  //   let p = 1;
  //   p <= catalogId["_id"];
  //   // 5;
  //   p++
  // ) {
  //   catalogList.push({ _id: p });
  // }

  // const catalogValues = Object.values(catalog);

  // const { result } = await printful.get("products/559");

  // console.log(result);

  // console.log(catalogValues);

  // console.log(catalogList);

  // const allProducts = await Promise.all(
  //   catalogList.map(async ({ _id }) => await printful.get(`products/${_id}`))
  // );

  // const allProducts = await Promise.all(
  //   catalogValues.map(async ({ id }) => await printful.get(`products/${id}`))
  // );

  // console.log(allProducts);

  // const getPrintfulCatalog = rateLimit(axios.create(), {
  //   maxRequests: 120,
  //   perMilliseconds: 2000,
  //   maxRPS: 2,
  // });

  // let catalogId: any = [];
  // let catalog: any = {};

  // await Promise.all(
  //   catalogList.map(
  //     async ({ _id }) =>
  //       await getPrintfulCatalog
  //         // await axios.
  //         .get(`https://api.printful.com/products/${_id}`, {
  //           headers: {
  //             token_type: "Bearer",
  //             access_token: "fm89rEM8YSGjxoIx7FWGMGBQmm1zfLNBnaqHIlYt",
  //           },
  //         })

  //     // .then((response) => {
  //     //   // const { result: id } = response.data;
  //     //   console.log(response);

  //     //   // id.forEach((item: any) => {
  //     //   //   const { id } = item;
  //     //   //   catalogId["_id"] = id;
  //     //   //   catalog[item.id] = item;
  //     //   // });
  //     // })
  //   )
  // );
  // .then(
  //   axios.spread((...allData) => {
  //     console.log({ allData });
  //   })
  // );

  // const catalogList = async () => {

  //   result.forEach((item: any) => {
  //     const { id } = item;
  //     let c = item.id;
  //     // c["_id"] = item.id;
  //     // catalog[id] = c;
  //     catalog.push(c);
  //   });
  // };
  // catalogList();
  // });

  // let catalog: any = {};
  // const printfulCatalog = await axios
  // .get("https://api.printful.com/products", {
  //   headers: {
  //     token_type: "Bearer",
  //     access_token: "ZlaECbmZJUaB8ONECXgFwZvcxB8ZMgRALtNFc3uh",
  //     Connection: "keep-alive",
  //   },
  // })
  // .then((response) => {
  //   const catalogList = async () => {
  //     const { result } = await response.data;

  //     result.forEach((item: any) => {
  //       const { id } = item;
  //       let c = item.id;
  //       // c["_id"] = item.id;
  //       // catalog[id] = c;
  //       catalog.push(c);
  //     });
  //   };
  //   catalogList();
  // });
  // console.log(catalog["559"]);
  // console.log(Object.keys(catalog));
  // console.log(catalog);
  return {
    props: {
      // catalog,
    },
  };
};

export default IndexPage;
