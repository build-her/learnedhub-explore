"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import ShareExportBar from "@/components/ShareExportBar";
import BrandedArtifactCard from "@/components/BrandedArtifactCard";
import { getCourseById, type Course } from "@/lib/courses";
import { supabase } from "@/lib/supabase";
import { getSessionLearnerId } from "@/lib/session";
import {
  createArtifact,
  getArtifactsByLearnerId,
  type Artifact,
} from "@/lib/artifacts";
import { logEvent } from "@/lib/events";

export default function DefendPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);

  const [course, setCourse] = useState<Course | null>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [caseText, setCaseText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedArtifact, setSavedArtifact] = useState<Artifact | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const artifactRef = useRef<HTMLDivElement>(null);

  // Load course details (from static library or Supabase courses table)
  useEffect(() => {
    let isMounted = true;

    async function loadCourse() {
      setCourseLoading(true);
      // 1. Try static lookup
      const staticMatch = getCourseById(courseId);
      if (staticMatch) {
        if (isMounted) {
          setCourse(staticMatch);
          setCourseLoading(false);
        }
        return;
      }

      // 2. Try Supabase courses table
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(courseId);
        let query = supabase.from("courses").select("*");
        if (isUuid) {
          query = query.eq("id", courseId);
        } else {
          query = query.filter("admissions_json->>id", "eq", courseId);
        }

        const { data, error } = await query.maybeSingle();
        if (isMounted) {
          if (!error && data) {
            const admissions = data.admissions_json || {};
            setCourse({
              id: admissions.id || admissions.slug || data.id,
              name: data.name,
              stream: data.stream,
              faculty: data.faculty,
              shortDescription: admissions.shortDescription || "",
              profileStatus: data.profile_status,
              jambSubjects: admissions.jambSubjects || undefined,
              waecRequirements: admissions.waecRequirements || undefined,
              utmeCutoff: admissions.utmeCutoff || undefined,
              duration: admissions.duration || undefined,
              deepDive: admissions.deepDive || undefined,
              offeredAt: data.offered_at_json || undefined,
            });
          }
          setCourseLoading(false);

          // Log pathway_completed event when reaching Explore artifact-generation step
          logEvent({
            event_type: "pathway_completed",
            pathway: "explore",
            screen: "explore_defend",
            metadata_json: { course_id: courseId, course_name: data?.name },
          });
        }
      } catch (err) {
        console.error("Error fetching course for defend page:", err);
        if (isMounted) setCourseLoading(false);
      }
    }

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  // Check if learner already has a saved defense artifact for this course
  useEffect(() => {
    async function checkExistingDefense() {
      try {
        const learnerId = await getSessionLearnerId();
        if (!learnerId) return;

        const artifacts = await getArtifactsByLearnerId(learnerId);
        const existing = artifacts.find(
          (a) =>
            a.type === "defense" &&
            (a.content as { course_id?: string })?.course_id === courseId
        );

        if (existing) {
          setSavedArtifact(existing);
          const existingText = (existing.content as { case_text?: string })?.case_text;
          if (existingText) {
            setCaseText(existingText);
          }
        }
      } catch (err) {
        console.error("Failed to check existing defense artifact:", err);
      }
    }

    checkExistingDefense();
  }, [courseId]);

  // Save / generate Field Defense Summary row in artifacts table
  async function handleSaveDefense(e: React.FormEvent) {
    e.preventDefault();
    if (!caseText.trim()) {
      setFeedback({ type: "error", message: "Please write your case for why this course fits you." });
      return;
    }

    if (!course) return;

    setIsSaving(true);
    setFeedback(null);

    try {
      const learnerId = await getSessionLearnerId();
      const learnerName =
        typeof window !== "undefined"
          ? localStorage.getItem("learnedhub_learner_name") || undefined
          : undefined;

      const newArtifact = await createArtifact({
        learner_id: learnerId,
        type: "defense",
        content: {
          course_id: course.id,
          course_name: course.name,
          faculty: course.faculty,
          jamb_subjects: course.jambSubjects,
          case_text: caseText.trim(),
          learner_name: learnerName,
          created_at: new Date().toISOString(),
        },
      });

      if (!newArtifact) {
        setFeedback({
          type: "error",
          message: "Could not save your Field Defense. Please check your connection and try again.",
        });
        setIsSaving(false);
        return;
      }

      setSavedArtifact(newArtifact);
      setFeedback({
        type: "success",
        message: `Saved to your Dossier! Verified Artifact Ref: #${newArtifact.share_id}`,
      });
    } catch (err) {
      console.error("Error creating defense artifact:", err);
      setFeedback({ type: "error", message: "An unexpected error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  }

  if (courseLoading) {
    return (
      <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
        <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
          <p className="type-body text-muted">Loading course details...</p>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
        <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
          <h1 className="type-display-lg text-explore">Course Not Found</h1>
          <p className="type-body text-muted">
            The course you are trying to defend could not be found.
          </p>
          <Link href="/explore/courses" className="type-body text-explore hover:underline">
            ← Back to Explore Courses
          </Link>
        </div>
      </main>
    );
  }

  const learnerName =
    (savedArtifact?.content as { learner_name?: string })?.learner_name ||
    (typeof window !== "undefined" ? localStorage.getItem("learnedhub_learner_name") || undefined : undefined);

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[480px] w-full mx-auto">
        <div className="flex items-center justify-between">
          <Link href={`/explore/${course.id}`} className="type-caption text-muted hover:text-explore">
            ← Back to {course.name}
          </Link>
          <Link href="/dossier" className="type-caption text-explore font-semibold hover:underline">
            View Dossier →
          </Link>
        </div>

        <div className="flex flex-col gap-xs">
          <span className="type-caption text-muted uppercase tracking-wider">
            Field Defense Summary
          </span>
          <h1 className="type-display-lg text-explore">{course.name}</h1>
          <span className="type-caption text-muted">{course.faculty}</span>
        </div>

        {/* Input Form: Why this course? */}
        <form onSubmit={handleSaveDefense} className="flex flex-col gap-sm">
          <div className="flex flex-col gap-xs">
            <h2 className="type-h2 text-main">Why this course?</h2>
            <p className="type-body text-muted">
              Make your case. Why does {course.name} fit you — your interests, your strengths, or something you&apos;ve seen that made you consider it?
            </p>
          </div>

          <textarea
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            placeholder="Write your case here (e.g., 'I want to study this because I enjoy solving physical problems and I excelled at Physics and Mathematics in SS2...')"
            rows={5}
            className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main resize-none focus:outline-none focus:ring-2 focus:ring-explore"
          />

          {feedback && (
            <div
              className={`p-sm rounded-md type-caption font-medium ${
                feedback.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSaving || !caseText.trim()}
            className="type-body font-bold text-surface-base rounded-md py-sm px-lg text-center bg-explore hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isSaving
              ? "Saving to Dossier..."
              : savedArtifact
              ? "Update Field Defense in Dossier"
              : "Save Field Defense to Dossier"}
          </button>
        </form>

        {/* Rendered Artifact: Shared Branded Visual Template */}
        <div className="flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="type-h2 text-main">Your Field Defense Summary</h2>
            {savedArtifact && (
              <span className="type-caption text-emerald-700 font-semibold flex items-center gap-1">
                ✓ Recorded in Dossier
              </span>
            )}
          </div>

          <BrandedArtifactCard
            ref={artifactRef}
            type="defense"
            title={course.name}
            subtitle={`Field Defense Summary · ${course.faculty}`}
            shareId={savedArtifact?.share_id}
            createdAt={savedArtifact?.created_at}
            jambSubjects={course.jambSubjects}
            caseText={caseText.trim() ? caseText.trim() : "[ Your case will appear here as you write above ]"}
            learnerName={learnerName}
          />

          <ShareExportBar
            targetRef={artifactRef}
            filename={`learnedhub-field-defense-${course.id}${
              savedArtifact?.share_id ? `-${savedArtifact.share_id}` : ""
            }`}
            shareMessage={`My LearnedHub Field Defense for ${course.name}${
              savedArtifact?.share_id ? ` (Ref: #${savedArtifact.share_id})` : ""
            }`}
            accent="explore"
            shareId={savedArtifact?.share_id}
          />

          <div className="flex items-center justify-between pt-xs text-muted">
            <Link href="/explore/courses" className="type-caption hover:text-explore hover:underline">
              ← Defend another course
            </Link>
            <Link href="/dossier" className="type-caption text-explore font-semibold hover:underline">
              Go to your Dossier →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}