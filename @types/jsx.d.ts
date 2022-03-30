import type { Session } from 'next-auth';
import 'react';

// declare module 'react' {
//   interface SessionHTMLAttributes<T> extends HTMLAttributes<T> {
//     //   interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
//     // loading?: 'lazy' | 'eager' | 'auto';
//     session?: Session;
//     // for styled-jsx
//     // jsx?: boolean;
//     // global?: boolean;
//   }
// }

// declare namespace JSX {
//     interface IntrinsicElements {
//       "img": HTMLAttributes & {
//         alt: string,
//         src: string,
//         loading?: 'lazy' | 'eager' | 'auto';
//       }
//     }
//   }

declare namespace JSX {
  interface IntrinsicAttributes {
    img: HTMLAttributes & {
      alt: string;
      src: string;
      loading?: 'lazy' | 'eager' | 'auto';
    };
  }
}
