# PromptVault Database

This folder contains the Phase 1 PostgreSQL foundation schema and required category seed data.

## Requirements

- PostgreSQL 15+
- `pgcrypto`
- `pgvector`
- `psql` available on your PATH

The migration uses UUID primary keys throughout, `timestamptz` timestamps, enum types for constrained workflow state, database-level verified-purchase review enforcement, prompt slug generation, and denormalized count/rating triggers.

## Apply Locally

Set `DATABASE_URL` to your PostgreSQL connection string, then run:

```bash
npm run db:migrate
npm run db:seed
```

The seed is idempotent and can be re-run safely.

## Notes

- `prompts.content` and `prompt_versions.content_snapshot` are `bytea` fields intended to store application-encrypted prompt payloads.
- Review verification is enforced by a composite foreign key to `purchases` plus a trigger requiring the purchase status to be `completed`.
- `categories.prompt_count`, `prompts.purchase_count`, `prompts.avg_rating`, `prompts.review_count`, creator stats, and collection item counts are maintained by triggers.
