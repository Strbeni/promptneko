/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createServerClient } from "../../../../../lib/supabase";
import { isUuid, jsonError, rateLimit } from "../../../../../lib/api-utils";

export async function POST(_req: Request, ctx: RouteContext<"/api/prompts/[promptId]/view">) {
  const limited = await rateLimit("prompt-view", 120, 60_000);
  if (!limited.ok) return jsonError("Too many requests", 429);

  const { promptId } = await ctx.params;
  if (!isUuid(promptId)) return NextResponse.json({ views: null, tracked: false });

  const db = createServerClient();
  const { data, error } = await (db as any).rpc("increment_view_count", { p_id: promptId });

  if (error) return jsonError(error.message, 500);

  return NextResponse.json({ views: data ?? 0, tracked: true });
}
