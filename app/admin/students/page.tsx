"use client";

import { useMemo, useState } from "react";
import {
  Download,
  Plus,
  Search,
  Mail,
  KeyRound,
  MoreHorizontal,
  ArrowUpRight,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  UserRound,
  ShieldAlert,
  GraduationCap,
  Clock3,
  MapPin,
  CalendarDays,
  Ellipsis,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle2,
  Activity,
} from "lucide-react";

type StudentStatus = "Active" | "Inactive" | "Suspended";

type Student = {
  id: number;
  name: string;
  email: string;
  initials: string;
  courses: number;
  progress: number;
  status: StudentStatus;
  certificates: number;
  learningHours: number;
  joined: string;
  location: string;
};

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    initials: "AS",
    courses: 4,
    progress: 76,
    status: "Active",
    certificates: 2,
    learningHours: 86,
    joined: "12 Mar 2026",
    location: "Kathmandu",
  },
  {
    id: 2,
    name: "Sita Thapa",
    email: "sita@example.com",
    initials: "ST",
    courses: 3,
    progress: 92,
    status: "Active",
    certificates: 3,
    learningHours: 112,
    joined: "18 Mar 2026",
    location: "Bhaktapur",
  },
  {
    id: 3,
    name: "Rohan Karki",
    email: "rohan@example.com",
    initials: "RK",
    courses: 2,
    progress: 38,
    status: "Inactive",
    certificates: 0,
    learningHours: 24,
    joined: "02 Apr 2026",
    location: "Lalitpur",
  },
  {
    id: 4,
    name: "Nisha Gurung",
    email: "nisha@example.com",
    initials: "NG",
    courses: 1,
    progress: 15,
    status: "Suspended",
    certificates: 0,
    learningHours: 8,
    joined: "11 Apr 2026",
    location: "Pokhara",
  },
  {
    id: 5,
    name: "Prabin Shrestha",
    email: "prabin@example.com",
    initials: "PS",
    courses: 3,
    progress: 64,
    status: "Active",
    certificates: 1,
    learningHours: 57,
    joined: "22 Apr 2026",
    location: "Kathmandu",
  },
  {
    id: 6,
    name: "Anisha Rai",
    email: "anisha@example.com",
    initials: "AR",
    courses: 2,
    progress: 47,
    status: "Inactive",
    certificates: 1,
    learningHours: 31,
    joined: "06 May 2026",
    location: "Dharan",
  },
  {
    id: 7,
    name: "Bikash Tamang",
    email: "bikash@example.com",
    initials: "BT",
    courses: 4,
    progress: 88,
    status: "Active",
    certificates: 2,
    learningHours: 104,
    joined: "14 May 2026",
    location: "Chitwan",
  },
  {
    id: 8,
    name: "Samiksha KC",
    email: "samiksha@example.com",
    initials: "SK",
    courses: 2,
    progress: 21,
    status: "Active",
    certificates: 0,
    learningHours: 16,
    joined: "28 May 2026",
    location: "Kathmandu",
  },
];

const courses = [
  "Full-Stack Web with React & Node",
  "Python for Data Analysis",
  "Cloud Fundamentals on AWS",
  "UI/UX Design Basics",
];

const tabs = ["All students", "Active", "Inactive", "Suspended"];

function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 ${
        variant === "primary"
          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]"
          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
      }`}
    >
      {children}
    </button>
  );
}

function StatCard({
  label,
  value,
  change,
  icon,
  iconClass,
  note,
}: {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  iconClass: string;
  note: string;
}) {
  const styles: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600 ring-violet-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${styles[iconClass]}`}
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

function Status({ status }: { status: StudentStatus }) {
  const styles: Record<StudentStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-500/15",
    Suspended: "bg-rose-50 text-rose-700 ring-rose-600/15",
  };

  const dotStyles: Record<StudentStatus, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    Suspended: "bg-rose-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Course progress ${value}%`}
      >
        <div
          className={`h-full rounded-full transition-all ${
            value === 100 ? "bg-emerald-500" : "bg-indigo-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="min-w-8 text-xs font-semibold tabular-nums text-slate-600">
        {value}%
      </span>
    </div>
  );
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedId, setSelectedId] = useState<number>(initialStudents[0].id);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All students");
  const [page, setPage] = useState(1);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const pageSize = 5;

  const filtered = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch = `${student.name} ${student.email}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

        const matchesStatus = tab === "All students" || student.status === tab;

        return matchesSearch && matchesStatus;
      }),
    [students, query, tab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageStudents = filtered.slice(startIndex, startIndex + pageSize);

  const selected =
    filtered.find((student) => student.id === selectedId) ??
    pageStudents[0] ??
    filtered[0] ??
    null;

  const activeCount = students.filter((s) => s.status === "Active").length;
  const certificateCount = students.reduce(
    (total, student) => total + student.certificates,
    0,
  );

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
      "Courses",
      "Average Progress",
      "Status",
      "Certificates",
      "Learning Hours",
      "Joined",
      "Location",
    ];

    const rows = filtered.map((student) => [
      student.id,
      student.name,
      student.email,
      student.courses,
      student.progress,
      student.status,
      student.certificates,
      student.learningHours,
      student.joined,
      student.location,
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
    link.download = "students.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function toggleSuspension(student: Student) {
    const suspend = student.status !== "Suspended";

    if (
      !window.confirm(
        `${suspend ? "Suspend" : "Reactivate"} ${student.name}'s account?`,
      )
    ) {
      return;
    }

    setStudents((current) =>
      current.map((item) =>
        item.id === student.id
          ? { ...item, status: suspend ? "Suspended" : "Active" }
          : item,
      ),
    );

    setTab("All students");
    window.alert(
      `${student.name}'s status was updated in this demo. Connect this action to your API for persistent changes.`,
    );
  }

  function inviteStudent() {
    const email = window.prompt("Enter the student's email address:");

    if (!email?.trim()) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      window.alert("Please enter a valid email address.");
      return;
    }

    window.alert(
      `Invitation to ${email.trim()} is a demo action. Connect it to your invitation API.`,
    );
  }

  function resetPassword(student: Student) {
    window.alert(
      `Connect this action to your secure password-reset workflow for ${student.email}.`,
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
            <span className="text-indigo-600">Students</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 sm:flex">
              <GraduationCap size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Students
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage learners, track progress, and support student success.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportCSV}>
            <Download size={16} />
            Export CSV
          </Button>
          <Button onClick={inviteStudent}>
            <Plus size={17} />
            Invite student
          </Button>
        </div>
      </header>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total students"
          value={students.length.toLocaleString()}
          icon={<Users size={21} />}
          iconClass="violet"
          note="Across all enrollments"
        />
        <StatCard
          label="Active students"
          value={activeCount.toLocaleString()}
          icon={<Activity size={21} />}
          iconClass="emerald"
          note="Currently active"
          change="+8.2%"
        />
        <StatCard
          label="New this month"
          value="312"
          icon={<ArrowUpRight size={21} />}
          iconClass="blue"
          note="Compared with last month"
          change="+12.4%"
        />
        <StatCard
          label="Certificates issued"
          value={certificateCount.toLocaleString()}
          icon={<Award size={21} />}
          iconClass="amber"
          note="Across all learners"
        />
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_370px]">
        {/* Student table */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="font-bold text-slate-900">All learners</h2>
                <p className="mt-1 text-xs text-slate-500">
                  View and manage your student accounts
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 sm:min-w-56">
                  <Search size={16} className="shrink-0 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search learners..."
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
                    window.alert("Additional table filters can be added here.")
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
                  item === "All students"
                    ? students.length
                    : students.filter((student) => student.status === item)
                        .length;

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
            <table className="w-full min-w-[690px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      Student <ArrowUpDown size={11} />
                    </span>
                  </th>
                  <th className="px-4 py-4">Courses</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pageStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => {
                      setSelectedId(student.id);
                      setMobileDetailOpen(true);
                    }}
                    className={`cursor-pointer transition ${
                      selected?.id === student.id
                        ? "bg-indigo-50/60"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ring-1 ring-inset ${
                            selected?.id === student.id
                              ? "bg-indigo-100 text-indigo-700 ring-indigo-200"
                              : "bg-slate-100 text-slate-600 ring-slate-200/70"
                          }`}
                        >
                          {student.initials}
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate text-sm font-semibold text-slate-800">
                            {student.name}
                          </strong>
                          <span className="mt-1 block truncate text-xs text-slate-400">
                            {student.email}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        <BookOpen size={14} className="text-slate-400" />
                        {student.courses}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <ProgressBar value={student.progress} />
                    </td>

                    <td className="px-4 py-4">
                      <Status status={student.status} />
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        aria-label={`View ${student.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedId(student.id);
                          setMobileDetailOpen(true);
                        }}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Ellipsis size={18} />
                      </button>
                    </td>
                  </tr>
                ))}

                {pageStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Search size={21} />
                      </div>
                      <p className="font-semibold text-slate-800">
                        No students found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or status filter.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          changeSearch("");
                          changeTab("All students");
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
              students
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

        {/* Student profile */}
        {selected ? (
          <aside
            className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ${
              mobileDetailOpen ? "block" : "hidden"
            } 2xl:sticky 2xl:top-6 2xl:block`}
          >
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500">
              <div className="absolute -right-5 -top-12 h-36 w-36 rounded-full border-[22px] border-white/10" />
              <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-white/10 blur-xl" />

              <div className="relative flex items-start justify-between p-4">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  Student profile
                </span>
                <button
                  type="button"
                  aria-label="Close student details"
                  onClick={() => setMobileDetailOpen(false)}
                  className="rounded-lg bg-white/15 p-2 text-white transition hover:bg-white/25 2xl:hidden"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                type="button"
                aria-label="More student options"
                onClick={() =>
                  window.alert("Additional student actions can be added here.")
                }
                className="absolute bottom-3 right-3 rounded-lg bg-white/15 p-2 text-white transition hover:bg-white/25"
              >
                <MoreHorizontal size={18} />
              </button>

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

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.alert(
                      `Connect messaging to your API for ${selected.name}.`,
                    )
                  }
                >
                  <Mail size={15} />
                  Message
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => resetPassword(selected)}
                >
                  <KeyRound size={15} />
                  Reset password
                </Button>
              </div>

              {/* Learning metrics */}
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
                  <Award className="mx-auto mb-2 text-amber-500" size={17} />
                  <b className="block text-lg font-bold text-slate-900">
                    {selected.certificates}
                  </b>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    Certificates
                  </span>
                </div>
                <div className="px-1 text-center">
                  <Clock3 className="mx-auto mb-2 text-emerald-500" size={17} />
                  <b className="block text-lg font-bold text-slate-900">
                    {selected.learningHours}h
                  </b>
                  <span className="mt-1 block text-[10px] text-slate-500">
                    Learning time
                  </span>
                </div>
              </div>

              {/* Course progress */}
              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Enrolled courses
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Learning progress overview
                    </p>
                  </div>
                  <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">
                    {selected.courses}
                  </span>
                </div>

                <div className="space-y-4">
                  {courses.slice(0, selected.courses).map((course, index) => {
                    const progress =
                      index === 0
                        ? selected.progress
                        : index === 1
                          ? 100
                          : index === 2
                            ? 38
                            : 100;

                    return (
                      <div key={course}>
                        <div className="mb-2 flex items-start gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <BookOpen size={15} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold leading-5 text-slate-700">
                              {course}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full ${
                                    progress === 100
                                      ? "bg-emerald-500"
                                      : "bg-indigo-500"
                                  }`}
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-slate-500">
                                {progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent activity */}
              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent activity
                  </h3>
                  <Activity size={16} className="text-slate-400" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-5 text-slate-700">
                        Completed a lesson
                      </p>
                      <span className="text-[11px] text-slate-400">Today</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Mail size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-5 text-slate-700">
                        Participated in a course discussion
                      </p>
                      <span className="text-[11px] text-slate-400">
                        Yesterday
                      </span>
                    </div>
                  </div>

                  {selected.certificates > 0 && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                        <Award size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-medium leading-5 text-slate-700">
                          Earned a course certificate
                        </p>
                        <span className="text-[11px] text-slate-400">
                          Recently
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleSuspension(selected)}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  selected.status === "Suspended"
                    ? "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50"
                    : "border-rose-200 bg-rose-50/40 text-rose-600 hover:bg-rose-50"
                }`}
              >
                <ShieldAlert size={16} />
                {selected.status === "Suspended"
                  ? "Reactivate account"
                  : "Suspend account"}
              </button>
              <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                Account changes are local demo actions and are not saved to a
                server.
              </p>
            </div>
          </aside>
        ) : (
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 2xl:block">
            Select a student to view their profile.
          </aside>
        )}
      </section>
    </div>
  );
}
