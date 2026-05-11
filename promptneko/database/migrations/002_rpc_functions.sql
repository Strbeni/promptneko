-- Run this in Supabase SQL editor to add the view count RPC
create or replace function increment_view_count(p_id uuid)
returns void language sql security definer as $$
  update prompts set view_count = view_count + 1 where id = p_id;
$$;
