"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  Loader2,
  Play,
  Clock3,
  BookOpen,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/app/lib/firebase";

type Lesson = {
  title: string;
  duration: string;
};

type CourseSection = {
  title: string;
  duration: string;
  lessons: Lesson[];
};

// Toast Notification Component
type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProps) {
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

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [level, setLevel] = useState("Beginner to advanced");
  const [language, setLanguage] = useState("English");
  const [status, setStatus] = useState("Draft");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [discountEnd, setDiscountEnd] = useState("");
  const [instructor, setInstructor] = useState("Suman Adhikari");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [studentQA, setStudentQA] = useState(true);
  const [sectionsList, setSectionsList] = useState<CourseSection[]>([]);
  const [openSections, setOpenSections] = useState<number[]>([]);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  async function loadCourseData() {
    try {
      setLoading(true);
      const db = getFirestore(getFirebaseApp());
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
        setDescription(data.description || "");
        setCategory(data.category || "Web Development");
        setLevel(data.level || "Beginner to advanced");
        setLanguage(data.language || "English");
        setStatus(data.status || "Draft");
        setPrice(data.price ? String(data.price) : "");
        setDiscount(data.discount ? String(data.discount) : "0");
        setDiscountEnd(data.discountEnd || "");
        setInstructor(data.instructor || "Suman Adhikari");
        setTags(data.tags || []);
        setCertificate(data.certificate ?? true);
        setStudentQA(data.studentQA ?? true);

        if (data.sections && Array.isArray(data.sections)) {
          setSectionsList(data.sections);
          setOpenSections(data.sections.map((_: any, i: number) => i));
        }
      }
    } catch (error) {
      console.error("Failed to load course for editing:", error);
      setToast({ message: "Failed to load course details.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function addSection() {
    setSectionsList((old) => [
      ...old,
      { title: `New section ${old.length + 1}`, duration: "0m", lessons: [] },
    ]);
    setOpenSections((old) => [...old, sectionsList.length]);
  }

  function removeSection(index: number) {
    setSectionsList((old) => old.filter((_, i) => i !== index));
  }

  function toggleSection(index: number) {
    setOpenSections((old) =>
      old.includes(index) ? old.filter((i) => i !== index) : [...old, index],
    );
  }

  function addLesson(sectionIndex: number) {
    const lessonTitle = window.prompt("Enter lesson title:");
    if (!lessonTitle) return;
    const lessonDuration =
      window.prompt("Enter lesson duration (e.g. 15:30):") || "10:00";

    setSectionsList((old) =>
      old.map((sec, i) => {
        if (i === sectionIndex) {
          return {
            ...sec,
            lessons: [
              ...sec.lessons,
              { title: lessonTitle, duration: lessonDuration },
            ],
          };
        }
        return sec;
      }),
    );
  }

  function removeLesson(sectionIndex: number, lessonIndex: number) {
    setSectionsList((old) =>
      old.map((sec, i) => {
        if (i === sectionIndex) {
          return {
            ...sec,
            lessons: sec.lessons.filter((_, lIdx) => lIdx !== lessonIndex),
          };
        }
        return sec;
      }),
    );
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !price) {
      setToast({
        message: "Course title and price are required.",
        type: "error",
      });
      return;
    }

    try {
      setSubmitting(true);
      const db = getFirestore(getFirebaseApp());
      const docRef = doc(db, "courses", courseId);

      await updateDoc(docRef, {
        title,
        subtitle,
        description,
        category,
        level,
        language,
        status,
        price: Number(price),
        discount: Number(discount),
        discountEnd,
        instructor,
        tags,
        certificate,
        studentQA,
        sections: sectionsList,
        updatedAt: new Date().toISOString(),
      });

      setToast({ message: "Course updated successfully!", type: "success" });
      setTimeout(() => {
        router.push("/admin/courses");
      }, 1500);
    } catch (error) {
      console.error("Error updating course:", error);
      setToast({
        message: "Failed to update course in database.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={36} />
      </div>
    );
  }

  const totalLessons = sectionsList.reduce(
    (acc, sec) => acc + (sec.lessons?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mx-auto max-w-[1600px]">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft size={16} /> Back to courses
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Edit Course
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Update course information, curriculum, and settings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/courses"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="button"
              disabled={submitting}
              onClick={handleUpdate}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {/* Edit Form Layout */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Column */}
          <div className="space-y-6">
            {/* Basic Info */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-gray-900">Basic Information</h2>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Course Title*
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Subtitle
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Description
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 resize-y"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Category
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none"
                  >
                    <option>Web Development</option>
                    <option>Data & AI</option>
                    <option>Cloud & DevOps</option>
                    <option>Mobile</option>
                    <option>Design</option>
                    <option>Security</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Level
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Beginner to advanced</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Language
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none"
                  >
                    <option>English</option>
                    <option>Nepali</option>
                  </select>
                </label>
              </div>
            </section>

            {/* Curriculum */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">Curriculum</h2>
                  <p className="text-xs text-gray-500">
                    {sectionsList.length} sections · {totalLessons} lessons
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={14} /> Add Section
                </button>
              </div>

              <div className="space-y-3">
                {sectionsList.map((section, index) => {
                  const isOpen = openSections.includes(index);
                  return (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                        <input
                          value={section.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSectionsList((old) =>
                              old.map((s, i) =>
                                i === index ? { ...s, title: val } : s,
                              ),
                            );
                          }}
                          className="bg-transparent font-semibold text-sm text-gray-800 outline-none w-full"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => removeSection(index)}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleSection(index)}
                            className="text-gray-500 p-1"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <div className="divide-y divide-gray-100 bg-white">
                          {section.lessons?.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex items-center justify-between px-4 py-2.5 pl-8 text-sm text-gray-700"
                            >
                              <span className="flex items-center gap-2">
                                <Play size={13} className="text-gray-400" />{" "}
                                {lesson.title}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400">
                                  {lesson.duration}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeLesson(index, lIdx)}
                                  className="text-gray-300 hover:text-red-600"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addLesson(index)}
                            className="flex w-full items-center gap-2 px-4 py-3 pl-8 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                          >
                            <Plus size={15} /> Add Lesson
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-gray-900">Pricing</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Price (NPR)*
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Launch discount (%)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                  Discount ends
                  <input
                    type="date"
                    value={discountEnd}
                    onChange={(e) => setDiscountEnd(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <h2 className="font-semibold text-gray-900">Settings</h2>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Instructor
                <input
                  type="text"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
                Visibility Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none"
                >
                  <option>Draft</option>
                  <option>In review</option>
                  <option>Published</option>
                </select>
              </label>

              <div className="space-y-3 border-t border-gray-100 pt-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={certificate}
                    onChange={(e) => setCertificate(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-gray-300 accent-indigo-600"
                  />
                  <span>Issue completion certificate</span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={studentQA}
                    onChange={(e) => setStudentQA(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-gray-300 accent-indigo-600"
                  />
                  <span>Allow student Q&A</span>
                </label>
              </div>
            </section>

            <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                <Clock3 size={16} /> Course Summary
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sections</span>
                  <span className="font-medium text-gray-900">
                    {sectionsList.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium text-gray-900">
                    {totalLessons}
                  </span>
                </div>
                <div className="flex justify-between border-t border-indigo-100 pt-3">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold text-indigo-700">
                    NPR {Number(price || 0).toLocaleString("en-NP")}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
