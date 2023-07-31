/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,

  i18n
  // images: {
  // 	loader: "akamai",
  // 	path:
  // 		process.env.NODE_ENV === "production"
  // 			? "https://admash-admin.envytheme.com/"
  // 			: "http://localhost:3000",
  // },
  // reactStrictMode: false,
  // webpack: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  //   return config;
  // },
};

module.exports = nextConfig;
