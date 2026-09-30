import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — LearnedHub Explore",
  description:
    "Read the terms of service and usage conditions for the LearnedHub Explore career path and degree planning platform.",
  openGraph: {
    title: "Terms of Service — LearnedHub Explore",
    description:
      "Read the terms of service and usage conditions for the LearnedHub Explore career path and degree planning platform.",
    url: "/terms",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LearnedHub Explore Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — LearnedHub Explore",
    description:
      "Read the terms of service and usage conditions for the LearnedHub Explore career path and degree planning platform.",
    images: ["/og-image.png"],
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-tint">
      {/* Top Navigation */}
      <header className="border-b border-line bg-surface-base px-lg py-md">
        <div className="max-w-[760px] w-full mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="type-h2 text-discover font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            LearnedHub
          </Link>
          <div className="flex items-center gap-md">
            <Link
              href="/privacy"
              className="type-caption text-muted hover:text-main transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/discover"
              className="type-caption font-bold text-discover hover:underline"
            >
              Start Discover →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 px-lg py-xl">
        <article className="max-w-[760px] w-full mx-auto flex flex-col gap-lg">
          {/* Header Card */}
          <div className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-sm">
            <div className="flex flex-wrap items-center justify-between gap-xs">
              <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-explore-tint text-explore border border-explore-border">
                Platform Terms &amp; Guidelines
              </span>
              <span className="type-caption text-muted">
                Last updated: September 28, 2026
              </span>
            </div>

            <h1 className="type-display-lg text-main">Terms of Service</h1>

            <p className="type-body text-muted leading-relaxed">
              Welcome to LearnedHub. These terms explain the rules and guidelines for using our platform. We have written them in plain, student-readable English so you clearly understand what LearnedHub offers and what your responsibilities are.
            </p>

            {/* Draft Notice Banner */}
            <div className="mt-sm rounded-lg border border-amber-300 bg-amber-50 p-md flex items-start gap-sm">
              <span className="text-amber-800 text-lg leading-none select-none">⚠️</span>
              <div className="flex flex-col gap-xs">
                <span className="type-caption font-bold text-amber-900 uppercase tracking-wide">
                  Draft — Pending Legal Review
                </span>
                <p className="type-caption text-amber-800 leading-normal">
                  These terms outline our platform usage policies in clear language. They are currently a working draft pending formal legal review.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Basic Use of the Platform */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">1. Basic Use of the Platform</h2>
            <p className="type-body text-muted leading-relaxed">
              LearnedHub provides career exploration tools, course profiles, subject guides, and self-reflection exercises designed for secondary school students, school leavers, parents, and educators.
            </p>
            <ul className="list-disc pl-lg flex flex-col gap-xs type-body text-muted">
              <li>
                <strong className="text-main">Personal educational use:</strong> You are welcome to take the Discover assessment, explore degree profiles, complete Field Defenses, and generate your personal Dossier for educational and career planning purposes.
              </li>
              <li>
                <strong className="text-main">Your LearnedHub Code:</strong> When you start, you receive a unique code. You are responsible for keeping track of your code if you want to resume your progress or share your portfolio with family, teachers, or counselors.
              </li>
              <li>
                <strong className="text-main">Respectful platform behavior:</strong> Please do not attempt to disrupt or tamper with our website, access databases without permission, reverse-engineer proprietary code, or submit abusive, offensive, or harmful material through any form or field.
              </li>
            </ul>
          </section>

          {/* Section 2: Content Is for Guidance Only */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">2. Content Is for Guidance Only</h2>
            <p className="type-body text-muted leading-relaxed">
              All information published on LearnedHub—including course overviews, JAMB subject combinations, WAEC/O-level requirements, UTME cutoffs, degree durations, and career pathways—is compiled for general guidance, orientation, and informational exploration.
            </p>
            <div className="rounded-lg bg-surface-tint border border-line p-md">
              <p className="type-body text-main leading-relaxed">
                While we continuously verify and update our database against institutional announcements, admission policies and academic requirements may change from year to year. LearnedHub content is an educational planning aid, not an official academic regulation or certified transcript.
              </p>
              <p className="type-caption text-muted mt-xs">
                Students and parents should always cross-reference official university prospectuses, institutional portals, and formal regulatory brochures (such as the official JAMB brochure) before making irreversible application decisions.
              </p>
            </div>
          </section>

          {/* Section 3: No Guarantees of Admission Outcomes */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">3. No Guarantees of Admission Outcomes</h2>
            <div className="rounded-lg border border-line bg-surface-tint p-md flex flex-col gap-xs">
              <span className="type-caption font-bold text-main uppercase tracking-wider">
                Important Notice
              </span>
              <p className="type-body font-medium text-main leading-relaxed">
                LearnedHub is not an admission board, degree-granting institution, or university admissions office. We do not process university applications, allocate seats, or grant admission.
              </p>
            </div>
            <ul className="list-disc pl-lg flex flex-col gap-xs type-body text-muted">
              <li>
                Using LearnedHub, achieving high scores on the Discover assessment, completing a Field Defense, or generating a Field Action Plan <strong>does not guarantee admission</strong> to any university, polytechnic, college, faculty, or course.
              </li>
              <li>
                Final admission offers, cutoff scores, catchment quotas, and subject equivalencies are decided exclusively by individual institutions and official examination authorities (such as JAMB, WAEC, NECO, and university senates).
              </li>
              <li>
                LearnedHub accepts no liability for decisions made by admissions boards or outcomes related to your school applications.
              </li>
            </ul>
          </section>

          {/* Section 4: Intellectual Property & Your Reflections */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">4. Your Work and Our Platform</h2>
            <p className="type-body text-muted leading-relaxed">
              When you write reflections or defense answers on LearnedHub, your personal words and ideas belong to you. We do not claim ownership of your thoughts.
            </p>
            <p className="type-body text-muted leading-relaxed">
              The LearnedHub platform, brand, logos, design system, curated course database, and assessment methodologies are owned by LearnedHub and protected by intellectual property laws. You may not scrape, copy, or redistribute platform content for commercial purposes without prior written authorization.
            </p>
          </section>

          {/* Section 5: Changes to Terms & Contact */}
          <section className="rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm flex flex-col gap-md">
            <h2 className="type-h2 text-main">5. Changes and Questions</h2>
            <p className="type-body text-muted leading-relaxed">
              As we add new learning modules, pathway tools, and features, we may update these terms. When changes occur, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
            </p>
            <p className="type-body text-muted leading-relaxed">
              If you have any questions about these terms or platform guidelines, please reach out to us at{" "}
              <a
                href="mailto:info.learnedhub@gmail.com"
                className="font-bold text-discover hover:underline"
              >
                info.learnedhub@gmail.com
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
