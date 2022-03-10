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
  webpack: (config, { isServer }) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },

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
