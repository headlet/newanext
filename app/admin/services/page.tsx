"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Code2,
  Palette,
  Smartphone,
  SearchCheck,
  Cloud,
  Megaphone,
  Layers,
  Loader2,
} from "lucide-react";
import { getAllServices, deleteServiceFromDb, type Service } from "@/app/lib/db/service";

const iconMap = {
  code: Code2,
  design: Palette,
  mobile: Smartphone,
  seo: SearchCheck,
  cloud: Cloud,
  marketing: Megaphone,
};

const money = (price: number | null) =>
  price === null
    ? "Contact us"
    : new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency: "NPR",
        maximumFractionDigits: 0,
      }).format(price);

// Toast notification helper
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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to load services from database.",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        const matchesSearch =
          `${service.title} ${service.description} ${service.category}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory =
          category === "All" || service.category === category;

        const matchesStatus =
          status === "All" || service.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
      }),
    [services, search, category, status],
  );

  async function deleteService(id: string, title: string) {
    // Delete uses SWAL modal confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteServiceFromDb(id);
      setServices((current) => current.filter((service) => service.id !== id));
      Toast.fire({
        icon: "success",
        title: "Service deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete service:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to delete service from database.",
      });
    }
  }

  const published = services.filter(
    (service) => service.status === "Published",
  ).length;
  const drafts = services.filter(
    (service) => service.status === "Draft",
  ).length;
  const categories = new Set(services.map((service) => service.category)).size;

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your services, pricing, and publication status.
            </p>
          </div>

          <Link
            href="/admin/services/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add service
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total services",
              value: services.length,
              icon: Layers,
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "Published",
              value: published,
              icon: Eye,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Drafts",
              value: drafts,
              icon: Code2,
              color: "bg-amber-50 text-amber-600",
            },
            {
              label: "Categories",
              value: categories,
              icon: Palette,
              color: "bg-violet-50 text-violet-600",
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
                <p className="mt-3 text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Cloud & IT">Cloud & IT</option>
              <option value="Consulting">Consulting</option>
              <option value="Other">Other</option>
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

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon =
                iconMap[service.icon as keyof typeof iconMap] ?? Code2;

              return (
                <article
                  key={service.id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:border-indigo-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon size={23} />
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        service.status === "Published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-medium text-indigo-600">
                    {service.category}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="mt-2 min-h-12 text-sm leading-5 text-gray-500">
                    {service.description}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-500">
                      {service.pricingType === "Custom"
                        ? "Pricing"
                        : service.pricingType === "Fixed"
                          ? "Fixed price"
                          : "Starting at"}
                    </p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {service.pricingType === "Custom"
                        ? "Contact us"
                        : money(service.price)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-1 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      title="Preview service"
                      onClick={() =>
                        Swal.fire({
                          title: service.title,
                          text: service.description,
                          confirmButtonColor: "#4f46e5",
                        })
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                    >
                      <Eye size={16} />
                    </button>

                    <Link
                      href={`/admin/services/create?edit=${service.id}`}
                      title="Edit service"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                    >
                      <Pencil size={16} />
                    </Link>

                    <button
                      type="button"
                      title="Delete service"
                      onClick={() => deleteService(service.id, service.title)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              );
            })}

            {filteredServices.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <Layers
                  size={38}
                  className="mx-auto text-gray-300"
                />
                <p className="mt-3 font-medium text-gray-700">
                  No services found
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Showing {filteredServices.length} of {services.length} services
          </div>
        </div>
      </div>
    </div>
  );
}