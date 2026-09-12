"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSES } from "@/lib/courses";

type PathwayKey = "discover" | "explore" | "build";

type Pathway = {
  key: PathwayKey;
  label: string;
  emoji: string;
  tagline: string;
  desc: string;
  cta: string;
  href: string;
  colorClass: string;
  tintClass: string;
  borderClass: string;
};

const PATHWAYS: Pathway[] = [
  {
    key: "discover",
    label: "Discover",
    emoji: "🧭",
    tagline: "Curious · Exploratory · Personal",
    desc: "A short, interactive quiz that shows you which stream or field actually fits you — not just describes it. One sitting, nothing to sign up for.",
    cta: "Start Discover",
    href: "/entry?next=discover",
    colorClass: "text-discover",
    tintClass: "bg-discover-tint",
    borderClass: "border-discover-border",
  },
  {
    key: "explore",
    label: "Explore",
    emoji: "🔍",
    tagline: "Investigative · Informative · Possibility-driven",
    desc: "Look into real courses, see real admissions data, understand what each field actually leads to — and what AI changes, and what it doesn't.",
    cta: "Start Explore",
    href: "/entry?next=explore",
    colorClass: "text-explore",
    tintClass: "bg-explore-tint",
    borderClass: "border-explore-border",
  },
  {
    key: "build",
    label: "Build",
    emoji: "⚡",
    tagline: "Active · Challenging · Energetic",
    desc: "Try a real skill challenge in 30 minutes. Walk away with something to show for it — a timestamped Skills Record with an evidence note.",
    cta: "Start Build",
    href: "/entry?next=build",
    colorClass: "text-build",
    tintClass: "bg-build-tint",
    borderClass: "border-build-border",
  },
];

const pathwayBg: Record<PathwayKey, string> = {
  discover: "bg-discover",
  explore: "bg-explore",
  build: "bg-build",
};

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PATHWAYS[activeIdx];
  const previewCourses = COURSES.slice(0, 2);

  return (
    <div className="flex flex-col bg-surface-tint min-h-full">
      <div className="flex items-center justify-between px-md py-sm bg-surface-tint border-b border-line sticky top-0 z-20">
        <span className="type-h2 text-discover">LearnedHub</span>
        <Link
          href="/entry"
          className="type-caption bg-discover text-surface-base px-md py-xs rounded-full font-semibold"
        >
          Get started
        </Link>
      </div>

      <div className="bg-discover px-lg pt-xl pb-lg text-surface-base">
        <div className="type-caption uppercase tracking-widest text-surface-base/70 mb-md">
          For secondary students in Nigeria
        </div>
        <h1 className="type-display-lg mb-sm">
          Stop guessing
          <br />
          what to study.
        </h1>
        <p className="type-body text-surface-base/90 max-w-[320px]">
          Find the direction that fits you, see where exactly it can lead
          to, and build small solid proofs of what you can do.
        </p>
        <div className="mt-lg flex items-center gap-sm">
          <Link
            href="/entry"
            className="type-body font-bold bg-surface-base text-discover px-lg py-sm rounded-full shadow-md"
          >
            Start with Discover →
          </Link>
        </div>
        <p className="type-caption text-surface-base/60 mt-sm">
          No sign-up needed · Takes one sitting
        </p>
      </div>

      <div className="pt-lg pb-sm">
        <div className="px-lg mb-md">
          <div className="type-caption text-muted uppercase tracking-wider mb-xs">
            Start anywhere
          </div>
          <div className="type-body text-main font-medium">
            Three independent ways in. Pick any one.
          </div>
        </div>

        <div className="flex px-lg gap-xs mb-md">
          {PATHWAYS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`flex-1 py-sm type-caption font-semibold rounded-md transition-colors ${
                activeIdx === i
                  ? `${pathwayBg[p.key]} text-surface-base`
                  : "bg-transparent text-muted border-b-2 border-line"
              }`}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        <div className="px-lg">
          <div
            className={`rounded-lg overflow-hidden border ${active.tintClass} ${active.borderClass}`}
          >
            <div className="px-md pt-md pb-sm">
              <span
                className={`type-caption font-bold uppercase tracking-widest ${active.colorClass}`}
              >
                {active.emoji} {active.label}
              </span>
              <div className="type-caption text-muted mt-xs">{active.tagline}</div>
            </div>

            <div className="mx-md mb-sm rounded-md p-md bg-surface-base/70 border border-line min-h-[120px] flex flex-col justify-center gap-xs">
              {active.key === "discover" && (
                <>
                  <span className="type-caption text-muted uppercase tracking-wider">
                    Sample question
                  </span>
                  <p className="type-body text-main font-medium">
                    &quot;Which of these sounds most like something you&apos;d
                    enjoy?&quot;
                  </p>
                  <div className="flex flex-wrap gap-xs mt-xs">
                    <span className="type-caption bg-discover-tint text-discover border border-discover-border rounded-full px-sm py-xs">
                      Fixing something broken
                    </span>
                    <span className="type-caption bg-discover-tint text-discover border border-discover-border rounded-full px-sm py-xs">
                      Explaining an idea well
                    </span>
                  </div>
                </>
              )}

              {active.key === "explore" && (
                <>
                  <span className="type-caption text-muted uppercase tracking-wider">
                    From the course list
                  </span>
                  {previewCourses.map((course) => (
                    <div key={course.id} className="flex flex-col">
                      <span className="type-body text-main font-medium">
                        {course.name}
                      </span>
                      <span className="type-caption text-muted">
                        {course.faculty}
                      </span>
                    </div>
                  ))}
                </>
              )}

              {active.key === "build" && (
                <p className="type-caption text-muted italic">
                  Build challenges are launching soon — real skill
                  challenges, not previews.
                </p>
              )}
            </div>

            <div className="px-md pb-md">
              <p className="type-caption text-muted mb-sm">{active.desc}</p>
              <Link
                href={active.href}
                className={`block w-full text-center py-sm rounded-md type-body font-bold text-surface-base ${pathwayBg[active.key]}`}
              >
                {active.cta} →
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-xs mt-sm pb-xs">
          {PATHWAYS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`Show ${p.label}`}
              className={`rounded-full transition-all ${pathwayBg[p.key]}`}
              style={{
                width: activeIdx === i ? "24px" : "6px",
                height: "6px",
                opacity: activeIdx === i ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-md my-lg rounded-lg bg-surface-base border border-line p-lg">
        <div className="type-caption text-muted uppercase tracking-wider font-semibold mb-sm">
          Why we built this for you
        </div>
        <p className="type-body text-main">
          LearnedHub exists because a lot of students end up choosing a
          stream or course without really knowing what it leads to, or
          what they&apos;re actually good at.
        </p>
        <p className="type-body text-main mt-sm">
          So we built a way for students to explore real directions, see
          exactly where each one can take them, and start proving their
          own skills early — before they have to make a big decision.
        </p>
      </div>

      <div className="mx-md mb-md rounded-lg overflow-hidden border border-discover-border bg-discover-tint">
        <div className="px-lg pt-lg pb-md">
          <div className="type-caption font-bold uppercase tracking-wider text-discover mb-sm">
            For Schools
          </div>
          <h3 className="type-h2 text-main mb-sm">
            LearnedHub gives every student in your school a structured way
            to explore real pathways, real courses, and real skills —
            without adding extra work for your team.
          </h3>
          <p className="type-caption text-muted mb-md">
            It fits right alongside the career guidance you&apos;re already
            doing.
          </p>
          <button className="w-full border-2 border-discover text-discover type-body font-bold py-sm rounded-md bg-surface-base">
            Talk to us about your school
          </button>
        </div>
      </div>

      <div className="mx-md mb-md rounded-lg overflow-hidden border border-explore-border bg-surface-base">
        <div className="px-lg pt-lg pb-md">
          <div className="type-caption font-bold uppercase tracking-wider text-explore mb-sm">
            For Parents
          </div>
          <h3 className="type-h2 text-main mb-xs">
            Your child is probably already asking an AI chatbot what to
            study.
          </h3>
          <p className="type-body text-main font-medium mb-sm">
            Give them something better.
          </p>
          <p className="type-caption text-muted mb-md">
            LearnedHub helps your child explore real directions, look into
            real courses and careers, and build small solid proof of their
            growing skills. Built for future-relevant pathways, not
            generic advice.
          </p>
          <button className="w-full bg-explore text-surface-base type-body font-bold py-sm rounded-md">
            Unlock full access for your child
          </button>
        </div>
      </div>

      <div className="mx-md mb-lg rounded-lg overflow-hidden border border-build-border bg-build-tint">
        <div className="px-lg pt-lg pb-md">
          <div className="type-caption font-bold uppercase tracking-wider text-build mb-sm">
            Sponsored Access
          </div>
          <h3 className="type-h2 text-main mb-sm">
            Help more students get a clear direction.
          </h3>
          <p className="type-caption text-muted mb-md">
            Not every student has a school or family that can bring
            LearnedHub to them directly. We&apos;re building routes for
            foundations, CSR teams, NGOs and public programmes to change
            that.
          </p>
          <button className="w-full border-2 border-build text-build type-body font-bold py-sm rounded-md bg-surface-base">
            Talk to us about sponsored access
          </button>
        </div>
      </div>

      <div className="bg-discover px-lg py-xxl text-center text-surface-base">
        <h2 className="type-h1 mb-sm">
          Your career choice deserves more than a guess.
        </h2>
        <p className="type-body text-surface-base/85 mb-lg">
          Find your path, explore it and see where it can lead.
        </p>
        <Link
          href="/entry"
          className="inline-block type-body font-bold bg-surface-base text-discover px-xl py-md rounded-full shadow-md"
        >
          Start with Discover →
        </Link>
      </div>

      <div className="bg-dossier px-lg py-lg">
        <div className="type-h2 text-surface-base/90 mb-md">LearnedHub</div>
        <div className="flex flex-wrap gap-x-md gap-y-xs mb-md">
          {[
            "Discover",
            "Explore",
            "Build",
            "Schools",
            "Parents",
            "Partners",
            "About",
            "Contact",
          ].map((label) => (
            <span key={label} className="type-caption text-surface-base/60">
              {label}
            </span>
          ))}
        </div>
        <div className="type-caption text-surface-base/40">
          © 2026 LearnedHub
        </div>
      </div>
    </div>
  );
}