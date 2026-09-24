"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_STEPS, scoreQuiz } from "@/lib/discover-quiz";
import { recordDiscoverAttempt } from "@/lib/discover-attempts";
import { logEvent } from "@/lib/events";

export default function DiscoverQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <main className="flex flex-1 flex-col bg-surface-tint">
      <div className="h-1 bg-discover-tint">
        <div
          className="h-1 bg-discover transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-1 flex-col justify-center px-lg py-xl">
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