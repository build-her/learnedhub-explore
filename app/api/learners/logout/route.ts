import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import {
  getSessionToken,
  clearSessionCookie,
  SESSION_COOKIE_NAME,
  LEGACY_LEARNER_COOKIE_NAME,
} from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let bodyToken: string | null = null;
    try {
      const body = await req.json();
      if (body && typeof body.token === "string") {
        bodyToken = body.token.trim();
      }
    } catch {
      // Body is optional
    }

    const token = (await getSessionToken(req)) || bodyToken;

    if (token) {
      // Clear learner_id in sessions table
      await supabaseServer
        .from("sessions")
        .update({ learner_id: null })
        .eq("token", token);
    }

    // Explicitly delete cookies via next/headers cookieStore
    try {
      const cookieStore = await cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
      cookieStore.delete(LEGACY_LEARNER_COOKIE_NAME);
    } catch {
      // Ignore if cookieStore is unavailable
    }

    const response = NextResponse.json({ success: true });
    clearSessionCookie(response);
    return response;
  } catch (err) {
    console.error("Error in /api/learners/logout:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const token = await getSessionToken(req);

    if (token) {
      await supabaseServer
        .from("sessions")
        .update({ learner_id: null })
        .eq("token", token);
    }

    try {
      const cookieStore = await cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
      cookieStore.delete(LEGACY_LEARNER_COOKIE_NAME);
    } catch {
      // Ignore if cookieStore is unavailable
    }

    const response = NextResponse.redirect(new URL("/entry", req.url));
    clearSessionCookie(response);
    return response;
  } catch (err) {
    console.error("Error in GET /api/learners/logout:", err);
    return NextResponse.redirect(new URL("/entry", req.url));
  }
}

