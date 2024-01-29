// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // output: 'export',
//   trailingSlash: true,
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     unoptimized: true
//   },
//   optimizeFonts: false,
//   i18n: {
//     locales: ['en', 'ar'],
//     defaultLocale: 'en',
//   },
//   exportPathMap: async function(
//     defaultPathMap,
//     { dev, dir, outDir, distDir, buildId }
//   ) {
//     return {
//       '/specialist': { page: '/specialist' },
//       '/': { page: '/' },
//       '/p/hello-nextjs': { page: '/p/[id]' },
//       '/p/learn-nextjs': { page: '/p/[id]' },
//       '/p/deploy-nextjs': { page: '/p/[id]' },
//     }
//   },
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {

  },
  
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
  
    return {
      ...defaultPathMap,
      '/specialist/editform/123': { page: '/services/editform/[id]', query: { id: '123' } },
      '/services/edit-service/456': { page: '/services/edit-service/[id]', query: { id: '456' } },
    };
  },
}

module.exports = nextConfig;

