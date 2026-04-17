/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ando/auth', '@ando/config', '@ando/db', '@ando/ui'],
  experimental: {
    externalDir: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
