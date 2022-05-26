/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['files.cdn.printful.com', 'firebasestorage.googleapis.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    printful_client_id: process.env.PRINTFUL_CLIENT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
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

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },

  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
