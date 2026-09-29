import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import {
  getSessionToken,
  clearSessionCookie,
} from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const token = await getSessionToken(req);

    if (token) {
      // Clear learner_id in sessions table
      await supabaseServer
        .from("sessions")
        .update({ learner_id: null })
        .eq("token", token);
    }

    const response = NextResponse.json({ success: true });
    clearSessionCookie(response);
    return response;
  } catch (err) {
    console.error("Error in /api/learners/logout:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
