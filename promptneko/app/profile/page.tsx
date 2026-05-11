"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { supabase } from "../../lib/supabase";
import { MarketplaceLayout } from "../components/MarketplaceLayout";
import { CheckCircle, Clock, XCircle, LayoutDashboard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  
  const [prompts, setPrompts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadProfileData() {
      if (!user) return;
      
      const { data } = await (supabase as any)
        .from("prompts")
        .select("id, title, status, created_at, price_cents, pricing_type")
        .eq("creator_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setPrompts(data);
      setFetching(false);
    }
    
    if (user) loadProfileData();
  }, [user]);

  if (loading || (!user && fetching)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060913] text-white">
        <Loader2 className="animate-spin text-[#7b3cff]" size={32} />
      </div>
    );
  }

  if (!dbUser) return null;

  return (
    <MarketplaceLayout
      activeNav="profile"
      query=""
      onQueryChange={() => {}}
      onSearch={() => {}}
      onAction={() => {}}
    >
      <div className="flex-1 overflow-auto p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#0a1020] to-[#070b16] border border-[#1e2640] shadow-xl">
            <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-[#8751ff] to-[#f044a8] flex items-center justify-center text-white text-3xl font-bold ring-4 ring-[#1e2640]">
              {dbUser.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={dbUser.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                dbUser.display_name[0]?.toUpperCase() || "U"
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">{dbUser.display_name}</h1>
              <p className="text-[#8990aa]">{dbUser.email}</p>
              
              <div className="flex items-center gap-3 mt-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  dbUser.role === "creator" ? "bg-[#7b3cff]/20 text-[#a46aff] border border-[#7b3cff]/30" : "bg-[#1e2640] text-[#8990aa]"
                }`}>
                  {dbUser.role}
                </span>
                {dbUser.role === "creator" && (
                  <span className={`flex items-center gap-1.5 text-xs font-semibold ${
                    dbUser.is_creator_approved ? "text-emerald-400" : "text-amber-400"
                  }`}>
                    {dbUser.is_creator_approved ? <CheckCircle size={14} /> : <Clock size={14} />}
                    {dbUser.is_creator_approved ? "Approved Creator" : "Pending Approval"}
                  </span>
                )}
              </div>
            </div>
            {dbUser.role === "admin" && (
              <button 
                onClick={() => router.push("/admin")}
                className="flex items-center gap-2 px-4 py-2 bg-[#1e2640] hover:bg-[#2a3154] text-white rounded-lg transition-colors text-sm font-semibold"
              >
                <LayoutDashboard size={16} /> Admin Panel
              </button>
            )}
          </div>

          {/* Prompts Section */}
          {dbUser.role === "creator" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Your Prompts</h2>
              
              {fetching ? (
                <div className="p-8 text-center text-[#8990aa]">Loading prompts...</div>
              ) : prompts.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-[#1e2640] rounded-xl text-[#8990aa] bg-[#0a1020]">
                  <p>You haven't created any prompts yet.</p>
                  <button 
                    onClick={() => router.push("/create")}
                    className="mt-4 px-4 py-2 bg-[#7b3cff] text-white rounded-lg text-sm font-medium hover:bg-[#6530e9] transition-colors"
                  >
                    Create your first prompt
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {prompts.map((prompt) => (
                    <div key={prompt.id} className="p-5 border border-[#1e2640] rounded-xl bg-[#080f1e] hover:border-[#2a3154] transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white truncate pr-4">{prompt.title}</h3>
                        <StatusBadge status={prompt.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-[#8990aa]">
                        <span>{prompt.pricing_type === 'free' ? 'Free' : `$${(prompt.price_cents / 100).toFixed(2)}`}</span>
                        <span>•</span>
                        <span>{new Date(prompt.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </MarketplaceLayout>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'published':
      return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle size={12} /> Published</span>;
    case 'pending_review':
      return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={12} /> Pending</span>;
    case 'rejected':
      return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><XCircle size={12} /> Rejected</span>;
    default:
      return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-[#1e2640] text-[#8990aa]">{status}</span>;
  }
}
