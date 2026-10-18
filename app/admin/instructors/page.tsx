
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

type InstructorStatus = "Active" | "Inactive" | "Suspended";

type Instructor = {
  id: number;
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

const initialInstructors: Instructor[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    initials: "RS",
    specialization: "Full-Stack Development",
    courses: 3,
    students: 186,
    rating: 4.9,
    status: "Active",
    experience: 6,
    joined: "12 Mar 2026",
    location: "Kathmandu",
    learningHours: 420,
    bio: "Experienced full-stack developer teaching modern web technologies.",
    courseNames: [
      "Full-Stack Web Development",
      "React & Next.js",
      "REST API Development",
    ],
  },
  {
    id: 2,
    name: "Priya Thapa",
    email: "priya@example.com",
    initials: "PT",
    specialization: "UI/UX Design",
    courses: 2,
    students: 124,
    rating: 4.8,
    status: "Active",
    experience: 4,
    joined: "18 Mar 2026",
    location: "Bhaktapur",
    learningHours: 280,
    bio: "Product designer focused on accessible and user-friendly interfaces.",
    courseNames: ["UI/UX Design Basics", "Figma for Beginners"],
  },
  {
    id: 3,
    name: "Suman Karki",
    email: "suman@example.com",
    initials: "SK",
    specialization: "Python & Data Science",
    courses: 2,
    students: 98,
    rating: 4.6,
    status: "Active",
    experience: 5,
    joined: "02 Apr 2026",
    location: "Lalitpur",
    learningHours: 310,
    bio: "Python instructor with a focus on practical data analysis.",
    courseNames: ["Python Fundamentals", "Data Analysis with Python"],
  },
  {
    id: 4,
    name: "Nisha Gurung",
    email: "nisha@example.com",
    initials: "NG",
    specialization: "Cloud Computing",
    courses: 1,
    students: 45,
    rating: 4.4,
    status: "Inactive",
    experience: 3,
    joined: "11 Apr 2026",
    location: "Pokhara",
    learningHours: 95,
    bio: "Cloud computing educator specializing in deployment fundamentals.",
    courseNames: ["Cloud Fundamentals on AWS"],
  },
  {
    id: 5,
    name: "Prabin Shrestha",
    email: "prabin@example.com",
    initials: "PS",
    specialization: "Mobile App Development",
    courses: 2,
    students: 112,
    rating: 4.7,
    status: "Active",
    experience: 5,
    joined: "22 Apr 2026",
    location: "Kathmandu",
    learningHours: 350,
    bio: "Mobile developer teaching Flutter and cross-platform development.",
    courseNames: ["Flutter Development", "Dart Programming"],
  },
  {
    id: 6,
    name: "Anisha Rai",
    email: "anisha@example.com",
    initials: "AR",
    specialization: "Digital Marketing",
    courses: 1,
    students: 67,
    rating: 4.2,
    status: "Suspended",
    experience: 2,
    joined: "06 May 2026",
    location: "Dharan",
    learningHours: 80,
    bio: "Digital marketing instructor focused on SEO and content strategy.",
    courseNames: ["SEO & Digital Marketing"],
  },
  {
    id: 7,
    name: "Bikash Tamang",
    email: "bikash@example.com",
    initials: "BT",
    specialization: "Backend Development",
    courses: 3,
    students: 153,
    rating: 4.9,
    status: "Active",
    experience: 7,
    joined: "14 May 2026",
    location: "Chitwan",
    learningHours: 490,
    bio: "Backend engineer teaching APIs, databases, and Laravel.",
    courseNames: [
      "Laravel Development",
      "Database Design",
      "API Development",
    ],
  },
  {
    id: 8,
    name: "Samiksha KC",
    email: "samiksha@example.com",
    initials: "SK",
    specialization: "Cybersecurity",
    courses: 1,
    students: 52,
    rating: 4.5,
    status: "Active",
    experience: 3,
    joined: "28 May 2026",
    location: "Kathmandu",
    learningHours: 140,
    bio: "Cybersecurity educator focused on security fundamentals.",
    courseNames: ["Cybersecurity Fundamentals"],
  },
];

const tabs = ["All instructors", "Active", "Inactive", "Suspended"];

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
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        variant === "primary"
          ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98]"
          : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
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
  const [instructors, setInstructors] =
    useState<Instructor[]>(initialInstructors);
  const [selectedId, setSelectedId] = useState<number | null>(
    initialInstructors[0].id,
  );
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All instructors");
  const [page, setPage] = useState(1);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const pageSize = 5;

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
  const pageInstructors = filtered.slice(
    startIndex,
    startIndex + pageSize,
  );

  const selected =
    filtered.find((item) => item.id === selectedId) ??
    pageInstructors[0] ??
    filtered[0] ??
    null;

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

  function toggleStatus(instructor: Instructor) {
    const suspend = instructor.status !== "Suspended";

    if (
      !window.confirm(
        `${suspend ? "Suspend" : "Reactivate"} ${instructor.name}'s account?`,
      )
    ) {
      return;
    }

    setInstructors((current) =>
      current.map((item) =>
        item.id === instructor.id
          ? {
              ...item,
              status: suspend ? "Suspended" : "Active",
            }
          : item,
      ),
    );

    setTab("All instructors");

    window.alert(
      "Instructor status updated in this demo. Connect your API to save this change permanently.",
    );
  }

  function sendMessage(instructor: Instructor) {
    window.location.href = `mailto:${instructor.email}`;
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
                Manage teaching staff, assigned courses, and instructor performance.
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

      {/* Table and profile */}
      <section className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="font-bold text-slate-900">
                  All teaching staff
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  View and manage instructor accounts
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
                    window.alert(
                      "Use the status tabs to filter instructors. More filters can be added here.",
                    )
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
                    : instructors.filter((instructor) => instructor.status === item)
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
                      setMobileDetailOpen(true);
                    }}
                    className={`cursor-pointer transition ${
                      selected?.id === instructor.id
                        ? "bg-indigo-50/60"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ring-1 ring-inset ${
                            selected?.id === instructor.id
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
                        <Star size={14} className="fill-amber-400 text-amber-400" />
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
                          setMobileDetailOpen(true);
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

        {/* Instructor profile */}
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
                  Instructor profile
                </span>
                <button
                  type="button"
                  aria-label="Close instructor details"
                  onClick={() => setMobileDetailOpen(false)}
                  className="rounded-lg bg-white/15 p-2 text-white transition hover:bg-white/25 2xl:hidden"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                type="button"
                aria-label="More instructor options"
                onClick={() =>
                  window.alert("Additional instructor actions can be added here.")
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

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  onClick={() => sendMessage(selected)}
                >
                  <Mail size={15} />
                  Message
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.alert(
                      `Open the instructor edit form for ${selected.name} here.`,
                    )
                  }
                >
                  <MoreHorizontal size={15} />
                  More details
                </Button>
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
                  <Clock3
                    className="mx-auto mb-2 text-emerald-500"
                    size={17}
                  />
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
                  <span className="text-xs text-slate-500">
                    Student rating
                  </span>
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
                        Course content updated
                      </p>
                      <span className="text-[11px] text-slate-400">
                        Recently
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Users size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-5 text-slate-700">
                        Managing {selected.students} students
                      </p>
                      <span className="text-[11px] text-slate-400">
                        Current enrollment
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                      <Award size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-5 text-slate-700">
                        Instructor performance reviewed
                      </p>
                      <span className="text-[11px] text-slate-400">
                        Rating: {selected.rating.toFixed(1)} / 5
                      </span>
                    </div>
                  </div>
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
                Status changes are local demo actions and are not saved to a server.
              </p>
            </div>
          </aside>
        ) : (
          <aside className="hidden rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 2xl:block">
            Select an instructor to view their profile.
          </aside>
        )}
      </section>
    </div>
  );
}
