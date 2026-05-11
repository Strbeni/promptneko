-- ============================================================
-- Migration 002: Auth ↔ Users sync trigger
-- Run this ONCE in your Supabase SQL editor after 001_promptvault_foundation.sql
-- ============================================================

-- When a new Supabase Auth user signs up, auto-create a matching
-- public.users row using the auth user's id, email, and metadata.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  raw_meta  jsonb := new.raw_user_meta_data;
  uname     text;
  dname     text;
  base      text;
  counter   int := 0;
begin
  -- Derive a username from email prefix, sanitised to a-z0-9_-
  base  := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9_-]+', '_', 'g'));
  uname := base;
  loop
    exit when not exists (select 1 from public.users where username = uname);
    counter := counter + 1;
    uname   := base || counter;
  end loop;

  -- Display name: prefer full_name / name from OAuth metadata, else email prefix
  dname := coalesce(
    raw_meta->>'full_name',
    raw_meta->>'name',
    split_part(new.email, '@', 1)
  );

  insert into public.users (id, email, username, display_name, avatar_url, is_email_verified)
  values (
    new.id,
    new.email,
    uname,
    dname,
    raw_meta->>'avatar_url',
    new.email_confirmed_at is not null
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Fire after every new auth.users row
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- Keep is_email_verified in sync when the user confirms their email
create or replace function public.handle_email_confirmed()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if old.email_confirmed_at is null and new.email_confirmed_at is not null then
    update public.users
    set is_email_verified = true
    where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_email_confirmed on auth.users;
create trigger on_auth_email_confirmed
  after update on auth.users
  for each row execute function public.handle_email_confirmed();
