import { NextResponse } from "next/server";
import { lookupFacilitatorCode } from "@/lib/facilitator-codes";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code || code.trim().length === 0) {
      return NextResponse.json({ found: false, error: "Code is required" }, { status: 400 });
    }

    const record = await lookupFacilitatorCode(code);

    if (!record) {
      return NextResponse.json({ found: false, code: code.trim().toUpperCase() });
    }

    return NextResponse.json({
      found: true,
      code: record.code,
      school_name: record.school_name,
      facilitator_name: record.facilitator_name,
    });
  } catch (err) {
    console.error("Code lookup error:", err);
    return NextResponse.json({ found: false, error: "Lookup failed" }, { status: 500 });
  }
}

