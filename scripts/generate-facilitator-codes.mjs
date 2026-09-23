#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 6 characters, strictly excluding ambiguous characters: 0, O, 1, I, l (and L)
const CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function generateCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return code;
}

// Read env for Supabase admin client
const envPath = path.join(rootDir, ".env.local");
let supabase = null;
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const getEnv = (key) => {
    const match = envContent.match(new RegExp(`^\\s*${key}\\s*=\\s*<?([^>\\r\\n]+)>?`, "m"));
    return match ? match[1].trim() : null;
  };
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY") || getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  if (url && key) {
    supabase = createClient(url, key);
  }
}

// Ensure data/facilitator-codes.json
const dataDir = path.join(rootDir, "data");
const dataFile = path.join(dataDir, "facilitator-codes.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2), "utf8");
}

function loadLocalCodes() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch {
    return [];
  }
}

function saveLocalCodes(codes) {
  fs.writeFileSync(dataFile, JSON.stringify(codes, null, 2), "utf8");
}

// Parse CLI flags: --count <n>, --school <name>, --facilitator <name>, --list
const args = process.argv.slice(2);
let count = 1;
let schoolName = null;
let facilitatorName = null;
let listOnly = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--count" && args[i + 1]) {
    count = parseInt(args[++i], 10) || 1;
  } else if (args[i] === "--school" && args[i + 1]) {
    schoolName = args[++i];
  } else if (args[i] === "--facilitator" && args[i + 1]) {
    facilitatorName = args[++i];
  } else if (args[i] === "--list") {
    listOnly = true;
  }
}

async function main() {
  const existing = loadLocalCodes();

  if (listOnly) {
    console.log(`\n=== All Facilitator Codes (${existing.length} total) ===`);
    if (existing.length === 0) {
      console.log("No codes generated yet. Run without --list to generate new codes.");
    } else {
      existing.forEach((r, idx) => {
        const details = [r.school_name, r.facilitator_name].filter(Boolean).join(" · ");
        console.log(`${idx + 1}. [${r.code}] ${details ? `(${details})` : ""} - Created: ${r.created_at.slice(0, 10)}`);
      });
    }
    return;
  }

  const existingCodes = new Set(existing.map((c) => c.code));
  const newRecords = [];

  for (let i = 0; i < count; i++) {
    let code = generateCode();
    while (existingCodes.has(code)) {
      code = generateCode();
    }
    existingCodes.add(code);

    newRecords.push({
      code,
      school_name: schoolName,
      facilitator_name: facilitatorName,
      notes: null,
      created_at: new Date().toISOString(),
      is_active: true,
    });
  }

  // Save to local queryable JSON storage
  const updated = [...newRecords, ...existing];
  saveLocalCodes(updated);

  // Attempt to sync to Supabase table
  if (supabase) {
    try {
      const { error } = await supabase.from("facilitator_codes").insert(newRecords);
      if (!error) {
        console.log("(Synced to Supabase facilitator_codes table)");
      }
    } catch {
      // Table may not be created in Supabase yet
    }
  }

  console.log(`\n Successfully generated ${newRecords.length} facilitator code(s):`);
  newRecords.forEach((r, idx) => {
    console.log(`  ${idx + 1}. Code: ${r.code}`);
    if (r.school_name) console.log(`     School: ${r.school_name}`);
    if (r.facilitator_name) console.log(`     Facilitator: ${r.facilitator_name}`);
    console.log(`     Entry URL: /entry?school=${r.code}${r.school_name ? `&name=${encodeURIComponent(r.school_name)}` : ""}\n`);
  });
  console.log(`Stored in: data/facilitator-codes.json`);
}

main().catch(console.error);

