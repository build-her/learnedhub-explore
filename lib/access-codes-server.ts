import { supabaseServer } from "@/lib/supabase-server";
import { generateRandomAccessCode, type AccessCode } from "@/lib/access-codes";

/**
 * Inserts an access code using server-side service role client (used by admin or seed scripts).
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

    const { data, error } = await supabaseServer
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
