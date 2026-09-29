export type Learner = {
  id?: string;
  preferred_name: string;
  learner_code: string;
  acquisition_source?: string;
  entry_point?: string | null;
  created_at?: string;
};

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Creates a new learner record via /api/learners.
 * The server generates the learner code with crypto.randomInt and issues the httpOnly session cookie.
 */
export async function createLearner(params: {
  preferred_name: string;
  acquisition_source?: string;
  entry_point?: string | null;
  learner_code?: string;
}): Promise<Learner | null> {
  const preferred_name = params.preferred_name?.trim();
  if (!preferred_name) {
    throw new Error("preferred_name is required");
  }

  const acquisition_source = params.acquisition_source?.trim() || "Direct";
  const entry_point = params.entry_point?.trim() || null;

  try {
    const res = await fetch(`${getBaseUrl()}/api/learners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        preferred_name,
        acquisition_source,
        entry_point,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to create learner:", err);
      return null;
    }

    const data = await res.json();
    return {
      preferred_name: data.preferred_name,
      learner_code: data.learner_code,
    };
  } catch (err) {
    console.error("Error creating learner:", err);
    return null;
  }
}

/**
 * Retrieves the current authenticated learner for this session via /api/me.
 * Returns only preferred_name and learner_code for display.
 */
export async function getCurrentLearner(): Promise<Learner | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/me`);
    if (!res.ok) return null;

    const data = await res.json();
    if (data.preferred_name && data.learner_code) {
      return {
        preferred_name: data.preferred_name,
        learner_code: data.learner_code,
      };
    }
    return null;
  } catch (err) {
    console.error("Error fetching current learner via /api/me:", err);
    return null;
  }
}

/**
 * Compatibility alias for getLearnerById: fetches the current learner from /api/me.
 */
export async function getLearnerById(_id?: string): Promise<Learner | null> {
  return getCurrentLearner();
}

/**
 * Resumes an existing learner session with a LearnedHub Code via /api/learners/resume.
 * Validates against rate-limiting (throws "try again later." on 429) and establishes httpOnly session.
 */
export async function resumeLearner(code: string): Promise<Learner | null> {
  if (!code) return null;
  const raw = code.trim().toUpperCase();

  try {
    const res = await fetch(`${getBaseUrl()}/api/learners/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: raw }),
    });

    if (res.status === 429) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "try again later.");
    }

    if (!res.ok) return null;

    const data = await res.json();
    if (data.success && data.preferred_name && data.learner_code) {
      return {
        preferred_name: data.preferred_name,
        learner_code: data.learner_code,
      };
    }

    return null;
  } catch (err) {
    if ((err as Error)?.message === "try again later.") {
      throw err;
    }
    console.error("Error resuming learner by code:", err);
    return null;
  }
}

/**
 * Compatibility alias for getLearnerByCode: resumes session via /api/learners/resume.
 */
export async function getLearnerByCode(code: string): Promise<Learner | null> {
  return resumeLearner(code);
}

/**
 * Logs out the learner session via /api/learners/logout.
 */
export async function logoutLearner(): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/learners/logout`, {
      method: "POST",
    });
    return res.ok;
  } catch {
    return false;
  }
}
