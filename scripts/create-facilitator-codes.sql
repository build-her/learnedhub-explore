-- ==============================================================================
-- Facilitator Codes Table for Supabase
-- Stores 6-character facilitator codes for linking sessions via school_code
-- ==============================================================================

CREATE TABLE IF NOT EXISTS facilitator_codes (
  code text PRIMARY KEY,
  school_name text,
  facilitator_name text,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE facilitator_codes ENABLE ROW LEVEL SECURITY;

-- Allow public read access so students can look up school names by code
DROP POLICY IF EXISTS "Allow public read on facilitator_codes" ON facilitator_codes;
CREATE POLICY "Allow public read on facilitator_codes"
  ON facilitator_codes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow service role full access
DROP POLICY IF EXISTS "Allow service role full access on facilitator_codes" ON facilitator_codes;
CREATE POLICY "Allow service role full access on facilitator_codes"
  ON facilitator_codes
  FOR ALL
  TO service_role
  USING (true);

