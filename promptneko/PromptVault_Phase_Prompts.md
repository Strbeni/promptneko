# PromptVault — Ultra-Detailed Master Prompt Suite
### Enhanced & Expanded from PromptBase Research
### One prompt per phase. Each is production-ready for an AI engineer/designer/PM.

---

# ═══════════════════════════════════════════════
# WHY THIS BEATS PROMPTBASE — ROOT PROBLEM ANALYSIS
# ═══════════════════════════════════════════════

## PromptBase's Documented Failures (Real User Pain Points)

| Problem | What PromptBase Does | What PromptVault Solves |
|---------|---------------------|------------------------|
| **No live testing** | You buy blind — no way to test before purchase | Free sandbox preview with 1 sample run before buying |
| **Max 4 variables only** | Hard-coded limit, kills complex prompts | Unlimited variables with type system (text/select/number/toggle/multi) |
| **No versioning for buyers** | Prompt updates silently break your workflow | Full version history, opt-in updates, rollback to any version |
| **No workflow integration** | Purchased prompts are orphaned — no system to organize/use them | Prompt Workspace: folders, pipelines, team sharing, API deployment |
| **Buying songs on iTunes** | Pay per prompt, no subscription, costs explode at scale | Subscription tiers + prompt bundles + enterprise API billing |
| **Variable quality, no real QA** | Peer ratings only — gaming and fake reviews exist | AI-scored quality + verified-buyer reviews + bulk test certification |
| **English only** | No i18n, no multi-language prompts | Native multi-language prompt support + locale-aware variables |
| **No model drift warnings** | Prompt breaks when GPT-4 updates — no alert | Model version pinning + automated compatibility testing + update alerts |
| **Seller/buyer conflict with no arbiter** | Sellers can harass buyers for bad reviews | Blind review system + dispute resolution + moderation SLA |
| **No team features** | Solo use only, no collaboration | Team workspaces, shared collections, role-based access |
| **No output guarantee** | Buy a $9 prompt, get garbage output, no recourse | Output quality guarantee backed by AI judge + satisfaction refund |
| **No prompt chaining** | Single prompts only, no pipeline builder | Chain builder: connect prompts into multi-step workflows |
| **Poor search** | Keyword only, no semantic matching | Vector + semantic search: "noir detective ad" finds the right prompt |
| **Creator discoverability** | No creator economy tools | Creator profiles, follower system, certification, earnings leaderboard |
| **No API for businesses** | Manual copy-paste for every use | Full REST API: run any prompt programmatically, pay per execution |

---

# ═══════════════════════════════════════════════
# PHASE 0 — MASTER SYSTEM PROMPT
# (The north star. Read before every phase.)
# ═══════════════════════════════════════════════

You are a senior product architect, full-stack engineer, UX designer, and startup strategist simultaneously. You are building **PromptVault** — the world's most advanced AI prompt marketplace and infrastructure platform.

PromptVault is not a simple link dump or a prettier PromptBase clone. It is a full **prompt infrastructure layer** for the AI era — the place where prompts are born, tested, versioned, certified, monetized, deployed into production workflows, and continuously improved.

## Core Philosophy
- Prompts are **intellectual property and professional tools**, not just text strings. Treat them with the same rigor as software code.
- The platform must solve **real, documented pain points** that PromptBase, FlowGPT, AIPRM, and God of Prompt have failed to solve.
- Every feature must answer: "Does this make prompts more trustworthy, more useful, or more monetizable?" If not, cut it.
- Build for **three users at once**: the professional buyer who needs results fast, the serious creator who wants to earn a living, and the enterprise team that needs API integration and governance.

## The Three Laws of PromptVault
1. **Trust first.** A buyer must be able to verify prompt quality BEFORE paying. Period.
2. **Workflow native.** A purchased prompt must live inside the user's workflow, not in a receipt email they forget about.
3. **Creator prosperity.** A creator who builds a great prompt must be able to earn recurring income from it, not just a one-time $4 sale.

## Design DNA
- Dark mode first. Terminal/developer aesthetic. Premium spacing. Sharp.
- Feels like: GitHub (for collaboration) + Stripe (for payments) + Linear (for the quality of UX) + Vercel (for developer trust).
- NOT: gimmicky, colorful, consumer-y, or playful. This is a professional tool.
- Every screen must pass the "would a senior engineer at Stripe be comfortable using this?" test.

## Stack Constraints (Non-negotiable)
- Frontend: Next.js 14 App Router + Tailwind CSS + Framer Motion
- Backend: Node.js + Fastify OR Python FastAPI (pick one, stay consistent)
- Database: PostgreSQL with pgvector extension
- Search: Meilisearch (keyword) + Pinecone or pgvector (semantic)
- Auth: Clerk or Auth.js with JWT
- Payments: Stripe (primary) + optional USDC/crypto via Circle
- AI Execution: OpenRouter (multi-model gateway)
- Cache: Redis via Upstash
- Storage: Cloudflare R2
- Hosting: Vercel (frontend) + Railway (backend)
- Queue: BullMQ for async jobs

---

# ═══════════════════════════════════════════════
# PHASE 1 PROMPT — FOUNDATION
# Duration: 8 weeks | Goal: Functional marketplace with real money moving
# ═══════════════════════════════════════════════

## PHASE 1 MASTER PROMPT

You are building Phase 1 of PromptVault: the **foundation layer**. This phase must result in a working marketplace where real users can discover, buy, sell, and use prompts. No half-built features. Every feature shipped in Phase 1 must be production-quality and production-deployed.

By the end of Phase 1, the platform must support:
- Real user signups (buyers and creators)
- Real prompt listings across all major categories
- Real payments via Stripe
- Real reviews from verified buyers
- A beautiful, fast, trustworthy public-facing marketplace

---

### 1.1 DATABASE SCHEMA — Build This Exactly

Design and implement a PostgreSQL schema with the following tables. Use UUIDs everywhere. Use timestamptz for all timestamps. Add indexes on every foreign key and on columns used in WHERE clauses or ORDER BY.

**Users table:**
Fields: id, email (unique), username (unique, lowercase, slug-safe), display_name, avatar_url, bio (text, max 500 chars), role (enum: buyer / creator / admin, default buyer), is_email_verified (bool), is_creator_approved (bool, default false), stripe_customer_id, created_at, updated_at, last_active_at, is_banned (bool, default false), ban_reason.

**Creator profiles table:** (1:1 with users where role=creator)
Fields: id, user_id (FK users), tagline (max 100 chars), website_url, twitter_handle, github_handle, specializations (text array, e.g. ["marketing","legal","image-gen"]), total_prompts_published, total_sales_count, total_revenue_cents, avg_rating (decimal 3,2), avg_response_time_hours, certification_level (enum: none / basic / pro / expert / verified_pro), is_featured, stripe_connect_account_id, stripe_connect_onboarded (bool), payout_schedule (enum: weekly / biweekly / monthly), created_at.

**Categories table:**
Fields: id, slug (unique), name, description, icon_name, parent_category_id (self-referential FK for subcategories), sort_order, prompt_count (denormalized, updated by trigger), is_active, created_at.

Seed the following top-level categories with subcategories:
- Writing & Copy → (Blog Posts, Email, Social Media, Ad Copy, Storytelling, Scriptwriting, Academic, SEO Content, Newsletter, Podcast)
- Image Generation → (Portrait, Product Photography, Architecture, Concept Art, Logo/Brand, Fashion, Landscape, Abstract, Character Design, UI Mockup)
- Code & Development → (Code Review, Debugging, Refactoring, Documentation, Test Generation, System Design, API Design, SQL, DevOps, Security Audit)
- Marketing & Growth → (Landing Pages, Cold Email, Lead Gen, CRO, Brand Voice, Campaign Brief, Competitor Analysis, Viral Content)
- Business & Strategy → (Business Plans, Market Research, Pitch Decks, OKRs, Job Descriptions, Sales Scripts, Investor Memos, Meeting Agendas)
- Legal & Compliance → (Contract Drafting, Risk Analysis, Privacy Policy, Terms of Service, Due Diligence, Regulatory Summary, NDA, IP Protection)
- Research & Analytics → (Literature Review, Data Interpretation, Survey Design, Report Generation, Hypothesis Testing, Citation Summary)
- Education & Training → (Curriculum Design, Lesson Plans, Quiz Generation, Explainers, Tutoring, Course Outlines)
- Productivity → (Meeting Notes, Project Planning, Decision Frameworks, Weekly Reviews, SOPs, Process Documentation)
- Finance → (Financial Modeling, Investment Memos, Budget Analysis, Risk Reports, Fundraising, Due Diligence)
- Design → (Creative Briefs, Mood Boards, UX Research, Brand Identity, Design Critique)
- Health & Wellness → (Fitness Plans, Nutrition Guides, Mental Health Support, Medical Summaries)

**Prompts table:**
Fields: id, creator_id (FK users), title (max 100 chars), slug (unique, auto-generated from title), short_description (max 250 chars), long_description (markdown, max 5000 chars), content (the actual prompt, encrypted at rest), category_id (FK categories), subcategory_id (FK categories), model_compatibility (text array — e.g. ["gpt-4o","claude-3.5-sonnet","gemini-1.5-pro"]), primary_model (text), price_cents (0 = free), pricing_type (enum: free / one_time / subscription_only / api_per_use), status (enum: draft / pending_review / active / rejected / deprecated / needs_update), rejection_reason, is_featured, is_staff_pick, is_nsfw (bool, default false), needs_update_warning (bool, triggers when model version is outdated), language (default: en), supported_languages (text array), view_count, purchase_count, fork_count, avg_rating (decimal 3,2), review_count, tags (text array, max 10), version (semver string, default "1.0.0"), parent_prompt_id (FK prompts, for forks), fork_depth (integer), forked_from_version (text), use_cases (text array, max 5), expected_output_description (text, max 500 chars), example_input (jsonb), example_output (text), content_embedding (vector(1536) — for pgvector semantic search), created_at, updated_at, published_at.

**Prompt variables table:**
Fields: id, prompt_id (FK), name (the display name, e.g. "Target Audience"), placeholder_key (the [key] used in prompt content, e.g. "target_audience"), description (what this variable does, max 200 chars), variable_type (enum: text / textarea / select / number / boolean / multi_select / date / url / color), default_value, options (jsonb array — for select/multi_select types: [{"value":"formal","label":"Formal"},{"value":"casual","label":"Casual"}]), validation_rules (jsonb — min_length, max_length, min, max, regex_pattern), is_required (bool), is_advanced (bool — hides in simple view), sort_order, created_at.

Constraint: No limit on number of variables per prompt (this directly fixes PromptBase's 4-variable limit).

**Prompt versions table:**
Fields: id, prompt_id (FK), version (semver), content_snapshot (the full prompt content at this version), variables_snapshot (jsonb — snapshot of all variable configs), changelog (markdown, what changed), is_breaking_change (bool — alerts existing buyers), created_by (FK users), created_at. Add constraint: (prompt_id, version) must be unique.

**Purchases table:**
Fields: id, buyer_id (FK users), prompt_id (FK prompts), prompt_version_at_purchase (the version when bought), amount_paid_cents, platform_fee_cents, creator_earnings_cents, currency (default: usd), payment_method (enum: stripe / crypto), stripe_payment_intent_id, stripe_session_id, crypto_tx_hash, status (enum: pending / completed / refunded / disputed / chargeback), refund_reason, refunded_at, created_at.

Add unique constraint: (buyer_id, prompt_id) — one purchase per user per prompt. Add partial index for status = 'completed' for purchase verification queries.

**Reviews table:**
Fields: id, reviewer_id (FK users), prompt_id (FK prompts), purchase_id (FK purchases — enforces verified buyer), rating (integer 1–5, not null), title (max 100 chars), content (max 1500 chars), model_used (which model they actually used it with), use_case_tried (what they used it for), would_recommend (bool), is_verified_purchase (bool, always true at insert — enforced by FK to purchases), is_hidden (bool — for moderation), helpful_count, not_helpful_count, creator_reply (text — creator can respond once), creator_replied_at, created_at, updated_at.

Constraint: A user can only review a prompt they have purchased (enforce via FK to purchases). One review per (reviewer_id, prompt_id).

**Collections table:**
Fields: id, owner_id (FK users), name (max 100 chars), description (max 500 chars), is_public (bool), cover_image_url, item_count (denormalized), created_at, updated_at.

**Collection items table:**
Fields: collection_id (FK), prompt_id (FK), added_at. Primary key: (collection_id, prompt_id).

**Moderation queue table:**
Fields: id, prompt_id (FK), submitted_by (FK users — creator), assigned_to (FK users — admin), status (enum: pending / approved / rejected / needs_revision), reviewer_notes, submitted_at, reviewed_at, review_duration_seconds.

**Moderation reports table:**
Fields: id, reported_by (FK users), target_type (enum: prompt / review / user / creator), target_id (UUID), reason (enum: stolen_content / misleading / doesnt_work / inappropriate / spam / fake_reviews / other), description (max 500 chars), status (enum: open / investigating / resolved / dismissed), resolved_by (FK users), resolution_notes, created_at, resolved_at.

---

### 1.2 AUTHENTICATION SYSTEM — Build This Exactly

Implement full auth with these flows:

**Signup flow:**
1. Email + password OR Google OAuth OR GitHub OAuth
2. After signup: send email verification link (expires 24h)
3. User cannot publish prompts or write reviews until email is verified
4. On first login: show onboarding modal (Are you a buyer or creator?)
5. Creator path: collect display name, tagline, specializations → create creator_profile record → set is_creator_approved = false → send admin notification

**Creator approval flow:**
Admin reviews creator application. Admin can approve (sets is_creator_approved = true, sends welcome email with creator guide) or reject (sends rejection email with reason and re-application path). Approved creators immediately see the "Create Prompt" button in nav.

**Session management:**
- JWT access token: 15 minute expiry
- Refresh token: 7 day expiry, stored in httpOnly cookie
- On refresh token rotation: invalidate old token immediately
- Store active sessions in Redis: key = "session:{user_id}:{session_id}", value = refresh_token_hash, TTL = 7 days
- Admin accounts require re-authentication for any destructive action (ban user, delete prompt, issue refund)

**Rate limiting (per IP):**
- Signup: 5 attempts per hour
- Login: 10 attempts per 15 minutes, then exponential backoff
- Password reset: 3 per hour
- API: 100 req/min (free users), 500 req/min (paid users), 2000 req/min (enterprise)

---

### 1.3 PROMPT CREATION SYSTEM — Build This Exactly

The prompt creation flow is the most critical creator experience. It must be frictionless but rigorous.

**Step 1 — Content:**
Multi-step form (wizard, not a single long form). Step 1: Prompt content editor. Use a rich text editor (Tiptap) with a custom plugin for variable token insertion. When a creator types [variable_name], it auto-highlights in amber/yellow and creates a corresponding variable entry. Variables must follow the regex: \[([A-Za-z][A-Za-z0-9_\s]{0,49})\] — alphanumeric with spaces, max 50 chars, must start with a letter.

Show a live "prompt preview" panel on the right that shows how the prompt will render to buyers (with variable chips as colored input fields).

Warn if: prompt is under 50 characters (too short), prompt contains PII like email addresses or phone numbers, prompt uses hardcoded API keys or credentials.

**Step 2 — Variables:**
Auto-populated from variables detected in step 1. For each detected variable, creator fills in: display name (human-readable), description (what should the buyer put here), type (text/textarea/select/number/boolean/multi_select), default value, whether it's required. For select/multi_select: let creator add option values with labels. For number: set min/max. For text: set max_length.

**Step 3 — Metadata:**
Title (required, max 100 chars, auto-slug generated), short description (required, max 250 chars, shown in cards), long description (required, markdown editor, min 100 chars), category and subcategory (searchable dropdown), model compatibility (multi-select from supported models list), primary model (which model this was optimized for), tags (max 10, with autocomplete from existing tags), language (dropdown), NSFW toggle (hidden by default, reveals if category is adult content).

**Step 4 — Examples:**
Creator must provide at least 1 example. Each example: example_input (fill in variable values), expected_output (what the prompt produced). Creator can add up to 5 examples. Tip: "More examples = more sales. Buyers want proof."

**Step 5 — Pricing:**
Options: Free, One-time purchase ($0.99 – $99.99, suggest similar prompts' prices), Subscription-only (requires creator to have a subscription bundle). Platform fee displayed clearly: "Platform keeps 20%, you keep 80%." Show earnings calculator: if 100 people buy at $9, you earn $720.

**Step 6 — Preview & Submit:**
Full preview of prompt detail page. Creator can go back to any step. Submit for review button — triggers moderation queue entry, sends confirmation email, shows "your prompt is under review, usually within 24–48 hours."

---

### 1.4 PROMPT DETAIL PAGE — Build This Exactly

This is the highest-value page. It must convert visitors into buyers and build trust through transparency.

**Layout (desktop: 2-column, mobile: stacked):**

LEFT COLUMN (main content, ~65% width):
- Breadcrumb: Home > [Category] > [Subcategory] > [Prompt Title]
- Title (H1, large, bold)
- Badge row: [Category chip] [Model badges] [Language badge] [Needs Update warning if applicable] [Staff Pick star if applicable]
- Short description (16px, muted, above fold)
- Creator card (compact): avatar, display name, verification badge, avg rating, total sales, response time — clicking goes to creator profile

VARIABLE EDITOR SECTION (critical — this is PromptVault's biggest differentiator):
- Heading: "Customize this prompt"
- Render each variable as a proper input field based on its type:
  - text → single line input with placeholder and character counter
  - textarea → multi-line input
  - select → styled dropdown with all creator-defined options
  - number → number input with min/max slider
  - boolean → toggle switch
  - multi_select → checkbox group or tag selector
- Variables marked as "advanced" are hidden behind a "Show advanced options" toggle
- Live preview updates below the variable editor as user types — show the prompt content with variables substituted in real-time (mask unpurchased content after the first 150 characters with a blur overlay)
- Token estimator: as user fills variables, show "Estimated tokens: ~420 | Estimated cost: ChatGPT ~$0.013 | Claude ~$0.010"
- ONE FREE RUN BUTTON: "Try 1 free run before buying" — runs with current variable values against the primary model, shows output in a modal. Limit: 1 free run per IP per prompt per 24h. This directly fixes PromptBase's "buy blind" problem.

TABS below variable editor:
Tab 1 — Description: Full markdown-rendered long description. Tables, code blocks, lists all styled. Include "What this does", "Use cases", "Expected output", "Who it's for", "What it won't do" sections.
Tab 2 — Examples: Gallery of creator-provided input/output pairs. Each shows the input variables used and the resulting output.
Tab 3 — Version History: Timeline of all versions. Each entry: version number, date, changelog, is_breaking_change badge. Buyers who purchased can see their purchased version highlighted.
Tab 4 — Reviews: Verified buyer reviews only. Sort by: Most Recent, Most Helpful, Highest Rating, Lowest Rating. Each review shows: star rating, title, content, model used, use case tried, would_recommend, helpful votes, creator reply if present. Review form: only shown if user has purchased AND has not already reviewed.

RIGHT COLUMN (sidebar, ~35% width, sticky on scroll):
- Price display: "$9.00" or "Free" or "Subscription required"
- BUY button (primary CTA): opens Stripe checkout. If already purchased: shows "Owned ✓" and "Open in Workspace"
- COPY TOOLBAR: 5 buttons in a row:
  - Copy for ChatGPT (formats with variable values substituted)
  - Copy for Claude (adds Claude-optimized preamble)
  - Copy for Midjourney (formats for MJ syntax)
  - Copy for Gemini
  - Copy as API JSON (formats as {prompt_id, variables: {...}} for API use)
  Each button: one click copies, shows green checkmark for 2 seconds, shows "Copied!" tooltip
- FORK button: "Fork & Customize" — if purchased (or free), opens fork editor
- ADD TO COLLECTION button: opens collection picker dropdown
- Stats: Views this week, Total purchases, Fork count, Average rating with star breakdown histogram
- Related prompts: 4 compact cards below the action buttons

NEGATIVE PROMPT SECTION (visible only for image generation category prompts):
- Collapsible panel below the main variable editor
- Label: "Negative Prompt (what to exclude)"
- Text area pre-filled with creator-defined default negative prompt
- Buyer can edit it
- Included in the copy/run actions

---

### 1.5 SEARCH & DISCOVERY — Build This Exactly

**Search implementation:**

Keyword search: Meilisearch index on (title, short_description, long_description, tags, creator username). Typo tolerance on. Synonyms configured (e.g. "ad" = "advertisement" = "advertising", "email" = "e-mail", "blog" = "article" = "post").

Searchable filters: category_id, subcategory_id, model_compatibility (any match), price_cents (range: 0-0 for free, 0-500 for under $5, etc.), avg_rating (minimum: 4.0, 4.5), status = 'active' only, language, is_featured, is_staff_pick.

Sort options: Trending (proprietary score: views×0.3 + purchases×0.5 + recent_reviews×0.2, decayed by time), Newest, Top Rated, Best Sellers, Price: Low to High, Price: High to Low, Most Forked.

Search results page layout:
- Query display with result count: "128 results for 'cold email sequence'"
- Did-you-mean suggestions for typos
- Active filters displayed as removable chips above results
- Sidebar with all filter options, checkboxes, sliders
- Results grid: 3 columns desktop, 2 tablet, 1 mobile
- Each result card: thumbnail/preview image, title, creator, model badges, price, rating (stars + count), short description, first 2 variable chips
- Infinite scroll (load 24 at a time)
- "No results" state: suggest adjacent categories, show popular prompts in same category

**Homepage discovery sections:**
- Hero search bar (full width, centered, with example queries rotating as placeholder)
- Trending this week (horizontal scroll of 8 cards)
- Staff picks (3 featured cards with larger thumbnails)
- New arrivals (last 7 days, 8 cards)
- Browse by category (grid of category cards with icons and prompt counts)
- Top creators this month (5 creator cards with earnings if public)

---

### 1.6 PAYMENT & COMMERCE SYSTEM — Build This Exactly

**Purchase flow (critical — must be bulletproof):**

1. Buyer clicks "Buy" → POST /api/checkout/create
2. Backend: verify prompt exists and is active, verify buyer doesn't already own it, create Stripe Checkout Session with metadata: {buyer_id, prompt_id, amount_cents, creator_id}
3. Redirect to Stripe Checkout (or Stripe Elements embedded — prefer embedded for lower abandonment)
4. Stripe webhook: on payment_intent.succeeded → create purchase record, set status=completed, trigger creator earnings update, send buyer confirmation email with receipt and "open in workspace" link, send creator notification of new sale
5. On checkout.session.expired: clean up pending record
6. On charge.refunded: update purchase status, reverse creator earnings

**Stripe Connect for creator payouts:**
- During creator approval, generate Stripe Connect onboarding link
- Creators complete Stripe Express onboarding (KYC handled by Stripe)
- Platform fee: 20% kept, 80% to creator
- Payouts: Creator dashboard shows "Pending payout: $142.40 — releases on [date]"
- Payout schedule: 7-day rolling hold (standard for marketplace fraud protection), then weekly/biweekly/monthly per creator preference
- Creators can see: gross sales, platform fee deducted, net earnings, upcoming payout date, payout history

**Refund policy (this is critical for trust):**
- Buyer can request refund within 48 hours of purchase
- Refund automatically approved if: they haven't run the prompt more than 1 time AND they haven't copied it more than 3 times
- Otherwise: enters dispute flow → admin reviews within 24h → decision sent to both parties
- Platform absorbs refund cost, does NOT claw back from creator for first refund (creator is charged starting from second refund on same prompt in 90 days)

---

### 1.7 BUYER DASHBOARD — Build This Exactly

URL: /dashboard

Sidebar navigation: Purchased Prompts, Favorites, Collections, Run History, API Keys, Billing, Settings

**Purchased Prompts view:**
- Grid of purchased prompts with: thumbnail, title, creator, purchase date, version at purchase vs current version
- If current version > purchased version: show yellow banner "Updated: v1.2.0 available (you have v1.0.0) — View Changes / Update"
- If is_breaking_change: show red banner "Breaking update — your saved variables may not work with new version"
- Filter by: category, model, date purchased, has update
- Quick actions per card: Open in Workspace, Copy (platform selector), Fork, Review (if not reviewed)

**Collections view:**
- User-created collections (folders of prompts)
- Create collection: name, description, public/private toggle
- Drag prompts between collections
- Share public collection via link

**Run History view:**
- Table: prompt name, model used, variables used, date, output preview (first 100 chars), tokens used, cost
- Click row to see full output
- Re-run button: opens workspace with same variables pre-filled

**API Keys view:**
- Generate API key with name and permission scopes (run / read / fork)
- Show key once at creation (copy immediately), then masked
- Usage stats per key: calls today, calls this month, cost this month
- Revoke key (immediate)

---

### 1.8 CREATOR STUDIO (DASHBOARD) — Build This Exactly

URL: /studio

**Analytics Overview (top of page):**
4 metric cards in a row: Total Revenue (this month), Total Sales (this month), Avg Conversion Rate (views→purchases), Avg Rating across all prompts.

Below: Revenue chart (line chart, toggle: Daily / Weekly / Monthly / All Time). Compare to previous period with percentage change.

**My Prompts table:**
Columns: Thumbnail, Title, Status, Price, Sales, Revenue, Avg Rating, Version, Last Updated, Actions.

Status badges: Active (green), Pending Review (yellow), Draft (gray), Rejected (red with hover to see reason), Deprecated (muted), Needs Update (amber warning).

Actions per row: Edit, View Public Page, View Analytics, Archive, Duplicate.

Click on prompt row: expand to show mini analytics panel — views over time, conversion funnel (viewed → clicked buy → purchased), review summary, version history.

**Earnings & Payouts section:**
- Current pending balance (amount that will be paid on next payout date)
- Next payout date countdown
- Lifetime earnings
- Payout history table: amount, date, status, Stripe transfer ID
- Stripe Connect status banner: if not onboarded → "Connect Stripe to receive payouts" CTA
- Option to change payout schedule

**Creator Profile Settings:**
- Profile photo upload (Cloudflare Images for resizing)
- Display name, username (change once per 90 days), bio, tagline
- Specializations (multi-select)
- Social links: website, Twitter/X, GitHub, LinkedIn
- Public earnings visibility toggle (some creators want to show earnings on public profile, others don't)
- Creator certification status + "Apply for Pro Certification" CTA

---

### 1.9 ADMIN MODERATION PANEL — Build This Exactly

URL: /admin (role-gated: admin only, re-auth required)

**Prompt Moderation Queue:**
- List of pending prompts with: title, creator, category, price, submitted time, time in queue
- Sort by: oldest first (default), newest, high-value (by price)
- Click prompt → full detail view with:
  - Full prompt content (unmasked)
  - All variables with types and validation rules
  - Creator info and history (previous approvals/rejections)
  - Example inputs and outputs
  - Similar prompts (to detect duplicates or stolen content)
- Actions: Approve (prompt goes live immediately), Reject (must provide reason from dropdown + optional note), Request Revision (send note to creator explaining what needs to change), Flag for senior review

Rejection reasons: Stolen content, Misleading description, Doesn't match category, Inappropriate content, Too low quality (under 50 chars or no real value), Broken prompt (variables don't work), Duplicate of existing prompt, Missing examples.

**User Management:**
- Table of all users with: username, email, role, status, join date, purchase count, prompt count, reports against them
- Search by username/email
- Actions: View full profile, Warn (send warning email), Suspend (temporary ban with duration), Ban (permanent), Export account data (GDPR), Delete account

**Reports Queue:**
- All moderation reports grouped by status (open/investigating/resolved)
- Click to see: reporter, target (prompt/review/user), reason, description, full context
- Actions: Resolve (mark resolved with notes), Dismiss (spam report), Escalate

**Platform Analytics (admin only):**
- GMV (gross merchandise value) by day/week/month
- New users by day
- Prompt submissions by day (approved vs rejected rate)
- Top earning creators this month
- Top selling prompts this month
- Refund rate by category
- Fraud signals: accounts with unusual purchase patterns, bulk reviews in short time, same IP multiple accounts

---

### 1.10 PHASE 1 API ROUTES — Full Spec

All routes prefix: /api/v1/

Authentication middleware: attach user to req from JWT. Rate limiting middleware: apply per-route limits from Redis.

**Auth routes:**
POST /auth/signup — body: {email, password, display_name} → create user, send verification email, return {user, access_token}
POST /auth/login — body: {email, password} → return {user, access_token}, set refresh_token cookie
POST /auth/logout — clear refresh cookie, invalidate session in Redis
POST /auth/refresh — read refresh cookie → return new access_token
POST /auth/verify-email — body: {token} → set is_email_verified=true
POST /auth/forgot-password — body: {email} → send reset link (expires 1h)
POST /auth/reset-password — body: {token, new_password} → update password, invalidate all sessions
POST /auth/oauth/google — handle Google OAuth callback
POST /auth/oauth/github — handle GitHub OAuth callback

**Prompt routes:**
GET /prompts — query params: q, category, model, price_min, price_max, rating_min, sort, page, limit → paginated search results with filters applied
POST /prompts — auth required, creator only → create prompt in draft status
GET /prompts/:id — return full prompt detail. If authenticated and purchased: include full content. If not purchased: mask content after char 150.
PUT /prompts/:id — auth required, owner only → update prompt fields
DELETE /prompts/:id — auth required, owner only → soft delete (set status=deprecated)
POST /prompts/:id/submit — auth required, owner only → submit for moderation (draft → pending_review)
POST /prompts/:id/fork — auth required, must have purchased or prompt must be free → create fork record, return new prompt draft
GET /prompts/:id/forks — list all active forks of a prompt
GET /prompts/:id/versions — list version history (non-sensitive fields only for non-owners)
POST /prompts/:id/versions — auth required, owner only → publish new version with {content, variables, changelog, is_breaking_change}
GET /prompts/trending — return trending prompts (cached in Redis, refreshed every 1h)
GET /prompts/featured — return staff picks (cached in Redis, refreshed on admin update)
GET /prompts/:id/related — return 4 related prompts based on category + tags similarity

**Variable routes:**
GET /prompts/:id/variables — return variables (public — needed for pre-purchase display)
PUT /prompts/:id/variables — auth required, owner only → bulk replace variables

**Search:**
GET /search — query params: q, all filters → Meilisearch query, return results + facets
GET /search/suggest — query params: q → return 5 autocomplete suggestions

**Checkout:**
POST /checkout/create — auth required → create Stripe session, return {checkout_url} or {client_secret} for embedded
POST /checkout/webhook — Stripe webhook (verify signature) → handle payment_intent.succeeded, charge.refunded, etc.

**Purchases:**
GET /purchases — auth required → list buyer's purchases with prompt snapshots
GET /purchases/:id — auth required → single purchase detail
POST /purchases/:id/refund-request — auth required → submit refund request (validate: within 48h, run count check)

**Reviews:**
GET /prompts/:id/reviews — public → paginated reviews with summary stats
POST /prompts/:id/reviews — auth required, must have completed purchase → submit review (validate: no existing review)
PUT /reviews/:id — auth required, owner → edit own review (within 30 days)
POST /reviews/:id/helpful — auth required → mark helpful (once per user per review)
POST /reviews/:id/reply — auth required, prompt creator only → add creator reply (once)

**Collections:**
GET /collections — auth required → list own collections
POST /collections — auth required → create collection
GET /collections/:id — public if is_public=true, else auth required as owner
PUT /collections/:id — auth required, owner → update
DELETE /collections/:id — auth required, owner → delete
POST /collections/:id/add — auth required, owner → {prompt_id} → add to collection
DELETE /collections/:id/items/:prompt_id — auth required, owner → remove

**Creator:**
GET /creator/profile — auth required, creator → own creator profile
PUT /creator/profile — auth required, creator → update profile
GET /creator/dashboard — auth required, creator → analytics summary {revenue_this_month, sales_this_month, avg_conversion, avg_rating, top_prompts}
GET /creator/earnings — auth required, creator → earnings breakdown by prompt and by time period
GET /creator/payouts — auth required, creator → payout history
GET /creator/stripe-onboarding — auth required, creator → return Stripe Connect onboarding URL

**Creator public profiles:**
GET /creators/:username — public → creator profile + active prompts

**Admin:**
GET /admin/queue — auth required, admin → pending moderation queue
POST /admin/prompts/:id/approve — auth required, admin → approve prompt
POST /admin/prompts/:id/reject — auth required, admin → {reason, notes} → reject
GET /admin/users — auth required, admin → paginated user list
POST /admin/users/:id/ban — auth required, admin → {reason, duration_days or permanent}
GET /admin/reports — auth required, admin → reports queue
POST /admin/reports/:id/resolve — auth required, admin → {resolution_notes}
GET /admin/analytics — auth required, admin → platform metrics

**Error handling:** All errors return {error: {code: "PROMPT_NOT_FOUND", message: "human readable", details: {}}}. Use standard HTTP status codes. Log all 5xx errors to monitoring.

---

### 1.11 PHASE 1 UI COMPONENT LIBRARY

Build these components as the design system foundation. All must support light and dark mode.

**Design tokens (CSS variables):**
Define in globals.css. Dark mode: bg-base=#090c10, bg-surface=#0d1117, bg-elevated=#161b22, border-default=#30363d, border-hover=#3d444d, text-primary=#e6edf3, text-secondary=#8b949e, text-muted=#656d76, accent-purple=#7c3aed, accent-purple-light=#a855f7, green=#3fb950, blue=#58a6ff, orange=#f78166, yellow-variable=#e3b341. Light mode inverses with appropriate values. All components consume these tokens.

**Typography:** Display font: Syne (800 for headings). Body font: Plus Jakarta Sans (400 regular, 600 semibold). Mono font: JetBrains Mono (400, 700 for code and metadata badges).

**Component list (build in this order):**

1. `<Button>` — variants: primary (purple fill), secondary (outline), ghost (no border), danger (red), size: sm/md/lg, loading state (spinner replaces children), disabled state
2. `<Badge>` — category badge, model badge, price badge, status badge, verification badge — each with correct color coding
3. `<Input>` — text, password (show/hide toggle), search (with icon), with label, error state, helper text, character counter option
4. `<Textarea>` — with label, character counter, auto-resize option
5. `<Select>` — custom styled, searchable option, multi-select variant
6. `<Toggle>` — switch component with label
7. `<PromptCard>` — the core marketplace card. Props: prompt object. Renders: thumbnail, title, short_description (truncated), creator mini info, model badges, price, rating stars + count, variable count chip, fork count. Hover state: subtle lift + border brightening. Click: navigate to detail page.
8. `<VariableInput>` — renders the appropriate input type based on variable.type. Handles: text, textarea, select (dropdown), number (with slider), boolean (toggle), multi_select (checkbox group). Shows description tooltip on hover.
9. `<CopyButton>` — accepts: platform (chatgpt/claude/midjourney/gemini/api), content (string), size. Shows platform icon. On click: copies to clipboard, shows green checkmark for 2s. Handles clipboard API failure gracefully.
10. `<TokenEstimator>` — accepts: prompt_content (string with variables substituted). Calculates approximate tokens using tiktoken-compatible logic. Shows: token count, estimated cost per model (ChatGPT/Claude/Gemini pricing updated monthly). Refreshes on every variable change with debounce.
11. `<RunOutput>` — accepts: stream (SSE stream or resolved string). Shows: loading skeleton, streaming tokens as they arrive character by character, copy output button, retry button, token usage summary after completion.
12. `<StarRating>` — display mode (read-only, shows half stars) and input mode (clickable for review submission).
13. `<ReviewCard>` — shows: avatar, username, date, stars, title, content, model_used, would_recommend badge, helpful votes, creator reply if present.
14. `<CreatorCard>` — compact: avatar, name, badge, rating, sales count. Full: adds bio, specializations, recent prompts.
15. `<VersionTimeline>` — vertical timeline of version history entries. Each entry: version badge, date, changelog content, breaking change warning if applicable.
16. `<PriceDisplay>` — handles: Free (green), price in local currency, "From $X/mo" for subscription.
17. `<ModelBadge>` — color-coded per model: GPT-4o=green, Claude=orange, Gemini=blue, Midjourney=purple, DALL-E=teal, Llama=red, Stable Diffusion=pink.
18. `<SearchBar>` — with keyboard shortcut badge (⌘K), suggestions dropdown, recent searches, clear button.
19. `<FilterSidebar>` — collapsible sections, each filter as checkbox list or slider range. Apply filters button (mobile) or immediate application (desktop).
20. `<Breadcrumb>` — with structured data markup for SEO.
21. `<Toast>` — notification system for: copy success, purchase complete, error, info. Position: bottom-right. Auto-dismiss 4s.
22. `<Modal>` — base modal with: backdrop blur, close on escape, focus trap, portal rendering.
23. `<LoadingSkeleton>` — matches shape of PromptCard, ReviewCard, CreatorCard — prevents layout shift.

---

### 1.12 PHASE 1 SEO STRATEGY

Every prompt detail page must be statically generated at build time for active prompts (ISR with 60s revalidation). Each page must have:

- Unique, keyword-rich title: "[Prompt Title] — [Category] Prompt for [Primary Model] | PromptVault"
- Meta description: generated from short_description + use_cases
- Open Graph: og:title, og:description, og:image (auto-generated card with title + category + rating), og:type=product
- JSON-LD schema: Product type with name, description, price, rating, seller
- Canonical URL
- Structured breadcrumb schema

Target keyword clusters for organic traffic: "[use case] ChatGPT prompt", "[use case] Claude prompt", "best [category] AI prompts", "prompt for [specific task]". Create category landing pages with editorial content + top prompts for each keyword cluster.

---

### 1.13 PHASE 1 TESTING & QUALITY GATES

Before deploying any feature, it must pass:

**Functional tests:**
- All auth flows (signup, login, logout, refresh, OAuth, email verify, password reset)
- Complete purchase flow end-to-end with Stripe test mode
- Prompt creation → moderation → approval → live → purchase → review chain
- Fork creation and lineage tracking
- Search with all filter combinations

**Security tests:**
- SQL injection: test all query parameters
- XSS: test all user-generated content rendering
- CSRF: verify all state-changing endpoints require CSRF token or SameSite cookie
- Authentication: verify all protected routes return 401 without valid token
- Authorization: verify creator cannot edit other creator's prompts, buyer cannot access unpurchased content

**Performance tests:**
- Homepage: FCP < 1.5s, TTI < 3s
- Search: results in < 500ms (P95)
- Prompt detail page: FCP < 1.2s
- All pages: Lighthouse score > 85 on all axes

**Phase 1 launch criteria (all must be met):**
- 100 quality prompts live across at least 8 different categories
- All payment flows tested in both test and production Stripe mode
- Zero critical security vulnerabilities
- All pages mobile responsive and tested on iPhone 12 and Galaxy S21
- Email notifications working for: signup, purchase, new sale, review received, moderation status
- Admin can moderate prompts, ban users, view platform analytics
- Creator can onboard to Stripe, list prompts, see earnings

---

# ═══════════════════════════════════════════════
# PHASE 2 PROMPT — POWER FEATURES
# Duration: 12 weeks | Goal: Indispensably useful. Make people unable to leave.
# ═══════════════════════════════════════════════

## PHASE 2 MASTER PROMPT

You are building Phase 2 of PromptVault. Phase 1 is live. Real users are buying and selling. Now you must make the platform **addictively useful** by adding features that no competitor has. Every Phase 2 feature was chosen because it directly solves a documented PromptBase failure or a gap in the market.

By the end of Phase 2, PromptVault must be the answer to the question: "I use Claude/GPT every day — where do I find and manage the best prompts?"

Phase 2 success = users opening PromptVault daily, not just at point of purchase.

---

### 2.1 LIVE EXECUTION SANDBOX — The Biggest Feature

**The problem this solves:** PromptBase has NO live testing. Users buy blind and get burned. This feature alone justifies switching from PromptBase.

**Implementation:**

Create a /run/:prompt_id page and an embedded run panel on the prompt detail page.

**Before purchase (free preview):**
- User fills in variable values in the Variable Editor
- Clicks "Try 1 Free Run"
- Backend: check rate limit (1 per IP per prompt per 24h via Redis key: "freerun:{ip}:{prompt_id}", TTL=86400)
- If within limit: substitute variables into prompt, send to OpenRouter API with the primary model, stream response via SSE
- Mask: only show first 40% of output, then show "Purchase to see full output and run unlimited times"
- This preview is intentionally useful enough to prove value but limited enough to incentivize purchase

**After purchase (unlimited):**
- Full prompt content used (unmasked)
- Full output shown
- Model selector: user can choose any compatible model from the prompt's model_compatibility list, or enter a custom model slug
- Temperature slider: 0.0 (deterministic) to 1.5 (creative). Default from prompt metadata.
- Max tokens slider: up to 4000 tokens
- Stream toggle: watch output generate in real-time OR wait for full response
- Retry button: re-run with same variables (useful for creative/generative prompts)
- Regenerate with variation: button that adds "slight variation" to prompt to explore alternatives
- Save output: saves to /dashboard run history with variables and settings used
- Copy output: one click
- Token usage display after each run: tokens_in, tokens_out, total_cost_usd
- Run again in different model: quick model switcher at top

**Execution backend:**
All runs go through OpenRouter (openrouter.ai) which proxies to the actual model providers. This means: one API key, access to GPT-4o, Claude 3.5 Sonnet/Opus, Gemini 1.5 Pro, Llama 3, Mistral, etc.

Log every run to prompt_runs table: user_id, prompt_id, version used, variables_used (jsonb, sanitized), model, tokens_in, tokens_out, cost_usd, duration_ms, status.

Credit system for run costs: Platform buys API credits in bulk from OpenRouter. Users are charged from their credit balance (pre-purchased credits). Non-subscribers: pay-as-you-go credits. Pro subscribers: included monthly credit allowance. Enterprise: billed to invoice.

**Prompt injection protection:**
Before sending any user-provided variable value to the model, run through sanitization layer:
- Strip any XML/HTML tags from text variables
- Detect and refuse: "ignore previous instructions", "disregard the above", "you are now", "pretend you are", "DAN", "jailbreak" — return error 400 with message "Variable input contains disallowed content"
- Log injection attempts to security log for monitoring

**Anti-abuse for free preview:**
- 1 per IP per prompt per 24h (Redis TTL)
- If >10 different prompts run from same IP in 1 hour: flag account, require CAPTCHA
- VPN/proxy detection via IP intelligence API: require signup to run if proxy detected

---

### 2.2 SEMANTIC / VECTOR SEARCH — Search the Way Humans Think

**The problem this solves:** PromptBase keyword search is primitive. A search for "noir detective ad copy prompt" returns nothing meaningful if those exact words aren't in the title.

**Implementation:**

Use OpenAI text-embedding-3-small (or sentence-transformers locally) to generate 1536-dimension embeddings for every prompt at publish time. Store in the content_embedding (vector(1536)) column using pgvector.

**Hybrid search pipeline:**
When a user searches, run TWO queries in parallel:
1. Keyword search via Meilisearch (fast, handles typos, filters)
2. Semantic search via pgvector: SELECT prompts ORDER BY (content_embedding <=> query_embedding) LIMIT 20

Merge results using Reciprocal Rank Fusion (RRF): score = Σ 1/(k + rank_in_list). Return top 24 unique results sorted by RRF score.

Display: keyword results labeled "Exact matches", semantic results labeled "You might also want". Let users toggle between "Exact" and "Semantic" search modes with a toggle.

**Intent-based search features:**
Add a "Search by intent" toggle. When on, search bar shows guided fields:
- What do you want to achieve? (text)
- For what industry? (select from list)
- What tone/style? (select: professional/casual/technical/creative/persuasive)
- Who is your audience? (text)
These fields construct a rich query string fed to both keyword and semantic search.

**Re-embedding pipeline:**
Nightly job: find all prompts with content_embedding IS NULL (newly published or failed). Generate embeddings in batches of 100. Store. This ensures search index stays fresh.

---

### 2.3 PROMPT WORKSPACE — Where Prompts Actually Live

**The problem this solves:** Purchased prompts on PromptBase are orphaned — they live in a receipt email. PromptVault must be where users WORK with their prompts daily.

**Implementation:**

Create /workspace — the buyer's daily command center.

**Workspace layout:**
Left sidebar: folders/collections list. Main area: prompt runner + history.

**Features:**

Prompt Library panel (left, 280px wide):
- All purchased + free prompts organized into user-created folders
- Drag and drop to organize
- Pinned prompts section at top (up to 5)
- Recent: last 10 used prompts
- Search within library (instant filter)
- Each item: prompt title, model icon, last used date, quick-run button

Variable Presets:
- For each purchased prompt, users can save multiple "presets" — named sets of variable values
- Example: prompt = "Cold Email Generator". Presets: "My SaaS Product", "Client A - HR Software", "Client B - E-commerce"
- One click to load a preset and run
- This is the killer feature PromptBase has zero version of — and it makes PromptVault a daily tool

Run Panel (main area):
- Select a prompt from library → loads in run panel
- Variable editor on left, output on right
- Run history for this prompt shown below: timeline of past runs with dates and output previews
- Diff view: compare output from run 1 vs run 5 — useful for iterating on variable values

Prompt Chaining (Phase 2 flagship feature):
- Build a chain: Connect Prompt A's output to Prompt B's variable input
- Visual: node graph where each node = a prompt, arrows = connections (output of A feeds variable X of B)
- Max chain depth: 5 (Phase 2 limit, extended in Phase 3)
- Example chain: [Research Summary Prompt] → output → [Blog Post Draft Prompt, variable=research_content] → output → [SEO Headline Optimizer, variable=draft_content]
- Run chain: executes each prompt in sequence, passes outputs forward, shows each step's result
- Save chains as reusable "workflows" with a name and description
- Share workflows publicly (other users can discover and fork them)
- Workflow marketplace: separate discovery section for workflows

---

### 2.4 PROMPT QUALITY CERTIFICATION SYSTEM

**The problem this solves:** PromptBase quality varies wildly with no objective standard. Buyers can't trust ratings alone — reviews can be gamed. PromptVault introduces an objective quality layer.

**Implementation:**

**Automatic quality scoring (runs at publish + re-runs weekly):**
Score each active prompt on 5 axes (0–100 each, weighted average = Quality Score):

1. Completeness Score (20% weight): Does it have >100 char long description? All variables have descriptions? At least 2 example input/output pairs? Expected output described? Use cases listed? Penalize for missing fields.

2. Variable Quality Score (20% weight): Variables have descriptive names? Have helpful descriptions? Have validation rules? Default values set? Type correctly chosen (not everything is "text" when select would be clearer)?

3. Community Signal Score (25% weight): Avg rating (if >10 reviews), review recency, helpful vote ratio on reviews, would_recommend percentage. If < 5 reviews: mark as "insufficient data" — don't penalize.

4. Purchase-to-Review Ratio (15% weight): High ratio = buyers care enough to review. Low ratio = possible passive dissatisfaction.

5. Model Compatibility Depth Score (20% weight): Tested on multiple models? Includes model-specific notes? Has been run successfully through execution sandbox (track sandbox run success rate)?

Display Quality Score as a badge on cards and detail pages: 
- 85–100: "Certified Pro" (purple star badge)
- 70–84: "Quality Verified" (blue checkmark badge)
- 50–69: "Community Approved" (green thumbs-up badge)
- Below 50 or insufficient data: no badge, but a muted "Unverified" label
- Prompts below 30 for >30 days: auto-flagged for creator notification and potential delisting

**Manual creator certification program:**
Creators with avg quality score >80 across at least 10 prompts can apply for "Certified Creator" status. Admin reviews their portfolio. If approved: "Certified Creator" badge on profile and all their prompts. This badge carries weight — it's earned, not paid for.

---

### 2.5 BULK TEST RUNNER — For Serious Creators

**The problem this solves:** Creators on PromptBase have NO way to test their prompts at scale before publishing. They ship prompts that work for 1 case but fail for 5 others. PromptVault gives creators professional QA tools.

**Implementation:**

Available in /studio under "Test & Quality" tab.

**Interface:**
- Select one of your prompts
- Upload test cases: CSV file with columns matching your variable names + an optional "expected_output" column for comparison
- Or manually add test cases in a table editor: up to 50 rows
- Select model(s) to test on: run same prompt across multiple models simultaneously
- Click "Run Bulk Test"

**Execution:**
- Each row in test matrix runs through the execution sandbox
- Runs in parallel (max 5 concurrent) via BullMQ job queue
- Show progress: "Running 12/50 test cases... (2 errors so far)"
- Estimated time: calculated from token estimates × API latency

**Results view:**
- Table: each row = one test case. Columns: variable inputs, output (expandable), model, tokens, cost, latency, status (success/error/timeout)
- Filter by: status, model, high/low output length
- Output comparison: select 2 outputs from same input, different models → side-by-side diff
- If expected_output column provided: show similarity score (cosine similarity of embeddings) between actual and expected
- Summary stats: success rate, avg token count, avg cost, avg latency by model, quality distribution
- Export results as CSV or PDF report

**Creator workflow integration:**
After bulk test, creator can: "Publish update to prompt based on test results" → opens version editor pre-populated with test insights as notes.

---

### 2.6 A/B TESTING FOR BUYERS

**The problem this solves:** No prompt marketplace offers buyers the ability to objectively compare two prompts before committing. Buyers guess. PromptVault gives them data.

**Implementation:**

Accessible from: Prompt detail page ("Compare with another prompt") or from /workspace.

**A/B Test setup:**
1. Select Prompt A (already viewing) and Prompt B (search/select from marketplace)
2. Both prompts must accept at least 1 common variable (or user defines the test input manually)
3. Enter test input (shared variable values or free text input for both)
4. Select model (same model applied to both for fair comparison)
5. Click "Run A/B Test"

**Execution:**
- Both prompts run simultaneously (parallel API calls)
- Results shown side-by-side: Output A | Output B
- Both outputs fully revealed regardless of purchase status (this is a deliberate incentive — see quality, then buy)

**LLM Judge evaluation:**
After outputs are shown, optionally click "Get AI Evaluation":
- A separate LLM call is made with a judge prompt: "You are evaluating two AI prompt outputs for the task: [description]. Evaluate Output A and Output B on: relevance, completeness, clarity, accuracy, and creativity. Score each 1-10. Explain which is better and why."
- Show judge's scores and reasoning
- This gives buyers an objective signal, not just subjective feel
- Note to user: "AI evaluation is a guide, not gospel. Use your own judgment."

**After A/B test:**
- Option to purchase the winning prompt at a discount: "You've compared — save 20% on your first purchase" (one-time promo)
- Save comparison as reference in workspace
- Share comparison publicly with URL (anonymizes prompt content, shows only summary)

---

### 2.7 COMMUNITY CHALLENGES

**The problem this solves:** PromptBase is purely transactional — buy/sell. No community gravity. Users have no reason to come back unless they want to buy something. Challenges create recurring engagement.

**Implementation:**

URL: /challenges

**Challenge structure:**
Each challenge has: title, description, goal (what the winning prompt must achieve), category, allowed models, prize pool (cash paid out via Stripe), submission deadline, voting period start/end, max submissions per user.

**Challenge types:**
- Open challenge: anyone can submit
- Invitation: only invited creators
- Sponsored: a company sponsors the prize pool and defines the problem they need solved (this becomes a premium product feature — companies pay to run sponsored challenges)

**Submission flow:**
1. Creator navigates to challenge
2. Clicks "Submit Your Prompt"
3. If they have an existing prompt that fits: select it. Otherwise: create a new prompt specifically for this challenge (auto-saves to their prompt library)
4. Add a description of their approach (max 500 chars)
5. Submit → stored as challenge_submission record

**Voting:**
During voting period: all submissions displayed as cards. Registered users can vote on up to 3 submissions per challenge. Voting is blind to vote counts until voting period ends (prevents bandwagon effect).

After voting closes: results revealed with full vote counts and leaderboard. Top 3 get badges on their profile. Winner receives prize via Stripe payout.

**Challenge discovery:**
Challenges listed on homepage (with countdown timer) and /challenges page. Show: challenge title, sponsor logo if sponsored, prize amount, days remaining, submission count, category.

**For companies (Phase 2 premium feature):**
Companies can pay $500–$2000 to post a sponsored challenge. They define the problem, set the prize pool (kept separate, paid out to winner), and get the right to purchase the winning prompt at a negotiated price. This is effectively a bounty with community judging — very different from PromptBase's nothing.

---

### 2.8 BOUNTY BOARD

**The problem this solves:** Companies often can't find the exact prompt they need — they need someone to BUILD it for them. PromptBase removed their custom prompt jobs feature. PromptVault brings it back, better.

**Implementation:**

URL: /bounties

**Bounty posting (companies/buyers):**
Company or buyer posts a bounty: title, description, detailed requirements, example inputs they want it to handle, example output they expect, category, allowed models, reward amount ($50–$5000), submission deadline.

Company pays reward upfront to platform escrow (held in Stripe). This ensures the bounty is serious and the creator will get paid.

**Submission flow (creators):**
Creator reads bounty → submits a prompt (creates a new prompt or submits existing one) with a cover note explaining how it meets requirements. Creator can see how many others have submitted (but not their submissions).

**Evaluation:**
Company reviews submissions privately. Can request revisions from any submitter (1 round of revision allowed). Company selects winner → platform releases escrow to winner. If company selects no winner within 7 days of deadline: all creators get their submission fee refunded, bounty marked as "No winner selected."

**Creator protection:**
Submitted prompts are NOT publicly visible until a winner is selected. If the creator wins: their prompt is automatically listed on the marketplace (they can choose pricing). If they don't win: their prompt is returned to them as a private draft — they can still publish it themselves.

**Platform fee:** 10% of reward goes to platform.

**Discovery:**
Bounties listed on /bounties page with filters: category, reward range, deadline, status. Highlighted bounties (highest reward) shown on homepage sidebar. Email digest to subscribed creators: "New bounty matching your specializations: $500 for a legal contract analyzer prompt."

---

### 2.9 CREATOR SUBSCRIPTION BUNDLES

**The problem this solves:** "Buying prompts one-by-one is like buying songs on iTunes in 2024." PromptBase is entirely per-prompt. PromptVault adds subscription options that create recurring revenue for creators and lower friction for buyers.

**Implementation:**

Creators with at least 10 active prompts can create subscription bundles.

**Bundle structure:**
Name, description, included prompts (list, up to 50), price per month, price per year (must be at least 15% discount vs monthly), access type: "All current + future prompts from this creator" OR "Specific prompt selection."

**Buyer perspective:**
When viewing a creator's profile: see "Subscribe to [Creator Name]'s Bundle — $29/mo, access to all 47 prompts."
On individual prompt detail page: if prompt is included in a bundle: show "This prompt is included in [Creator]'s bundle — $29/mo. Compare vs $9 one-time."

**Subscription management:**
Buyers manage subscriptions in /dashboard/subscriptions. Shows: creator name, plan, next billing date, total spent, cancel option. Cancelling preserves access until period end.

**Backend:**
Use Stripe Subscriptions. Each bundle = a Stripe Product with monthly/annual Price objects. On subscription created: create active subscription record, grant access to all included prompts. On subscription cancelled: set access to expire at period end. On renewal: log renewal, maintain access.

Creator dashboard shows: subscribers count, MRR (monthly recurring revenue), subscription churn rate, which prompts drive the most subscription upgrades.

---

### 2.10 ADVANCED CREATOR ANALYTICS

Phase 2 upgrades the creator analytics to be genuinely useful for business decisions — not just vanity metrics.

**New analytics modules:**

**Conversion Funnel (per prompt):**
Funnel stages: Page Views → Started Free Preview Run → Completed Preview → Clicked Buy → Checkout Opened → Purchase Completed.
Show each stage's count and drop-off %. If preview→buy conversion is low: insight "Buyers preview but don't buy — consider improving examples or lowering price."

**Revenue Attribution:**
Pie chart: what % of revenue comes from new buyers vs returning buyers vs subscription vs API usage.

**Review Sentiment Analysis:**
Run all reviews through Claude/Gemini sentiment analysis: extract themes from reviews (e.g. "easy to use", "produces great output", "confusing variables", "doesn't work with GPT-4o"). Display as word cloud + theme frequency. Show most mentioned complaints and praises. This is pure gold for prompt improvement.

**Model Performance Breakdown:**
If prompt has been run on multiple models: show success rate, avg output length, avg user satisfaction (post-run rating prompt: "Was this output useful? 👍👎") per model. Helps creator know which model to recommend.

**Cohort Revenue:**
For each month's new buyers: how much did they spend over 3/6/12 months? Shows LTV by cohort. Helps creator understand buyer lifetime value and retention.

**Best Time to Publish:**
Based on historical data: when do prompts in this category get the most views and purchases? Suggest "Best time to publish an update: Tuesday morning."

---

### 2.11 MODEL VERSION TRACKING & COMPATIBILITY ALERTS

**The problem this solves:** When OpenAI releases GPT-4o-mini or Anthropic releases Claude 3.7, prompts written for older versions may break. PromptBase has NO system for this. Buyers are left confused why their purchased prompt stopped working.

**Implementation:**

**Model version registry:**
Maintain a models table: id, provider (openai/anthropic/google/meta), model_slug (gpt-4o, claude-3.5-sonnet), display_name, is_current_version, previous_slug, major_capabilities_changed (bool), release_date, deprecation_date, notes.

Admin-managed: when a new model version releases, admin adds it to registry and can flag if capabilities changed significantly.

**Compatibility checking:**
Prompts store their model_compatibility as slugs. When a model is deprecated or significantly updated, run a background job: find all active prompts using that model slug → set needs_update_warning = true → notify creator via email: "Your prompt '[Name]' may need updating — [Model] received a significant update that may affect output quality."

**Buyer notifications:**
If a buyer has purchased a prompt where needs_update_warning = true: show banner on their dashboard and in workspace: "Heads up: [Prompt Name] was written for [Model v1] — [Model v2] is now available. Test with new model."

**Creator response flow:**
Creator can either: 1) Publish new version with updates for new model, 2) Test and confirm works fine with new version (clears needs_update_warning), 3) Mark as deprecated if they don't plan to update.

---

### 2.12 PHASE 2 NOTIFICATIONS SYSTEM

Build a full notification center. Every notification has: type, title, message, link, is_read, created_at.

**Buyer notification triggers:**
- Prompt you purchased received an update (with changelog link)
- Prompt you purchased has needs_update_warning
- Review you wrote received a creator reply
- Subscription renewal upcoming (7 days notice)
- Subscription renewed successfully
- A/B test results ready
- Bulk test run complete
- Bounty you submitted has a decision
- Challenge voting period started for challenge you submitted to

**Creator notification triggers:**
- New sale (with buyer location country if available for privacy-safe analytics)
- New review (with star rating)
- Prompt review decision (approved / rejected / revision requested)
- New fork of your prompt
- Question received about your prompt
- Payout processed
- Model compatibility warning on your prompt
- Your prompt reached a milestone: 10 sales, 50 sales, 100 sales, 500 sales
- Challenge you entered has results
- Bounty decision made

**Delivery:**
- In-app notification bell (badge count in nav)
- Email (user controls per-notification-type in settings: in-app only / email + in-app / off)
- Weekly digest email (optional): summary of activity for creators

---

# ═══════════════════════════════════════════════
# PHASE 3 PROMPT — ENTERPRISE & ECOSYSTEM
# Duration: 16 weeks | Goal: $500K ARR, B2B revenue, API economy
# ═══════════════════════════════════════════════

## PHASE 3 MASTER PROMPT

You are building Phase 3 of PromptVault. The marketplace is healthy. Community is growing. Now you must unlock the **enterprise revenue layer** and build the ecosystem infrastructure that makes PromptVault impossible to replace.

Phase 3 transforms PromptVault from "a marketplace where individuals buy prompts" into "the prompt infrastructure layer that teams and companies build on." This is where the real revenue is.

---

### 3.1 ENTERPRISE API — The B2B Revenue Engine

**What this unlocks:** Companies don't want to buy prompts manually. They want to call an API with a prompt_id and variables, get an output, and pay per call. This is the enterprise product.

**API design — /api/v1/run endpoint (enterprise):**

```
POST /api/v1/run
Authorization: Bearer {enterprise_api_key}
Content-Type: application/json

{
  "prompt_id": "uuid",
  "variables": {
    "product_name": "Acme SaaS",
    "target_audience": "B2B marketing managers",
    "tone": "professional"
  },
  "model": "claude-3-5-sonnet", // optional, overrides prompt default
  "max_tokens": 1000,           // optional
  "temperature": 0.7,           // optional
  "stream": false               // optional, if true returns SSE stream
}

Response (non-stream):
{
  "run_id": "uuid",
  "output": "...",
  "model_used": "claude-3-5-sonnet",
  "usage": {
    "tokens_in": 420,
    "tokens_out": 380,
    "total_tokens": 800,
    "cost_usd": 0.00416
  },
  "latency_ms": 1240,
  "prompt_version": "2.1.0"
}
```

**API infrastructure:**
- API keys stored as SHA-256 hashes in database — never store plaintext
- Key prefixes: pv_live_ (production), pv_test_ (test mode, free, rate limited)
- Per-key rate limiting: stored in Redis, per-minute and per-day limits configurable
- Per-key spending limits: set monthly budget cap, auto-disable at cap
- API key scopes: run_prompts, read_prompts, create_prompts (for enterprise libraries), manage_team

**Usage metering:**
Every API call logged to usage_logs table: api_key_id, prompt_id, model, tokens_in, tokens_out, cost_usd, latency_ms, status, run_at. This feeds billing.

**Billing:**
Monthly invoice via Stripe (not per-call Stripe charges — too expensive at scale). Invoice = sum of all usage_logs for the month. Companies set a credit card on file. Auto-charge on 1st of each month. Late payment: API disabled after 7 days.

Pricing tiers for API:
- Pay-as-you-go: platform margin on top of model cost (~30% markup)
- Committed usage: $500/mo for $700 in credits (30% bonus)
- Enterprise: custom pricing with volume discounts, SLA, dedicated support

**Enterprise dashboard:**
Separate dashboard at /enterprise showing:
- API usage over time (calls per day, tokens per day, cost per day)
- Usage breakdown by prompt_id, by team member, by model
- Budget remaining this month
- All API keys with usage stats
- Invoice history
- Team management (add/remove team members, assign API keys)
- Webhook configuration (receive events: run completed, error, budget threshold reached)

---

### 3.2 TEAM WORKSPACES — For Professional Teams

**What this solves:** No prompt marketplace supports teams. Individual accounts only. Teams at companies use prompts collaboratively but have no shared infrastructure.

**Implementation:**

**Workspace model:**
Organization → has many Workspaces → each Workspace has: members (with roles), shared prompt library, shared collections, shared API keys, shared billing.

**Roles within workspace:**
- Owner: full control, billing, invite members, delete workspace
- Admin: manage members and permissions, create/delete shared collections, manage API keys
- Editor: add/remove prompts from shared library, create collections, run prompts
- Viewer: view and run shared prompts, view collections — cannot add/modify

**Shared prompt library:**
- A team can "add to workspace" any prompt they individually own
- Also: private workspace-only prompts (not listed on marketplace) — for proprietary internal prompts
- Members with Editor+ can add prompts from marketplace to shared library
- Prompt runs from shared library show which team member ran them (audit trail)

**Team prompt creation:**
Teams can create private prompts — fully functional prompt with all variables, versions, examples — but never listed publicly. Only accessible within the workspace. This turns PromptVault into an internal prompt management system, not just a marketplace.

**Activity feed:**
Workspace dashboard shows: "Sarah added 'Contract Analyzer' to workspace", "Mike ran 'Cold Email Generator' 12 times today", "New version of 'Blog Post System' available". Creates team awareness around prompt usage.

**Billing:**
Workspace billing = one bill for all runs made by all members using workspace API keys. Owner sees who is spending what. Can set per-member spending limits.

---

### 3.3 PROMPT PIPELINE BUILDER — Visual Workflow Tool

Extends Phase 2's basic prompt chaining into a full visual workflow builder.

**Interface:**
React Flow-based canvas. Drag and drop nodes onto canvas. Node types:

- **Prompt Node:** select any owned prompt. Configure variables (static values or connected to inputs from previous nodes).
- **Input Node:** defines inputs that the pipeline accepts from outside (the entry point).
- **Output Node:** defines what the pipeline outputs (which prompt's output to return or display).
- **Conditional Node:** if-else logic based on output content ("if output contains 'yes' → route to Node A, else → Node B")
- **Transform Node:** simple text transformation (trim, extract JSON, extract first paragraph, regex replace)
- **Human Review Node:** pause pipeline, present output to human for approval, then continue (or modify and continue)
- **Webhook Node:** send output to an external URL (POST request with output as body)

**Connections:** Draw arrows between nodes. Output socket of one prompt connects to variable input socket of another.

**Pipeline execution:**
Run pipeline from canvas UI or via API (/api/v1/pipeline/:pipeline_id/run with {input_variables}). Each step executes sequentially (or in parallel for fan-out). Each step's output logged. Visualize which node is currently executing during run.

**Publishing pipelines:**
Users can publish a pipeline to the marketplace as a product. Buyers purchase the pipeline (not just a single prompt) and can run it via API or workspace. Pipeline product pages show: steps visualization (diagram, not the actual prompt content), use cases, example inputs/outputs, pricing.

---

### 3.4 EMBEDDED WIDGET — Prompts Everywhere

**What this unlocks:** Other websites and tools can embed PromptVault prompts. This creates distribution — every embedded prompt is a marketing touchpoint.

**Widget types:**

1. **Run Widget:** embed a prompt execution UI on any website. `<script src="https://widget.promptvault.com/embed.js" data-prompt-id="..." data-api-key="..." />` — renders a variable form + run button + output display. Site owner must have API access and purchased the prompt.

2. **Browse Widget:** embed a browsable prompt collection on any website. A company could embed their internal prompt library on their company intranet using this widget.

3. **Creator Store Widget:** a creator can embed their own PromptVault store on their personal website. Shows their prompts, handles purchase via PromptVault checkout, creator gets their earnings.

**Widget customization:**
Theme (light/dark/custom), accent color, font choice, widget height, which fields to show/hide.

---

### 3.5 PROMPT VAULT PROTECTION — IP Security Layer

**What this solves:** Creators fear their prompts get copied once purchased. PromptBase has minimal protection. PromptVault takes IP protection seriously.

**Protection layers:**

1. **Watermarking:** every prompt accessed by a buyer is silently watermarked with their buyer_id in a way invisible to humans but detectable programmatically. If a prompt appears on another platform: PromptVault can detect which account leaked it.

2. **Access logging:** every time a purchased prompt's full content is accessed (viewed, copied, sent to API): logged with timestamp, IP, and action. If a prompt is copied 50 times from the same account in 1 day: automatic flag for review.

3. **Copy throttling:** after purchasing: user can copy the prompt a maximum of N times per day (creator sets N, default 20). Exceeding limit: warning message "Unusual copy activity detected. Contact support if this is a mistake."

4. **Anti-scraping:** Cloudflare Bot Management on all prompt content endpoints. Content rendered via server-side rendering to make scraping harder. Key prompt content delivered via API (not raw HTML) with strict auth checks.

5. **DMCA process:** automated DMCA takedown form. Creator reports stolen prompt with evidence → admin reviews → if valid: immediate unlisting of offending prompt and user ban.

6. **Prompt fingerprinting:** unique micro-variations injected per-purchase (synonyms, spacing, punctuation) — detectable signature without changing prompt meaning. Enterprise feature — for high-value prompts over $50.

---

### 3.6 INTERNATIONAL EXPANSION

**What this solves:** PromptBase is English-only. 80% of the world's AI users are non-English speakers.

**Implementation:**

**Multi-language prompt support:**
Prompts can have a primary language and translations. Creator submits prompt in English (required as primary), can optionally add translated versions in Spanish, French, German, Japanese, Chinese, Arabic, Portuguese, Hindi.

Translation quality: human-translated by verified translators (platform hires freelancers) OR creator-submitted and community-reviewed.

**UI localization (i18n):**
Use next-intl for Next.js. Translate UI strings to top 8 languages. Detect browser language, offer to switch. Store preference in user settings.

**Currency localization:**
Display prices in user's local currency (using Stripe's automatic currency conversion). Show: "$9 USD (~₹748 INR)". Checkout always settles in USD for simplicity.

**Regional creator payouts:**
Stripe Connect supports payouts in 40+ countries. Ensure creator onboarding works for creators in India, Nigeria, Brazil, Germany, UK, Canada, Australia — the top creator markets outside US.

**Crypto payouts:**
For creators in countries where Stripe payouts are restricted (many African and South Asian countries): offer USDC payout via Circle API. Creator provides USDC wallet address. Minimum payout threshold: $20. Platform converts USD earnings to USDC and transfers.

---

### 3.7 ADVANCED MODERATION & TRUST SYSTEMS

**What this solves:** At scale, fraud, fake reviews, stolen content, and bad actors become serious problems. Phase 3 builds the infrastructure to handle them.

**Automated fraud detection:**
Run daily ML-adjacent checks (rule-based for Phase 3, true ML in Phase 4):

- **Review farming detection:** user leaves 10+ reviews in 24h → auto-hold reviews for manual approval
- **IP clustering:** multiple accounts from same IP → flag for review (could be VPN, could be fraud)
- **Purchase anomaly:** account created <24h ago with 5+ purchases → flag
- **Rating manipulation:** prompt's rating changes by >1.0 in 48h → investigate
- **Seller self-purchasing:** creator purchases their own prompt from different account → match via fingerprint (same IP, same payment method, similar signup timing) → ban both accounts

**Seller quality tiers:**
Track seller metrics over time. Auto-downgrade tier (and reduce search ranking) if:
- Refund rate >15% in 90 days
- Average rating drops below 3.5
- Response time to customer questions exceeds 72h
- >3 DMCA reports
- >5 moderation violations

**Buyer trust signals:**
Show buyers: how long seller has been on platform, total verified sales, refund rate (if high, show warning), response time. This information is currently missing from PromptBase.

**Dispute resolution SLA:**
All disputes must be resolved within 48 hours. Admin dashboard shows time-in-queue for every dispute. If dispute exceeds 48h without assignment: auto-escalate and send admin alert. Resolution options: full refund (platform absorbs), partial refund, no refund with explanation, split (creator keeps 50%).

---

### 3.8 ANALYTICS & REPORTING INFRASTRUCTURE

Build a proper analytics layer using ClickHouse for event-level data (too much for PostgreSQL at scale).

**Events tracked (sent to ClickHouse):**
Every page view (prompt_id if on prompt page, search query if on search page, user_id if logged in, session_id, referrer, country, device type). Every search (query, filters, result count, clicks on result). Every prompt interaction (variable change, free preview run, copy button click by platform, purchase click). Every purchase. Every run. Every review submission.

**Dashboards:**

Platform health dashboard (admin): DAU/MAU, new signups by day, GMV by day, top searched queries (with zero-results queries highlighted for gap analysis), top clicked prompts, purchase conversion rates.

Creator analytics (enhanced): per-prompt funnel, revenue by source (organic search / featured / challenge / referral), buyer geography map, day-over-day comparison, export to CSV.

Market intelligence (admin): category growth rates, emerging tags (tags with fastest-growing prompt count), model popularity trends, pricing distribution histogram.

---

### 3.9 PHASE 3 INFRASTRUCTURE HARDENING

**Performance targets at scale (10K DAU, 1M prompts):**
- Keyword search: <150ms P95
- Semantic search: <400ms P95
- Prompt detail page: <800ms TTFB (server-side)
- API /run endpoint: <2s P95 (model-dependent)
- Homepage: <1s FCP globally via CDN

**Caching strategy:**
- Prompt detail pages: ISR with 60s revalidation (Next.js)
- Trending/featured lists: Redis cache with 1h TTL, invalidated on admin update
- Search results: Redis cache on exact query+filter combos, TTL 5 min
- User session data: Redis with 15min TTL (rolling)
- Creator earnings summary: Redis cache 15min, invalidated on new purchase
- Model pricing rates: Redis cache 1h (fetched from config, not DB)

**Database optimization:**
- Read replicas for all SELECT queries (search, browse, detail pages)
- Primary for all writes (purchases, reviews, runs)
- Connection pooling via PgBouncer: max 100 connections per replica
- Query optimization: EXPLAIN ANALYZE every query over 50ms, add indexes
- pgvector: use IVFFlat index for approximate nearest neighbor (ANN) search — create index with lists=100 for million-prompt scale
- Partitioning: prompt_runs and usage_logs tables partitioned by month (these grow fast)

**Observability:**
- Sentry for error tracking (frontend + backend)
- Axiom for log aggregation and querying
- Uptime monitoring: Checkly synthetic monitoring for critical flows (purchase flow, search, login)
- Alert thresholds: API P95 latency >3s → PagerDuty. Error rate >1% → Slack alert. DB connection pool >80% → auto-scale alert.

**Security hardening:**
- All secrets in Doppler — zero .env files in repository
- CSP headers on all pages: strict content security policy
- HSTS with 1 year max-age
- All dependencies: automated vulnerability scanning via Dependabot + Snyk
- Penetration testing: hire external pentest firm before enterprise product launch
- SOC 2 Type 1 audit: engage auditor, document all controls, begin evidence collection
- Data retention policy: user-deleted accounts anonymized within 30 days

---

### 3.10 PHASE 3 GO-TO-MARKET STRATEGY

**Enterprise sales motion:**
- Identify ICP (ideal customer profile): marketing agencies (10–100 person), SaaS companies with content teams, law firms interested in AI, research organizations
- Outbound: personalized cold email sequence using (naturally) a PromptVault cold email prompt
- Case studies: document 3 company use cases with metrics (time saved, cost saved, output quality improvement)
- Enterprise page: /enterprise with: security docs, SSO option, SLA, case studies, demo request form
- Pricing page: transparent pricing up to team size 10, "Contact sales" for >10
- Integration directory: Zapier app, Make.com connector, Slack app (run a prompt from Slack: /promptvault run [prompt_id] [variables])

**Creator economy growth:**
- Creator scholarship: 10 creators/month get $500 each to build high-quality prompts in underserved categories
- Creator spotlight newsletter: weekly email profiling top creator, their story, their earnings
- Creator certification promotion: LinkedIn post format for certified creators to share their badge
- Revenue milestone celebration: automated congratulation email at $1K, $5K, $10K, $50K earnings
- Annual Creator Summit: online event, workshops, panel discussions, networking

**Community growth:**
- Discord server: support, prompt sharing, creator lounge, challenge discussions
- Weekly "Prompt of the Week" blog post with breakdown of why it works
- YouTube series: "I Earned $X from Prompts" creator interviews
- SEO content strategy: rank for 1000+ long-tail keywords around specific prompt use cases
- Affiliate program: 15% commission for 12 months for referred buyers; 10% for referred creators' first month of sales

---

# ═══════════════════════════════════════════════
# APPENDIX — WHAT MAKES PROMPTVAULT WIN
# (Summary for any AI engineer reading this)
# ═══════════════════════════════════════════════

## The 10 Unfair Advantages Over PromptBase

1. **Free sandbox run before purchase** — Buyers never buy blind again. Trust = conversion.
2. **Unlimited variables with type system** — PromptBase caps at 4, type=text only. We do unlimited, typed, validated.
3. **Prompt Workspace** — Purchased prompts live in a daily-use workspace with presets and history. Not a receipt email.
4. **Variable Presets** — Save named configurations per prompt. Run "Client A settings" in one click. This alone makes it a daily tool.
5. **Prompt Chaining / Pipeline Builder** — Connect prompts into multi-step workflows. No competitor has this.
6. **Bulk Test Runner for creators** — Creators can QA their prompts at scale before publishing. Better prompts = happier buyers.
7. **A/B Test Runner for buyers** — Objective comparison before committing. Data-driven purchasing.
8. **Team Workspaces** — The only prompt marketplace built for teams. Unlocks B2B market entirely.
9. **Enterprise API** — Run any prompt via REST API. Pay per execution. This is a whole new business model.
10. **Quality Score + Certification** — Objective, algorithm-driven quality signals. Not just star ratings that can be gamed.

## The Revenue Stack

| Phase | Primary Revenue | Secondary Revenue |
|-------|----------------|-------------------|
| Phase 1 | 20% commission on prompt sales | Creator Pro subscriptions ($29/mo) |
| Phase 2 | Commission + creator subscriptions | API credit sales, challenge sponsorships |
| Phase 3 | Enterprise API billing | Team workspaces, pipeline marketplace, featured listings |

## The Moat

By Phase 3, PromptVault's moat is:
- **Data moat:** run history, quality scores, buyer behavior — makes search and recommendations better over time
- **Workflow moat:** teams' pipelines and workspaces are deeply integrated — switching cost is high
- **Creator moat:** creators with earnings history, reviews, and certification won't leave for a competitor
- **API moat:** enterprise integrations built on PromptVault API can't easily migrate

---

*PromptVault Master Prompt Suite v1.0*
*Total scope: Phase 1 (8w) + Phase 2 (12w) + Phase 3 (16w) = 36 weeks to full platform*
*Use each phase's master prompt as the system prompt when building that phase.*
