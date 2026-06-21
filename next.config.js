/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any external image domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
