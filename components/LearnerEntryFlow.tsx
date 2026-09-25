"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearSessionLearner,
  getSessionLearnerId,
  updateSessionLearner,
} from "@/lib/session";
import {
  createLearner,
  getLearnerByCode,
  getLearnerById,
  type Learner,
} from "@/lib/learners";
import { lookupAccessCode } from "@/lib/access-codes";
import { logEvent } from "@/lib/events";

interface LearnerEntryFlowProps {
  initialAccessCode?: string;
  initialName?: string;
  destinationHref: string;
  destinationLabel: string;
  bgClass?: string;
  pathwayKey?: string;
  ignoreActiveLearner?: boolean;
  onLearnerCreated?: (learner: Learner) => Promise<void> | void;
  onLearnerResumed?: (learner: Learner) => Promise<void> | void;
}

export default function LearnerEntryFlow({
  initialAccessCode,
  initialName,
  destinationHref,
  destinationLabel,
  bgClass = "bg-discover",
  pathwayKey = "discover",
  ignoreActiveLearner = false,
  onLearnerCreated,
  onLearnerResumed,
}: LearnerEntryFlowProps) {
  const router = useRouter();

  // New learner form state
  const [preferredName, setPreferredName] = useState(initialName || "");
  const [accessCode, setAccessCode] = useState(initialAccessCode || "");
  const [isCreating, setIsCreating] = useState(false);
  const [newLearnerError, setNewLearnerError] = useState<string | null>(null);

  // Existing learner form state ("Already started?")
  const [existingCode, setExistingCode] = useState("");
  const [isResuming, setIsResuming] = useState(false);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Post-creation confirmation screen state
  const [createdLearner, setCreatedLearner] = useState<Learner | null>(null);
  const [copied, setCopied] = useState(false);

  // Active attached learner state (if already attached on this device)
  const [activeLearner, setActiveLearner] = useState<Learner | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Check if session is already attached to a learner on mount
  useEffect(() => {
    if (ignoreActiveLearner) {
      setInitialLoading(false);
      return;
    }

    async function checkExistingSessionLearner() {
      try {
        const learnerId = await getSessionLearnerId();
        if (learnerId) {
          const learner = await getLearnerById(learnerId);
          if (learner) {
            setActiveLearner(learner);
          } else {
            await clearSessionLearner();
            setActiveLearner(null);
          }
        }
      } catch (err) {
        console.error("Failed to check active learner:", err);
      } finally {
        setInitialLoading(false);
      }
    }
    checkExistingSessionLearner();
  }, [ignoreActiveLearner]);

  // Update accessCode if initialAccessCode prop changes
  useEffect(() => {
    if (initialAccessCode) {
      setAccessCode(initialAccessCode.trim().toUpperCase());
    }
  }, [initialAccessCode]);

  // Handler 1: Create New Learner
  async function handleCreateLearner(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = preferredName.trim();
    if (!cleanName) {
      setNewLearnerError("Please enter your name.");
      return;
    }

    setIsCreating(true);
    setNewLearnerError(null);

    try {
      let acquisitionSource = "Direct";
      const cleanAccessCode = accessCode.trim().toUpperCase();

      if (cleanAccessCode) {
        const accessRecord = await lookupAccessCode(cleanAccessCode);
        if (accessRecord) {
          acquisitionSource = accessRecord.school_name || accessRecord.partner_name || cleanAccessCode;
        } else {
          acquisitionSource = cleanAccessCode;
        }
      }

      if (ignoreActiveLearner) {
        // Disconnect from any previous session learner on this browser
        await clearSessionLearner();
      }

      // Create new learner with unambiguous 4-digit code (format LH-XXXX)
      const learner = await createLearner({
        preferred_name: cleanName,
        acquisition_source: acquisitionSource,
        entry_point: pathwayKey,
      });

      if (!learner) {
        setNewLearnerError("Could not create profile. Please check connection and try again.");
        setIsCreating(false);
        return;
      }

      // Attach learner to current session
      await updateSessionLearner(learner.id, {
        name: learner.preferred_name,
        code: learner.learner_code,
      });

      const screenIdentifier =
        pathwayKey === "explore"
          ? "explore_intro"
          : pathwayKey === "build"
          ? "build_intro"
          : "discover_intro";

      // Log session_started event for new learner
      await logEvent({
        event_type: "session_started",
        learner_id: learner.id,
        pathway: pathwayKey,
        screen: screenIdentifier,
        metadata_json: { acquisition_source: acquisitionSource },
      });

      if (onLearnerCreated) {
        await onLearnerCreated(learner);
      }

      // Show confirmation screen displaying their 4-digit code
      setCreatedLearner(learner);
    } catch (err) {
      console.error("Error creating learner:", err);
      setNewLearnerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }

  // Handler 2: Resume with Existing LearnedHub Code ("Already started?")
  async function handleResumeJourney(e: React.FormEvent) {
    e.preventDefault();
    const cleanCode = existingCode.trim().toUpperCase();
    if (!cleanCode) {
      setResumeError("Please enter your LearnedHub code.");
      return;
    }

    setIsResuming(true);
    setResumeError(null);

    try {
      if (ignoreActiveLearner) {
        // Disconnect from any previous session learner on this browser
        await clearSessionLearner();
      }

      const learner = await getLearnerByCode(cleanCode);
      if (!learner) {
        setResumeError("LearnedHub code not found. Please check your code or start above.");
        setIsResuming(false);
        return;
      }

      // Attach learner to current session
      await updateSessionLearner(learner.id, {
        name: learner.preferred_name,
        code: learner.learner_code,
      });

      if (onLearnerResumed) {
        await onLearnerResumed(learner);
      }

      // Navigate straight to the journey
      router.push(destinationHref);
    } catch (err) {
      console.error("Error resuming with code:", err);
      setResumeError("Failed to lookup code. Please try again.");
    } finally {
      setIsResuming(false);
    }
  }

  // Handler 3: Copy Code action
  async function handleCopyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  }

  // Handler 4: "Not you? Start fresh"
  async function handleStartFresh() {
    try {
      await clearSessionLearner();
      setActiveLearner(null);
      setCreatedLearner(null);
      setPreferredName("");
      setAccessCode("");
      setExistingCode("");
      setNewLearnerError(null);
      setResumeError(null);

      // Clean query params from URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("school");
        url.searchParams.delete("name");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      }
    } catch (err) {
      console.error("Failed to start fresh:", err);
    }
  }

  if (initialLoading) {
    return (
      <div className="rounded-lg border border-explore-border bg-surface-tint p-lg text-center">
        <p className="type-body text-muted">Loading...</p>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: Confirmation Screen (After New Learner is Created)
  // Shows 4-digit code (format LH-XXXX), Copy code action, and save warning.
  // No name/school banner shown instead of the code.
  // =========================================================================
  if (createdLearner) {
    return (
      <div className="rounded-lg border-2 border-explore bg-surface-base p-xl flex flex-col gap-lg shadow-sm">
        <div className="flex flex-col gap-xs text-center">
          <span className="type-caption text-explore font-bold uppercase tracking-wider">
            Your Personal LearnedHub Code
          </span>
          <h2 className="type-display-lg text-main">Save your code</h2>
        </div>

        {/* 4-digit learner_code clearly displayed in format LH-XXXX */}
        <div className="flex flex-col items-center gap-sm bg-surface-tint border border-explore-border rounded-lg p-lg">
          <span className="font-mono font-extrabold text-3xl sm:text-4xl text-explore tracking-widest select-all">
            {createdLearner.learner_code}
          </span>
          <button
            type="button"
            onClick={() => handleCopyCode(createdLearner.learner_code)}
            className="type-caption font-semibold px-lg py-xs rounded-full border border-explore bg-surface-base text-explore hover:bg-explore hover:text-surface-base transition-colors"
          >
            {copied ? "✓ Copied to clipboard!" : "Copy code"}
          </button>
        </div>

        {/* Prominent warning: save before continuing */}
        <div className="rounded-md border border-amber-300 bg-amber-50 p-md flex flex-col gap-xs">
          <p className="type-body text-amber-900 font-semibold">
            Important: Save this code before continuing!
          </p>
          <p className="type-caption text-amber-800">
            This code is your only way to resume your journey on another device or browser. Take a screenshot or write it down.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push(destinationHref)}
          className={`type-body font-bold text-surface-base rounded-md py-sm px-lg text-center ${bgClass} hover:opacity-90 transition-opacity`}
        >
          {destinationLabel} →
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleStartFresh}
            className="type-caption text-muted hover:text-explore hover:underline"
          >
            Not you? Start fresh
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: Active Learner Attached to Session
  // If this device was already linked to a learner, show their code and options.
  // =========================================================================
  if (activeLearner) {
    return (
      <div className="rounded-lg border border-explore-border bg-surface-tint p-lg flex flex-col gap-md">
        <div className="flex items-center justify-between">
          <span className="type-caption text-muted">Active LearnedHub Code</span>
          <button
            type="button"
            onClick={handleStartFresh}
            className="type-caption text-explore hover:underline"
          >
            Not you? Start fresh
          </button>
        </div>

        <div className="flex items-center justify-between bg-surface-base border border-explore-border rounded-md px-md py-sm">
          <span className="font-mono font-bold text-xl text-explore tracking-wider">
            {activeLearner.learner_code}
          </span>
          <span className="type-caption text-muted">
            {activeLearner.preferred_name}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push(destinationHref)}
          className={`type-body font-bold text-surface-base rounded-md py-sm px-lg text-center ${bgClass} hover:opacity-90 transition-opacity`}
        >
          Continue my journey ({destinationLabel}) →
        </button>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: Main Dual Entry Screen (Visible simultaneously, not toggled!)
  // (1) name + optional access code + "Continue" button
  // (2) separate "Already started?" section + LearnedHub Code + "Continue my journey"
  // =========================================================================
  return (
    <div className="flex flex-col gap-lg">
      {/* SECTION 1: New Learner (Name + Optional Access Code + Continue) */}
      <div className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-md shadow-sm">
        <div className="flex flex-col gap-xs">
          <h2 className="type-h2 text-main">Get started</h2>
          <p className="type-caption text-muted">
            Enter your name to begin. We&apos;ll generate your resume code next.
          </p>
        </div>

        <form onSubmit={handleCreateLearner} className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <label className="type-caption text-main font-semibold">
              What should we call you? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
              placeholder="Your preferred name (e.g. Tobi, Amina)"
              className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="type-caption text-muted font-semibold">
              Access code <span className="font-normal">(optional)</span>
            </label>
            <input
              type="text"
              maxLength={10}
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
              placeholder="e.g. H7K92M (if given by your school)"
              className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main font-mono uppercase tracking-wider"
            />
            <span className="type-caption text-muted text-xs">
              If your teacher or school gave you a 6-character code, enter it here.
            </span>
          </div>

          {newLearnerError && (
            <p className="type-caption text-red-600 font-medium">
              {newLearnerError}
            </p>
          )}

          <button
            type="submit"
            disabled={isCreating || !preferredName.trim()}
            className={`type-body font-bold text-surface-base rounded-md py-sm px-lg text-center ${bgClass} hover:opacity-90 disabled:opacity-50 transition-opacity`}
          >
            {isCreating ? "Creating profile..." : "Continue"}
          </button>
        </form>
      </div>

      {/* SECTION 2: Already Started? (LearnedHub Code + Continue my journey) */}
      {/* Both visible simultaneously on the same screen at all times, not toggled */}
      <div className="rounded-lg border border-dashed border-[var(--text-muted)] bg-surface-tint p-lg flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <h2 className="type-h2 text-main">Already started?</h2>
          <p className="type-caption text-muted">
            Have a 4-digit LearnedHub code from earlier or another device? Resume your journey below.
          </p>
        </div>

        <form onSubmit={handleResumeJourney} className="flex flex-col gap-sm">
          <div className="flex flex-col gap-xs">
            <label className="type-caption text-main font-semibold">
              LearnedHub Code
            </label>
            <div className="flex gap-xs">
              <input
                type="text"
                maxLength={8}
                value={existingCode}
                onChange={(e) => setExistingCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
                placeholder="LH-XXXX"
                className="type-body flex-1 px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main font-mono uppercase tracking-widest text-center sm:text-left"
              />
              <button
                type="submit"
                disabled={isResuming || !existingCode.trim()}
                className="type-caption font-bold px-lg py-sm rounded-lg bg-explore text-surface-base hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
              >
                {isResuming ? "Checking..." : "Continue my journey"}
              </button>
            </div>
          </div>

          {resumeError && (
            <p className="type-caption text-red-600 font-medium">
              {resumeError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
