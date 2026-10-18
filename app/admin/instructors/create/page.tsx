
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Save,
  UserPlus,
  X,
  CircleCheck,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  GraduationCap,
  Globe,
  Plus,
  ShieldCheck,
  MapPin,
} from "lucide-react";

type InstructorStatus = "Active" | "Pending" | "Inactive";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-normal text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

function Button({
  children,
  variant = "primary",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
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

function SectionHeading({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
        {number}
      </span>
      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default function CreateInstructorPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [headline, setHeadline] = useState("");
  const [biography, setBiography] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("1");
  const [location, setLocation] = useState("Kathmandu, Nepal");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [status, setStatus] = useState<InstructorStatus>("Pending");
  const [verified, setVerified] = useState(false);
  const [sendInvitation, setSendInvitation] = useState(true);
  const [expertise, setExpertise] = useState([
    "Web Development",
    "JavaScript",
  ]);
  const [newExpertise, setNewExpertise] = useState("");
  const [saving, setSaving] = useState(false);

  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const checklist = [
    {
      label: "Full name provided",
      complete: Boolean(firstName.trim() && lastName.trim()),
    },
    { label: "Valid email address", complete: validEmail },
    { label: "Professional headline", complete: Boolean(headline.trim()) },
    { label: "Biography added", complete: Boolean(biography.trim()) },
    { label: "Expertise selected", complete: expertise.length > 0 },
    { label: "Profile photo uploaded", complete: Boolean(imageName) },
  ];

  const completedItems = checklist.filter((item) => item.complete).length;

  function addExpertise() {
    const value = newExpertise.trim();

    if (
      !value ||
      expertise.some((item) => item.toLowerCase() === value.toLowerCase())
    ) {
      return;
    }

    setExpertise((current) => [...current, value]);
    setNewExpertise("");
  }

  function handleImage(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      window.alert("Please select an image smaller than 2 MB.");
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  function saveInstructor() {
    if (!firstName.trim() || !lastName.trim() || !validEmail) {
      window.alert(
        "Please enter the instructor's first name, last name, and a valid email address.",
      );
      return;
    }

    setSaving(true);

    const instructor = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      headline: headline.trim(),
      biography: biography.trim(),
      qualification,
      experience: Number(experience),
      location,
      website,
      linkedin,
      github,
      expertise,
      status,
      verified,
      sendInvitation,
      imageName,
    };

    console.log("Instructor form data:", instructor);

    window.setTimeout(() => {
      setSaving(false);
      window.alert(
        "Instructor details validated. Connect this form to your API to save the instructor permanently.",
      );
    }, 400);
  }

  function previewInstructor() {
    if (!firstName.trim() && !lastName.trim()) {
      window.alert("Enter an instructor name to preview the profile.");
      return;
    }

    window.alert(
      `Profile preview\n\n${fullName}\n${headline || "No headline added"}\n${email || "No email added"}\n\nConnect this action to a profile preview page for a full preview.`,
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px]">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin/instructors"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            All instructors
          </Link>

          <div className="text-sm text-gray-400">
            <Link
              href="/admin/instructors"
              className="transition hover:text-indigo-600"
            >
              Instructors
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Add instructor</span>
          </div>
        </div>

        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Add instructor
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create an instructor profile, define expertise, and configure
              account settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" onClick={previewInstructor}>
              <Eye size={16} />
              Preview
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                window.alert(
                  "Draft saving requires connecting this form to your API or local storage.",
                )
              }
            >
              <Save size={16} />
              Save draft
            </Button>

            <Button onClick={saveInstructor}>
              <UserPlus size={16} />
              {saving ? "Creating..." : "Create instructor"}
            </Button>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-6">
            {/* Basic information */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                number={1}
                title="Basic information"
                description="Enter the instructor's personal and contact information."
              />

              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="First name *">
                    <input
                      className={inputClass}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Suman"
                      autoComplete="given-name"
                      required
                    />
                  </Field>

                  <Field label="Last name *">
                    <input
                      className={inputClass}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Adhikari"
                      autoComplete="family-name"
                      required
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Email address *">
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        className={`${inputClass} pl-9`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="instructor@example.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </Field>

                  <Field label="Phone number">
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        className={`${inputClass} pl-9`}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98XXXXXXXX"
                        autoComplete="tel"
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Location">
                  <input
                    className={inputClass}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                  />
                </Field>
              </div>
            </section>

            {/* Professional profile */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                number={2}
                title="Professional profile"
                description="Introduce the instructor and highlight their experience."
              />

              <div className="space-y-5">
                <Field label="Professional headline *">
                  <input
                    className={inputClass}
                    value={headline}
                    maxLength={160}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Developer & Educator"
                  />
                  <span className="-mt-1 text-xs font-normal text-gray-400">
                    {headline.length}/160 characters
                  </span>
                </Field>

                <Field label="Biography">
                  <textarea
                    className={`${inputClass} min-h-36 resize-y`}
                    rows={5}
                    value={biography}
                    maxLength={2000}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Describe the instructor's background, teaching approach, and achievements..."
                  />
                  <span className="-mt-1 text-xs font-normal text-gray-400">
                    {biography.length}/2000 characters
                  </span>
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Highest qualification">
                    <div className="relative">
                      <GraduationCap
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <select
                        className={`${inputClass} pl-9`}
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                      >
                        <option value="">Select qualification</option>
                        <option>High School</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                        <option>PhD</option>
                        <option>Professional Certification</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </Field>

                  <Field label="Teaching experience">
                    <select
                      className={inputClass}
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      <option value="0">Less than 1 year</option>
                      <option value="1">1–2 years</option>
                      <option value="3">3–5 years</option>
                      <option value="6">6–10 years</option>
                      <option value="10">10+ years</option>
                    </select>
                  </Field>
                </div>
              </div>
            </section>

            {/* Expertise */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                number={3}
                title="Expertise and subjects"
                description="Add the subjects and skills this instructor can teach."
              />

              <div className="space-y-4">
                <Field label="Expertise tags">
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 p-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                    {expertise.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700"
                      >
                        {item}
                        <button
                          type="button"
                          aria-label={`Remove ${item}`}
                          onClick={() =>
                            setExpertise((old) =>
                              old.filter((value) => value !== item),
                            )
                          }
                          className="rounded hover:text-red-600"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}

                    <input
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addExpertise();
                        }
                      }}
                      className="min-w-32 flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-gray-400"
                      placeholder="Type a subject and press Enter"
                    />

                    <button
                      type="button"
                      onClick={addExpertise}
                      aria-label="Add expertise"
                      className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </Field>

                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    Suggested subjects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Laravel",
                      "React",
                      "Next.js",
                      "Python",
                      "Data Science",
                      "UI/UX Design",
                      "Flutter",
                      "Cloud Computing",
                    ].map((item) => {
                      const added = expertise.some(
                        (value) => value.toLowerCase() === item.toLowerCase(),
                      );

                      return (
                        <button
                          key={item}
                          type="button"
                          disabled={added}
                          onClick={() => setExpertise((old) => [...old, item])}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:cursor-default disabled:bg-gray-50 disabled:text-gray-400"
                        >
                          {added ? "✓ " : "+ "}
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Online presence */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <SectionHeading
                number={4}
                title="Online presence"
                description="Link the instructor's professional website and social profiles."
              />

              <div className="space-y-4">
                <Field label="Personal website">
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      className={`${inputClass} pl-9`}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </Field>

                <Field label="LinkedIn profile">
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      className={`${inputClass} pl-9`}
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </Field>

                <Field label="GitHub profile">
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      className={`${inputClass} pl-9`}
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </Field>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 xl:sticky xl:top-6">
            {/* Profile checklist */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-900">
                  Profile checklist
                </h2>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  {completedItems}/{checklist.length}
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{
                    width: `${(completedItems / checklist.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Complete these details for a stronger instructor profile.
              </p>

              <div className="mt-5 space-y-4">
                {checklist.map((item) => (
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

            {/* Profile photo */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Profile photo</h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload a clear, professional instructor photo.
              </p>

              <label className="mt-4 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Instructor profile preview"
                    className="mb-3 size-24 rounded-full border-4 border-white object-cover shadow-sm"
                  />
                ) : (
                  <div className="mb-3 flex size-20 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <UserRound size={32} />
                  </div>
                )}

                <strong className="max-w-full break-words text-sm font-medium text-gray-700">
                  {imageName || "Upload profile photo"}
                </strong>

                <span className="mt-2 text-xs text-gray-400">
                  JPG, PNG or WebP · Under 2 MB
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(e) => {
                    handleImage(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </label>

              {imageName && (
                <button
                  type="button"
                  onClick={() => {
                    if (imagePreview) URL.revokeObjectURL(imagePreview);
                    setImageName("");
                    setImagePreview("");
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                >
                  <X size={13} />
                  Remove photo
                </button>
              )}
            </section>

            {/* Account settings */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Account settings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Configure the instructor's access and account status.
              </p>

              <div className="mt-5 space-y-5">
                <Field label="Account status">
                  <select
                    className={inputClass}
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as InstructorStatus)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </Field>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={sendInvitation}
                      onChange={(e) => setSendInvitation(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-gray-300 accent-indigo-600"
                    />
                    <span>
                      <span className="block font-medium text-gray-800">
                        Send invitation email
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-gray-500">
                        Invite the instructor to set up their account.
                      </span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={verified}
                      onChange={(e) => setVerified(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-gray-300 accent-indigo-600"
                    />
                    <span>
                      <span className="block font-medium text-gray-800">
                        Verify instructor
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-gray-500">
                        Mark the instructor's profile as verified.
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* Live profile preview */}
            <section className="overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-6 text-center text-white">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt=""
                    className="mx-auto size-20 rounded-full border-4 border-white/30 object-cover"
                  />
                ) : (
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/15 text-2xl font-bold">
                    {(firstName[0] || "I").toUpperCase()}
                    {(lastName[0] || "").toUpperCase()}
                  </div>
                )}

                <h3 className="mt-3 break-words text-lg font-bold">
                  {fullName || "Instructor name"}
                </h3>
                <p className="mt-1 break-words text-xs text-indigo-100">
                  {headline || "Professional headline"}
                </p>

                {verified && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
                    <ShieldCheck size={13} />
                    Verified instructor
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BriefcaseBusiness size={15} />
                  {experience === "0"
                    ? "Less than 1 year"
                    : `${experience}+ years of experience`}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={15} className="shrink-0" />
                  <span className="truncate">
                    {location || "Location not set"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {expertise.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      {item}
                    </span>
                  ))}

                  {expertise.length > 4 && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                      +{expertise.length - 4}
                    </span>
                  )}

                  {expertise.length === 0 && (
                    <span className="text-xs text-gray-400">
                      No expertise added yet
                    </span>
                  )}
                </div>
              </div>
            </section>

            {/* Quick summary */}
            <section className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
                <UserPlus size={16} />
                Instructor summary
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Full name</span>
                  <span className="max-w-40 truncate text-right font-medium text-gray-900">
                    {fullName || "Not provided"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Expertise</span>
                  <span className="font-medium text-gray-900">
                    {expertise.length} subjects
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">
                    {experience === "0" ? "<1 year" : `${experience}+ years`}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-indigo-100 pt-3">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "Inactive"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </section>

            <Button onClick={saveInstructor}>
              <UserPlus size={16} />
              {saving ? "Creating..." : "Create instructor"}
            </Button>

            <p className="text-center text-xs leading-5 text-gray-400">
              Demo form only. Connect your API to persist instructor data,
              upload photos, and send invitation emails.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
