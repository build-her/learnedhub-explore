"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUIZ_STEPS, scoreQuiz } from "@/lib/discover-quiz";

export default function DiscoverQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const current = QUIZ_STEPS[step];
  const progress = (step / QUIZ_STEPS.length) * 100;

  function selectOption(optionIdx: number) {
    const nextAnswers = [...answers, optionIdx];
    setAnswers(nextAnswers);

    if (step + 1 < QUIZ_STEPS.length) {
      setStep(step + 1);
    } else {
      const stream = scoreQuiz(nextAnswers);
      router.push(`/discover/result?stream=${stream}`);
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
              onClick={() => selectOption(idx)}
              className="type-body text-left text-main bg-surface-base border border-discover-border rounded-md px-md py-sm hover:bg-discover-tint transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}