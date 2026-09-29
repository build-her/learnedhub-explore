import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { getSessionToken, getLearnerFromSession } from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { event_type, pathway, screen, metadata_json } = body;

    if (!event_type || !screen) {
      return NextResponse.json(
        { error: "event_type and screen are required" },
        { status: 400 }
      );
    }

    // Derive learner strictly from the httpOnly session token; NEVER accept learner_id from request body
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);
    // Accepts anonymous events (null learner) for visitors on shared links or new visitors
    const resolvedLearnerId = learner ? learner.learner_id : null;

    const rawPathway = typeof pathway === "string" ? pathway.trim().toLowerCase() : "discover";
    const resolvedPathway =
      rawPathway === "explore" || rawPathway === "build" ? rawPathway : "discover";

    const payload = {
      event_type,
      pathway: resolvedPathway,
      screen: String(screen).trim(),
      metadata_json: metadata_json ?? null,
      learner_id: resolvedLearnerId,
    };

    const { error } = await supabaseServer.from("events").insert(payload);

    if (error) {
      console.error("Error logging event in Supabase:", error);
      return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in /api/events POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
