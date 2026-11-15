import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The résumé is served by /api/resume from a non-public directory, so the
  // file must be traced into the serverless function bundle.
  outputFileTracingIncludes: {
    "/api/resume": ["./private/**"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
