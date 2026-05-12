"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient, createServerClient } from "../../lib/supabase";

export async function getAdminDashboardData() {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  // Use service role client to bypass RLS
  const adminClient = createServerClient();

  const { data: prompts } = await adminClient
    .from("prompts")
    .select("id, title, status, created_at, users!prompts_creator_id_fkey(display_name)")
    .eq("status", "pending_review")
    .order("created_at", { ascending: false });

  const { data: activePrompts } = await adminClient
    .from("prompts")
    .select("id, title, status, is_featured, is_staff_pick, created_at, users!prompts_creator_id_fkey(display_name)")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const { data: creators } = await adminClient
    .from("users")
    .select("id, display_name, email, creator_profiles(tagline, specializations)")
    .eq("role", "creator")
    .eq("is_creator_approved", false);

  return { 
    prompts: prompts || [], 
    activePrompts: activePrompts || [],
    creators: creators || [] 
  };
}

export async function adminToggleFlag(id: string, flag: 'is_featured' | 'is_staff_pick', value: boolean) {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  await (adminClient as any).from("prompts").update({ [flag]: value }).eq("id", id);
  return { success: true };
}

export async function adminUpdatePromptStatus(id: string, status: string) {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  // Map UI status "published" to DB status "active"
  const finalStatus = status === "published" ? "active" : status;
  
  await (adminClient as any).from("prompts").update({ status: finalStatus }).eq("id", id);
  return { success: true };
}

export async function adminApproveCreator(id: string) {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  await (adminClient as any).from("users").update({ is_creator_approved: true }).eq("id", id);
  return { success: true };
}
