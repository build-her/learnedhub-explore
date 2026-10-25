import Link from "next/link";
import type { Metadata } from "next";
import LearnerShell from "@/components/LearnerShell";

export const metadata: Metadata = {
  title: "Coming Soon | LearnedHub",
  description: "Full courses and skill challenges are coming soon.",
};

export default function ComingSoonPage() {
  return (
    <LearnerShell>
      <main className="flex flex-1 flex-col items-center justify-center bg-surface-tint min-h-screen px-lg py-xl">
        <div className="w-full max-w-[480px] mb-md text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-1 type-caption text-muted hover:text-main font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="flex flex-col items-center gap-lg max-w-[480px] w-full bg-surface-base border border-line rounded-xl p-xl shadow-sm text-center">
          <div className="flex flex-col gap-xs">
            <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-explore-tint text-explore border border-explore-border mx-auto inline-block">
              Coming Soon
            </span>
            <h1 className="type-h1 text-main mt-xs">Coming Soon</h1>
            <p className="type-body text-muted leading-relaxed">
              Full courses and skill challenges are coming soon.
            </p>
          </div>

          <div className="flex flex-col gap-sm w-full pt-md border-t border-line">
            <span className="type-caption text-muted font-medium">Explore active pathways:</span>
            <div className="flex flex-col sm:flex-row gap-xs w-full">
              <Link
                href="/discover"
                className="flex-1 py-sm px-md rounded-md bg-discover text-surface-base font-bold type-caption text-center hover:opacity-90 transition-opacity"
              >
                Start Discover →
              </Link>
              <Link
                href="/explore"
                className="flex-1 py-sm px-md rounded-md bg-explore text-surface-base font-bold type-caption text-center hover:opacity-90 transition-opacity"
              >
                Explore Courses →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LearnerShell>
  );
}
