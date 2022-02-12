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
import { formatProductVariantName } from "../../../src/components/Printful/format-product-variant-name";

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
  const util = require("util");
  // console.log(util.inspect(array, { maxArrayLength: null }))

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
  let retrieved: any = [];

  const axiosHeaders = {
    headers: {
      token_type: "Bearer",
      access_token: "CUhN5TnyoJNzZrkUyjsdIiDV7QAwxyuv5PgGsKpQ",
    },
  };

  await getPrintfulCatalogId
    .get("https://api.printful.com/products", axiosHeaders)
    .then((response) => {
      // console.log(response.request.res);

      // console.log(response.headers["x-ratelimit-limit"]);

      const printfulRateLimit = Number(response.headers["x-ratelimit-limit"]);

      catalogId.push(printfulRateLimit);

      const { result } = response.data;
      retrieved.push(result);

      result.forEach((item: any) => {
        const { id } = item;
        // catalogId["_id"] = id;
        // let retrieved: any = [];

        // const getAllProducts = async () => {
        //   // const allProducts = await Promise.all(
        //   //   catalogId["_id"].map(
        //   //     async ({ _id }: any) => await printful.get(`products/${_id}`)
        //   //   )
        //   // );

        //   // const allItems = await printful.get(`products/${id}`);
        //   // console.log(allProducts);
        //   // console.log(allItems);

        //   // catalogId["_id"] = allItems;
        //   // console.log(catalogId);

        //   // catalogId.push({ ...allItems, id: id });
        //   // await catalogId.push(allItems);
        //   // await catalogId.push(allItems);
        //   // console.log(await allItems);
        //   // console.log(catalogId);

        //   // const catalog: PrintfulCatalog[] = await Promise.all(
        //   //   catalogId.map(({ result: { product, variants } }: any) => ({
        //   //     ...product,
        //   //     variants: variants.map(({ name, ...variant }: any) => ({
        //   //       name: formatVariantName(name),
        //   //       ...variant,
        //   //     })),
        //   //   }))
        //   // );

        //   // console.log(catalog);

        //   // try {
        //   await axios
        //     .get(`https://api.printful.com/products/${id}`, {
        //       headers: {
        //         token_type: "Bearer",
        //         access_token: "fm89rEM8YSGjxoIx7FWGMGBQmm1zfLNBnaqHIlYt",
        //       },
        //     })
        //     .then((response) => {
        //       const { result } = response.data;
        //       retrieved.push({ ...result });
        //       console.log(
        //         `${result.product.id} has been added to the catalog list`
        //       );
        //     })
        //     .catch((error) => {
        //       // console.error(error);
        //       // console.log(error.config.url);
        //       const retrievingCatalog = async () => {
        //         await axios
        //           .get(`${error.config.url}`, {
        //             headers: {
        //               token_type: "Bearer",
        //               access_token: "fm89rEM8YSGjxoIx7FWGMGBQmm1zfLNBnaqHIlYt",
        //             },
        //           })
        //           .then((response) => {
        //             const { result } = response.data;
        //             retrieved.push({ ...result });
        //             console.log(
        //               `${result.product.id} has been added to the catalog list`
        //             );
        //           })
        //           .catch((error) => {
        //             console.error(error);
        //           });
        //       };
        //       // retrievingCatalog();
        //       // console.log(retrieved);
        //     });

        //   // .then((response) => {
        //   //   // const retrieved = [];
        //   //   const refreshRequest = async () => {};
        //   //   if (response.status === 200) {
        //   //     try {
        //   //       const { result } = response.data;
        //   //       retrieved.push({ ...result });
        //   //       console.log(
        //   //         `${result.product.id} has been added to the catalog list`
        //   //       );
        //   //       return;
        //   //     } catch (error) {
        //   //       console.log(error, "Request limit was reached.");
        //   //       return;
        //   //       // console.log(retrieved);
        //   //       // if (!(id in retrieved)) {
        //   //       //   axios
        //   //       //   .get(`https://api.printful.com/products/${id}`, {
        //   //       //     headers: {
        //   //       //       token_type: "Bearer",
        //   //       //       access_token: "fm89rEM8YSGjxoIx7FWGMGBQmm1zfLNBnaqHIlYt",
        //   //       //     },
        //   //       //   })
        //   //       // }
        //   //     }
        //   //   } else if (response.status === 429) {
        //   //     console.log(
        //   //       Error,
        //   //       "Could not add to list due to request limit."
        //   //     );
        //   //     return;
        //   //   } else {
        //   //     // console.log(retrieved);
        //   //     return;
        //   //   }

        //   //   // console.log(retrieved);

        //   //   // console.log

        //   //   // console.log(response);
        //   //   // if (catalogItems.data.response === 429)
        //   //   // const { result } = catalogItems.data;
        //   //   // console.log(result);
        //   // });
        //   // } catch (error) {

        //   // }
        // };
        // getAllProducts();
        // console.log(retrieved);
        catalogId["_id"] = id;
        // catalog[item.id] = item;
      });
    });

  // console.log(catalogId);
  // console.log(retrieved);
  // console.log(util.inspect(retrieved, { maxArrayLength: null }));
  console.dir(retrieved, {
    depth: null,
    colors: true,
    maxArrayLength: null,
  });

  let catalogList = [];
  // let catalogList = [{ _id: 119 }];

  let requestList = [];

  for (let p = 1; p <= catalogId["_id"]; p++) {
    catalogList.push({ _id: p });
  }

  const numberOfRequests = Math.ceil(catalogId["_id"] / catalogId[0]);

  // console.log(numberOfRequests);

  console.log(
    `Max number of request per minute: ${catalogId[0]}\nNumber of request to make: ${numberOfRequests}`
  );

  // console.log(catalogList.slice(0, catalogId[0]));

  // for (let r = 0; r == numberOfRequests - 1; r++) {
  //   let requestArray = [];

  //   for (let n = 1; n == catalogId[0] + 1; n += catalogId[0]) {
  //     requestArray.push(catalogList.slice(r * catalogId[0], n));
  //   }
  //   requestList.push(requestArray);

  // function sliceIntoChunks(catalogList: any, numberOfRequests: any) {
  //   const res = [];
  //   for (let i = 0; i < catalogList.length; i += numberOfRequests) {
  //     const chunk = catalogList.slice(i, i + numberOfRequests);
  //     res.push(chunk);
  //   }
  //   console.log(res);

  //   return res;
  // }

  function sliceIntoChunks(arr: any, chunkSize: any) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    // console.log(res);
    return res;
  }
  // }
  const slicedRequests = sliceIntoChunks(catalogList, catalogId[0]);
  // console.dir(slicedRequests, { maxArrayLength: null });
  // console.table(slicedRequests); // only good for browsers
  // console.log(util.inspect(arrayofObjects, {maxArrayLength: null, depth:null }))
  // console.log(
  //   util.inspect(slicedRequests, { maxArrayLength: null, depth: null })
  // );

  // console.log(requestList);
  // console.log(requestArray);

  const requestNumber = catalogList.length;

  // console.log(slicedRequests[0].slice(0, 4));

  let requestQueue = slicedRequests[0];
  // const allProducts = await Promise.all(
  //   slicedRequests[0]
  //     .slice(0, 3)
  //     .map(async ({ _id }: any) => await printful.get(`products/${_id}`))
  // );

  let errorList: any = [];
  let productCatalog: any = [];

  const catalogListing = await Promise.all(
    slicedRequests[0].slice(0, 3).map(
      async ({ _id }: any) =>
        await axios
          .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
          .then((response) => {
            const { result } = response.data;
            // productCatalog.push(result);
            // return result;

            // console.log(result);
            // console.log(util.inspect(result, { maxArrayLength: null }));

            return response.data;
          })
          .catch((err) => {
            // console.error(err);
            // console.log(err.response.config.url);
            errorList.push(err.response.config.url);
          })
    )
  );

  let catalogListingBucket: any = [];

  const catalogListing0 = await Promise.all(
    slicedRequests[0].slice(0, 3).map(
      async ({ _id }: any) =>
        await axios
          .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
          .then((response) => {
            const { result } = response.data;
            // productCatalog.push(result);
            // return result;

            // console.log(result);
            // console.log(util.inspect(result, { maxArrayLength: null }));
            catalogListingBucket.push(response.data);

            return response.data;
          })
          .catch((err) => {
            // console.error(err);
            // console.log(err.response.config.url);
            errorList.push(err.response.config.url);
          })
    )
  );

  // catalogListingBucket.push(catalogListing0);

  const catalogListing1 = await Promise.all(
    slicedRequests[0].slice(3, 4).map(
      async ({ _id }: any) =>
        await axios
          .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
          .then((response) => {
            const { result } = response.data;

            catalogListingBucket.push(response.data);

            // productCatalog.push(result);
            // return result;

            // console.log(result);
            // console.log(util.inspect(result, { maxArrayLength: null }));

            return response.data;
          })
          .catch((err) => {
            // console.error(err);
            // console.log(err.response.config.url);
            errorList.push(err.response.config.url);
          })
    )
  );

  // catalogListingBucket.push(catalogListing1);

  // console.log(catalogListingBucket);
  // console.log(errorList);

  // console.log(productCatalog.result);

  // console.log(catalogListing.result);
  // console.dir(catalogListing, {
  //   depth: null,
  //   colors: true,
  //   maxArrayLength: null,
  // });

  // console.log(util.inspect(catalogListing[0], { maxArrayLength: null }));

  const catalog: PrintfulCatalog[] = catalogListing.map(
    ({ result: { product, variants } }) => ({
      ...product,
      variant_count: variants.map(({ name, ...variant }: any) => ({
        name: formatProductVariantName(name),
        ...variant,
      })),
    })
  );

  // console.log(errorList.length);
  // console.log(errorList.length);

  // console.log(catalogListing.length);

  // console.log(allProducts);

  // const getFullCatalog = async (
  //   numberOfRequests: number,
  //   slicedRequests: any
  // ) => {
  //   let catalog = [];
  //   for (let q = 0; q == numberOfRequests; q++) {
  //     let requestQueue = slicedRequests[q];
  //     const retrieveCatalog = await requestQueue.map(
  //       async ({ _id }: any) =>
  //         await axios
  //           .get(`https://api.printful.com/products/${_id}`, axiosHeaders)
  //           .catch((err) => {
  //             console.error(err);
  //           })
  //     );
  //     const { result } = retrieveCatalog.data;
  //     catalog.push(result);
  //     console.log(`${result} has been added to the list.`);
  //   }
  //   return catalog;
  // };
  // const fullCatalog = getFullCatalog(numberOfRequests, slicedRequests);
  // console.log(fullCatalog);
  // const thePromise = new Promise((resolve, reject) => {
  //   resolve({
  //     doSomething: function () {
  //       return new Promise((resolve, reject) => {
  //         reject("error!"); //you can pass any value
  //       });
  //     },
  //   });
  // });

  // thePromise
  //   .then((response) => {
  //     // return response.doSomething()
  //     return response;
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

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
      catalog,
    },
  };
};

export default IndexPage;
