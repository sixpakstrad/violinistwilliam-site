-- Contact inquiry backup table for William Samorey / Winspiration Studio LLC.
-- Run this once in the Supabase SQL Editor before relying on /api/contact.
-- This does not touch songs or live song requests.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null,
  program_inquiry_type text,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  payload jsonb not null default '{}'::jsonb,
  source_path text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_inquiry_type_idx
  on public.contact_submissions (inquiry_type);

alter table public.contact_submissions enable row level security;

grant usage on schema public to service_role;
grant insert, select on public.contact_submissions to service_role;
