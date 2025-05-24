/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://auto-vibe-neon.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
