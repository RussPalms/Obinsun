// // import { getSession } from "next-auth/react";
// // import * as React from "react";
// import VerifyDocuments from "../../../src/components/Payments/VerifyDocuments";

// export interface IPaymenRegistrationProps {}

// export default function PaymenRegistration(props: IPaymenRegistrationProps) {
//   return (
//     <>
//       <VerifyDocuments />
//     </>
//   );
// }

// // export async function getServerSideProps(context: any) {
// //   const session = await getSession(context);

// //   return {
// //     props: {
// //       session,
// //     },
// //   };
// // }

// // // This function gets called at build time on server-side.
// // // It won't be called on client-side, so you can even do
// // // direct database queries.
// // export async function getStaticProps() {
// //   // Call an external API endpoint to get posts.
// //   // You can use any data fetching library
// //   // const res = await fetch('https://.../posts')
// //   const res = await fetch("https://obinsun-merch.firebaseio.com");
// //   const posts = await res.json();

// //   // By returning { props: { posts } }, the Blog component
// //   // will receive `posts` as a prop at build time
// //   return {
// //     props: {
// //       posts,
// //     },
// //   };
// // }

export {};
