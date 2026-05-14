/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { jsonError, requireUser } from "../../../../lib/api-utils";

const PROMPT_SELECT = `
  prompt:prompts(
    *,
    creator:users!creator_id(id, username, display_name, avatar_url, is_creator_approved),
    category:categories!category_id(id, slug, name),
    prompt_assets(id, url, type, width, height, is_primary, sort_order),
    prompt_variables(id, name, placeholder_key, description, variable_type, default_value, options, is_required, sort_order)
  )
`;

export async function GET() {
  const { user, authClient, error } = await requireUser();
  if (error || !user) return jsonError("Unauthorized", 401);

  const { data, error: queryError } = await (authClient as any)
    .from("user_likes")
    .select(PROMPT_SELECT)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(100);

  if (queryError) return jsonError(queryError.message, 500);

  return NextResponse.json({
    prompts: (data ?? []).map((row: any) => row.prompt).filter(Boolean),
  });
}
