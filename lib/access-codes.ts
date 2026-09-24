import { supabase } from "@/lib/supabase";

export const ACCESS_CODE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export type AccessCode = {
  code: string;
  partner_name?: string | null;
  school_name?: string | null;
  cohort?: string | null;
  created_at?: string;
};

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
 * Looks up an access code in Supabase access_codes table.
 */
export async function lookupAccessCode(code: string): Promise<AccessCode | null> {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();

  try {
    const { data, error } = await supabase
      .from("access_codes")
      .select("code, partner_name, school_name, cohort, created_at")
      .eq("code", cleanCode)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as AccessCode;
  } catch (err) {
    console.error("Error looking up access code:", err);
    return null;
  }
}

/**
 * Inserts an access code (used by admin or seed scripts).
 */
export async function createAccessCode(codeData: {
  code?: string;
  partner_name?: string | null;
  school_name?: string | null;
  cohort?: string | null;
}): Promise<AccessCode | null> {
  const code = (codeData.code || generateRandomAccessCode()).trim().toUpperCase();

  try {
    const payload = {
      code,
      partner_name: codeData.partner_name?.trim() || null,
      school_name: codeData.school_name?.trim() || null,
      cohort: codeData.cohort?.trim() || null,
    };

    const { data, error } = await supabase
      .from("access_codes")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Failed to insert access code:", error);
      return null;
    }

    return data as AccessCode;
  } catch (err) {
    console.error("Error creating access code:", err);
    return null;
  }
}

