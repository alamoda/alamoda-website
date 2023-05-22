/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, serverComponentsExternalPackages: ["mongoose"] },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    config.module.rules.push = ({
      test: /.txt$/, use: 'raw-loader'
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'alamoda-website.s3.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
