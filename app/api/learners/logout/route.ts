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

function applyNoCacheHeaders(response: NextResponse): NextResponse {
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  return response;
}

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
      // Delete session row in sessions table
      await supabaseServer
        .from("sessions")
        .delete()
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

    const response = NextResponse.redirect(new URL("/", req.url), 303);
    clearSessionCookie(response);
    return applyNoCacheHeaders(response);
  } catch (err) {
    console.error("Error in /api/learners/logout POST:", err);
    const response = NextResponse.redirect(new URL("/", req.url), 303);
    clearSessionCookie(response);
    return applyNoCacheHeaders(response);
  }
}

export async function GET(req: Request) {
  try {
    const token = await getSessionToken(req);

    if (token) {
      // Delete session row in sessions table
      await supabaseServer
        .from("sessions")
        .delete()
        .eq("token", token);
    }

    try {
      const cookieStore = await cookies();
      cookieStore.delete(SESSION_COOKIE_NAME);
      cookieStore.delete(LEGACY_LEARNER_COOKIE_NAME);
    } catch {
      // Ignore if cookieStore is unavailable
    }

    const response = NextResponse.redirect(new URL("/", req.url), 302);
    clearSessionCookie(response);
    return applyNoCacheHeaders(response);
  } catch (err) {
    console.error("Error in GET /api/learners/logout:", err);
    const response = NextResponse.redirect(new URL("/", req.url), 302);
    clearSessionCookie(response);
    return applyNoCacheHeaders(response);
  }
}
