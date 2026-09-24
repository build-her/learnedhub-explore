import { supabase } from "@/lib/supabase";
import { getSessionLearnerId } from "@/lib/session";

export type ArtifactType = "plan" | "defense";

export interface PlanContent {
  stream: string;
  stream_name: string;
  headline?: string;
  description?: string;
  attempt_number?: number;
  created_at?: string;
  learner_name?: string;
  [key: string]: unknown;
}

export interface DefenseContent {
  course_id: string;
  course_name: string;
  faculty: string;
  jamb_subjects?: string[];
  case_text: string;
  learner_name?: string;
  created_at?: string;
  [key: string]: unknown;
}

export type ArtifactContent = PlanContent | DefenseContent | Record<string, unknown>;

export interface Artifact {
  id: string;
  learner_id: string | null;
  type: ArtifactType;
  content: ArtifactContent;
  share_id: string;
  created_at: string;
}

const SHARE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/**
 * Generates an unambiguous unique short string for artifact sharing (e.g., "7K92MPXY").
 */
export function generateShareId(prefix?: string): string {
  let code = "";
  for (let i = 0; i < 8; i++) {
    const idx = Math.floor(Math.random() * SHARE_CHARSET.length);
    code += SHARE_CHARSET[idx];
  }
  return prefix ? `${prefix}-${code}` : code;
}

/**
 * Creates a server-recorded row in the `artifacts` table.
 * Also logs an `artifact_generated` event to the `events` table keyed on `learner_id`.
 */
export async function createArtifact(params: {
  learner_id?: string | null;
  type: ArtifactType;
  content: ArtifactContent;
  share_id?: string;
}): Promise<Artifact | null> {
  try {
    let learnerId = params.learner_id;
    if (!learnerId) {
      learnerId = await getSessionLearnerId();
    }

    const shareId = params.share_id || generateShareId();

    const payload = {
      learner_id: learnerId || null,
      type: params.type,
      content: params.content,
      share_id: shareId,
    };

    const { data, error } = await supabase
      .from("artifacts")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Failed to insert artifact into Supabase:", error);
      return null;
    }

    const created = data as Artifact;

    // Log artifact generation event into events table
    try {
      await supabase.from("events").insert({
        learner_id: learnerId || null,
        event_type: "artifact_generated",
        pathway: params.type === "plan" ? "discover" : "explore",
        screen: params.type === "plan" ? "discover_result" : "explore_defend",
        metadata_json: {
          artifact_id: created.id,
          share_id: created.share_id,
          artifact_type: params.type,
        },
      });
    } catch (eventErr) {
      console.warn("Could not log event to events table:", eventErr);
    }

    return created;
  } catch (err) {
    console.error("Unexpected error creating artifact:", err);
    return null;
  }
}

/**
 * Queries all artifacts for a given learner_id from Supabase, sorted newest first.
 */
export async function getArtifactsByLearnerId(learnerId: string): Promise<Artifact[]> {
  if (!learnerId) return [];

  try {
    const { data, error } = await supabase
      .from("artifacts")
      .select("*")
      .eq("learner_id", learnerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching artifacts by learner_id:", error);
      return [];
    }

    return (data || []) as Artifact[];
  } catch (err) {
    console.error("Failed to query artifacts:", err);
    return [];
  }
}

/**
 * Queries a single artifact by its unique share_id.
 */
export async function getArtifactByShareId(shareId: string): Promise<Artifact | null> {
  if (!shareId) return null;

  try {
    const { data, error } = await supabase
      .from("artifacts")
      .select("*")
      .eq("share_id", shareId.trim())
      .maybeSingle();

    if (error || !data) return null;
    return data as Artifact;
  } catch (err) {
    console.error("Failed to query artifact by share_id:", err);
    return null;
  }
}

/**
 * Queries a single artifact by its UUID.
 */
export async function getArtifactById(id: string): Promise<Artifact | null> {
  if (!id) return null;

  try {
    const { data, error } = await supabase
      .from("artifacts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return null;
    return data as Artifact;
  } catch (err) {
    console.error("Failed to query artifact by id:", err);
    return null;
  }
}
