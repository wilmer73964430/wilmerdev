/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  transpilePackages: ['@acme/ui']
};
export default config;
