import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://learnedhub-explore.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dossier",
        "/dossier/*",
        "/entry",
        "/entry/*",
        "/api/*",
        "/admin/*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
