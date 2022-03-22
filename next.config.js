/** @type {import('next').NextConfig} */
// const withPlugins = require("next-compose-plugins");

// const withTM = require("next-transpile-modules")([
//   "three",
//   "react-three-fiber",
//   "drei",
// ]);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.cdn.printful.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  // webpack: (config) => {
  //   config.experiments = { topLevelAwait: true };
  //   return config;
  // },
  // target: 'experimental-serverless-trace',
  // webpack5: true,
  // future: {
  //   webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  // },
  webpack: (
    config
    // , { isServer }
  ) =>
    // options
    {
      config.experiments = config.experiments || {};
      config.experiments.topLevelAwait = true;

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        // use: ['@svgr/webpack'],
        use: [
          // {
          //   loader: '@svgr/webpack',
          //   options: {
          //     typescript: true,
          //     ext: 'tsx',
          //   },
          // },
          // {
          //   loader: 'file-loader',
          // },
          // {
          //   loader: 'svgo-loader',
          //   options: {
          //     configFile: './svgo.config.js',
          //   },
          // },
        ],
      });

      // config.resolve.fallback = {
      //   fs: false,
      //   path: false,
      //   stream: false,
      //   constants: false,
      // };

      // config.resolve.fallback = { fs: false };

      // if (!isServer) {
      //   config.node = {
      //     fs: 'empty'
      //   }
      // }

      // config.node = {
      //   fs: 'empty',
      // };

      // if (!isServer) {
      //   config.resolve.fallback = {
      //     fs: false,
      //   };
      // }

      return config;
    },

  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };

  //   return config;
  // },

  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       fs: false,
  //     };
  //   }

  //   return config;
  // },

  //   webpack: (config, options) => {
  //     config.node = {
  //       fs: 'empty'
  //     }
  // }

  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }

  //   return config
  // },
  // "next-transpile-modules": ["three", "react-three-fiber", "drei"],
  // withTM: require("next-transpile-modules")([
  //   "three",
  //   "react-three-fiber",
  //   "drei",
  // ]),
  // withTM: withTM(),
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

// const i18n = {
//   locales: ['en', 'ja'],
//   defaultLocale: 'en',
//   localeDetection: false,
// }

module.exports = nextConfig;
// module.exports = {nextConfig, withTM()}
// module.exports = withTM({ nextConfig });

// module.exports = withPlugins(
//   [
//     withTM(),
//     // for older versions of Next
//     //   {
//     //   webpack(config, options) {
//     //     config.module.rules.push({
//     //       test: /\.(glb|gltf)$/,
//     //       use: {
//     //         loader: "file-loader",
//     //       },
//     //     });
//     //     return config;
//     //   },
//     // }
//   ],
//   nextConfig
// );
