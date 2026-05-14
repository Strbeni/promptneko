"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { MarketplaceLayout } from "../components/MarketplaceLayout";
import { AlertTriangle, CheckCircle, EyeOff, Flag, Loader2, RefreshCw, Search, ShieldAlert, Users, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getAdminDashboardData,
  adminUpdatePromptStatus,
  adminApproveCreator,
  adminToggleFlag,
  adminUpdatePromptCategory,
  adminUpdateReportStatus,
  adminToggleUserBan,
} from "./actions";
import { filterCategories } from "../components/marketplace-data";

export default function AdminPage() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  
  const [pendingPrompts, setPendingPrompts] = useState<any[]>([]);
  const [activePrompts, setActivePrompts] = useState<any[]>([]);
  const [pendingCreators, setPendingCreators] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({ prompts: 0, activePrompts: 0, users: 0, openReports: 0 });
  const [adminQuery, setAdminQuery] = useState("");
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
      setReports(result.reports || []);
      setUsersList(result.users || []);
      setMetrics(result.metrics || { prompts: 0, activePrompts: 0, users: 0, openReports: 0 });
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

  async function updateReport(id: string, status: 'investigating' | 'resolved' | 'dismissed') {
    await adminUpdateReportStatus(id, status);
    loadAdminData();
  }

  async function toggleUserBan(id: string, value: boolean) {
    await adminToggleUserBan(id, value);
    loadAdminData();
  }

  const visibleActivePrompts = activePrompts.filter((prompt) => {
    const text = `${prompt.title} ${prompt.users?.display_name ?? ""}`.toLowerCase();
    return !adminQuery || text.includes(adminQuery.toLowerCase());
  });

  if (loading || (!user && fetching)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060913]">
        <Loader2 className="animate-spin text-[#7b3cff]" size={32} />
      </div>
    );
  }

  if (dbUser && dbUser.role !== "admin") {
    return (
      <MarketplaceLayout activeNav="Admin" query="" onQueryChange={() => {}} onSearch={() => {}} onAction={() => {}}>
        <div className="flex h-full items-center justify-center p-6">
          <div className="max-w-md text-center space-y-4 bg-[#0a1020] p-8 rounded-2xl border border-rose-500/20">
            <ShieldAlert size={48} className="mx-auto text-rose-500 mb-4" />
            <h1 className="text-2xl font-bold text-white">Access Denied</h1>
            <p className="text-[#8990aa]">You need admin privileges to view this page.</p>
            <p className="text-xs text-[#6070a0]">Ask an existing admin to assign access from Supabase or the admin dashboard.</p>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout activeNav="Admin" query="" onQueryChange={() => {}} onSearch={() => {}} onAction={() => {}}>
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-[#8990aa]">Review submissions, moderate reports, manage users, and tune marketplace placement.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center h-9 px-3 gap-2 border border-[#1e2840] rounded-xl bg-[#080f1e]">
                <Search size={14} className="text-[#6070a0]" />
                <input
                  className="w-[190px] bg-transparent border-0 outline-none text-white text-[12px] placeholder:text-[#6070a0]"
                  placeholder="Search active prompts..."
                  value={adminQuery}
                  onChange={(event) => setAdminQuery(event.target.value)}
                />
              </div>
              <button onClick={loadAdminData} className="flex items-center gap-1.5 px-3 py-2 bg-[#1e2640] text-white rounded-lg hover:bg-[#2a3154] text-sm">
                <RefreshCw size={14} /> Refresh
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Prompts", value: metrics.prompts, icon: Flag, tone: "text-[#a46aff] bg-[#7b3cff]/15" },
              { label: "Active Prompts", value: metrics.activePrompts, icon: CheckCircle, tone: "text-emerald-400 bg-emerald-500/10" },
              { label: "Users", value: metrics.users, icon: Users, tone: "text-[#78c7ff] bg-[#78c7ff]/10" },
              { label: "Open Reports", value: metrics.openReports, icon: AlertTriangle, tone: "text-amber-300 bg-amber-400/10" },
            ].map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-[#1e2640] bg-[#080f1e] p-4">
                <span className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <strong className="block text-xl font-bold text-white">{value.toLocaleString()}</strong>
                  <span className="text-xs text-[#8990aa]">{label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Moderation Reports */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Moderation Reports <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{reports.length}</span>
            </h2>

            {reports.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No open reports.
              </div>
            ) : (
              <div className="grid gap-3">
                {reports.map((report) => (
                  <div key={report.id} className="flex flex-col gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.03] p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-white capitalize">{String(report.reason).replace(/_/g, " ")}</h3>
                      <p className="text-sm text-[#8990aa]">
                        {report.target_type} • {report.status} • {new Date(report.created_at).toLocaleDateString()}
                      </p>
                      {report.description && <p className="mt-1 text-sm text-[#c4c9e0]">{report.description}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => updateReport(report.id, "investigating")} className="px-3 py-1.5 rounded-lg border border-[#1e2640] text-[#c4c9e0] text-sm hover:text-white">
                        Investigate
                      </button>
                      <button onClick={() => updateReport(report.id, "resolved")} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600">
                        Resolve
                      </button>
                      <button onClick={() => updateReport(report.id, "dismissed")} className="px-3 py-1.5 rounded-lg border border-[#1e2640] text-[#8990aa] text-sm hover:text-white">
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              Active Prompts <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{visibleActivePrompts.length}</span>
            </h2>
            
            {fetching ? (
              <div className="p-8 text-center text-[#8990aa]">Loading...</div>
            ) : visibleActivePrompts.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No active prompts.
              </div>
            ) : (
              <div className="grid gap-4">
                {visibleActivePrompts.map((prompt) => (
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

          {/* Users */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              User Safety <span className="px-2 py-0.5 rounded-full bg-[#1e2640] text-xs">{usersList.length}</span>
            </h2>

            {usersList.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                No users available.
              </div>
            ) : (
              <div className="grid gap-3">
                {usersList.map((account) => (
                  <div key={account.id} className="flex flex-col gap-3 rounded-xl border border-[#1e2640] bg-[#080f1e] p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{account.display_name || account.email}</h3>
                      <p className="text-sm text-[#8990aa]">
                        {account.email} • {account.role} • joined {new Date(account.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleUserBan(account.id, !account.is_banned)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                        account.is_banned
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10"
                      }`}
                    >
                      <EyeOff size={14} /> {account.is_banned ? "Unban" : "Ban"}
                    </button>
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
