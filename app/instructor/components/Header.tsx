"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/app/lib/firebase";
import { getUserProfile } from "@/app/lib/db/user";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

export default function Header({
  onMenuClick,
}: AdminHeaderProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  
  // Profile state for header image & initials
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userInitials, setUserInitials] = useState("AD");

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1. Generate initials from display name (e.g., "Ajay Bhayadyo" -> "AB")
        if (user.displayName) {
          const parts = user.displayName.trim().split(" ");
          if (parts.length >= 2) {
            setUserInitials(`${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase());
          } else if (parts.length === 1 && parts[0]) {
            setUserInitials(parts[0].substring(0, 2).toUpperCase());
          }
        } else if (user.email) {
          setUserInitials(user.email.substring(0, 2).toUpperCase());
        }

        // 2. Load photoURL from Firestore profile or Auth fallback
        try {
          const userProfile = await getUserProfile(user.uid);
          if (userProfile?.photoURL) {
            setAvatarUrl(userProfile.photoURL);
          } else if (user.photoURL) {
            setAvatarUrl(user.photoURL);
          }
        } catch (error) {
          console.error("Failed to load header profile data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const breadcrumbMap: Record<string, string> = {
    instructor: "Instructors",
    courses: "Courses",
    messages: "Messages",
    students: "Students",
    profile: "My Profile",
    create: "Create",
  };

  const segments = pathname.split("/").filter(Boolean);

  const currentPage =
    pathname === "/instructor"
      ? "Dashboard"
      : pathname.endsWith("/new")
        ? `New ${
            breadcrumbMap[segments[segments.length - 2]]
              ?.replace(/s$/, "") ?? "item"
          }`
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
          <Link
            href="/instructor"
            className="hidden whitespace-nowrap text-slate-400 transition hover:text-purple-600 sm:inline"
          >
            Instructor
          </Link>

          <span className="hidden text-slate-300 sm:inline">/</span>

          <strong className="truncate font-semibold text-slate-800">
            {currentPage}
          </strong>
        </div>
      </div>

      {/* Right: search, notifications, profile */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Search */}
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

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />

          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        {/* Profile navigation with dynamic image or initials */}
        <Link
          href="/instructor/profile"
          aria-label="Open profile settings"
          title="My Profile"
          className="group relative flex size-10 shrink-0 overflow-hidden items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 ring-1 ring-purple-200 transition hover:ring-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{userInitials}</span>
          )}
        </Link>
      </div>
    </header>
  );
}