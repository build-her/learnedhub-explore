export const ACCESS_CODE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export type AccessCode = {
  code: string;
  partner_name?: string | null;
  school_name?: string | null;
  cohort?: string | null;
  created_at?: string;
};

function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Generates an unambiguous 6-character random access code.
 */
export function generateRandomAccessCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * ACCESS_CODE_CHARSET.length);
    code += ACCESS_CODE_CHARSET[idx];
  }
  return code;
}

/**
 * Looks up an access code via /api/codes/lookup.
 */
export async function lookupAccessCode(code: string): Promise<AccessCode | null> {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/codes/lookup?code=${encodeURIComponent(cleanCode)}&type=access`
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data.found && data.access_code) {
      return data.access_code as AccessCode;
    }

    return null;
  } catch (err) {
    console.error("Error looking up access code:", err);
    return null;
  }
}
