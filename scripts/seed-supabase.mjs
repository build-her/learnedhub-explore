import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { STREAM_LABELS, STREAM_CONTENT } from "../lib/discover-content.ts";
import { COURSES } from "../lib/courses.ts";

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
console.log("Using SUPABASE_SERVICE_ROLE_KEY (prefix:", supabaseServiceKey.slice(0, 12) + "...)");

// Generate deterministic UUID v5 from a string
function stringToUuid(str, namespace = "learnedhub-courses") {
  const hash = crypto.createHash("sha1").update(`${namespace}:${str}`).digest("hex");
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    "5" + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) + hash.substring(18, 20),
    hash.substring(20, 32),
  ].join("-");
}

async function main() {
  // 2. Prepare pathways data
  const streamKeys = Object.keys(STREAM_CONTENT);
  const pathwayRows = streamKeys.map((streamKey) => ({
    id: streamKey,
    name: STREAM_LABELS[streamKey] || streamKey,
    content_json: STREAM_CONTENT[streamKey],
  }));

  console.log(`\nInserting ${pathwayRows.length} pathway streams into "pathways"...`);
  const pathwaysResponse = await fetch(`${supabaseUrl}/rest/v1/pathways?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(pathwayRows),
  });

  if (!pathwaysResponse.ok) {
    const errorText = await pathwaysResponse.text();
    console.error(`Failed to insert pathways: HTTP ${pathwaysResponse.status} - ${errorText}`);
    process.exit(1);
  }

  const insertedPathways = await pathwaysResponse.json();
  console.log(`Successfully inserted/upserted ${insertedPathways.length} rows into "pathways":`);
  insertedPathways.forEach((p) => {
    console.log(`  - [${p.id}] ${p.name}`);
  });

  // 3. Prepare courses data
  const courseRows = COURSES.map((course) => ({
    id: stringToUuid(course.id),
    faculty: course.faculty,
    name: course.name,
    stream: course.stream,
    profile_status: course.profileStatus,
    admissions_json: {
      id: course.id,
      slug: course.id,
      shortDescription: course.shortDescription,
      deepDive: course.deepDive ?? null,
      jambSubjects: course.jambSubjects ?? null,
      waecRequirements: course.waecRequirements ?? null,
      utmeCutoff: course.utmeCutoff ?? null,
      duration: course.duration ?? null,
    },
    offered_at_json: course.offeredAt ?? null,
    last_verified_cycle: null,
  }));

  console.log(`\nInserting ${courseRows.length} courses into "courses"...`);
  const coursesResponse = await fetch(`${supabaseUrl}/rest/v1/courses?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(courseRows),
  });

  if (!coursesResponse.ok) {
    const errorText = await coursesResponse.text();
    console.error(`Failed to insert courses: HTTP ${coursesResponse.status} - ${errorText}`);
    process.exit(1);
  }

  const insertedCourses = await coursesResponse.json();
  console.log(`Successfully inserted/upserted ${insertedCourses.length} rows into "courses":`);
  insertedCourses.forEach((c) => {
    console.log(`  - [${c.stream}] ${c.name} (${c.faculty}, status: ${c.profile_status})`);
  });

  // 4. Verify table counts from Supabase
  console.log("\nVerifying database rows...");
  const verifyPathwaysRes = await fetch(`${supabaseUrl}/rest/v1/pathways?select=id,name`, {
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
  });
  const verifiedPathways = await verifyPathwaysRes.json();

  const verifyCoursesRes = await fetch(`${supabaseUrl}/rest/v1/courses?select=id,name,stream,profile_status`, {
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
  });
  const verifiedCourses = await verifyCoursesRes.json();

  console.log("\n================ SUMMARY ================");
  console.log(`Pathways row count in Supabase: ${verifiedPathways.length}`);
  console.log(`Courses row count in Supabase:  ${verifiedCourses.length}`);
  console.log("=========================================\n");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

