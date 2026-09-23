import { supabase } from "@/lib/supabase";

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

/**
 * Links a school_code to the current session in Supabase.
 */
export async function updateSessionSchoolCode(schoolCode: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const token = getOrCreateSessionToken();
    if (!token) return false;

    const { error } = await supabase
      .from("sessions")
      .update({ school_code: schoolCode })
      .eq("token", token);

    if (error) {
      console.error("Failed to update school_code in Supabase:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update session school code:", err);
    return false;
  }
}

/**
 * Retrieves the school_code associated with the current session.
 */
export async function getSessionSchoolCode(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const token = getSessionToken();
    if (!token) return null;

    const { data } = await supabase
      .from("sessions")
      .select("school_code")
      .eq("token", token)
      .maybeSingle();

    return data?.school_code || null;
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
