"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Activity,
  ArrowUpDown,
  ArrowUpRight,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Ellipsis,
  GraduationCap,
  Mail,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Star,
  Users,
  X,
  Loader2,
} from "lucide-react";
import { getAllUsers, saveUserProfile } from "@/app/lib/db/user";

type InstructorStatus = "Active" | "Inactive" | "Suspended";

type Instructor = {
  id: string; // Firebase UID
  name: string;
  email: string;
  initials: string;
  specialization: string;
  courses: number;
  students: number;
  rating: number;
  status: InstructorStatus;
  experience: number;
  joined: string;
  location: string;
  learningHours: number;
  bio: string;
  courseNames: string[];
};

const tabs = ["All instructors", "Active", "Inactive", "Suspended"];

const ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@newanext.com",
  "owner@newanext.com",
];

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98]",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

function StatCard({
  label,
  value,
  note,
  change,
  icon,
  color,
}: {
  label: string;
  value: string;
  note: string;
  change?: string;
  icon: React.ReactNode;
  color: "violet" | "emerald" | "blue" | "amber";
}) {
  const colors = {
    violet: "bg-violet-50 text-violet-600 ring-violet-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${colors[color]}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">{note}</span>
        {change && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight size={13} />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function Status({ status }: { status: InstructorStatus }) {
  const styles: Record<InstructorStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-500/15",
    Suspended: "bg-rose-50 text-rose-700 ring-rose-600/15",
  };

  const dots: Record<InstructorStatus, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    Suspended: "bg-rose-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All instructors");
  const [page, setPage] = useState(1);
  const [detailOpen, setDetailOpen] = useState(false);

  const [currentUserEmail] = useState(ADMIN_EMAILS[0]);
  const isAdminOrEnv = ADMIN_EMAILS.includes(currentUserEmail.toLowerCase());

  const pageSize = 5;

  useEffect(() => {
    fetchInstructors();
  }, []);

  async function fetchInstructors() {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();

      const instructorUsers = allUsers.filter((user: any) => {
        const userRole = (user.role || user.roleId || "").toLowerCase();
        return userRole === "instructor";
      });

      const mappedInstructors: Instructor[] = instructorUsers.map((user) => {
        const name = user.name || "Unnamed Instructor";
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return {
          id: user.uid,
          name,
          email: user.email || "No email",
          initials: initials || "IN",
          specialization:
            (user as any).specialization || "Full-Stack Development",
          courses: (user as any).courses ?? 2,
          students: (user as any).students ?? 120,
          rating: (user as any).rating ?? 4.8,
          status: (user as any).status ?? "Active",
          experience: (user as any).experience ?? 5,
          joined: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Recently",
          location: (user as any).location ?? "Kathmandu",
          learningHours: (user as any).learningHours ?? 320,
          bio:
            (user as any).bio || "Experienced educator teaching modern tech.",
          courseNames: (user as any).courseNames || [
            "Full-Stack Web Development",
            "React & Next.js",
          ],
        };
      });

      setInstructors(mappedInstructors);
    } catch (error) {
      console.error("Failed to fetch instructors:", error);
      Toast.fire({ icon: "error", title: "Failed to load instructors." });
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      instructors.filter((instructor) => {
        const search = query.trim().toLowerCase();

        const matchesSearch = [
          instructor.name,
          instructor.email,
          instructor.specialization,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);

        const matchesStatus =
          tab === "All instructors" || instructor.status === tab;

        return matchesSearch && matchesStatus;
      }),
    [instructors, query, tab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageInstructors = filtered.slice(startIndex, startIndex + pageSize);

  const selected = instructors.find((item) => item.id === selectedId) ?? null;

  const activeCount = instructors.filter(
    (item) => item.status === "Active",
  ).length;

  const totalStudents = instructors.reduce(
    (sum, item) => sum + item.students,
    0,
  );

  const averageRating = instructors.length
    ? instructors.reduce((sum, item) => sum + item.rating, 0) /
      instructors.length
    : 0;

  function changeTab(value: string) {
    setTab(value);
    setPage(1);
  }

  function changeSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function exportCSV() {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Specialization",
      "Courses",
      "Students",
      "Rating",
      "Experience",
      "Status",
      "Joined",
      "Location",
    ];

    const rows = filtered.map((item) => [
      item.id,
      item.name,
      item.email,
      item.specialization,
      item.courses,
      item.students,
      item.rating,
      item.experience,
      item.status,
      item.joined,
      item.location,
    ]);

    const escapeCSV = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "instructors.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function toggleStatus(instructor: Instructor) {
    if (!isAdminOrEnv) {
      Toast.fire({
        icon: "error",
        title: "Permission denied: Only admin/env emails can change status.",
      });
      return;
    }

    const newStatus: InstructorStatus =
      instructor.status === "Suspended" ? "Active" : "Suspended";

    try {
      await saveUserProfile(instructor.id, { status: newStatus } as any);
      setInstructors((current) =>
        current.map((item) =>
          item.id === instructor.id ? { ...item, status: newStatus } : item,
        ),
      );
      Toast.fire({
        icon: "success",
        title: `Instructor status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      Toast.fire({ icon: "error", title: "Failed to update status." });
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center bg-slate-50/50">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-7 bg-slate-50/50 pb-8">
      {/* Page heading */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-indigo-600">Instructors</span>
            <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
              Role: {isAdminOrEnv ? "Admin (Full Access)" : "Restricted"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 sm:flex">
              <GraduationCap size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Instructors
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage teaching staff, assigned courses, and instructor
                performance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportCSV}>
            <Download size={16} />
            Export CSV
          </Button>
          <Link
            href="/admin/instructors/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus size={17} />
            Add instructor
          </Link>
        </div>
      </header>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total instructors"
          value={instructors.length.toLocaleString()}
          note="Registered teaching staff"
          icon={<Users size={21} />}
          color="violet"
        />
        <StatCard
          label="Active instructors"
          value={activeCount.toLocaleString()}
          note="Currently teaching"
          change="+8.2%"
          icon={<Activity size={21} />}
          color="emerald"
        />
        <StatCard
          label="Total students"
          value={totalStudents.toLocaleString()}
          note="Across instructor assignments"
          icon={<BookOpen size={21} />}
          color="blue"
        />
        <StatCard
          label="Average rating"
          value={`${averageRating.toFixed(1)}/5`}
          note="Instructor ratings"
          icon={<Star size={21} />}
          color="amber"
        />
      </section>

      {/* Table and profile grid */}
      <section
        className={`grid grid-cols-1 items-start gap-6 ${
          detailOpen ? "2xl:grid-cols-[minmax(0,1fr)_370px]" : "2xl:grid-cols-1"
        }`}
      >
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="font-bold text-slate-900">All teaching staff</h2>
                <p className="mt-1 text-xs text-slate-500">
                  View and manage instructor accounts from Firestore
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 sm:min-w-56">
                  <Search size={16} className="shrink-0 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search instructors..."
                    value={query}
                    onChange={(event) => changeSearch(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => changeSearch("")}
                      aria-label="Clear search"
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>

                <button
                  type="button"
                  onClick={() =>
                    Toast.fire({ icon: "info", title: "Filters active." })
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  <SlidersHorizontal size={15} />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>

            <div className="mt-5 flex gap-1 overflow-x-auto border-b border-slate-100">
              {tabs.map((item) => {
                const count =
                  item === "All instructors"
                    ? instructors.length
                    : instructors.filter(
                        (instructor) => instructor.status === item,
                      ).length;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => changeTab(item)}
                    className={`relative flex shrink-0 items-center gap-2 px-3 pb-3 pt-1 text-sm font-medium transition ${
                      tab === item
                        ? "text-indigo-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {item}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        tab === item
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                    {tab === item && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      Instructor <ArrowUpDown size={11} />
                    </span>
                  </th>
                  <th className="px-4 py-4">Courses</th>
                  <th className="px-4 py-4">Students</th>
                  <th className="px-4 py-4">Rating</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pageInstructors.map((instructor) => (
                  <tr
                    key={instructor.id}
                    onClick={() => {
                      setSelectedId(instructor.id);
                      setDetailOpen(true);
                    }}
                    className={`cursor-pointer transition ${
                      selected?.id === instructor.id && detailOpen
                        ? "bg-indigo-50/60"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ring-1 ring-inset ${
                            selected?.id === instructor.id && detailOpen
                              ? "bg-indigo-100 text-indigo-700 ring-indigo-200"
                              : "bg-slate-100 text-slate-600 ring-slate-200/70"
                          }`}
                        >
                          {instructor.initials}
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate text-sm font-semibold text-slate-800">
                            {instructor.name}
                          </strong>
                          <span className="mt-1 block max-w-52 truncate text-xs text-slate-400">
                            {instructor.specialization}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        <BookOpen size={14} className="text-slate-400" />
                        {instructor.courses}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        <Users size={14} className="text-slate-400" />
                        {instructor.students}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        {instructor.rating.toFixed(1)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <Status status={instructor.status} />
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        aria-label={`View ${instructor.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedId(instructor.id);
                          setDetailOpen(true);
                        }}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Ellipsis size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {pageInstructors.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={21} />
                      </div>
                      <p className="font-semibold text-slate-800">
                        No instructors found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another name, specialization, or status.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          changeSearch("");
                          changeTab("All instructors");
                        }}
                        className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                      >
                        Clear all filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filtered.length === 0 ? 0 : startIndex + 1}–
                {Math.min(startIndex + pageSize, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filtered.length}
              </span>{" "}
              instructors
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={14} />
                Previous
              </button>
              <span className="min-w-12 text-center text-xs font-medium text-slate-500">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Instructor profile drawer */}
        {selected && detailOpen ? (
          <aside className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm 2xl:sticky 2xl:top-6">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500">
              <div className="absolute -right-5 -top-12 h-36 w-36 rounded-full border-[22px] border-white/10" />
              <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/10 blur-xl" />

              <div className="relative flex items-start justify-between p-4">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  Instructor profile
                </span>
                <button
                  type="button"
                  aria-label="Close instructor details"
                  onClick={() => setDetailOpen(false)}
                  className="rounded-lg bg-white/15 p-2 text-white transition hover:bg-white/25"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="absolute -bottom-7 left-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border-4 border-white bg-indigo-50 text-xl font-bold text-indigo-700 shadow-sm">
                {selected.initials}
              </div>
            </div>

            <div className="p-5 pt-11">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold tracking-tight text-slate-900">
                    {selected.name}
                  </h2>
                  <p className="mt-1 break-all text-xs text-slate-500">
                    {selected.email}
                  </p>
                </div>
                <Status status={selected.status} />
              </div>

              <p className="mt-3 text-sm font-semibold text-indigo-600">
                {selected.specialization}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {selected.bio}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} className="text-slate-400" />
                  {selected.joined}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {selected.location}
                </span>
              </div>

              {/* Instructor metrics */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/70 py-4">
                <div className="px-1 text-center">
                  <BookOpen
                    className="mx-auto mb-2 text-indigo-500"
                    size={17}
                  />
                  <b className="block text-lg font-bold text-slate-900">
                    {selected.courses}
                  </b>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    Courses
                  </span>
                </div>
                <div className="px-1 text-center">
                  <Users className="mx-auto mb-2 text-blue-500" size={17} />
                  <b className="block text-lg font-bold text-slate-900">
                    {selected.students}
                  </b>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    Students
                  </span>
                </div>
                <div className="px-1 text-center">
                  <Clock3 className="mx-auto mb-2 text-emerald-500" size={17} />
                  <b className="block text-lg font-bold text-slate-900">
                    {selected.learningHours}h
                  </b>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    Teaching
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500">
                  Teaching experience
                </p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {selected.experience} years
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-xs text-slate-500">Student rating</span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-slate-800">
                    <Star size={15} className="fill-amber-400 text-amber-400" />
                    {selected.rating.toFixed(1)}
                    <span className="text-xs font-normal text-slate-400">
                      / 5
                    </span>
                  </span>
                </div>
              </div>

              {/* Assigned courses */}
              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Assigned courses
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Courses taught by this instructor
                    </p>
                  </div>
                  <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
                    {selected.courseNames.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {selected.courseNames.map((course) => (
                    <div key={course} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <BookOpen size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold leading-5 text-slate-700">
                          {course}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Instructor assignment
                        </p>
                      </div>
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-emerald-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleStatus(selected)}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  selected.status === "Suspended"
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50"
                    : "border-rose-200 bg-rose-50/40 text-rose-600 hover:bg-rose-50"
                }`}
              >
                <ShieldAlert size={16} />
                {selected.status === "Suspended"
                  ? "Reactivate instructor"
                  : "Suspend instructor"}
              </button>

              <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                Firestore database synchronization enabled for Admin.
              </p>
            </div>
          </aside>
        ) : null}
      </section>
    </div>
  );
}
