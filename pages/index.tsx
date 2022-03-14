import { GetStaticProps } from 'next';
// import { getSession } from 'next-auth/react';

import Obinsun from 'pages/Production/Layout/Obinsun';
// import MerchLayout from './src/components/ShopTest';
// import ArticleCard from '../components/ArticleCard'
// import Layout from '../components/Layout'
// import PageTitle from '../components/PageTitle'
// import Section from '../components/Section'
// import { getHomePageArticles } from '../lib/devto'
import shuffle from 'lodash.shuffle';
import { PrintfulProduct } from './types';
import { formatVariantName } from './server/lib/format-variant-name';
import { printful } from './server/lib/printful-client';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';
import IHomePageDesigns from 'pages/Production/interfaces/IHomePageDesigns';
import Content from './Production/Layout/Content';
import { useAppDispatch, useAppSelector } from './server/hooks/reduxHooks';
import { ISyncProduct } from './api/products';
// import { receivedProducts } from './app/state/slices/productsSlice';
import { useEffect } from 'react';
// import { getProducts } from 'getSyncedProducts';
// import DesignMix from './src/components/DesignMix';
// import Header from 'pages/Production/Layout/Header';
// import Sidebar from 'pages/Production/Layout/Sidebar';
// import Externals from 'pages/Production/Layout/Externals';
// import Content from 'pages/Production/Layout/Content';
// import Footer from 'pages/Production/Layout/Footer';

type IndexPageProps = {
  synced_products: ISyncProduct[];
};

interface IProps {
  // homePageDesigns: IHomePageDesigns
  designs: IHomePageDesigns;
  products: IndexPageProps;
}

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

const IndexPage = ({
  products,
}: // products,
// homePageArticles: {
//   latestBlog,
//   latestPortfolio,
//   featuredBlog,
//   featuredPortfolio,
// },
IProps): JSX.Element => {
  const retrieveProducts = async () => {
    const url = `/api/checkout-success`;
    // const url = `/api/products/61e844c86224c7`;

    const response = await fetch(url, {
      // method: 'POST',
      method: 'GET',
    });
    const data = await response.json();
    // if (!data.success) {
    //   throw new Error(data.error);
    // }

    // console.log(data);
    // return data;
  };

  // console.log(retrieveProducts());
  useEffect(() => {
    retrieveProducts();
  }, []);
  // retrieveProducts();
  // console.log(retrieveProducts());

  // async function getProducts(): Promise<PrintfulProduct[]> {
  //   const { result: productIds } = await printful.get('sync/products', '');
  //   const allProducts = await Promise.all(
  //     productIds.map(
  //       async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
  //     )
  //   );
  //   const products: PrintfulProduct[] = allProducts.map(
  //     ({ result: { sync_product, sync_variants } }) => ({
  //       ...sync_product,
  //       variants: sync_variants.map(({ name, ...variant }: any) => ({
  //         name: formatVariantName(name),
  //         ...variant,
  //       })),
  //     })
  //   );

  //   return products;
  // }

  // const dispatch = useAppDispatch();

  // const synced_products = useAppSelector((state) => state.products.products);
  // useEffect(() => {
  //   getProducts().then((products) => {
  //     dispatch(receivedProducts(products));
  //   });
  // }, []);

  // console.log(synced_products);
  // console.log(getProducts());

  // const projects = featuredPortfolio || [latestPortfolio];
  return (
    <>
      {/* <DesignMix /> */}
      {/* <MerchLayout /> */}
      {/* <div className="relative top-0 h-full w-full z-40 flex flex-col items-center justify-center text-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg">
        <Header />
        <Sidebar />
        <Externals />
        <Content />
        <Footer />
      </div> */}

      {/* // <main className="relative"> */}
      <Content title="Home" description={`${title} - ${subtitle}`}>
        <div className="text-center pb-6 md:pb-12">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
            All Products
          </h1>
        </div>

        <ProductGrid products={products} />
        {/* <ProductGrid products={products} />
        <ProductGrid products={products} />
        <ProductGrid products={products} />
        <ProductGrid products={products} /> */}
        {/* <PageTitle title={title} subtitle={subtitle} /> */}
        {/* <Section linebreak>
                <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">About</h2>
                <p className="my-2">
                    I spend most of my time as a frontend developer on Ostmodern&apos;s Skylark CMS
                    using React.js. Sometimes I use Node.js, Docker, Kubernetes and Golang and
                    I&apos;m currently experimenting with Serverless technologies on AWS and Azure.
                </p>
                <p className="my-2">
                    Outside of work I spend my time creating content for my blog where I discuss
                    other projects I&apos;m working on, interesting problems I&apos;ve had to solve
                    and create tutorials to educate and help others use various technologies for the
                    first time or in a more efficient manner.
                </p>
            </Section>
            <Section>
                <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
                    Latest article
                </h2>
                <ArticleCard
                    title={latestBlog.title}
                    description={latestBlog.description}
                    date={latestBlog.publishedAt}
                    tags={latestBlog.tags}
                    canonical={latestBlog.canonical}
                />

                {featuredBlog && (
                    <>
                        <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
                            Featured article
                        </h2>
                        <ArticleCard
                            title={featuredBlog.title}
                            description={featuredBlog.description}
                            date={featuredBlog.publishedAt}
                            tags={featuredBlog.tags}
                            canonical={featuredBlog.canonical}
                        />
                    </>
                )}

                <h2 className="text-3xl md:text-4xl mb-4 text-black dark:text-white">
                    Featured projects
                </h2>
                {projects.map((project) => (
                    <ArticleCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        date={project.publishedAt}
                        tags={project.tags}
                        canonical={project.canonical}
                        portfolio
                        coverImage={project.coverImage}
                    />
                ))}
            </Section> */}
      </Content>
      {/* // </main> */}
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//     const homePageArticles = await getHomePageArticles()
//     return { props: { homePageArticles } }
// }

export const getStaticProps: GetStaticProps = async () => {
  // const util = require('util');
  const { result: productIds } = await printful.get('sync/products', '');
  const allProducts = await Promise.all(
    productIds.map(
      async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
    )
  );
  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }: any) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );

  // console.log(products[2].variants[0]);
  console.log(products);

  // const retrieveProducts = () => {
  //   const dispatch = useAppDispatch();

  //   const products = useAppSelector((state) => state.products.products);
  //   useEffect(() => {
  //     getProducts().then((products) => {
  //       dispatch(receivedProducts(products));
  //     });
  //   }, []);
  //   return products;
  // };

  // const products = retrieveProducts();

  // console.log(products);

  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
