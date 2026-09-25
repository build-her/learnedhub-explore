"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BrandedArtifactCard from "@/components/BrandedArtifactCard";
import ShareExportBar from "@/components/ShareExportBar";
import LearnerEntryFlow from "@/components/LearnerEntryFlow";
import {
  getArtifactByShareId,
  type Artifact,
  type PlanContent,
  type DefenseContent,
} from "@/lib/artifacts";
import { getLearnerById, type Learner } from "@/lib/learners";
import { logEvent } from "@/lib/events";

interface SharedArtifactPageProps {
  params: Promise<{ shareId: string }>;
}

export default function SharedArtifactPage({ params }: SharedArtifactPageProps) {
  const { shareId } = use(params);
  const searchParams = useSearchParams();

  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [owner, setOwner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadArtifact() {
      if (!shareId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Look up the specific artifact by share_id from the artifacts table (read-only)
        // Do not check for or use any existing learner_id in the current session/localStorage
        const found = await getArtifactByShareId(shareId);

        if (!isMounted) return;

        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setArtifact(found);

        // 2. Fetch original owner profile for display purposes if available
        if (found.learner_id) {
          try {
            const ownerProfile = await getLearnerById(found.learner_id);
            if (isMounted && ownerProfile) {
              setOwner(ownerProfile);
            }
          } catch (err) {
            console.warn("Could not fetch owner profile:", err);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading shared artifact:", err);
        if (isMounted) {
          setNotFound(true);
          setLoading(false);
        }
      }
    }

    loadArtifact();

    return () => {
      isMounted = false;
    };
  }, [shareId]);

  // Loading State
  if (loading) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center bg-surface-tint px-lg py-2xl">
        <div className="flex flex-col items-center gap-md max-w-[480px] w-full text-center">
          <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand-primary animate-spin" />
          <p className="type-body text-muted">Retrieving verified artifact #{shareId}...</p>
        </div>
      </main>
    );
  }

  // Not Found State
  if (notFound || !artifact) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center bg-surface-tint px-lg py-2xl">
        <div className="flex flex-col gap-lg max-w-[480px] w-full bg-surface-base border border-line rounded-xl p-xl shadow-sm text-center">
          <div className="flex justify-center">
            <span className="type-caption font-mono font-bold text-xs px-sm py-xs rounded bg-surface-tint text-muted border border-line">
              Ref: #{shareId}
            </span>
          </div>
          <div className="flex flex-col gap-xs">
            <h1 className="type-display-lg text-main">Artifact Not Found</h1>
            <p className="type-body text-muted">
              We couldn&apos;t find an artifact matching this share code. The link may be incorrect, or the artifact may no longer be available.
            </p>
          </div>
          <div className="pt-sm border-t border-line flex flex-col gap-xs">
            <Link
              href="/"
              className="type-caption font-semibold px-md py-sm rounded-sm bg-brand-primary text-surface-base hover:opacity-90 transition-opacity"
            >
              Go to LearnedHub Home
            </Link>
            <Link
              href="/discover"
              className="type-caption text-muted hover:text-main py-xs"
            >
              Start your own journey →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Content preparation
  const isPlan = artifact.type === "plan";
  const planData = isPlan ? (artifact.content as PlanContent) : null;
  const defenseData = !isPlan ? (artifact.content as DefenseContent) : null;

  const title = isPlan
    ? planData?.stream_name || planData?.stream || "Field Action Plan"
    : defenseData?.course_name || "Course Defense";

  const subtitle = isPlan
    ? "Field Action Plan · Matched Stream Self-Assessment"
    : `Field Defense Summary · ${defenseData?.faculty || "Academic Defense"}`;

  const summary = isPlan
    ? planData?.headline ||
      planData?.description ||
      `This result was generated from a short self-assessment quiz. It's a starting point for exploring ${title} — not a final decision.`
    : undefined;

  const originalLearnerName =
    owner?.preferred_name ||
    (artifact.content as { learner_name?: string })?.learner_name ||
    "Learner";

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl sm:py-2xl">
      <div className="flex flex-col gap-xl max-w-[640px] w-full mx-auto">
        {/* Top Header: Brand Link + Read-only badge */}
        <header className="flex items-center justify-between border-b border-line pb-md">
          <Link
            href="/"
            className="flex items-center gap-xs font-bold text-main tracking-tight uppercase hover:opacity-80 transition-opacity"
          >
            LearnedHub
          </Link>
          <div className="flex items-center gap-xs">
            <span className="type-caption text-xs font-semibold px-sm py-0.5 rounded-full bg-surface-base border border-line text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Shared Artifact · Read-Only
            </span>
          </div>
        </header>

        {/* Read-Only Context Banner */}
        <div className="rounded-xl border border-line bg-surface-base p-md shadow-sm flex items-start gap-md">
          <div className="w-8 h-8 rounded-full bg-surface-tint border border-line flex items-center justify-center shrink-0 text-main font-bold text-xs uppercase">
            {originalLearnerName.slice(0, 1)}
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="type-body text-xs font-semibold text-main">
              Viewing {originalLearnerName}&apos;s verified {isPlan ? "Field Action Plan" : "Field Defense"}
            </p>
            <p className="type-caption text-[11px] text-muted">
              Snapshot recorded and verified on LearnedHub. Showing this artifact is completely separate from starting your own journey.
            </p>
          </div>
        </div>

        {/* SECTION 1: Shared Artifact Content (Visible without requiring identity entry first) */}
        <div className="flex flex-col gap-md">
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
            learnerName={originalLearnerName}
          />

          {/* Export & Sharing Bar */}
          <div className="rounded-xl bg-surface-base border border-line p-md shadow-sm">
            <p className="type-caption font-semibold text-xs text-muted mb-sm uppercase tracking-wider">
              Export or Share this Record
            </p>
            <ShareExportBar
              targetRef={cardRef}
              filename={`learnedhub-shared-${artifact.type}-${artifact.share_id}`}
              shareMessage={`Shared LearnedHub ${isPlan ? "Field Action Plan" : "Field Defense"}: ${title} (Ref: #${artifact.share_id})`}
              accent={isPlan ? "discover" : "explore"}
              screen="dossier_share"
              shareId={artifact.share_id}
            />
          </div>
        </div>

        {/* SECTION 2: Viewer Plain Identity Entry Screen */}
        {/* Always shows the plain entry screen (name + optional access code, or LearnedHub Code) */}
        {/* Even if this browser already has an active learner_id from a previous session */}
        <section className="flex flex-col gap-md pt-md border-t border-line">
          <div className="flex flex-col gap-xs text-center">
            <span className="type-caption font-bold uppercase tracking-wider text-muted text-xs">
              Start Your Own Journey
            </span>
            <h2 className="type-display-md text-main">
              Ready to explore your own pathway?
            </h2>
            <p className="type-body text-xs text-muted max-w-[480px] mx-auto">
              Enter your details below to start your own assessment or resume with an existing code — separate from the artifact shown above.
            </p>
          </div>

          <LearnerEntryFlow
            ignoreActiveLearner={true}
            destinationHref={isPlan ? "/discover/quiz" : "/explore/courses"}
            destinationLabel={isPlan ? "Start Discover Quiz" : "Explore Degree Programs"}
            pathwayKey={isPlan ? "discover" : "explore"}
            bgClass={isPlan ? "bg-discover" : "bg-explore"}
            onLearnerCreated={async (newLearner) => {
              // Only after the viewer submits the entry screen is their own separate learner_id created and linked
              await logEvent({
                event_type: "artifact_opened_via_share",
                learner_id: newLearner.id,
                pathway: isPlan ? "discover" : "explore",
                screen: "dossier_share",
                metadata_json: {
                  share_id: artifact.share_id,
                  artifact_id: artifact.id,
                  artifact_type: artifact.type,
                  artifact_owner_learner_id: artifact.learner_id,
                  shared_from_session: searchParams.get("session") || undefined,
                  is_new_viewer: true,
                },
              });
            }}
            onLearnerResumed={async (resumedLearner) => {
              // Existing learner resumed via LearnedHub Code
              await logEvent({
                event_type: "artifact_opened_via_share",
                learner_id: resumedLearner.id,
                pathway: isPlan ? "discover" : "explore",
                screen: "dossier_share",
                metadata_json: {
                  share_id: artifact.share_id,
                  artifact_id: artifact.id,
                  artifact_type: artifact.type,
                  artifact_owner_learner_id: artifact.learner_id,
                  shared_from_session: searchParams.get("session") || undefined,
                  is_new_viewer: false,
                },
              });
            }}
          />
        </section>
      </div>
    </main>
  );
}
