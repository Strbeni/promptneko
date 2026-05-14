/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../../../lib/supabase";
import { isUuid, jsonError, rateLimit, requireUser } from "../../../../../lib/api-utils";

export async function POST(_req: NextRequest, ctx: RouteContext<"/api/prompts/[promptId]/purchase">) {
  const limited = await rateLimit("prompt-purchase", 20, 60_000);
  if (!limited.ok) return jsonError("Too many requests", 429);

  const { promptId } = await ctx.params;
  if (!isUuid(promptId)) return jsonError("Only database-backed prompts can be purchased", 400);

  const { user, error } = await requireUser();
  if (error || !user) return jsonError("Sign in to buy prompts", 401);

  const db = createServerClient();
  const { data: prompt, error: promptError } = await (db as any)
    .from("prompts")
    .select("id, creator_id, version, price_cents, pricing_type, status, purchase_count")
    .eq("id", promptId)
    .single();

  if (promptError || !prompt || prompt.status !== "active") {
    return jsonError("Prompt is not available for purchase", 404);
  }

  if (prompt.creator_id === user.id) {
    return jsonError("Creators already own their prompts", 400);
  }

  const { data: existingPurchase } = await (db as any)
    .from("purchases")
    .select("id, status")
    .eq("buyer_id", user.id)
    .eq("prompt_id", promptId)
    .maybeSingle();

  if (existingPurchase?.status === "completed") {
    return NextResponse.json({
      purchaseId: existingPurchase.id,
      status: existingPurchase.status,
      checkoutRequired: false,
      message: "You already own this prompt.",
    });
  }

  const amountPaid = prompt.price_cents ?? 0;
  const platformFee = Math.round(amountPaid * 0.15);
  const status = amountPaid === 0 ? "completed" : "pending";

  const { data: purchase, error: purchaseError } = await (db as any)
    .from("purchases")
    .upsert(
      {
        buyer_id: user.id,
        prompt_id: promptId,
        prompt_version_at_purchase: prompt.version,
        amount_paid_cents: amountPaid,
        platform_fee_cents: platformFee,
        creator_earnings_cents: amountPaid - platformFee,
        currency: "usd",
        payment_method: "stripe",
        status,
      },
      { onConflict: "buyer_id,prompt_id" }
    )
    .select("id, status")
    .single();

  if (purchaseError) return jsonError(purchaseError.message, 500);

  if (status === "completed") {
    await (db as any).from("prompts").update({ purchase_count: (prompt as any).purchase_count + 1 }).eq("id", promptId);
  }

  return NextResponse.json({
    purchaseId: purchase.id,
    status: purchase.status,
    checkoutRequired: amountPaid > 0,
    message:
      amountPaid > 0
        ? "Purchase request recorded. Configure Stripe checkout to collect payment before delivery."
        : "Free prompt added to your purchases.",
  });
}
