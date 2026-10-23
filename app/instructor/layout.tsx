
"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import InstructorGuard from "./InstructorGuard";

export default function InstructorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <InstructorGuard>
      <div className="min-h-screen bg-slate-50">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          open={open}
          setOpen={setOpen}
        />

        <div
          className={`min-h-screen transition-[margin] duration-300 ease-in-out ${
            collapsed ? "lg:ml-20" : "lg:ml-72"
          }`}
        >
          <Header onMenuClick={() => setOpen(true)} />

          <main className="px-4 py-6 pt-20 lg:px-8 lg:pt-6">
            {children}
          </main>
        </div>
      </div>
    </InstructorGuard>
  );
}