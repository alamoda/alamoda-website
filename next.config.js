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
    ],
  },
}

module.exports = nextConfig
