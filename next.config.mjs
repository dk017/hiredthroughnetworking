/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // ... other experimental configurations
    appDir: true, // Enable App Router if using
  },
};

if (process.env.CLOUDFLARE_PAGES) {
  // Cloudflare Pages specific configuration
  nextConfig.experimental = {
    ...nextConfig.experimental,
    isrMemoryCacheSize: 0,
    serverComponentsExternalPackages: ['@prisma/client'],
  };
}

// Add this configuration for the /_error page
nextConfig.experimental.pageConfig = {
  './pages/_error.js': {
    runtime: 'experimental-edge',
  },
};

export default nextConfig;