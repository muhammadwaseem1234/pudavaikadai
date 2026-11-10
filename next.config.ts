import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "deeppink-ibis-405628.hostingersite.com",
      },
      {
        protocol: "http",
        hostname: "deeppink-ibis-405628.hostingersite.com",
      },
      {
        protocol: "https",
        hostname: "**.hostingersite.com",
      },
      {
        protocol: "http",
        hostname: "**.hostingersite.com",
      },
      {
        protocol: "https",
        hostname: "maroon-peafowl-103168.hostingersite.com",
      },
      {
        protocol: "http",
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
        source: "/linen-sarees",
        destination: "/collections/linen-sarees",
      },
    ];
  },
};

export default nextConfig;
