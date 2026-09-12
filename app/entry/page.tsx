import Link from "next/link";

type SearchParams = Promise<{
  school?: string | string[];
  name?: string | string[];
  next?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

type PathwayKey = "discover" | "explore" | "build";

const PATHWAY_CTA: Record<PathwayKey, { href: string; label: string; bgClass: string }> = {
  discover: { href: "/discover", label: "Start with Discover", bgClass: "bg-discover" },
  explore: { href: "/explore", label: "Start with Explore", bgClass: "bg-explore" },
  build: { href: "/build", label: "Start with Build", bgClass: "bg-build" },
};

type PathwayInfo = {
  headline: string;
  subtext: string;
  todayDesc: string;
  todayTime: string;
  colorClass: string;
};

const PATHWAY_INFO: Record<PathwayKey, PathwayInfo> = {
  discover: {
    headline: "Figure out your path.",
    subtext:
      "No pressure — just a real answer about which stream actually fits you, in one sitting.",
    todayDesc: "Find your stream — a short quiz, then a real breakdown of what it means",
    todayTime: "~10 minutes",
    colorClass: "text-discover",
  },
  explore: {
    headline: "See where it actually leads.",
    subtext:
      "Search real courses, see real admissions requirements, and understand what each one leads to.",
    todayDesc: "Search real courses, filter by faculty, and see full admissions profiles",
    todayTime: "~15 minutes",
    colorClass: "text-explore",
  },
  build: {
    headline: "Prove what you can do.",
    subtext:
      "Try a real skill challenge and walk away with something to show for it.",
    todayDesc: "Try a real skill challenge and get a timestamped Skills Record",
    todayTime: "30 minutes",
    colorClass: "text-build",
  },
};

type OtherPathway = { key: PathwayKey; label: string; desc: string; colorClass: string };

const OTHER_PATHWAYS: Record<PathwayKey, OtherPathway[]> = {
  discover: [
    { key: "explore", label: "Explore", desc: "See which courses actually fit your stream", colorClass: "text-explore" },
    { key: "build", label: "Build", desc: "Try a real skill challenge", colorClass: "text-build" },
  ],
  explore: [
    { key: "discover", label: "Discover", desc: "Not sure of your stream yet? Start here", colorClass: "text-discover" },
    { key: "build", label: "Build", desc: "Try a real skill challenge", colorClass: "text-build" },
  ],
  build: [
    { key: "discover", label: "Discover", desc: "Not sure of your stream yet? Start here", colorClass: "text-discover" },
    { key: "explore", label: "Explore", desc: "See which courses actually fit your stream", colorClass: "text-explore" },
  ],
};

function resolvePathway(value: string | undefined): PathwayKey {
  if (value === "discover" || value === "explore" || value === "build") return value;
  return "discover";
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const schoolCode = firstValue(params.school);
  const schoolName = firstValue(params.name);
  const pathway = resolvePathway(firstValue(params.next));
  const cta = PATHWAY_CTA[pathway];
  const info = PATHWAY_INFO[pathway];
  const others = OTHER_PATHWAYS[pathway];

  return (
    <main className="flex flex-1 flex-col items-center px-lg py-xxl">
      <div className="flex w-full max-w-[448px] flex-col gap-xl">
        {schoolCode && (
          <div className="flex flex-col gap-xs rounded-md bg-surface-tint px-md py-sm">
            <span className="type-caption text-muted">Shared by your school</span>
            <span className="type-body text-main">
              {schoolName ? schoolName : `School code: ${schoolCode}`}
              {schoolName && schoolCode ? ` · ${schoolCode}` : null}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-sm">
          <h1 className="type-display-lg text-main">{info.headline}</h1>
          <p className="type-body text-muted">{info.subtext}</p>
        </div>

        <div className="flex flex-col gap-md">
          <h2 className="type-h2 text-main">Today</h2>

          <div className={`flex items-start gap-sm rounded-md bg-surface-tint p-md border-l-4 ${info.colorClass.replace("text-", "border-")}`}>
            <div className="flex flex-col">
              <span className="type-body text-main">
                <strong className={info.colorClass}>
                  {pathway.charAt(0).toUpperCase() + pathway.slice(1)}
                </strong>{" "}
                — {info.todayDesc}
              </span>
              <span className="type-caption text-muted">{info.todayTime}</span>
            </div>
          </div>

          <h2 className="type-h2 text-main mt-sm">Also part of your LearnedHub journey</h2>
          <ul className="flex flex-col gap-sm">
            {others.map((other) => (
              <li key={other.key} className="flex items-start gap-sm rounded-md bg-surface-tint p-md opacity-70">
                <div className="flex flex-col">
                  <span className="type-body text-main">
                    <strong className={other.colorClass}>{other.label}</strong> — {other.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {pathway === "discover" ? (
          <div className="rounded-md border border-discover-border bg-discover-tint p-lg flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider">
              LearnedHub — Field Action Plan
            </span>
            <span className="type-body text-main font-semibold">Sample result: &quot;Science&quot;</span>
            <p className="type-caption text-muted">
              This is what you walk away with — a shareable one-pager
              showing your matched stream, ready to save or send to a
              parent.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-xs rounded-md border border-dashed border-[var(--text-muted)] p-xl">
            <span className="type-caption text-muted">
              [ Sample {pathway === "explore" ? "Field Defense Summary" : "Skills Record"} preview — pending real content ]
            </span>
          </div>
        )}

        <Link
          href={cta.href}
          className={`type-body text-surface-base rounded-md px-lg py-sm text-center ${cta.bgClass}`}
        >
          {cta.label}
        </Link>
      </div>
    </main>
  );
}