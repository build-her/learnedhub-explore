import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "LearnedHub Explore — Stop Guessing Your Career Path",
  description:
    "Interactive career guidance and university pathway exploration for secondary school students in Nigeria.",
  openGraph: {
    title: "LearnedHub Explore — Stop Guessing Your Career Path",
    description:
      "Interactive career guidance and university pathway exploration for secondary school students in Nigeria.",
    url: "/",
    siteName: "LearnedHub Explore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LearnedHub Explore — Discover Your Career Path",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnedHub Explore — Stop Guessing Your Career Path",
    description:
      "Interactive career guidance and university pathway exploration for secondary school students in Nigeria.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return <HomePageContent />;
}