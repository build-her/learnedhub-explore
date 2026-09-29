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

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Inserts an event record via /api/events using server-side SUPABASE_SERVICE_ROLE_KEY.
 */
export async function logEvent(params: LogEventParams): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    let learnerId = params.learner_id;
    if (learnerId === undefined) {
      learnerId = await getSessionLearnerId();
    }

    const rawPathway = params.pathway?.trim().toLowerCase();
    const resolvedPathway: PathwayName =
      rawPathway === "explore" || rawPathway === "build" ? rawPathway : "discover";

    const resolvedScreen = params.screen?.trim() || "home";

    const payload = {
      event_type: params.event_type,
      pathway: resolvedPathway,
      screen: resolvedScreen,
      metadata_json: params.metadata_json ?? null,
      learner_id: learnerId ?? null,
    };

    const res = await fetch(`${getBaseUrl()}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
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
    return { screen: "discover_intro", pathway: "discover" };
  }

  if (cleanPath === "/discover/quiz") {
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
    return { screen: "explore_intro", pathway: "explore" };
  }

  if (cleanPath === "/explore/courses") {
    return { screen: "explore_pathway_list", pathway: "explore" };
  }

  if (cleanPath.startsWith("/explore/") && cleanPath.endsWith("/defend")) {
    return { screen: "explore_defend", pathway: "explore" };
  }

  if (cleanPath.startsWith("/explore/")) {
    return { screen: "explore_course_detail", pathway: "explore" };
  }

  // Shared Coming Soon Screen (Build / Courses / Learn)
  if (
    cleanPath === "/coming-soon" ||
    cleanPath === "/build" ||
    cleanPath === "/courses" ||
    cleanPath === "/learn"
  ) {
    return { screen: "coming_soon", pathway: "build" };
  }

  // Dossier Portfolio Screen
  if (cleanPath === "/dossier") {
    return { screen: "dossier", pathway: "discover" };
  }

  // Sample Dossier Screen
  if (cleanPath === "/dossier/sample") {
    return { screen: "dossier_sample", pathway: "discover" };
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
