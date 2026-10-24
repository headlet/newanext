"use client";

import {
  useRef,
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  UserRound,
  ShieldCheck,
  Monitor,
  Smartphone,
  LogOut,
  Save,
  LoaderCircle,
  CheckCircle2,
  BriefcaseBusiness,
  Mail,
  Phone,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Camera,
  Loader2,
} from "lucide-react";
import {
  onAuthStateChanged,
  updatePassword,
  updateProfile as updateAuthProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getFirebaseAuth } from "@/app/lib/firebase";
import { getUserProfile, saveUserProfile } from "@/app/lib/db/user";

type TabId = "profile" | "security";

const tabs: {
  id: TabId;
  label: string;
  description: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Personal information",
    description: "Manage your personal details",
    icon: UserRound,
  },
  {
    id: "security",
    label: "Password & security",
    description: "Protect your account",
    icon: ShieldCheck,
  },
];

type ImageKitAuth = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

type ImageKitUploadResult = {
  url?: string;
  fileId?: string;
  message?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  required = false,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: typeof UserRound;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:bg-slate-50 disabled:text-slate-500 ${
            Icon ? "pl-10" : ""
          }`}
        />
      </div>
    </label>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="relative">
        <LockKeyhole
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete="new-password"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

function SaveButton({
  children = "Save changes",
  disabled = false,
  loading = false,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        <Save size={16} />
      )}
      {children}
    </button>
  );
}

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    bio: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imageFileId, setImageFileId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Current browser",
      device: "Desktop computer",
      location: "Current session",
      current: true,
    },
    {
      id: 2,
      name: "Mobile browser",
      device: "Mobile device",
      location: "Other session",
      current: false,
    },
  ]);

  function triggerToast(
    message: string,
    type: "success" | "error" = "success",
  ) {
    setToast({ visible: true, message, type });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  }

  // Load authenticated user data from Firebase Auth and Firestore.
  useEffect(() => {
    const auth = getFirebaseAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserUid(user.uid);

        const fullName = user.displayName || "";
        const nameParts = fullName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        try {
          const userProfile = await getUserProfile(user.uid);

          setProfile({
            firstName: userProfile?.name
              ? userProfile.name.split(" ")[0]
              : firstName,
            lastName: userProfile?.name
              ? userProfile.name.split(" ").slice(1).join(" ")
              : lastName,
            email: user.email || "",
            phone: userProfile?.phone || "",
            jobTitle: userProfile?.jobTitle || "",
            bio: userProfile?.bio || "",
          });

          if (userProfile?.photoURL) {
            setImageUrl(userProfile.photoURL);
            setImageFileId(userProfile.imageFileId || "");
          } else if (user.photoURL) {
            setImageUrl(user.photoURL);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      } else {
        setCurrentUserUid(null);
        setImageUrl("");
        setImageFileId("");
      }

      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  function updateProfileField(key: keyof typeof profile, value: string) {
    setProfile((previous) => ({ ...previous, [key]: value }));
  }

  // Direct ImageKit Upload via banner camera button click
  async function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      triggerToast("Please select a valid image file.", "error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      triggerToast("Image size must be 10 MB or less.", "error");
      return;
    }

    setIsUploading(true);

    try {
      const authResponse = await fetch("/api/upload-auth", {
        method: "GET",
        cache: "no-store",
      });

      const authData = await authResponse.json().catch(() => ({}));

      if (!authResponse.ok) {
        throw new Error(
          authData.message || "Failed to authenticate ImageKit upload.",
        );
      }

      const auth = authData as ImageKitAuth;

      const generatedFileName = `user-${Date.now()}.${file.name.split(".").pop() || "img"}`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", generatedFileName);
      formData.append("folder", "/user");
      formData.append("useUniqueFileName", "true");
      formData.append("token", auth.token);
      formData.append("expire", String(auth.expire));
      formData.append("signature", auth.signature);
      formData.append("publicKey", auth.publicKey);

      const uploadResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadResult: ImageKitUploadResult = await uploadResponse
        .json()
        .catch(() => ({}));

      if (!uploadResponse.ok || !uploadResult.url || !uploadResult.fileId) {
        throw new Error(uploadResult.message || "Image upload failed.");
      }

      setImageUrl(uploadResult.url);
      setImageFileId(uploadResult.fileId);
      triggerToast(
        "Profile picture uploaded successfully! Click save changes to apply.",
      );
    } catch (error: any) {
      console.error("Upload error:", error);
      triggerToast(error.message || "Failed to upload image.", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentUserUid) return;

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      triggerToast("Please enter your first and last name.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const auth = getFirebaseAuth();
      const user = auth.currentUser;
      const fullName = `${profile.firstName.trim()} ${profile.lastName.trim()}`;

      if (user) {
        await updateAuthProfile(user, {
          displayName: fullName,
          photoURL: imageUrl || null,
        });
      }

      await saveUserProfile(currentUserUid, {
        name: fullName,
        phone: profile.phone,
        jobTitle: profile.jobTitle,
        bio: profile.bio,
        photoURL: imageUrl,
        imageFileId: imageFileId,
        imageFolder: "/user",
      });

      triggerToast("Your profile has been updated successfully!");
    } catch (error) {
      console.error(error);
      triggerToast("Failed to update profile. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const auth = getFirebaseAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      triggerToast("No authenticated user found.", "error");
      return;
    }

    if (!passwords.current) {
      triggerToast("Enter your current password.", "error");
      return;
    }

    if (passwords.next.length < 8) {
      triggerToast(
        "Your new password must contain at least 8 characters.",
        "error",
      );
      return;
    }

    if (passwords.next !== passwords.confirm) {
      triggerToast("Your new passwords do not match.", "error");
      return;
    }

    setIsSaving(true);

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwords.current,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwords.next);

      triggerToast("Password updated successfully!");
      setPasswords({ current: "", next: "", confirm: "" });
    } catch (error: any) {
      console.error(error);
      triggerToast(
        "Failed to update password. Check current password.",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function togglePasswordVisibility(key: keyof typeof visiblePasswords) {
    setVisiblePasswords((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function revokeSession(id: number) {
    setSessions((previous) => previous.filter((session) => session.id !== id));
    triggerToast("Session revoked successfully.");
  }

  if (loadingUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb]">
        <div className="flex items-center gap-3 text-slate-600">
          <LoaderCircle size={24} className="animate-spin text-indigo-600" />
          <p className="text-sm font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 sm:px-6 lg:px-8 relative">
      {/* Toast Notification Banner */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed right-5 top-5 z-50 transform transition-all duration-300 ${
          toast.visible
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex max-w-sm items-center space-x-3 rounded-2xl border px-5 py-3.5 text-white shadow-2xl ${
            toast.type === "error"
              ? "border-rose-700 bg-rose-600"
              : "border-slate-800 bg-slate-900"
          }`}
        >
          <span className="text-xl">
            {toast.type === "error" ? "⚠️" : "🎉"}
          </span>
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Account management
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My profile
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your personal information, password, security, and account
              preferences.
            </p>
          </div>
        </div>

        {/* Profile overview banner */}
        <section className="relative mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-500 sm:h-40" />

          <div className="relative flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-8">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
              <div className="relative shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Profile avatar"
                    className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md sm:h-28 sm:w-28"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-md sm:h-28 sm:w-28">
                    {profile.firstName.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-50"
                  title="Upload new picture"
                >
                  {isUploading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Camera size={16} />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <h2 className="truncate text-xl font-bold text-slate-900">
                {profile.firstName || profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`.trim()
                  : "Your name"}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {profile.email || "Add your email address"}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={13} />
                  Active User
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab("profile");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <UserRound size={16} />
              Edit profile
            </button>
          </div>
        </section>

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Navigation */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Account settings
            </p>

            <nav className="space-y-1" aria-label="Profile settings">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const selected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      selected
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        selected
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">
                        {tab.label}
                      </span>
                      <span
                        className={`mt-1 block text-xs leading-5 ${
                          selected ? "text-indigo-500" : "text-slate-400"
                        }`}
                      >
                        {tab.description}
                      </span>
                    </span>

                    <ChevronRight
                      size={16}
                      className={
                        selected ? "text-indigo-500" : "text-slate-300"
                      }
                    />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0 space-y-6">
            {activeTab === "profile" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  title="Personal information"
                  description="Update your personal details and how others see you."
                />

                <form onSubmit={handleProfileSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First name"
                      value={profile.firstName}
                      onChange={(v) => updateProfileField("firstName", v)}
                      placeholder="Enter first name"
                      icon={UserRound}
                      required
                    />

                    <Field
                      label="Last name"
                      value={profile.lastName}
                      onChange={(v) => updateProfileField("lastName", v)}
                      placeholder="Enter last name"
                      icon={UserRound}
                      required
                    />

                    <Field
                      label="Email address"
                      value={profile.email}
                      onChange={() => {}}
                      placeholder="you@example.com"
                      type="email"
                      icon={Mail}
                      disabled
                    />

                    <Field
                      label="Phone number"
                      value={profile.phone}
                      onChange={(v) => updateProfileField("phone", v)}
                      placeholder="+977 9800000000"
                      type="tel"
                      icon={Phone}
                    />

                    <div className="sm:col-span-2">
                      <Field
                        label="Job title"
                        value={profile.jobTitle}
                        onChange={(v) => updateProfileField("jobTitle", v)}
                        placeholder="e.g. Administrator, Instructor, Manager"
                        icon={BriefcaseBusiness}
                      />
                    </div>

                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        About you
                      </span>

                      <textarea
                        value={profile.bio}
                        onChange={(e) =>
                          updateProfileField("bio", e.target.value)
                        }
                        rows={4}
                        maxLength={500}
                        placeholder="Write a short introduction about yourself..."
                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                      />

                      <span className="mt-1 block text-right text-xs text-slate-400">
                        {profile.bio.length}/500 characters
                      </span>
                    </label>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                    <SaveButton loading={isSaving} />
                  </div>
                </form>
              </section>
            )}

            {activeTab === "security" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  title="Change password"
                  description="Choose a strong password to help keep your account safe."
                />

                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-5">
                    <PasswordField
                      label="Current password"
                      value={passwords.current}
                      onChange={(v) =>
                        setPasswords((p) => ({ ...p, current: v }))
                      }
                      visible={visiblePasswords.current}
                      onToggle={() => togglePasswordVisibility("current")}
                      placeholder="Enter current password"
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <PasswordField
                        label="New password"
                        value={passwords.next}
                        onChange={(v) =>
                          setPasswords((p) => ({ ...p, next: v }))
                        }
                        visible={visiblePasswords.next}
                        onToggle={() => togglePasswordVisibility("next")}
                        placeholder="Enter new password"
                      />

                      <PasswordField
                        label="Confirm new password"
                        value={passwords.confirm}
                        onChange={(v) =>
                          setPasswords((p) => ({ ...p, confirm: v }))
                        }
                        visible={visiblePasswords.confirm}
                        onToggle={() => togglePasswordVisibility("confirm")}
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </div>

                  <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
                    <SaveButton loading={isSaving}>Update password</SaveButton>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
