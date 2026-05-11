import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js con Vercel (Serverless Functions habilitadas)
  trailingSlash: true,
  images: {
    // Vercel optimiza automáticamente las imágenes
    unoptimized: false,
  },
  // Ignorar errores de ESLint durante el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorar errores de TypeScript durante el build (opcional, si hay problemas)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
