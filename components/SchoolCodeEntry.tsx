"use client";

import { useEffect, useState } from "react";
import {
  clearSessionLearner,
  clearLegacyLearnerIdCookie,
  getSessionLearnerId,
  updateSessionLearner,
  updateSessionSchoolCode,
  getSessionSchoolCode,
  SESSION_STORAGE_KEY,
} from "@/lib/session";
import { getLearnerById, getLearnerByCode, createLearner } from "@/lib/learners";
import { lookupAccessCode } from "@/lib/access-codes";

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
  const [learnerName, setLearnerName] = useState<string | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Sync initial school code from URL or existing session on mount
  useEffect(() => {
    async function syncSession() {
      // 1. Check if session has an existing learner_id
      const learnerId = await getSessionLearnerId();
      if (learnerId) {
        const learner = await getLearnerById(learnerId);
        if (learner) {
          setLearnerName(learner.preferred_name);
          setActiveCode(learner.learner_code);
          setSchoolName(
            learner.acquisition_source && learner.acquisition_source !== "Direct"
              ? learner.acquisition_source
              : null
          );
          return;
        }
      }

      // 2. Otherwise handle initialSchoolCode from URL or saved session school code
      if (initialSchoolCode) {
        const cleanCode = initialSchoolCode.trim().toUpperCase();
        await updateSessionSchoolCode(cleanCode);
        setActiveCode(cleanCode);
        lookupCodeDetails(cleanCode);
      } else {
        const savedCode = await getSessionSchoolCode();
        if (savedCode) {
          setActiveCode(savedCode);
          lookupCodeDetails(savedCode);
        }
      }
    }
    syncSession();
  }, [initialSchoolCode]);

  async function lookupCodeDetails(code: string) {
    try {
      // Check access_codes first
      const accessRecord = await lookupAccessCode(code);
      if (accessRecord) {
        setSchoolName(accessRecord.school_name || accessRecord.partner_name || null);
        return;
      }

      // Check fallback API route
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
      setFeedback({ type: "error", message: "Please enter your code." });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      // 1. Check if this is an existing learner's code (e.g. returning student)
      const existingLearner = await getLearnerByCode(cleanCode);
      if (existingLearner) {
        await updateSessionLearner(existingLearner.id);
        setLearnerName(existingLearner.preferred_name);
        setActiveCode(existingLearner.learner_code);
        setSchoolName(
          existingLearner.acquisition_source && existingLearner.acquisition_source !== "Direct"
            ? existingLearner.acquisition_source
            : null
        );
        setIsEditing(false);
        setInputCode("");
        setFeedback({
          type: "success",
          message: `Welcome back, ${existingLearner.preferred_name}! Connected to your learner profile.`,
        });
        setLoading(false);
        return;
      }

      // 2. Otherwise treat as a 6-character access / school code
      if (cleanCode.length !== 6) {
        setFeedback({ type: "error", message: "Facilitator and school codes must be 6 characters." });
        setLoading(false);
        return;
      }

      // Look up school/partner details
      const accessRecord = await lookupAccessCode(cleanCode);
      const resolvedSchoolName = accessRecord?.school_name || accessRecord?.partner_name || null;

      // Update session with school code
      await updateSessionSchoolCode(cleanCode);

      // Create a learner record linked to this access code
      const newLearner = await createLearner({
        preferred_name: initialSchoolName || (resolvedSchoolName ? `${resolvedSchoolName} Learner` : "Learner"),
        acquisition_source: resolvedSchoolName || cleanCode,
        entry_point: "entry",
      });

      if (newLearner) {
        await updateSessionLearner(newLearner.id);
        setLearnerName(newLearner.preferred_name);
      }

      setActiveCode(cleanCode);
      if (resolvedSchoolName) setSchoolName(resolvedSchoolName);
      setIsEditing(false);
      setInputCode("");
      setFeedback({ type: "success", message: `Connected to school code ${cleanCode}!` });

      if (!resolvedSchoolName) {
        await lookupCodeDetails(cleanCode);
      }
    } catch (err: unknown) {
      const msg = (err as Error)?.message === "try again later."
        ? "try again later."
        : "An unexpected error occurred while connecting.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  }

  /**
   * Log out action:
   * Clears learner session in Supabase, cookies, and localStorage, then navigates to server logout route.
   */
  async function handleLogout() {
    setLoading(true);
    setFeedback(null);
    try {
      clearLegacyLearnerIdCookie();
      localStorage.removeItem("learnedhub_learner_name");
      localStorage.removeItem("learnedhub_learner_code");
      localStorage.removeItem(SESSION_STORAGE_KEY);
      await clearSessionLearner();
      window.location.replace("/api/learners/logout");
    } catch (err) {
      console.error("Failed to log out:", err);
      window.location.replace("/api/learners/logout");
    }
  }

  const isAttached = (Boolean(activeCode) || Boolean(learnerName)) && !isEditing;

  return (
    <div className="flex flex-col gap-sm">
      {/* State 1: Active Learner / School Code Display */}
      {isAttached ? (
        <div className="flex flex-col gap-xs rounded-md bg-surface-tint px-md py-sm border border-discover-border">
          <div className="flex items-center justify-between">
            <span className="type-caption text-muted">
              {learnerName ? `Active Learner: ${learnerName}` : "Shared by your school"}
            </span>
            <div className="flex items-center gap-sm">
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="type-caption font-medium text-muted hover:text-red-600 underline disabled:opacity-50 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="type-body text-main font-medium">
              {schoolName ? schoolName : `Code: ${activeCode}`}
              {schoolName && activeCode ? ` · ${activeCode}` : null}
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
        /* State 2: Manual Code Entry Form (Fallback Path from Prompt 1) */
        <div className="flex flex-col gap-sm rounded-md bg-surface-tint p-md border border-explore-border">
          <div className="flex items-center justify-between">
            <span className="type-caption text-main font-semibold">
              Have a school code?
            </span>
          </div>

          <form onSubmit={handleApplyCode} className="flex gap-xs">
            <input
              type="text"
              maxLength={12}
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
