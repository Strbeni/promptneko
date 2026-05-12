"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { MarketplaceLayout } from "../components/MarketplaceLayout";
import { CheckCircle, XCircle, Loader2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAdminDashboardData, adminUpdatePromptStatus, adminApproveCreator, adminToggleFlag, adminUpdatePromptCategory } from "./actions";
import { filterCategories } from "../components/marketplace-data";

export default function AdminPage() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  
  const [pendingPrompts, setPendingPrompts] = useState<any[]>([]);
  const [activePrompts, setActivePrompts] = useState<any[]>([]);
  const [pendingCreators, setPendingCreators] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } else if (!loading && dbUser && dbUser.role !== "admin") {
      // Redirect non-admins
      // For testing, let's just show an error instead of redirecting so they can read it
    }
  }, [user, loading, dbUser, router]);

  async function loadAdminData() {
    setFetching(true);
    
    const result = await getAdminDashboardData();
    if (!result.error) {
      setPendingPrompts(result.prompts || []);
      setActivePrompts(result.activePrompts || []);
      setPendingCreators(result.creators || []);
    }
    
    setFetching(false);
  }

  useEffect(() => {
    if (dbUser?.role === "admin") {
      loadAdminData();
    } else {
      setFetching(false);
    }
  }, [dbUser]);

  async function updatePromptStatus(id: string, status: string) {
    await adminUpdatePromptStatus(id, status);
    loadAdminData();
  }

  async function updatePromptCategory(id: string, category: string) {
    if (!category || category === "All") return;
    await adminUpdatePromptCategory(id, category);
    loadAdminData();
  }

  async function toggleFlag(id: string, flag: 'is_featured' | 'is_staff_pick', value: boolean) {
    await adminToggleFlag(id, flag, value);
    loadAdminData();
  }

  async function approveCreator(id: string) {
    await adminApproveCreator(id);
    loadAdminData();
  }

  // --- Hack to make yourself an admin for testing ---
  async function makeMeAdmin() {
    if (!user) return;
    await fetch("/api/admin/make-me-admin", { method: "POST" });
    window.location.reload();
  }

  if (loading || (!user && fetching)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060913]">
        <Loader2 className="animate-spin text-[#7b3cff]" size={32} />
      </div>
    );
  }

  if (dbUser && dbUser.role !== "admin") {
    return (
      <MarketplaceLayout activeNav="admin" query="" onQueryChange={() => {}} onSearch={() => {}} onAction={() => {}}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="max-w-md text-center space-y-4 bg-[#0a1020] p-8 rounded-2xl border border-rose-500/20">
            <ShieldAlert size={48} className="mx-auto text-rose-500 mb-4" />
            <h1 className="text-2xl font-bold text-white">Access Denied</h1>
            <p className="text-[#8990aa]">You need admin privileges to view this page.</p>
            <button 
              onClick={makeMeAdmin}
              className="mt-6 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-colors text-sm font-semibold"
            >
              [Dev Tool] Make me an Admin
            </button>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout activeNav="admin" query="" onQueryChange={() => {}} onSearch={() => {}} onAction={() => {}}>
      <div className="flex-1 overflow-auto p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-[#8990aa]">Manage creator applications and prompt submissions.</p>
            </div>
            <button onClick={loadAdminData} className="px-3 py-1.5 bg-[#1e2640] text-white rounded hover:bg-[#2a3154] text-sm">
              Refresh Data
            </button>
          </div>

          {/* Pending Creators */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Pending Creators <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{pendingCreators.length}</span>
            </h2>
            
            {fetching ? (
              <div className="p-8 text-center text-[#8990aa]">Loading...</div>
            ) : pendingCreators.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No pending creator applications.
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingCreators.map((creator) => (
                  <div key={creator.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-[#1e2640] rounded-xl bg-[#080f1e]">
                    <div>
                      <h3 className="font-semibold text-white">{creator.display_name}</h3>
                      <p className="text-sm text-[#8990aa] mb-2">{creator.email}</p>
                      {creator.creator_profiles?.[0] && (
                        <div className="text-sm text-[#c4c9e0]">
                          <p><strong>Tagline:</strong> {creator.creator_profiles[0].tagline || "None"}</p>
                          <div className="flex gap-1 flex-wrap mt-1">
                            {creator.creator_profiles[0].specializations?.map((s: string) => (
                              <span key={s} className="px-1.5 py-0.5 bg-[#7b3cff]/20 text-[#a46aff] rounded text-[10px]">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button 
                        onClick={() => approveCreator(creator.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold"
                      >
                        <CheckCircle size={16} /> Approve Creator
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Prompts */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Pending Prompts <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{pendingPrompts.length}</span>
            </h2>
            
            {fetching ? (
              <div className="p-8 text-center text-[#8990aa]">Loading...</div>
            ) : pendingPrompts.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No prompts waiting for review.
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingPrompts.map((prompt) => (
                  <div key={prompt.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-[#1e2640] rounded-xl bg-[#080f1e]">
                    <div>
                      <h3 className="font-semibold text-white">{prompt.title}</h3>
                      <p className="text-sm text-[#8990aa]">
                        Submitted by: {prompt.users?.display_name || "Unknown"} • {new Date(prompt.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <button 
                        onClick={() => updatePromptStatus(prompt.id, "rejected")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-colors text-sm"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                      <button 
                        onClick={() => updatePromptStatus(prompt.id, "published")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                      >
                        <CheckCircle size={14} /> Approve & Publish
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Prompts */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Active Prompts (Manage Categories) <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{activePrompts.length}</span>
            </h2>
            
            {fetching ? (
              <div className="p-8 text-center text-[#8990aa]">Loading...</div>
            ) : activePrompts.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No active prompts.
              </div>
            ) : (
              <div className="grid gap-4">
                {activePrompts.map((prompt) => (
                  <div key={prompt.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-[#1e2640] rounded-xl bg-[#080f1e]">
                    <div>
                      <h3 className="font-semibold text-white">{prompt.title}</h3>
                      <p className="text-sm text-[#8990aa]">
                        By: {prompt.users?.display_name || "Unknown"} • {new Date(prompt.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                      <select 
                        onChange={(e) => updatePromptCategory(prompt.id, e.target.value)}
                        className="px-3 py-1.5 bg-[#080f1e] text-[#8990aa] border border-[#1e2640] rounded-lg text-sm outline-none"
                        defaultValue=""
                      >
                        <option value="" disabled>Assign Category</option>
                        {filterCategories.filter(c => c.label !== "All").map(c => (
                          <option key={c.label} value={c.label}>{c.label}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => toggleFlag(prompt.id, "is_featured", !prompt.is_featured)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg transition-colors text-sm ${prompt.is_featured ? "bg-[#7b3cff]/20 text-[#a46aff] border-[#7b3cff]/30" : "bg-transparent text-[#8990aa] border-[#1e2640] hover:text-white"}`}
                      >
                        Featured
                      </button>
                      <button 
                        onClick={() => toggleFlag(prompt.id, "is_staff_pick", !prompt.is_staff_pick)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg transition-colors text-sm ${prompt.is_staff_pick ? "bg-[#00d9a8]/20 text-[#00d9a8] border-[#00d9a8]/30" : "bg-transparent text-[#8990aa] border-[#1e2640] hover:text-white"}`}
                      >
                        Staff Pick (Trending)
                      </button>
                      <button 
                        onClick={() => updatePromptStatus(prompt.id, "archived")}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-colors text-sm"
                        title="Hide prompt from the marketplace"
                      >
                        <XCircle size={14} /> Hide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </MarketplaceLayout>
  );
}
