import { GetStaticProps } from 'next';
import { getSession } from 'next-auth/react';

import Obinsun from 'Production/Layout/Obinsun';
// import ArticleCard from '../components/ArticleCard'
// import Layout from '../components/Layout'
// import PageTitle from '../components/PageTitle'
// import Section from '../components/Section'
// import IHomePageArticles from '../interfaces/IHomePageArticles'
// import { getHomePageArticles } from '../lib/devto'
import shuffle from 'lodash.shuffle';
import { PrintfulProduct } from './types';
import { formatVariantName } from './server/lib/format-variant-name';
import { printful } from './server/lib/printful-client';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';

type IndexPageProps = {
  products: PrintfulProduct[];
};

// interface IProps {
//     homePageArticles: IHomePageArticles
// }

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

const IndexPage = ({
  products,
}: // homePageArticles: {
//   latestBlog,
//   latestPortfolio,
//   featuredBlog,
//   featuredPortfolio,
// },
IProps): JSX.Element => {
  // const projects = featuredPortfolio || [latestPortfolio];
  return (
    <Obinsun title="Home" description={`${title} - ${subtitle}`}>
      <div className="text-center pb-6 md:pb-12">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
          All Products
        </h1>
      </div>

      <ProductGrid products={products} />
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
    </Obinsun>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//     const homePageArticles = await getHomePageArticles()
//     return { props: { homePageArticles } }
// }

export const getStaticProps: GetStaticProps = async () => {
  const util = require('util');
  const { result: productIds } = await printful.get('sync/products');
  const allProducts = await Promise.all(
    productIds.map(async ({ id }) => await printful.get(`sync/products/${id}`))
  );
  const products: PrintfulProduct[] = allProducts.map(
    ({ result: { sync_product, sync_variants } }) => ({
      ...sync_product,
      variants: sync_variants.map(({ name, ...variant }) => ({
        name: formatVariantName(name),
        ...variant,
      })),
    })
  );
  return {
    props: {
      products: shuffle(products),
    },
  };
};

export default IndexPage;
