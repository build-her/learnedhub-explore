import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionTracker from "@/components/SessionTracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learnedhub-explore.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LearnedHub Explore — Discover Your Academic & Career Pathway",
    template: "%s — LearnedHub Explore",
  },
  description:
    "Interactive guidance platform helping secondary school students discover career streams, explore accredited university courses, and build verifiable portfolio dossiers.",
  applicationName: "LearnedHub Explore",
  authors: [{ name: "LearnedHub" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  openGraph: {
    title: "LearnedHub Explore — Discover Your Academic & Career Pathway",
    description:
      "Interactive guidance platform helping secondary school students discover career streams, explore accredited university courses, and build verifiable portfolio dossiers.",
    url: siteUrl,
    siteName: "LearnedHub Explore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LearnedHub Explore — Discover Your Academic & Career Pathway",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnedHub Explore — Discover Your Academic & Career Pathway",
    description:
      "Interactive guidance platform helping secondary school students discover career streams, explore accredited university courses, and build verifiable portfolio dossiers.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-base type-body text-main">
        <Suspense fallback={null}>
          <SessionTracker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}