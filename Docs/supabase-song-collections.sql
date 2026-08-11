-- Adds the extra song collection flags used by the admin song metadata editor.
-- Safe to run more than once.

alter table public.songs
  add column if not exists collection_1970s boolean not null default false,
  add column if not exists oldies boolean not null default false;
