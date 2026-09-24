"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  initSession,
  SESSION_STORAGE_KEY,
  updateSessionLearner,
} from "@/lib/session";
import { createLearner } from "@/lib/learners";
import { logEvent, resolveScreenAndPathway } from "@/lib/events";
import { supabase } from "@/lib/supabase";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function SessionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastRecordedPath = useRef<string | null>(null);
  const sessionInitialized = useRef(false);

  // 1. Session initialization & Shared Link Detection
  useEffect(() => {
    if (sessionInitialized.current) return;
    sessionInitialized.current = true;

    async function handleSessionLifecycle() {
      if (typeof window === "undefined") return;

      const urlSession = searchParams.get("session");
      const existingStoredToken = localStorage.getItem(SESSION_STORAGE_KEY);
      const { screen, pathway } = resolveScreenAndPathway(pathname, searchParams);

      // Scenario A: Visitor opens a shared link with someone else's session token
      if (urlSession && urlSession !== existingStoredToken) {
        try {
          // 1. Ensure the viewer has their own device session token (do NOT reuse urlSession)
          if (!existingStoredToken) {
            const visitorToken = generateUUID();
            localStorage.setItem(SESSION_STORAGE_KEY, visitorToken);
            await supabase.from("sessions").insert({ token: visitorToken });
          }

          // 2. Clean the shared session param from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("session");
          window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));

          // If on dedicated /dossier/share/ route, the shared artifact page handles
          // looking up the artifact and emitting artifact_opened_via_share with full artifact metadata
          if (pathname.startsWith("/dossier/share/")) {
            return;
          }

          // 3. For other routes, ensure event is tied to viewer's learner_id (existing or new)
          let viewerLearnerId = localStorage.getItem("learnedhub_learner_id");
          let isNew = false;

          if (!viewerLearnerId) {
            const newLearner = await createLearner({
              preferred_name: "Learner",
              acquisition_source: "Shared Link",
              entry_point: pathway || "shared_link",
            });

            if (newLearner) {
              viewerLearnerId = newLearner.id;
              isNew = true;
              await updateSessionLearner(newLearner.id, {
                name: newLearner.preferred_name,
                code: newLearner.learner_code,
              });

              // Log session_started for this new learner
              await logEvent({
                event_type: "session_started",
                learner_id: newLearner.id,
                pathway,
                screen,
                metadata_json: { source: "shared_link" },
              });
            }
          }

          if (viewerLearnerId) {
            // Log artifact_opened_via_share carrying the VIEWER's learner_id (new/existing)
            await logEvent({
              event_type: "artifact_opened_via_share",
              learner_id: viewerLearnerId,
              pathway,
              screen,
              metadata_json: {
                shared_from_session: urlSession,
                share_id: searchParams.get("share_id") || undefined,
                is_new_viewer: isNew,
              },
            });
          }
          return;
        } catch (err) {
          console.error("Error processing shared link open:", err);
        }
      }

      // Scenario B: Normal session startup
      const isNewSession = !existingStoredToken;
      await initSession();

      if (isNewSession) {
        await logEvent({
          event_type: "session_started",
          pathway,
          screen,
          metadata_json: { source: "direct" },
        });
      }
    }

    handleSessionLifecycle();
  }, [pathname, searchParams]);

  // 2. Screen Transition Tracking: screen_viewed
  // "screen_viewed (every screen transition, tagged with pathway + screen name)"
  useEffect(() => {
    // Note: When path is /discover, app/discover/page.tsx records each distinct
    // question screen step (discover_question_1, discover_question_2, etc.) as the user advances
    if (pathname === "/discover") return;

    const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    if (lastRecordedPath.current === fullPath) return;
    lastRecordedPath.current = fullPath;

    const { screen, pathway } = resolveScreenAndPathway(pathname, searchParams);

    // When on a shared artifact route, do not check for or use any existing learner_id
    if (pathname.startsWith("/dossier/share/")) {
      logEvent({
        event_type: "screen_viewed",
        pathway,
        screen,
        learner_id: null,
        metadata_json: { path: pathname },
      });
      return;
    }

    logEvent({
      event_type: "screen_viewed",
      pathway,
      screen,
      metadata_json: { path: pathname },
    });
  }, [pathname, searchParams]);

  return null;
}