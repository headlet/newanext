"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  Save,
  Package,
  ImagePlus,
  X,
  CircleDollarSign,
  Boxes,
} from "lucide-react";
import { createProductInDb } from "@/app/lib/db/products";
import { getAllCategories, type Category } from "@/app/lib/db/categories";

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

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function CreateProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("0");
  const [status, setStatus] = useState("Draft");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
        if (data.length > 0) {
          setCategory(data[0].name);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    loadCategories();
  }, []);

  function handleNameChange(val: string) {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  }

  function handleImage(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Toast.fire({ icon: "error", title: "Please select a valid image file." });
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      Toast.fire({ icon: "error", title: "Image size must be smaller than 3 MB." });
      return;
    }

    setImage(URL.createObjectURL(file));
    setImageName(file.name);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numericPrice = Number(price);
    const numericComparePrice = Number(comparePrice || 0);
    const numericStock = Number(stock);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      Toast.fire({ icon: "error", title: "Please enter a valid product price." });
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      Toast.fire({ icon: "error", title: "Stock must be a non-negative whole number." });
      return;
    }

    const product = {
      name: name.trim(),
      slug: slug.trim(),
      sku: sku.trim(),
      category,
      description: description.trim(),
      price: numericPrice,
      comparePrice: comparePrice ? numericComparePrice : null,
      stock: numericStock,
      status,
      image,
      imageName,
    };

    setSaving(true);
    try {
      await createProductInDb(product);
      Toast.fire({ icon: "success", title: "Product created successfully!" });
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Failed to create product:", error);
      Toast.fire({ icon: "error", title: "Failed to save product to database." });
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/products"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new product, set its pricing, slug, and manage inventory.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">
                  Basic information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the product name and its details.
                </p>

                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product name *
                      <input
                        required
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className={`${inputClass} mt-2`}
                        placeholder="e.g. Web Development Course"
                      />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                      Slug (Auto-generated) *
                      <input
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className={`${inputClass} mt-2 bg-gray-50 font-mono text-xs`}
                        placeholder="web-development-course"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      SKU *
                      <input
                        required
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className={`${inputClass} mt-2`}
                        placeholder="e.g. CRS-001"
                      />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                      Category *
                      <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`${inputClass} mt-2`}
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                        {categories.length === 0 && (
                          <option value="General">General</option>
                        )}
                      </select>
                    </label>
                  </div>

                  <label className="block text-sm font-medium text-gray-700">
                    Description
                    <textarea
                      rows={6}
                      maxLength={3000}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`${inputClass} mt-2 resize-y`}
                      placeholder="Describe the product, its features..."
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">Pricing</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Set the selling price and optional original price.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Selling price (NPR) *
                    <div className="relative mt-2">
                      <CircleDollarSign
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`${inputClass} pl-9`}
                        placeholder="0.00"
                      />
                    </div>
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Compare-at price (NPR)
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={comparePrice}
                      onChange={(e) => setComparePrice(e.target.value)}
                      className={`${inputClass} mt-2`}
                      placeholder="Optional original price"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">Inventory</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Track available stock for this product.
                </p>

                <div className="mt-5 max-w-sm">
                  <label className="block text-sm font-medium text-gray-700">
                    Available stock *
                    <div className="relative mt-2">
                      <Boxes
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        required
                        type="number"
                        min="0"
                        step="1"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </label>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Product image</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a clear image of the product.
                </p>

                <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-indigo-400 hover:bg-indigo-50/40">
                  {image ? (
                    <img
                      src={image}
                      alt="Product preview"
                      className="h-40 w-full rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <ImagePlus size={32} className="text-gray-400" />
                      <span className="mt-3 text-sm font-medium text-gray-700">
                        Click to upload
                      </span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => {
                      handleImage(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </label>

                {imageName && (
                  <div className="mt-3 flex items-center justify-between gap-2 text-xs text-gray-500">
                    <span className="truncate">{imageName}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setImage("");
                        setImageName("");
                      }}
                      className="inline-flex shrink-0 items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <X size={13} />
                      Remove
                    </button>
                  </div>
                )}
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">
                  Publishing settings
                </h2>

                <label className="mt-4 block text-sm font-medium text-gray-700">
                  Product status
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </label>
              </section>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {saving ? "Creating..." : "Create product"}
                </button>

                <Link
                  href="/admin/products"
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}