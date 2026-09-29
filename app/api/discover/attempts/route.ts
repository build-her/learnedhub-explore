import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { getSessionToken, getLearnerFromSession } from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latestOnly = searchParams.get("latest") === "true";

    // Derive learner strictly from the httpOnly session token; NEVER accept learner_id from query
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    if (!learner) {
      return NextResponse.json({
        attempts: [],
        latest: null,
        attempt: null,
      });
    }

    if (latestOnly) {
      const { data: latest, error } = await supabaseServer
        .from("discover_attempts")
        .select("id, attempt_number, result, created_at")
        .eq("learner_id", learner.learner_id)
        .order("attempt_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== "PGRST205") {
        console.error("Error fetching latest discover attempt:", error);
      }

      return NextResponse.json({ attempt: latest || null });
    }

    const { data: attempts, error } = await supabaseServer
      .from("discover_attempts")
      .select("id, attempt_number, result, created_at")
      .eq("learner_id", learner.learner_id)
      .order("attempt_number", { ascending: false });

    if (error && error.code !== "PGRST205") {
      console.error("Error fetching discover attempts:", error);
      return NextResponse.json(
        { error: "Failed to retrieve discover attempts" },
        { status: 500 }
      );
    }

    const attemptsList = attempts || [];
    const latest = attemptsList.length > 0 ? attemptsList[0] : null;

    return NextResponse.json({
      count: attemptsList.length,
      latest,
      attempts: attemptsList,
    });
  } catch (err) {
    console.error("Error handling /api/discover/attempts GET:", err);
    return NextResponse.json(
      { error: "Failed to retrieve discover attempts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { stream, answers } = body;

    if (!stream) {
      return NextResponse.json(
        { error: "stream is required" },
        { status: 400 }
      );
    }

    // Derive learner strictly from the httpOnly session token; NEVER accept learner_id from request body
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    if (!learner) {
      return NextResponse.json(
        { error: "Active learner session required to record discover attempt" },
        { status: 401 }
      );
    }

    // 1. Fetch previous attempts to find the highest attempt_number for this learner
    const { data: previousAttempts, error: fetchError } = await supabaseServer
      .from("discover_attempts")
      .select("attempt_number")
      .eq("learner_id", learner.learner_id)
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
    const resultPayload = {
      stream,
      answers: answers ?? [],
    };

    const { data: newRow, error: insertError } = await supabaseServer
      .from("discover_attempts")
      .insert({
        learner_id: learner.learner_id,
        attempt_number: nextAttemptNumber,
        result: resultPayload,
      })
      .select("id, attempt_number, result, created_at")
      .single();

    if (insertError) {
      console.error("Failed to insert discover attempt:", insertError);
      return NextResponse.json(
        { error: "Failed to record discover attempt" },
        { status: 500 }
      );
    }

    return NextResponse.json({ attempt: newRow });
  } catch (err) {
    console.error("Unexpected error recording discover attempt:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
