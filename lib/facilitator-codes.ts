import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

// 6 characters, strictly excluding ambiguous characters: 0, O, 1, I, l (and L)
export const FACILITATOR_CODE_CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export type FacilitatorCodeRecord = {
  code: string;
  school_name?: string | null;
  facilitator_name?: string | null;
  notes?: string | null;
  created_at: string;
  is_active: boolean;
};

const DATA_DIR = path.resolve(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "facilitator-codes.json");

function ensureDataFile(): FacilitatorCodeRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read facilitator codes file:", err);
    return [];
  }
}

function persistDataFile(records: FacilitatorCodeRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write facilitator codes file:", err);
  }
}

/**
 * Generates a random 6-character code using the unambiguous charset.
 */
export function generateRandomCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * FACILITATOR_CODE_CHARSET.length);
    code += FACILITATOR_CODE_CHARSET[idx];
  }
  return code;
}

/**
 * Generates N unique facilitator codes with metadata, persists them to queryable storage,
 * and attempts to mirror to Supabase facilitator_codes table if present.
 */
export async function createFacilitatorCodes(options: {
  count?: number;
  school_name?: string;
  facilitator_name?: string;
  notes?: string;
}): Promise<FacilitatorCodeRecord[]> {
  const count = Math.max(1, Math.min(options.count || 1, 100));
  const existing = ensureDataFile();
  const existingCodeSet = new Set(existing.map((r) => r.code));

  const newRecords: FacilitatorCodeRecord[] = [];

  while (newRecords.length < count) {
    const code = generateRandomCode();
    if (!existingCodeSet.has(code)) {
      existingCodeSet.add(code);
      newRecords.push({
        code,
        school_name: options.school_name?.trim() || null,
        facilitator_name: options.facilitator_name?.trim() || null,
        notes: options.notes?.trim() || null,
        created_at: new Date().toISOString(),
        is_active: true,
      });
    }
  }

  const updatedList = [...newRecords, ...existing];
  persistDataFile(updatedList);

  // Attempt to sync to Supabase facilitator_codes table if it exists
  try {
    await supabase.from("facilitator_codes").insert(newRecords);
  } catch {
    // Ignore if table does not exist in Supabase yet
  }

  return newRecords;
}

/**
 * Queries all stored facilitator codes.
 */
export async function getAllFacilitatorCodes(): Promise<FacilitatorCodeRecord[]> {
  // Try Supabase first if available
  try {
    const { data, error } = await supabase
      .from("facilitator_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data as FacilitatorCodeRecord[];
    }
  } catch {
    // Fall back to local file
  }

  return ensureDataFile();
}

/**
 * Queries a single code to find matching facilitator/school details.
 */
export async function lookupFacilitatorCode(code: string): Promise<FacilitatorCodeRecord | null> {
  const sanitized = code.trim().toUpperCase();

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from("facilitator_codes")
      .select("*")
      .eq("code", sanitized)
      .maybeSingle();

    if (!error && data) {
      return data as FacilitatorCodeRecord;
    }
  } catch {
    // Fall back to local file
  }

  const all = ensureDataFile();
  return all.find((r) => r.code === sanitized && r.is_active) || null;
}

