import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Portfolio Dossier — LearnedHub Explore",
  description:
    "View your verified portfolio dossier of educational artifacts, field action plans, and course exploration summaries.",
  openGraph: {
    title: "Your Portfolio Dossier — LearnedHub Explore",
    description:
      "View your verified portfolio dossier of educational artifacts, field action plans, and course exploration summaries.",
    url: "/dossier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Portfolio Dossier — LearnedHub Explore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Portfolio Dossier — LearnedHub Explore",
    description:
      "View your verified portfolio dossier of educational artifacts, field action plans, and course exploration summaries.",
    images: ["/og-image.png"],
  },
};

export default function DossierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
