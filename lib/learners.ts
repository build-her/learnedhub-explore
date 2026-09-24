import { supabase } from "@/lib/supabase";

export type Learner = {
  id: string;
  preferred_name: string;
  learner_code: string;
  acquisition_source: string;
  entry_point?: string | null;
  created_at: string;
};

const LEARNER_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/**
 * Generates an unambiguous 4-digit learner code (format LH-XXXX).
 */
export function generateLearnerCode(prefix: string = "LH"): string {
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * LEARNER_CHARSET.length);
    suffix += LEARNER_CHARSET[idx];
  }
  return `${prefix}-${suffix}`;
}

/**
 * Inserts a new learner record into the learners table.
 */
export async function createLearner(params: {
  preferred_name: string;
  learner_code?: string;
  acquisition_source?: string;
  entry_point?: string | null;
}): Promise<Learner | null> {
  const preferred_name = params.preferred_name?.trim();
  if (!preferred_name) {
    throw new Error("preferred_name is required");
  }

  const learner_code = params.learner_code?.trim() || generateLearnerCode();
  const acquisition_source = params.acquisition_source?.trim() || "Direct";
  const entry_point = params.entry_point?.trim() || null;

  try {
    const { data, error } = await supabase
      .from("learners")
      .insert({
        preferred_name,
        learner_code,
        acquisition_source,
        entry_point,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to insert learner:", error);
      return null;
    }

    return data as Learner;
  } catch (err) {
    console.error("Error creating learner:", err);
    return null;
  }
}

/**
 * Retrieves a learner by UUID.
 */
export async function getLearnerById(id: string): Promise<Learner | null> {
  if (!id) return null;
  try {
    const { data, error } = await supabase
      .from("learners")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return data as Learner;
  } catch (err) {
    console.error("Error fetching learner by ID:", err);
    return null;
  }
}

/**
 * Retrieves a learner by unique learner_code (supports format LH-XXXX or XXXX).
 */
export async function getLearnerByCode(code: string): Promise<Learner | null> {
  if (!code) return null;
  const raw = code.trim().toUpperCase();
  let normalized = raw;
  if (!normalized.startsWith("LH-")) {
    if (normalized.startsWith("LH")) {
      normalized = "LH-" + normalized.slice(2);
    } else {
      normalized = "LH-" + normalized;
    }
  }

  try {
    const { data, error } = await supabase
      .from("learners")
      .select("*")
      .or(`learner_code.eq.${normalized},learner_code.eq.${raw}`)
      .maybeSingle();

    if (error || !data) return null;
    return data as Learner;
  } catch (err) {
    console.error("Error fetching learner by code:", err);
    return null;
  }
}

