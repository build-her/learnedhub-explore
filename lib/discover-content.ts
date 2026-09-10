export type StreamKey = "science" | "arts" | "commercial" | "technical";

export type TabKey =
  | "foundation"
  | "societal-impact"
  | "evolution"
  | "job-roles"
  | "future-with-ai"
  | "redemptive-impact";

export const TAB_ORDER: TabKey[] = [
  "foundation",
  "societal-impact",
  "evolution",
  "job-roles",
  "future-with-ai",
  "redemptive-impact",
];

export const TAB_LABELS: Record<TabKey, string> = {
  foundation: "Foundation",
  "societal-impact": "Societal Impact",
  evolution: "Evolution",
  "job-roles": "Job Roles",
  "future-with-ai": "Future with AI",
  "redemptive-impact": "Redemptive Impact",
};

export type TabContent = {
  headline: string;
  body: string;
  format: string;
  isPlaceholder: boolean;
};

export const STREAM_LABELS: Record<StreamKey, string> = {
  science: "Science",
  arts: "Arts",
  commercial: "Commercial",
  technical: "Technical",
};

export const STREAM_CONTENT: Record<StreamKey, Record<TabKey, TabContent>> = {
  science: {
    foundation: {
      headline: "What science actually is",
      body: "Science is the systematic study of the natural world through observation and experiment. In Nigeria, science students study Physics, Chemistry, Biology, and Maths at SSCE level — the gateway to Medicine, Engineering, Pharmacy, and Biochemistry.",
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "Why Nigeria needs you in science",
      body: "Nigeria produces fewer than 12 doctors per 100,000 people — the WHO minimum is 23. Engineering graduates are building Lagos's third bridge. Every science role you can name is understaffed.",
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "How science careers are changing",
      body: "Scrubbable timeline from 1960 to 2040. Biology is merging with computing. Biotechnology roles didn't exist in Nigeria 15 years ago. The next decade adds bioinformatics, remote sensing, and health data analysis.",
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Real people with real science careers",
      body: "Sort game: drag each role into the salary band you think is right. Roles include: Clinical pharmacist, Petroleum geologist, Software engineer, Agricultural scientist, Public health officer.",
      format: "Salary sort game",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "What AI changes — and what it doesn't",
      body: "AI assists diagnosis but a doctor still treats. AI can model molecules but a chemist still interprets. The roles AI replaces in science are narrow and routine. The roles it creates require science literacy.",
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Your personal case for science",
      body: 'Prompt-driven reflection: "Write one sentence about who in your community you could help with a science career." Saved as a note in your Field Action Plan.',
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },

  arts: {
    foundation: {
      headline: "[ Placeholder — Arts / Foundation ]",
      body: "Real content pending. This should explain what the Arts stream actually covers in the Nigerian SSCE system, in the same style as the Science example — concrete, not generic.",
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Arts / Societal Impact ]",
      body: "Real content pending. Needs a real, sourced Nigerian statistic or fact, like Science's WHO doctor-ratio stat — not an invented number.",
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Arts / Evolution ]",
      body: "Real content pending. Should cover how Arts-track careers are changing 1960–2040, matching Science's timeline framing.",
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Arts / Job Roles ]",
      body: "Real content pending. Needs specific real job titles, matching Science's format (Clinical pharmacist, Petroleum geologist, etc.).",
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Arts / Future with AI ]",
      body: "Real content pending. Should state plainly what AI replaces, augments, and creates for Arts-track careers specifically.",
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Arts / Redemptive Impact ]",
      body: "Real content pending. Same reflection-prompt format as Science, reworded for the Arts stream.",
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },

  commercial: {
    foundation: {
      headline: "[ Placeholder — Commercial / Foundation ]",
      body: "Real content pending. Should explain what the Commercial stream covers in the Nigerian SSCE system.",
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Commercial / Societal Impact ]",
      body: "Real content pending. Needs a real, sourced Nigerian statistic — not an invented number.",
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Commercial / Evolution ]",
      body: "Real content pending. Should cover how Commercial-track careers are changing 1960–2040.",
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Commercial / Job Roles ]",
      body: "Real content pending. Needs specific real job titles in the same format as Science.",
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Commercial / Future with AI ]",
      body: "Real content pending. Should state plainly what AI replaces, augments, and creates for Commercial-track careers.",
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Commercial / Redemptive Impact ]",
      body: "Real content pending. Same reflection-prompt format as Science, reworded for Commercial.",
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },

  technical: {
    foundation: {
      headline: "[ Placeholder — Technical / Foundation ]",
      body: "Real content pending. Should explain what the Technical/Vocational stream covers in the Nigerian system.",
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Technical / Societal Impact ]",
      body: "Real content pending. Needs a real, sourced Nigerian statistic — not an invented number.",
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Technical / Evolution ]",
      body: "Real content pending. Should cover how Technical-track careers are changing 1960–2040.",
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Technical / Job Roles ]",
      body: "Real content pending. Needs specific real job titles in the same format as Science.",
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Technical / Future with AI ]",
      body: "Real content pending. Should state plainly what AI replaces, augments, and creates for Technical-track careers.",
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Technical / Redemptive Impact ]",
      body: "Real content pending. Same reflection-prompt format as Science, reworded for Technical.",
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },
};