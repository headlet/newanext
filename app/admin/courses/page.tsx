"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  X,
  Loader2,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { fetchAllCourses, deleteCourseFromDb } from "@/app/lib/db/courses";

type CourseStatus = "Published" | "In review" | "Draft";

type Course = {
  id: string;
  title: string;
  initials: string;
  meta: string;
  category: string;
  price: string;
  students: number;
  rating: string;
  status: CourseStatus;
  imageUrl?: string;
  imageFileId?: string;
};

const statusStyles: Record<CourseStatus, string> = {
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "In review": "bg-violet-50 text-violet-700 ring-violet-600/20",
  Draft: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
        type === "success" ? "bg-emerald-600" : "bg-rose-600"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 size={18} />
      ) : (
        <AlertCircle size={18} />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const pageSize = 6;

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      const fetchedCourses = await fetchAllCourses();
      setCourses(fetchedCourses as Course[]);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setToast({
        message: "Failed to load courses from database.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(course: Course) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert the deletion of "${course.title}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#cbd5e1",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteCourseFromDb(course.id);
        setCourses((current) => current.filter((c) => c.id !== course.id));
        setToast({ message: "Course deleted successfully.", type: "success" });
      } catch (error) {
        console.error("Failed to delete course:", error);
        setToast({ message: "Failed to delete course.", type: "error" });
      }
    }
  }

  const tabs = useMemo(
    () => [
      { name: "All", count: courses.length },
      {
        name: "Published",
        count: courses.filter((c) => c.status === "Published").length,
      },
      {
        name: "In review",
        count: courses.filter((c) => c.status === "In review").length,
      },
      {
        name: "Draft",
        count: courses.filter((c) => c.status === "Draft").length,
      },
    ],
    [courses],
  );

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
    [courses, tab, query, category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleCourses = filtered.slice(startIndex, startIndex + pageSize);

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

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-violet-600" size={36} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Courses
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create, review and publish everything students can learn on
            NewaNext.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Download size={16} /> Export CSV
          </button>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
          >
            <Plus size={17} /> New course
          </Link>
        </div>
      </div>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tabs.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              setTab(item.name);
              setPage(1);
            }}
            className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition ${
              tab === item.name
                ? "border-violet-300 bg-violet-50 ring-1 ring-violet-200"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`text-sm font-medium ${tab === item.name ? "text-violet-700" : "text-slate-500"}`}
            >
              {item.name}
            </span>
            <span
              className={`text-xl font-bold ${tab === item.name ? "text-violet-700" : "text-slate-900"}`}
            >
              {item.count}
            </span>
          </button>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 transition focus-within:border-violet-400 sm:max-w-md">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            {query && (
              <button
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
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:flex-row sm:items-center">
            <label className="text-sm font-medium text-slate-600">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
            >
              <option>All categories</option>
              {Array.from(new Set(courses.map((c) => c.category))).map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
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
                  "ACTIONS",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-5 py-4 text-[10px] font-bold tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleCourses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="h-11 w-11 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-bold text-violet-700">
                          {course.initials}
                        </span>
                      )}
                      <div>
                        <p className="max-w-xs text-sm font-semibold text-slate-800">
                          {course.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {course.meta}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {course.category}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                    {course.price}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {course.students.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                      {course.rating !== "—" && (
                        <Star size={14} fill="#F5B544" stroke="#F5B544" />
                      )}
                      {course.rating}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[course.status]}`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        title="Edit Course"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <Edit3 size={17} />
                      </Link>

                      <button
                        type="button"
                        title="Delete Course"
                        onClick={() => handleDelete(course)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {visibleCourses.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center text-slate-500"
                  >
                    No courses found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
