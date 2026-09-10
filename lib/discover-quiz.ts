import type { StreamKey } from "./discover-content";

export type StreamWeights = Partial<Record<StreamKey, number>>;

export type QuizOption = {
  label: string;
  weights: StreamWeights;
};

export type QuizStep = {
  question: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  {
    question: "When you have free time, what do you most naturally do?",
    options: [
      { label: "Read, write, or draw something", weights: { arts: 1 } },
      { label: "Solve puzzles or figure out how things work", weights: { science: 1 } },
      { label: "Organise plans or trade with friends", weights: { commercial: 1 } },
      { label: "Fix or make something practical", weights: { technical: 1 } },
    ],
  },
  {
    question: "Which of these sounds most interesting to you as a career?",
    options: [
      { label: "Doctor or Scientist", weights: { science: 1 } },
      { label: "Writer or Designer", weights: { arts: 1 } },
      { label: "Accountant or Banker", weights: { commercial: 1 } },
      { label: "Electrician or Mechanic", weights: { technical: 1 } },
    ],
  },
  {
    question: "How do you usually solve a difficult problem?",
    options: [
      { label: "Talk it through with someone", weights: { arts: 1 } },
      { label: "Research and analyse it", weights: { science: 1 } },
      { label: "Make a plan and a budget", weights: { commercial: 1 } },
      { label: "Take it apart and figure it out hands-on", weights: { technical: 1 } },
    ],
  },
  {
    question: "What kind of impact do you most want to have?",
    options: [
      {
        label: "Help people feel better or express themselves",
        weights: { arts: 1 },
      },
      { label: "Discover or create something new", weights: { science: 1 } },
      { label: "Build wealth and economic growth", weights: { commercial: 1 } },
      { label: "Build things that work and last", weights: { technical: 1 } },
    ],
  },
];

export function scoreQuiz(selectedOptionIndices: number[]): StreamKey {
  const totals: Record<StreamKey, number> = {
    science: 0,
    arts: 0,
    commercial: 0,
    technical: 0,
  };

  selectedOptionIndices.forEach((optionIdx, stepIdx) => {
    const option = QUIZ_STEPS[stepIdx]?.options[optionIdx];
    if (!option) return;
    (Object.keys(option.weights) as StreamKey[]).forEach((key) => {
      totals[key] += option.weights[key] ?? 0;
    });
  });

  return (Object.keys(totals) as StreamKey[]).reduce((best, key) =>
    totals[key] > totals[best] ? key : best
  );
}