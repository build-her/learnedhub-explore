import { NextResponse } from "next/server";
import {
  getAllFacilitatorCodes,
  createFacilitatorCodes,
} from "@/lib/facilitator-codes";

export const dynamic = "force-dynamic";

function isAuthorized(req: Request): boolean {
  const expectedKey = process.env.ADMIN_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!expectedKey) {
    console.error("ADMIN_API_KEY or SUPABASE_SERVICE_ROLE_KEY is not configured");
    return false;
  }

  // Check x-admin-key header
  const adminKeyHeader = req.headers.get("x-admin-key");
  if (adminKeyHeader && adminKeyHeader.trim() === expectedKey) {
    return true;
  }

  // Check Authorization: Bearer <key>
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1].trim() === expectedKey) {
      return true;
    }
  }

  return false;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin credentials required." },
      { status: 401 }
    );
  }

  try {
    const codes = await getAllFacilitatorCodes();
    return NextResponse.json({ codes });
  } catch (err) {
    console.error("Failed to fetch codes:", err);
    return NextResponse.json({ error: "Failed to fetch codes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized. Admin credentials required." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const count = typeof body.count === "number" ? body.count : 1;
    const school_name = typeof body.school_name === "string" ? body.school_name : undefined;
    const facilitator_name = typeof body.facilitator_name === "string" ? body.facilitator_name : undefined;
    const notes = typeof body.notes === "string" ? body.notes : undefined;

    const newCodes = await createFacilitatorCodes({
      count,
      school_name,
      facilitator_name,
      notes,
    });

    return NextResponse.json({ success: true, codes: newCodes });
  } catch (err) {
    console.error("Failed to create codes:", err);
    return NextResponse.json({ error: "Failed to generate codes" }, { status: 500 });
  }
}
