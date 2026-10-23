"use client";

import { useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FolderTree,
  Plus,
  Search,
  X,
  Edit3,
  Trash2,
  Tag,
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Palette,
  Layers,
} from "lucide-react";
import {
  getAllCategories,
  saveCategory,
  deleteCategoryFromDb,
  type Category,
} from "@/app/lib/db/categories";

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [currentUserEmail] = useState(ADMIN_EMAILS[0]);
  const isAdminOrEnv = ADMIN_EMAILS.includes(currentUserEmail.toLowerCase());

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      Toast.fire({ icon: "error", title: "Failed to load categories." });
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      categories.filter((cat) =>
        `${cat.name} ${cat.slug} ${cat.description}`
          .toLowerCase()
          .includes(query.trim().toLowerCase())
      ),
    [categories, query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageCategories = filtered.slice(startIndex, startIndex + pageSize);

  // Helper function to turn a title into a URL-friendly slug
  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // CREATE / EDIT Modal with Auto-slug generation and Badge Color selection
  async function handleOpenCategoryModal(categoryToEdit?: Category) {
    if (!isAdminOrEnv) {
      Toast.fire({
        icon: "error",
        title: "Permission denied: Only admin/env emails can manage categories.",
      });
      return;
    }

    const isEditing = Boolean(categoryToEdit);
    const defaultColor = categoryToEdit?.color || "#6366f1";

    const { value: formValues } = await Swal.fire({
      title: `<div style="font-size: 20px; font-weight: 700; color: #1e293b;">${
        isEditing ? "Edit Category" : "Create New Category"
      }</div>`,
      html: `
        <div style="text-align: left; display: flex; flex-direction: column; gap: 16px; padding: 4px;">
          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">Category Name *</label>
            <input id="swal-input-name" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 14px;" placeholder="e.g. Artificial Intelligence" value="${
              categoryToEdit?.name || ""
            }">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">Slug (Auto-generated) *</label>
            <input id="swal-input-slug" class="swal2-input" style="margin: 0; width: 100%; box-sizing: border-box; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 14px; background-color: #f8fafc;" placeholder="e.g. artificial-intelligence" value="${
              categoryToEdit?.slug || ""
            }">
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">Description</label>
            <textarea id="swal-input-desc" class="swal2-textarea" style="margin: 0; width: 100%; box-sizing: border-box; height: 90px; border-radius: 10px; border: 1px solid #cbd5e1; font-size: 14px;" placeholder="Describe what this category contains...">${
              categoryToEdit?.description || ""
            }</textarea>
          </div>

          <div>
            <label style="display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">Badge & Theme Color</label>
            <div style="display: flex; align-items: center; gap: 12px;">
              <input id="swal-input-color" type="color" style="width: 50px; height: 42px; border: 1px solid #cbd5e1; border-radius: 10px; cursor: pointer; background: transparent; padding: 2px;" value="${defaultColor}">
              <span id="swal-color-label" style="font-size: 13px; font-family: monospace; color: #64748b;">${defaultColor}</span>
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: isEditing ? "Save Changes" : "Create Category",
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#64748b",
      didOpen: () => {
        const nameInput = document.getElementById("swal-input-name") as HTMLInputElement;
        const slugInput = document.getElementById("swal-input-slug") as HTMLInputElement;
        const colorInput = document.getElementById("swal-input-color") as HTMLInputElement;
        const colorLabel = document.getElementById("swal-color-label") as HTMLSpanElement;

        // Auto-generate slug as user types name (if not manually altered or if creating new)
        if (nameInput && slugInput) {
          nameInput.addEventListener("input", () => {
            if (!isEditing || slugInput.dataset.touched !== "true") {
              slugInput.value = generateSlug(nameInput.value);
            }
          });
          slugInput.addEventListener("input", () => {
            slugInput.dataset.touched = "true";
          });
        }

        if (colorInput && colorLabel) {
          colorInput.addEventListener("input", () => {
            colorLabel.textContent = colorInput.value;
          });
        }
      },
      preConfirm: () => {
        const name = (document.getElementById("swal-input-name") as HTMLInputElement)?.value.trim();
        const slug = (document.getElementById("swal-input-slug") as HTMLInputElement)?.value.trim();
        const description = (document.getElementById("swal-input-desc") as HTMLTextAreaElement)?.value.trim();
        const color = (document.getElementById("swal-input-color") as HTMLInputElement)?.value;

        if (!name || !slug) {
          Swal.showValidationMessage("Category name and slug are required.");
          return false;
        }

        return { name, slug, description, color };
      },
    });

    if (!formValues) return;

    try {
      const categoryId = categoryToEdit ? categoryToEdit.id : `cat_${Date.now()}`;
      const payload: Partial<Category> = {
        name: formValues.name,
        slug: formValues.slug,
        description: formValues.description,
        color: formValues.color,
        count: categoryToEdit ? categoryToEdit.count : 0,
        createdAt: categoryToEdit ? categoryToEdit.createdAt : new Date().toISOString(),
      };

      await saveCategory(categoryId, payload);

      if (isEditing) {
        setCategories((curr) =>
          curr.map((c) => (c.id === categoryId ? { ...c, ...payload } : c))
        );
      } else {
        setCategories((curr) => [{ id: categoryId, ...payload } as Category, ...curr]);
      }

      Toast.fire({
        icon: "success",
        title: isEditing ? "Category updated successfully." : "Category created successfully.",
      });
    } catch (error) {
      console.error("Failed to save category:", error);
      Toast.fire({ icon: "error", title: "Failed to save category." });
    }
  }

  // DELETE Category with SweetAlert2 confirmation
  async function handleDeleteCategory(category: Category) {
    if (!isAdminOrEnv) {
      Toast.fire({
        icon: "error",
        title: "Permission denied: Only admin/env emails can delete categories.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${category.name}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategoryFromDb(category.id);
      setCategories((curr) => curr.filter((c) => c.id !== category.id));
      Toast.fire({ icon: "success", title: "Category deleted successfully." });
    } catch (error) {
      console.error("Failed to delete category:", error);
      Toast.fire({ icon: "error", title: "Failed to delete category." });
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
      {/* Page Header */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-indigo-600">Categories</span>
            <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
              Role: {isAdminOrEnv ? "Admin (Full Access)" : "Restricted"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 sm:flex">
              <FolderTree size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Categories
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Organize courses, tutorials, and content into rich custom categories.
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => handleOpenCategoryModal()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus size={17} />
            Add category
          </button>
        </div>
      </header>

      {/* Stats Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Categories</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {categories.length}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <FolderTree size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Items Cataloged</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {categories.reduce((acc, c) => acc + (c.count || 0), 0)}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
              <Tag size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Database Status</p>
              <h2 className="mt-2 text-xl font-bold text-emerald-600 flex items-center gap-2">
                <CheckCircle2 size={20} /> Firestore Connected
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <Layers size={21} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Table Container */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <h2 className="font-bold text-slate-900">Category List</h2>
              <p className="mt-1 text-xs text-slate-500">
                Manage badges, slugs, and classification tags in real-time
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 sm:min-w-56">
                <Search size={16} className="shrink-0 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                <th className="px-5 py-4">Category Name</th>
                <th className="px-4 py-4">Slug URL</th>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Items Count</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageCategories.map((cat) => (
                <tr key={cat.id} className="transition hover:bg-slate-50/80">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-4 w-4 rounded-full shrink-0 shadow-sm ring-2 ring-white"
                        style={{ backgroundColor: cat.color || "#6366f1" }}
                      />
                      <strong className="text-sm font-semibold text-slate-800">
                        {cat.name}
                      </strong>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <code className="rounded bg-slate-100 px-2.5 py-1 text-xs text-slate-600 font-mono">
                      /{cat.slug}
                    </code>
                  </td>
                  <td className="px-4 py-4 max-w-xs truncate text-xs text-slate-500">
                    {cat.description || "No description provided"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `${cat.color || "#6366f1"}15`,
                        color: cat.color || "#6366f1",
                      }}
                    >
                      {cat.count || 0} items
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Edit category"
                        onClick={() => handleOpenCategoryModal(cat)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        title="Delete category"
                        onClick={() => handleDeleteCategory(cat)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <FolderTree size={21} />
                    </div>
                    <p className="font-semibold text-slate-800">No categories found</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try adjusting your search or create a new category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + pageSize, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">{filtered.length}</span> categories
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((c) => Math.max(1, c - 1))}
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
              onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}