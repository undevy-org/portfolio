/** @type {import('next').NextConfig} */

/**
 * Safe Next.js config with defensive handling for images.remotePatterns.
 *
 * Why:
 *  - Next validates next.config image patterns at load time.
 *  - Passing undefined hostnames (e.g. from missing env vars) causes "Invalid next.config" errors.
 *  - Tests (Jest) usually run without your runtime env vars, so dynamic hostnames must be built safely.
 *
 * What this file does:
 *  - Sanitizes possible env inputs (accepts either plain hostnames or full URLs).
 *  - Only includes remotePatterns entries that have a valid hostname string.
 *  - Keeps the rest of the configuration (webpack, rewrites, experimental) intact.
 */

const sanitizeHostname = (maybeUrlOrHost) => {
  // Return null when input is falsy or not a non-empty string
  if (!maybeUrlOrHost || typeof maybeUrlOrHost !== 'string') return null;

  // Trim whitespace
  const v = maybeUrlOrHost.trim();
  if (!v) return null;

  // If it's a plain hostname (no scheme), try to normalize it.
  // If it's a full URL, use URL to extract hostname.
  try {
    // Ensure it parses with a scheme: if missing, assume https://
    const url = new URL(v.includes('://') ? v : `https://${v}`);
    // url.hostname is what Next expects (no protocol, no path)
    return url.hostname;
  } catch (e) {
    // Fallback: remove common artifacts (protocol, path, port) and return the first segment
    return v.replace(/^https?:\/\//, '').split(/[\/:?#]/)[0] || null;
  }
};

const buildRemotePattern = ({ protocol, hostname, pathname, port }) => {
  const host = sanitizeHostname(hostname);
  if (!host) return null;
  const pattern = { protocol, hostname: host };
  if (typeof pathname === 'string') pattern.pathname = pathname;
  if (port) pattern.port = String(port);
  return pattern;
};

// Build remotePatterns defensively; filter out any null/invalid entries.
const remotePatterns = [
  // Production domains (take from env if set)
  buildRemotePattern({ protocol: 'https', hostname: process.env.PRODUCTION_DOMAIN_1, pathname: '/images/**' }),
  buildRemotePattern({ protocol: 'https', hostname: process.env.PRODUCTION_DOMAIN_2, pathname: '/images/**' }),

  // Staging domains
  buildRemotePattern({ protocol: 'https', hostname: process.env.STAGING_DOMAIN_1, pathname: '/images/**' }),
  buildRemotePattern({ protocol: 'https', hostname: process.env.STAGING_DOMAIN_2, pathname: '/images/**' }),

  // Local development domains (explicit localhost is safe)
  buildRemotePattern({ protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/images/**' }),

  // Local IP (optional - will be ignored if not provided or malformed)
  buildRemotePattern({ protocol: 'http', hostname: process.env.LOCAL_IP, port: '3000', pathname: '/images/**' }),
].filter(Boolean); // keep only valid patterns

const nextConfig = {
  // Enable React Strict Mode for better dev experience
  reactStrictMode: true,

  // Expose a few env defaults to the browser; still read from process.env when available.
  env: {
    NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE:
      process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE || 'WEB3_USER',
  },

  // Experimental opt-in - keep as you had it
  experimental: {
    optimizePackageImports: [
      '@reown/appkit',
      '@reown/appkit-adapter-wagmi',
      'wagmi',
      'viem',
      '@tanstack/react-query',
    ],
  },

  // Image config: use the defensively-built remotePatterns
  images: {
    // If there are no valid remote patterns, remotePatterns will be [] which is safe.
    remotePatterns,
    // Keep your explicit choice (do not disable optimizations unless you want to).
    unoptimized: false,
  },

  // Keep your rewrites (unchanged)
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/images/:path*',
          destination: '/images/:path*',
        },
      ],
    };
  },

  // Webpack customization - preserved from your original file.
  // --- IMPORTANT CHANGE: vendor cacheGroup now uses a function-based `test` to
  //     implement exclusion logic (Webpack 5-friendly).
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            web3: {
              test: /[\\/]node_modules[\\/](?:@reown|wagmi|viem|@tanstack[\\/]react-query)[\\/]/,
              name: 'web3-vendors',
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
            vendor: {
              // Changed: use a function test so we can include complex logic
              // (detect node_modules and explicitly exclude web3 packages).
              test: (module) => {
                try {
                  // Some module objects might not have a resource property
                  if (!module || !module.resource) return false;

                  const resource = String(module.resource);

                  // Quick check: must come from node_modules
                  if (resource.indexOf('node_modules') === -1) return false;

                  // Exclude the packages we want to keep in the `web3` cache group.
                  // Use a path-aware regex so we avoid accidental partial matches.
                  const web3Packages = /[\\/]node_modules[\\/](?:@reown|wagmi|viem|@tanstack[\\/]react-query)(?:[\\/]|$)/;
                  if (web3Packages.test(resource)) return false;

                  // If it reaches here — it's a node_modules module that is NOT one of the
                  // web3 packages => include it in the `vendors` chunk.
                  return true;
                } catch (e) {
                  // Be defensive: if anything goes wrong, do not match this cacheGroup.
                  return false;
                }
              },
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
              name: 'common',
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Optional: Bundle analyzer when ANALYZE=true in dev.
      if (dev && process.env.ANALYZE === 'true') {
        import('webpack-bundle-analyzer')
          .then(({ BundleAnalyzerPlugin }) => {
            config.plugins.push(
              new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: 8888,
                openAnalyzer: true,
                generateStatsFile: false,
                statsOptions: {
                  excludeModules: /node_modules/,
                },
              })
            );
            console.log('📊 Bundle Analyzer enabled at http://localhost:8888');
          })
          .catch(() => {
            console.log('ℹ️  webpack-bundle-analyzer not installed. Run: npm install --save-dev webpack-bundle-analyzer');
          });
      }


      if (dev) {
        config.stats = {
          chunks: true,
          modules: false,
          chunkModules: false,
          chunkOrigins: true,
        };
      }
    }

    return config;
  },

  productionBrowserSourceMaps: false,
  compress: true,
  distDir: '.next',
  poweredByHeader: false,
};

export default nextConfig;