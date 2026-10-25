import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Codespaces serves the app through a *.app.github.dev / *.github.dev
  // forwarded domain, not 127.0.0.1 — Next blocks cross-origin dev
  // resources (hot reload, etc.) by default. This allowlists Codespaces'
  // forwarding domains plus localhost so hot reload actually works.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.app.github.dev",
    "*.github.dev",
  ],
  async redirects() {
    return [
      {
        source: "/courses",
        destination: "/build",
        permanent: false,
      },
      {
        source: "/learn",
        destination: "/build",
        permanent: false,
      },
      {
        source: "/coming-soon",
        destination: "/build",
        permanent: false,
      },
      {
        source: "/discover/quiz",
        destination: "/discover",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
