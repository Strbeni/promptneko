import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../../../lib/supabase";
import { isUuid, jsonError, rateLimit, requireUser, sanitizeText } from "../../../../../lib/api-utils";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/prompts/[promptId]/reviews">) {
  const { promptId } = await ctx.params;
  if (!isUuid(promptId)) return NextResponse.json({ reviews: [] });

  const db = createServerClient();
  const { data, error } = await (db as any)
    .from("reviews")
    .select("id, rating, title, content, model_used, use_case_tried, would_recommend, is_verified_purchase, helpful_count, created_at, reviewer:users!reviewer_id(display_name, username, avatar_url)")
    .eq("prompt_id", promptId)
    .eq("is_hidden", false)
    .order("created_at", { ascending: false })
    .limit(25);

  if (error) return jsonError(error.message, 500);
  return NextResponse.json({ reviews: data ?? [] });
}

export async function POST(req: NextRequest, ctx: RouteContext<"/api/prompts/[promptId]/reviews">) {
  const limited = await rateLimit("prompt-review", 10, 60_000);
  if (!limited.ok) return jsonError("Too many requests", 429);

  const { promptId } = await ctx.params;
  if (!isUuid(promptId)) return jsonError("Only database-backed prompts can be reviewed", 400);

  const { user, error } = await requireUser();
  if (error || !user) return jsonError("Sign in to review prompts", 401);

  const body = await req.json().catch(() => null);
  const rating = Number(body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return jsonError("Rating must be an integer from 1 to 5", 400);
  }

  const db = createServerClient();
  const { data: purchase } = await db
    .from("purchases")
    .select("id")
    .eq("buyer_id", user.id)
    .eq("prompt_id", promptId)
    .eq("status", "completed")
    .maybeSingle();

  if (!purchase) {
    return jsonError("Only verified buyers can review this prompt", 403);
  }

  const { data, error: insertError } = await (db as any)
    .from("reviews")
    .upsert(
      {
        reviewer_id: user.id,
        prompt_id: promptId,
        purchase_id: purchase.id,
        rating,
        title: sanitizeText(body?.title, 100) || null,
        content: sanitizeText(body?.content, 1500) || null,
        model_used: sanitizeText(body?.modelUsed, 80) || null,
        use_case_tried: sanitizeText(body?.useCaseTried, 160) || null,
        would_recommend: typeof body?.wouldRecommend === "boolean" ? body.wouldRecommend : null,
        is_verified_purchase: true,
        is_hidden: false,
      },
      { onConflict: "reviewer_id,prompt_id" }
    )
    .select("id")
    .single();

  if (insertError) return jsonError(insertError.message, 500);
  return NextResponse.json({ success: true, reviewId: data.id });
}
