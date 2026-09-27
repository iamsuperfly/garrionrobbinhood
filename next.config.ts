import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.geckoterminal.com",
      },
    ],
  },
};

export default nextConfig;
