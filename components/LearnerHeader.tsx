"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clearLegacyLearnerIdCookie, SESSION_STORAGE_KEY } from "@/lib/session";

interface LearnerInfo {
  name?: string;
  code?: string;
}

export default function LearnerHeader() {
  const pathname = usePathname();
  const [learner, setLearner] = useState<LearnerInfo | null>(null);

  // Check if current route renders inside LearnerShell
  const isShellRoute =
    pathname === "/discover" ||
    pathname?.startsWith("/discover/") ||
    pathname === "/explore" ||
    pathname?.startsWith("/explore/") ||
    pathname === "/dossier" ||
    pathname === "/build" ||
    pathname?.startsWith("/build/") ||
    pathname === "/shell-test" ||
    pathname?.startsWith("/shell-test/");

  // Reload page if restored from browser BFCache to prevent showing old learner session
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    // If admin, ops, or shell route, do not query or display learner data
    if (
      pathname?.startsWith("/admin") ||
      pathname?.startsWith("/ops") ||
      isShellRoute
    ) {
      return;
    }

    // 1. Read cached learner identity for instant UI rendering
    try {
      const cachedName = localStorage.getItem("learnedhub_learner_name");
      const cachedCode = localStorage.getItem("learnedhub_learner_code");
      if (cachedName || cachedCode) {
        setLearner({
          name: cachedName || undefined,
          code: cachedCode || undefined,
        });
      }
    } catch {
      // Ignore localStorage errors
    }

    // 2. Verify with /api/me to match server-side session state
    let isMounted = true;
    async function checkActiveLearner() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data && (data.learner_code || data.preferred_name)) {
              setLearner({
                name: data.preferred_name || undefined,
                code: data.learner_code || undefined,
              });
            } else {
              setLearner(null);
            }
          }
        }
      } catch {
        // Ignore network errors
      }
    }

    checkActiveLearner();

    return () => {
      isMounted = false;
    };
  }, [pathname, isShellRoute]);

  // Strictly do not render on admin, ops, or shell routes
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/ops") ||
    isShellRoute
  ) {
    return null;
  }

  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      clearLegacyLearnerIdCookie();
      localStorage.removeItem("learnedhub_learner_name");
      localStorage.removeItem("learnedhub_learner_code");
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
    window.location.replace("/api/learners/logout");
  };

  return (
    <header className="w-full bg-surface-base border-b border-line sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-md py-sm flex items-center justify-between gap-sm">
        <div className="flex items-center gap-md">
          <Link
            href="/"
            className="type-h2 text-discover font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            LearnedHub
          </Link>
          {learner?.name && (
            <span className="hidden sm:inline-flex items-center gap-xs px-sm py-0.5 rounded-full bg-discover-tint text-discover text-xs font-semibold border border-discover-border">
              {learner.name}
              {learner.code ? ` (${learner.code})` : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-sm sm:gap-md">
          <Link
            href="/dossier/sample"
            className="type-caption text-main font-semibold hover:text-discover hidden sm:inline transition-colors"
          >
            Sample Dossier
          </Link>

          {/* Visible Log out control calling the logout server route */}
          {learner?.name && (
            <button
              type="button"
              onClick={handleLogout}
              className="type-caption px-sm py-1 rounded border border-line text-muted hover:text-red-600 hover:border-red-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
              title="Log out"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
