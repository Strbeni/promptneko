import { NextResponse } from "next/server";
import { createServerClient } from "../../../../../lib/supabase";
import { isUuid, jsonError, rateLimit, requireUser } from "../../../../../lib/api-utils";

export async function POST(_req: Request, ctx: RouteContext<"/api/prompts/[promptId]/save">) {
  const limited = await rateLimit("prompt-save", 80, 60_000);
  if (!limited.ok) return jsonError("Too many requests", 429);

  const { promptId } = await ctx.params;
  if (!isUuid(promptId)) return jsonError("Only database-backed prompts can be saved", 400);

  const { user, authClient, error } = await requireUser();
  if (error || !user) return jsonError("Sign in to save prompts", 401);

  const { data: existing, error: readError } = await authClient
    .from("user_saved_prompts" as any)
    .select("prompt_id")
    .eq("user_id", user.id)
    .eq("prompt_id", promptId)
    .maybeSingle();

  if (readError) return jsonError(readError.message, 500);

  if (existing) {
    const { error: deleteError } = await authClient
      .from("user_saved_prompts" as any)
      .delete()
      .eq("user_id", user.id)
      .eq("prompt_id", promptId);
    if (deleteError) return jsonError(deleteError.message, 500);
  } else {
    const { error: insertError } = await authClient
      .from("user_saved_prompts" as any)
      .insert({ user_id: user.id, prompt_id: promptId });
    if (insertError) return jsonError(insertError.message, 500);
  }

  const adminDb = createServerClient();
  const { data: count } = await adminDb.rpc("prompt_save_count", { p_id: promptId });

  return NextResponse.json({ saved: !existing, saves: count ?? 0 });
}
