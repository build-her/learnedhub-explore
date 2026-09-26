import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Exempt public dossier routes:
  // - /dossier/sample: static sample dossier (no identity check required)
  // - /dossier/share/*: shared artifact links (viewable before identity entry)
  if (pathname === "/dossier/sample" || pathname.startsWith("/dossier/share/")) {
    return NextResponse.next();
  }

  // 2. Check if the current request has a valid session with a learner_id linked
  const learnerId = request.cookies.get("learnedhub_learner_id")?.value;
  const hasValidLearner = Boolean(
    learnerId &&
    learnerId.trim().length > 0 &&
    learnerId !== "undefined" &&
    learnerId !== "null"
  );

  // 3. If no valid learner_id exists, redirect to /entry preserving originally-requested path
  if (!hasValidLearner) {
    const targetPath = pathname + (search || "");
    const redirectUrl = new URL("/entry", request.url);
    redirectUrl.searchParams.set("next", targetPath);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Support both proxy export and default export
export default proxy;

export const config = {
  matcher: [
    "/discover",
    "/discover/:path*",
    "/explore",
    "/explore/:path*",
    "/dossier",
    "/dossier/:path*",
  ],
};