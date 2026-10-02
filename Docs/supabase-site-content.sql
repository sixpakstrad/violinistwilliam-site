-- Shared site content pilot for William Samorey / Winspiration Studio LLC.
-- Run this once in the Supabase SQL Editor before using shared Admin pricing.
-- The pilot intentionally permits only the "pricing" content key.
-- It does not read, import, change, or delete any browser localStorage data.

create table if not exists public.site_content (
  content_key text primary key,
  schema_version integer not null,
  draft jsonb not null,
  published jsonb not null,
  revision integer not null default 1,
  updated_at timestamptz not null default now(),
  published_at timestamptz not null default now(),
  updated_by_clerk_user_id text not null
);

alter table public.site_content
  drop constraint if exists site_content_allowed_key_check,
  drop constraint if exists site_content_schema_version_check,
  drop constraint if exists site_content_revision_check,
  drop constraint if exists site_content_payload_size_check;

alter table public.site_content
  add constraint site_content_allowed_key_check
    check (content_key = 'pricing'),
  add constraint site_content_schema_version_check
    check (schema_version = 1),
  add constraint site_content_revision_check
    check (revision >= 1),
  add constraint site_content_payload_size_check
    check (
      octet_length(draft::text) <= 65536
      and octet_length(published::text) <= 65536
    );

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_content_updated_at on public.site_content;

create trigger set_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_site_content_updated_at();

create or replace function public.publish_pricing_content(
  p_schema_version integer,
  p_content jsonb,
  p_expected_revision integer,
  p_updated_by_clerk_user_id text
)
returns public.site_content
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_record public.site_content%rowtype;
  published_record public.site_content%rowtype;
begin
  if p_schema_version <> 1 then
    raise exception 'pricing_schema_version_invalid';
  end if;

  if p_expected_revision < 0 then
    raise exception 'pricing_expected_revision_invalid';
  end if;

  if nullif(btrim(p_updated_by_clerk_user_id), '') is null then
    raise exception 'pricing_admin_user_invalid';
  end if;

  if jsonb_typeof(p_content) <> 'object'
     or jsonb_typeof(p_content -> 'rateGuides') <> 'array'
     or jsonb_array_length(p_content -> 'rateGuides') <> 5
     or jsonb_typeof(p_content -> 'addOns') <> 'array'
     or octet_length(p_content::text) > 65536 then
    raise exception 'pricing_payload_invalid';
  end if;

  select *
    into existing_record
    from public.site_content
   where content_key = 'pricing'
   for update;

  if existing_record.content_key is null then
    if p_expected_revision <> 0 then
      raise exception 'pricing_revision_conflict';
    end if;

    insert into public.site_content (
      content_key,
      schema_version,
      draft,
      published,
      revision,
      updated_at,
      published_at,
      updated_by_clerk_user_id
    ) values (
      'pricing',
      p_schema_version,
      p_content,
      p_content,
      1,
      now(),
      now(),
      p_updated_by_clerk_user_id
    )
    returning * into published_record;
  else
    if existing_record.revision <> p_expected_revision then
      raise exception 'pricing_revision_conflict';
    end if;

    update public.site_content
       set schema_version = p_schema_version,
           draft = p_content,
           published = p_content,
           revision = existing_record.revision + 1,
           updated_at = now(),
           published_at = now(),
           updated_by_clerk_user_id = p_updated_by_clerk_user_id
     where content_key = 'pricing'
    returning * into published_record;
  end if;

  return published_record;
end;
$$;

alter table public.site_content enable row level security;

revoke all on table public.site_content from public, anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update, delete on public.site_content to service_role;

revoke all on function public.publish_pricing_content(
  integer,
  jsonb,
  integer,
  text
) from public, anon, authenticated;
grant execute on function public.publish_pricing_content(
  integer,
  jsonb,
  integer,
  text
) to service_role;
