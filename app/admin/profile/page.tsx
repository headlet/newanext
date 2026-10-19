"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Palette,
  Camera,
  LockKeyhole,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  Mail,
  Phone,
  BriefcaseBusiness,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  LogOut,
  KeyRound,
  ShieldAlert,
  Save,
  LoaderCircle,
  Upload,
  CheckCircle2,
  Info,
  Trash2,
  X,
} from "lucide-react";

type TabId = "profile" | "security" | "notifications" | "preferences";

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
  {
    id: "notifications",
    label: "Notifications",
    description: "Choose what you receive",
    icon: Bell,
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Customize your experience",
    icon: Palette,
  },
];

const initialNotifications = [
  {
    id: "email",
    title: "Email notifications",
    description: "Receive important updates by email.",
    enabled: true,
  },
  {
    id: "security",
    title: "Security alerts",
    description: "Get notified about sign-ins and security changes.",
    enabled: true,
  },
  {
    id: "product",
    title: "Product updates",
    description: "Discover new features and improvements.",
    enabled: false,
  },
  {
    id: "marketing",
    title: "Tips and announcements",
    description: "Receive occasional tips to improve your workflow.",
    enabled: false,
  },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
        checked ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: typeof UserRound;
  required?: boolean;
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
          className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 ${
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
}: {
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Save size={16} />
      {children}
    </button>
  );
}

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"info" | "error">("info");

  // Replace these initial values with the authenticated user's data.
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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

  const [twoFactor, setTwoFactor] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "Asia/Kathmandu",
    theme: "light",
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

  function showNotice(message: string, type: "info" | "error" = "info") {
    setNotice(message);
    setNoticeType(type);
  }

  function updateProfile(key: keyof typeof profile, value: string) {
    setProfile((previous) => ({ ...previous, [key]: value }));
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotice("Please select an image file.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotice("Your profile image must be smaller than 5 MB.", "error");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
        setAvatarFile(file);
        showNotice(
          "Photo preview updated. Save it to your server to make it permanent.",
        );
      }
    };

    reader.onerror = () => {
      showNotice("Unable to read this image.", "error");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      showNotice("Please enter your first and last name.", "error");
      return;
    }

    showNotice(
      "Your form is valid. Connect this action to your profile update API to save changes.",
    );
  }

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!passwords.current) {
      showNotice("Enter your current password.", "error");
      return;
    }

    if (passwords.next.length < 8) {
      showNotice(
        "Your new password must contain at least 8 characters.",
        "error",
      );
      return;
    }

    if (passwords.next !== passwords.confirm) {
      showNotice("Your new passwords do not match.", "error");
      return;
    }

    if (passwords.current === passwords.next) {
      showNotice(
        "Choose a new password that differs from your current password.",
        "error",
      );
      return;
    }

    showNotice(
      "Password validation passed. Connect this form to your authentication provider to change the password.",
    );
  }

  function handleNotificationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showNotice(
      "Notification preferences are updated in this page. Connect your preferences API to persist them.",
    );
  }

  function handlePreferenceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showNotice(
      "Preferences are updated in this page. Connect your settings API to save them permanently.",
    );
  }

  function togglePasswordVisibility(key: keyof typeof visiblePasswords) {
    setVisiblePasswords((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  }

  function revokeSession(id: number) {
    setSessions((previous) => previous.filter((session) => session.id !== id));
    showNotice(
      "Session removed from this demo only. Connect your session-management API to revoke it on the server.",
    );
  }

  function disableTwoFactor() {
    setTwoFactor(false);
    showNotice(
      "Two-factor setting changed locally. Connect your authentication provider to update real account security.",
    );
  }

  function enableTwoFactor() {
    setTwoFactor(true);
    showNotice(
      "Two-factor setting changed locally. Complete a server-side enrollment and verification flow before treating 2FA as enabled.",
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 sm:px-6 lg:px-8">
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

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ShieldCheck size={21} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Account settings
              </p>
              <p className="text-xs text-slate-500">Manage your account</p>
            </div>
          </div>
        </div>

        {/* Notice */}
        {notice && (
          <div
            role="status"
            className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${
              noticeType === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-indigo-100 bg-indigo-50 text-indigo-800"
            }`}
          >
            {noticeType === "error" ? (
              <ShieldAlert size={19} className="mt-0.5 shrink-0" />
            ) : (
              <Info size={19} className="mt-0.5 shrink-0" />
            )}
            <p className="flex-1 text-sm leading-6">{notice}</p>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="rounded-lg p-1 hover:bg-black/5"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Profile overview */}
        <section className="relative mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-500 sm:h-40">
            <div className="absolute right-0 top-0 h-52 w-52 translate-x-12 -translate-y-16 rounded-full border-[28px] border-white/10" />
            <div className="absolute right-24 top-16 hidden h-24 w-24 rounded-full border border-white/20 sm:block" />
          </div>

          <div className="relative flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-8">
            <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
              <div className="relative shrink-0">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile preview"
                    className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md sm:h-28 sm:w-28"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-700 shadow-md sm:h-28 sm:w-28">
                    {profile.firstName.trim()
                      ? profile.firstName.charAt(0).toUpperCase()
                      : "U"}
                    {profile.lastName.trim()
                      ? profile.lastName.charAt(0).toUpperCase()
                      : ""}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile picture"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Camera size={17} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
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
                  Profile settings
                </span>
                {profile.jobTitle && (
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {profile.jobTitle}
                  </span>
                )}
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
                    onClick={() => {
                      setActiveTab(tab.id);
                      setNotice("");
                    }}
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

            <div className="mx-3 my-4 border-t border-slate-100" />

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-slate-700">
                <ShieldCheck size={17} className="text-indigo-600" />
                <span className="text-sm font-bold">Stay secure</span>
              </div>
              <p className="text-xs leading-5 text-slate-500">
                Use a unique password and review your active sessions regularly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("security");
                  setNotice("");
                }}
                className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Review security →
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0 space-y-6">
            {activeTab === "profile" && (
              <>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Personal information"
                    description="Update your personal details and how others see you."
                  />

                  <div className="mb-7 flex flex-col gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-indigo-100 text-indigo-600">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Selected avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound size={26} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        Profile photo
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        JPG, PNG, GIF, or WebP. Maximum file size 5 MB.
                      </p>
                      {avatarFile && (
                        <p className="mt-1 truncate text-xs text-indigo-600">
                          {avatarFile.name}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Upload size={15} />
                        Upload
                      </button>
                      {avatar && (
                        <button
                          type="button"
                          onClick={() => {
                            setAvatar("");
                            setAvatarFile(null);
                            showNotice(
                              "Photo removed from the preview. Connect your API to remove the stored photo.",
                            );
                          }}
                          aria-label="Remove photo preview"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="First name"
                        value={profile.firstName}
                        onChange={(v) => updateProfile("firstName", v)}
                        placeholder="Enter first name"
                        icon={UserRound}
                        required
                      />
                      <Field
                        label="Last name"
                        value={profile.lastName}
                        onChange={(v) => updateProfile("lastName", v)}
                        placeholder="Enter last name"
                        icon={UserRound}
                        required
                      />
                      <Field
                        label="Email address"
                        value={profile.email}
                        onChange={(v) => updateProfile("email", v)}
                        placeholder="you@example.com"
                        type="email"
                        icon={Mail}
                        required
                      />
                      <Field
                        label="Phone number"
                        value={profile.phone}
                        onChange={(v) => updateProfile("phone", v)}
                        placeholder="+977 9800000000"
                        type="tel"
                        icon={Phone}
                      />
                      <div className="sm:col-span-2">
                        <Field
                          label="Job title"
                          value={profile.jobTitle}
                          onChange={(v) => updateProfile("jobTitle", v)}
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
                          onChange={(e) => updateProfile("bio", e.target.value)}
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

                    <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setProfile({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            jobTitle: "",
                            bio: "",
                          });
                          setAvatar("");
                          setAvatarFile(null);
                          showNotice(
                            "Form cleared. Load the authenticated user data again to restore the original values.",
                          );
                        }}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        Clear form
                      </button>
                      <SaveButton />
                    </div>
                  </form>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Email address"
                    description="Manage the email address associated with your account."
                  />
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Mail size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="break-all text-sm font-semibold text-slate-800">
                        {profile.email || "No email address entered"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Email verification status must come from your
                        authentication provider.
                      </p>
                    </div>
                    <span className="self-start rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 sm:self-center">
                      Verification not checked
                    </span>
                  </div>
                </section>
              </>
            )}

            {activeTab === "security" && (
              <>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Change password"
                    description="Choose a strong password to help keep your account safe."
                  />

                  <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <ShieldAlert
                      size={19}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    <p className="text-sm leading-6 text-amber-800">
                      Your current password must be verified by the server
                      before a new password can be saved. Never store plaintext
                      passwords in your database.
                    </p>
                  </div>

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

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="mb-3 text-sm font-semibold text-slate-700">
                          Password checklist
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {[
                            {
                              label: "At least 8 characters",
                              valid: passwords.next.length >= 8,
                            },
                            {
                              label: "Contains an uppercase letter",
                              valid: /[A-Z]/.test(passwords.next),
                            },
                            {
                              label: "Contains a lowercase letter",
                              valid: /[a-z]/.test(passwords.next),
                            },
                            {
                              label: "Contains a number or symbol",
                              valid: /[\d\W_]/.test(passwords.next),
                            },
                          ].map((rule) => (
                            <div
                              key={rule.label}
                              className={`flex items-center gap-2 text-xs ${
                                rule.valid
                                  ? "text-emerald-700"
                                  : "text-slate-500"
                              }`}
                            >
                              <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                  rule.valid ? "bg-emerald-100" : "bg-slate-200"
                                }`}
                              >
                                {rule.valid ? (
                                  <Check size={12} />
                                ) : (
                                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                                )}
                              </span>
                              {rule.label}
                            </div>
                          ))}
                        </div>
                        {passwords.confirm && (
                          <p
                            className={`mt-3 text-xs ${
                              passwords.confirm === passwords.next
                                ? "text-emerald-700"
                                : "text-rose-600"
                            }`}
                          >
                            {passwords.confirm === passwords.next
                              ? "Passwords match"
                              : "Passwords do not match"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
                      <SaveButton>Update password</SaveButton>
                    </div>
                  </form>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Two-factor authentication"
                    description="Add another layer of protection to your account."
                  />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-800">
                        Two-factor authentication (2FA)
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Require an additional verification step when signing in.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={twoFactor ? disableTwoFactor : enableTwoFactor}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        twoFactor
                          ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {twoFactor ? "Disable (demo)" : "Set up 2FA"}
                    </button>
                  </div>

                  <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                    This control is a UI demonstration. Real 2FA requires
                    server-side enrollment, verification, recovery codes, and
                    secure persistence.
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Active sessions"
                    description="Review the sessions displayed in this demo."
                  />

                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                          {session.device === "Mobile device" ? (
                            <Smartphone size={21} />
                          ) : (
                            <Monitor size={21} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-bold text-slate-800">
                              {session.name}
                            </p>
                            {session.current && (
                              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {session.device} · {session.location}
                          </p>
                        </div>
                        {!session.current && (
                          <button
                            type="button"
                            onClick={() => revokeSession(session.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                          >
                            <LogOut size={14} />
                            Revoke (demo)
                          </button>
                        )}
                      </div>
                    ))}
                    {sessions.length === 0 && (
                      <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
                        No demo sessions remain.
                      </p>
                    )}
                  </div>
                </section>
              </>
            )}

            {activeTab === "notifications" && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <SectionHeading
                  title="Notification preferences"
                  description="Choose which updates and alerts you want to receive."
                />

                <form onSubmit={handleNotificationSubmit}>
                  <div className="divide-y divide-slate-100">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-5 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {item.description}
                          </p>
                        </div>
                        <Toggle
                          checked={item.enabled}
                          onChange={(enabled) =>
                            setNotifications((previous) =>
                              previous.map((notification) =>
                                notification.id === item.id
                                  ? { ...notification, enabled }
                                  : notification,
                              ),
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex justify-end border-t border-slate-100 pt-6">
                    <SaveButton>Save notifications</SaveButton>
                  </div>
                </form>
              </section>
            )}

            {activeTab === "preferences" && (
              <>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="General preferences"
                    description="Personalize your language, timezone, and dashboard appearance."
                  />

                  <form onSubmit={handlePreferenceSubmit}>
                    <div className="space-y-6">
                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Globe size={16} className="text-slate-400" />
                          Language
                        </span>
                        <select
                          value={preferences.language}
                          onChange={(e) =>
                            setPreferences((p) => ({
                              ...p,
                              language: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                        >
                          <option value="en">English</option>
                          <option value="ne">Nepali</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </label>

                      <label className="block">
                        <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Clock size={16} className="text-slate-400" />
                          Timezone
                        </span>
                        <select
                          value={preferences.timezone}
                          onChange={(e) =>
                            setPreferences((p) => ({
                              ...p,
                              timezone: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                        >
                          <option value="Asia/Kathmandu">
                            Kathmandu (UTC+05:45)
                          </option>
                          <option value="Asia/Kolkata">
                            Kolkata (UTC+05:30)
                          </option>
                          <option value="Asia/Dubai">Dubai (UTC+04:00)</option>
                          <option value="Europe/London">London</option>
                          <option value="America/New_York">New York</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </label>

                      <div>
                        <p className="mb-3 text-sm font-semibold text-slate-700">
                          Appearance
                        </p>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            {
                              id: "light",
                              title: "Light",
                              description: "Bright and clean",
                            },
                            {
                              id: "dark",
                              title: "Dark",
                              description: "Low-light interface",
                            },
                            {
                              id: "system",
                              title: "System",
                              description: "Follow device settings",
                            },
                          ].map((theme) => (
                            <button
                              key={theme.id}
                              type="button"
                              onClick={() =>
                                setPreferences((p) => ({
                                  ...p,
                                  theme: theme.id,
                                }))
                              }
                              className={`rounded-xl border p-4 text-left transition ${
                                preferences.theme === theme.id
                                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div
                                className={`mb-3 flex h-12 items-center justify-center rounded-lg ${
                                  theme.id === "dark"
                                    ? "bg-slate-900 text-white"
                                    : theme.id === "system"
                                      ? "bg-gradient-to-r from-slate-100 to-slate-400 text-slate-700"
                                      : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {theme.id === "system" ? (
                                  <Monitor size={21} />
                                ) : (
                                  <Palette size={21} />
                                )}
                              </div>
                              <p className="text-sm font-bold text-slate-800">
                                {theme.title}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {theme.description}
                              </p>
                              {preferences.theme === theme.id && (
                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                                  <Check size={13} />
                                  Selected
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-400">
                          Selecting a theme changes this preference in the page
                          state. Apply it globally through your app theme
                          provider to change the entire interface.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
                      <SaveButton>Save preferences</SaveButton>
                    </div>
                  </form>
                </section>

                <section className="rounded-2xl border border-rose-200 bg-white p-5 shadow-sm sm:p-8">
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <Trash2 size={21} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Account deletion
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Permanently deleting an account should require
                        reauthentication and a secure server-side deletion
                        process.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      showNotice(
                        "Account deletion is not connected. Implement a server-side deletion flow with identity verification before enabling this feature.",
                        "error",
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <Trash2 size={16} />
                    Account deletion options
                  </button>
                </section>
              </>
            )}

            {/* Footer note */}
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <KeyRound size={18} className="mt-0.5 shrink-0 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Your account, your control
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Changes in this UI are held in browser memory. Connect the
                  appropriate API endpoints to persist profile data, upload
                  images, change passwords, manage sessions, and save
                  preferences securely.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400 sm:flex-row">
          <p>Account management</p>
          <p>Keep your account information up to date.</p>
        </footer>
      </div>
    </main>
  );
}
