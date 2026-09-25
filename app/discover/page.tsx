"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUIZ_STEPS, scoreQuiz } from "@/lib/discover-quiz";
import {
  recordDiscoverAttempt,
  getAttemptsByLearnerId,
  extractStreamFromResult,
  type DiscoverAttempt,
} from "@/lib/discover-attempts";
import { STREAM_LABELS, type StreamKey } from "@/lib/discover-content";
import { getSessionLearnerId } from "@/lib/session";
import { logEvent } from "@/lib/events";

export default function DiscoverPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Completed attempts state
  const [latestAttempt, setLatestAttempt] = useState<DiscoverAttempt | null>(null);

  // Check if current learner already has completed discover attempts
  useEffect(() => {
    async function loadPreviousAttempts() {
      try {
        const learnerId = await getSessionLearnerId();
        if (learnerId) {
          const attempts = await getAttemptsByLearnerId(learnerId);
          if (attempts && attempts.length > 0) {
            setLatestAttempt(attempts[0]);
          }
        }
      } catch (err) {
        console.error("Error loading previous discover attempts:", err);
      }
    }

    loadPreviousAttempts();
  }, []);

  // Log screen_viewed for each distinct question step (discover_question_1, discover_question_2, etc.)
  useEffect(() => {
    logEvent({
      event_type: "screen_viewed",
      pathway: "discover",
      screen: `discover_question_${step + 1}`,
      metadata_json: { question_index: step, total_questions: QUIZ_STEPS.length },
    });
  }, [step]);

  const current = QUIZ_STEPS[step];
  const progress = (step / QUIZ_STEPS.length) * 100;

  async function selectOption(optionIdx: number) {
    if (isSubmitting) return;

    // Log pathway_started on first quiz question answered in Discover
    if (step === 0) {
      logEvent({
        event_type: "pathway_started",
        pathway: "discover",
        screen: "discover_question_1",
        metadata_json: { question_index: 0, option_index: optionIdx },
      });
    }

    const nextAnswers = [...answers, optionIdx];
    setAnswers(nextAnswers);

    if (step + 1 < QUIZ_STEPS.length) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      const stream = scoreQuiz(nextAnswers);
      try {
        const attempt = await recordDiscoverAttempt({
          stream,
          answers: nextAnswers,
        });
        const attemptParam = attempt?.attempt_number ? `&attempt=${attempt.attempt_number}` : "";
        router.push(`/discover/result?stream=${stream}${attemptParam}`);
      } catch (err) {
        console.error("Error saving discover attempt:", err);
        router.push(`/discover/result?stream=${stream}`);
      }
    }
  }

  // Resolve previous result stream label and URL if previous attempt exists
  const rawStreamKey = latestAttempt ? extractStreamFromResult(latestAttempt.result) : null;
  const streamKey = (rawStreamKey || "science") as StreamKey;
  const matchedStreamName = STREAM_LABELS[streamKey] || (rawStreamKey ? rawStreamKey.toUpperCase() : "Science");
  const previousResultHref = latestAttempt
    ? `/discover/result?stream=${streamKey}&attempt=${latestAttempt.attempt_number}`
    : "/discover/result";

  return (
    <main className="flex flex-1 flex-col bg-surface-tint min-h-screen">
      {/* Top Header / Navigation Bar */}
      <header className="w-full border-b border-line bg-surface-base">
        <div className="max-w-[560px] mx-auto px-lg py-sm flex items-center justify-between">
          <Link href="/" className="type-caption text-muted hover:text-main transition-colors">
            ← Home
          </Link>
          <div className="flex items-center gap-md">
            <Link href="/explore" className="type-caption text-explore hover:underline">
              Explore
            </Link>
            <Link href="/dossier" className="type-caption text-muted hover:text-main transition-colors">
              Dossier
            </Link>
          </div>
        </div>
      </header>

      {/* Prominent banner if learner has already completed at least one attempt */}
      {latestAttempt && (
        <section
          aria-label="Previous Discover Result"
          className="w-full max-w-[560px] mx-auto px-lg pt-md"
        >
          <div className="rounded-lg border-2 border-discover bg-discover-tint p-md flex flex-col gap-sm shadow-sm">
            <div className="flex items-start gap-sm">
              <span className="text-xl leading-none select-none mt-0.5">✨</span>
              <div className="flex-1 flex flex-col gap-xs">
                <div className="flex flex-wrap items-center justify-between gap-xs">
                  <h2 className="type-body font-bold text-main">
                    You&apos;ve already completed Discover.
                  </h2>
                  <span className="type-caption font-semibold px-sm py-0.5 rounded-full bg-surface-base text-discover border border-discover-border">
                    Matched: {matchedStreamName}
                  </span>
                </div>
                <p className="type-caption text-muted">
                  You can view your existing Field Action Plan or check your Dossier anytime without retaking the quiz:
                </p>
                <div className="flex flex-wrap items-center gap-sm mt-xs">
                  <Link
                    href={previousResultHref}
                    className="type-caption font-semibold px-md py-xs rounded-md bg-discover text-surface-base hover:opacity-90 transition-opacity"
                  >
                    View your previous result →
                  </Link>
                  <span className="type-caption text-muted">or</span>
                  <Link
                    href="/dossier"
                    className="type-caption font-semibold px-md py-xs rounded-md border border-line bg-surface-base text-main hover:bg-surface-tint transition-colors"
                  >
                    Go to your Dossier →
                  </Link>
                </div>
              </div>
            </div>
            <p className="type-caption text-muted border-t border-discover-border/50 pt-xs">
              Want to try different answers? Continue below to retake the quiz — it will be recorded as Attempt #{latestAttempt.attempt_number + 1}.
            </p>
          </div>
        </section>
      )}

      {/* Quiz Progress Bar */}
      <div className="w-full max-w-[560px] mx-auto px-lg pt-md">
        <div className="h-1.5 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-discover transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Quiz Content Container */}
      <div className="flex flex-1 flex-col justify-center px-lg py-xl max-w-[560px] w-full mx-auto">
        <span className="type-caption text-muted mb-sm">
          Question {step + 1} of {QUIZ_STEPS.length}
        </span>

        <h1 className="type-h1 text-main mb-lg">{current.question}</h1>

        <div className="flex flex-col gap-sm">
          {current.options.map((option, idx) => (
            <button
              key={option.label}
              type="button"
              disabled={isSubmitting}
              onClick={() => selectOption(idx)}
              className={`type-body text-left text-main bg-surface-base border border-discover-border rounded-md px-md py-sm hover:bg-discover-tint transition-colors ${
                isSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}