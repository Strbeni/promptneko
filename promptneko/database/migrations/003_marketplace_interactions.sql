-- ============================================================
-- PromptNeko — Marketplace interactions and production helpers
-- Likes, saved prompts, atomic stats, and full-text search indexes.
-- ============================================================

create table if not exists user_likes (
  user_id    uuid not null references users(id) on delete cascade,
  prompt_id  uuid not null references prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create table if not exists user_saved_prompts (
  user_id    uuid not null references users(id) on delete cascade,
  prompt_id  uuid not null references prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create index if not exists idx_user_likes_prompt_id on user_likes(prompt_id);
create index if not exists idx_user_saved_prompts_prompt_id on user_saved_prompts(prompt_id);
create index if not exists idx_prompts_search on prompts
  using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(long_description, '')));

alter table user_likes enable row level security;
alter table user_saved_prompts enable row level security;

drop policy if exists "user_likes_select_own" on user_likes;
drop policy if exists "user_likes_insert_own" on user_likes;
drop policy if exists "user_likes_delete_own" on user_likes;
drop policy if exists "user_saved_select_own" on user_saved_prompts;
drop policy if exists "user_saved_insert_own" on user_saved_prompts;
drop policy if exists "user_saved_delete_own" on user_saved_prompts;

create policy "user_likes_select_own" on user_likes for select using (auth.uid() = user_id);
create policy "user_likes_insert_own" on user_likes for insert with check (auth.uid() = user_id);
create policy "user_likes_delete_own" on user_likes for delete using (auth.uid() = user_id);

create policy "user_saved_select_own" on user_saved_prompts for select using (auth.uid() = user_id);
create policy "user_saved_insert_own" on user_saved_prompts for insert with check (auth.uid() = user_id);
create policy "user_saved_delete_own" on user_saved_prompts for delete using (auth.uid() = user_id);

create or replace function increment_view_count(p_id uuid)
returns int language plpgsql security definer as $$
declare next_count int;
begin
  update prompts
  set view_count = view_count + 1
  where id = p_id and status = 'active'
  returning view_count into next_count;

  return coalesce(next_count, 0);
end;
$$;

create or replace function prompt_like_count(p_id uuid)
returns int language sql stable security definer as $$
  select count(*)::int from user_likes where prompt_id = p_id;
$$;

create or replace function prompt_save_count(p_id uuid)
returns int language sql stable security definer as $$
  select count(*)::int from user_saved_prompts where prompt_id = p_id;
$$;

create or replace function refresh_prompt_review_stats()
returns trigger language plpgsql security definer as $$
declare target_prompt uuid;
begin
  target_prompt := coalesce(new.prompt_id, old.prompt_id);

  update prompts
  set
    avg_rating = coalesce((
      select round(avg(rating)::numeric, 2)
      from reviews
      where prompt_id = target_prompt and is_hidden = false
    ), 0),
    review_count = (
      select count(*)::int
      from reviews
      where prompt_id = target_prompt and is_hidden = false
    )
  where id = target_prompt;

  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_refresh_prompt_review_stats on reviews;
create trigger trg_refresh_prompt_review_stats
after insert or update or delete on reviews
for each row execute function refresh_prompt_review_stats();
