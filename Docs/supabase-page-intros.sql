-- Shared PageIntro content for William Samorey / Winspiration Studio LLC.
-- Run this after Docs/supabase-site-content.sql.
-- This migration does not insert, update, or publish any content record.
-- It preserves the existing pricing row and pricing publishing function.

alter table public.site_content
  drop constraint if exists site_content_allowed_key_check;

alter table public.site_content
  add constraint site_content_allowed_key_check
    check (content_key in ('pricing', 'page-intros'));

create or replace function public.publish_page_intro_content(
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
  page_record jsonb;
  page_key text;
  page_keys text[] := array[]::text[];
  allowed_page_keys constant text[] := array[
    'education',
    'music',
    'performance',
    'groups',
    'rates',
    'contact',
    'requests',
    'admin'
  ];
begin
  if p_schema_version is null or p_schema_version <> 1 then
    raise exception 'page_intro_schema_version_invalid';
  end if;

  if p_expected_revision is null or p_expected_revision < 0 then
    raise exception 'page_intro_expected_revision_invalid';
  end if;

  if nullif(btrim(p_updated_by_clerk_user_id), '') is null then
    raise exception 'page_intro_admin_user_invalid';
  end if;

  if jsonb_typeof(p_content) is distinct from 'object'
     or jsonb_typeof(p_content -> 'pages') is distinct from 'array'
     or jsonb_array_length(p_content -> 'pages') <> 8
     or octet_length(p_content::text) > 65536 then
    raise exception 'page_intro_payload_invalid';
  end if;

  for page_record in
    select value from jsonb_array_elements(p_content -> 'pages')
  loop
    if jsonb_typeof(page_record) is distinct from 'object' then
      raise exception 'page_intro_page_invalid';
    end if;

    page_key := page_record ->> 'key';
    if page_key is null or not (page_key = any(allowed_page_keys)) then
      raise exception 'page_intro_key_invalid';
    end if;

    if page_key = any(page_keys) then
      raise exception 'page_intro_key_duplicate';
    end if;
    page_keys := array_append(page_keys, page_key);

    if jsonb_typeof(page_record -> 'eyebrow') is distinct from 'string'
       or nullif(btrim(page_record ->> 'eyebrow'), '') is null
       or length(page_record ->> 'eyebrow') > 120
       or jsonb_typeof(page_record -> 'title') is distinct from 'string'
       or nullif(btrim(page_record ->> 'title'), '') is null
       or length(page_record ->> 'title') > 240
       or jsonb_typeof(page_record -> 'copy') is distinct from 'string'
       or length(page_record ->> 'copy') > 1200
       or jsonb_typeof(page_record -> 'titleSize') is distinct from 'string'
       or length(page_record ->> 'titleSize') > 80
       or jsonb_typeof(page_record -> 'titleColor') is distinct from 'string'
       or length(page_record ->> 'titleColor') > 80
       or jsonb_typeof(page_record -> 'subtitleSize') is distinct from 'string'
       or length(page_record ->> 'subtitleSize') > 80
       or jsonb_typeof(page_record -> 'subtitleColor') is distinct from 'string'
       or length(page_record ->> 'subtitleColor') > 80 then
      raise exception 'page_intro_page_fields_invalid';
    end if;
  end loop;

  if not (page_keys @> allowed_page_keys and allowed_page_keys @> page_keys) then
    raise exception 'page_intro_keys_incomplete';
  end if;

  if p_expected_revision = 0 and not exists (
    select 1
      from jsonb_array_elements(p_content -> 'pages') as page
     where page ->> 'key' = 'performance'
       and page ->> 'eyebrow' = 'Weddings & Events'
       and page ->> 'title' =
         'Live string music, curated by William, for the moments you''ll remember.'
  ) then
    raise exception 'page_intro_initial_performance_wording_invalid';
  end if;

  select *
    into existing_record
    from public.site_content
   where content_key = 'page-intros'
   for update;

  if existing_record.content_key is null then
    if p_expected_revision <> 0 then
      raise exception 'page_intro_revision_conflict';
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
      'page-intros',
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
      raise exception 'page_intro_revision_conflict';
    end if;

    update public.site_content
       set schema_version = p_schema_version,
           draft = p_content,
           published = p_content,
           revision = existing_record.revision + 1,
           updated_at = now(),
           published_at = now(),
           updated_by_clerk_user_id = p_updated_by_clerk_user_id
     where content_key = 'page-intros'
    returning * into published_record;
  end if;

  return published_record;
end;
$$;

alter table public.site_content enable row level security;

revoke all on table public.site_content from public, anon, authenticated;
grant usage on schema public to service_role;
grant select, insert, update, delete on public.site_content to service_role;

revoke all on function public.publish_page_intro_content(
  integer,
  jsonb,
  integer,
  text
) from public, anon, authenticated;
grant execute on function public.publish_page_intro_content(
  integer,
  jsonb,
  integer,
  text
) to service_role;
