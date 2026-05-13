import { NextRequest, NextResponse } from "next/server";
import { isUuid, jsonError, requireUser } from "../../../../lib/api-utils";

export async function GET(req: NextRequest) {
  const { user, authClient, error } = await requireUser();
  if (error || !user) return jsonError("Unauthorized", 401);

  const ids = (req.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(isUuid)
    .slice(0, 100);

  if (ids.length === 0) {
    return NextResponse.json({ liked: [], saved: [] });
  }

  const [likes, saved] = await Promise.all([
    (authClient as any).from("user_likes").select("prompt_id").eq("user_id", user.id).in("prompt_id", ids),
    (authClient as any).from("user_saved_prompts").select("prompt_id").eq("user_id", user.id).in("prompt_id", ids),
  ]);

  if (likes.error) return jsonError(likes.error.message, 500);
  if (saved.error) return jsonError(saved.error.message, 500);

  return NextResponse.json({
    liked: (likes.data ?? []).map((row: any) => row.prompt_id),
    saved: (saved.data ?? []).map((row: any) => row.prompt_id),
  });
}
