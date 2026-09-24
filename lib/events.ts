import { supabase } from "@/lib/supabase";
import { getSessionLearnerId } from "@/lib/session";

export type EventType =
  | "session_started"
  | "pathway_started"
  | "screen_viewed"
  | "pathway_completed"
  | "artifact_generated"
  | "artifact_shared"
  | "artifact_opened_via_share";

export type PathwayName = "discover" | "explore" | "build";

export interface LogEventParams {
  event_type: EventType;
  pathway?: string | null;
  screen: string;
  metadata_json?: Record<string, unknown> | null;
  learner_id?: string | null;
}

/**
 * Inserts an event record into the `events` table in Supabase.
 * Enforces that:
 * - Each insert carries the learner_id from the current session if not explicitly provided.
 * - The `screen` column is always populated with a specific, human-readable screen identifier.
 * - The `pathway` column is always populated (one of 'discover', 'explore', 'build').
 */
export async function logEvent(params: LogEventParams): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    let learnerId = params.learner_id;
    if (learnerId === undefined) {
      learnerId = await getSessionLearnerId();
    }

    // Ensure valid non-null pathway: default to 'discover' if unspecified
    const rawPathway = params.pathway?.trim().toLowerCase();
    const resolvedPathway: PathwayName =
      rawPathway === "explore" || rawPathway === "build" ? rawPathway : "discover";

    // Ensure non-empty screen identifier
    const resolvedScreen = params.screen?.trim() || "home";

    const payload = {
      event_type: params.event_type,
      pathway: resolvedPathway,
      screen: resolvedScreen,
      metadata_json: params.metadata_json ?? null,
      learner_id: learnerId ?? null,
    };

    const { error } = await supabase.from("events").insert(payload);

    if (error) {
      console.error("Failed to log event:", params.event_type, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error logging event:", params.event_type, err);
    return false;
  }
}

/**
 * Resolves specific, human-readable screen identifiers and pathway names
 * matching the distinct screens and steps across Discover, Explore, and Build.
 */
export function resolveScreenAndPathway(
  pathname: string,
  searchParams?: URLSearchParams | null
): {
  screen: string;
  pathway: PathwayName;
} {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  // Home Page
  if (cleanPath === "/") {
    return { screen: "home", pathway: "discover" };
  }

  // Entry Screen (Intro step per pathway)
  if (cleanPath === "/entry") {
    const nextParam = searchParams?.get("next");
    if (nextParam === "explore") {
      return { screen: "explore_intro", pathway: "explore" };
    }
    if (nextParam === "build") {
      return { screen: "build_intro", pathway: "build" };
    }
    return { screen: "discover_intro", pathway: "discover" };
  }

  // Discover Pathway
  if (cleanPath === "/discover") {
    const stepParam = searchParams?.get("step");
    const stepNum = stepParam ? parseInt(stepParam, 10) : 1;
    return {
      screen: `discover_question_${stepNum}`,
      pathway: "discover",
    };
  }

  if (cleanPath === "/discover/result") {
    return { screen: "discover_result", pathway: "discover" };
  }

  // Explore Pathway
  if (cleanPath === "/explore") {
    return { screen: "explore_pathway_list", pathway: "explore" };
  }

  if (cleanPath.startsWith("/explore/") && cleanPath.endsWith("/defend")) {
    return { screen: "explore_defend", pathway: "explore" };
  }

  if (cleanPath.startsWith("/explore/")) {
    return { screen: "explore_course_detail", pathway: "explore" };
  }

  // Build Pathway
  if (cleanPath === "/build") {
    return { screen: "build_challenge", pathway: "build" };
  }

  // Dossier Portfolio Screen
  if (cleanPath === "/dossier") {
    return { screen: "dossier", pathway: "discover" };
  }

  // Shared Artifact View
  if (cleanPath.startsWith("/dossier/share/")) {
    return { screen: "dossier_share", pathway: "discover" };
  }

  // Admin screen
  if (cleanPath === "/admin/codes") {
    return { screen: "admin_codes", pathway: "explore" };
  }

  const segment = cleanPath.split("/")[1] || "home";
  return { screen: segment, pathway: "discover" };
}
