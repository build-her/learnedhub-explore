"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ShareExportBar from "@/components/ShareExportBar";
import BrandedArtifactCard from "@/components/BrandedArtifactCard";
import { getSessionLearnerId } from "@/lib/session";
import { getLearnerById, type Learner } from "@/lib/learners";
import {
  getArtifactsByLearnerId,
  type Artifact,
  type PlanContent,
  type DefenseContent,
} from "@/lib/artifacts";

function ArtifactItem({
  artifact,
  learnerName,
}: {
  artifact: Artifact;
  learnerName?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isPlan = artifact.type === "plan";
  const planData = isPlan ? (artifact.content as PlanContent) : null;
  const defenseData = !isPlan ? (artifact.content as DefenseContent) : null;

  const title = isPlan
    ? planData?.stream_name || planData?.stream || "Field Action Plan"
    : defenseData?.course_name || "Course Defense";

  const subtitle = isPlan
    ? "Field Action Plan · Matched Stream"
    : `Field Defense Summary · ${defenseData?.faculty || "Explore"}`;

  const summary = isPlan
    ? planData?.description ||
      `This result was generated from a short self-assessment quiz. It's a starting point for exploring ${title} — not a final decision.`
    : undefined;

  return (
    <div className="flex flex-col gap-sm rounded-xl bg-surface-base border border-line p-md shadow-sm">
      <div className="flex items-center justify-between">
        <span className="type-caption font-semibold text-xs text-muted uppercase tracking-wider">
          {isPlan ? "Discover Pathway" : "Explore Defense"}
        </span>
        <span className="type-caption font-mono text-xs text-muted">
          Ref: #{artifact.share_id}
        </span>
      </div>

      <BrandedArtifactCard
        ref={cardRef}
        type={artifact.type}
        title={title}
        subtitle={subtitle}
        shareId={artifact.share_id}
        createdAt={artifact.created_at}
        attemptNumber={planData?.attempt_number}
        summaryText={summary}
        jambSubjects={defenseData?.jamb_subjects}
        caseText={defenseData?.case_text}
        learnerName={learnerName || (artifact.content as { learner_name?: string })?.learner_name}
      />

      <div className="pt-xs border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-sm">
        <ShareExportBar
          targetRef={cardRef}
          filename={`learnedhub-artifact-${artifact.type}-${artifact.share_id}`}
          shareMessage={`My LearnedHub ${isPlan ? "Field Action Plan" : "Field Defense"}: ${title} (Ref: #${artifact.share_id})`}
          accent={isPlan ? "discover" : "explore"}
          screen="dossier"
          shareId={artifact.share_id}
        />

        <div className="flex items-center gap-sm">
          {isPlan ? (
            <Link
              href={`/discover/result?stream=${planData?.stream || "science"}`}
              className="type-caption text-discover font-semibold hover:underline"
            >
              View in Discover →
            </Link>
          ) : (
            <Link
              href={`/explore/${defenseData?.course_id || ""}`}
              className="type-caption text-explore font-semibold hover:underline"
            >
              View Course →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DossierPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "plan" | "defense">("all");

  useEffect(() => {
    let isMounted = true;

    async function fetchDossierData() {
      setLoading(true);
      try {
        const learnerId = await getSessionLearnerId();
        if (learnerId) {
          const [fetchedArtifacts, fetchedLearner] = await Promise.all([
            getArtifactsByLearnerId(learnerId),
            getLearnerById(learnerId),
          ]);

          if (isMounted) {
            setArtifacts(fetchedArtifacts);
            setLearner(fetchedLearner);
          }
        }
      } catch (err) {
        console.error("Error loading dossier artifacts:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDossierData();

    return () => {
      isMounted = false;
    };
  }, []);

  const planCount = artifacts.filter((a) => a.type === "plan").length;
  const defenseCount = artifacts.filter((a) => a.type === "defense").length;

  const filteredArtifacts = artifacts.filter((a) => {
    if (filter === "plan") return a.type === "plan";
    if (filter === "defense") return a.type === "defense";
    return true;
  });

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[560px] w-full mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <Link href="/" className="type-caption text-muted hover:text-main">
            ← Home
          </Link>
          <div className="flex items-center gap-md">
            <Link href="/discover" className="type-caption text-discover hover:underline">
              Discover
            </Link>
            <Link href="/explore" className="type-caption text-explore hover:underline">
              Explore
            </Link>
          </div>
        </div>

        {/* Dossier Header */}
        <div className="flex flex-col gap-xs rounded-xl bg-surface-base border border-line p-lg sm:p-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="type-caption font-bold text-xs uppercase tracking-wider text-muted">
              LearnedHub Portfolio
            </span>
            {learner && (
              <span className="type-caption font-mono font-bold text-xs px-sm py-0.5 rounded bg-surface-tint border border-line text-main">
                {learner.learner_code}
              </span>
            )}
          </div>

          <h1 className="type-display-lg text-main">
            {learner?.preferred_name
              ? `${learner.preferred_name}'s Dossier`
              : "Your LearnedHub Dossier"}
          </h1>

          <p className="type-body text-muted">
            Your personal portfolio of verified, timestamped educational artifacts and proofs of exploration.
          </p>

          <div className="flex flex-wrap gap-xs pt-sm border-t border-line mt-xs">
            <span className="type-caption px-sm py-0.5 rounded-full bg-surface-tint border border-line font-medium text-main">
              {artifacts.length} Total Artifact{artifacts.length === 1 ? "" : "s"}
            </span>
            <span className="type-caption px-sm py-0.5 rounded-full bg-discover-tint border border-discover-border text-discover font-medium">
              {planCount} Field Action Plan{planCount === 1 ? "" : "s"}
            </span>
            <span className="type-caption px-sm py-0.5 rounded-full bg-explore-tint border border-explore-border text-explore font-medium">
              {defenseCount} Field Defense{defenseCount === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        {/* Filter Controls (when artifacts exist) */}
        {artifacts.length > 0 && (
          <div className="flex gap-xs border-b border-line pb-xs">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`type-caption px-md py-xs rounded-full border transition-colors ${
                filter === "all"
                  ? "bg-main text-surface-base border-main font-semibold"
                  : "bg-surface-base text-muted border-line hover:text-main"
              }`}
            >
              All ({artifacts.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("plan")}
              className={`type-caption px-md py-xs rounded-full border transition-colors ${
                filter === "plan"
                  ? "bg-discover text-surface-base border-discover font-semibold"
                  : "bg-surface-base text-muted border-line hover:text-discover"
              }`}
            >
              Field Action Plans ({planCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("defense")}
              className={`type-caption px-md py-xs rounded-full border transition-colors ${
                filter === "defense"
                  ? "bg-explore text-surface-base border-explore font-semibold"
                  : "bg-surface-base text-muted border-line hover:text-explore"
              }`}
            >
              Field Defenses ({defenseCount})
            </button>
          </div>
        )}

        {/* Content Body */}
        {loading ? (
          <div className="rounded-xl bg-surface-base border border-line p-xl text-center">
            <p className="type-body text-muted">Loading your Dossier artifacts...</p>
          </div>
        ) : filteredArtifacts.length > 0 ? (
          <div className="flex flex-col gap-lg">
            {filteredArtifacts.map((artifact) => (
              <ArtifactItem
                key={artifact.id}
                artifact={artifact}
                learnerName={learner?.preferred_name}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-xl bg-surface-base border border-dashed border-[var(--text-muted)] p-xl flex flex-col items-center text-center gap-md">
            <div className="w-12 h-12 rounded-full bg-surface-tint border border-line flex items-center justify-center text-xl">
              📂
            </div>
            <div className="flex flex-col gap-xs max-w-[380px]">
              <h2 className="type-h2 text-main">
                {filter === "all"
                  ? "No artifacts in your Dossier yet"
                  : `No ${filter === "plan" ? "Field Action Plans" : "Field Defenses"} found`}
              </h2>
              <p className="type-body text-muted text-sm">
                Your Dossier stores your verified Field Action Plans and Field Defense Summaries as you explore.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-xs w-full max-w-[360px] pt-sm">
              <Link
                href="/discover"
                className="flex-1 py-sm px-md rounded-md bg-discover text-surface-base font-bold type-caption text-center hover:opacity-90 transition-opacity"
              >
                Start Discover →
              </Link>
              <Link
                href="/explore"
                className="flex-1 py-sm px-md rounded-md bg-explore text-surface-base font-bold type-caption text-center hover:opacity-90 transition-opacity"
              >
                Explore Courses →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
