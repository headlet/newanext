
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Code2,
  ImagePlus,
  X,
  Plus,
  Layers,
  Palette,
  Smartphone,
  SearchCheck,
  Cloud,
  Megaphone,
} from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const serviceIcons = [
  { label: "Development", icon: Code2 },
  { label: "Design", icon: Palette },
  { label: "Mobile", icon: Smartphone },
  { label: "SEO", icon: SearchCheck },
  { label: "Cloud", icon: Cloud },
  { label: "Marketing", icon: Megaphone },
];

const money = (price: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CreateServicePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [pricingType, setPricingType] = useState("Starting at");
  const [status, setStatus] = useState("Draft");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [saving, setSaving] = useState(false);

  function addFeature() {
    const value = featureInput.trim();

    if (
      value &&
      !features.some((feature) => feature.toLowerCase() === value.toLowerCase())
    ) {
      setFeatures((current) => [...current, value]);
      setFeatureInput("");
    }
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pricingType !== "Custom") {
      const amount = Number(price);

      if (price.trim() === "" || !Number.isFinite(amount) || amount < 0) {
        window.alert("Please enter a valid service price.");
        return;
      }
    }

    const service = {
      title: title.trim(),
      category,
      description: description.trim(),
      price: pricingType === "Custom" ? null : Number(price),
      pricingType,
      status,
      features,
      image,
      imageName,
    };

    setSaving(true);
    console.log("Service form data:", service);

    window.setTimeout(() => {
      setSaving(false);
      window.alert(
        "Service form validated. Connect this form to your API to save the service.",
      );
    }, 400);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/services"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to services
        </Link>

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create service
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a service, describe its benefits, and configure pricing.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              window.alert(
                `${title || "Untitled service"}\n\n${description || "No description added."}`,
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
                  Service information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Describe what your business offers to customers.
                </p>

                <div className="mt-5 space-y-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Service title *
                    <input
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`${inputClass} mt-2`}
                      placeholder="e.g. Web Development"
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
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Cloud & IT">Cloud & IT</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
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
                      placeholder="Describe the service, its benefits, and the problems it solves..."
                    />
                    <span className="mt-1 block text-right text-xs font-normal text-gray-400">
                      {description.length}/2000 characters
                    </span>
                  </label>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-900">
                  Pricing and features
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Set the pricing model and list the service deliverables.
                </p>

                <div className="mt-5 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pricing model *
                      <select
                        value={pricingType}
                        onChange={(e) => setPricingType(e.target.value)}
                        className={`${inputClass} mt-2`}
                      >
                        <option value="Starting at">Starting at</option>
                        <option value="Fixed">Fixed price</option>
                        <option value="Custom">Custom quotation</option>
                      </select>
                    </label>

                    {pricingType !== "Custom" && (
                      <label className="block text-sm font-medium text-gray-700">
                        Price (NPR) *
                        <input
                          required
                          type="number"
                          min="0"
                          step="0.01"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className={`${inputClass} mt-2`}
                          placeholder="e.g. 25000"
                        />
                      </label>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      What&apos;s included?
                    </label>

                    <div className="mt-2 flex gap-2">
                      <input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addFeature();
                          }
                        }}
                        className={inputClass}
                        placeholder="e.g. Responsive design"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-700"
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>

                    <div className="mt-3 space-y-2">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
                        >
                          <span className="break-words">{feature}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${feature}`}
                            onClick={() =>
                              setFeatures((current) =>
                                current.filter((item) => item !== feature),
                              )
                            }
                            className="shrink-0 text-gray-400 hover:text-red-600"
                          >
                            <X size={15} />
                          </button>
                        </div>
                      ))}

                      {features.length === 0 && (
                        <p className="text-xs text-gray-400">
                          No features added yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-gray-900">Service image</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose an image to represent this service.
                </p>

                <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:border-indigo-400 hover:bg-indigo-50/40">
                  {image ? (
                    <img
                      src={image}
                      alt="Service preview"
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
                  Service status
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
                  Draft services are not ready for public display.
                </p>
              </section>

              <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                  <Layers size={17} />
                  Service summary
                </h2>

                <div className="mt-4 flex size-12 items-center justify-center rounded-xl bg-white text-indigo-600">
                  {category === "Design" ? (
                    <Palette size={23} />
                  ) : category === "Marketing" ? (
                    <Megaphone size={23} />
                  ) : category === "Cloud & IT" ? (
                    <Cloud size={23} />
                  ) : category === "Mobile" ? (
                    <Smartphone size={23} />
                  ) : (
                    <Code2 size={23} />
                  )}
                </div>

                <p className="mt-3 break-words font-semibold text-gray-900">
                  {title || "Service title"}
                </p>
                <p className="mt-1 text-xs text-gray-500">{category}</p>

                <div className="mt-4 border-t border-indigo-100 pt-4">
                  <p className="text-xs text-gray-500">Pricing</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {pricingType === "Custom"
                      ? "Contact us"
                      : price !== "" && Number(price) >= 0
                        ? money(Number(price))
                        : money(0)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{pricingType}</p>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Features</span>
                  <span className="font-medium text-gray-900">
                    {features.length}
                  </span>
                </div>

                <span
                  className={`mt-4 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                    status === "Published"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {status}
                </span>
              </section>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />
                  {saving ? "Creating..." : "Create service"}
                </button>

                <Link
                  href="/admin/services"
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
