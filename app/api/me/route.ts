import { NextResponse } from "next/server";
import { getSessionToken, getLearnerFromSession, LEGACY_LEARNER_COOKIE_NAME } from "@/lib/server-session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const token = await getSessionToken(req);
    const learner = await getLearnerFromSession(token);

    const payload = !learner
      ? { preferred_name: null, learner_code: null }
      : { preferred_name: learner.preferred_name, learner_code: learner.learner_code };

    const res = NextResponse.json(payload);

    // If client sent the legacy cookie, instruct the browser to delete it immediately
    const cookieHeader = req.headers.get("cookie") || "";
    if (cookieHeader.includes(LEGACY_LEARNER_COOKIE_NAME)) {
      res.cookies.set({
        name: LEGACY_LEARNER_COOKIE_NAME,
        value: "",
        path: "/",
        maxAge: 0,
      });
    }

    return res;
  } catch (err) {
    console.error("Error in GET /api/me:", err);
    return NextResponse.json(
      { preferred_name: null, learner_code: null },
      { status: 500 }
    );
  }
}
