"use client";

import { type ReactNode } from "react";

import StudentGuard from "./StudentGuard";

export default function InstructorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <StudentGuard>
      <div className="min-h-screen bg-slate-100">
        <main className="px-4 py-6 pt-20 lg:px-8 lg:pt-6 bg-slate-100">{children}</main>
      </div>
    </StudentGuard>
  );
}
