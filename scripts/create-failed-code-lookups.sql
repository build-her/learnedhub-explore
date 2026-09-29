-- ==============================================================================
-- Schema: failed_code_lookups table for rate limiting code lookups
-- Description: Logs failed code lookup attempts keyed by SHA-256 hash of requester IP + timestamp.
-- RLS: Enabled with NO policies (only accessible via SUPABASE_SERVICE_ROLE_KEY).
-- ==============================================================================

CREATE TABLE IF NOT EXISTS failed_code_lookups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash text NOT NULL,
  attempted_at timestamptz DEFAULT now() NOT NULL
);

-- Index for fast lookup by IP hash within the 15-minute sliding window
CREATE INDEX IF NOT EXISTS idx_failed_code_lookups_ip_attempted_at 
  ON failed_code_lookups (ip_hash, attempted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE failed_code_lookups ENABLE ROW LEVEL SECURITY;

-- Note: No policies are created for this table.
-- With RLS enabled and zero policies, all public anon and authenticated queries/mutations
-- are denied by default. Only the server-side SUPABASE_SERVICE_ROLE_KEY can read or write.
