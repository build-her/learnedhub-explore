"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearLegacyLearnerIdCookie, SESSION_STORAGE_KEY } from "@/lib/session";
import { logEvent, resolveScreenAndPathway } from "@/lib/events";

interface LearnerProfile {
  name: string | null;
  code: string | null;
}

interface LearnerShellProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export default function LearnerShell({
  children,
  defaultCollapsed,
}: LearnerShellProps) {
  const pathname = usePathname();

  // Desktop sidebar collapse state
  // On /discover or /discover/quiz while questions are showing, default to collapsed
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (defaultCollapsed !== undefined) return defaultCollapsed;
    return pathname === "/discover" || pathname === "/discover/quiz";
  });
  // Mobile drawer open state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Learner profile state from /api/me
  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [loadingLearner, setLoadingLearner] = useState(true);

  // 1. Manage sidebar collapse state across navigation:
  // On /discover while questions are showing, start collapsed on desktop and closed on phone.
  // On other pages, keep normal behavior (restore user preference from localStorage or default open).
  useEffect(() => {
    const isQuizRoute =
      pathname === "/discover" || pathname === "/discover/quiz";

    if (defaultCollapsed !== undefined) {
      setIsCollapsed(defaultCollapsed);
      setIsMobileOpen(false);
      return;
    }

    if (isQuizRoute) {
      setIsCollapsed(true);
      setIsMobileOpen(false);
    } else {
      try {
        const stored = localStorage.getItem("learnedhub_sidebar_collapsed");
        if (stored !== null) {
          setIsCollapsed(stored === "true");
        } else {
          setIsCollapsed(false);
        }
      } catch {
        setIsCollapsed(false);
      }
      setIsMobileOpen(false);
    }
  }, [pathname, defaultCollapsed]);

  // 2. Fetch learner session info from /api/me
  useEffect(() => {
    let isMounted = true;
    async function loadLearner() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data && (data.preferred_name || data.learner_code)) {
              setLearner({
                name: data.preferred_name || null,
                code: data.learner_code || null,
              });
            } else {
              setLearner(null);
            }
          }
        } else {
          if (isMounted) setLearner(null);
        }
      } catch {
        if (isMounted) setLearner(null);
      } finally {
        if (isMounted) setLoadingLearner(false);
      }
    }

    loadLearner();
    return () => {
      isMounted = false;
    };
  }, []);

  // Log sidebar toggle event (open or collapsed, phone or desktop)
  // Does not log automatic starting state
  const logSidebarToggle = (state: "open" | "collapsed", device: "phone" | "desktop") => {
    try {
      const { screen, pathway } = resolveScreenAndPathway(pathname);
      logEvent({
        event_type: "sidebar_toggled",
        screen,
        pathway,
        metadata_json: {
          state,
          device,
        },
      });
    } catch (err) {
      console.error("Error logging sidebar_toggled event:", err);
    }
  };

  const handleOpenMobile = () => {
    setIsMobileOpen(true);
    logSidebarToggle("open", "phone");
  };

  const handleCloseMobile = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
      logSidebarToggle("collapsed", "phone");
    }
  };

  // 3. Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
        logSidebarToggle("collapsed", "phone");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Handle logout: clear client session storage and redirect to server logout endpoint
  // Using replace navigation ensures the learner page is replaced in browser history
  const handleLogout = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      clearLegacyLearnerIdCookie();
      localStorage.removeItem("learnedhub_learner_name");
      localStorage.removeItem("learnedhub_learner_code");
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    window.location.replace("/api/learners/logout");
  };

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

  // Toggle desktop collapsed state and persist to localStorage
  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      const isQuizRoute =
        pathname === "/discover" || pathname === "/discover/quiz";
      // Only persist to localStorage on normal pages so quiz collapse doesn't overwrite normal preference
      if (!isQuizRoute && defaultCollapsed === undefined) {
        try {
          localStorage.setItem("learnedhub_sidebar_collapsed", String(next));
        } catch {
          // Ignore storage write errors
        }
      }
      logSidebarToggle(next ? "collapsed" : "open", "desktop");
      return next;
    });
  };

  // Check if a path is currently active
  const isPathActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Navigation items definition
  const navItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
      isLink: true,
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      ),
    },
    {
      id: "discover",
      label: "Discover",
      href: "/discover",
      isLink: true,
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <polygon
            points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "explore",
      label: "Explore",
      href: "/explore",
      isLink: true,
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      id: "dossier",
      label: "Dossier",
      href: "/dossier",
      isLink: true,
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: "build",
      label: "Build",
      href: "#",
      isLink: false,
      badge: "Coming soon",
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface-tint text-main">
      {/* =================================================================== */}
      {/* 1. MOBILE SLIM TOP BAR (< 768px) */}
      {/* =================================================================== */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-2.5 bg-surface-base border-b border-line shadow-xs">
        <div className="flex items-center gap-3">
          {/* Menu button with large 44x44 tap target */}
          <button
            type="button"
            onClick={handleOpenMobile}
            className="w-11 h-11 flex items-center justify-center rounded-lg border border-line text-main hover:bg-surface-tint active:bg-line/40 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
            aria-expanded={isMobileOpen}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link
            href="/"
            className="type-h2 text-discover font-bold tracking-tight hover:opacity-90"
          >
            LearnedHub
          </Link>
        </div>

        {/* Mobile top bar right indicator */}
        <div className="flex items-center">
          {learner?.name ? (
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-discover-tint text-discover border border-discover-border">
              {learner.code || learner.name}
            </span>
          ) : (
            <Link
              href="/entry"
              className="type-caption font-semibold px-3 py-1.5 rounded-full bg-discover text-surface-base hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
          )}
        </div>
      </header>

      {/* =================================================================== */}
      {/* 2. MOBILE DRAWER OVERLAY & OFF-CANVAS SIDEBAR (< 768px) */}
      {/* =================================================================== */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop - tap outside to close */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={handleCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <aside
            className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] bg-surface-base border-r border-line z-50 flex flex-col justify-between shadow-2xl transition-transform"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-line">
              <Link
                href="/"
                onClick={handleCloseMobile}
                className="type-h2 text-discover font-bold tracking-tight"
              >
                LearnedHub
              </Link>

              {/* Close Button with large 44x44 tap target */}
              <button
                type="button"
                onClick={handleCloseMobile}
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-line text-muted hover:text-main hover:bg-surface-tint active:bg-line/40 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer Nav Items */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const active = item.isLink && isPathActive(item.href);

                if (!item.isLink) {
                  return (
                    <div
                      key={item.id}
                      className="min-h-[52px] px-3.5 py-3 rounded-lg flex items-center justify-between text-muted/70 bg-surface-tint/50 border border-transparent cursor-not-allowed select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-muted/60">{item.icon}</span>
                        <span className="type-body font-medium text-muted/70">
                          {item.label}
                        </span>
                      </div>
                      <span className="type-caption font-semibold px-2 py-0.5 rounded text-[11px] bg-line/80 text-muted uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleCloseMobile}
                    className={`min-h-[52px] px-3.5 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      active
                        ? "bg-discover-tint text-discover font-semibold border-l-4 border-discover shadow-xs"
                        : "text-main hover:bg-surface-tint hover:text-discover font-medium"
                    }`}
                  >
                    <span className={active ? "text-discover" : "text-muted"}>
                      {item.icon}
                    </span>
                    <span className="type-body">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-line bg-surface-tint/60 flex flex-col gap-2">
              {loadingLearner ? (
                <div className="py-2 text-center text-xs text-muted">
                  Checking session...
                </div>
              ) : learner?.name || learner?.code ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 bg-surface-base border border-line rounded-lg p-2.5">
                    <div className="flex flex-col min-w-0">
                      <span className="type-caption text-main font-bold truncate">
                        {learner.name || "Learner"}
                      </span>
                      {learner.code && (
                        <span className="font-mono text-xs text-discover font-semibold">
                          {learner.code}
                        </span>
                      )}
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Active session" />
                  </div>

                  {/* Log out button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="min-h-[44px] w-full flex items-center justify-center rounded-lg border border-line bg-surface-base text-xs font-semibold text-muted hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  href="/entry"
                  onClick={handleCloseMobile}
                  className="min-h-[48px] w-full flex items-center justify-center rounded-lg bg-discover text-surface-base type-body font-semibold hover:opacity-90 transition-opacity text-center shadow-xs"
                >
                  Get started →
                </Link>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. DESKTOP SIDEBAR (>= 768px) */}
      {/* =================================================================== */}
      <aside
        className={`hidden md:flex sticky top-0 h-screen shrink-0 flex-col justify-between border-r border-line bg-surface-base transition-all duration-200 ease-in-out z-20 ${
          isCollapsed ? "w-[72px]" : "w-[260px]"
        }`}
        aria-label="Desktop Sidebar Navigation"
      >
        {/* Top Branding & Collapse/Expand Toggle */}
        <div className="px-3.5 py-4 border-b border-line flex items-center justify-between gap-2">
          {!isCollapsed && (
            <Link
              href="/"
              className="type-h2 text-discover font-bold tracking-tight truncate hover:opacity-90"
            >
              LearnedHub
            </Link>
          )}

          {isCollapsed && (
            <Link
              href="/"
              className="font-serif font-bold text-xl text-discover mx-auto"
              title="LearnedHub — Home"
            >
              LH
            </Link>
          )}

          {/* Collapse/Expand Toggle Button */}
          <button
            type="button"
            onClick={handleToggleCollapse}
            className={`w-9 h-9 flex items-center justify-center rounded-lg border border-line text-muted hover:text-main hover:bg-surface-tint active:bg-line/40 transition-colors cursor-pointer shrink-0 ${
              isCollapsed ? "mx-auto" : ""
            }`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              // Expand icon (Chevron Right)
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            ) : (
              // Collapse icon (Chevron Left)
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = item.isLink && isPathActive(item.href);

            if (!item.isLink) {
              return (
                <div
                  key={item.id}
                  title={isCollapsed ? `${item.label} (Coming soon)` : undefined}
                  className={`min-h-[44px] rounded-lg flex items-center text-muted/65 select-none cursor-not-allowed ${
                    isCollapsed
                      ? "justify-center p-2.5"
                      : "justify-between px-3 py-2.5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-muted/60">{item.icon}</span>
                    {!isCollapsed && (
                      <span className="type-body text-sm font-medium text-muted/70 truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-line/70 text-muted shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={`min-h-[44px] rounded-lg flex items-center transition-colors ${
                  isCollapsed
                    ? "justify-center p-2.5"
                    : "gap-3 px-3 py-2.5"
                } ${
                  active
                    ? "bg-discover-tint text-discover font-semibold border-l-4 border-discover shadow-xs"
                    : "text-main hover:bg-surface-tint hover:text-discover font-medium"
                }`}
              >
                <span className={active ? "text-discover" : "text-muted"}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="type-body text-sm truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Sidebar Footer */}
        <div className="p-3 border-t border-line bg-surface-tint/50">
          {loadingLearner ? (
            <div className="py-2 text-center text-xs text-muted">
              {!isCollapsed ? "Checking session..." : "..."}
            </div>
          ) : learner?.name || learner?.code ? (
            <div className="flex flex-col gap-2">
              {!isCollapsed ? (
                <>
                  <div className="bg-surface-base border border-line rounded-lg p-2.5 flex flex-col">
                    <div className="flex items-center justify-between gap-1">
                      <span className="type-caption text-main font-bold truncate">
                        {learner.name || "Learner"}
                      </span>
                      <span
                        className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"
                        title="Active session"
                      />
                    </div>
                    {learner.code && (
                      <span className="font-mono text-xs text-discover font-semibold tracking-wider mt-0.5">
                        {learner.code}
                      </span>
                    )}
                  </div>

                  {/* Log out button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1.5 text-xs text-muted hover:text-red-600 transition-colors font-medium cursor-pointer rounded hover:bg-surface-base border border-transparent hover:border-line"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div
                  className="flex flex-col items-center gap-1.5"
                  title={`${learner.name || "Learner"} (${learner.code || "Active"})`}
                >
                  <div className="w-8 h-8 rounded-full bg-discover-tint text-discover border border-discover-border flex items-center justify-center font-bold text-xs">
                    {(learner.name || "L").charAt(0).toUpperCase()}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-[10px] text-muted hover:text-red-600 transition-colors cursor-pointer"
                    title="Log out"
                  >
                    Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // No session state: Get started link
            <div>
              {!isCollapsed ? (
                <Link
                  href="/entry"
                  className="w-full py-2 px-3 flex items-center justify-center rounded-lg bg-discover text-surface-base type-caption font-semibold hover:opacity-90 transition-opacity text-center shadow-xs"
                >
                  Get started →
                </Link>
              ) : (
                <Link
                  href="/entry"
                  className="w-9 h-9 mx-auto flex items-center justify-center rounded-lg bg-discover text-surface-base hover:opacity-90 transition-opacity"
                  title="Get started"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* =================================================================== */}
      {/* 4. MAIN CONTENT AREA */}
      {/* =================================================================== */}
      <div className="flex-1 min-w-0 flex flex-col">
        {children}
      </div>
    </div>
  );
}

