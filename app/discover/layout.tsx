import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Your Path — LearnedHub Explore",
  description:
    "Take a short, interactive assessment to discover which academic stream and career pathway best aligns with your strengths.",
  openGraph: {
    title: "Discover Your Path — LearnedHub Explore",
    description:
      "Take a short, interactive assessment to discover which academic stream and career pathway best aligns with your strengths.",
    url: "/discover",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Discover Your Path — LearnedHub Explore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Path — LearnedHub Explore",
    description:
      "Take a short, interactive assessment to discover which academic stream and career pathway best aligns with your strengths.",
    images: ["/og-image.png"],
  },
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
