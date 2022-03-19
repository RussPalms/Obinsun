// import { GetStaticProps } from 'next';
// import Head from 'next/head';
// import { useRouter } from 'next/router';

// import ListingLayout from './src/components/ProductListings/ListingLayout';
// import NextLink from './src/components/ProductListings/NextLink';
// import Pagination from './src/components/ProductListings/Pagination';
// import Thumbnail from './src/components/ProductListings/Thumbnail';
// import usePagination from './server/hooks/usePagination';
// import { IListing } from './server/types/listing';
// import { SITE_NAME } from './server/utils/constants';
// import { getAllListings } from './server/utils/mdxUtils';

// type Props = {
//   listings: IListing[];
// };

// const Index: React.FC<Props> = ({ listings }: Props) => {
//   const router = useRouter();
//   const lang = router.locale;

//   const { currentPage, currentData, maxPage, setElement } = usePagination(
//     listings,
//     2,
//     1.0
//   );

//   const currentListings = currentData();

//   return (
//     <ListingLayout>
//       <Head>
//         <title>{SITE_NAME}</title>
//       </Head>

//       <h1 className="text-4xl font-bold mb-4">
//         {lang === 'ja' ? 'レシピ一覧' : 'Recipes'}
//       </h1>

//       <div className="space-y-12">
//         {currentListings.map((listing) => (
//           <div key={listing.slug}>
//             <div className="mb-4">
//               <Thumbnail
//                 slug={listing.slug}
//                 title={listing.title}
//                 src={listing.thumbnail}
//               />
//             </div>

//             <h2 className="text-2xl font-bold mb-4">
//               <NextLink href={`/listings/${listing.slug}`}>
//                 {listing.title}
//               </NextLink>
//             </h2>

//             <p className="dark:text-gray-300">{listing.description}</p>
//           </div>
//         ))}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         maxPage={maxPage}
//         setElement={setElement}
//       />
//     </ListingLayout>
//   );
// };

// export default Index;

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const listings = getAllListings(
//     ['slug', 'date', 'thumbnail', 'title', 'description'],
//     locale
//   );

//   return { props: { listings } };
// };

export default {};
