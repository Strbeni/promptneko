
# PromptNeko — Database Setup

## 1. Run the migration in Supabase SQL Editor

Paste the contents of `database/migrations/001_promptvault_foundation.sql` into the **Supabase SQL Editor** and run it. Then run `002_rpc_functions.sql`.

> **Do NOT run against production until tests pass.**

## 2. Get your API Keys

Go to: **Supabase Dashboard → Project Settings → API**

Copy:
- `URL` → `NEXT_PUBLIC_SUPABASE_URL`  
- `anon / public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
- `service_role / secret` key → `SUPABASE_SERVICE_ROLE_KEY`

Then update `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://maklruruvcxgrrjunysc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste anon key here>
SUPABASE_SERVICE_ROLE_KEY=<paste service role key here>
DATABASE_URL=postgresql://postgres.maklruruvcxgrrjunysc:promptneko123@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres
```

## 3. Architecture Overview

```
/app/prompt/[slug]/page.tsx   ← tries Supabase first, falls back to static data
/app/api/prompts/create/route.ts  ← writes new prompts from /create wizard
/lib/queries.ts               ← all Supabase read/write functions
/lib/adapters.ts              ← converts DB rows → DetailedPrompt UI shape
/lib/supabase.ts              ← client singleton (browser + server)
/lib/database.types.ts        ← full TypeScript types
/database/migrations/         ← SQL schema + seed data
```

## 4. Data Flow

| Action | Source |
|--------|--------|
| Browse prompts (homepage) | Static `promptCards` → migrate to `getPrompts()` |
| View prompt detail `/prompt/[slug]` | **Supabase** (falls back to static) |
| Submit prompt via `/create` | **Supabase** via `POST /api/prompts/create` |
| Categories | **Supabase** (seeded in migration) |

## 5. Next Steps (Future)

- Add `supabase auth` for real `creator_id` on submission
- Migrate `HomePage` sections to use `getPrompts({ category })` server-side
- Add image upload via `supabase.storage.from('prompt-assets').upload(...)`
- Set up `SUPABASE_SERVICE_ROLE_KEY` environment secret in Vercel
