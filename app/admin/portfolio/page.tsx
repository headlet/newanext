
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ExternalLink,
  BriefcaseBusiness,
  FolderOpen,
  Globe,
  MoreHorizontal,
} from "lucide-react";

type ProjectStatus = "Published" | "Draft";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  date: string;
  image: string;
};

const initialProjects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "An online shopping platform with product and order management.",
    technologies: ["Laravel", "React", "PostgreSQL"],
    status: "Published",
    date: "Oct 12, 2026",
    image: "",
  },
  {
    id: 2,
    title: "School Management System",
    category: "Web Application",
    description: "A system for managing students, teachers, and academic records.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS"],
    status: "Published",
    date: "Oct 08, 2026",
    image: "",
  },
  {
    id: 3,
    title: "Learning Management App",
    category: "Mobile Application",
    description: "A learning platform for students and instructors.",
    technologies: ["Flutter", "Firebase"],
    status: "Draft",
    date: "Oct 02, 2026",
    image: "",
  },
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesSearch =
          `${project.title} ${project.description} ${project.category}`
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || project.status === statusFilter;

        const matchesCategory =
          categoryFilter === "All" || project.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
      }),
    [projects, search, statusFilter, categoryFilter],
  );

  function deleteProject(id: number) {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((current) => current.filter((project) => project.id !== id));
    }
  }

  const published = projects.filter((p) => p.status === "Published").length;
  const drafts = projects.filter((p) => p.status === "Draft").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your projects and showcase your work.
            </p>
          </div>

          <Link
            href="/admin/portfolio/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add project
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total projects",
              value: projects.length,
              icon: BriefcaseBusiness,
              color: "bg-indigo-50 text-indigo-600",
            },
            {
              label: "Published",
              value: published,
              icon: Globe,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Drafts",
              value: drafts,
              icon: FolderOpen,
              color: "bg-amber-50 text-amber-600",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
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
                placeholder="Search projects..."
                className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Web Application">Web Application</option>
              <option value="Mobile Application">Mobile Application</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
            >
              <option value="All">All statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-xl border border-gray-200 transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-indigo-100 via-violet-50 to-sky-100">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BriefcaseBusiness size={42} className="text-indigo-300" />
                  )}

                  <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      project.status === "Published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium text-indigo-600">
                    {project.category}
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-gray-900">
                    {project.title}
                  </h2>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-400">
                      Updated {project.date}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        title="Preview project"
                        onClick={() =>
                          window.alert(
                            `${project.title}\n\n${project.description}`,
                          )
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        href={`/admin/portfolio/create?edit=${project.id}`}
                        title="Edit project"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        title="Delete project"
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <FolderOpen className="mx-auto text-gray-300" size={38} />
                <p className="mt-3 font-medium text-gray-700">
                  No projects found
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>
    </div>
  );
}
