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
import {
  onAuthStateChanged,
  updatePassword,
  updateProfile as updateAuthProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseAuth } from "@/app/lib/firebase";
import { getUserProfile, saveUserProfile } from "@/app/lib/db";

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
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState("");
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
            setAvatar(userProfile.photoURL);
          } else if (user.photoURL) {
            setAvatar(user.photoURL);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      } else {
        setCurrentUserUid(null);
        setAvatar("");
      }

      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  function updateProfileField(key: keyof typeof profile, value: string) {
    setProfile((previous) => ({ ...previous, [key]: value }));
  }

  // Upload image to Firebase Storage and save its URL.
  async function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];

    // Reset the input so the same file can be selected again.
    input.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      triggerToast("Please select a valid image file.", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      triggerToast("Image file size must be smaller than 2 MB.", "error");
      return;
    }

    const auth = getFirebaseAuth();
    const user = auth.currentUser;

    if (!user || !currentUserUid || user.uid !== currentUserUid) {
      triggerToast("Please sign in again before uploading.", "error");
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // 1. Upload the actual image file.
      const storage = getStorage(auth.app);
      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");

      const imageRef = ref(
        storage,
        `profile-photos/${user.uid}/${Date.now()}-${safeFileName}`,
      );

      await uploadBytes(imageRef, file, {
        contentType: file.type,
      });

      // 2. Get the hosted image URL.
      const photoURL = await getDownloadURL(imageRef);

      // 3. Update the preview only after Storage returns a valid URL.
      setAvatar(photoURL);

      // 4. Save the URL to Firestore.
      try {
        await saveUserProfile(user.uid, { photoURL });
      } catch (error) {
        console.error("Failed to save photo URL to Firestore:", error);
        triggerToast(
          "Image uploaded, but saving its URL to Firestore failed.",
          "error",
        );
        return;
      }

      // 5. Synchronize the Firebase Auth profile.
      try {
        await updateAuthProfile(user, { photoURL });
      } catch (error) {
        console.error("Failed to update Firebase Auth photoURL:", error);
        // Firestore already contains the URL, so the saved image can still load.
      }

      triggerToast("Profile picture updated successfully!");
    } catch (error: unknown) {
      console.error("Profile image upload failed:", error);

      const firebaseError = error as {
        code?: string;
        message?: string;
      };

      console.error("Firebase error code:", firebaseError.code);
      console.error("Firebase error message:", firebaseError.message);

      triggerToast(
        `Image upload failed: ${
          firebaseError.code || firebaseError.message || "Unknown error"
        }`,
        "error",
      );
    } finally {
      setIsUploadingAvatar(false);
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
        await updateAuthProfile(user, { displayName: fullName });
      }

      await saveUserProfile(currentUserUid, {
        name: fullName,
        phone: profile.phone,
        jobTitle: profile.jobTitle,
        bio: profile.bio,
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

    if (passwords.current === passwords.next) {
      triggerToast(
        "New password must be different from current password.",
        "error",
      );
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

      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        triggerToast("Incorrect current password.", "error");
      } else {
        triggerToast(
          "Failed to update password. Please check your inputs.",
          "error",
        );
      }
    } finally {
      setIsSaving(false);
    }
  }

  function handleNotificationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    triggerToast("Notification preferences updated successfully!");
  }

  function handlePreferenceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    triggerToast("Preferences saved successfully!");
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

  function disableTwoFactor() {
    setTwoFactor(false);
    triggerToast("Two-factor authentication disabled.");
  }

  function enableTwoFactor() {
    setTwoFactor(true);
    triggerToast("Two-factor authentication enabled successfully!");
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
                  disabled={isUploadingAvatar}
                  aria-label="Upload profile picture"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUploadingAvatar ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Camera size={17} />
                  )}
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
                  Active User
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
                onClick={() => setActiveTab("security")}
                className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Review security →
              </button>
            </div>
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
              <>
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
                      <SaveButton loading={isSaving}>
                        Update password
                      </SaveButton>
                    </div>
                  </form>
                </section>

                {/* Two-factor authentication section intentionally remains disabled. */}

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <SectionHeading
                    title="Active sessions"
                    description="Review the active sessions for your account."
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
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
