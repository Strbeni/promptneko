import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, createSupabaseServerClient } from "../../../../lib/supabase";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const authClient = createSupabaseServerClient(cookieStore);
    const { data: { user } } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = createServerClient();
    
    // Bypass RLS using service role client
    await (db as any)
      .from("users")
      .update({ role: "admin", is_creator_approved: true })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
