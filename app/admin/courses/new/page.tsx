"use client";

import { useState, type ReactNode, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  Save,
  Plus,
  GripVertical,
  ChevronDown,
  UploadCloud,
  Trash2,
  CircleCheck,
  Play,
  Clock3,
  BookOpen,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Check,
} from "lucide-react";
import { createCourseInDb } from "@/app/lib/db/courses";
import { getAllUsers } from "@/app/lib/db/user";
import { getAllCategories, type Category } from "@/app/lib/db/categories";

type Lesson = [string, string];

type CourseSection = {
  title: string;
  duration: string;
  lessons: Lesson[];
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

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50";

  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles}`}
    >
      {children}
    </button>
  );
}

function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">{actions}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-sm font-medium text-gray-700">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-normal text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function NewCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [instructorsList, setInstructorsList] = useState<
    { id: string; name: string }[]
  >([]);

  const [level, setLevel] = useState("Beginner to advanced");
  const [language, setLanguage] = useState("English");
  const [imageName, setImageName] = useState("");

  const [sectionsList, setSectionsList] = useState<CourseSection[]>([]);
  const [activeSectionForLesson, setActiveSectionForLesson] = useState<
    number | null
  >(null);
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDuration, setNewLessonDuration] = useState("");

  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("0");
  const [discountEnd, setDiscountEnd] = useState("");
  const [instructor, setInstructor] = useState("");
  const [tags, setTags] = useState([
 
  ]);
  const [tag, setTag] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [studentQA, setStudentQA] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch Instructors (where roleId or role is instructor) & Categories from DB
  useEffect(() => {
    async function loadDbData() {
      try {
        const [users, cats] = await Promise.all([
          getAllUsers(),
          getAllCategories(),
        ]);

        const filteredInstructors = users.filter((u: any) => {
          const r = (u.role || u.roleId || "").toLowerCase();
          return r === "instructor";
        });

        setInstructorsList(
          filteredInstructors.map((u) => ({ id: u.uid, name: u.name })),
        );
        if (filteredInstructors.length > 0) {
          setInstructor(filteredInstructors[0].name);
        }

        setCategoriesList(cats);
        if (cats.length > 0) {
          setCategory(cats[0].name);
        }
      } catch (err) {
        console.error("Error loading dynamic data:", err);
      }
    }
    loadDbData();
  }, []);

  // Auto-generate slug when title changes
  function handleTitleChange(val: string) {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  }

  const totalLessons = sectionsList.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  const isBasicComplete = Boolean(title.trim() && subtitle.trim());
  const isDescriptionComplete = Boolean(description.trim());
  const isPricingComplete = price !== "" && Number(price) >= 0;

  function addSection() {
    const newSectionIndex = sectionsList.length;
    setSectionsList((old) => [
      ...old,
      {
        title: "",
        duration: "0m",
        lessons: [],
      },
    ]);
    setOpenSections((old) => [...old, newSectionIndex]);
  }

  function removeSection(index: number) {
    setSectionsList((old) => old.filter((_, i) => i !== index));
    setOpenSections((old) =>
      old.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)),
    );
    if (activeSectionForLesson === index) {
      setActiveSectionForLesson(null);
    }
  }

  function toggleSection(index: number) {
    setOpenSections((old) =>
      old.includes(index) ? old.filter((i) => i !== index) : [...old, index],
    );
  }

  function handleSaveLesson(sectionIndex: number) {
    if (!newLessonTitle.trim()) {
      setToast({ message: "Please enter a lesson title.", type: "error" });
      return;
    }

    const duration = newLessonDuration.trim() || "10:00";

    setSectionsList((old) =>
      old.map((sec, i) => {
        if (i === sectionIndex) {
          return {
            ...sec,
            lessons: [
              ...sec.lessons,
              [newLessonTitle.trim(), duration] as Lesson,
            ],
          };
        }
        return sec;
      }),
    );

    setNewLessonTitle("");
    setNewLessonDuration("");
    setActiveSectionForLesson(null);
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

  async function handleSaveToFirestore(
    targetStatus: "Draft" | "In review" | "Published",
  ) {
    if (!isBasicComplete || !isDescriptionComplete || !isPricingComplete) {
      setToast({
        message:
          "Please complete the title, subtitle, description and valid price before saving.",
        type: "error",
      });
      return;
    }

    try {
      setSubmitting(true);

      const sanitizedSections = sectionsList.map((section) => ({
        title: section.title || "Untitled Section",
        duration: section.duration,
        lessons: section.lessons.map((lesson) => ({
          title: lesson[0],
          duration: lesson[1],
        })),
      }));

      await createCourseInDb({
        title,
        slug,
        subtitle,
        description,
        category,
        level,
        language,
        status: targetStatus,
        price: Number(price),
        discount: Number(discount),
        discountEnd,
        instructor,
        tags,
        certificate,
        studentQA,
        sections: sanitizedSections,
      });

      setToast({
        message: `Course successfully saved as ${targetStatus}!`,
        type: "success",
      });
      setTimeout(() => {
        router.push("/admin/courses");
      }, 1500);
    } catch (error) {
      console.error("Error saving course:", error);
      setToast({
        message: "Failed to save course to database.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            All courses
          </Link>

          <div className="text-sm text-gray-400">
            <Link
              href="/admin/courses"
              className="transition hover:text-indigo-600"
            >
              Courses
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">New course</span>
          </div>
        </div>

        {/* Page header */}
        <PageHeader
          title="New course"
          description="Create your course, organize lessons, and configure publishing settings."
          actions={
            <>
              <Button
                variant="secondary"
                disabled={submitting}
                onClick={() =>
                  setToast({
                    message: "Course preview will be available after saving.",
                    type: "error",
                  })
                }
              >
                <Eye size={16} />
                Preview
              </Button>

              <Button
                variant="secondary"
                disabled={submitting}
                onClick={() => handleSaveToFirestore("Draft")}
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                Save draft
              </Button>

              <Button
                disabled={submitting}
                onClick={() => handleSaveToFirestore("In review")}
              >
                {submitting ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Play size={15} />
                )}
                Submit for review
              </Button>
            </>
          }
        />

        {/* Editor layout */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main column */}
          <div className="min-w-0 space-y-6">
            {/* Basic information */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                  1
                </span>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Basic information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Give your course a clear title and description.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Course title">
                    <input
                      className={inputClass}
                      value={title}
                      maxLength={120}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Full-Stack Web with React & Node"
                    />
                    <span className="-mt-1 text-xs font-normal text-gray-400">
                      {title.length} of 120 characters
                    </span>
                  </Field>

                  <Field label="Slug (Auto-generated)">
                    <input
                      className={`${inputClass} bg-gray-50 font-mono text-xs`}
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="full-stack-web-with-react-node"
                    />
                  </Field>
                </div>

                <Field label="Subtitle">
                  <input
                    className={inputClass}
                    value={subtitle}
                    maxLength={160}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Build modern web applications from frontend to deployment"
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Learn to build and deploy full-stack applications using React, Node.js, Express and modern development workflows."
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="Category">
                    <select
                      className={inputClass}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                      {categoriesList.length === 0 && (
                        <option value="Web Development">Web Development</option>
                      )}
                    </select>
                  </Field>

                  <Field label="Level">
                    <select
                      className={inputClass}
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Beginner to advanced</option>
                    </select>
                  </Field>

                  <Field label="Language">
                    <select
                      className={inputClass}
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English</option>
                      <option>Nepali</option>
                    </select>
                  </Field>
                </div>
              </div>
            </section>

            {/* Curriculum */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                    2
                  </span>
                  <div>
                    <h2 className="font-semibold text-gray-900">Curriculum</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {sectionsList.length} sections · {totalLessons} lessons
                    </p>
                  </div>
                </div>

                <Button variant="secondary" onClick={addSection}>
                  <Plus size={15} />
                  Add section
                </Button>
              </div>

              <div className="space-y-3">
                {sectionsList.map((section, index) => {
                  const isOpen = openSections.includes(index);

                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-gray-200"
                    >
                      <div className="flex flex-wrap items-center gap-3 bg-gray-50 px-3 py-3 sm:px-4">
                        <GripVertical
                          size={17}
                          className="shrink-0 cursor-grab text-gray-400"
                        />

                        <span className="text-sm font-medium text-gray-400">
                          {index + 1}.
                        </span>

                        <div className="min-w-0 flex-1">
                          <input
                            aria-label={`Section ${index + 1} title`}
                            value={section.title}
                            onChange={(e) =>
                              setSectionsList((old) =>
                                old.map((item, i) =>
                                  i === index
                                    ? { ...item, title: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            placeholder="Enter section title (e.g. Introduction to React)"
                            className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:text-indigo-600"
                            autoFocus={section.title === ""}
                          />

                          <p className="mt-1 text-xs text-gray-500">
                            {section.lessons.length} lessons ·{" "}
                            {section.duration}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSection(index)}
                          aria-label={`Remove ${section.title}`}
                          className="rounded-md p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSection(index)}
                          aria-label={
                            isOpen ? "Collapse section" : "Expand section"
                          }
                          className="rounded-md p-2 text-gray-500 hover:bg-gray-200"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {isOpen && (
                        <div className="divide-y divide-gray-100 bg-white">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between gap-3 px-4 py-3 pl-8 sm:pl-12"
                            >
                              <span className="flex items-center gap-2 text-sm text-gray-700">
                                <Play size={13} className="text-gray-400" />
                                {lesson[0]}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400">
                                  {lesson[1]}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeLesson(index, lessonIndex)
                                  }
                                  className="text-gray-300 hover:text-red-600"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          ))}

                          {section.lessons.length === 0 &&
                            activeSectionForLesson !== index && (
                              <p className="px-4 py-5 text-center text-sm text-gray-400">
                                No lessons in this section yet.
                              </p>
                            )}

                          {activeSectionForLesson === index ? (
                            <div className="bg-gray-50/80 p-4 pl-8 sm:pl-12 space-y-3 border-t border-gray-100">
                              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                                Add New Lesson
                              </p>
                              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_130px]">
                                <input
                                  type="text"
                                  placeholder="Lesson title (e.g. Introduction to Hooks)"
                                  value={newLessonTitle}
                                  onChange={(e) =>
                                    setNewLessonTitle(e.target.value)
                                  }
                                  className={inputClass}
                                  autoFocus
                                />
                                <input
                                  type="text"
                                  placeholder="Duration (12:30)"
                                  value={newLessonDuration}
                                  onChange={(e) =>
                                    setNewLessonDuration(e.target.value)
                                  }
                                  className={inputClass}
                                />
                              </div>
                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveSectionForLesson(null);
                                    setNewLessonTitle("");
                                    setNewLessonDuration("");
                                  }}
                                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveLesson(index)}
                                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                                >
                                  <Check size={14} /> Save Lesson
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSectionForLesson(index);
                                setNewLessonTitle("");
                                setNewLessonDuration("");
                              }}
                              className="flex w-full items-center gap-2 px-4 py-3 pl-8 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 sm:pl-12"
                            >
                              <Plus size={15} />
                              Add lesson
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {sectionsList.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 px-4 py-10 text-center">
                  <BookOpen size={28} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-sm font-medium text-gray-700">
                    No sections yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a section to start building your curriculum.
                  </p>
                </div>
              )}
            </section>

            {/* Pricing */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                  3
                </span>
                <div>
                  <h2 className="font-semibold text-gray-900">Pricing</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Set the course price and optional launch discount.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="Price (NPR)">
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="12500"
                  />
                </Field>

                <Field label="Launch discount (%)">
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="0"
                  />
                </Field>

                <Field label="Discount ends">
                  <input
                    className={inputClass}
                    type="date"
                    value={discountEnd}
                    onChange={(e) => setDiscountEnd(e.target.value)}
                  />
                </Field>
              </div>

              {Number(discount) > 0 &&
                Number(discount) <= 100 &&
                Number(price) >= 0 && (
                  <p className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                    Discounted price: NPR{" "}
                    {(
                      Number(price) *
                      (1 - Number(discount) / 100)
                    ).toLocaleString("en-NP", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 xl:sticky xl:top-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Publish checklist</h2>
              <p className="mt-1 text-sm text-gray-500">
                Complete these items before publishing.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  { label: "Title and subtitle", complete: isBasicComplete },
                  { label: "Description", complete: isDescriptionComplete },
                  {
                    label: "Curriculum has sections",
                    complete: sectionsList.length > 0,
                  },
                  { label: "Pricing set", complete: isPricingComplete },
                  {
                    label: "Instructor selected",
                    complete: Boolean(instructor),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    {item.complete ? (
                      <CircleCheck
                        size={17}
                        className="shrink-0 text-emerald-500"
                      />
                    ) : (
                      <span className="size-[17px] shrink-0 rounded-full border-2 border-gray-300" />
                    )}
                    <span
                      className={
                        item.complete ? "text-gray-700" : "text-gray-500"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Cover image</h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose a high-quality image to represent your course.
              </p>

              <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
                <UploadCloud size={27} className="mb-3 text-gray-400" />
                <strong className="max-w-full break-words text-sm font-medium text-gray-700">
                  {imageName || "Drop an image or browse"}
                </strong>
                <span className="mt-2 text-xs text-gray-400">
                  1280 × 720 px · JPG or PNG · Under 2 MB
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                      setToast({
                        message: "Please select an image smaller than 2 MB.",
                        type: "error",
                      });
                      e.target.value = "";
                      return;
                    }
                    setImageName(file.name);
                  }}
                />
              </label>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 font-semibold text-gray-900">Settings</h2>

              <div className="space-y-5">
                <Field label="Instructor">
                  <select
                    className={inputClass}
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                  >
                    {instructorsList.map((inst) => (
                      <option key={inst.id} value={inst.name}>
                        {inst.name}
                      </option>
                    ))}
                    {instructorsList.length === 0 && (
                      <option value="Suman Adhikari">Suman Adhikari</option>
                    )}
                  </select>
                </Field>

                <Field label="Tags">
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 p-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    {tags.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() =>
                            setTags((old) =>
                              old.filter((existing) => existing !== item),
                            )
                          }
                          className="rounded hover:text-red-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}

                    <input
                      value={tag}
                      placeholder="Add tag..."
                      onChange={(e) => setTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && tag.trim()) {
                          e.preventDefault();
                          const newTag = tag.trim();
                          if (
                            !tags.some(
                              (existing) =>
                                existing.toLowerCase() === newTag.toLowerCase(),
                            )
                          ) {
                            setTags((old) => [...old, newTag]);
                          }
                          setTag("");
                        }
                      }}
                      className="min-w-20 flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <span className="text-xs font-normal text-gray-400">
                    Press Enter to add a tag.
                  </span>
                </Field>

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
              </div>
            </section>

            <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                <Clock3 size={16} /> Course summary
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Sections</span>
                  <span className="font-medium text-gray-900">
                    {sectionsList.length}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium text-gray-900">
                    {totalLessons}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Category</span>
                  <span className="max-w-36 truncate text-right font-medium text-gray-900">
                    {category}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-indigo-100 pt-3">
                  <span className="text-gray-600">Course price</span>
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
