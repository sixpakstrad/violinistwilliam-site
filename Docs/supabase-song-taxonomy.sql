-- Run once in Supabase SQL Editor, then deploy the website update.
-- Additive and safe to rerun: existing songs and boolean collections are untouched.
begin;

create table if not exists public.song_taxonomy (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('genre', 'collection')),
  name text not null check (
    char_length(name) between 1 and 60
    and name = btrim(name)
    and name !~ '[[:cntrl:]]'
    and lower(name) <> 'all'
  ),
  name_key text generated always as (
    lower(regexp_replace(btrim(name), '[[:space:]]+', ' ', 'g'))
  ) stored,
  created_at timestamptz not null default now(),
  created_by_clerk_user_id text,
  unique (kind, name_key)
);

alter table public.song_taxonomy enable row level security;
revoke all on public.song_taxonomy from anon, authenticated;
grant select, insert on public.song_taxonomy to service_role;

alter table public.songs
  add column if not exists custom_collections text[] not null default '{}';

insert into public.song_taxonomy (kind, name) values
  ('genre', 'Classical'), ('genre', 'Pop'), ('genre', 'Rock / Classic Rock'),
  ('genre', 'Metal'), ('genre', 'Country'), ('genre', 'Folk'), ('genre', 'Jazz'),
  ('genre', 'R&B / Soul'), ('genre', 'EDM / Dance'), ('genre', 'Broadway'),
  ('genre', 'Disney'), ('genre', 'Movie / TV'), ('genre', 'Holiday'),
  ('genre', 'Latin'), ('genre', 'Christian Worship'),
  ('collection', 'Wedding'), ('collection', 'Funeral'), ('collection', 'Party'),
  ('collection', 'Favorite'), ('collection', '1970s'), ('collection', '1980s'),
  ('collection', '1990s'), ('collection', '2000s'), ('collection', '2010s - Now'),
  ('collection', 'Oldies'), ('collection', 'Request Fee')
on conflict (kind, name_key) do nothing;

notify pgrst, 'reload schema';
commit;
