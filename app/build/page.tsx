import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | LearnedHub",
  description: "Full courses and skill challenges are coming soon.",
};

export default function ComingSoonPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-surface-tint min-h-screen px-lg py-xl">
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

        <Link
          href="/"
          className="type-body font-bold text-surface-base bg-brand-primary rounded-md py-sm px-xl hover:opacity-90 transition-opacity"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
