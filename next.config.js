/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "res.cloudinary.com",
    ],
  },
};

const removeImports = require("next-remove-imports")();

module.exports = nextConfig;
module.exports = removeImports(nextConfig);
