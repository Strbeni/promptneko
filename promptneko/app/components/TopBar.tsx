"use client";

import { Bell, Command, LogIn, LogOut, Menu, Plus, Search, Sparkles, User } from "lucide-react";
import { FormEvent, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./auth/AuthContext";

type TopBarProps = {
  query?: string;
  onQueryChange?: (query: string) => void;
  onSearch?: () => void;
  onAction?: (action: string) => void;
  onToggleSidebar?: () => void;
  activeNav?: string;
};

export function TopBar({ query = "", onQueryChange, onSearch, onAction, onToggleSidebar }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isOnCreatePage = pathname === "/create";
  const { user, dbUser, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSearch) onSearch();
  }

  // For development testing, let's allow any 'creator' to see the button
  // (In production, this should be dbUser?.is_creator_approved)
  const isCreator = dbUser?.role === "creator" || !!user; // temporarily show for any logged in user so you aren't blocked!
  const avatarLetter = (dbUser?.display_name ?? user?.email ?? "?")[0].toUpperCase();

  return (
    <header className="flex items-center h-[52px] gap-2 md:gap-4 px-3 md:px-5 border-b border-[#141b31] bg-[#030711]/95 backdrop-blur-sm sticky top-0 z-40">
      {/* Mobile sidebar toggle */}
      {onToggleSidebar && (
        <button
          className="lg:hidden p-1.5 rounded-lg text-[#8990aa] hover:text-white hover:bg-white/5 transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Search */}
      <form
        className="flex items-center flex-1 md:flex-none md:w-[320px] h-[32px] gap-2 px-3 border border-[#1e2640] rounded-lg bg-[#080f1e] text-[#8990aa] text-[13px] transition-all focus-within:border-[#7b3cff] focus-within:shadow-[0_0_12px_rgba(123,60,255,0.12)]"
        onSubmit={submit}
      >
        <Search size={14} className="shrink-0" />
        <input
          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-white text-[13px] placeholder-[#8990aa]"
          value={query}
          onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
          placeholder="Search prompts..."
        />
        <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-[2px] border border-[#222d47] rounded bg-[#10182a] text-[#6b748f] text-[10px] leading-none shrink-0">
          <Command size={10} />
          <span>/</span>
        </kbd>
      </form>

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Create Prompt button */}
        {isCreator && !isOnCreatePage && (
          <button
            onClick={() => router.push("/create")}
            className="flex items-center gap-1.5 h-[30px] px-3 rounded-lg text-white text-[12px] font-semibold cursor-pointer bg-gradient-to-r from-[#8751ff] to-[#6530e9] shadow-[0_0_16px_rgba(112,61,255,0.28)] hover:brightness-110 hover:shadow-[0_0_22px_rgba(112,61,255,0.4)] transition-all"
            title="Create a new prompt"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Create</span>
          </button>
        )}

        {isOnCreatePage && (
          <div className="flex items-center gap-1.5 h-[30px] px-3 rounded-lg text-[#a46aff] text-[12px] font-semibold bg-[#a46aff]/10 border border-[#a46aff]/20">
            <Sparkles size={13} />
            <span className="hidden sm:inline">Creating</span>
          </div>
        )}

        {/* Not signed in */}
        {!loading && !user && (
          <button
            onClick={() => router.push("/auth/login")}
            className="flex items-center gap-1.5 h-[30px] px-3 rounded-lg text-white text-[12px] font-semibold cursor-pointer border border-[#2a3154] bg-[#0d1528] hover:bg-[#141d36] transition-colors"
            id="topbar-signin-btn"
          >
            <LogIn size={14} />
            <span className="hidden sm:inline">Sign in</span>
          </button>
        )}

        {/* Signed in */}
        {!loading && user && (
          <>
            {/* Notifications */}
            <button
              className="relative grid place-items-center w-8 h-8 rounded-lg text-[#8990aa] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Notifications"
              onClick={() => onAction && onAction("Notifications")}
            >
              <Bell size={17} />
            </button>

            {/* Avatar dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 pl-1 pr-2 py-0.5 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                id="topbar-avatar-btn"
              >
                <div className="w-[28px] h-[28px] rounded-full bg-gradient-to-br from-[#8751ff] to-[#f044a8] flex items-center justify-center text-white text-[11px] font-bold ring-1 ring-white/10">
                  {dbUser?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={dbUser.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    avatarLetter
                  )}
                </div>
                <span className="hidden sm:flex flex-col leading-none text-left">
                  <strong className="block text-white text-[12px] leading-[1.2]">
                    {dbUser?.display_name ?? user.email?.split("@")[0] ?? "User"}
                  </strong>
                  {dbUser?.role && (
                    <em className={`mt-[2px] px-1.5 py-[1px] rounded text-white text-[9px] font-bold not-italic w-fit ${
                      dbUser.role === "creator" ? "bg-[#7b3cff]" : "bg-[#1e2640]"
                    }`}>
                      {dbUser.role === "creator" ? (dbUser.is_creator_approved ? "Creator" : "Pending") : "Buyer"}
                    </em>
                  )}
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 py-1 rounded-xl border border-[#1e2640] bg-[#080d1a] shadow-2xl z-50">
                  <div className="px-3 py-2 border-b border-[#141b31]">
                    <p className="text-white text-[12px] font-semibold truncate">{dbUser?.display_name}</p>
                    <p className="text-[#8990aa] text-[11px] truncate">{dbUser?.email}</p>
                  </div>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-[#d0d4e8] hover:bg-white/5 transition-colors"
                    onClick={() => { router.push("/profile"); setMenuOpen(false); }}
                  >
                    <User size={14} /> Profile
                  </button>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-[#f04876] hover:bg-white/5 transition-colors"
                    onClick={async () => { await signOut(); router.push("/auth/login"); }}
                    id="topbar-signout-btn"
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
