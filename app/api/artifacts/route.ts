import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { getSessionToken, getLearnerFromSession } from "@/lib/server-session";
import { generateShareId } from "@/lib/artifacts";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    if (!learner) {
      return NextResponse.json({ artifacts: [] });
    }

    const { data: artifacts, error } = await supabaseServer
      .from("artifacts")
      .select("id, type, content, share_id, created_at")
      .eq("learner_id", learner.learner_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching artifacts by learner_id:", error);
      return NextResponse.json({ error: "Failed to fetch artifacts" }, { status: 500 });
    }

    return NextResponse.json({ artifacts: artifacts || [] });
  } catch (err) {
    console.error("Unexpected error in /api/artifacts GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, content, share_id } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: "type and content are required" },
        { status: 400 }
      );
    }

    // Derive learner strictly from the httpOnly session token; NEVER accept learner_id from request body
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    if (!learner) {
      return NextResponse.json(
        { error: "Active learner session required to save artifacts" },
        { status: 401 }
      );
    }

    const resolvedShareId = (typeof share_id === "string" && share_id.trim()) || generateShareId();

    const payload = {
      learner_id: learner.learner_id,
      type,
      content,
      share_id: resolvedShareId,
    };

    const { data: createdArtifact, error } = await supabaseServer
      .from("artifacts")
      .insert(payload)
      .select("id, type, content, share_id, created_at")
      .single();

    if (error || !createdArtifact) {
      console.error("Error inserting artifact into Supabase:", error);
      return NextResponse.json({ error: "Failed to create artifact" }, { status: 500 });
    }

    // Log artifact generation event into events table
    try {
      await supabaseServer.from("events").insert({
        learner_id: learner.learner_id,
        event_type: "artifact_generated",
        pathway: type === "plan" ? "discover" : "explore",
        screen: type === "plan" ? "discover_result" : "explore_defend",
        metadata_json: {
          artifact_id: createdArtifact.id,
          share_id: createdArtifact.share_id,
          artifact_type: type,
        },
      });
    } catch (eventErr) {
      console.warn("Could not log event in /api/artifacts:", eventErr);
    }

    return NextResponse.json({ artifact: createdArtifact });
  } catch (err) {
    console.error("Unexpected error in /api/artifacts POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, content } = body;

    if (!id || !content) {
      return NextResponse.json({ error: "id and content are required" }, { status: 400 });
    }

    // Derive learner strictly from the httpOnly session token
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    if (!learner) {
      return NextResponse.json(
        { error: "Active learner session required to update artifacts" },
        { status: 401 }
      );
    }

    // Ensure learner can only update artifacts that belong to their own learner_id
    const { data: updatedArtifact, error } = await supabaseServer
      .from("artifacts")
      .update({ content })
      .eq("id", id)
      .eq("learner_id", learner.learner_id)
      .select("id, type, content, share_id, created_at")
      .single();

    if (error || !updatedArtifact) {
      console.error("Error updating artifact in Supabase:", error);
      return NextResponse.json({ error: "Failed to update artifact" }, { status: 500 });
    }

    return NextResponse.json({ artifact: updatedArtifact });
  } catch (err) {
    console.error("Unexpected error in /api/artifacts PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
