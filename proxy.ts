import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Helper to strip the legacy learnedhub_learner_id cookie from existing visitors
  const sanitizeCookies = (res: NextResponse) => {
    if (request.cookies.has("learnedhub_learner_id")) {
      res.cookies.set({
        name: "learnedhub_learner_id",
        value: "",
        path: "/",
        maxAge: 0,
      });
    }
    return res;
  };

  // 1. Exempt public dossier routes:
  // - /dossier/sample: static sample dossier (no identity check required)
  // - /dossier/share/*: shared artifact links (viewable before identity entry)
  if (pathname === "/dossier/sample" || pathname.startsWith("/dossier/share/")) {
    return sanitizeCookies(NextResponse.next());
  }

  // 2. Check if the current request has a valid server-issued session cookie (learnedhub_session)
  // All identity checks strictly rely on the httpOnly learnedhub_session cookie; never learnedhub_learner_id
  const sessionToken = request.cookies.get("learnedhub_session")?.value;
  const hasValidSession = Boolean(
    sessionToken &&
    sessionToken.trim().length > 0 &&
    sessionToken !== "undefined" &&
    sessionToken !== "null"
  );

  // 3. If no valid session exists, redirect to /entry preserving originally-requested path
  if (!hasValidSession) {
    const targetPath = pathname + (search || "");
    const redirectUrl = new URL("/entry", request.url);
    redirectUrl.searchParams.set("next", targetPath);
    return sanitizeCookies(NextResponse.redirect(redirectUrl));
  }

  return sanitizeCookies(NextResponse.next());
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