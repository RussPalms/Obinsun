// import fs from 'fs';

// import { getAllListings } from '../pages/server/utils/mdxUtils';

// const stringifyListings = (locale: 'en' | 'ja') =>
//   `export const listings = ${JSON.stringify(
//     getAllListings(
//       [
//         'slug',
//         'title',
//         'description',
//         'colors',
//         'sizing',
//         'reviews',
//         'content',
//       ],
//       locale
//     ).map((listing) => ({
//       slug: listing.slug,
//       title: listing.title.toLowerCase(),
//       description: listing.description.toLowerCase(),
//       sizing: listing.sizing.toString().toLowerCase(),
//       colors: listing.colors.toString().toLowerCase(),
//       reviews: listing.reviews?.toString().toLowerCase(),
//       content: listing.content.toLowerCase(),
//     }))
//   )}`;

// fs.writeFile('_cache/listings-en.ts', stringifyListings('en'), (err) => {
//   if (err) return console.log(err);
//   console.log('English listings cached.');
// });

// fs.writeFile('_cache/listings-ja.ts', stringifyListings('ja'), (err) => {
//   if (err) return console.log(err);
//   console.log('Japanese listings cached.');
// });

export default function _() {
  const div = document.createElement('div');
  return div;
}
