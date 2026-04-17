import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ando/auth', '@ando/config', '@ando/db', '@ando/ui'],
  experimental: {
    externalDir: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
