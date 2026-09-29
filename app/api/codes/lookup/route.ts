import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase-server";
import { lookupFacilitatorCode } from "@/lib/facilitator-codes";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const requestedType = searchParams.get("type"); // "learner" | "access" | "facilitator" | undefined

    if (!code || code.trim().length === 0) {
      return NextResponse.json({ found: false, error: "Code is required" }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
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

    // 2. Perform code lookup
    let foundRecord: Record<string, unknown> | null = null;

    // Check Learner Code if requested or if code resembles LH code format
    const isLearnerCodeCandidate =
      requestedType === "learner" ||
      cleanCode.startsWith("LH-") ||
      cleanCode.startsWith("LH") ||
      cleanCode.length === 4;

    if (isLearnerCodeCandidate) {
      let normalized = cleanCode;
      if (!normalized.startsWith("LH-")) {
        if (normalized.startsWith("LH")) {
          normalized = "LH-" + normalized.slice(2);
        } else {
          normalized = "LH-" + normalized;
        }
      }

      const { data: learner, error: learnerErr } = await supabaseServer
        .from("learners")
        .select("preferred_name, learner_code")
        .or(`learner_code.eq.${normalized},learner_code.eq.${cleanCode}`)
        .maybeSingle();

      if (!learnerErr && learner) {
        foundRecord = {
          found: true,
          type: "learner",
          preferred_name: learner.preferred_name,
          learner_code: learner.learner_code,
          code: learner.learner_code,
        };
      }
    }

    // Check Access Code (school/cohort) if not found yet
    if (!foundRecord && requestedType !== "learner") {
      const { data: accessRecord, error: accessErr } = await supabaseServer
        .from("access_codes")
        .select("code, partner_name, school_name, cohort, created_at")
        .eq("code", cleanCode)
        .maybeSingle();

      if (!accessErr && accessRecord) {
        foundRecord = {
          found: true,
          type: "access",
          code: accessRecord.code,
          school_name: accessRecord.school_name || accessRecord.partner_name,
          cohort: accessRecord.cohort,
          access_code: accessRecord,
        };
      }
    }

    // Check Facilitator Code if still not found
    if (!foundRecord && requestedType !== "learner") {
      const facRecord = await lookupFacilitatorCode(cleanCode);
      if (facRecord) {
        foundRecord = {
          found: true,
          type: "facilitator",
          code: facRecord.code,
          school_name: facRecord.school_name,
          facilitator_name: facRecord.facilitator_name,
        };
      }
    }

    // 3. If found, return the record
    if (foundRecord) {
      return NextResponse.json(foundRecord);
    }

    // 4. Failed lookup: log failed attempt into failed_code_lookups table
    try {
      await supabaseServer.from("failed_code_lookups").insert({
        ip_hash: ipHash,
        attempted_at: new Date().toISOString(),
      });
    } catch (insertErr) {
      console.error("Failed to log failed lookup to failed_code_lookups:", insertErr);
    }

    return NextResponse.json(
      { found: false, error: "Code not found", code: cleanCode },
      { status: 404 }
    );
  } catch (err) {
    console.error("Unexpected error in /api/codes/lookup:", err);
    return NextResponse.json({ found: false, error: "Lookup failed" }, { status: 500 });
  }
}
