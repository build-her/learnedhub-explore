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
  reflection_text?: string;
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

export interface SharedDisplayArtifact {
  share_id: string;
  type: ArtifactType;
  created_at: string;
  first_name?: string;
  learner_name: string;
  content: ArtifactContent;
}

const SHARE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

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
 * Creates an artifact via /api/artifacts using server-side SUPABASE_SERVICE_ROLE_KEY.
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

    const res = await fetch(`${getBaseUrl()}/api/artifacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to insert artifact via API:", err);
      return null;
    }

    const data = await res.json();
    return (data.artifact || null) as Artifact | null;
  } catch (err) {
    console.error("Unexpected error creating artifact:", err);
    return null;
  }
}

/**
 * Updates an existing artifact's content via /api/artifacts.
 */
export async function updateArtifact(
  id: string,
  content: ArtifactContent
): Promise<Artifact | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/artifacts`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, content }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to update artifact via API:", err);
      return null;
    }

    const data = await res.json();
    return (data.artifact || null) as Artifact | null;
  } catch (err) {
    console.error("Unexpected error updating artifact:", err);
    return null;
  }
}

/**
 * Queries all artifacts for a given learner_id via /api/artifacts?learner_id=...
 */
export async function getArtifactsByLearnerId(learnerId: string): Promise<Artifact[]> {
  if (!learnerId) return [];

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/artifacts?learner_id=${encodeURIComponent(learnerId.trim())}`
    );

    if (!res.ok) {
      console.error("Error fetching artifacts by learner_id:", res.status);
      return [];
    }

    const data = await res.json();
    return (data.artifacts || []) as Artifact[];
  } catch (err) {
    console.error("Failed to query artifacts:", err);
    return [];
  }
}

/**
 * Queries a single shared artifact by its unique share_id via /api/share/[shareId].
 * Returns display fields ONLY; strictly omits full name, learner_id, or learner_code.
 */
export async function getArtifactByShareId(
  shareId: string
): Promise<SharedDisplayArtifact | null> {
  if (!shareId) return null;

  try {
    const cleanId = shareId.trim();
    const res = await fetch(
      `${getBaseUrl()}/api/share/${encodeURIComponent(cleanId)}`
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.type) return null;

    return {
      share_id: cleanId,
      type: data.type,
      content: data.content,
      created_at: data.created_at,
      first_name: data.first_name || undefined,
      learner_name: data.first_name || "Learner",
    };
  } catch (err) {
    console.error("Failed to query artifact by share_id:", err);
    return null;
  }
}
