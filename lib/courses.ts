// PLACEHOLDER DATA — for UI development only.
// None of the JAMB subjects, cutoffs, universities, or deep-dive text below
// are real. Replace using the completed worksheets from
// Explore_Course_Data_Research_Guide_v2 (breadth pass, then depth pass).

export type CourseStream = "science" | "arts" | "commercial" | "technical";

export type ProfileStatus = "breadth-only" | "full-profile";

export type UniversityOffering = {
  university: string;
  type: "Federal" | "State" | "Private";
  notes?: string;
};

export type Course = {
  id: string;
  name: string;
  stream: CourseStream;
  faculty: string;
  shortDescription: string;
  profileStatus: ProfileStatus;
  jambSubjects?: string[];
  waecRequirements?: string;
  utmeCutoff?: string;
  duration?: string;
  deepDive?: string;
  offeredAt?: UniversityOffering[];
};

export const COURSES: Course[] = [
  // ---- SCIENCE ----
  {
    id: "medicine-surgery",
    name: "Medicine and Surgery",
    stream: "science",
    faculty: "Basic Medical Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "full-profile",
    jambSubjects: ["Physics", "Chemistry", "Biology", "English Language"],
    waecRequirements: "[ PLACEHOLDER — pending research ]",
    utmeCutoff: "[ PLACEHOLDER — pending research ]",
    duration: "[ PLACEHOLDER — pending research ]",
    deepDive:
      "[ PLACEHOLDER DEEP-DIVE — pending real authoring. Not real content, only here to test how Screen 5 renders a full profile. ]",
    offeredAt: [
      { university: "[ Placeholder University A ]", type: "Federal", notes: "Placeholder — pending research" },
      { university: "[ Placeholder University B ]", type: "State", notes: "Placeholder — pending research" },
    ],
  },
  {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    stream: "science",
    faculty: "Engineering",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    stream: "science",
    faculty: "Pharmaceutical Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    stream: "science",
    faculty: "Physical Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    stream: "science",
    faculty: "Life Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },

  // ---- ARTS ----
  {
    id: "law",
    name: "Law",
    stream: "arts",
    faculty: "Law",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "full-profile",
    jambSubjects: ["English Language", "Literature in English", "Government", "any other Arts subject"],
    waecRequirements: "[ PLACEHOLDER — pending research ]",
    utmeCutoff: "[ PLACEHOLDER — pending research ]",
    duration: "[ PLACEHOLDER — pending research ]",
    deepDive:
      "[ PLACEHOLDER DEEP-DIVE — pending real authoring. Not real content, only here to test how Screen 5 renders a full profile. ]",
    offeredAt: [
      { university: "[ Placeholder University A ]", type: "Federal", notes: "Placeholder — pending research" },
      { university: "[ Placeholder University B ]", type: "Private", notes: "Placeholder — pending research" },
    ],
  },
  {
    id: "mass-communication",
    name: "Mass Communication",
    stream: "arts",
    faculty: "Arts & Humanities",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "english-language",
    name: "English Language",
    stream: "arts",
    faculty: "Arts & Humanities",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "history-international-studies",
    name: "History and International Studies",
    stream: "arts",
    faculty: "Arts & Humanities",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "theatre-arts",
    name: "Theatre Arts",
    stream: "arts",
    faculty: "Arts & Humanities",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },

  // ---- COMMERCIAL ----
  {
    id: "accounting",
    name: "Accounting",
    stream: "commercial",
    faculty: "Management Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "full-profile",
    jambSubjects: ["Mathematics", "Economics", "Accounting or Commerce", "English Language"],
    waecRequirements: "[ PLACEHOLDER — pending research ]",
    utmeCutoff: "[ PLACEHOLDER — pending research ]",
    duration: "[ PLACEHOLDER — pending research ]",
    deepDive:
      "[ PLACEHOLDER DEEP-DIVE — pending real authoring. Not real content, only here to test how Screen 5 renders a full profile. ]",
    offeredAt: [
      { university: "[ Placeholder University A ]", type: "Federal", notes: "Placeholder — pending research" },
      { university: "[ Placeholder University B ]", type: "State", notes: "Placeholder — pending research" },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    stream: "commercial",
    faculty: "Social Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "business-administration",
    name: "Business Administration",
    stream: "commercial",
    faculty: "Management Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "banking-finance",
    name: "Banking and Finance",
    stream: "commercial",
    faculty: "Management Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "political-science",
    name: "Political Science",
    stream: "commercial",
    faculty: "Social Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },

  // ---- TECHNICAL ----
  {
    id: "estate-management",
    name: "Estate Management",
    stream: "technical",
    faculty: "Environmental Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "full-profile",
    jambSubjects: ["Mathematics", "Physics", "Economics or Geography", "English Language"],
    waecRequirements: "[ PLACEHOLDER — pending research ]",
    utmeCutoff: "[ PLACEHOLDER — pending research ]",
    duration: "[ PLACEHOLDER — pending research ]",
    deepDive:
      "[ PLACEHOLDER DEEP-DIVE — pending real authoring. Not real content, only here to test how Screen 5 renders a full profile. ]",
    offeredAt: [
      { university: "[ Placeholder University A ]", type: "Federal", notes: "Placeholder — pending research" },
      { university: "[ Placeholder University B ]", type: "State", notes: "Placeholder — pending research" },
    ],
  },
  {
    id: "building-technology",
    name: "Building Technology",
    stream: "technical",
    faculty: "Environmental Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "quantity-surveying",
    name: "Quantity Surveying",
    stream: "technical",
    faculty: "Environmental Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "urban-regional-planning",
    name: "Urban and Regional Planning",
    stream: "technical",
    faculty: "Environmental Sciences",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
  {
    id: "vocational-technical-education",
    name: "Vocational and Technical Education",
    stream: "technical",
    faculty: "Education",
    shortDescription: "Placeholder — pending real authoring.",
    profileStatus: "breadth-only",
  },
];

export function getCoursesByStream(stream: CourseStream): Course[] {
  return COURSES.filter((c) => c.stream === stream);
}

export function getFacultiesByStream(stream: CourseStream): string[] {
  return Array.from(new Set(getCoursesByStream(stream).map((c) => c.faculty)));
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}