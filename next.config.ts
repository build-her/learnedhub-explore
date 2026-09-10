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
};

export default nextConfig;