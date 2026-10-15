-- ==============================================================================
-- LEARNEDHUB EXPLORE — MASTER DATABASE SCHEMA
-- ==============================================================================
-- Complete schema definition for PostgreSQL / Supabase
-- Includes:
--   1. Extensions
--   2. All 11 application tables and column definitions
--   3. Foreign keys, constraints, and performance indexes
--   4. Row Level Security (RLS) enablement on every table
--   5. Security policies for public (anon/authenticated) and service_role access
--   6. Analytics views: learner_funnel, funnel_summary, discover_dropoff
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. EXTENSIONS
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PATHWAYS TABLE
-- Stores primary academic/career pathways (Science, Arts, Commercial, Technical)
-- and their associated interactive module contents.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS pathways (
  id text PRIMARY KEY,                       -- e.g. 'science', 'arts', 'commercial', 'technical'
  name text NOT NULL,                        -- e.g. 'Science', 'Arts'
  content_json jsonb NOT NULL,               -- Syllabus, timeline, AI impact, and reflection modules
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pathways ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access on pathways" ON pathways;
CREATE POLICY "Allow public read access on pathways"
  ON pathways
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ==============================================================================
-- 2. COURSES TABLE
-- Stores tertiary courses across streams, admission requirements (JAMB/WAEC/UTME),
-- and institutional availability in Nigeria.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  faculty text NOT NULL,
  stream text NOT NULL REFERENCES pathways(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  short_description text,
  jamb_subjects text,
  waec_requirements text,
  utme_cutoff text,
  duration text,
  deep_dive text,
  profile_status text DEFAULT 'full-profile', -- 'breadth-only' | 'full-profile'
  offered_at_list text[],                     -- e.g. ARRAY['UI', 'UNN', 'ABU']
  last_verified_cycle text,                   -- e.g. '2024/2025'
  admissions_json jsonb,                      -- Structured admissions requirement object (legacy/flexible)
  offered_at_json jsonb,                      -- Structured universities list (legacy/flexible)
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_courses_stream ON courses(stream);
CREATE INDEX IF NOT EXISTS idx_courses_faculty ON courses(faculty);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read access on courses" ON courses;
CREATE POLICY "Allow public read access on courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ==============================================================================
-- 3. LEARNERS TABLE
-- Stores anonymous learner profiles identified by human-readable LH-XXXX codes.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS learners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  preferred_name text NOT NULL,
  learner_code text UNIQUE NOT NULL,         -- e.g. 'LH-Z5B6'
  acquisition_source text DEFAULT 'Direct',  -- 'Direct', partner name, or facilitator code
  entry_point text,                          -- e.g. 'discover', 'explore', 'build'
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_learners_learner_code ON learners(learner_code);

-- Enable RLS
ALTER TABLE learners ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "public read learners" ON learners;
CREATE POLICY "public read learners"
  ON learners
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public insert learners" ON learners;
CREATE POLICY "public insert learners"
  ON learners
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ==============================================================================
-- 4. SESSIONS TABLE
-- Maps opaque device/browser session tokens to registered learners.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS sessions (
  token text PRIMARY KEY,                    -- Cryptographic opaque hex token or UUID
  learner_id uuid REFERENCES learners(id) ON DELETE SET NULL,
  school_code text,                          -- Optional legacy partner/school code link
  created_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_learner_id ON sessions(learner_id);

-- Enable RLS
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "public select sessions" ON sessions;
CREATE POLICY "public select sessions"
  ON sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public insert sessions" ON sessions;
CREATE POLICY "public insert sessions"
  ON sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "public update sessions" ON sessions;
CREATE POLICY "public update sessions"
  ON sessions
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 5. ACCESS_CODES TABLE
-- Pre-generated cohort / partner organization access codes.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS access_codes (
  code text PRIMARY KEY,                     -- Alphanumeric code string
  partner_name text,
  school_name text,
  cohort text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "public read access_codes" ON access_codes;
CREATE POLICY "public read access_codes"
  ON access_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- ==============================================================================
-- 6. FACILITATOR_CODES TABLE
-- 6-character partner/school facilitator codes for classroom sessions.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS facilitator_codes (
  code text PRIMARY KEY,                     -- 6-character unambiguous charset
  school_name text,
  facilitator_name text,
  notes text,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE facilitator_codes ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read on facilitator_codes" ON facilitator_codes;
CREATE POLICY "Allow public read on facilitator_codes"
  ON facilitator_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow service role full access on facilitator_codes" ON facilitator_codes;
CREATE POLICY "Allow service role full access on facilitator_codes"
  ON facilitator_codes
  FOR ALL
  TO service_role
  USING (true);

-- ==============================================================================
-- 7. FAILED_CODE_LOOKUPS TABLE
-- Logs failed code lookup attempts for sliding-window IP rate limiting (5 per 15 min).
-- ==============================================================================
CREATE TABLE IF NOT EXISTS failed_code_lookups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,                     -- SHA-256 hash of requester IP
  attempted_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_failed_code_lookups_ip_attempted_at 
  ON failed_code_lookups (ip_hash, attempted_at DESC);

-- Enable RLS
ALTER TABLE failed_code_lookups ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Deliberately 0 public policies. All public anon/authenticated read/write is denied.
-- Only server-side SUPABASE_SERVICE_ROLE_KEY can read and insert.

-- ==============================================================================
-- 8. LOOKUP_ATTEMPTS TABLE
-- Alternative rate-limiting log table present in database schema cache.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS lookup_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  kind text NOT NULL,                        -- e.g. 'code', 'learner', 'facilitator'
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_lookup_attempts_ip_hash 
  ON lookup_attempts (ip_hash, created_at DESC);

-- Enable RLS
ALTER TABLE lookup_attempts ENABLE ROW LEVEL SECURITY;

-- Policies:
-- Deliberately 0 public policies. Restricts access entirely to service_role.

-- ==============================================================================
-- 9. DISCOVER_ATTEMPTS TABLE
-- Stores assessment runs, quiz answer choices, and resulting recommended stream.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS discover_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id uuid NOT NULL REFERENCES learners(id) ON DELETE CASCADE,
  attempt_number integer NOT NULL,
  result jsonb NOT NULL,                     -- { "stream": "arts", "answers": [0, 1, 0, ...] }
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_discover_attempts_learner_id 
  ON discover_attempts(learner_id);
CREATE INDEX IF NOT EXISTS idx_discover_attempts_learner_attempt 
  ON discover_attempts(learner_id, attempt_number DESC);

-- Enable RLS
ALTER TABLE discover_attempts ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "public read discover_attempts" ON discover_attempts;
CREATE POLICY "public read discover_attempts"
  ON discover_attempts
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "public insert discover_attempts" ON discover_attempts;
CREATE POLICY "public insert discover_attempts"
  ON discover_attempts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ==============================================================================
-- 10. ARTIFACTS TABLE
-- Stores Field Action Plans and Course Defense cases with unique shareable IDs.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id uuid REFERENCES learners(id) ON DELETE CASCADE,
  type text NOT NULL,                        -- 'plan' | 'defense'
  content jsonb NOT NULL,                    -- Reflection response, course defense text, stream info
  share_id text UNIQUE NOT NULL,             -- 8-character unique share code (e.g. '855EGFYG')
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_artifacts_learner_id ON artifacts(learner_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_artifacts_share_id ON artifacts(share_id);

-- Enable RLS
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read of artifacts" ON artifacts;
CREATE POLICY "Allow public read of artifacts"
  ON artifacts
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow public insert of artifacts" ON artifacts;
CREATE POLICY "Allow public insert of artifacts"
  ON artifacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update of artifacts" ON artifacts;
CREATE POLICY "Allow public update of artifacts"
  ON artifacts
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 11. EVENTS TABLE
-- Product analytics events logging screens viewed, pathways started, and shares.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id uuid REFERENCES learners(id) ON DELETE SET NULL,
  event_type text NOT NULL,                  -- 'session_started', 'screen_viewed', 'artifact_generated', etc.
  pathway text,                              -- 'discover', 'explore', 'build'
  screen text NOT NULL,                      -- e.g. 'discover_question_2', 'explore_defend', 'home'
  metadata_json jsonb,                       -- Additional contextual payload
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_learner_id ON events(learner_id);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_screen ON events(screen);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public insert of events" ON events;
CREATE POLICY "Allow public insert of events"
  ON events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read of events" ON events;
CREATE POLICY "Allow public read of events"
  ON events
  FOR SELECT
  TO anon, authenticated
  USING (true);


-- ==============================================================================
-- 12. ANALYTICS VIEWS
-- Derived analytical models supporting the Admin Funnel and Drop-off Dashboards.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- View A: learner_funnel
-- Aggregates learner-level boolean progression milestone flags.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE VIEW learner_funnel AS
SELECT
  l.id AS learner_id,
  l.entry_point,
  l.acquisition_source,
  l.created_at,
  COALESCE(bool_or(e.screen = 'discover_question_1'), false) AS saw_q1,
  COALESCE(bool_or(e.screen = 'discover_question_2'), false) AS answered_q1,
  COALESCE(bool_or(e.screen = 'discover_result' OR da.id IS NOT NULL), false) AS discover_done,
  COALESCE(bool_or(e.pathway = 'explore' OR e.screen IN ('explore_intro', 'explore_pathway_list')), false) AS saw_explore,
  COALESCE(bool_or(e.screen = 'explore_course_detail'), false) AS viewed_course,
  COALESCE(bool_or(e.screen = 'explore_defend'), false) AS reached_defend,
  COALESCE(bool_or(a.type = 'defense' OR (e.event_type = 'artifact_generated' AND e.pathway = 'explore')), false) AS explore_artifact,
  COALESCE(bool_or(e.event_type = 'artifact_shared'), false) AS shared,
  COALESCE(bool_or(e.pathway = 'build' OR e.screen IN ('coming_soon', 'build_intro')), false) AS hit_build
FROM learners l
LEFT JOIN events e ON e.learner_id = l.id
LEFT JOIN discover_attempts da ON da.learner_id = l.id
LEFT JOIN artifacts a ON a.learner_id = l.id
GROUP BY l.id, l.entry_point, l.acquisition_source, l.created_at;

-- ------------------------------------------------------------------------------
-- View B: funnel_summary
-- Aggregates the 10 core learner conversion steps queried by /admin/analytics.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE VIEW funnel_summary AS
WITH counts AS (
  SELECT
    count(*)::bigint AS total,
    count(*) FILTER (WHERE saw_q1)::bigint AS saw_q1_count,
    count(*) FILTER (WHERE answered_q1)::bigint AS answered_q1_count,
    count(*) FILTER (WHERE discover_done)::bigint AS discover_done_count,
    count(*) FILTER (WHERE saw_explore)::bigint AS saw_explore_count,
    count(*) FILTER (WHERE viewed_course)::bigint AS viewed_course_count,
    count(*) FILTER (WHERE reached_defend)::bigint AS reached_defend_count,
    count(*) FILTER (WHERE explore_artifact)::bigint AS explore_artifact_count,
    count(*) FILTER (WHERE shared)::bigint AS shared_count,
    count(*) FILTER (WHERE hit_build)::bigint AS hit_build_count
  FROM learner_funnel
)
SELECT 1 AS step, 'All learners'::text AS stage, total AS learners FROM counts
UNION ALL
SELECT 2 AS step, 'Discover: saw Q1'::text AS stage, saw_q1_count AS learners FROM counts
UNION ALL
SELECT 3 AS step, 'Discover: answered Q1'::text AS stage, answered_q1_count AS learners FROM counts
UNION ALL
SELECT 4 AS step, 'Discover: finished'::text AS stage, discover_done_count AS learners FROM counts
UNION ALL
SELECT 5 AS step, 'Explore: saw intro'::text AS stage, saw_explore_count AS learners FROM counts
UNION ALL
SELECT 6 AS step, 'Explore: viewed a course'::text AS stage, viewed_course_count AS learners FROM counts
UNION ALL
SELECT 7 AS step, 'Explore: reached defend'::text AS stage, reached_defend_count AS learners FROM counts
UNION ALL
SELECT 8 AS step, 'Explore: made artifact'::text AS stage, explore_artifact_count AS learners FROM counts
UNION ALL
SELECT 9 AS step, 'Shared an artifact'::text AS stage, shared_count AS learners FROM counts
UNION ALL
SELECT 10 AS step, 'Hit Build (coming soon)'::text AS stage, hit_build_count AS learners FROM counts
ORDER BY step ASC;

-- ------------------------------------------------------------------------------
-- View C: discover_dropoff
-- Computes question-by-question drop-off and change_from_prev across Discover quiz.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE VIEW discover_dropoff AS
WITH steps AS (
  SELECT 0 AS step, 'Intro'::text AS label, 'discover_intro'::text AS screen
  UNION ALL SELECT 1, 'Q1', 'discover_question_1'
  UNION ALL SELECT 2, 'Q2', 'discover_question_2'
  UNION ALL SELECT 3, 'Q3', 'discover_question_3'
  UNION ALL SELECT 4, 'Q4', 'discover_question_4'
  UNION ALL SELECT 5, 'Q5', 'discover_question_5'
  UNION ALL SELECT 6, 'Q6', 'discover_question_6'
  UNION ALL SELECT 7, 'Q7', 'discover_question_7'
  UNION ALL SELECT 8, 'Q8', 'discover_question_8'
  UNION ALL SELECT 9, 'Q9', 'discover_question_9'
  UNION ALL SELECT 10, 'Q10', 'discover_question_10'
  UNION ALL SELECT 11, 'Q11', 'discover_question_11'
  UNION ALL SELECT 12, 'Q12', 'discover_question_12'
  UNION ALL SELECT 13, 'Q13', 'discover_question_13'
  UNION ALL SELECT 14, 'Q14', 'discover_question_14'
  UNION ALL SELECT 15, 'Q15', 'discover_question_15'
  UNION ALL SELECT 16, 'Q16', 'discover_question_16'
  UNION ALL SELECT 17, 'Q17', 'discover_question_17'
  UNION ALL SELECT 18, 'Q18', 'discover_question_18'
  UNION ALL SELECT 19, 'Q19', 'discover_question_19'
  UNION ALL SELECT 20, 'Q20', 'discover_question_20'
  UNION ALL SELECT 21, 'Result', 'discover_result'
),
step_counts AS (
  SELECT
    s.step,
    s.label,
    count(DISTINCT e.learner_id)::bigint AS learners
  FROM steps s
  LEFT JOIN events e ON e.screen = s.screen AND e.learner_id IS NOT NULL
  GROUP BY s.step, s.label
),
q1_baseline AS (
  SELECT NULLIF(learners, 0) AS q1_learners
  FROM step_counts
  WHERE step = 1
)
SELECT
  sc.step,
  sc.label,
  sc.learners,
  ROUND((sc.learners::numeric / (SELECT q1_learners FROM q1_baseline)) * 100)::numeric AS pct_of_q1,
  CASE
    WHEN sc.step = 0 THEN NULL
    ELSE (sc.learners - lag(sc.learners) OVER (ORDER BY sc.step))::bigint
  END AS change_from_prev
FROM step_counts sc
ORDER BY sc.step ASC;

