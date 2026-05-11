import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js con Vercel (Serverless Functions habilitadas)
  // Elimina 'output: export' para usar API Routes y SSR
  trailingSlash: true,
  images: {
    // Vercel optimiza automáticamente las imágenes
    unoptimized: false,
  },
};

export default nextConfig;
