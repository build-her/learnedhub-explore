import Link from "next/link";
import LearnerEntryFlow from "@/components/LearnerEntryFlow";

type SearchParams = Promise<{
  school?: string | string[];
  name?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ExploreEntryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const schoolCode = firstValue(params.school);
  const schoolName = firstValue(params.name);

  return (
    <main className="flex flex-1 flex-col items-center px-lg py-xxl bg-surface-tint min-h-screen">
      <div className="flex w-full max-w-[448px] flex-col gap-xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-sm border-b border-line">
          <Link href="/" className="type-caption text-muted hover:text-main">
            ← Home
          </Link>
          <div className="flex items-center gap-md">
            <Link href="/discover" className="type-caption text-discover hover:underline">
              Discover
            </Link>
            <Link href="/dossier" className="type-caption text-main hover:underline">
              Dossier
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-sm">
          <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-explore-tint text-explore border border-explore-border w-fit">
            Explore Pathway
          </span>
          <h1 className="type-display-lg text-main">See where it actually leads.</h1>
          <p className="type-body text-muted">
            Search real courses, see real admissions requirements, and understand what each one leads to.
          </p>
        </div>

        <LearnerEntryFlow
          initialAccessCode={schoolCode}
          initialName={schoolName}
          destinationHref="/explore/courses"
          destinationLabel="Explore Degree Programs"
          bgClass="bg-explore"
          pathwayKey="explore"
        />

        <div className="flex flex-col gap-md">
          <h2 className="type-h2 text-main">Today</h2>

          <div className="flex items-start gap-sm rounded-md bg-surface-base p-md border-l-4 border-explore shadow-sm">
            <div className="flex flex-col">
              <span className="type-body text-main">
                <strong className="text-explore">Explore</strong> — Search real courses, filter by faculty, and see full admissions profiles
              </span>
              <span className="type-caption text-muted">~15 minutes</span>
            </div>
          </div>

          <h2 className="type-h2 text-main mt-sm">Also part of your LearnedHub journey</h2>
          <ul className="flex flex-col gap-sm">
            <li className="flex items-start justify-between gap-sm rounded-md bg-surface-base p-md border border-line">
              <div className="flex flex-col">
                <span className="type-body text-main">
                  <strong className="text-discover">Discover</strong> — Not sure of your stream yet? Start here
                </span>
              </div>
              <Link href="/discover" className="type-caption text-discover font-semibold hover:underline shrink-0">
                View →
              </Link>
            </li>
            <li className="flex items-start justify-between gap-sm rounded-md bg-surface-base p-md border border-line">
              <div className="flex flex-col">
                <span className="type-body text-main">
                  <strong className="text-build">Build</strong> — Try a real skill challenge
                </span>
              </div>
              <Link href="/build" className="type-caption text-build font-semibold hover:underline shrink-0">
                View →
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-xs rounded-md border border-dashed border-[var(--text-muted)] bg-surface-base p-xl">
          <span className="type-caption text-muted">
            [ Sample Field Defense Summary preview — pending real content ]
          </span>
        </div>
      </div>
    </main>
  );
}