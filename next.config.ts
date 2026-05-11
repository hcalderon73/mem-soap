import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proyecto ubicado en subcarpeta mem-jabones
  distDir: 'mem-jabones/.next',
  trailingSlash: true,
  images: {
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
