// import { NextApiRequest, NextApiResponse } from 'next';

// import { listings as listingsEn } from '../../_cache/listings-en';
// import { listings as listingsJa } from '../../_cache/listings-ja';

// export default (req: NextApiRequest, res: NextApiResponse): void => {
//   const query = req.query.q as string;
//   // eslint-disable-next-line no-irregular-whitespace
//   const words = query ? query.toLowerCase().replace(/　/g, ' ').split(' ') : [];

//   const locale = req.query.locale;

//   const listings = locale === 'ja' ? listingsJa : listingsEn;

//   const results =
//     words.length > 0
//       ? listings.filter(
//           (listing) =>
//             words.every((word) => listing.title.includes(word)) ||
//             words.every((word) => listing.description.includes(word)) ||
//             words.every((word) => listing.colors.includes(word)) ||
//             words.every((word) => listing.sizing.includes(word)) ||
//             words.every((word) => listing.reviews?.includes(word)) ||
//             words.every((word) => listing.content.includes(word))
//         )
//       : [];

//   res.status(200).json({ results });
// };

export default function cpw() {}
