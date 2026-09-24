import { supabase } from "@/lib/supabase";
import { createLearner } from "@/lib/learners";

export const SESSION_STORAGE_KEY = "learnedhub_session_token";
export const SESSION_QUERY_PARAM = "session";

let initPromise: Promise<string | null> | null = null;

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

/**
 * Returns the current session token from localStorage if present.
 */
export function getSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Returns existing session token or generates and persists a new one synchronously.
 */
export function getOrCreateSessionToken(): string {
  if (typeof window === "undefined") return "";
  try {
    let token = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!token) {
      token = generateUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, token);

      // Asynchronously record new session in Supabase
      supabase
        .from("sessions")
        .insert({ token })
        .then(({ error }) => {
          if (error) console.error("Error inserting session into Supabase:", error);
        });
    }
    return token;
  } catch (err) {
    console.error("Failed to access localStorage for session token:", err);
    return generateUUID();
  }
}

async function performInitSession(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  try {
    console.log("session init running")
    const existingToken = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!existingToken) {
      // First page load: generate random session token, store in localStorage, insert row
      const token = generateUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, token);

      const { error } = await supabase.from("sessions").insert({ token });
      if (error) {
        console.error("Failed to insert new session in Supabase:", error);
      }
      return token;
    }

    // Subsequent load: update last_seen_at on matching row
    const { error, data } = await supabase
      .from("sessions")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("token", existingToken)
      .select("token");

    if (error) {
      console.error("Failed to update session last_seen_at in Supabase:", error);
    } else if (!data || data.length === 0) {
      // If the row doesn't exist in Supabase (e.g. wiped table), re-insert it
      await supabase.from("sessions").insert({ token: existingToken });
    }

    return existingToken;
  } catch (err) {
    console.error("Error during session initialization:", err);
    return null;
  }
}

/**
 * Initializes the session:
 * - On first page load (no token in localStorage): creates token, stores in localStorage, inserts into Supabase sessions table.
 * - On subsequent loads: updates last_seen_at on the matching row in Supabase sessions table.
 */
export function initSession(): Promise<string | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!initPromise) {
    initPromise = performInitSession();
  }
  return initPromise;
}

/**
 * Clears current session token from localStorage, generates a new one,
 * inserts a fresh row in the Supabase sessions table, and returns the new token.
 */
export async function resetSession(): Promise<string> {
  if (typeof window === "undefined") return "";
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    const newToken = generateUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, newToken);

    const { error } = await supabase.from("sessions").insert({
      token: newToken,
    });
    if (error) {
      console.error("Failed to insert fresh session in Supabase:", error);
    }
    return newToken;
  } catch (err) {
    console.error("Error resetting session:", err);
    return "";
  }
}

export const LEARNER_STORAGE_KEY = "learnedhub_learner_id";

/**
 * Clears the current session's learner_id link in Supabase and localStorage,
 * allowing the current device/session to attach to a different or new learner.
 */
export async function clearSessionLearner(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(LEARNER_STORAGE_KEY);
    localStorage.removeItem("learnedhub_learner_name");
    localStorage.removeItem("learnedhub_learner_code");

    const token = getSessionToken();
    if (!token) return true;

    const { error } = await supabase
      .from("sessions")
      .update({ learner_id: null })
      .eq("token", token);

    if (error) {
      console.error("Failed to clear learner_id in Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error clearing session learner:", err);
    return false;
  }
}

/**
 * Links a learner_id (UUID from learners table) to the current session in Supabase.
 */
export async function updateSessionLearner(
  learnerId: string,
  meta?: { name?: string; code?: string }
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(LEARNER_STORAGE_KEY, learnerId);
    if (meta?.name) {
      localStorage.setItem("learnedhub_learner_name", meta.name);
    }
    if (meta?.code) {
      localStorage.setItem("learnedhub_learner_code", meta.code);
    }
    const token = getOrCreateSessionToken();
    if (!token) return false;

    const { error } = await supabase
      .from("sessions")
      .update({ learner_id: learnerId })
      .eq("token", token);

    if (error) {
      console.error("Failed to update learner_id in Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update session learner_id:", err);
    return false;
  }
}

/**
 * Retrieves the learner_id associated with the current session.
 */
export async function getSessionLearnerId(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(LEARNER_STORAGE_KEY);
    if (cached) return cached;

    const token = getSessionToken();
    if (!token) return null;

    const { data } = await supabase
      .from("sessions")
      .select("learner_id")
      .eq("token", token)
      .maybeSingle();

    if (data?.learner_id) {
      localStorage.setItem(LEARNER_STORAGE_KEY, data.learner_id);
      return data.learner_id;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Ensures the current browser has a valid session and returns the viewer's learner_id.
 * - If the viewer already has a learner_id (existing), returns it without modifying their profile.
 * - If not, generates a new session and creates a new learner record (new), and returns it.
 * Guarantees that the viewer never inherits or uses a shared link author's learner_id.
 */
export async function getOrCreateViewerLearner(
  pathway?: string
): Promise<{ id: string; isNew: boolean }> {
  if (typeof window === "undefined") return { id: "", isNew: false };

  try {
    // 1. Check if viewer already has a learner_id stored
    const existingLearnerId = await getSessionLearnerId();
    if (existingLearnerId) {
      return { id: existingLearnerId, isNew: false };
    }

    // 2. Ensure viewer has an initialized session
    await initSession();

    // 3. Create a fresh learner record specifically for this viewer
    const newLearner = await createLearner({
      preferred_name: "Learner",
      acquisition_source: "Shared Link",
      entry_point: pathway || "shared_link",
    });

    if (newLearner) {
      await updateSessionLearner(newLearner.id, {
        name: newLearner.preferred_name,
        code: newLearner.learner_code,
      });
      return { id: newLearner.id, isNew: true };
    }
  } catch (err) {
    console.error("Error ensuring viewer learner:", err);
  }

  return { id: "", isNew: false };
}

/**
 * Links a school_code to the current session in Supabase (if school_code column exists).
 */
export async function updateSessionSchoolCode(schoolCode: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const token = getOrCreateSessionToken();
    if (!token) return false;

    const { error } = await supabase
      .from("sessions")
      .update({ school_code: schoolCode } as Record<string, unknown>)
      .eq("token", token);

    if (error) {
      // If column school_code was dropped in migration, safely ignore
      if (error.code !== "PGRST204" && !error.message?.includes("school_code")) {
        console.error("Failed to update school_code in Supabase:", error);
      }
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Retrieves the school_code associated with the current session (if school_code column exists).
 */
export async function getSessionSchoolCode(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const token = getSessionToken();
    if (!token) return null;

    const { data, error } = await supabase
      .from("sessions")
      .select("school_code")
      .eq("token", token)
      .maybeSingle();

    if (error) return null;
    return (data as { school_code?: string | null })?.school_code || null;
  } catch {
    return null;
  }
}

/**
 * Takes any URL and embeds the current session token as the `session` query param.
 */
export function getShareableUrl(rawUrl?: string): string {
  if (typeof window === "undefined") return rawUrl || "";
  try {
    const base = rawUrl || window.location.href;
    const url = new URL(base, window.location.origin);
    const token = getOrCreateSessionToken();
    if (token) {
      url.searchParams.set(SESSION_QUERY_PARAM, token);
    }
    return url.toString();
  } catch {
    return rawUrl || window.location.href;
  }
}
