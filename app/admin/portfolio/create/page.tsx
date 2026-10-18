
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  ImagePlus,
  X,
  Plus,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function CreatePortfolioPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [technologyInput, setTechnologyInput] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [status, setStatus] = useState("Draft");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");

  function addTechnology() {
    const value = technologyInput.trim();

    if (
      value &&
      !technologies.some((item) => item.toLowerCase() === value.toLowerCase())
    ) {
      setTechnologies((current) => [...current, value]);
      setTechnologyInput("");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const project = {
      title,
      category,
      description,
      technologies,
      projectUrl,
      githubUrl,
      status,
      image,
    };

    console.log("Portfolio project:", project);
    window.alert(
      "Portfolio form validated. Connect this form to your API to save the project.",
    );
  }

  function handleImage(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      window.alert("Please select an image smaller than 3 MB.");
      return;
    }

    setImage(URL.createObjectURL(file));
    setImageName(file.name);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/portfolio"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create portfolio project
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a project to showcase your work and experience.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert(
                `${title || "Untitled project"}\n\n${description || "No description added."}`,
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Eye size={16} />
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">
                  Project information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Provide the essential information about your project.
                </p>

                <div className="mt-5 space-y-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Project title *
                    <input
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`${inputClass} mt-2`}
                      placeholder="e.g. E-commerce Platform"
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
                      <option>Web Development</option>
                      <option>Web Application</option>
                      <option>Mobile Application</option>
                      <option>UI/UX Design</option>
                      <option>Desktop Application</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    Description *
                    <textarea
                      required
                      rows={6}
                      maxLength={2000}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`${inputClass} mt-2 resize-y`}
                      placeholder="Explain the project's purpose, features, and your contribution..."
                    />
                    <span className="mt-1 block text-right text-xs font-normal text-gray-400">
                      {description.length}/2000
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Technologies used
                    </label>

                    <div className="mt-2 flex gap-2">
                      <input
                        value={technologyInput}
                        onChange={(e) => setTechnologyInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTechnology();
                          }
                        }}
                        className={inputClass}
                        placeholder="e.g. Laravel"
                      />
                      <button
                        type="button"
                        onClick={addTechnology}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {technologies.map((technology) => (
                        <span
                          key={technology}
                          className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700"
                        >
                          {technology}
                          <button
                            type="button"
                            aria-label={`Remove ${technology}`}
                            onClick={() =>
                              setTechnologies((current) =>
                                current.filter((item) => item !== technology),
                              )
                            }
                          >
                            <X size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">
                  Project links
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Link to the live project and source code, if available.
                </p>

                <div className="mt-5 space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Live project URL
                    <div className="relative mt-2">
                      <Globe
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="url"
                        value={projectUrl}
                        onChange={(e) => setProjectUrl(e.target.value)}
                        className={`${inputClass} pl-9`}
                        placeholder="https://example.com"
                      />
                    </div>
                  </label>

                  <label className="block text-sm font-medium text-gray-700">
                    GitHub repository URL
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className={`${inputClass} mt-2`}
                      placeholder="https://github.com/username/project"
                    />
                  </label>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Project image</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a thumbnail or project cover image.
                </p>

                <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-indigo-400 hover:bg-indigo-50/40">
                  {image ? (
                    <img
                      src={image}
                      alt="Project preview"
                      className="h-40 w-full rounded-md object-cover"
                    />
                  ) : (
                    <>
                      <ImagePlus size={32} className="text-gray-400" />
                      <span className="mt-3 text-sm font-medium text-gray-700">
                        Click to upload image
                      </span>
                      <span className="mt-1 text-xs text-gray-400">
                        PNG, JPG or WebP · Max 3 MB
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
                      className="shrink-0 text-red-600 hover:text-red-700"
                    >
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
                  Project status
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </label>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Draft projects remain unpublished until you are ready.
                </p>
              </section>

              <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
                <h3 className="text-sm font-semibold text-indigo-900">
                  <BriefcaseBusiness className="mr-2 inline" size={16} />
                  Project summary
                </h3>
                <p className="mt-3 break-words text-sm font-medium text-gray-800">
                  {title || "Your project title"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {category} · {technologies.length} technologies
                </p>
                <span className="mt-3 inline-block rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                  {status}
                </span>
              </section>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Save size={16} />
                  Create project
                </button>

                <Link
                  href="/admin/portfolio"
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
