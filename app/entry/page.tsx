import Link from "next/link";
import LearnerEntryFlow from "@/components/LearnerEntryFlow";

type SearchParams = Promise<{
  school?: string | string[];
  name?: string | string[];
  next?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

type PathwayKey = "discover" | "explore" | "build";

interface DestinationInfo {
  href: string;
  pathway: PathwayKey;
  label: string;
  bgClass: string;
  headline: string;
  subtext: string;
  todayDesc: string;
  todayTime: string;
  colorClass: string;
}

function resolveDestination(rawNext: string | undefined): DestinationInfo {
  if (!rawNext) {
    return {
      href: "/discover",
      pathway: "discover",
      label: "Start with Discover",
      bgClass: "bg-discover",
      headline: "Figure out your path.",
      subtext: "No pressure — just a real answer about which stream actually fits you, in one sitting.",
      todayDesc: "Find your stream — a short quiz, then a real breakdown of what it means",
      todayTime: "~10 minutes",
      colorClass: "text-discover",
    };
  }

  const decodedNext = decodeURIComponent(rawNext);

  // Check Explore paths
  if (decodedNext === "explore" || decodedNext.startsWith("/explore")) {
    const targetHref =
      decodedNext === "explore" || decodedNext === "/explore"
        ? "/explore/courses"
        : decodedNext;

    return {
      href: targetHref,
      pathway: "explore",
      label: "Continue to Explore",
      bgClass: "bg-explore",
      headline: "See where it actually leads.",
      subtext: "Search real courses, see real admissions requirements, and understand what each one leads to.",
      todayDesc: "Search real courses, filter by faculty, and see full admissions profiles",
      todayTime: "~15 minutes",
      colorClass: "text-explore",
    };
  }

  // Check Build paths
  if (decodedNext === "build" || decodedNext.startsWith("/build") || decodedNext.startsWith("/courses")) {
    return {
      href: "/build",
      pathway: "build",
      label: "Continue to Build",
      bgClass: "bg-build",
      headline: "Prove what you can do.",
      subtext: "Try a real skill challenge and walk away with something to show for it.",
      todayDesc: "Try a real skill challenge and get a timestamped Skills Record",
      todayTime: "30 minutes",
      colorClass: "text-build",
    };
  }

  // Check Dossier paths
  if (decodedNext.startsWith("/dossier")) {
    return {
      href: decodedNext,
      pathway: "discover",
      label: "Go to your Dossier",
      bgClass: "bg-discover",
      headline: "Welcome to your Dossier.",
      subtext: "Enter your details or resume code to view your verified educational artifacts.",
      todayDesc: "Access your saved Field Action Plans, Field Defenses, and verified records",
      todayTime: "Instant access",
      colorClass: "text-discover",
    };
  }

  // Check Discover paths
  if (decodedNext === "discover" || decodedNext.startsWith("/discover")) {
    const targetHref =
      decodedNext === "discover" || decodedNext === "/discover"
        ? "/discover"
        : decodedNext;

    return {
      href: targetHref,
      pathway: "discover",
      label: "Start with Discover",
      bgClass: "bg-discover",
      headline: "Figure out your path.",
      subtext: "No pressure — just a real answer about which stream actually fits you, in one sitting.",
      todayDesc: "Find your stream — a short quiz, then a real breakdown of what it means",
      todayTime: "~10 minutes",
      colorClass: "text-discover",
    };
  }

  // Any other path
  const targetHref = decodedNext.startsWith("/") ? decodedNext : `/${decodedNext}`;
  return {
    href: targetHref,
    pathway: "discover",
    label: "Continue to destination",
    bgClass: "bg-discover",
    headline: "Welcome to LearnedHub.",
    subtext: "Enter your name to begin or resume with your code.",
    todayDesc: "Explore real pathways and build verified proof of what you can do",
    todayTime: "~10 minutes",
    colorClass: "text-discover",
  };
}

const OTHER_PATHWAYS: Record<PathwayKey, { key: PathwayKey; label: string; desc: string; href: string; colorClass: string }[]> = {
  discover: [
    { key: "explore", label: "Explore", desc: "See which courses actually fit your stream", href: "/explore", colorClass: "text-explore" },
    { key: "build", label: "Build", desc: "Try a real skill challenge", href: "/build", colorClass: "text-build" },
  ],
  explore: [
    { key: "discover", label: "Discover", desc: "Not sure of your stream yet? Start here", href: "/discover", colorClass: "text-discover" },
    { key: "build", label: "Build", desc: "Try a real skill challenge", href: "/build", colorClass: "text-build" },
  ],
  build: [
    { key: "discover", label: "Discover", desc: "Not sure of your stream yet? Start here", href: "/discover", colorClass: "text-discover" },
    { key: "explore", label: "Explore", desc: "See which courses actually fit your stream", href: "/explore", colorClass: "text-explore" },
  ],
};

export default async function EntryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const schoolCode = firstValue(params.school);
  const schoolName = firstValue(params.name);
  const rawNext = firstValue(params.next);

  const destination = resolveDestination(rawNext);
  const others = OTHER_PATHWAYS[destination.pathway];

  return (
    <main className="flex flex-1 flex-col items-center px-lg py-xxl bg-surface-tint min-h-screen">
      <div className="flex w-full max-w-[448px] flex-col gap-xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-sm border-b border-line">
          <Link href="/" className="type-caption text-muted hover:text-main">
            ← Home
          </Link>
          <div className="flex items-center gap-md">
            <Link href="/dossier/sample" className="type-caption text-main hover:underline">
              Sample Dossier
            </Link>
          </div>
        </div>

        {/* Header with Pathway Badge */}
        <div className="flex flex-col gap-sm">
          <span
            className={`type-caption font-semibold px-sm py-0.5 rounded-full border w-fit ${
              destination.pathway === "explore"
                ? "bg-explore-tint text-explore border-explore-border"
                : destination.pathway === "build"
                ? "bg-build-tint text-build border-build-border"
                : "bg-discover-tint text-discover border-discover-border"
            }`}
          >
            {destination.pathway.charAt(0).toUpperCase() + destination.pathway.slice(1)} Pathway
          </span>
          <h1 className="type-display-lg text-main">{destination.headline}</h1>
          <p className="type-body text-muted">{destination.subtext}</p>
        </div>

        {/* Dual Identity Entry Flow: Name/AccessCode + Already Started */}
        <LearnerEntryFlow
          initialAccessCode={schoolCode}
          initialName={schoolName}
          destinationHref={destination.href}
          destinationLabel={destination.label}
          bgClass={destination.bgClass}
          pathwayKey={destination.pathway}
        />

        {/* Today Breakdown */}
        <div className="flex flex-col gap-md">
          <h2 className="type-h2 text-main">Today</h2>

          <div
            className={`flex items-start gap-sm rounded-md bg-surface-base p-md border-l-4 shadow-sm ${
              destination.pathway === "explore"
                ? "border-explore"
                : destination.pathway === "build"
                ? "border-build"
                : "border-discover"
            }`}
          >
            <div className="flex flex-col">
              <span className="type-body text-main">
                <strong className={destination.colorClass}>
                  {destination.pathway.charAt(0).toUpperCase() + destination.pathway.slice(1)}
                </strong>{" "}
                — {destination.todayDesc}
              </span>
              <span className="type-caption text-muted">{destination.todayTime}</span>
            </div>
          </div>

          <h2 className="type-h2 text-main mt-sm">Also part of your LearnedHub journey</h2>
          <ul className="flex flex-col gap-sm">
            {others.map((other) => (
              <li
                key={other.key}
                className="flex items-start justify-between gap-sm rounded-md bg-surface-base p-md border border-line"
              >
                <div className="flex flex-col">
                  <span className="type-body text-main">
                    <strong className={other.colorClass}>{other.label}</strong> — {other.desc}
                  </span>
                </div>
                <Link
                  href={other.href}
                  className={`type-caption font-semibold hover:underline shrink-0 ${other.colorClass}`}
                >
                  View →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Preview Section */}
        {destination.pathway === "discover" ? (
          <div className="rounded-md border border-discover-border bg-discover-tint p-lg flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider">
              LearnedHub — Field Action Plan
            </span>
            <span className="type-body text-main font-semibold">Sample result: &quot;Science&quot;</span>
            <p className="type-caption text-muted">
              This is what you walk away with — a shareable one-pager showing your matched stream, ready to save or send to a parent.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-xs rounded-md border border-dashed border-[var(--text-muted)] bg-surface-base p-xl">
            <span className="type-caption text-muted">
              [ Sample {destination.pathway === "explore" ? "Field Defense Summary" : "Skills Record"} preview — pending real content ]
            </span>
          </div>
        )}
      </div>
    </main>
  );
}