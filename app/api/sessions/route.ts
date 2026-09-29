import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token || !token.trim()) {
      return NextResponse.json({ error: "token parameter is required" }, { status: 400 });
    }

    const { data: session, error } = await supabaseServer
      .from("sessions")
      .select("token, learner_id, school_code, last_seen_at")
      .eq("token", token.trim())
      .maybeSingle();

    if (error) {
      console.error("Error fetching session from Supabase:", error);
      return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
    }

    return NextResponse.json({ session });
  } catch (err) {
    console.error("Unexpected error in /api/sessions GET:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from("sessions")
      .insert({ token: token.trim() });

    if (error) {
      console.error("Error creating session in Supabase:", error);
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    return NextResponse.json({ success: true, token: token.trim() });
  } catch (err) {
    console.error("Unexpected error in /api/sessions POST:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { token, last_seen_at, learner_id, school_code } = body;

    if (!token || typeof token !== "string" || !token.trim()) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {};
    if (last_seen_at !== undefined) updatePayload.last_seen_at = last_seen_at;
    if (learner_id !== undefined) updatePayload.learner_id = learner_id;
    if (school_code !== undefined) updatePayload.school_code = school_code;

    const { data, error } = await supabaseServer
      .from("sessions")
      .update(updatePayload)
      .eq("token", token.trim())
      .select("token");

    if (error) {
      console.error("Error updating session in Supabase:", error);
      return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      // Re-insert if row was missing
      await supabaseServer.from("sessions").insert({
        token: token.trim(),
        ...updatePayload,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in /api/sessions PATCH:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
