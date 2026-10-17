"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  MoreHorizontal,
  BookOpen,
  X,
} from "lucide-react";

type CourseStatus = "Published" | "In review" | "Draft";

type Course = {
  title: string;
  initials: string;
  meta: string;
  category: string;
  price: string;
  students: number;
  rating: string;
  status: CourseStatus;
};

const courses: Course[] = [
  {
    title: "Complete Web Development Bootcamp",
    initials: "WD",
    meta: "Updated 2 days ago",
    category: "Web Development",
    price: "NPR 12,000",
    students: 1204,
    rating: "4.9",
    status: "Published",
  },
  {
    title: "Python & Data Science Masterclass",
    initials: "DS",
    meta: "Updated 4 days ago",
    category: "Data & AI",
    price: "NPR 9,500",
    students: 986,
    rating: "4.8",
    status: "Published",
  },
  {
    title: "React and Next.js from Zero to Pro",
    initials: "RN",
    meta: "Updated yesterday",
    category: "Web Development",
    price: "NPR 8,000",
    students: 842,
    rating: "4.9",
    status: "Published",
  },
  {
    title: "Cloud Computing with AWS",
    initials: "CC",
    meta: "Submitted 1 day ago",
    category: "Cloud & DevOps",
    price: "NPR 10,000",
    students: 0,
    rating: "—",
    status: "In review",
  },
  {
    title: "UI/UX Design Fundamentals",
    initials: "UX",
    meta: "Updated 3 days ago",
    category: "Design",
    price: "NPR 6,500",
    students: 611,
    rating: "4.7",
    status: "Published",
  },
  {
    title: "Laravel API Development",
    initials: "LA",
    meta: "Last edited 5 hours ago",
    category: "Web Development",
    price: "NPR 5,000",
    students: 0,
    rating: "—",
    status: "Draft",
  },
  {
    title: "Mobile App Development with Flutter",
    initials: "FL",
    meta: "Updated 1 week ago",
    category: "Mobile",
    price: "NPR 7,500",
    students: 520,
    rating: "4.6",
    status: "Published",
  },
  {
    title: "Cybersecurity Essentials",
    initials: "CS",
    meta: "Submitted 2 days ago",
    category: "Security",
    price: "NPR 8,500",
    students: 0,
    rating: "—",
    status: "In review",
  },
  {
    title: "Introduction to Machine Learning",
    initials: "ML",
    meta: "Last edited 2 days ago",
    category: "Data & AI",
    price: "NPR 11,000",
    students: 0,
    rating: "—",
    status: "Draft",
  },
];

const statusStyles: Record<CourseStatus, string> = {
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "In review": "bg-violet-50 text-violet-700 ring-violet-600/20",
  Draft: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">{actions}</div>
    </div>
  );
}

function Button({
  children,
  href,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const classes =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 " +
    (variant === "primary"
      ? "bg-violet-600 text-white shadow-sm hover:bg-violet-700"
      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

function Status({ status }: { status: CourseStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function CoursesPage() {
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showFilters, setShowFilters] = useState(false);
  const [menuCourse, setMenuCourse] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const tabs = [
    { name: "All", count: 64 },
    { name: "Published", count: 52 },
    { name: "In review", count: 3 },
    { name: "Draft", count: 9 },
  ];

  const filtered = useMemo(
    () =>
      courses.filter((course) => {
        const matchesTab = tab === "All" || course.status === tab;

        const searchText =
          `${course.title} ${course.category} ${course.meta}`.toLowerCase();

        const matchesQuery = searchText.includes(query.toLowerCase().trim());

        const matchesCategory =
          category === "All categories" || course.category === category;

        return matchesTab && matchesQuery && matchesCategory;
      }),
    [tab, query, category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const visibleCourses = filtered.slice(startIndex, startIndex + pageSize);

  function changeTab(value: string) {
    setTab(value);
    setPage(1);
  }

  function exportCSV() {
    const headers = [
      "Course",
      "Category",
      "Price",
      "Students",
      "Rating",
      "Status",
    ];

    const rows = filtered.map((course) => [
      course.title,
      course.category,
      course.price,
      String(course.students),
      course.rating,
      course.status,
    ]);

    const escapeCSV = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "courses.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader
        title="Courses"
        description="Create, review and publish everything students can learn on NewaNext."
        actions={
          <>
            <Button variant="secondary" onClick={exportCSV}>
              <Download size={16} />
              Export CSV
            </Button>

            <Button href="/admin/courses/new">
              <Plus size={17} />
              New course
            </Button>
          </>
        }
      />

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tabs.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => changeTab(item.name)}
            className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition ${
              tab === item.name
                ? "border-violet-300 bg-violet-50 ring-1 ring-violet-200"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                tab === item.name ? "text-violet-700" : "text-slate-500"
              }`}
            >
              {item.name}
            </span>

            <span
              className={`text-xl font-bold ${
                tab === item.name ? "text-violet-700" : "text-slate-900"
              }`}
            >
              {item.count}
            </span>
          </button>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 sm:max-w-md">
            <Search size={17} className="shrink-0 text-slate-400" />

            <input
              type="search"
              placeholder="Search courses..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  setPage(1);
                }}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </label>

          <button
            type="button"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((value) => !value)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
              showFilters || category !== "All categories"
                ? "border-violet-300 bg-violet-50 text-violet-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-center">
            <label
              htmlFor="course-category"
              className="text-sm font-medium text-slate-600"
            >
              Category
            </label>

            <select
              id="course-category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            >
              <option>All categories</option>

              {Array.from(
                new Set(courses.map((course) => course.category)),
              ).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setCategory("All categories");
                setQuery("");
                setTab("All");
                setPage(1);
              }}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800 sm:ml-auto"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {[
                  "COURSE",
                  "CATEGORY",
                  "PRICE",
                  "STUDENTS",
                  "RATING",
                  "STATUS",
                  "",
                ].map((heading, index) => (
                  <th
                    key={`${heading}-${index}`}
                    className="whitespace-nowrap px-5 py-4 text-[10px] font-bold tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visibleCourses.map((course) => (
                <tr
                  key={course.title}
                  className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex min-w-[250px] items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-bold text-violet-700">
                        {course.initials}
                      </span>

                      <div className="min-w-0">
                        <p className="max-w-xs text-sm font-semibold text-slate-800">
                          {course.title}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {course.meta}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                    {course.category}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                    {course.price}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.students.toLocaleString()}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                      {course.rating !== "—" && (
                        <Star size={14} fill="#F5B544" stroke="#F5B544" />
                      )}

                      {course.rating}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <Status status={course.status} />
                  </td>

                  <td className="relative px-5 py-4">
                    <button
                      type="button"
                      aria-label={`More actions for ${course.title}`}
                      aria-expanded={menuCourse === course.title}
                      onClick={() =>
                        setMenuCourse((current) =>
                          current === course.title ? null : course.title,
                        )
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {menuCourse === course.title && (
                      <div className="absolute right-5 top-14 z-10 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                        <Link
                          href={`/admin/courses/${encodeURIComponent(course.title)}/edit`}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => setMenuCourse(null)}
                        >
                          Edit course
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            window.alert(`Course details: ${course.title}`);
                            setMenuCourse(null);
                          }}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                        >
                          View details
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {visibleCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                      <BookOpen size={21} className="text-slate-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-800">
                      No courses found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another search term or change your filters.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setTab("All");
                        setCategory("All categories");
                        setPage(1);
                      }}
                      className="mt-4 text-sm font-semibold text-violet-600 hover:text-violet-800"
                    >
                      Clear filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
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
            matching courses
          </p>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition ${
                    currentPage === pageNumber
                      ? "bg-violet-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
