import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

interface ShareRouteProps {
  params: Promise<{ shareId: string }>;
}

function removeIdentifyingFields(obj: unknown): unknown {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map(removeIdentifyingFields);
  }

  const forbiddenKeys = new Set([
    "learner_name",
    "full_name",
    "preferred_name",
    "name",
    "email",
    "learner_id",
    "learner_code",
    "student_name",
    "user_id",
    "owner",
    "owner_row",
  ]);

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (!forbiddenKeys.has(key.toLowerCase())) {
      result[key] = removeIdentifyingFields(val);
    }
  }
  return result;
}

export async function GET(req: Request, { params }: ShareRouteProps) {
  try {
    const { shareId } = await params;

    if (!shareId || !shareId.trim()) {
      return NextResponse.json({ error: "share_id is required" }, { status: 400 });
    }

    const rawShareId = shareId.trim();

    // 1. Look up artifact by share_id using server-only service role client
    let { data: artifact, error } = await supabaseServer
      .from("artifacts")
      .select("type, content, created_at, learner_id")
      .eq("share_id", rawShareId)
      .maybeSingle();

    if (!artifact && rawShareId.toUpperCase() !== rawShareId) {
      const retry = await supabaseServer
        .from("artifacts")
        .select("type, content, created_at, learner_id")
        .eq("share_id", rawShareId.toUpperCase())
        .maybeSingle();
      if (retry.data) {
        artifact = retry.data;
        error = retry.error;
      }
    }

    if (error) {
      console.error("Error looking up artifact by share_id:", error);
      return NextResponse.json({ error: "Failed to retrieve artifact" }, { status: 500 });
    }

    if (!artifact) {
      return NextResponse.json({ error: "Artifact not found" }, { status: 404 });
    }

    const rawContent = (artifact.content as Record<string, unknown>) || {};

    // 2. Fetch ONLY the owner's preferred_name server-side; extract first name only
    let firstName: string | null = null;
    if (artifact.learner_id) {
      const { data: learner } = await supabaseServer
        .from("learners")
        .select("preferred_name")
        .eq("id", artifact.learner_id)
        .maybeSingle();

      if (learner?.preferred_name) {
        const trimmed = learner.preferred_name.trim();
        firstName = trimmed ? trimmed.split(/\s+/)[0] : null;
      }
    }

    if (!firstName && typeof rawContent.learner_name === "string" && rawContent.learner_name.trim()) {
      firstName = rawContent.learner_name.trim().split(/\s+/)[0];
    }

    // 3. Completely sanitize content: strip any full name, learner_name, email, learner_id, learner_code
    const sanitizedContent = removeIdentifyingFields(rawContent) as Record<string, unknown>;

    // 4. Return ONLY type, content, created_at, and first_name
    // NEVER return full name, learner_id, learner_code, email, or owner row
    return NextResponse.json({
      type: artifact.type,
      content: sanitizedContent,
      created_at: artifact.created_at,
      first_name: firstName,
    });
  } catch (err) {
    console.error("Unexpected error in /api/share/[shareId]:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
