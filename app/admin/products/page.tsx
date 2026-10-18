
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Package,
  Boxes,
  CircleDollarSign,
  AlertTriangle,
} from "lucide-react";

type ProductStatus = "Published" | "Draft";

type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Web Development Course",
    sku: "CRS-001",
    category: "Courses",
    price: 4999,
    stock: 35,
    status: "Published",
    image: "",
  },
  {
    id: 2,
    name: "Programming Handbook",
    sku: "BK-001",
    category: "Books",
    price: 1200,
    stock: 18,
    status: "Published",
    image: "",
  },
  {
    id: 3,
    name: "UI/UX Design Masterclass",
    sku: "CRS-002",
    category: "Courses",
    price: 2999,
    stock: 0,
    status: "Draft",
    image: "",
  },
  {
    id: 4,
    name: "Developer Starter Kit",
    sku: "KIT-001",
    category: "Accessories",
    price: 2500,
    stock: 8,
    status: "Published",
    image: "",
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch =
          `${product.name} ${product.sku} ${product.category}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" || product.category === category;

        const matchesStatus = status === "All" || product.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
      }),
    [products, search, category, status],
  );

  function deleteProduct(id: number) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((current) => current.filter((product) => product.id !== id));
    }
  }

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );
  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your products, pricing, inventory, and publication status.
            </p>
          </div>

          <Link
            href="/admin/products/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add product
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total products",
              value: products.length,
              icon: Package,
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "Inventory value",
              value: money(inventoryValue),
              icon: CircleDollarSign,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Low stock",
              value: lowStock,
              icon: AlertTriangle,
              color: "bg-amber-50 text-amber-600",
            },
            {
              label: "Out of stock",
              value: outOfStock,
              icon: Boxes,
              color: "bg-red-50 text-red-600",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <span className={`rounded-lg p-2 ${stat.color}`}>
                    <Icon size={19} />
                  </span>
                </div>
                <p className="mt-3 break-words text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name or SKU..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All categories</option>
              <option value="Courses">Courses</option>
              <option value="Books">Books</option>
              <option value="Accessories">Accessories</option>
              <option value="Software">Software</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Product</th>
                  <th className="px-5 py-4 font-medium">SKU</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Stock</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-indigo-50 text-indigo-500">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500">{product.sku}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {money(product.price)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={
                          product.stock === 0
                            ? "font-medium text-red-600"
                            : product.stock <= 10
                              ? "font-medium text-amber-600"
                              : "text-gray-700"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.status === "Published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/create?edit=${product.id}`}
                          title="Edit product"
                          className="rounded-lg p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          type="button"
                          title="Delete product"
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center text-gray-500"
                    >
                      <Package className="mx-auto mb-3 text-gray-300" size={36} />
                      No products found. Try changing your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-3 text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>
    </div>
  );
}
