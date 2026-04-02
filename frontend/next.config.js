/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Disabled for local dev - enable when deploying to static host
  trailingSlash: true,
  pageExtensions: ['tsx', 'ts', 'js', 'jsx'], // Allow pages directory with app router
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    
    // Handle static image imports
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });
    
    return config;
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;
