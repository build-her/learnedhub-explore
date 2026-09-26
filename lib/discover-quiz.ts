import type { StreamKey } from "./discover-content";

export type StreamWeights = Partial<Record<StreamKey, number>>;

export type QuizOption = {
  label: string;
  weights: StreamWeights;
};

export type QuizStep = {
  question: string;
  phase?: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStep[] = [
  // Phase 1 — Questions 1 to 5: what you would do
  {
    question: "NEPA takes light and the whole street goes dark at once. What's the first thing running through your head?",
    phase: "Phase 1: What you would do",
    options: [
      { label: "Wondering why the entire street went off together instead of just one house", weights: { science: 1 } },
      { label: "Thinking how you'd describe this kind of darkness if you were telling someone about it", weights: { arts: 1 } },
      { label: "Working out how much the house will spend on fuel in a month if this continues", weights: { commercial: 1 } },
      { label: "Already reaching for the changeover switch to get the gen running properly", weights: { technical: 1 } },
    ],
  },
  {
    question: "Your friend's phone suddenly stops charging. What's your instinct?",
    phase: "Phase 1: What you would do",
    options: [
      { label: "Check the charging port, clean it and test another cable", weights: { technical: 1 } },
      { label: "Ask questions first: when did it start, did it fall, did it touch water?", weights: { science: 1 } },
      { label: "Calm them down first as they panic about who they can't reach", weights: { arts: 1 } },
      { label: "Tell them exactly which shop to go to and what they might have to pay", weights: { commercial: 1 } },
    ],
  },
  {
    question: "Someone hands you ₦5,000 and a free Saturday. What are you most likely to do with it?",
    phase: "Phase 1: What you would do",
    options: [
      { label: "Buy something small you know you can sell at school for more", weights: { commercial: 1 } },
      { label: "Buy tools to fix something you've had in mind", weights: { technical: 1 } },
      { label: "Buy materials to finally try out something you've been curious about", weights: { science: 1 } },
      { label: "Buy books or a ticket to something you've wanted to see", weights: { arts: 1 } },
    ],
  },
  {
    question: "You pass a building site on your way to school. What catches your attention?",
    phase: "Phase 1: What you would do",
    options: [
      { label: "How the whole structure is being held together", weights: { technical: 1 } },
      { label: "The people working there, who they are, what their day is like", weights: { arts: 1 } },
      { label: "Whether the materials they're using are good enough", weights: { science: 1 } },
      { label: "What it costs and what it will be used for when it's done", weights: { commercial: 1 } },
    ],
  },
  {
    question: "Your class is putting together a small end-of-term event. Which job would you grab before anyone else takes it?",
    phase: "Phase 1: What you would do",
    options: [
      { label: "Writing the script and the opening speech", weights: { arts: 1 } },
      { label: "Handling the contributions and collecting payments", weights: { commercial: 1 } },
      { label: "Setting up the lights and the projector needed", weights: { technical: 1 } },
      { label: "Pointing out what didn't work in last term's event so the same thing does not happen again", weights: { science: 1 } },
    ],
  },

  // Phase 2 — Questions 6 to 10: what you notice and enjoy
  {
    question: "What kind of videos do you keep falling into online?",
    phase: "Phase 2: What you notice and enjoy",
    options: [
      { label: "People telling stories, interviews, skits, commentary", weights: { arts: 1 } },
      { label: "How to fix and how to make, do it yourself videos", weights: { technical: 1 } },
      { label: "How people made their money and started their business", weights: { commercial: 1 } },
      { label: "People explaining how things like space or the body works.", weights: { science: 1 } },
    ],
  },
  {
    question: "Which of these would keep you up past midnight?",
    phase: "Phase 2: What you notice and enjoy",
    options: [
      { label: "Thinking about why something you were taught doesn't match what you saw", weights: { science: 1 } },
      { label: "Finishing something you started that's almost working", weights: { technical: 1 } },
      { label: "Figuring out what a business you passed by sells", weights: { commercial: 1 } },
      { label: "A story or argument you can't stop turning over in your head", weights: { arts: 1 } },
    ],
  },
  {
    question: "Which question do you catch yourself asking most often?",
    phase: "Phase 2: What you notice and enjoy",
    options: [
      { label: "But why does that happen?", weights: { science: 1 } },
      { label: "How much, and who's paying?", weights: { commercial: 1 } },
      { label: "What did they really mean by statement?", weights: { arts: 1 } },
      { label: "How did they make that work?", weights: { technical: 1 } },
    ],
  },
  {
    question: "Your favourite kind of assignment is the one where…",
    phase: "Phase 2: What you notice and enjoy",
    options: [
      { label: "You get to give your own opinion and defend it", weights: { arts: 1 } },
      { label: "There's one correct answer and the fun is hunting it down", weights: { science: 1 } },
      { label: "You have to produce something like a drawing, a working thing", weights: { technical: 1 } },
      { label: "You take scattered information and organise it into something clean and clear", weights: { commercial: 1 } },
    ],
  },
  {
    question: "Your area floods every rainy season because of bad drainage. You're allowed to work on it for one term. Which part do you take?",
    phase: "Phase 2: What you notice and enjoy",
    options: [
      { label: "Finding out why this street floods and the next one does not", weights: { science: 1 } },
      { label: "Thinking of what a proper fix would cost and who will pay for it", weights: { commercial: 1 } },
      { label: "Getting residents to pay attention to their environment", weights: { arts: 1 } },
      { label: "Gathering together everyone to clear it out", weights: { technical: 1 } },
    ],
  },

  // Phase 3 — Questions 11 to 15: how you actually behave
  {
    question: "Your group is arguing about how to do something. Which role do you usually end up in?",
    phase: "Phase 3: How you actually behave",
    options: [
      { label: "The one who quietly starts doing something while everyone else is still talking", weights: { technical: 1 } },
      { label: "The one who gets everybody to agree on a plan and shares out who does what", weights: { commercial: 1 } },
      { label: "The one who hears both sides and puts it in words everyone can accept", weights: { arts: 1 } },
      { label: "The one asking \"but how do we know that will actually work?\"", weights: { science: 1 } },
    ],
  },
  {
    question: "You're handed a locked puzzle box. What do you do first?",
    phase: "Phase 3: How you actually behave",
    options: [
      { label: "Turn it over, look at how it is put together and try to work it open", weights: { technical: 1 } },
      { label: "Look for the pattern testing one idea at a time", weights: { science: 1 } },
      { label: "Think about whether it is even worth the time — what is actually inside that box?", weights: { commercial: 1 } },
      { label: "Wonder who made it, and why they bothered locking it in the first place", weights: { arts: 1 } },
    ],
  },
  {
    question: "Someone is about to make a decision you're sure is wrong. How do you change their mind?",
    phase: "Phase 3: How you actually behave",
    options: [
      { label: "Show them what it will cost them and what the better option is", weights: { commercial: 1 } },
      { label: "Tell them about someone this exact thing happened to", weights: { arts: 1 } },
      { label: "Walk them through the facts step by step until the conclusion is obvious", weights: { science: 1 } },
      { label: "Don't argue, just do it the other way in front of them and let them see", weights: { technical: 1 } },
    ],
  },
  {
    question: "Which mistake would annoy you the most?",
    phase: "Phase 3: How you actually behave",
    options: [
      { label: "Calculating your money and not sure where something is missing", weights: { commercial: 1 } },
      { label: "Your point being completely misunderstood", weights: { arts: 1 } },
      { label: "Something you built failing halfway through", weights: { technical: 1 } },
      { label: "Getting the right answer by luck instead of actually understanding it", weights: { science: 1 } },
    ],
  },
  {
    question: "A younger student asks you for help. The part you enjoy most is…",
    phase: "Phase 3: How you actually behave",
    options: [
      { label: "Breaking a hard idea down until it finally clicks for them", weights: { science: 1 } },
      { label: "Doing it together with them until they get it", weights: { technical: 1 } },
      { label: "Getting them relaxed enough to say what's really confusing them", weights: { arts: 1 } },
      { label: "Giving them a simple system to follow so they stop struggling", weights: { commercial: 1 } },
    ],
  },

  // Phase 4 — Questions 16 to 20: who you are and where you are going
  {
    question: "Which compliment would feel best with you?",
    phase: "Phase 4: Who you are and where you are going",
    options: [
      { label: "You're sharp, you always spot a good opportunity.", weights: { commercial: 1 } },
      { label: "You see what the rest of us don't pay attention to.", weights: { science: 1 } },
      { label: "You know how to fix things well.", weights: { technical: 1 } },
      { label: "You always know how to say it better.", weights: { arts: 1 } },
    ],
  },
  {
    question: "Six weeks of holiday, and you have to work somewhere. Which would you actually enjoy?",
    phase: "Phase 4: Who you are and where you are going",
    options: [
      { label: "Helping run a holiday class for younger children", weights: { arts: 1 } },
      { label: "Assisting at a workshop or repair shop", weights: { technical: 1 } },
      { label: "Assisting at a lab or pharmacy, recording tests and results", weights: { science: 1 } },
      { label: "Helping out in a store keeping records and attending to customers", weights: { commercial: 1 } },
    ],
  },
  {
    question: "Which of these could you do all day without getting tired?",
    phase: "Phase 4: Who you are and where you are going",
    options: [
      { label: "Listening to someone talk about their new business", weights: { commercial: 1 } },
      { label: "Writing a story for your class role-play", weights: { arts: 1 } },
      { label: "Creating a simple new toy for your sibling", weights: { technical: 1 } },
      { label: "Figuring things out how things works", weights: { science: 1 } },
    ],
  },
  {
    question: "Your family starts something new and there's a role for you. Which do you want?",
    phase: "Phase 4: Who you are and where you are going",
    options: [
      { label: "Setting up and maintaining whatever equipment is needed", weights: { technical: 1 } },
      { label: "Talking to customers and keeping the records", weights: { commercial: 1 } },
      { label: "Testing the product to find out if it's good enough", weights: { science: 1 } },
      { label: "Thinking of what to name it and what to tell people about it.", weights: { arts: 1 } },
    ],
  },
  {
    question: "Ten years from now, which would make you proudest?",
    phase: "Phase 4: Who you are and where you are going",
    options: [
      { label: "That something you said or wrote changed how people think", weights: { arts: 1 } },
      { label: "That you found the answer to something nobody had solved", weights: { science: 1 } },
      { label: "That you started a big business and it employs a lot of people", weights: { commercial: 1 } },
      { label: "That something you made is still working, and people depend on it", weights: { technical: 1 } },
    ],
  },
];

/**
 * Calculates total points for each stream based on the selected options.
 */
export function getQuizScoreBreakdown(selectedOptionIndices: number[]): Record<StreamKey, number> {
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

  return totals;
}

/**
 * Scores the 20-question Discover quiz using the Latin square key and returns
 * the winning stream.
 */
export function scoreQuiz(selectedOptionIndices: number[]): StreamKey {
  const totals = getQuizScoreBreakdown(selectedOptionIndices);

  return (Object.keys(totals) as StreamKey[]).reduce((best, key) =>
    totals[key] > totals[best] ? key : best
  );
}