import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await logoutAdmin();
    return NextResponse.json({ success: true, redirect: "/ops/enter" }, { status: 200 });
  } catch (err) {
    console.error("Admin logout error:", err);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}

