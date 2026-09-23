"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ShareExportBar from "@/components/ShareExportBar";
import {
  TAB_ORDER,
  TAB_LABELS,
  type StreamKey,
  type TabKey,
  type TabContent,
} from "@/lib/discover-content";
import { supabase } from "@/lib/supabase";

function isStreamKey(value: string | null): value is StreamKey {
  return value === "science" || value === "arts" || value === "commercial" || value === "technical";
}

function ResultContent() {
  const searchParams = useSearchParams();
  const rawStream = searchParams.get("stream");
  const stream: StreamKey = isStreamKey(rawStream) ? rawStream : "science";

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);
  const [streamData, setStreamData] = useState<{
    name: string;
    content: Record<TabKey, TabContent>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const artifactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchPathway() {
      setLoading(true);
      const { data, error } = await supabase
        .from("pathways")
        .select("id, name, content_json")
        .eq("id", stream)
        .maybeSingle();

      if (isMounted) {
        if (!error && data && data.content_json) {
          setStreamData({
            name: data.name,
            content: data.content_json as Record<TabKey, TabContent>,
          });
        }
        setLoading(false);
      }
    }

    fetchPathway();
    return () => {
      isMounted = false;
    };
  }, [stream]);

  if (loading) {
    return (
      <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
        <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
          <div className="flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider">
              Your result
            </span>
            <h1 className="type-display-lg text-discover">Loading...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (!streamData) {
    return (
      <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
        <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
          <div className="flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider">
              Your result
            </span>
            <h1 className="type-display-lg text-discover">Pathway not found</h1>
            <p className="type-body text-muted">
              Unable to load pathway information. Please ensure Supabase policies allow reading pathways.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const streamLabel = streamData.name;
  const content = streamData.content[activeTab];

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <div className="flex flex-col gap-xs">
          <span className="type-caption text-muted uppercase tracking-wider">
            Your result
          </span>
          <h1 className="type-display-lg text-discover">{streamLabel}</h1>
        </div>

        <div className="flex flex-wrap gap-xs">
          {TAB_ORDER.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`type-caption px-md py-xs rounded-full border ${
                activeTab === tab
                  ? "bg-discover text-surface-base border-discover"
                  : "bg-surface-base text-muted border-discover-border"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        {content && (
          <div
            className={`rounded-lg border p-lg ${
              content.isPlaceholder
                ? "border-dashed border-[var(--text-muted)] bg-surface-base"
                : "border-discover-border bg-discover-tint"
            }`}
          >
            {content.isPlaceholder && (
              <span className="type-caption text-muted italic block mb-sm">
                Placeholder content — pending real authoring
              </span>
            )}
            <h2 className="type-h2 text-main mb-sm">{content.headline}</h2>

            {content.roles ? (
              <div className="flex flex-col gap-sm mb-sm">
                {content.roles.map((role) => (
                  <div key={role.title}>
                    <p className="type-body text-main font-semibold mb-xs">{role.title}</p>
                    <p className="type-body text-main">{role.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-sm mb-sm">
                {content.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="type-body text-main">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <span className="type-caption text-muted">{content.format}</span>
          </div>
        )}

        <div className="flex flex-col gap-md">
          <h2 className="type-h2 text-main">Your Field Action Plan</h2>

          <div
            ref={artifactRef}
            className="rounded-lg bg-surface-base border border-discover-border p-lg flex flex-col gap-sm"
          >
            <span className="type-caption text-muted uppercase tracking-wider">
              LearnedHub — Field Action Plan
            </span>
            <h3 className="type-h1 text-discover">{streamLabel}</h3>
            <p className="type-body text-main">
              This result was generated from a short self-assessment quiz.
              It&apos;s a starting point for exploring {streamLabel}{" "}
              — not a final decision.
            </p>
            <span className="type-caption text-muted">
              Generated by LearnedHub Explore
            </span>
          </div>

          <ShareExportBar
            targetRef={artifactRef}
            filename={`learnedhub-field-action-plan-${stream}`}
            shareMessage={`My LearnedHub Discover result: ${streamLabel}`}
            accent="discover"
          />
        </div>
      </div>
    </main>
  );
}

export default function DiscoverResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultContent />
    </Suspense>
  );
}