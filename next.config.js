/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 

    return config;
  },
  images: {
    domains: ['tailwindui.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alamoda-website.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.assetsmanagment.com'
      },
      {
        protocol: 'https',
        hostname: 'baseblu.chalco.net'
      },
      {
        protocol: 'https',
        hostname: 'www.baseblu.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
  },
}

module.exports = nextConfig