// import { useEffect } from 'react';
// import { GetStaticProps, GetStaticPaths } from 'next';
// import dynamic from 'next/dynamic';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { serialize } from 'next-mdx-remote/serialize';
// import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

// import Colors from '../src/components/ProductListings/Colors';
// import Sizing from '../src/components/ProductListings/Sizing';
// import ListingLayout from '../src/components/ProductListings/ListingLayout';
// import Thumbnail from '../src/components/ProductListings/Thumbnail';
// import { useMdxComponentsContext } from '../app/context/MdxComponents';
// import { IListing } from '../server/types/listing';
// import { SITE_URL } from '../server/utils/constants';
// import { getListing, getAllListings } from '../server/utils/mdxUtils';

// type Props = {
//   source: MDXRemoteSerializeResult;
//   frontMatter: Omit<IListing, 'slug'>;
// };

// const components = {
//   Colors,
//   Sizing,
//   Reviews: dynamic(() => import('../src/components/ProductListings/Reviews')),
// };

// const ListingPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
//   const router = useRouter();
//   const lang = router.locale;

//   const ogImage = SITE_URL + frontMatter.thumbnail;

//   const { setLang, setColors, setSizing, setReviews } =
//     useMdxComponentsContext();

//   useEffect(() => {
//     setLang(lang);
//     setColors(frontMatter.colors);
//     setSizing(frontMatter.sizing);
//     setReviews(frontMatter.reviews);
//   }, [
//     frontMatter.colors,
//     frontMatter.sizing,
//     frontMatter.reviews,
//     lang,
//     setColors,
//     setSizing,
//     setLang,
//     setReviews,
//   ]);

//   return (
//     <ListingLayout pageTitle={frontMatter.title}>
//       <Head>
//         <meta
//           name="description"
//           content={frontMatter.description}
//           key="description"
//         />
//         <meta
//           property="og:description"
//           content={frontMatter.description}
//           key="ogDescription"
//         />
//         <meta property="og:image" content={ogImage} key="ogImage" />
//       </Head>

//       <article className="prose prose-green dark:prose-dark">
//         <div className="mb-4">
//           <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
//         </div>

//         <h1>{frontMatter.title}</h1>

//         <p className="font-bold">
//           {lang === 'ja' ? '分量：' : 'Pricing: '}
//           {frontMatter.pricing}
//         </p>

//         <p>{frontMatter.description}</p>

//         <MDXRemote {...source} components={components as any} />
//       </article>
//     </ListingLayout>
//   );
// };

// export default ListingPage;

// export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
//   const { content, data } = getListing(params?.slug as string, locale);

//   const mdxSource = await serialize(content, { scope: data });

//   return {
//     props: {
//       source: mdxSource,
//       frontMatter: data,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   const listings = getAllListings(['slug']);

//   const paths = locales!.flatMap((locale) =>
//     listings.map((listing) => ({
//       params: {
//         slug: listing.slug,
//       },
//       locale,
//     }))
//   );

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default function t0() {}
