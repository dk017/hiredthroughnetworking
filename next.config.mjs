/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

if (process.env.CLOUDFLARE_PAGES) {
  // Cloudflare Pages specific configuration
  nextConfig.experimental = {
    isrMemoryCacheSize: 0,
    serverComponentsExternalPackages: ['@prisma/client'],
  };
}

export default nextConfig;