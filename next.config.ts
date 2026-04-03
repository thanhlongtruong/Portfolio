import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    localPatterns: [
      { pathname: "/background/**" },
      { pathname: "/icons-database/**" },
      { pathname: "/icons-design/**" },
      { pathname: "/icons-framework/**" },
      { pathname: "/icons-language/**" },
      { pathname: "/icons-library/**" },
      { pathname: "/icons-social/**" },
      { pathname: "/icons-software/**" },
      { pathname: "/projects/**" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
