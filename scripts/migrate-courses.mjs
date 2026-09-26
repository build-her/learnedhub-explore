import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Read .env.local
const envFilePath = path.join(rootDir, ".env.local");
if (!fs.existsSync(envFilePath)) {
  console.error("Error: .env.local not found at", envFilePath);
  process.exit(1);
}

const envContent = fs.readFileSync(envFilePath, "utf8");

function getEnvValue(content, key) {
  const match = content.match(new RegExp(`^\\s*${key}\\s*=\\s*<?([^>\\r\\n]+)>?`, "m"));
  return match ? match[1].trim() : null;
}

const supabaseUrl = getEnvValue(envContent, "NEXT_PUBLIC_SUPABASE_URL");
const supabaseServiceKey = getEnvValue(envContent, "SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local");
  process.exit(1);
}

console.log("Supabase URL:", supabaseUrl);

// 2. Load 124 courses JSON
const jsonPath = path.join(rootDir, "data", "courses-124.json");
const coursesData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

console.log(`Loaded ${coursesData.length} courses from ${jsonPath}`);

const courseRows = coursesData.map((c) => ({
  id: c.uuid,
  name: c.name,
  stream: c.stream,
  faculty: c.faculty,
  short_description: c.short_description,
  jamb_subjects: c.jamb_subjects,
  waec_requirements: c.waec_requirements,
  utme_cutoff: c.utme_cutoff,
  duration: c.duration,
  deep_dive: c.deep_dive,
  profile_status: c.profile_status,
  offered_at_list: c.offered_at_list,
  last_verified_cycle: null,
}));

async function main() {
  console.log(`\nMigrating ${courseRows.length} courses into "courses" table...`);

  // Try inserting in batches of 25
  const batchSize = 25;
  let totalInserted = 0;

  for (let i = 0; i < courseRows.length; i += batchSize) {
    const batch = courseRows.slice(i, i + batchSize);
    console.log(`Sending batch ${Math.floor(i / batchSize) + 1} (${batch.length} rows)...`);

    const res = await fetch(`${supabaseUrl}/rest/v1/courses?on_conflict=id`, {
      method: "POST",
      headers: {
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(batch),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Batch failed: HTTP ${res.status} - ${err}`);
      console.log("\nIf this failed due to missing columns, please execute 'scripts/seed-124-courses.sql' or 'scripts/migrate-courses-schema.sql' in the Supabase SQL editor first.");
      process.exit(1);
    }

    const inserted = await res.json();
    totalInserted += inserted.length;
    console.log(`  ✓ Inserted ${inserted.length} rows (total: ${totalInserted})`);
  }

  console.log(`\nSuccessfully migrated all ${totalInserted} courses into Supabase!`);
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
