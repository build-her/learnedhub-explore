"use client";

import { useEffect, useState } from "react";
import {
  updateSessionSchoolCode,
  resetSession,
  getSessionSchoolCode,
} from "@/lib/session";

interface SchoolCodeEntryProps {
  initialSchoolCode?: string;
  initialSchoolName?: string;
}

export default function SchoolCodeEntry({
  initialSchoolCode,
  initialSchoolName,
}: SchoolCodeEntryProps) {
  const [activeCode, setActiveCode] = useState<string | null>(initialSchoolCode || null);
  const [schoolName, setSchoolName] = useState<string | null>(initialSchoolName || null);
  const [inputCode, setInputCode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Sync initial school code from URL into session on mount
  useEffect(() => {
    async function syncSession() {
      if (initialSchoolCode) {
        await updateSessionSchoolCode(initialSchoolCode.trim().toUpperCase());
      } else {
        // Check if session already has a school code from previous visit
        const savedCode = await getSessionSchoolCode();
        if (savedCode) {
          setActiveCode(savedCode);
          lookupName(savedCode);
        }
      }
    }
    syncSession();
  }, [initialSchoolCode]);

  async function lookupName(code: string) {
    try {
      const res = await fetch(`/api/codes/lookup?code=${encodeURIComponent(code)}`);
      const data = await res.json();
      if (data.found && data.school_name) {
        setSchoolName(data.school_name);
      }
    } catch {
      // Ignore lookup failure
    }
  }

  async function handleApplyCode(e: React.FormEvent) {
    e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();

    if (!cleanCode) {
      setFeedback({ type: "error", message: "Please enter your 6-character code." });
      return;
    }

    if (cleanCode.length !== 6) {
      setFeedback({ type: "error", message: "Facilitator codes must be 6 characters." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      // Update session row in Supabase
      const ok = await updateSessionSchoolCode(cleanCode);
      if (!ok) {
        setFeedback({ type: "error", message: "Failed to connect code. Please try again." });
        setLoading(false);
        return;
      }

      setActiveCode(cleanCode);
      setIsEditing(false);
      setInputCode("");
      setFeedback({ type: "success", message: `Connected to school code ${cleanCode}!` });

      // Lookup school name
      await lookupName(cleanCode);
    } catch {
      setFeedback({ type: "error", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  }

  async function handleStartFresh() {
    setLoading(true);
    try {
      await resetSession();
      setActiveCode(null);
      setSchoolName(null);
      setInputCode("");
      setIsEditing(false);
      setFeedback({ type: "info", message: "Started fresh session. Enter a new code if needed." });
    } catch {
      setFeedback({ type: "error", message: "Failed to start fresh session." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-sm">
      {/* State 1: Active School Code Display */}
      {activeCode && !isEditing ? (
        <div className="flex flex-col gap-xs rounded-md bg-surface-tint px-md py-sm border border-discover-border">
          <div className="flex items-center justify-between">
            <span className="type-caption text-muted">Shared by your school</span>
            <button
              type="button"
              onClick={handleStartFresh}
              disabled={loading}
              className="type-caption text-explore hover:underline disabled:opacity-50"
            >
              Not you? Start fresh
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="type-body text-main font-medium">
              {schoolName ? schoolName : `School code: ${activeCode}`}
              {schoolName && ` · ${activeCode}`}
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="type-caption text-muted hover:text-main text-xs underline"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        /* State 2: Manual Code Entry Form (Fallback Path) */
        <div className="flex flex-col gap-sm rounded-md bg-surface-tint p-md border border-explore-border">
          <div className="flex items-center justify-between">
            <span className="type-caption text-main font-semibold">
              Have a school code?
            </span>
            <button
              type="button"
              onClick={handleStartFresh}
              disabled={loading}
              className="type-caption text-explore hover:underline disabled:opacity-50"
            >
              Not you? Start fresh
            </button>
          </div>

          <form onSubmit={handleApplyCode} className="flex gap-xs">
            <input
              type="text"
              maxLength={6}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
              placeholder="e.g. H7K92M"
              className="type-body flex-1 px-md py-xs rounded-md border border-explore-border bg-surface-base text-main font-mono uppercase tracking-wider"
            />
            <button
              type="submit"
              disabled={loading || inputCode.trim().length === 0}
              className="type-caption font-semibold px-md py-xs rounded-md bg-explore text-surface-base hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : "Connect"}
            </button>
          </form>

          <span className="type-caption text-muted text-xs">
            Enter the 6-character code from your teacher or facilitator to link your session.
          </span>
        </div>
      )}

      {/* User Feedback Alerts */}
      {feedback && (
        <p
          className={`type-caption ${
            feedback.type === "error"
              ? "text-red-600"
              : feedback.type === "success"
              ? "text-green-700"
              : "text-muted"
          }`}
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}

