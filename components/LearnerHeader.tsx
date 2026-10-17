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

  useEffect(() => {
    // If admin or ops, do not query or display learner data
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/ops")) {
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
  }, [pathname]);

  // Strictly do not render on admin or ops routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/ops")) {
    return null;
  }

  const handleStartFresh = () => {
    try {
      clearLegacyLearnerIdCookie();
      localStorage.removeItem("learnedhub_learner_name");
      localStorage.removeItem("learnedhub_learner_code");
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore
    }
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

          {/* Visible 'Not you? Start fresh' control calling the logout server route */}
          <a
            href="/api/learners/logout"
            onClick={handleStartFresh}
            className="type-caption px-sm py-1 rounded border border-line text-muted hover:text-discover hover:border-discover transition-colors font-medium whitespace-nowrap cursor-pointer"
            title="Clear session, delete database row, and start fresh"
          >
            Not you? Start fresh
          </a>
        </div>
      </div>
    </header>
  );
}

