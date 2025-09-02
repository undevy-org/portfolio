/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Next.js to optimize images from our domains
    remotePatterns: [
      // Production domains
      {
        protocol: 'https',
        hostname: 'undevy.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'foxous.design',
        pathname: '/images/**',
      },
      // Staging domains
      {
        protocol: 'https',
        hostname: 'staging.undevy.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'staging.foxous.design',
        pathname: '/images/**',
      },
      // Local development domains
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.100.172',
        port: '3000',
        pathname: '/images/**',
      },
    ],
    // Disable strict mode for backward compatibility
    unoptimized: false,
  },
  // Add support for absolute URLs for images
  async rewrites() {
    return {
      beforeFiles: [
        // In development mode, redirect image requests
        // to the correct path if they exist locally
        {
          source: '/images/:path*',
          destination: '/images/:path*',
        },
      ],
    };
  },
};

export default nextConfig;