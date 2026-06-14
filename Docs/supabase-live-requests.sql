-- Live song request tables for William Samorey / Winspiration Studio LLC.
-- Run this once in Supabase SQL Editor.
-- This does not touch the songs table.

create table if not exists public.song_request_settings (
  id text primary key,
  enabled boolean not null default true,
  current_event text not null default 'Open Requests',
  updated_at timestamptz not null default now()
);

insert into public.song_request_settings (id, enabled, current_event)
values ('live_requests', true, 'Open Requests')
on conflict (id) do nothing;

create table if not exists public.song_requests (
  id uuid primary key default gen_random_uuid(),
  event_name text not null default 'Open Requests',
  title text not null,
  artist text not null default '',
  source text not null default '',
  genre text not null default '',
  notes text not null default '',
  sheet_music text not null default '',
  backing_track text not null default '',
  url text not null default '',
  guest_name text not null default '',
  review text not null default '',
  review_marketing_permission boolean not null default false,
  review_display_name text not null default 'First name only',
  review_status text not null default 'new'
    check (review_status in ('new', 'approved', 'featured', 'archived')),
  requested_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'playlist', 'played', 'archived'))
);

alter table public.song_requests
  add column if not exists id uuid default gen_random_uuid(),
  add column if not exists event_name text not null default 'Open Requests',
  add column if not exists title text not null default 'Untitled Song',
  add column if not exists artist text not null default '',
  add column if not exists source text not null default '',
  add column if not exists genre text not null default '',
  add column if not exists notes text not null default '',
  add column if not exists sheet_music text not null default '',
  add column if not exists backing_track text not null default '',
  add column if not exists url text not null default '',
  add column if not exists guest_name text not null default '',
  add column if not exists review text not null default '',
  add column if not exists review_marketing_permission boolean not null default false,
  add column if not exists review_display_name text not null default 'First name only',
  add column if not exists review_status text not null default 'new',
  add column if not exists requested_at timestamptz not null default now(),
  add column if not exists status text not null default 'new';

create index if not exists song_requests_requested_at_idx
  on public.song_requests (requested_at desc);

create index if not exists song_requests_event_name_idx
  on public.song_requests (event_name);

create index if not exists song_requests_status_idx
  on public.song_requests (status);

alter table public.song_request_settings enable row level security;
alter table public.song_requests enable row level security;

grant usage on schema public to service_role;
grant select, insert, update on public.song_request_settings to service_role;
grant select, insert, update, delete on public.song_requests to service_role;

-- Optional cleanup for older draft request schemas.
-- Run only after confirming these columns are empty or no longer needed.
-- alter table public.song_requests
--   drop column if exists song_id,
--   drop column if exists song_title,
--   drop column if exists requester_name,
--   drop column if exists message,
--   drop column if exists event_code,
--   drop column if exists created_at;

-- No public RLS policies are needed.
-- The website reads and writes through server-side API routes using the
-- Supabase service role key. Admin routes also verify Clerk admin access.
