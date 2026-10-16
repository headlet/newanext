"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Package,
  GraduationCap,
  MessageSquare,
  Settings,
  Menu,
  X,
  Globe,
  ChevronLeft,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const NAVIGATION = [
  {
    title: "MAIN",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      { name: "Services", href: "/admin/services", icon: BriefcaseBusiness },
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Portfolio", href: "/admin/portfolio", icon: Globe },
      { name: "Courses", href: "/admin/courses", icon: GraduationCap },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      { name: "Messages", href: "/admin/messages", icon: MessageSquare },
      { name: "Users", href: "/admin/users", icon: Users },
    ],
  },
  {
    title: "SYSTEM",
    items: [{ name: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Link
          href="/admin"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="NewaNext"
            width={32}
            height={32}
            className="size-8 shrink-0 object-contain"
          />

          <span className="text-lg font-extrabold text-slate-900">
            Newa<span className="text-purple-600">Next</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={mobileOpen}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-72"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand and collapse button */}
        <div
          className={`relative flex h-20 shrink-0 items-center border-b border-slate-100 ${
            collapsed ? "justify-center px-0" : "justify-start px-5"
          }`}
        >
          <Link
            href="/admin"
            className={`flex shrink-0 items-center ${
              collapsed ? "justify-center" : "gap-3"
            }`}
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "NewaNext Admin Panel" : undefined}
          >
            <Image
              src="/logo.png"
              alt="NewaNext Logo"
              width={40}
              height={40}
              className="size-10 shrink-0 object-contain"
            />

            {!collapsed && (
              <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-900">
                Newa<span className="text-purple-600">Next</span>
                <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Admin Panel
                </span>
              </span>
            )}
          </Link>

          {/* Hanging collapse / expand button */}
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-1/2 z-[60] hidden -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 shadow-md transition-colors hover:bg-purple-50 hover:text-purple-700 lg:flex"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto overflow-x-hidden px-3 py-6">
          {NAVIGATION.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <h2 className="mb-3 whitespace-nowrap px-3 text-[10px] font-bold tracking-[0.15em] text-slate-400">
                  {group.title}
                </h2>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.name : undefined}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-purple-50 text-purple-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <Icon
                        size={19}
                        strokeWidth={active ? 2.3 : 1.8}
                        className={`shrink-0 ${
                          active
                            ? "text-purple-600"
                            : "text-slate-400 group-hover:text-slate-700"
                        }`}
                      />

                      {!collapsed && (
                        <span className="whitespace-nowrap">{item.name}</span>
                      )}

                      {active && !collapsed && (
                        <span className="ml-auto size-2 shrink-0 rounded-full bg-purple-600" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-slate-100 p-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? "View website" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-purple-700 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Globe size={19} className="shrink-0" />
            {!collapsed && <span>View Website</span>}
          </Link>

          <button
            type="button"
            onClick={() => {
              // Connect your actual authentication logout action here.
            }}
            title={collapsed ? "Logout" : undefined}
            className={`mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={19} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
