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
  paragraphs: string[];
  roles?: { title: string; description: string }[];
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
      headline: "What science actually is and why each subject matters",
      paragraphs: [
        "Science is the systematic study of the natural world through observation, measurement, and experiment. In the Nigerian SSCE and JAMB system, the science stream centers on four subjects: Physics, Chemistry, Biology, and Mathematics, the exact combination a JAMB candidate needs for Medicine, Pharmacy, Engineering, Biochemistry, and most Agriculture-related courses.",
        "You're probably already sitting through these four classes without anyone connecting the dots on why each one specifically matters. Physics is the subject engineering is built on: the mechanics you study in SS2 — forces, motion, energy, is the same foundation a 100-level engineering student uses in their first mechanics and thermodynamics courses, just with more mathematics attached.",
        "Chemistry does the same job for Medicine and Pharmacy. The organic chemistry you're doing now, the reactions, the bonding, is the direct ancestor of pharmacology and biochemistry courses, where you're asking the same question at a more precise level: what happens when this compound meets that one, and can it help or harm a human body?",
        "Biology is the throughline for Medicine, Nursing, and Agriculture. University courses in physiology, anatomy, and plant or animal science all start from the same cell-and-system logic you're learning in SS3 Biology, just applied to a specific organism or problem.",
        "Mathematics is different, it isn't tied to one career the way the others are. It's the shared language that makes the other three precise instead of descriptive, which is why every one of these courses requires it regardless of specialization.",
        "The practical implication: if you're weak in Physics but strong in Biology and Chemistry, Medicine and Pharmacy are a more natural direction than Engineering, worth knowing now, not in your first year of university.",
      ],
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "Why Nigeria needs you in science",
      paragraphs: [
        "Here's a number worth sitting with: Nigeria has fewer than 12 doctors for every 100,000 people. The World Health Organization considers 23 the minimum a country needs to keep its population reasonably healthy.",
        "That's not a distant statistic. It's the reason a hospital in your own city might have one doctor covering what should be two or three people's workload, and the reason a family member's appointment sometimes takes weeks instead of days.",
        "The same shortage logic shows up outside medicine. Engineers are the people literally building the infrastructure Nigerian cities are racing to keep up with, new bridges, new rail lines, new power projects, and the country doesn't have enough of them relative to what's being built.",
        "Pharmacists are stretched across a population where a huge share of healthcare happens in a pharmacy counter conversation rather than a hospital visit, because that's what's actually accessible to most people.",
        "None of this means science is an easy path to a guaranteed job. It means the shortage is real enough that genuine competence tends to matter more than credentials alone, and the flip side is also true: it's a shortage precisely because these are hard, demanding paths, not shortcuts.",
      ],
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "How science careers have changed and where they're going",
      paragraphs: [
        "Science careers haven't stayed still, and it's worth understanding the shape of that change, not just today's snapshot.",
        "Decades ago, being a scientist in Nigeria mostly meant one of a small number of clearly defined roles, doctor, pharmacist, agricultural officer, each operating largely on its own. Chemistry, for most of the 20th century, was mostly bench work: mixing, measuring, and observing by hand.",
        "That started shifting hard as computing power became cheap enough that fields which used to be purely observational became heavily data-driven. Biology is now inseparable from computing in a lot of its cutting-edge work, which is why bioinformatics exists at all today as its own discipline.",
        "Looking forward, expect more roles sitting at the intersection of a traditional science subject and data: health data analysis, remote sensing for agriculture, computational chemistry.",
        "The practical takeaway: a pure lab-and-textbook version of a science career is becoming less common. Having some comfort with data alongside your core science subject is turning from a bonus into something close to an expectation.",
      ],
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Real people with real science careers — what they actually do",
      paragraphs: [],
      roles: [
        {
          title: "Clinical Pharmacist",
          description: "Works inside a hospital or large pharmacy, reviewing prescriptions for safety, advising doctors on drug interactions, and counselling patients on how to take their medication correctly. Different from a neighbourhood pharmacy counter, this role is embedded in a hospital care team.",
        },
        {
          title: "Petroleum Geologist",
          description: "Works with oil and gas companies, studying rock formations and underground data to figure out where oil and gas deposits actually are before a company spends money drilling. Fieldwork combined with heavy data analysis, inside Nigeria's energy sector.",
        },
        {
          title: "Software Engineer",
          description: "Designs and builds the software behind apps, websites, and internal company systems. Increasingly overlaps with science backgrounds, since a strong grounding in Physics and Maths translates directly into the logical thinking it requires.",
        },
        {
          title: "Agricultural Scientist",
          description: "Works on improving crop yields, soil health, and farming techniques, often for research institutes or agribusiness. Connects Biology directly to real economic impact in a country where agriculture employs a huge share of the population.",
        },
        {
          title: "Public Health Officer",
          description: "Works for government health agencies or NGOs, focused on disease prevention and health policy at a population level rather than treating individual patients, the role behind vaccination campaigns and outbreak response.",
        },
      ],
      format: "Salary sort game",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "What AI changes — and what it doesn't",
      paragraphs: [
        "AI is already part of science careers, but not in the way people usually assume, it's worth being precise about where the line actually sits.",
        "In medicine, AI tools can flag unusual patterns in scans or lab results faster than a human might catch them. But a doctor still has to interpret what that pattern means for a specific patient and take responsibility for the decision, something current AI cannot do.",
        "In chemistry, AI can now model how molecules might behave before anyone runs a physical experiment, speeding up early research significantly. But a chemist still has to design the experiment that confirms whether the model was right.",
        "The pattern is consistent: AI is strongest at narrow, repetitive, pattern-recognition tasks, and weakest at judgment calls that require weighing context or responsibility for someone's wellbeing.",
        "The realistic expectation for anyone entering science today isn't competing against AI, it's working alongside tools that handle repetitive analysis, so more of your time goes into the judgment calls only a trained person can make.",
      ],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Your personal case for science",
      paragraphs: [
        "This last tab isn't about facts, it's about making the choice personal instead of abstract.",
        "Science, more than most streams, has a direct line to solving problems that show up in daily Nigerian life: the family member who couldn't get seen fast enough at a clinic, the crop that failed because of a soil problem nobody caught early, the water source that made people in a community sick.",
        "Name one of those moments specifically, not science in general, but one real person or situation where a science-trained person could have changed the outcome. Be as specific as you can: a name, a place, a moment.",
        "This isn't a test with a right answer. It's a note saved into your Field Action Plan, so if you do choose this stream, you have a written record of why, not just \"I was good at the subjects.\"",
      ],
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },

  arts: {
    foundation: {
      headline: "[ Placeholder — Arts / Foundation ]",
      paragraphs: ["Real content pending. This should explain what the Arts stream actually covers in the Nigerian SSCE system, in the same style as the Science example — concrete, not generic."],
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Arts / Societal Impact ]",
      paragraphs: ["Real content pending. Needs a real, sourced Nigerian statistic or fact, like Science's WHO doctor-ratio stat — not an invented number."],
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Arts / Evolution ]",
      paragraphs: ["Real content pending. Should cover how Arts-track careers are changing 1960–2040, matching Science's timeline framing."],
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Arts / Job Roles ]",
      paragraphs: ["Real content pending. Needs specific real job titles, matching Science's format (Clinical pharmacist, Petroleum geologist, etc.)."],
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Arts / Future with AI ]",
      paragraphs: ["Real content pending. Should state plainly what AI replaces, augments, and creates for Arts-track careers specifically."],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Arts / Redemptive Impact ]",
      paragraphs: ["Real content pending. Same reflection-prompt format as Science, reworded for the Arts stream."],
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },

  commercial: {
    foundation: {
      headline: "[ Placeholder — Commercial / Foundation ]",
      paragraphs: ["Real content pending. Should explain what the Commercial stream covers in the Nigerian SSCE system."],
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Commercial / Societal Impact ]",
      paragraphs: ["Real content pending. Needs a real, sourced Nigerian statistic — not an invented number."],
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Commercial / Evolution ]",
      paragraphs: ["Real content pending. Should cover how Commercial-track careers are changing 1960–2040."],
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Commercial / Job Roles ]",
      paragraphs: ["Real content pending. Needs specific real job titles in the same format as Science."],
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Commercial / Future with AI ]",
      paragraphs: ["Real content pending. Should state plainly what AI replaces, augments, and creates for Commercial-track careers."],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Commercial / Redemptive Impact ]",
      paragraphs: ["Real content pending. Same reflection-prompt format as Science, reworded for Commercial."],
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },

  technical: {
    foundation: {
      headline: "[ Placeholder — Technical / Foundation ]",
      paragraphs: ["Real content pending. Should explain what the Technical/Vocational stream covers in the Nigerian system."],
      format: "Tap-to-reveal cards",
      isPlaceholder: true,
    },
    "societal-impact": {
      headline: "[ Placeholder — Technical / Societal Impact ]",
      paragraphs: ["Real content pending. Needs a real, sourced Nigerian statistic — not an invented number."],
      format: "Data scroll with live stats",
      isPlaceholder: true,
    },
    evolution: {
      headline: "[ Placeholder — Technical / Evolution ]",
      paragraphs: ["Real content pending. Should cover how Technical-track careers are changing 1960–2040."],
      format: "Scrubbable timeline",
      isPlaceholder: true,
    },
    "job-roles": {
      headline: "[ Placeholder — Technical / Job Roles ]",
      paragraphs: ["Real content pending. Needs specific real job titles in the same format as Science."],
      format: "Salary sort game",
      isPlaceholder: true,
    },
    "future-with-ai": {
      headline: "[ Placeholder — Technical / Future with AI ]",
      paragraphs: ["Real content pending. Should state plainly what AI replaces, augments, and creates for Technical-track careers."],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: true,
    },
    "redemptive-impact": {
      headline: "[ Placeholder — Technical / Redemptive Impact ]",
      paragraphs: ["Real content pending. Same reflection-prompt format as Science, reworded for Technical."],
      format: "Prompt + text input",
      isPlaceholder: true,
    },
  },
};