-- Upcoming performances table for William Samorey / Winspiration Studio LLC.
-- Run this once in the Supabase SQL Editor.
-- This does not touch songs, contact submissions, or live song requests.

create table if not exists public.upcoming_events (
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
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_upcoming_events_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_upcoming_events_updated_at on public.upcoming_events;

create trigger set_upcoming_events_updated_at
before update on public.upcoming_events
for each row
execute function public.set_upcoming_events_updated_at();

create index if not exists upcoming_events_public_sort_idx
  on public.upcoming_events (is_published, visibility, event_date, start_time);

create index if not exists upcoming_events_admin_sort_idx
  on public.upcoming_events (event_date, start_time, created_at);

alter table public.upcoming_events enable row level security;

grant usage on schema public to service_role;
grant select, insert, update, delete on public.upcoming_events to service_role;
