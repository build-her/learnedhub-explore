import type { Metadata } from "next";
import Link from "next/link";
import LearnerShell from "@/components/LearnerShell";

export const metadata: Metadata = {
  title: "Learner Shell Test — LearnedHub",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShellTestPage() {
  return (
    <LearnerShell>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[880px] w-full mx-auto flex flex-col gap-6">
        {/* Banner */}
        <div className="rounded-xl border border-discover-border bg-discover-tint p-4 sm:p-6 flex flex-col gap-2">
          <span className="type-caption font-semibold uppercase tracking-wider text-discover">
            Temporary Test Route (/shell-test)
          </span>
          <h1 className="type-h1 text-main">Learner Shell Layout</h1>
          <p className="type-body text-muted leading-relaxed">
            This page previews the reusable shell layout with a responsive left sidebar and main content area.
          </p>
        </div>

        {/* Verification Checklist Card */}
        <div className="rounded-xl border border-line bg-surface-base p-4 sm:p-6 shadow-xs flex flex-col gap-4">
          <h2 className="type-h2 text-main">What to Test</h2>

          <div className="flex flex-col gap-4">
            {/* Desktop Test */}
            <div className="flex flex-col gap-1 border-b border-line pb-4">
              <span className="type-body font-bold text-main">
                1. Desktop (screen width &ge; 768px)
              </span>
              <p className="type-body text-muted text-sm leading-relaxed">
                • Sidebar is open by default (`260px`).
                <br />
                • Click the collapse button (top right of sidebar header) to collapse it to icons only (`72px`).
                <br />
                • Click the toggle again to expand it back.
                <br />
                • Refresh the browser to verify that your open/collapsed preference is remembered via `localStorage`.
              </p>
            </div>

            {/* Mobile Test */}
            <div className="flex flex-col gap-1 border-b border-line pb-4">
              <span className="type-body font-bold text-main">
                2. Phone / Small Screens (&lt; 768px)
              </span>
              <p className="type-body text-muted text-sm leading-relaxed">
                • Sidebar is hidden. A slim top bar with a large menu button (44&times;44px minimum tap target) is visible.
                <br />
                • Tap the menu button to open the sidebar drawer overlay.
                <br />
                • Verify that tapping the <strong>Close (✕) button</strong>, the <strong>outside dark area</strong>, or any <strong>navigation link</strong> closes the drawer.
              </p>
            </div>

            {/* Navigation Items Test */}
            <div className="flex flex-col gap-1 border-b border-line pb-4">
              <span className="type-body font-bold text-main">
                3. Navigation Items &amp; Active Highlighting
              </span>
              <p className="type-body text-muted text-sm leading-relaxed">
                • <strong>Home</strong> &rarr; navigates to `/`
                <br />
                • <strong>Discover</strong> &rarr; navigates to `/discover`
                <br />
                • <strong>Explore</strong> &rarr; navigates to `/explore`
                <br />
                • <strong>Dossier</strong> &rarr; navigates to `/dossier`
                <br />
                • <strong>Build</strong> &rarr; plain text labelled &ldquo;Coming soon&rdquo; (not a link, disabled).
                <br />
                • When viewing a matching route, that item is highlighted with green accent (`bg-discover-tint text-discover` and left border).
              </p>
            </div>

            {/* Footer Session State Test */}
            <div className="flex flex-col gap-1">
              <span className="type-body font-bold text-main">
                4. Sidebar Footer Session State
              </span>
              <p className="type-body text-muted text-sm leading-relaxed">
                • If logged in via an active learner session, your preferred name and code badge appear in the footer alongside a &ldquo;Log out&rdquo; button (which is intentionally inactive for now).
                <br />
                • If logged out or unauthenticated, a &ldquo;Get started&rdquo; link pointing to `/entry` is rendered instead.
              </p>
            </div>
          </div>
        </div>

        {/* Content Scrolling Placeholder Card */}
        <div className="rounded-xl border border-line bg-surface-base p-4 sm:p-6 shadow-xs flex flex-col gap-3">
          <h2 className="type-h2 text-main">Sample Content Area</h2>
          <p className="type-body text-muted">
            The main content area expands to fill the remaining screen width with responsive padding and independent scrolling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="p-4 rounded-lg bg-surface-tint border border-line">
              <span className="type-caption font-bold text-discover uppercase">Sample Card 1</span>
              <p className="type-body text-sm text-muted mt-1">
                Verified responsive layout on mobile, tablet, and desktop viewports.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-surface-tint border border-line">
              <span className="type-caption font-bold text-explore uppercase">Sample Card 2</span>
              <p className="type-body text-sm text-muted mt-1">
                Optimized tap targets (&ge; 44px) for low-end Android touch screens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LearnerShell>
  );
}

