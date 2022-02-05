/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["files.cdn.printful.com"],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  // webpack: (config) => {
  //   config.experiments = { topLevelAwait: true };
  //   return config;
  // },
  // target: 'experimental-serverless-trace',
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = nextConfig;
