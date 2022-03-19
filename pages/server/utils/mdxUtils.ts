// // import fs from 'fs';
// import { join } from 'path';
// import matter from 'gray-matter';

// const fs = require('fs');

// type Items = {
//   [key: string]: string;
// };

// type Listing = {
//   data: {
//     [key: string]: string;
//   };
//   content: string;
// };

// const LISTINGS_PATH = join(process.cwd(), '_listings');

// export function parseLocale(locale?: string): 'ja' | 'en' {
//   return locale === 'ja' ? 'ja' : 'en';
// }

// function getListingFilePaths(locale?: string): string[] {
//   const lang = parseLocale(locale);

//   return (
//     fs
//       .readdirSync(join(LISTINGS_PATH, `${lang}`))
//       // Only include md(x) files
//       .filter((path) => /\.mdx?$/.test(path))
//   );
// }

// export function getListing(slug: string, locale?: string): Listing {
//   const lang = parseLocale(locale);
//   const fullPath = join(LISTINGS_PATH, `${lang}`, `${slug}.mdx`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');
//   const { data, content } = matter(fileContents);

//   return { data, content };
// }

// export function getListingItems(
//   filePath: string,
//   fields: string[] = [],
//   locale?: string
// ): Items {
//   const slug = filePath.replace(/\.mdx?$/, '');
//   const { data, content } = getListing(slug, locale);

//   const items: Items = {};

//   // Ensure only the minimal needed data is exposed
//   fields.forEach((field) => {
//     if (field === 'slug') {
//       items[field] = slug;
//     }
//     if (field === 'content') {
//       items[field] = content;
//     }

//     if (data[field]) {
//       items[field] = data[field];
//     }
//   });

//   return items;
// }

// export function getAllListings(
//   fields: string[] = [],
//   locale?: string
// ): Items[] {
//   const filePaths = getListingFilePaths();
//   const listings = filePaths
//     .map((filePath) => getListingItems(filePath, fields, locale))
//     // sort posts by date in descending order
//     .sort((listing1, listing2) => (listing1.date > listing2.date ? -1 : 1));
//   return listings;
// }

export {};
