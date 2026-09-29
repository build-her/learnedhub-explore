export const SESSION_STORAGE_KEY = "learnedhub_session_token";
export const SESSION_QUERY_PARAM = "session";

let initPromise: Promise<string | null> | null = null;

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

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
 * Actively clears the legacy client-writable learnedhub_learner_id cookie from browser storage.
 */
export function clearLegacyLearnerIdCookie(): void {
  if (typeof document !== "undefined") {
    try {
      document.cookie = "learnedhub_learner_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;";
    } catch {
      // Ignore cookie errors
    }
  }
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
 * Returns existing device session token or generates and persists a new one synchronously.
 */
export function getOrCreateSessionToken(): string {
  if (typeof window === "undefined") return "";
  try {
    let token = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!token) {
      token = generateUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, token);

      // Asynchronously record session via API route
      fetch(`${getBaseUrl()}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }).catch((err) => {
        console.error("Error creating session via API:", err);
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
    clearLegacyLearnerIdCookie();
    const existingToken = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!existingToken) {
      const token = generateUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, token);

      await fetch(`${getBaseUrl()}/api/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      return token;
    }

    await fetch(`${getBaseUrl()}/api/sessions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: existingToken,
        last_seen_at: new Date().toISOString(),
      }),
    });

    return existingToken;
  } catch (err) {
    console.error("Error during session initialization:", err);
    return null;
  }
}

/**
 * Initializes the device session via /api/sessions.
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
 * records a fresh row in DB via API, and returns the new token.
 */
export async function resetSession(): Promise<string> {
  if (typeof window === "undefined") return "";
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    const newToken = generateUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, newToken);

    await fetch(`${getBaseUrl()}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: newToken }),
    });

    return newToken;
  } catch (err) {
    console.error("Error resetting session:", err);
    return "";
  }
}

/**
 * Clears the learner session via server-side /api/learners/logout route.
 */
export async function clearSessionLearner(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const token = getSessionToken();
    try {
      clearLegacyLearnerIdCookie();
      localStorage.removeItem("learnedhub_learner_name");
      localStorage.removeItem("learnedhub_learner_code");
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {
      // Ignore localStorage errors
    }

    const res = await fetch(`${getBaseUrl()}/api/learners/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token || undefined }),
      credentials: "include",
    });

    return res.ok;
  } catch (err) {
    console.error("Error clearing session learner:", err);
    return false;
  }
}

/**
 * Updates UI storage cache with learner display info.
 */
export async function updateSessionLearner(
  _learnerId?: string,
  meta?: { name?: string; code?: string }
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    if (meta?.name) {
      localStorage.setItem("learnedhub_learner_name", meta.name);
    }
    if (meta?.code) {
      localStorage.setItem("learnedhub_learner_code", meta.code);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if the current session has an authenticated learner by calling /api/me.
 * Returns the learner_code string if active, or null if unauthenticated.
 */
export async function getSessionLearnerId(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch(`${getBaseUrl()}/api/me`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.learner_code || null;
  } catch {
    return null;
  }
}

/**
 * Links a school_code to the current session via /api/sessions.
 */
export async function updateSessionSchoolCode(schoolCode: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  try {
    const token = getOrCreateSessionToken();
    if (!token) return false;

    const res = await fetch(`${getBaseUrl()}/api/sessions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, school_code: schoolCode }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Retrieves the school_code associated with the current session via /api/sessions.
 */
export async function getSessionSchoolCode(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const token = getSessionToken();
    if (!token) return null;

    const res = await fetch(`${getBaseUrl()}/api/sessions?token=${encodeURIComponent(token)}`);
    if (!res.ok) return null;

    const data = await res.json();
    return data?.session?.school_code || null;
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
