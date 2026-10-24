"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  Save,
  CircleDollarSign,
  Boxes,
  Loader2,
} from "lucide-react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/app/lib/firebase";
import { getAllCategories, type Category } from "@/app/lib/db/categories";
import { updateProductInDb } from "@/app/lib/db/products";
import ImageUpload from "@/components/ImageUpload"; // ImageKit Component

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

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

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

  // ImageKit states
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileId, setImageFileId] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch product and categories on mount
  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const db = getFirestore(getFirebaseApp());
        const [docSnap, catsData] = await Promise.all([
          getDoc(doc(db, "products", productId)),
          getAllCategories(),
        ]);

        setCategories(catsData);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setSlug(data.slug || "");
          setSku(data.sku || "");
          setCategory(data.category || (catsData[0]?.name ?? "General"));
          setDescription(data.description || "");
          setPrice(String(data.price ?? ""));
          setComparePrice(data.comparePrice ? String(data.comparePrice) : "");
          setStock(String(data.stock ?? "0"));
          setStatus(data.status || "Draft");
          setImageUrl(data.imageUrl || data.image || "");
          setImageFileId(data.imageFileId || "");
        } else {
          Toast.fire({ icon: "error", title: "Product not found." });
          router.push("/admin/products");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        Toast.fire({ icon: "error", title: "Failed to load product details." });
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      initData();
    }
  }, [productId, router]);

  // Auto-generate slug when name changes
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numericPrice = Number(price);
    const numericComparePrice = Number(comparePrice || 0);
    const numericStock = Number(stock);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      Toast.fire({
        icon: "error",
        title: "Please enter a valid product price.",
      });
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      Toast.fire({
        icon: "error",
        title: "Stock must be a non-negative whole number.",
      });
      return;
    }

    const updatedProduct = {
      name: name.trim(),
      slug: slug.trim(),
      sku: sku.trim(),
      category,
      description: description.trim(),
      price: numericPrice,
      comparePrice: comparePrice ? numericComparePrice : null,
      stock: numericStock,
      status,
      imageUrl,
      imageFileId,
      imageFolder: "/products",
    };

    setSaving(true);
    try {
      await updateProductInDb(productId, updatedProduct);

      Toast.fire({ icon: "success", title: "Product updated successfully!" });
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Failed to update product:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to update product in database.",
      });
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={36} />
      </div>
    );
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
          <h1 className="text-2xl font-bold text-gray-900">Edit product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Update product details, pricing, slug, and inventory status.
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
                  Enter the product name, SKU, and its details.
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
                  Set the selling price and optional compare-at price.
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
              <ImageUpload
                folder="/products"
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
                  {saving ? "Saving..." : "Save changes"}
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
