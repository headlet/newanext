
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
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
} from "lucide-react";

type Lesson = [string, string];

type CourseSection = {
  title: string;
  duration: string;
  lessons: Lesson[];
};

const initialSections: CourseSection[] = [
  {
    title: "Web fundamentals",
    duration: "3h 40m",
    lessons: [
      ["How the web works", "12:30"],
      ["HTML structure and semantics", "18:05"],
      ["Modern CSS layout with Flexbox and Grid", "24:40"],
    ],
  },
  {
    title: "JavaScript in depth",
    duration: "5h 10m",
    lessons: [
      ["Functions, scope and closures", "21:15"],
      ["Async code, promises and fetch", "26:50"],
    ],
  },
  {
    title: "React from the ground up",
    duration: "5h 45m",
    lessons: [
      ["Components and props", "19:20"],
      ["State, effects and custom hooks", "28:10"],
    ],
  },
  {
    title: "Node, Express and deployment",
    duration: "3h 45m",
    lessons: [
      ["Building a REST API", "31:00"],
      ["Deploying to the cloud", "22:35"],
    ],
  },
];

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";

  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50";

  return (
    <button
      type={type}
      onClick={onClick}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
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
  const [title, setTitle] = useState(
    "Full-Stack Web with React & Node",
  );
  const [subtitle, setSubtitle] = useState(
    "Build modern web applications from frontend to deployment",
  );
  const [description, setDescription] = useState(
    "Learn to build and deploy full-stack applications using React, Node.js, Express and modern development workflows.",
  );

  const [category, setCategory] = useState("Web Development");
  const [level, setLevel] = useState("Beginner to advanced");
  const [language, setLanguage] = useState("English");
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState("Draft");
  const [sectionsList, setSectionsList] =
    useState<CourseSection[]>(initialSections);
  const [price, setPrice] = useState("12500");
  const [discount, setDiscount] = useState("0");
  const [discountEnd, setDiscountEnd] = useState("");
  const [instructor, setInstructor] = useState("Suman Adhikari");
  const [tags, setTags] = useState([
    "React",
    "Node.js",
    "JavaScript",
    "Full-stack",
  ]);
  const [tag, setTag] = useState("");
  const [certificate, setCertificate] = useState(true);
  const [studentQA, setStudentQA] = useState(true);
  const [saved, setSaved] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  const totalLessons = sectionsList.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  const isBasicComplete = Boolean(title.trim() && subtitle.trim());
  const isDescriptionComplete = Boolean(description.trim());
  const isPricingComplete = price !== "" && Number(price) >= 0;

  function addSection() {
    setSectionsList((old) => [
      ...old,
      {
        title: `New section ${old.length + 1}`,
        duration: "0m",
        lessons: [],
      },
    ]);
    setOpenSections((old) => [...old, sectionsList.length]);
  }

  function removeSection(index: number) {
    setSectionsList((old) => old.filter((_, i) => i !== index));
    setOpenSections((old) =>
      old
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i)),
    );
  }

  function toggleSection(index: number) {
    setOpenSections((old) =>
      old.includes(index)
        ? old.filter((i) => i !== index)
        : [...old, index],
    );
  }

  function saveDraft() {
    // Demo only: connect this function to your API to persist the course.
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  function publishCourse() {
    if (!isBasicComplete || !isDescriptionComplete || !isPricingComplete) {
      window.alert(
        "Please complete the title, subtitle, description and valid price before publishing.",
      );
      return;
    }

    setStatus("In review");
    window.alert(
      "Demo: course submitted for review. Connect this action to your API.",
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                onClick={() =>
                  window.alert(
                    "Course preview will be available after saving.",
                  )
                }
              >
                <Eye size={16} />
                Preview
              </Button>

              <Button variant="secondary" onClick={saveDraft}>
                <Save size={16} />
                {saved ? "Draft saved" : "Save draft"}
              </Button>

              <Button onClick={publishCourse}>
                <Play size={15} />
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
                <Field label="Course title">
                  <input
                    className={inputClass}
                    value={title}
                    maxLength={120}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Full-Stack Web Development"
                  />
                  <span className="-mt-1 text-xs font-normal text-gray-400">
                    {title.length} of 120 characters
                  </span>
                </Field>

                <Field label="Subtitle">
                  <input
                    className={inputClass}
                    value={subtitle}
                    maxLength={160}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="What will students learn?"
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    className={`${inputClass} min-h-32 resize-y`}
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what students will learn..."
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field label="Category">
                    <select
                      className={inputClass}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Web Development</option>
                      <option>Data & AI</option>
                      <option>Cloud & DevOps</option>
                      <option>Mobile</option>
                      <option>Design</option>
                      <option>Security</option>
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
                    <h2 className="font-semibold text-gray-900">
                      Curriculum
                    </h2>
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
                      key={`${section.title}-${index}`}
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
                            className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none focus:text-indigo-600"
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
                        <div className="divide-y divide-gray-100">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={`${lesson[0]}-${lessonIndex}`}
                              className="flex items-center gap-3 px-4 py-3 pl-8 sm:pl-12"
                            >
                              <Play
                                size={13}
                                className="shrink-0 text-gray-400"
                              />
                              <span className="min-w-0 flex-1 text-sm text-gray-700">
                                {lesson[0]}
                              </span>
                              <span className="shrink-0 text-xs text-gray-400">
                                {lesson[1]}
                              </span>
                            </div>
                          ))}

                          {section.lessons.length === 0 && (
                            <p className="px-4 py-5 text-center text-sm text-gray-400">
                              No lessons in this section yet.
                            </p>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              window.alert(
                                "Connect this button to your lesson creation form.",
                              )
                            }
                            className="flex w-full items-center gap-2 px-4 py-3 pl-8 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50 sm:pl-12"
                          >
                            <Plus size={15} />
                            Add lesson
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {sectionsList.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 px-4 py-10 text-center">
                  <BookOpen
                    size={28}
                    className="mx-auto mb-3 text-gray-300"
                  />
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
            {/* Checklist */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">
                Publish checklist
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Complete these items before publishing.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Title and subtitle",
                    complete: isBasicComplete,
                  },
                  {
                    label: "Description",
                    complete: isDescriptionComplete,
                  },
                  {
                    label: "Curriculum has 4 sections",
                    complete: sectionsList.length >= 4,
                  },
                  {
                    label: "Pricing set",
                    complete: isPricingComplete,
                  },
                  {
                    label: "Cover image uploaded",
                    complete: Boolean(imageName),
                  },
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

            {/* Cover image */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Cover image</h2>
              <p className="mt-1 text-sm text-gray-500">
                Choose a high-quality image to represent your course.
              </p>

              <label className="mt-4 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
                <UploadCloud
                  size={27}
                  className="mb-3 text-gray-400"
                />

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
                      window.alert("Please select an image smaller than 2 MB.");
                      e.target.value = "";
                      return;
                    }

                    setImageName(file.name);
                  }}
                />
              </label>
            </section>

            {/* Settings */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 font-semibold text-gray-900">Settings</h2>

              <div className="space-y-5">
                <Field label="Instructor">
                  <select
                    className={inputClass}
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                  >
                    <option>Suman Adhikari</option>
                    <option>Nirmala Pandey</option>
                    <option>Kiran Basnet</option>
                    <option>Rajan Tamang</option>
                  </select>
                </Field>

                <Field label="Visibility">
                  <select
                    className={inputClass}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Draft</option>
                    <option>In review</option>
                    <option>Published</option>
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
                          aria-label={`Remove ${item} tag`}
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

            {/* Summary */}
            <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                <Clock3 size={16} />
                Course summary
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
