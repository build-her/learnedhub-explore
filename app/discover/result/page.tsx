"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ShareExportBar from "@/components/ShareExportBar";
import BrandedArtifactCard from "@/components/BrandedArtifactCard";
import {
  TAB_ORDER,
  TAB_LABELS,
  type StreamKey,
  type TabKey,
  type TabContent,
} from "@/lib/discover-content";
import { supabase } from "@/lib/supabase";
import { getSessionLearnerId } from "@/lib/session";
import {
  getAttemptsByLearnerId,
  extractStreamFromResult,
  type DiscoverAttempt,
} from "@/lib/discover-attempts";
import {
  createArtifact,
  getArtifactsByLearnerId,
  type Artifact,
} from "@/lib/artifacts";
import { logEvent } from "@/lib/events";

function isStreamKey(value: string | null | undefined): value is StreamKey {
  return value === "science" || value === "arts" || value === "commercial" || value === "technical";
}

function ResultContent() {
  const searchParams = useSearchParams();
  const rawStreamParam = searchParams.get("stream");
  const rawAttemptParam = searchParams.get("attempt");

  const [activeTab, setActiveTab] = useState<TabKey>(TAB_ORDER[0]);
  const [streamData, setStreamData] = useState<{
    id: string;
    name: string;
    content: Record<TabKey, TabContent>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<DiscoverAttempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<DiscoverAttempt | null>(null);
  const [planArtifact, setPlanArtifact] = useState<Artifact | null>(null);

  const artifactRef = useRef<HTMLDivElement>(null);

  // Initial load: fetch learner attempts, ensure server-recorded artifact, and load pathway data
  useEffect(() => {
    let isMounted = true;

    async function loadResultData() {
      setLoading(true);

      let learnerAttempts: DiscoverAttempt[] = [];
      let activeStreamKey: StreamKey = "science";
      let chosenAttempt: DiscoverAttempt | null = null;
      let learnerId: string | null = null;

      try {
        learnerId = await getSessionLearnerId();
        if (learnerId) {
          learnerAttempts = await getAttemptsByLearnerId(learnerId);
        }
      } catch (err) {
        console.error("Error fetching learner attempts:", err);
      }

      // If attempts exist, default to the most recent attempt (attempts[0])
      if (learnerAttempts.length > 0) {
        if (rawAttemptParam) {
          chosenAttempt =
            learnerAttempts.find((a) => String(a.attempt_number) === rawAttemptParam) ||
            learnerAttempts[0];
        } else {
          chosenAttempt = learnerAttempts[0];
        }

        const extracted = extractStreamFromResult(chosenAttempt.result);
        if (isStreamKey(extracted)) {
          activeStreamKey = extracted;
        } else if (isStreamKey(rawStreamParam)) {
          activeStreamKey = rawStreamParam;
        }
      } else if (isStreamKey(rawStreamParam)) {
        activeStreamKey = rawStreamParam;
      }

      // Fetch pathway details from Supabase
      const { data, error } = await supabase
        .from("pathways")
        .select("id, name, content_json")
        .eq("id", activeStreamKey)
        .maybeSingle();

      const pathwayName = data?.name || activeStreamKey.charAt(0).toUpperCase() + activeStreamKey.slice(1);

      // Ensure server-recorded row in artifacts table
      let currentArtifact: Artifact | null = null;
      if (learnerId) {
        try {
          const existingArtifacts = await getArtifactsByLearnerId(learnerId);
          // Look for an existing plan artifact matching this attempt or stream
          const matched = existingArtifacts.find(
            (a) =>
              a.type === "plan" &&
              (a.content as { attempt_number?: number })?.attempt_number === chosenAttempt?.attempt_number
          ) || existingArtifacts.find(
            (a) => a.type === "plan" && (a.content as { stream?: string })?.stream === activeStreamKey
          );

          if (matched) {
            currentArtifact = matched;
          } else {
            // Insert server-recorded row into artifacts table
            const learnerName =
              typeof window !== "undefined"
                ? localStorage.getItem("learnedhub_learner_name") || undefined
                : undefined;

            currentArtifact = await createArtifact({
              learner_id: learnerId,
              type: "plan",
              content: {
                stream: activeStreamKey,
                stream_name: pathwayName,
                attempt_number: chosenAttempt?.attempt_number || 1,
                created_at: new Date().toISOString(),
                learner_name: learnerName,
              },
            });
          }
        } catch (artErr) {
          console.error("Error managing plan artifact:", artErr);
        }
      }

      if (isMounted) {
        setAttempts(learnerAttempts);
        setSelectedAttempt(chosenAttempt);
        setPlanArtifact(currentArtifact);

        if (!error && data && data.content_json) {
          setStreamData({
            id: data.id,
            name: data.name,
            content: data.content_json as Record<TabKey, TabContent>,
          });
        }
        setLoading(false);

        // Log pathway_completed event when reaching Discover result/artifact step
        logEvent({
          event_type: "pathway_completed",
          pathway: "discover",
          screen: "discover_result",
          metadata_json: {
            stream: activeStreamKey,
            attempt_number: chosenAttempt?.attempt_number || 1,
            artifact_id: currentArtifact?.id,
            share_id: currentArtifact?.share_id,
          },
        });
      }
    }

    loadResultData();

    return () => {
      isMounted = false;
    };
  }, [rawStreamParam, rawAttemptParam]);

  // Handler for switching between past attempts
  async function handleSelectAttempt(attempt: DiscoverAttempt) {
    setSelectedAttempt(attempt);
    const streamKey = extractStreamFromResult(attempt.result);
    if (isStreamKey(streamKey) && streamKey !== streamData?.id) {
      setLoading(true);
      const { data, error } = await supabase
        .from("pathways")
        .select("id, name, content_json")
        .eq("id", streamKey)
        .maybeSingle();

      if (!error && data && data.content_json) {
        setStreamData({
          id: data.id,
          name: data.name,
          content: data.content_json as Record<TabKey, TabContent>,
        });
      }

      // Check or create artifact for this switched attempt
      try {
        const learnerId = await getSessionLearnerId();
        if (learnerId) {
          const artifacts = await getArtifactsByLearnerId(learnerId);
          const matched = artifacts.find(
            (a) =>
              a.type === "plan" &&
              (a.content as { attempt_number?: number })?.attempt_number === attempt.attempt_number
          );
          setPlanArtifact(matched || null);
        }
      } catch (err) {
        console.error("Error switching artifact:", err);
      }

      setLoading(false);
    }
  }

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
  const latestAttempt = attempts.length > 0 ? attempts[0] : null;
  const learnerName =
    (planArtifact?.content as { learner_name?: string })?.learner_name ||
    (typeof window !== "undefined" ? localStorage.getItem("learnedhub_learner_name") || undefined : undefined);

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <div className="flex flex-col gap-xs">
          <div className="flex items-center justify-between">
            <span className="type-caption text-muted uppercase tracking-wider">
              Your result
            </span>
            {selectedAttempt && (
              <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-discover-tint text-discover border border-discover-border">
                Attempt {selectedAttempt.attempt_number}
                {selectedAttempt.id === latestAttempt?.id ? " (Latest)" : ""}
              </span>
            )}
          </div>
          <h1 className="type-display-lg text-discover">{streamLabel}</h1>
        </div>

        {/* Attempt history selector when multiple attempts exist */}
        {attempts.length > 1 && (
          <div className="flex flex-col gap-xs rounded-md bg-surface-base border border-line p-sm">
            <div className="flex items-center justify-between">
              <span className="type-caption text-muted font-medium">All attempts for your profile:</span>
              <span className="type-caption text-muted text-xs">{attempts.length} total</span>
            </div>
            <div className="flex flex-wrap gap-xs">
              {attempts.map((att) => {
                const attStream = extractStreamFromResult(att.result);
                const isSelected = selectedAttempt?.id === att.id;
                const isLatest = att.id === latestAttempt?.id;
                return (
                  <button
                    key={att.id}
                    type="button"
                    onClick={() => handleSelectAttempt(att)}
                    className={`type-caption px-sm py-xs rounded border transition-colors ${
                      isSelected
                        ? "bg-discover text-surface-base border-discover font-semibold"
                        : "bg-surface-tint text-main border-line hover:bg-surface-base"
                    }`}
                  >
                    Attempt {att.attempt_number}
                    {isLatest ? " (Latest)" : ""}
                    {attStream ? ` · ${attStream.charAt(0).toUpperCase() + attStream.slice(1)}` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab switcher */}
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

        {/* Field Action Plan Section with Shared Branded Visual Template */}
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="type-h2 text-main">Your Field Action Plan</h2>
            <Link
              href="/dossier"
              className="type-caption text-discover font-semibold hover:underline"
            >
              View in Dossier →
            </Link>
          </div>

          <BrandedArtifactCard
            ref={artifactRef}
            type="plan"
            title={streamLabel}
            subtitle="Field Action Plan · Matched Stream Self-Assessment"
            shareId={planArtifact?.share_id}
            createdAt={planArtifact?.created_at || (selectedAttempt?.created_at ?? undefined)}
            attemptNumber={selectedAttempt?.attempt_number}
            summaryText={`This result was generated from a short self-assessment quiz. It's a starting point for exploring ${streamLabel} — not a final decision.`}
            learnerName={learnerName}
          />

          <ShareExportBar
            targetRef={artifactRef}
            filename={`learnedhub-field-action-plan-${streamData.id}${
              planArtifact?.share_id ? `-${planArtifact.share_id}` : ""
            }`}
            shareMessage={`My LearnedHub Field Action Plan: ${streamLabel}${
              planArtifact?.share_id ? ` (Ref: #${planArtifact.share_id})` : ""
            }`}
            accent="discover"
            shareId={planArtifact?.share_id}
          />

          <div className="flex justify-center pt-xs">
            <Link
              href="/discover"
              className="type-caption text-muted hover:text-discover hover:underline transition-colors"
            >
              Take the Discover quiz again →
            </Link>
          </div>
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