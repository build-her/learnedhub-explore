import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import {
  generateOpaqueToken,
  generateServerLearnerCode,
  setSessionCookie,
  getSessionToken,
  getLearnerFromSession,
} from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const token = await getSessionToken(req);
    const currentLearner = await getLearnerFromSession(token);

    if (!currentLearner) {
      return NextResponse.json({ learner: null }, { status: 200 });
    }

    return NextResponse.json({
      learner: {
        preferred_name: currentLearner.preferred_name,
        learner_code: currentLearner.learner_code,
      },
    });
  } catch (err) {
    console.error("Error in /api/learners GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { preferred_name, acquisition_source, entry_point } = body;

    // Never accept learner_id from request body
    if (!preferred_name || typeof preferred_name !== "string" || !preferred_name.trim()) {
      return NextResponse.json({ error: "preferred_name is required" }, { status: 400 });
    }

    // 1. Generate learner code server-side with crypto.randomInt
    const learner_code = generateServerLearnerCode();

    const payload = {
      preferred_name: preferred_name.trim(),
      learner_code,
      acquisition_source: typeof acquisition_source === "string" ? acquisition_source.trim() : "Direct",
      entry_point: typeof entry_point === "string" ? entry_point.trim() : null,
    };

    // 2. Insert into learners table using server-only service role client
    const { data: newLearner, error: learnerErr } = await supabaseServer
      .from("learners")
      .insert(payload)
      .select("id, preferred_name, learner_code")
      .single();

    if (learnerErr || !newLearner) {
      console.error("Error creating learner in Supabase:", learnerErr);
      return NextResponse.json({ error: "Failed to create learner profile" }, { status: 500 });
    }

    // 3. Generate a 32+ bytes crypto-random opaque session token and map to learner
    const sessionToken = generateOpaqueToken();

    const { error: sessionErr } = await supabaseServer
      .from("sessions")
      .insert({
        token: sessionToken,
        learner_id: newLearner.id,
        last_seen_at: new Date().toISOString(),
      });

    if (sessionErr) {
      console.error("Error mapping session in Supabase:", sessionErr);
      return NextResponse.json({ error: "Failed to establish session" }, { status: 500 });
    }

    // 4. Return response with server-issued httpOnly, Secure, SameSite=Lax cookie
    const response = NextResponse.json({
      success: true,
      preferred_name: newLearner.preferred_name,
      learner_code: newLearner.learner_code,
    });

    setSessionCookie(response, sessionToken);
    return response;
  } catch (err) {
    console.error("Unexpected error in /api/learners POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
