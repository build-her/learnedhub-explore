-- ==============================================================================
-- Schema Migration: Learners, Access Codes, and Session Learner Association
-- ==============================================================================

-- 1. Create learners table
create table if not exists learners (
  id uuid primary key default gen_random_uuid(),
  preferred_name text not null,
  learner_code text unique not null,
  acquisition_source text default 'Direct',
  entry_point text,
  created_at timestamptz default now()
);

-- 2. Create access_codes table
create table if not exists access_codes (
  code text primary key,
  partner_name text,
  school_name text,
  cohort text,
  created_at timestamptz default now()
);

-- 3. Update sessions table to reference learners
alter table sessions add column if not exists learner_id uuid references learners(id);
alter table sessions drop column if exists school_code;

-- 4. Enable Row Level Security (RLS)
alter table learners enable row level security;
alter table access_codes enable row level security;

-- 5. RLS Policies
drop policy if exists "public read learners" on learners;
create policy "public read learners" on learners for select using (true);

drop policy if exists "public insert learners" on learners;
create policy "public insert learners" on learners for insert with check (true);

drop policy if exists "public read access_codes" on access_codes;
create policy "public read access_codes" on access_codes for select using (true);

