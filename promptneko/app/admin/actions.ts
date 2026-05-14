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

  const { data: reports } = await (adminClient as any)
    .from("moderation_reports")
    .select("id, target_type, target_id, reason, description, status, created_at")
    .in("status", ["open", "investigating"])
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: users } = await (adminClient as any)
    .from("users")
    .select("id, display_name, email, role, is_banned, created_at")
    .order("created_at", { ascending: false })
    .limit(25);

  const [{ count: promptCount }, { count: activeCount }, { count: userCount }, { count: reportCount }] = await Promise.all([
    (adminClient as any).from("prompts").select("id", { count: "exact", head: true }),
    (adminClient as any).from("prompts").select("id", { count: "exact", head: true }).eq("status", "active"),
    (adminClient as any).from("users").select("id", { count: "exact", head: true }),
    (adminClient as any).from("moderation_reports").select("id", { count: "exact", head: true }).in("status", ["open", "investigating"]),
  ]);

  return { 
    prompts: prompts || [], 
    activePrompts: activePrompts || [],
    creators: creators || [],
    reports: reports || [],
    users: users || [],
    metrics: {
      prompts: promptCount ?? 0,
      activePrompts: activeCount ?? 0,
      users: userCount ?? 0,
      openReports: reportCount ?? 0,
    },
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

export async function adminUpdatePromptCategory(id: string, categoryLabel: string) {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  
  // Create slug from label
  const slug = categoryLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Find category ID
  const { data: cat } = await (adminClient as any).from("categories").select("id").eq("slug", slug).maybeSingle();
  
  let categoryId = cat?.id;
  
  if (!categoryId) {
    // If category doesn't exist, try to create it
    const { data: newCat, error } = await (adminClient as any).from("categories").insert({ name: categoryLabel, slug }).select("id").single();
    if (newCat) {
      categoryId = newCat.id;
    } else {
      return { error: "Failed to resolve category" };
    }
  }

  await (adminClient as any).from("prompts").update({ category_id: categoryId }).eq("id", id);
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

export async function adminUpdateReportStatus(id: string, status: 'investigating' | 'resolved' | 'dismissed') {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  await (adminClient as any)
    .from("moderation_reports")
    .update({
      status,
      resolved_by: status === "resolved" || status === "dismissed" ? user.id : null,
      resolved_at: status === "resolved" || status === "dismissed" ? new Date().toISOString() : null,
    })
    .eq("id", id);
  return { success: true };
}

export async function adminToggleUserBan(id: string, isBanned: boolean) {
  const cookieStore = await cookies();
  const authClient = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: dbUser } = await (authClient as any).from("users").select("role").eq("id", user.id).single();
  if ((dbUser as any)?.role !== "admin") return { error: "Forbidden" };

  const adminClient = createServerClient();
  await (adminClient as any)
    .from("users")
    .update({ is_banned: isBanned, ban_reason: isBanned ? "Admin dashboard action" : null })
    .eq("id", id)
    .neq("id", user.id);
  return { success: true };
}
