import { NextResponse } from "next/server";
import {
  getAllFacilitatorCodes,
  createFacilitatorCodes,
} from "@/lib/facilitator-codes";

export async function GET() {
  try {
    const codes = await getAllFacilitatorCodes();
    return NextResponse.json({ codes });
  } catch (err) {
    console.error("Failed to fetch codes:", err);
    return NextResponse.json({ error: "Failed to fetch codes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

