"use client";

import { useState, useEffect, type FormEvent } from "react";
import Swal from "sweetalert2";
import {
  getAllAboutSections,
  saveAboutSection,
  deleteAboutSectionFromDb,
  type AboutSection,
} from "@/app/lib/db/about";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  X,
  Building2,
  Sparkles,
  Layers,
  FileText,
  CheckCircle,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

// Dynamic import for react-quill-new to prevent SSR issues and React 19 findDOMNode errors
import dynamic from "next/dynamic";
const ReactQuill = dynamic(
  async () => {
    const RQ = await import("react-quill-new");
    return RQ;
  },
  {
    ssr: false,
    loading: () => (
      <p className="p-4 text-xs font-semibold text-slate-400">
        Loading editor...
      </p>
    ),
  },
);
import "react-quill-new/dist/quill.snow.css";

const SECTION_TYPES = [
  { key: "our_story", label: "Our Story & Background", icon: Building2 },
  { key: "mission_vision", label: "Mission & Vision", icon: Sparkles },
  { key: "values", label: "Core Values & Culture", icon: Layers },
  { key: "leadership", label: "Leadership & Team", icon: FileText },
  { key: "stats", label: "Milestones & Metrics", icon: CheckCircle },
];

// SweetAlert2 Toast Helper Mixin
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

export default function AdminAboutCrudPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [sectionKey, setSectionKey] =
    useState<AboutSection["sectionKey"]>("our_story");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badgeText, setBadgeText] = useState("About NewaNext");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileId, setImageFileId] = useState("");

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await getAllAboutSections();
      setSections(data);
    } catch (error) {
      console.error("Error fetching about sections:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to load sections from database.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const resetForm = () => {
    setSectionKey("our_story");
    setTitle("");
    setSubtitle("");
    setBadgeText("About NewaNext");
    setContent("");
    setImageUrl("");
    setImageFileId("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: AboutSection) => {
    setEditingId(item.id);
    setSectionKey(item.sectionKey || "our_story");
    setTitle(item.title || "");
    setSubtitle(item.subtitle || "");
    setBadgeText(item.badgeText || "About NewaNext");
    setContent(item.content || "");
    setImageUrl(item.imageUrl || "");
    setImageFileId(item.imageFileId || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      Toast.fire({
        icon: "warning",
        title: "Please provide a title for this section.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const recordId = editingId || `${sectionKey}_${Date.now()}`;

      const payload: Partial<AboutSection> = {
        id: recordId,
        sectionKey,
        title,
        subtitle,
        badgeText,
        content,
        imageUrl,
        imageFileId,
        createdAt: editingId
          ? sections.find((s) => s.id === editingId)?.createdAt ||
            new Date().toISOString()
          : new Date().toISOString(),
      };

      await saveAboutSection(recordId, payload);
      await fetchSections();
      resetForm();

      Toast.fire({
        icon: "success",
        title: editingId
          ? "Section updated successfully!"
          : "New section published!",
      });
    } catch (error) {
      console.error("Error saving about section:", error);
      Toast.fire({
        icon: "error",
        title: "Error saving changes. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SweetAlert2 Deletion Dialog
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This section block will be permanently removed from your About page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-3xl shadow-2xl font-sans",
        confirmButton: "rounded-xl font-bold px-5 py-2.5",
        cancelButton: "rounded-xl font-bold px-5 py-2.5",
      },
    });

    if (result.isConfirmed) {
      try {
        await deleteAboutSectionFromDb(id);
        setSections((prev) => prev.filter((item) => item.id !== id));

        Toast.fire({
          icon: "success",
          title: "Section deleted successfully.",
        });
      } catch (error) {
        console.error("Error deleting record:", error);
        Toast.fire({
          icon: "error",
          title: "Failed to delete section.",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles size={14} />
            <span>Frontend CMS Architecture</span>
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            About Page Management
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-slate-500">
            Configure your company profile, mission, core values, and team
            details with rich text formatting and ImageKit CDN assets.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:opacity-95 active:scale-95"
        >
          <Plus size={18} />
          <span>Add Section Block</span>
        </button>
      </div>

      {/* Grid of Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.length === 0 ? (
          <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Building2 size={26} />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-800">
              No About Content Found
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Get started by creating your first content module.
            </p>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow"
            >
              <Plus size={15} /> Create First Block
            </button>
          </div>
        ) : (
          sections.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-xl"
            >
              <div>
                {item.imageUrl && (
                  <div className="relative mb-4 h-44 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                    {item.badgeText || "Section"}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    {item.sectionKey}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-black tracking-tight text-slate-900">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="mt-1 text-xs font-medium text-indigo-600">
                    {item.subtitle}
                  </p>
                )}

                <div
                  className="prose prose-indigo mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600"
                  dangerouslySetInnerHTML={{
                    __html: item.content || "<p>No description provided.</p>",
                  }}
                />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[11px] font-medium text-slate-400">
                  {item.updatedAt
                    ? new Date(item.updatedAt).toLocaleDateString()
                    : "Just now"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <Pencil size={13} className="text-indigo-600" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/50 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rich Interactive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  CMS Editor
                </span>
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  {editingId
                    ? "Edit About Section Block"
                    : "Create About Section Block"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-2xl border border-slate-200 p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Section Module Type *
                </label>
                <select
                  value={sectionKey}
                  onChange={(e) => setSectionKey(e.target.value as any)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                >
                  {SECTION_TYPES.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Empowering Innovation in Nepal"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Badge / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="e.g. WHO WE ARE"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Subtitle / Catchy Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Building custom software and career-ready developer paths."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Detailed Content (Rich Text Editor)
                </label>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Write your detailed section narrative here..."
                    className="mb-12 h-48 sm:mb-10"
                  />
                </div>
              </div>

              <ImageUpload
                folder="/about"
                value={imageUrl}
                fileId={imageFileId}
                onChange={(url, newFileId) => {
                  setImageUrl(url);
                  setImageFileId(newFileId);
                }}
                onRemove={() => {
                  setImageUrl("");
                  setImageFileId("");
                }}
              />

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:opacity-95 disabled:opacity-60"
                >
                  {isSubmitting && (
                    <Loader2 size={18} className="animate-spin" />
                  )}
                  <span>{editingId ? "Save Changes" : "Publish Section"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
