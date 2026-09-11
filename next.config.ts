import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maroon-peafowl-103168.hostingersite.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/cotton-sarees",
        destination: "/collections/cotton-sarees",
      },
      {
        source: "/cotton-silk-sarees",
        destination: "/collections/cotton-silk-sarees",
      },
      {
        source: "/silk-sarees",
        destination: "/collections/silk-sarees",
      },
      {
        source: "/lenin-sarees",
        destination: "/collections/lenin-sarees",
      },
    ];
  },
};

export default nextConfig;
