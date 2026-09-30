import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Degree Programs & Courses — LearnedHub Explore",
  description:
    "Browse 120+ Nigerian university courses with verified JAMB requirements, WAEC subject combinations, and future career directions.",
  openGraph: {
    title: "Explore Degree Programs & Courses — LearnedHub Explore",
    description:
      "Browse 120+ Nigerian university courses with verified JAMB requirements, WAEC subject combinations, and future career directions.",
    url: "/explore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Explore Degree Programs — LearnedHub Explore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Degree Programs & Courses — LearnedHub Explore",
    description:
      "Browse 120+ Nigerian university courses with verified JAMB requirements, WAEC subject combinations, and future career directions.",
    images: ["/og-image.png"],
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
