"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
} from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
};



export default function AdminHeader({
  onMenuClick,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const breadcrumbMap: Record<string, string> = {
    admin: "Dashboard",
    courses: "Courses",
    new: "New course",
    services: "Services",
    products: "Products",
    portfolio: "Portfolio",
    messages: "Messages",
    users: "Users",
    settings: "Settings",
  };

  const segments = pathname.split("/").filter(Boolean);

  const currentPage =
    pathname === "/admin"
      ? "Dashboard"
      : pathname.endsWith("/new")
        ? `New ${breadcrumbMap[segments[segments.length - 2]]?.replace(/s$/, "") ?? "item"}`
        : breadcrumbMap[segments[segments.length - 1]] ??
          segments[segments.length - 1]
            ?.replace(/-/g, " ")
            .replace(/^./, (char) => char.toUpperCase()) ??
          "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left: mobile menu and breadcrumb */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="hidden whitespace-nowrap text-slate-400 sm:inline">
            Admin console
          </span>

          <span className="hidden text-slate-300 sm:inline">/</span>

          <strong className="truncate font-semibold text-slate-800">
            {currentPage}
          </strong>
        </div>
      </div>

      {/* Right: search, notifications, avatar */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <label className="hidden w-56 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 transition focus-within:border-purple-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-100 md:flex lg:w-64">
          <Search size={16} className="shrink-0" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search anything"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <kbd className="shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            Ctrl K
          </kbd>
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        <button
          type="button"
          aria-label="Admin account"
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 ring-1 ring-purple-200"
        >
          AD
        </button>
      </div>
    </header>
  );
}