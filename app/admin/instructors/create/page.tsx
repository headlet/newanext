"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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
import { saveUserProfile } from "@/app/lib/db/user";

type InstructorStatus = "Active" | "Pending" | "Inactive";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-normal text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

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

function Field({ label, children }: { label: string; children: ReactNode }) {
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
  const router = useRouter();
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
  const [expertise, setExpertise] = useState(["Web Development", "JavaScript"]);
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
      Toast.fire({ icon: "warning", title: "Please select an image file." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      Toast.fire({
        icon: "warning",
        title: "Please select an image smaller than 2 MB.",
      });
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  }

  async function saveInstructor() {
    if (!firstName.trim() || !lastName.trim() || !validEmail) {
      Toast.fire({
        icon: "warning",
        title: "Please provide a valid name and email address.",
      });
      return;
    }

    setSaving(true);

    try {
      const uid = `instructor_${Date.now()}`;
      const instructorData = {
        name: fullName,
        email: email.trim(),
        role: "instructor",
        roleId: "instructor",
        phone: phone.trim(),
        specialization: headline.trim() || "Instructor",
        bio: biography.trim(),
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
        createdAt: new Date().toISOString(),
      };

      await saveUserProfile(uid, instructorData);

      Toast.fire({
        icon: "success",
        title: "Instructor created successfully in Firestore.",
      });
      router.push("/admin/instructors");
    } catch (error) {
      console.error("Failed to save instructor:", error);
      Toast.fire({ icon: "error", title: "Failed to save instructor." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/admin/instructors"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            All instructors
          </Link>
        </div>

        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Add instructor
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create an instructor profile and save directly to Firestore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                description="Enter personal and contact information."
              />

              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="First name *">
                    <input
                      className={inputClass}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Suman"
                      required
                    />
                  </Field>

                  <Field label="Last name *">
                    <input
                      className={inputClass}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Adhikari"
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
                description="Introduce the instructor and highlight experience."
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
                </Field>

                <Field label="Biography">
                  <textarea
                    className={`${inputClass} min-h-36 resize-y`}
                    rows={5}
                    value={biography}
                    maxLength={2000}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Describe background and teaching approach..."
                  />
                </Field>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6 xl:sticky xl:top-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-900">Account status</h2>
              <div className="mt-4">
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
              </div>
            </section>

            <Button onClick={saveInstructor}>
              <UserPlus size={16} />
              {saving ? "Creating..." : "Create instructor"}
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
