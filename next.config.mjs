/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
  // This ensures that all pages use the Edge Runtime by default
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;