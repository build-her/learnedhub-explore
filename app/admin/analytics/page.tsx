import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics — Admin",
  robots: {
    index: false,
    follow: false,
  },
};

interface FunnelRow {
  step: number;
  stage: string;
  learners: number;
}

interface DropoffRow {
  step: number;
  label: string;
  learners: number;
  pct_of_q1: number;
  change_from_prev: number | null;
}

export default async function AdminAnalyticsPage() {
  // 1. Fetch both views in parallel without caching
  const [funnelRes, dropoffRes] = await Promise.all([
    supabaseAdmin
      .from("funnel_summary")
      .select("step, stage, learners")
      .order("step", { ascending: true }),
    supabaseAdmin
      .from("discover_dropoff")
      .select("step, label, learners, pct_of_q1, change_from_prev")
      .order("step", { ascending: true }),
  ]);

  // 2. Error handling: show plain error message if a query fails
  if (funnelRes.error || dropoffRes.error) {
    const errorMessages = [
      funnelRes.error ? `funnel_summary: ${funnelRes.error.message}` : null,
      dropoffRes.error ? `discover_dropoff: ${dropoffRes.error.message}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    return (
      <div className="p-lg max-w-[1100px] w-full mx-auto">
        <div className="rounded-xl border border-red-200 bg-red-50 p-lg text-red-700">
          <h2 className="type-h2 font-bold mb-xs">Analytics Query Error</h2>
          <p className="type-body text-sm font-mono">{errorMessages}</p>
        </div>
      </div>
    );
  }

  // 3. Coerce numeric values with Number()
  const funnelData: FunnelRow[] = (funnelRes.data || []).map((row) => ({
    step: Number(row.step),
    stage: String(row.stage || ""),
    learners: Number(row.learners || 0),
  }));

  const dropoffData: DropoffRow[] = (dropoffRes.data || []).map((row) => ({
    step: Number(row.step),
    label: String(row.label || ""),
    learners: Number(row.learners || 0),
    pct_of_q1: Number(row.pct_of_q1 || 0),
    change_from_prev:
      row.change_from_prev !== null && row.change_from_prev !== undefined
        ? Number(row.change_from_prev)
        : null,
  }));

  // 4. Calculate scorecards
  const totalLearners = funnelData.find((f) => f.step === 1)?.learners ?? 0;
  const discoverFinished = funnelData.find((f) => f.step === 4)?.learners ?? 0;
  const exploreArtifacts = funnelData.find((f) => f.step === 8)?.learners ?? 0;
  const sharedArtifacts = funnelData.find((f) => f.step === 9)?.learners ?? 0;
  const hitBuild = funnelData.find((f) => f.step === 10)?.learners ?? 0;

  const scorecards = [
    {
      title: "Total Learners",
      step: 1,
      count: totalLearners,
      subtext: "Step 1: All learners started",
      accent: "text-main",
    },
    {
      title: "Discover Finished",
      step: 4,
      count: discoverFinished,
      subtext: totalLearners > 0 ? `${Math.round((discoverFinished / totalLearners) * 100)}% of total` : "Step 4",
      accent: "text-discover",
    },
    {
      title: "Explore Artifacts",
      step: 8,
      count: exploreArtifacts,
      subtext: totalLearners > 0 ? `${Math.round((exploreArtifacts / totalLearners) * 100)}% of total` : "Step 8",
      accent: "text-explore",
    },
    {
      title: "Shared",
      step: 9,
      count: sharedArtifacts,
      subtext: totalLearners > 0 ? `${Math.round((sharedArtifacts / totalLearners) * 100)}% of total` : "Step 9",
      accent: "text-explore",
    },
    {
      title: "Hit Build",
      step: 10,
      count: hitBuild,
      subtext: totalLearners > 0 ? `${Math.round((hitBuild / totalLearners) * 100)}% of total` : "Step 10",
      accent: "text-build",
    },
  ];

  // 5. Funnel calculations
  const maxFunnelLearners = Math.max(...funnelData.map((f) => f.learners), 1);

  // 6. Discover dropoff calculations: Identify top 3 biggest negative change_from_prev
  const negativeChanges = dropoffData
    .filter((d) => d.change_from_prev !== null && d.change_from_prev < 0)
    .sort((a, b) => (a.change_from_prev as number) - (b.change_from_prev as number));

  const top3DropSteps = new Set(negativeChanges.slice(0, 3).map((d) => d.step));
  const maxDropoffLearners = Math.max(...dropoffData.map((d) => d.learners), 1);

  // 7. Last refreshed timestamp formatted in Africa/Lagos time
  const lastRefreshed = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "medium",
    hour12: true,
  }).format(new Date());

  return (
    <div className="p-md sm:p-lg max-w-[1100px] w-full mx-auto flex flex-col gap-lg">
      {/* Header with Title and Timestamp */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-xs border-b border-line pb-md">
        <div>
          <h1 className="type-h1 text-main font-bold">Analytics Dashboard</h1>
          <p className="type-caption text-muted mt-xs">
            Learner funnel progression and Discover quiz dropoff analytics
          </p>
        </div>
        <div className="type-caption text-muted bg-surface-base border border-line px-md py-xs rounded-full shadow-2xs w-fit">
          Last refreshed: <strong className="text-main">{lastRefreshed}</strong> (Africa/Lagos)
        </div>
      </div>

      {/* 1. Scorecards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-md">
        {scorecards.map((card) => (
          <div
            key={card.step}
            className="rounded-xl border border-line bg-surface-base p-md sm:p-lg shadow-2xs flex flex-col justify-between"
          >
            <div>
              <span className="type-caption font-semibold uppercase tracking-wider text-muted text-xs block mb-xs">
                {card.title}
              </span>
              <div className={`text-3xl font-extrabold tracking-tight ${card.accent}`}>
                {card.count.toLocaleString()}
              </div>
            </div>
            <div className="type-caption text-muted text-xs mt-sm pt-xs border-t border-line/60">
              {card.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Horizontal Bar Funnel */}
      <div className="rounded-xl border border-line bg-surface-base p-lg shadow-2xs flex flex-col gap-md">
        <div className="border-b border-line pb-sm">
          <h2 className="type-h2 text-main font-bold">Learner Funnel Summary</h2>
          <p className="type-caption text-muted">
            Progression across the 10 stages from initial entry to build exploration
          </p>
        </div>

        <div className="flex flex-col gap-md pt-xs">
          {funnelData.map((item, idx) => {
            const prevItem = idx > 0 ? funnelData[idx - 1] : null;
            const pctOfPrev =
              idx === 0
                ? "100%"
                : prevItem && prevItem.learners > 0
                ? `${Math.round((item.learners / prevItem.learners) * 100)}%`
                : "0%";

            const barWidth = Math.max(Math.round((item.learners / maxFunnelLearners) * 100), 2);

            return (
              <div key={item.step} className="flex flex-col gap-xs">
                {/* Step Stage and Metainfo */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-main truncate pr-sm">
                    <span className="text-muted mr-xs">Step {item.step}:</span>
                    {item.stage}
                  </span>
                  <div className="flex items-center gap-sm shrink-0">
                    <span className="font-bold text-main">{item.learners.toLocaleString()} learners</span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-tint border border-line text-muted text-[11px]">
                      {idx === 0 ? "Baseline" : `${pctOfPrev} of prev`}
                    </span>
                  </div>
                </div>

                {/* Horizontal Bar */}
                <div className="w-full h-7 bg-surface-tint rounded-md border border-line/70 overflow-hidden relative flex items-center">
                  <div
                    className="h-full bg-brand-primary rounded-xs transition-all duration-300 flex items-center justify-end px-sm"
                    style={{ width: `${barWidth}%` }}
                  >
                    {barWidth > 18 && (
                      <span className="text-[11px] font-bold text-surface-base drop-shadow-xs">
                        {item.learners}
                      </span>
                    )}
                  </div>
                  {barWidth <= 18 && (
                    <span className="text-[11px] font-bold text-main ml-xs">
                      {item.learners}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Column Chart for Discover Dropoff */}
      <div className="rounded-xl border border-line bg-surface-base p-lg shadow-2xs flex flex-col gap-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-xs border-b border-line pb-sm">
          <div>
            <h2 className="type-h2 text-main font-bold">Discover Assessment Drop-off</h2>
            <p className="type-caption text-muted">
              Step-by-step learner counts across quiz questions (Q1–Q20) and results
            </p>
          </div>
          <div className="flex items-center gap-md text-xs">
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 rounded-xs bg-explore/75 inline-block" />
              <span className="text-muted">Normal step</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 rounded-xs bg-rose-600 inline-block ring-2 ring-rose-200" />
              <span className="font-semibold text-rose-700">Top 3 biggest drops</span>
            </div>
          </div>
        </div>

        {/* Scrollable Container on Mobile */}
        <div className="w-full overflow-x-auto pb-sm pt-md">
          <div className="min-w-[840px] flex items-end gap-1.5 h-[220px] px-xs border-b border-line">
            {dropoffData.map((col) => {
              const isTopDrop = top3DropSteps.has(col.step);
              const heightPct = Math.max(Math.round((col.learners / maxDropoffLearners) * 100), 4);

              return (
                <div
                  key={col.step}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative"
                >
                  {/* Drop Indicator Badge on top drop columns */}
                  {isTopDrop && col.change_from_prev !== null && (
                    <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 border border-rose-200 rounded px-1 mb-1 whitespace-nowrap animate-pulse">
                      {col.change_from_prev}
                    </span>
                  )}

                  {/* Learner Count on Column */}
                  <span
                    className={`text-[11px] font-bold mb-1 ${
                      isTopDrop ? "text-rose-700 font-extrabold" : "text-main"
                    }`}
                  >
                    {col.learners}
                  </span>

                  {/* Column Bar */}
                  <div
                    className={`w-full rounded-t-sm transition-all duration-200 ${
                      isTopDrop
                        ? "bg-rose-600 group-hover:bg-rose-700 shadow-xs ring-2 ring-rose-200"
                        : "bg-explore/75 group-hover:bg-explore"
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Labels & Change Underneath */}
          <div className="min-w-[840px] flex gap-1.5 pt-xs px-xs">
            {dropoffData.map((col) => {
              const isTopDrop = top3DropSteps.has(col.step);
              return (
                <div key={col.step} className="flex-1 flex flex-col items-center text-center">
                  <span
                    className={`text-xs font-semibold truncate max-w-full ${
                      isTopDrop ? "text-rose-700 font-bold" : "text-main"
                    }`}
                    title={col.label}
                  >
                    {col.label}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isTopDrop
                        ? "font-extrabold text-rose-600"
                        : col.change_from_prev !== null && col.change_from_prev < 0
                        ? "text-muted"
                        : col.change_from_prev !== null && col.change_from_prev > 0
                        ? "text-emerald-700"
                        : "text-muted/60"
                    }`}
                  >
                    {col.change_from_prev !== null
                      ? col.change_from_prev > 0
                        ? `+${col.change_from_prev}`
                        : col.change_from_prev
                      : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
