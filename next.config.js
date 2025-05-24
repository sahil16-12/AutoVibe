/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable CORS headers for all API routes
  async headers() {
    return [
      {
        // Apply these headers to all API endpoints
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
