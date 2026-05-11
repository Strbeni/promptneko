-- ============================================================
-- PromptNeko — Full Schema Migration
-- Run once against your Supabase project
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ── ENUMS ──────────────────────────────────────────────────────────────
create type user_role as enum ('buyer', 'creator', 'admin');
create type certification_level as enum ('none', 'basic', 'pro', 'expert', 'verified_pro');
create type payout_schedule as enum ('weekly', 'biweekly', 'monthly');
create type pricing_type as enum ('free', 'one_time', 'subscription_only', 'api_per_use');
create type prompt_status as enum ('draft', 'pending_review', 'active', 'rejected', 'deprecated', 'needs_update');
create type variable_type as enum ('text', 'textarea', 'select', 'number', 'boolean', 'multi_select', 'date', 'url', 'color');
create type asset_type as enum ('image', 'video');
create type payment_method as enum ('stripe', 'crypto');
create type purchase_status as enum ('pending', 'completed', 'refunded', 'disputed', 'chargeback');
create type moderation_status as enum ('pending', 'approved', 'rejected', 'needs_revision');
create type report_target_type as enum ('prompt', 'review', 'user', 'creator');
create type report_reason as enum ('stolen_content', 'misleading', 'doesnt_work', 'inappropriate', 'spam', 'fake_reviews', 'other');
create type report_status as enum ('open', 'investigating', 'resolved', 'dismissed');

-- ── USERS ──────────────────────────────────────────────────────────────
create table users (
  id              uuid primary key default uuid_generate_v4(),
  email           text unique not null,
  username        text unique not null check (username ~ '^[a-z0-9_-]+$'),
  display_name    text not null,
  avatar_url      text,
  bio             text check (char_length(bio) <= 500),
  role            user_role not null default 'buyer',
  is_email_verified    boolean not null default false,
  is_creator_approved  boolean not null default false,
  stripe_customer_id   text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  last_active_at  timestamptz,
  is_banned       boolean not null default false,
  ban_reason      text
);
create index idx_users_role on users(role);
create index idx_users_username on users(username);

-- ── CREATOR PROFILES ───────────────────────────────────────────────────
create table creator_profiles (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references users(id) on delete cascade unique,
  tagline                     text check (char_length(tagline) <= 100),
  website_url                 text,
  twitter_handle              text,
  github_handle               text,
  specializations             text[] not null default '{}',
  total_prompts_published     int not null default 0,
  total_sales_count           int not null default 0,
  total_revenue_cents         bigint not null default 0,
  avg_rating                  numeric(3,2) not null default 0,
  avg_response_time_hours     numeric,
  certification_level         certification_level not null default 'none',
  is_featured                 boolean not null default false,
  stripe_connect_account_id   text,
  stripe_connect_onboarded    boolean not null default false,
  payout_schedule             payout_schedule not null default 'monthly',
  created_at                  timestamptz not null default now()
);
create index idx_creator_profiles_user_id on creator_profiles(user_id);
create index idx_creator_profiles_is_featured on creator_profiles(is_featured);

-- ── CATEGORIES ─────────────────────────────────────────────────────────
create table categories (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text unique not null,
  name                text not null,
  description         text,
  icon_name           text,
  parent_category_id  uuid references categories(id) on delete set null,
  sort_order          int not null default 0,
  prompt_count        int not null default 0,
  is_active           boolean not null default true,
  created_at          timestamptz not null default now()
);
create index idx_categories_parent on categories(parent_category_id);
create index idx_categories_slug on categories(slug);

-- ── PROMPTS ────────────────────────────────────────────────────────────
create table prompts (
  id                          uuid primary key default uuid_generate_v4(),
  creator_id                  uuid not null references users(id) on delete cascade,
  title                       text not null check (char_length(title) <= 100),
  slug                        text unique not null,
  short_description           text not null check (char_length(short_description) <= 250),
  long_description            text check (char_length(long_description) <= 5000),
  content                     text not null,
  category_id                 uuid references categories(id) on delete set null,
  subcategory_id              uuid references categories(id) on delete set null,
  model_compatibility         text[] not null default '{}',
  primary_model               text,
  price_cents                 int not null default 0 check (price_cents >= 0),
  pricing_type                pricing_type not null default 'free',
  status                      prompt_status not null default 'draft',
  rejection_reason            text,
  is_featured                 boolean not null default false,
  is_staff_pick               boolean not null default false,
  is_nsfw                     boolean not null default false,
  needs_update_warning        boolean not null default false,
  language                    text not null default 'en',
  supported_languages         text[] not null default '{"en"}',
  view_count                  int not null default 0,
  purchase_count              int not null default 0,
  fork_count                  int not null default 0,
  avg_rating                  numeric(3,2) not null default 0,
  review_count                int not null default 0,
  tags                        text[] not null default '{}' check (array_length(tags, 1) <= 10),
  version                     text not null default '1.0.0',
  parent_prompt_id            uuid references prompts(id) on delete set null,
  fork_depth                  int not null default 0,
  forked_from_version         text,
  use_cases                   text[] not null default '{}' check (array_length(use_cases, 1) <= 5),
  expected_output_description text check (char_length(expected_output_description) <= 500),
  example_input               jsonb,
  example_output              text,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  published_at                timestamptz
);
create index idx_prompts_creator_id on prompts(creator_id);
create index idx_prompts_category_id on prompts(category_id);
create index idx_prompts_subcategory_id on prompts(subcategory_id);
create index idx_prompts_status on prompts(status);
create index idx_prompts_slug on prompts(slug);
create index idx_prompts_tags on prompts using gin(tags);
create index idx_prompts_model_compatibility on prompts using gin(model_compatibility);
create index idx_prompts_published_at on prompts(published_at desc);
create index idx_prompts_is_featured on prompts(is_featured) where is_featured = true;

-- ── PROMPT ASSETS ──────────────────────────────────────────────────────
create table prompt_assets (
  id          uuid primary key default uuid_generate_v4(),
  prompt_id   uuid not null references prompts(id) on delete cascade,
  url         text not null,
  type        asset_type not null default 'image',
  width       int,
  height      int,
  is_primary  boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);
create index idx_prompt_assets_prompt_id on prompt_assets(prompt_id);

-- ── PROMPT VARIABLES ───────────────────────────────────────────────────
create table prompt_variables (
  id               uuid primary key default uuid_generate_v4(),
  prompt_id        uuid not null references prompts(id) on delete cascade,
  name             text not null,
  placeholder_key  text not null,
  description      text check (char_length(description) <= 200),
  variable_type    variable_type not null default 'text',
  default_value    text,
  options          jsonb,
  validation_rules jsonb,
  is_required      boolean not null default true,
  is_advanced      boolean not null default false,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);
create index idx_prompt_variables_prompt_id on prompt_variables(prompt_id);

-- ── PROMPT VERSIONS ────────────────────────────────────────────────────
create table prompt_versions (
  id                  uuid primary key default uuid_generate_v4(),
  prompt_id           uuid not null references prompts(id) on delete cascade,
  version             text not null,
  content_snapshot    text not null,
  variables_snapshot  jsonb not null default '[]',
  changelog           text,
  is_breaking_change  boolean not null default false,
  created_by          uuid not null references users(id),
  created_at          timestamptz not null default now(),
  unique (prompt_id, version)
);
create index idx_prompt_versions_prompt_id on prompt_versions(prompt_id);

-- ── PURCHASES ──────────────────────────────────────────────────────────
create table purchases (
  id                          uuid primary key default uuid_generate_v4(),
  buyer_id                    uuid not null references users(id) on delete restrict,
  prompt_id                   uuid not null references prompts(id) on delete restrict,
  prompt_version_at_purchase  text not null,
  amount_paid_cents           int not null default 0,
  platform_fee_cents          int not null default 0,
  creator_earnings_cents      int not null default 0,
  currency                    text not null default 'usd',
  payment_method              payment_method not null default 'stripe',
  stripe_payment_intent_id    text,
  stripe_session_id           text,
  crypto_tx_hash              text,
  status                      purchase_status not null default 'pending',
  refund_reason               text,
  refunded_at                 timestamptz,
  created_at                  timestamptz not null default now(),
  unique (buyer_id, prompt_id)
);
create index idx_purchases_buyer_id on purchases(buyer_id);
create index idx_purchases_prompt_id on purchases(prompt_id);
create index idx_purchases_status_completed on purchases(prompt_id) where status = 'completed';

-- ── REVIEWS ────────────────────────────────────────────────────────────
create table reviews (
  id                   uuid primary key default uuid_generate_v4(),
  reviewer_id          uuid not null references users(id) on delete cascade,
  prompt_id            uuid not null references prompts(id) on delete cascade,
  purchase_id          uuid not null references purchases(id) on delete restrict,
  rating               int not null check (rating between 1 and 5),
  title                text check (char_length(title) <= 100),
  content              text check (char_length(content) <= 1500),
  model_used           text,
  use_case_tried       text,
  would_recommend      boolean,
  is_verified_purchase boolean not null default true,
  is_hidden            boolean not null default false,
  helpful_count        int not null default 0,
  not_helpful_count    int not null default 0,
  creator_reply        text,
  creator_replied_at   timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique (reviewer_id, prompt_id)
);
create index idx_reviews_prompt_id on reviews(prompt_id);
create index idx_reviews_reviewer_id on reviews(reviewer_id);

-- ── COLLECTIONS ────────────────────────────────────────────────────────
create table collections (
  id               uuid primary key default uuid_generate_v4(),
  owner_id         uuid not null references users(id) on delete cascade,
  name             text not null check (char_length(name) <= 100),
  description      text check (char_length(description) <= 500),
  is_public        boolean not null default true,
  cover_image_url  text,
  item_count       int not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index idx_collections_owner_id on collections(owner_id);

create table collection_items (
  collection_id  uuid not null references collections(id) on delete cascade,
  prompt_id      uuid not null references prompts(id) on delete cascade,
  added_at       timestamptz not null default now(),
  primary key (collection_id, prompt_id)
);
create index idx_collection_items_prompt_id on collection_items(prompt_id);

-- ── MODERATION ─────────────────────────────────────────────────────────
create table moderation_queue (
  id                       uuid primary key default uuid_generate_v4(),
  prompt_id                uuid not null references prompts(id) on delete cascade,
  submitted_by             uuid not null references users(id),
  assigned_to              uuid references users(id),
  status                   moderation_status not null default 'pending',
  reviewer_notes           text,
  submitted_at             timestamptz not null default now(),
  reviewed_at              timestamptz,
  review_duration_seconds  int
);
create index idx_moderation_queue_prompt_id on moderation_queue(prompt_id);
create index idx_moderation_queue_status on moderation_queue(status);

create table moderation_reports (
  id               uuid primary key default uuid_generate_v4(),
  reported_by      uuid not null references users(id),
  target_type      report_target_type not null,
  target_id        uuid not null,
  reason           report_reason not null,
  description      text check (char_length(description) <= 500),
  status           report_status not null default 'open',
  resolved_by      uuid references users(id),
  resolution_notes text,
  created_at       timestamptz not null default now(),
  resolved_at      timestamptz
);
create index idx_moderation_reports_target on moderation_reports(target_type, target_id);
create index idx_moderation_reports_status on moderation_reports(status);

-- ── TRIGGERS: updated_at ───────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger trg_users_updated_at before update on users
  for each row execute function update_updated_at();
create trigger trg_prompts_updated_at before update on prompts
  for each row execute function update_updated_at();
create trigger trg_reviews_updated_at before update on reviews
  for each row execute function update_updated_at();
create trigger trg_collections_updated_at before update on collections
  for each row execute function update_updated_at();

-- ── TRIGGER: increment category prompt_count ───────────────────────────
create or replace function update_category_prompt_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' and new.status = 'active' then
    update categories set prompt_count = prompt_count + 1 where id = new.category_id;
  elsif TG_OP = 'UPDATE' then
    if old.status != 'active' and new.status = 'active' then
      update categories set prompt_count = prompt_count + 1 where id = new.category_id;
    elsif old.status = 'active' and new.status != 'active' then
      update categories set prompt_count = greatest(prompt_count - 1, 0) where id = new.category_id;
    end if;
  elsif TG_OP = 'DELETE' and old.status = 'active' then
    update categories set prompt_count = greatest(prompt_count - 1, 0) where id = old.category_id;
  end if;
  return coalesce(new, old);
end;
$$;

create trigger trg_category_prompt_count
after insert or update or delete on prompts
for each row execute function update_category_prompt_count();

-- ── TRIGGER: auto-slug from title ──────────────────────────────────────
create or replace function generate_prompt_slug()
returns trigger language plpgsql as $$
declare base_slug text; final_slug text; counter int := 0;
begin
  base_slug := lower(regexp_replace(new.title, '[^a-z0-9]+', '-', 'gi'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  loop
    exit when not exists (select 1 from prompts where slug = final_slug and id != coalesce(new.id, uuid_generate_v4()));
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  end loop;
  new.slug := final_slug;
  return new;
end;
$$;

create trigger trg_prompt_slug
before insert on prompts
for each row when (new.slug is null or new.slug = '')
execute function generate_prompt_slug();

-- ── SEED: Top-level categories ─────────────────────────────────────────
insert into categories (slug, name, description, icon_name, sort_order) values
  ('writing-copy',         'Writing & Copy',        'Craft compelling written content',   'PenLine',     1),
  ('image-generation',     'Image Generation',      'Prompts for AI image models',        'ImageIcon',   2),
  ('code-development',     'Code & Development',    'Prompts for coding and engineering', 'Code2',       3),
  ('marketing-growth',     'Marketing & Growth',    'Drive growth with AI copy',          'Megaphone',   4),
  ('business-strategy',    'Business & Strategy',   'Strategic business content',         'Briefcase',   5),
  ('legal-compliance',     'Legal & Compliance',    'Legal documents and analysis',       'Scale',       6),
  ('research-analytics',   'Research & Analytics',  'Research and data insights',         'BarChart2',   7),
  ('education-training',   'Education & Training',  'Learning and curriculum design',     'GraduationCap',8),
  ('productivity',         'Productivity',          'Streamline your workflows',          'Zap',         9),
  ('finance',              'Finance',               'Financial analysis and modeling',    'DollarSign',  10),
  ('design',               'Design',                'Creative design prompts',            'Palette',     11),
  ('health-wellness',      'Health & Wellness',     'Fitness, nutrition, wellbeing',      'Heart',       12);

-- ── SEED: Subcategories ────────────────────────────────────────────────
with parent as (select id, slug from categories where parent_category_id is null)
insert into categories (slug, name, parent_category_id, sort_order) 
select sub.slug, sub.name, p.id, sub.ord
from (values
  ('blog-posts','Blog Posts','writing-copy',1),('email','Email','writing-copy',2),
  ('social-media','Social Media','writing-copy',3),('ad-copy','Ad Copy','writing-copy',4),
  ('storytelling','Storytelling','writing-copy',5),('scriptwriting','Scriptwriting','writing-copy',6),
  ('academic','Academic','writing-copy',7),('seo-content','SEO Content','writing-copy',8),
  ('newsletter','Newsletter','writing-copy',9),('podcast','Podcast','writing-copy',10),

  ('portrait','Portrait','image-generation',1),('product-photography','Product Photography','image-generation',2),
  ('architecture','Architecture','image-generation',3),('concept-art','Concept Art','image-generation',4),
  ('logo-brand','Logo/Brand','image-generation',5),('fashion','Fashion','image-generation',6),
  ('landscape','Landscape','image-generation',7),('abstract','Abstract','image-generation',8),
  ('character-design','Character Design','image-generation',9),('ui-mockup','UI Mockup','image-generation',10),

  ('code-review','Code Review','code-development',1),('debugging','Debugging','code-development',2),
  ('refactoring','Refactoring','code-development',3),('documentation','Documentation','code-development',4),
  ('test-generation','Test Generation','code-development',5),('system-design','System Design','code-development',6),
  ('api-design','API Design','code-development',7),('sql','SQL','code-development',8),
  ('devops','DevOps','code-development',9),('security-audit','Security Audit','code-development',10),

  ('landing-pages','Landing Pages','marketing-growth',1),('cold-email','Cold Email','marketing-growth',2),
  ('lead-gen','Lead Gen','marketing-growth',3),('cro','CRO','marketing-growth',4),
  ('brand-voice','Brand Voice','marketing-growth',5),('campaign-brief','Campaign Brief','marketing-growth',6),
  ('competitor-analysis','Competitor Analysis','marketing-growth',7),('viral-content','Viral Content','marketing-growth',8)
) as sub(slug,name,parent_slug,ord)
join parent p on p.slug = sub.parent_slug;

-- ── ROW LEVEL SECURITY ─────────────────────────────────────────────────
alter table prompts enable row level security;
alter table prompt_assets enable row level security;
alter table prompt_variables enable row level security;
alter table purchases enable row level security;
alter table reviews enable row level security;

-- Public can read active prompts
create policy "prompts_select_active" on prompts for select using (status = 'active');
-- Public can read assets and variables of active prompts
create policy "assets_select_active" on prompt_assets for select
  using (exists (select 1 from prompts p where p.id = prompt_id and p.status = 'active'));
create policy "variables_select_active" on prompt_variables for select
  using (exists (select 1 from prompts p where p.id = prompt_id and p.status = 'active'));
-- Authenticated users can read their own purchases
create policy "purchases_select_own" on purchases for select using (auth.uid() = buyer_id);
-- Creators can insert/update their own prompts
create policy "prompts_insert_own" on prompts for insert with check (auth.uid() = creator_id);
create policy "prompts_update_own" on prompts for update using (auth.uid() = creator_id);
