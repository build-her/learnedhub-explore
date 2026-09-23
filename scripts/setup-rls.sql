-- ==============================================================================
-- Supabase Row Level Security (RLS) Setup
-- Tables: pathways, courses
-- ==============================================================================

-- 1. Enable Row Level Security (RLS) on both tables
ALTER TABLE pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 2. Clean up any existing policies with the same name (idempotent execution)
DROP POLICY IF EXISTS "Allow public read access on pathways" ON pathways;
DROP POLICY IF EXISTS "Allow public read access on courses" ON courses;

-- 3. Allow public SELECT (read) access for anyone (anon and authenticated users)
CREATE POLICY "Allow public read access on pathways"
  ON pathways
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access on courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- NOTE ON MUTATIONS (INSERT / UPDATE / DELETE):
-- In PostgreSQL, enabling RLS enforces a default-deny policy for all actions.
-- Because no policies are defined for INSERT, UPDATE, or DELETE, all write
-- operations from client roles (anon key) are automatically denied.
-- Only the service_role key (which bypasses RLS) can perform write operations.

