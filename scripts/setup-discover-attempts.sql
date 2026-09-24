-- ==============================================================================
-- Schema Migration: Discover Attempts Table
-- ==============================================================================

-- 1. Create discover_attempts table
create table if not exists discover_attempts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references learners(id) on delete cascade,
  attempt_number int not null,
  result jsonb not null,
  created_at timestamptz default now()
);

-- 2. Indexes for fast query by learner_id and ordering by attempt_number / created_at
create index if not exists idx_discover_attempts_learner_id 
  on discover_attempts(learner_id);

create index if not exists idx_discover_attempts_learner_attempt 
  on discover_attempts(learner_id, attempt_number desc);

-- 3. Enable Row Level Security (RLS)
alter table discover_attempts enable row level security;

-- 4. RLS Policies (Allow public SELECT and INSERT for anon and authenticated users)
drop policy if exists "public read discover_attempts" on discover_attempts;
create policy "public read discover_attempts" 
  on discover_attempts for select 
  using (true);

drop policy if exists "public insert discover_attempts" on discover_attempts;
create policy "public insert discover_attempts" 
  on discover_attempts for insert 
  with check (true);
