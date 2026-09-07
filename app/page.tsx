import Link from "next/link";

type SearchParams = Promise<{
  school?: string | string[];
  name?: string | string[];
}>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const schoolCode = firstValue(params.school);
  const schoolName = firstValue(params.name);

  return (
    <main className="flex flex-1 flex-col items-center px-lg py-xxl">
      <div className="flex w-full max-w-md flex-col gap-xl">
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
          <h1 className="type-display-lg text-main">Figure out your path.</h1>
          <p className="type-body text-muted">
            No pressure — just real answers about streams, courses, and
            skills, in one sitting.
          </p>
        </div>

        <div className="flex flex-col gap-md">
          <h2 className="type-h2 text-main">What you&apos;ll do today</h2>

          <ul className="flex flex-col gap-sm">
            <li className="flex items-start gap-sm rounded-md bg-surface-tint p-md">
              <span className="type-h2 text-discover">1</span>
              <div className="flex flex-col">
                <span className="type-body text-main">
                  <strong>Discover</strong> — find your stream
                </span>
                <span className="type-caption text-muted">~10 minutes</span>
              </div>
            </li>

            <li className="flex items-start gap-sm rounded-md bg-surface-tint p-md">
              <span className="type-h2 text-explore">2</span>
              <div className="flex flex-col">
                <span className="type-body text-main">
                  <strong>Explore</strong> — see which courses actually fit
                </span>
              </div>
            </li>

            <li className="flex items-start gap-sm rounded-md bg-surface-tint p-md">
              <span className="type-h2 text-build">3</span>
              <div className="flex flex-col">
                <span className="type-body text-main">
                  <strong>Build</strong> — try a real skill challenge
                </span>
                <span className="type-caption text-muted">30 minutes</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-xs rounded-md border border-dashed border-[var(--text-muted)] p-xl">
          <span className="type-caption text-muted">
            [ Sample-artifact teaser placeholder — content pending ]
          </span>
        </div>

        <Link
          href="/discover"
          className="type-body text-surface-base rounded-md bg-brand-primary px-lg py-sm text-center"
        >
          Start with Discover
        </Link>
      </div>
    </main>
  );
}