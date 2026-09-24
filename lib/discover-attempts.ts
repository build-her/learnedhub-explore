import { supabase } from "@/lib/supabase";
import { getSessionLearnerId, updateSessionLearner } from "@/lib/session";
import { createLearner } from "@/lib/learners";

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
 * Queries all discover attempts for a given learner_id, sorted by attempt_number descending (latest first).
 */
export async function getAttemptsByLearnerId(learnerId: string): Promise<DiscoverAttempt[]> {
  if (!learnerId) return [];

  try {
    const { data, error } = await supabase
      .from("discover_attempts")
      .select("*")
      .eq("learner_id", learnerId)
      .order("attempt_number", { ascending: false });

    if (error) {
      // Table may not exist yet or connection error
      if (error.code !== "PGRST205") {
        console.error("Error fetching discover attempts by learner_id:", error);
      }
      return [];
    }

    return (data || []) as DiscoverAttempt[];
  } catch (err) {
    console.error("Failed to query discover attempts:", err);
    return [];
  }
}

/**
 * Queries the single most recent discover attempt for a given learner_id.
 */
export async function getLatestDiscoverAttempt(learnerId: string): Promise<DiscoverAttempt | null> {
  if (!learnerId) return null;

  try {
    const { data, error } = await supabase
      .from("discover_attempts")
      .select("*")
      .eq("learner_id", learnerId)
      .order("attempt_number", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      if (error.code !== "PGRST205") {
        console.error("Error fetching latest discover attempt:", error);
      }
      return null;
    }

    return (data || null) as DiscoverAttempt | null;
  } catch (err) {
    console.error("Failed to query latest discover attempt:", err);
    return null;
  }
}

/**
 * Records a new discover attempt:
 * - Automatically computes the next attempt_number incremented from the learner's previous attempts (1 if first).
 * - Does not overwrite previous attempts.
 * - If no learner exists on the current session, automatically provisions a learner profile so the attempt is preserved.
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

    // If no learner profile is attached to this session yet, create one
    if (!learnerId) {
      const newLearner = await createLearner({
        preferred_name: "Learner",
        acquisition_source: "Direct",
        entry_point: "discover",
      });

      if (newLearner) {
        learnerId = newLearner.id;
        await updateSessionLearner(newLearner.id, {
          name: newLearner.preferred_name,
          code: newLearner.learner_code,
        });
      }
    }

    if (!learnerId) {
      console.warn("Cannot record discover attempt: no learner_id available");
      return null;
    }

    // 1. Fetch previous attempts to find the highest attempt_number
    const { data: previousAttempts, error: fetchError } = await supabase
      .from("discover_attempts")
      .select("attempt_number")
      .eq("learner_id", learnerId)
      .order("attempt_number", { ascending: false })
      .limit(1);

    if (fetchError && fetchError.code !== "PGRST205") {
      console.error("Error checking previous attempts:", fetchError);
    }

    const previousMax =
      previousAttempts && previousAttempts.length > 0 && typeof previousAttempts[0].attempt_number === "number"
        ? previousAttempts[0].attempt_number
        : 0;

    const nextAttemptNumber = previousMax + 1;

    // 2. Insert new attempt row with incremented attempt_number
    const resultPayload: DiscoverResult = {
      stream: params.stream,
      answers: params.answers ?? [],
    };

    const { data: newRow, error: insertError } = await supabase
      .from("discover_attempts")
      .insert({
        learner_id: learnerId,
        attempt_number: nextAttemptNumber,
        result: resultPayload,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Failed to insert discover attempt:", insertError);
      return null;
    }

    return newRow as DiscoverAttempt;
  } catch (err) {
    console.error("Unexpected error recording discover attempt:", err);
    return null;
  }
}
