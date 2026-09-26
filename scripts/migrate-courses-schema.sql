-- ==============================================================================
-- Schema Migration: Courses Segmented Columns
-- ==============================================================================

ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS jamb_subjects text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS waec_requirements text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS utme_cutoff text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS deep_dive text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS offered_at_list text[];
ALTER TABLE courses ADD COLUMN IF NOT EXISTS last_verified_cycle text;
