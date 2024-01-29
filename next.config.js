/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/specialist": { page: "/specialist" },
      "/": { page: "/" },
      "/p/hello-nextjs": { page: "/p/[id]" },
      "/p/learn-nextjs": { page: "/p/[id]" },
      "/p/deploy-nextjs": { page: "/p/[id]" },
    };
  },
};

module.exports = nextConfig;
