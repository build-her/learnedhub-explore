import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase-server";
import {
  generateOpaqueToken,
  setSessionCookie,
} from "@/lib/server-session";

export const dynamic = "force-dynamic";

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "127.0.0.1";
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { code } = body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json({ error: "LearnedHub code is required" }, { status: 400 });
    }

    const raw = code.trim().toUpperCase();
    let normalized = raw;
    if (!normalized.startsWith("LH-")) {
      if (normalized.startsWith("LH")) {
        normalized = "LH-" + normalized.slice(2);
      } else {
        normalized = "LH-" + normalized;
      }
    }

    const clientIp = getClientIp(req);
    const ipHash = hashIp(clientIp);

    // 1. Check rate limit: 5 failures in the last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    try {
      const { count, error: countError } = await supabaseServer
        .from("failed_code_lookups")
        .select("id", { count: "exact", head: true })
        .eq("ip_hash", ipHash)
        .gte("attempted_at", fifteenMinutesAgo);

      if (!countError && typeof count === "number" && count >= 5) {
        return NextResponse.json(
          { error: "try again later." },
          { status: 429 }
        );
      }
    } catch (rlErr) {
      console.error("Rate limit check error:", rlErr);
    }

    // 2. Query learner by code
    const { data: learner, error: learnerErr } = await supabaseServer
      .from("learners")
      .select("id, preferred_name, learner_code")
      .or(`learner_code.eq.${normalized},learner_code.eq.${raw}`)
      .maybeSingle();

    if (learnerErr || !learner) {
      // Log failure in failed_code_lookups table
      try {
        await supabaseServer.from("failed_code_lookups").insert({
          ip_hash: ipHash,
          attempted_at: new Date().toISOString(),
        });
      } catch (logErr) {
        console.error("Failed to log failed resume attempt:", logErr);
      }

      return NextResponse.json(
        { error: "LearnedHub code not found" },
        { status: 404 }
      );
    }

    // 3. Issue new 32+ bytes opaque session token and map to learner in sessions table
    const sessionToken = generateOpaqueToken();

    const { error: sessionErr } = await supabaseServer
      .from("sessions")
      .insert({
        token: sessionToken,
        learner_id: learner.id,
        last_seen_at: new Date().toISOString(),
      });

    if (sessionErr) {
      console.error("Error creating session on resume:", sessionErr);
      return NextResponse.json({ error: "Failed to establish session" }, { status: 500 });
    }

    // 4. Return response with server-issued httpOnly, Secure, SameSite=Lax cookie
    const response = NextResponse.json({
      success: true,
      preferred_name: learner.preferred_name,
      learner_code: learner.learner_code,
    });

    setSessionCookie(response, sessionToken);
    return response;
  } catch (err) {
    console.error("Unexpected error in /api/learners/resume:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
