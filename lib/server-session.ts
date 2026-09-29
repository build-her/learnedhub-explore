import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase-server";

export const SESSION_COOKIE_NAME = "learnedhub_session";
export const LEGACY_LEARNER_COOKIE_NAME = "learnedhub_learner_id";
const LEARNER_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // 30 characters (no 0, 1, I, O, L)

/**
 * Generates an opaque, cryptographically random token of 32+ bytes (64 hex characters).
 */
export function generateOpaqueToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates an unambiguous learner code server-side using crypto.randomInt (format LH-XXXX).
 */
export function generateServerLearnerCode(prefix: string = "LH"): string {
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    const idx = crypto.randomInt(0, LEARNER_CHARSET.length);
    suffix += LEARNER_CHARSET[idx];
  }
  return `${prefix}-${suffix}`;
}

/**
 * Extracts the session token from the incoming request's Cookie header or Next.js cookies().
 * Never reads or trusts the legacy learnedhub_learner_id cookie.
 */
export async function getSessionToken(req?: Request): Promise<string | null> {
  if (req) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]+)`));
      if (match) {
        const val = decodeURIComponent(match[1]).trim();
        if (val && val !== "undefined" && val !== "null") return val;
      }
    }
  }

  try {
    const cookieStore = await cookies();
    const cookieVal = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (cookieVal && cookieVal.trim() && cookieVal !== "undefined" && cookieVal !== "null") {
      return cookieVal.trim();
    }
  } catch {
    // cookies() unavailable in non-request contexts
  }

  return null;
}

export interface AuthenticatedLearner {
  learner_id: string;
  preferred_name: string;
  learner_code: string;
}

/**
 * Resolves the authenticated learner strictly by mapping the opaque session token
 * through the `sessions` table to the `learners` table.
 */
export async function getLearnerFromSession(sessionToken: string | null): Promise<AuthenticatedLearner | null> {
  if (!sessionToken) return null;

  try {
    // 1. Look up session row by opaque token
    const { data: session, error: sessionErr } = await supabaseServer
      .from("sessions")
      .select("learner_id")
      .eq("token", sessionToken)
      .maybeSingle();

    if (sessionErr || !session || !session.learner_id) {
      return null;
    }

    // 2. Fetch learner record by resolved learner_id
    const { data: learner, error: learnerErr } = await supabaseServer
      .from("learners")
      .select("id, preferred_name, learner_code")
      .eq("id", session.learner_id)
      .maybeSingle();

    if (learnerErr || !learner) {
      return null;
    }

    return {
      learner_id: learner.id,
      preferred_name: learner.preferred_name,
      learner_code: learner.learner_code,
    };
  } catch (err) {
    console.error("Error resolving learner from session:", err);
    return null;
  }
}

/**
 * Sets the server-issued httpOnly, Secure, SameSite=Lax cookie on a NextResponse,
 * and actively clears any legacy client-writable cookie.
 */
export function setSessionCookie(res: NextResponse, token: string): void {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 31536000, // 1 year in seconds
  });

  // Actively clear any legacy client-writable cookie for existing visitors
  res.cookies.set({
    name: LEGACY_LEARNER_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Clears the session cookie on a NextResponse, along with any legacy cookie.
 */
export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  // Clear legacy cookie as well
  res.cookies.set({
    name: LEGACY_LEARNER_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

