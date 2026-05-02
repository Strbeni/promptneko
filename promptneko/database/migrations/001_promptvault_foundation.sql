BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TYPE user_role AS ENUM ('buyer', 'creator', 'admin');
CREATE TYPE certification_level AS ENUM ('none', 'basic', 'pro', 'expert', 'verified_pro');
CREATE TYPE payout_schedule AS ENUM ('weekly', 'biweekly', 'monthly');
CREATE TYPE pricing_type AS ENUM ('free', 'one_time', 'subscription_only', 'api_per_use');
CREATE TYPE prompt_status AS ENUM ('draft', 'pending_review', 'active', 'rejected', 'deprecated', 'needs_update');
CREATE TYPE variable_type AS ENUM ('text', 'textarea', 'select', 'number', 'boolean', 'multi_select', 'date', 'url', 'color');
CREATE TYPE payment_method AS ENUM ('stripe', 'crypto');
CREATE TYPE purchase_status AS ENUM ('pending', 'completed', 'refunded', 'disputed', 'chargeback');
CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected', 'needs_revision');
CREATE TYPE report_target_type AS ENUM ('prompt', 'review', 'user', 'creator');
CREATE TYPE report_reason AS ENUM ('stolen_content', 'misleading', 'doesnt_work', 'inappropriate', 'spam', 'fake_reviews', 'other');
CREATE TYPE report_status AS ENUM ('open', 'investigating', 'resolved', 'dismissed');

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  display_name text NOT NULL,
  avatar_url text,
  bio text CHECK (char_length(bio) <= 500),
  role user_role NOT NULL DEFAULT 'buyer',
  is_email_verified boolean NOT NULL DEFAULT false,
  is_creator_approved boolean NOT NULL DEFAULT false,
  stripe_customer_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_active_at timestamptz,
  is_banned boolean NOT NULL DEFAULT false,
  ban_reason text,
  CONSTRAINT users_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT users_username_slug_safe CHECK (username = lower(username) AND username ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE TABLE creator_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  tagline text CHECK (char_length(tagline) <= 100),
  website_url text,
  twitter_handle text,
  github_handle text,
  specializations text[] NOT NULL DEFAULT '{}',
  total_prompts_published integer NOT NULL DEFAULT 0 CHECK (total_prompts_published >= 0),
  total_sales_count integer NOT NULL DEFAULT 0 CHECK (total_sales_count >= 0),
  total_revenue_cents integer NOT NULL DEFAULT 0 CHECK (total_revenue_cents >= 0),
  avg_rating numeric(3,2) NOT NULL DEFAULT 0 CHECK (avg_rating >= 0 AND avg_rating <= 5),
  avg_response_time_hours integer CHECK (avg_response_time_hours >= 0),
  certification_level certification_level NOT NULL DEFAULT 'none',
  is_featured boolean NOT NULL DEFAULT false,
  stripe_connect_account_id text,
  stripe_connect_onboarded boolean NOT NULL DEFAULT false,
  payout_schedule payout_schedule NOT NULL DEFAULT 'weekly',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  icon_name text,
  parent_category_id uuid REFERENCES categories(id) ON DELETE RESTRICT,
  sort_order integer NOT NULL DEFAULT 0,
  prompt_count integer NOT NULL DEFAULT 0 CHECK (prompt_count >= 0),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT categories_slug_safe CHECK (slug = lower(slug) AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

CREATE TABLE prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  title text NOT NULL CHECK (char_length(title) <= 100),
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL CHECK (char_length(short_description) <= 250),
  long_description text CHECK (char_length(long_description) <= 5000),
  content bytea NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  subcategory_id uuid REFERENCES categories(id) ON DELETE RESTRICT,
  model_compatibility text[] NOT NULL DEFAULT '{}',
  primary_model text,
  price_cents integer NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  pricing_type pricing_type NOT NULL DEFAULT 'free',
  status prompt_status NOT NULL DEFAULT 'draft',
  rejection_reason text,
  is_featured boolean NOT NULL DEFAULT false,
  is_staff_pick boolean NOT NULL DEFAULT false,
  is_nsfw boolean NOT NULL DEFAULT false,
  needs_update_warning boolean NOT NULL DEFAULT false,
  language text NOT NULL DEFAULT 'en',
  supported_languages text[] NOT NULL DEFAULT '{}',
  view_count integer NOT NULL DEFAULT 0 CHECK (view_count >= 0),
  purchase_count integer NOT NULL DEFAULT 0 CHECK (purchase_count >= 0),
  fork_count integer NOT NULL DEFAULT 0 CHECK (fork_count >= 0),
  avg_rating numeric(3,2) NOT NULL DEFAULT 0 CHECK (avg_rating >= 0 AND avg_rating <= 5),
  review_count integer NOT NULL DEFAULT 0 CHECK (review_count >= 0),
  tags text[] NOT NULL DEFAULT '{}' CHECK (cardinality(tags) <= 10),
  version text NOT NULL DEFAULT '1.0.0',
  parent_prompt_id uuid REFERENCES prompts(id) ON DELETE SET NULL,
  fork_depth integer NOT NULL DEFAULT 0 CHECK (fork_depth >= 0),
  forked_from_version text,
  use_cases text[] NOT NULL DEFAULT '{}' CHECK (cardinality(use_cases) <= 5),
  expected_output_description text CHECK (char_length(expected_output_description) <= 500),
  example_input jsonb,
  example_output text,
  content_embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  CONSTRAINT prompts_slug_safe CHECK (slug = lower(slug) AND slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  CONSTRAINT prompts_version_semver CHECK (version ~ '^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$'),
  CONSTRAINT prompts_free_price_consistency CHECK (
    (pricing_type = 'free' AND price_cents = 0)
    OR (pricing_type <> 'free' AND price_cents >= 0)
  )
);

CREATE TABLE prompt_variables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name text NOT NULL,
  placeholder_key text NOT NULL,
  description text CHECK (char_length(description) <= 200),
  variable_type variable_type NOT NULL,
  default_value text,
  options jsonb,
  validation_rules jsonb,
  is_required boolean NOT NULL DEFAULT true,
  is_advanced boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT prompt_variables_placeholder_key_safe CHECK (placeholder_key = lower(placeholder_key) AND placeholder_key ~ '^[a-z0-9_]+$'),
  CONSTRAINT prompt_variables_options_array CHECK (options IS NULL OR jsonb_typeof(options) = 'array'),
  UNIQUE (prompt_id, placeholder_key)
);

CREATE TABLE prompt_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  version text NOT NULL,
  content_snapshot bytea NOT NULL,
  variables_snapshot jsonb NOT NULL,
  changelog text,
  is_breaking_change boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT prompt_versions_version_semver CHECK (version ~ '^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$'),
  UNIQUE (prompt_id, version)
);

CREATE TABLE purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE RESTRICT,
  prompt_version_at_purchase text NOT NULL,
  amount_paid_cents integer NOT NULL CHECK (amount_paid_cents >= 0),
  platform_fee_cents integer NOT NULL CHECK (platform_fee_cents >= 0),
  creator_earnings_cents integer NOT NULL CHECK (creator_earnings_cents >= 0),
  currency text NOT NULL DEFAULT 'usd',
  payment_method payment_method NOT NULL DEFAULT 'stripe',
  stripe_payment_intent_id text,
  stripe_session_id text,
  crypto_tx_hash text,
  status purchase_status NOT NULL DEFAULT 'pending',
  refund_reason text,
  refunded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (buyer_id, prompt_id),
  UNIQUE (id, buyer_id, prompt_id),
  CONSTRAINT purchases_amount_balances CHECK (amount_paid_cents = platform_fee_cents + creator_earnings_cents),
  CONSTRAINT purchases_currency_lowercase CHECK (currency = lower(currency) AND currency ~ '^[a-z]{3}$')
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  purchase_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text CHECK (char_length(title) <= 100),
  content text CHECK (char_length(content) <= 1500),
  model_used text,
  use_case_tried text,
  would_recommend boolean,
  is_verified_purchase boolean NOT NULL DEFAULT true CHECK (is_verified_purchase),
  is_hidden boolean NOT NULL DEFAULT false,
  helpful_count integer NOT NULL DEFAULT 0 CHECK (helpful_count >= 0),
  not_helpful_count integer NOT NULL DEFAULT 0 CHECK (not_helpful_count >= 0),
  creator_reply text,
  creator_replied_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (reviewer_id, prompt_id),
  FOREIGN KEY (purchase_id, reviewer_id, prompt_id)
    REFERENCES purchases(id, buyer_id, prompt_id)
    ON DELETE RESTRICT
);

CREATE TABLE collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(name) <= 100),
  description text CHECK (char_length(description) <= 500),
  is_public boolean NOT NULL DEFAULT false,
  cover_image_url text,
  item_count integer NOT NULL DEFAULT 0 CHECK (item_count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE collection_items (
  collection_id uuid NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (collection_id, prompt_id)
);

CREATE TABLE moderation_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  submitted_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  status moderation_status NOT NULL DEFAULT 'pending',
  reviewer_notes text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  review_duration_seconds integer CHECK (review_duration_seconds >= 0)
);

CREATE TABLE moderation_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  target_type report_target_type NOT NULL,
  target_id uuid NOT NULL,
  reason report_reason NOT NULL,
  description text CHECK (char_length(description) <= 500),
  status report_status NOT NULL DEFAULT 'open',
  resolved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  resolution_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER prompts_set_updated_at
BEFORE UPDATE ON prompts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER reviews_set_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER collections_set_updated_at
BEFORE UPDATE ON collections
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION slugify(value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT trim(both '-' FROM regexp_replace(regexp_replace(lower(value), '[^a-z0-9]+', '-', 'g'), '-+', '-', 'g'));
$$;

CREATE OR REPLACE FUNCTION ensure_prompt_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  base_slug text;
  candidate_slug text;
  suffix integer := 1;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug := slugify(NEW.title);
    IF base_slug = '' THEN
      base_slug := 'prompt';
    END IF;

    candidate_slug := base_slug;
    WHILE EXISTS (
      SELECT 1 FROM prompts WHERE slug = candidate_slug AND id IS DISTINCT FROM NEW.id
    ) LOOP
      suffix := suffix + 1;
      candidate_slug := base_slug || '-' || suffix::text;
    END LOOP;

    NEW.slug := candidate_slug;
  ELSE
    NEW.slug := slugify(NEW.slug);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER prompts_ensure_slug
BEFORE INSERT OR UPDATE OF title, slug ON prompts
FOR EACH ROW EXECUTE FUNCTION ensure_prompt_slug();

CREATE OR REPLACE FUNCTION validate_creator_profile_user()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM users WHERE id = NEW.user_id AND role = 'creator'
  ) THEN
    RAISE EXCEPTION 'creator_profiles.user_id must reference a user with role creator';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER creator_profiles_validate_user
BEFORE INSERT OR UPDATE OF user_id ON creator_profiles
FOR EACH ROW EXECUTE FUNCTION validate_creator_profile_user();

CREATE OR REPLACE FUNCTION prevent_creator_role_demotion_with_profile()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.role = 'creator'
    AND NEW.role <> 'creator'
    AND EXISTS (SELECT 1 FROM creator_profiles WHERE user_id = OLD.id)
  THEN
    RAISE EXCEPTION 'cannot change creator user role while creator profile exists';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER users_prevent_creator_role_demotion_with_profile
BEFORE UPDATE OF role ON users
FOR EACH ROW EXECUTE FUNCTION prevent_creator_role_demotion_with_profile();

CREATE OR REPLACE FUNCTION validate_prompt_category_hierarchy()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.subcategory_id IS NOT NULL AND NOT EXISTS (
    SELECT 1
    FROM categories
    WHERE id = NEW.subcategory_id
      AND parent_category_id = NEW.category_id
  ) THEN
    RAISE EXCEPTION 'subcategory_id must belong to category_id';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER prompts_validate_category_hierarchy
BEFORE INSERT OR UPDATE OF category_id, subcategory_id ON prompts
FOR EACH ROW EXECUTE FUNCTION validate_prompt_category_hierarchy();

CREATE OR REPLACE FUNCTION refresh_category_prompt_counts()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE categories c
  SET prompt_count = counts.prompt_count
  FROM (
    SELECT c2.id, count(p.id)::integer AS prompt_count
    FROM categories c2
    LEFT JOIN prompts p
      ON p.status = 'active'
      AND (p.category_id = c2.id OR p.subcategory_id = c2.id)
    GROUP BY c2.id
  ) counts
  WHERE c.id = counts.id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER prompts_refresh_category_counts
AFTER INSERT OR UPDATE OF status, category_id, subcategory_id OR DELETE ON prompts
FOR EACH STATEMENT EXECUTE FUNCTION refresh_category_prompt_counts();

CREATE OR REPLACE FUNCTION validate_completed_review_purchase()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM purchases
    WHERE id = NEW.purchase_id
      AND buyer_id = NEW.reviewer_id
      AND prompt_id = NEW.prompt_id
      AND status = 'completed'
  ) THEN
    RAISE EXCEPTION 'review requires a completed purchase by the reviewer for this prompt';
  END IF;

  NEW.is_verified_purchase := true;
  RETURN NEW;
END;
$$;

CREATE TRIGGER reviews_validate_completed_purchase
BEFORE INSERT OR UPDATE OF purchase_id, reviewer_id, prompt_id ON reviews
FOR EACH ROW EXECUTE FUNCTION validate_completed_review_purchase();

CREATE OR REPLACE FUNCTION enforce_single_creator_reply()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.creator_reply IS NOT NULL
    AND NEW.creator_reply IS DISTINCT FROM OLD.creator_reply
  THEN
    RAISE EXCEPTION 'creator_reply can only be set once';
  END IF;

  IF OLD.creator_reply IS NULL AND NEW.creator_reply IS NOT NULL THEN
    NEW.creator_replied_at := COALESCE(NEW.creator_replied_at, now());
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER reviews_enforce_single_creator_reply
BEFORE UPDATE OF creator_reply ON reviews
FOR EACH ROW EXECUTE FUNCTION enforce_single_creator_reply();

CREATE OR REPLACE FUNCTION refresh_prompt_review_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  target_prompt_id uuid;
BEGIN
  target_prompt_id := COALESCE(NEW.prompt_id, OLD.prompt_id);

  UPDATE prompts
  SET
    avg_rating = COALESCE((
      SELECT round(avg(rating)::numeric, 2)
      FROM reviews
      WHERE prompt_id = target_prompt_id AND is_hidden = false
    ), 0),
    review_count = (
      SELECT count(*)::integer
      FROM reviews
      WHERE prompt_id = target_prompt_id AND is_hidden = false
    )
  WHERE id = target_prompt_id;

  UPDATE creator_profiles cp
  SET avg_rating = COALESCE((
    SELECT round(avg(r.rating)::numeric, 2)
    FROM prompts p
    JOIN reviews r ON r.prompt_id = p.id AND r.is_hidden = false
    WHERE p.creator_id = cp.user_id
  ), 0)
  WHERE cp.user_id = (
    SELECT creator_id FROM prompts WHERE id = target_prompt_id
  );

  RETURN NULL;
END;
$$;

CREATE TRIGGER reviews_refresh_prompt_stats
AFTER INSERT OR UPDATE OF rating, is_hidden, prompt_id OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION refresh_prompt_review_stats();

CREATE OR REPLACE FUNCTION refresh_purchase_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  target_prompt_id uuid;
BEGIN
  target_prompt_id := COALESCE(NEW.prompt_id, OLD.prompt_id);

  UPDATE prompts
  SET purchase_count = (
    SELECT count(*)::integer
    FROM purchases
    WHERE prompt_id = target_prompt_id AND status = 'completed'
  )
  WHERE id = target_prompt_id;

  UPDATE creator_profiles cp
  SET
    total_sales_count = stats.sales_count,
    total_revenue_cents = stats.revenue_cents
  FROM (
    SELECT
      p.creator_id,
      count(pu.id)::integer AS sales_count,
      COALESCE(sum(pu.creator_earnings_cents), 0)::integer AS revenue_cents
    FROM prompts p
    LEFT JOIN purchases pu ON pu.prompt_id = p.id AND pu.status = 'completed'
    WHERE p.creator_id = (SELECT creator_id FROM prompts WHERE id = target_prompt_id)
    GROUP BY p.creator_id
  ) stats
  WHERE cp.user_id = stats.creator_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER purchases_refresh_stats
AFTER INSERT OR UPDATE OF status, prompt_id, creator_earnings_cents OR DELETE ON purchases
FOR EACH ROW EXECUTE FUNCTION refresh_purchase_stats();

CREATE OR REPLACE FUNCTION refresh_creator_prompt_counts()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  target_creator_id uuid;
BEGIN
  target_creator_id := COALESCE(NEW.creator_id, OLD.creator_id);

  UPDATE creator_profiles
  SET total_prompts_published = (
    SELECT count(*)::integer
    FROM prompts
    WHERE creator_id = target_creator_id AND status = 'active'
  )
  WHERE user_id = target_creator_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER prompts_refresh_creator_counts
AFTER INSERT OR UPDATE OF status, creator_id OR DELETE ON prompts
FOR EACH ROW EXECUTE FUNCTION refresh_creator_prompt_counts();

CREATE OR REPLACE FUNCTION refresh_collection_item_count()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  target_collection_id uuid;
BEGIN
  target_collection_id := COALESCE(NEW.collection_id, OLD.collection_id);

  UPDATE collections
  SET item_count = (
    SELECT count(*)::integer
    FROM collection_items
    WHERE collection_id = target_collection_id
  )
  WHERE id = target_collection_id;

  RETURN NULL;
END;
$$;

CREATE TRIGGER collection_items_refresh_count
AFTER INSERT OR DELETE ON collection_items
FOR EACH ROW EXECUTE FUNCTION refresh_collection_item_count();

CREATE INDEX users_role_idx ON users(role);
CREATE INDEX users_created_at_idx ON users(created_at);
CREATE INDEX users_last_active_at_idx ON users(last_active_at);
CREATE INDEX users_is_banned_idx ON users(is_banned);
CREATE INDEX users_stripe_customer_id_idx ON users(stripe_customer_id);

CREATE INDEX creator_profiles_user_id_idx ON creator_profiles(user_id);
CREATE INDEX creator_profiles_certification_level_idx ON creator_profiles(certification_level);
CREATE INDEX creator_profiles_is_featured_idx ON creator_profiles(is_featured);
CREATE INDEX creator_profiles_stripe_connect_account_id_idx ON creator_profiles(stripe_connect_account_id);

CREATE INDEX categories_parent_category_id_idx ON categories(parent_category_id);
CREATE INDEX categories_sort_order_idx ON categories(sort_order);
CREATE INDEX categories_is_active_idx ON categories(is_active);
CREATE INDEX categories_prompt_count_idx ON categories(prompt_count DESC);

CREATE INDEX prompts_creator_id_idx ON prompts(creator_id);
CREATE INDEX prompts_category_id_idx ON prompts(category_id);
CREATE INDEX prompts_subcategory_id_idx ON prompts(subcategory_id);
CREATE INDEX prompts_status_idx ON prompts(status);
CREATE INDEX prompts_price_cents_idx ON prompts(price_cents);
CREATE INDEX prompts_pricing_type_idx ON prompts(pricing_type);
CREATE INDEX prompts_is_featured_idx ON prompts(is_featured);
CREATE INDEX prompts_is_staff_pick_idx ON prompts(is_staff_pick);
CREATE INDEX prompts_is_nsfw_idx ON prompts(is_nsfw);
CREATE INDEX prompts_needs_update_warning_idx ON prompts(needs_update_warning);
CREATE INDEX prompts_language_idx ON prompts(language);
CREATE INDEX prompts_published_at_idx ON prompts(published_at DESC);
CREATE INDEX prompts_created_at_idx ON prompts(created_at DESC);
CREATE INDEX prompts_updated_at_idx ON prompts(updated_at DESC);
CREATE INDEX prompts_purchase_count_idx ON prompts(purchase_count DESC);
CREATE INDEX prompts_avg_rating_idx ON prompts(avg_rating DESC);
CREATE INDEX prompts_review_count_idx ON prompts(review_count DESC);
CREATE INDEX prompts_parent_prompt_id_idx ON prompts(parent_prompt_id);
CREATE INDEX prompts_tags_gin_idx ON prompts USING gin(tags);
CREATE INDEX prompts_model_compatibility_gin_idx ON prompts USING gin(model_compatibility);
CREATE INDEX prompts_content_embedding_hnsw_idx ON prompts USING hnsw (content_embedding vector_cosine_ops);

CREATE INDEX prompt_variables_prompt_id_idx ON prompt_variables(prompt_id);
CREATE INDEX prompt_variables_sort_order_idx ON prompt_variables(sort_order);
CREATE INDEX prompt_variables_variable_type_idx ON prompt_variables(variable_type);

CREATE INDEX prompt_versions_prompt_id_idx ON prompt_versions(prompt_id);
CREATE INDEX prompt_versions_created_by_idx ON prompt_versions(created_by);
CREATE INDEX prompt_versions_created_at_idx ON prompt_versions(created_at DESC);

CREATE INDEX purchases_buyer_id_idx ON purchases(buyer_id);
CREATE INDEX purchases_prompt_id_idx ON purchases(prompt_id);
CREATE INDEX purchases_status_idx ON purchases(status);
CREATE INDEX purchases_created_at_idx ON purchases(created_at DESC);
CREATE INDEX purchases_stripe_payment_intent_id_idx ON purchases(stripe_payment_intent_id);
CREATE INDEX purchases_stripe_session_id_idx ON purchases(stripe_session_id);
CREATE INDEX purchases_completed_idx ON purchases(buyer_id, prompt_id) WHERE status = 'completed';

CREATE INDEX reviews_reviewer_id_idx ON reviews(reviewer_id);
CREATE INDEX reviews_prompt_id_idx ON reviews(prompt_id);
CREATE INDEX reviews_purchase_id_idx ON reviews(purchase_id);
CREATE INDEX reviews_rating_idx ON reviews(rating);
CREATE INDEX reviews_is_hidden_idx ON reviews(is_hidden);
CREATE INDEX reviews_created_at_idx ON reviews(created_at DESC);
CREATE INDEX reviews_helpful_count_idx ON reviews(helpful_count DESC);

CREATE INDEX collections_owner_id_idx ON collections(owner_id);
CREATE INDEX collections_is_public_idx ON collections(is_public);
CREATE INDEX collections_created_at_idx ON collections(created_at DESC);
CREATE INDEX collections_updated_at_idx ON collections(updated_at DESC);

CREATE INDEX collection_items_collection_id_idx ON collection_items(collection_id);
CREATE INDEX collection_items_prompt_id_idx ON collection_items(prompt_id);
CREATE INDEX collection_items_added_at_idx ON collection_items(added_at DESC);

CREATE INDEX moderation_queue_prompt_id_idx ON moderation_queue(prompt_id);
CREATE INDEX moderation_queue_submitted_by_idx ON moderation_queue(submitted_by);
CREATE INDEX moderation_queue_assigned_to_idx ON moderation_queue(assigned_to);
CREATE INDEX moderation_queue_status_idx ON moderation_queue(status);
CREATE INDEX moderation_queue_submitted_at_idx ON moderation_queue(submitted_at DESC);
CREATE INDEX moderation_queue_reviewed_at_idx ON moderation_queue(reviewed_at DESC);

CREATE INDEX moderation_reports_reported_by_idx ON moderation_reports(reported_by);
CREATE INDEX moderation_reports_target_type_target_id_idx ON moderation_reports(target_type, target_id);
CREATE INDEX moderation_reports_status_idx ON moderation_reports(status);
CREATE INDEX moderation_reports_reason_idx ON moderation_reports(reason);
CREATE INDEX moderation_reports_resolved_by_idx ON moderation_reports(resolved_by);
CREATE INDEX moderation_reports_created_at_idx ON moderation_reports(created_at DESC);
CREATE INDEX moderation_reports_resolved_at_idx ON moderation_reports(resolved_at DESC);

COMMIT;
