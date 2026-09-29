import { getSessionLearnerId } from "@/lib/session";

export type DiscoverResult = {
  stream: string;
  answers?: number[];
  [key: string]: unknown;
};

export type DiscoverAttempt = {
  id: string;
  learner_id: string;
  attempt_number: number;
  result: DiscoverResult | string;
  created_at: string;
};

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Extracts a normalized stream key from an attempt's result object or string.
 */
export function extractStreamFromResult(result: unknown): string | null {
  if (!result) return null;
  if (typeof result === "string") return result.trim().toLowerCase();
  if (typeof result === "object" && result !== null) {
    const raw = (result as { stream?: unknown }).stream;
    if (typeof raw === "string") return raw.trim().toLowerCase();
  }
  return null;
}

/**
 * Queries all discover attempts for a given learner_id via /api/discover/attempts.
 */
export async function getAttemptsByLearnerId(learnerId: string): Promise<DiscoverAttempt[]> {
  if (!learnerId) return [];

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/discover/attempts?learner_id=${encodeURIComponent(learnerId.trim())}`
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (data.attempts || []) as DiscoverAttempt[];
  } catch (err) {
    console.error("Failed to query discover attempts:", err);
    return [];
  }
}

/**
 * Queries the single most recent discover attempt for a given learner_id via /api/discover/attempts.
 */
export async function getLatestDiscoverAttempt(learnerId: string): Promise<DiscoverAttempt | null> {
  if (!learnerId) return null;

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/discover/attempts?learner_id=${encodeURIComponent(
        learnerId.trim()
      )}&latest=true`
    );

    if (!res.ok) return null;

    const data = await res.json();
    return (data.attempt || null) as DiscoverAttempt | null;
  } catch (err) {
    console.error("Failed to query latest discover attempt:", err);
    return null;
  }
}

/**
 * Records a new discover attempt via /api/discover/attempts POST endpoint.
 */
export async function recordDiscoverAttempt(params: {
  learnerId?: string | null;
  stream: string;
  answers?: number[];
}): Promise<DiscoverAttempt | null> {
  try {
    let learnerId = params.learnerId;

    if (!learnerId) {
      learnerId = await getSessionLearnerId();
    }

    if (!learnerId) {
      console.warn("Cannot record discover attempt: no learner_id available");
      return null;
    }

    const res = await fetch(`${getBaseUrl()}/api/discover/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        learnerId,
        stream: params.stream,
        answers: params.answers ?? [],
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to insert discover attempt via API:", err);
      return null;
    }

    const data = await res.json();
    return (data.attempt || null) as DiscoverAttempt | null;
  } catch (err) {
    console.error("Unexpected error recording discover attempt:", err);
    return null;
  }
}
