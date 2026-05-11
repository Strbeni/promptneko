import { NextResponse } from "next/server";
import { createServerClient } from "../../../../lib/supabase";

// Admin notification — simply logs to console and could be extended to
// send a real email via Resend / SendGrid when you're ready.
export async function POST(req: Request) {
  const { userId, displayName } = await req.json();

  // Log for now — swap with real email/Slack/webhook later
  console.log(`[creator-application] New creator application from ${displayName} (${userId})`);

  // Optional: you could send an email here via fetch() to Resend etc.

  // Mark the users row so admin can query pending creators
  const db = createServerClient();
  await (db as any)
    .from("users")
    .update({ is_creator_approved: false })
    .eq("id", userId);

  return NextResponse.json({ ok: true });
}
