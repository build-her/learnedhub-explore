import { NextResponse } from "next/server";
import { getAttemptsByLearnerId } from "@/lib/discover-attempts";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const learnerId = searchParams.get("learner_id");

    if (!learnerId || learnerId.trim().length === 0) {
      return NextResponse.json(
        { error: "learner_id query parameter is required" },
        { status: 400 }
      );
    }

    const attempts = await getAttemptsByLearnerId(learnerId.trim());
    const latest = attempts.length > 0 ? attempts[0] : null;

    return NextResponse.json({
      learner_id: learnerId.trim(),
      count: attempts.length,
      latest,
      attempts,
    });
  } catch (err) {
    console.error("Error handling /api/discover/attempts GET:", err);
    return NextResponse.json(
      { error: "Failed to retrieve discover attempts" },
      { status: 500 }
    );
  }
}
