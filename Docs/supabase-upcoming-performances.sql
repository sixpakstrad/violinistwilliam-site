-- Upcoming performances table for William Samorey / Winspiration Studio LLC.
-- Run this once in the Supabase SQL Editor.
-- This does not touch songs, contact submissions, or live song requests.
-- The website code reads from public.upcoming_performances.

create table if not exists public.upcoming_performances (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  venue_name text,
  event_date date,
  start_time time,
  end_time time,
  city text,
  state text,
  ticket_url text,
  description text,
  visibility text not null default 'public'
    check (visibility in ('public', 'private', 'hidden')),
  private_event_label text,
  is_featured boolean not null default false,
  -- Kept for compatibility, but the website now uses visibility as the
  -- public-display control. Saved performances default to true here.
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Safe upgrades for an existing table that was created before the final
-- upcoming performances schema was settled.
alter table public.upcoming_performances
  add column if not exists title text not null default '',
  add column if not exists venue_name text,
  add column if not exists event_date date,
  add column if not exists start_time time,
  add column if not exists end_time time,
  add column if not exists city text,
  add column if not exists state text,
  add column if not exists ticket_url text,
  add column if not exists description text,
  add column if not exists visibility text not null default 'public',
  add column if not exists private_event_label text,
  add column if not exists is_featured boolean not null default false,
  add column if not exists is_published boolean not null default true,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.upcoming_performances
  drop constraint if exists upcoming_performances_visibility_check;

alter table public.upcoming_performances
  add constraint upcoming_performances_visibility_check
  check (visibility in ('public', 'private', 'hidden'));

create or replace function public.set_upcoming_performances_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_upcoming_performances_updated_at
  on public.upcoming_performances;

create trigger set_upcoming_performances_updated_at
before update on public.upcoming_performances
for each row
execute function public.set_upcoming_performances_updated_at();

create index if not exists upcoming_performances_public_sort_idx
  on public.upcoming_performances
  (visibility, event_date, start_time);

create index if not exists upcoming_performances_admin_sort_idx
  on public.upcoming_performances (event_date, start_time, created_at);

alter table public.upcoming_performances enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete
  on public.upcoming_performances to service_role;
