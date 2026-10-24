"use client";

import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Cloud,
  Code2,
  Eye,
  Globe,
  Image as ImageIcon,
  KeyRound,
  Link2,
  LockKeyhole,
  Mail,
  Palette,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Users,
  X,
  Zap,
  Loader2,
  Camera,
  LoaderCircle,
} from "lucide-react";
import {
  getSettingsFromDb,
  saveSettingsToDb,
  type SettingsData,
  type TeamMember,
} from "@/app/lib/db/settings";

type Tab =
  | "General"
  | "Branding"
  | "Team & Roles"
  | "Notifications"
  | "Integrations"
  | "Security";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

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

const tabs: { name: Tab; description: string; icon: typeof Settings2 }[] = [
  {
    name: "General",
    description: "Company information and preferences",
    icon: Settings2,
  },
  {
    name: "Branding",
    description: "Logo, colors and visual identity",
    icon: Palette,
  },
  {
    name: "Team & Roles",
    description: "Manage team access and permissions",
    icon: Users,
  },
  {
    name: "Notifications",
    description: "Emails and activity alerts",
    icon: Bell,
  },
  {
    name: "Integrations",
    description: "Connect your external services",
    icon: Link2,
  },
  {
    name: "Security",
    description: "Protect your admin account",
    icon: ShieldCheck,
  },
];

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

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label || "Toggle setting"}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-violet-600" : "bg-slate-300"
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
      />
      {hint && (
        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Settings2;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon size={19} />
        </div>
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
          <Icon size={17} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("General");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [logoName, setLogoName] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFileId, setLogoFileId] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [general, setGeneral] = useState({
    companyName: "NewaNext Technologies",
    website: "https://www.newanext.bond",
    supportEmail: "info@newanext.com",
    alternateEmail: "hello@newanext.com",
    phone: "+977-9847484645",
    address: "Shankhamul, Kathmandu, Nepal",
    timezone: "Asia/Kathmandu",
    currency: "NPR",
    language: "English",
    dateFormat: "DD MMM YYYY",
  });

  const [branding, setBranding] = useState({
    primary: "#6558E8",
    accent: "#35A69A",
    dark: "#15152B",
    tagline: "Building the Future with Cutting-Edge Software",
  });

  const [notifications, setNotifications] = useState({
    newEnquiry: true,
    contactForm: true,
    contentChanges: true,
    courseUpdates: true,
    portfolioUpdates: false,
    weeklySummary: true,
    securityAlerts: true,
    productUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionExpiry: true,
    strongPasswords: true,
  });

  const [integrations, setIntegrations] = useState({
    analytics: false,
    searchConsole: false,
    emailService: false,
    cloudStorage: false,
    socialLinks: true,
  });

  const [social, setSocial] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    github: "",
    youtube: "",
  });

  const [team, setTeam] = useState<TeamMember[]>([
    {
      name: "Admin User",
      email: "admin@newanext.com",
      role: "Owner",
      status: "Active",
    },
    {
      name: "Content Manager",
      email: "content@newanext.com",
      role: "Editor",
      status: "Active",
    },
    {
      name: "Development Team",
      email: "dev@newanext.com",
      role: "Developer",
      status: "Active",
    },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const data = await getSettingsFromDb();
      if (data) {
        if (data.general) setGeneral(data.general);
        if (data.branding) {
          setBranding({
            primary: data.branding.primary ?? "#6558E8",
            accent: data.branding.accent ?? "#35A69A",
            dark: data.branding.dark ?? "#15152B",
            tagline:
              data.branding.tagline ??
              "Building the Future with Cutting-Edge Software",
          });
          if (data.branding.logoUrl) {
            setLogoPreview(data.branding.logoUrl);
          } else if (data.branding.logoPreview) {
            setLogoPreview(data.branding.logoPreview);
          }
          if (data.branding.logoFileId) setLogoFileId(data.branding.logoFileId);
          if (data.branding.logoName) setLogoName(data.branding.logoName);
        }
        if (data.notifications) setNotifications(data.notifications);
        if (data.security) setSecurity(data.security);
        if (data.integrations) setIntegrations(data.integrations);
        if (data.social) setSocial(data.social);
        if (Array.isArray(data.team)) setTeam(data.team);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to load settings from database.",
      });
    } finally {
      setLoading(false);
    }
  }

  const updateGeneral = (key: keyof typeof general, value: string) => {
    setGeneral((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const updateBranding = (key: keyof typeof branding, value: string) => {
    setBranding((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const updateNotification = (
    key: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const updateSecurity = (key: keyof typeof security, value: boolean) => {
    setSecurity((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  const updateIntegration = (
    key: keyof typeof integrations,
    value: boolean,
  ) => {
    setIntegrations((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
  };

  // ImageKit Direct Logo Upload handler
  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Toast.fire({
        icon: "warning",
        title: "Please select a valid image file.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      Toast.fire({
        icon: "warning",
        title: "Image size must be 10 MB or less.",
      });
      return;
    }

    setIsUploadingLogo(true);

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
      const generatedFileName = `logo-${Date.now()}.${file.name.split(".").pop() || "img"}`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", generatedFileName);
      formData.append("folder", "/settings");
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

      setLogoPreview(uploadResult.url);
      setLogoFileId(uploadResult.fileId);
      setLogoName(file.name);
      setSaved(false);
      Toast.fire({
        icon: "success",
        title: "Logo uploaded to ImageKit successfully!",
      });
    } catch (error: any) {
      console.error("Logo upload error:", error);
      Toast.fire({
        icon: "error",
        title: error.message || "Failed to upload logo.",
      });
    } finally {
      setIsUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: SettingsData = {
        general,
        branding: {
          ...branding,
          logoPreview,
          logoName,
          logoUrl: logoPreview,
          logoFileId,
          logoFolder: "/settings",
        },
        notifications,
        security,
        integrations,
        social,
        team,
      };

      await saveSettingsToDb(payload);
      setSaved(true);
      Toast.fire({
        icon: "success",
        title: "Settings updated successfully.",
      });
      window.setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to save settings to database.",
      });
    } finally {
      setSaving(false);
    }
  };

  const inviteMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inviteName.trim() || !inviteEmail.trim()) return;

    setTeam((previous) => [
      ...previous,
      {
        name: inviteName.trim(),
        email: inviteEmail.trim(),
        role: inviteRole,
        status: "Pending",
      },
    ]);

    setInviteName("");
    setInviteEmail("");
    setInviteRole("Editor");
    setShowInvite(false);
    setSaved(false);
  };

  const filteredTabs = tabs.filter((tab) =>
    `${tab.name} ${tab.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10";

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f7f8fc]">
        <Loader2 className="animate-spin text-violet-600" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-800">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Workspace</span>
              <ChevronRight size={13} />
              <span className="text-violet-600">Settings</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                <SlidersHorizontal size={23} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Settings
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your NewaNext website, team and preferences.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.newanext.bond/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"
            >
              <Globe size={16} />
              View website
              <ArrowUpRight size={14} />
            </a>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 active:scale-[0.98] disabled:opacity-50"
            >
              {saved ? <Check size={17} /> : <Save size={17} />}
              {saving ? "Saving..." : saved ? "Changes saved" : "Save changes"}
            </button>
          </div>
        </div>

        {/* Status banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#211c51] via-[#40358c] to-[#6558e8] p-5 text-white sm:p-6">
          <div className="pointer-events-none absolute -right-8 -top-16 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-1 -top-8 h-36 w-36 rounded-full border border-white/10" />
          <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="text-base font-bold sm:text-lg">
                  Your workspace, your rules.
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-violet-100">
                  Keep your company details, website branding, integrations and
                  team access up to date from one place.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium md:self-center">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Admin workspace
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[265px_minmax(0,1fr)]">
          {/* Settings navigation */}
          <aside className="space-y-4">
            <Panel className="!p-3">
              <div className="px-3 pb-3 pt-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-400">
                  Preferences
                </p>
              </div>

              <div className="mb-3 px-1">
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Find a setting..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-violet-400 focus:bg-white"
                  />
                </div>
              </div>

              <nav className="space-y-1">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.name;

                  return (
                    <button
                      key={tab.name}
                      type="button"
                      onClick={() => setActiveTab(tab.name)}
                      className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                        active
                          ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`mt-0.5 shrink-0 ${
                          active
                            ? "text-violet-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {tab.name}
                        </span>
                        <span
                          className={`mt-1 block text-[11px] leading-4 ${
                            active ? "text-violet-600/75" : "text-slate-400"
                          }`}
                        >
                          {tab.description}
                        </span>
                      </span>
                      {active && (
                        <ChevronRight
                          size={15}
                          className="mt-1 shrink-0 text-violet-500"
                        />
                      )}
                    </button>
                  );
                })}

                {filteredTabs.length === 0 && (
                  <p className="px-3 py-5 text-center text-xs text-slate-400">
                    No matching settings found.
                  </p>
                )}
              </nav>

              <div className="mx-2 my-4 border-t border-slate-100" />

              <a
                href="https://www.newanext.bond/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-50"
              >
                <CircleHelp size={18} className="text-slate-400" />
                <span className="flex-1">
                  <span className="block text-sm font-semibold">
                    Help center
                  </span>
                  <span className="mt-1 block text-[11px] text-slate-400">
                    Website and workspace help
                  </span>
                </span>
                <ArrowUpRight size={14} className="text-slate-400" />
              </a>
            </Panel>

            <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                <Zap size={18} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Keep your site consistent
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Keep your company information and visual identity aligned across
                your website and business communications.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab("Branding")}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
              >
                Review branding <ChevronRight size={14} />
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0 space-y-5">
            {/* GENERAL */}
            {activeTab === "General" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={Globe}
                    title="Company information"
                    description="Manage the details that identify your business across the website."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Company name"
                      value={general.companyName}
                      onChange={(v) => updateGeneral("companyName", v)}
                      placeholder="Your company name"
                    />
                    <Field
                      label="Website URL"
                      value={general.website}
                      onChange={(v) => updateGeneral("website", v)}
                      placeholder="https://example.com"
                    />
                    <Field
                      label="Primary email"
                      value={general.supportEmail}
                      onChange={(v) => updateGeneral("supportEmail", v)}
                      type="email"
                      placeholder="hello@example.com"
                    />
                    <Field
                      label="Alternate email"
                      value={general.alternateEmail}
                      onChange={(v) => updateGeneral("alternateEmail", v)}
                      type="email"
                      placeholder="support@example.com"
                    />
                    <Field
                      label="Contact phone"
                      value={general.phone}
                      onChange={(v) => updateGeneral("phone", v)}
                      placeholder="+977-98XXXXXXXX"
                    />
                    <Field
                      label="Office address"
                      value={general.address}
                      onChange={(v) => updateGeneral("address", v)}
                      placeholder="City, country"
                    />
                  </div>
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={Settings2}
                    title="Regional preferences"
                    description="Choose how dates, currency and language are displayed in your workspace."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField
                      label="Timezone"
                      value={general.timezone}
                      onChange={(v) => updateGeneral("timezone", v)}
                      options={[
                        "Asia/Kathmandu",
                        "Asia/Kolkata",
                        "Asia/Dubai",
                        "UTC",
                        "Europe/London",
                        "America/New_York",
                      ]}
                    />
                    <SelectField
                      label="Default currency"
                      value={general.currency}
                      onChange={(v) => updateGeneral("currency", v)}
                      options={["NPR", "USD", "INR", "EUR", "GBP"]}
                    />
                    <SelectField
                      label="Dashboard language"
                      value={general.language}
                      onChange={(v) => updateGeneral("language", v)}
                      options={["English", "नेपाली"]}
                    />
                    <SelectField
                      label="Date format"
                      value={general.dateFormat}
                      onChange={(v) => updateGeneral("dateFormat", v)}
                      options={[
                        "DD MMM YYYY",
                        "YYYY-MM-DD",
                        "MM/DD/YYYY",
                        "DD/MM/YYYY",
                      ]}
                    />
                  </div>
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={Activity}
                    title="Website overview"
                    description="The main content areas managed through your admin dashboard."
                  />

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {[
                      {
                        icon: Code2,
                        title: "Services",
                        desc: "Software development and business services",
                        color: "bg-blue-50 text-blue-600",
                      },
                      {
                        icon: Sparkles,
                        title: "Courses",
                        desc: "Training programs and course details",
                        color: "bg-amber-50 text-amber-600",
                      },
                      {
                        icon: Cloud,
                        title: "Products",
                        desc: "Digital products and solutions",
                        color: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        icon: ImageIcon,
                        title: "Portfolio",
                        desc: "Projects, case studies and work samples",
                        color: "bg-pink-50 text-pink-600",
                      },
                      {
                        icon: Mail,
                        title: "Communication",
                        desc: "Contact enquiries and email communication",
                        color: "bg-violet-50 text-violet-600",
                      },
                      {
                        icon: Globe,
                        title: "Public website",
                        desc: "Company information and contact details",
                        color: "bg-cyan-50 text-cyan-600",
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-violet-100 hover:bg-white"
                        >
                          <div
                            className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}
                          >
                            <Icon size={18} />
                          </div>
                          <h3 className="text-sm font-bold text-slate-800">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              </>
            )}

            {/* BRANDING */}
            {activeTab === "Branding" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={Palette}
                    title="Brand identity"
                    description="Customize the visual identity used throughout your website."
                  />

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">
                          Website preview
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Example of your company brand
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                        LIVE PREVIEW
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Company logo preview"
                              className="h-9 w-9 rounded-lg object-contain"
                            />
                          ) : (
                            <span
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white"
                              style={{ backgroundColor: branding.primary }}
                            >
                              N
                            </span>
                          )}
                          <span className="text-sm font-extrabold tracking-tight text-slate-900">
                            {general.companyName || "NewaNext"}
                          </span>
                        </div>
                        <span className="hidden text-xs text-slate-500 sm:block">
                          Services&nbsp;&nbsp; Courses&nbsp;&nbsp; Portfolio
                        </span>
                        <span
                          className="rounded-lg px-3 py-2 text-xs font-bold text-white"
                          style={{ backgroundColor: branding.primary }}
                        >
                          Contact us
                        </span>
                      </div>
                      <div
                        className="p-6 sm:p-9"
                        style={{
                          background: `linear-gradient(120deg, ${branding.primary}12, white 60%, ${branding.accent}15)`,
                        }}
                      >
                        <span
                          className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold"
                          style={{
                            backgroundColor: `${branding.accent}20`,
                            color: branding.accent,
                          }}
                        >
                          Next-Generation Tech Solutions
                        </span>
                        <h3
                          className="mt-4 max-w-xl text-2xl font-black leading-tight sm:text-3xl"
                          style={{ color: branding.dark }}
                        >
                          {branding.tagline || "Building the Future"}
                        </h3>
                        <p className="mt-3 max-w-lg text-xs leading-6 text-slate-500 sm:text-sm">
                          Software solutions, digital products and modern
                          technology services for growing businesses.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span
                            className="rounded-lg px-4 py-2.5 text-xs font-bold text-white"
                            style={{ backgroundColor: branding.primary }}
                          >
                            Start your project
                          </span>
                          <span
                            className="rounded-lg border px-4 py-2.5 text-xs font-bold"
                            style={{
                              borderColor: branding.accent,
                              color: branding.accent,
                            }}
                          >
                            Explore services
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-sm font-bold text-slate-800">
                      Company logo
                    </h3>
                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                        {isUploadingLogo ? (
                          <LoaderCircle
                            className="animate-spin text-violet-600"
                            size={24}
                          />
                        ) : logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Selected company logo"
                            className="h-full w-full object-contain p-2"
                          />
                        ) : (
                          <span
                            className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-black text-white"
                            style={{ backgroundColor: branding.primary }}
                          >
                            N
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-bold text-slate-800">
                          {logoName || "NewaNext logo"}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          PNG, JPG, SVG or WebP via ImageKit. Maximum file size:
                          10 MB.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => logoInputRef.current?.click()}
                            disabled={isUploadingLogo}
                            className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
                          >
                            {isUploadingLogo ? "Uploading..." : "Upload logo"}
                          </button>
                          {logoPreview && (
                            <button
                              type="button"
                              onClick={() => {
                                setLogoName("");
                                setLogoPreview("");
                                setLogoFileId("");
                                if (logoInputRef.current) {
                                  logoInputRef.current.value = "";
                                }
                                setSaved(false);
                              }}
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <input
                          ref={logoInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Field
                      label="Website tagline"
                      value={branding.tagline}
                      onChange={(v) => updateBranding("tagline", v)}
                      placeholder="A short description of your business"
                      hint="This is a preview value. Connect it to the public website settings to publish the change."
                    />
                  </div>
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={Palette}
                    title="Color palette"
                    description="Set the main colors for buttons, highlights and headings."
                  />

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        key: "primary" as const,
                        label: "Primary color",
                        desc: "Buttons and main actions",
                      },
                      {
                        key: "accent" as const,
                        label: "Accent color",
                        desc: "Highlights and badges",
                      },
                      {
                        key: "dark" as const,
                        label: "Heading color",
                        desc: "Headings and dark text",
                      },
                    ].map((color) => (
                      <div
                        key={color.key}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div
                          className="mb-4 h-20 rounded-xl border border-black/5"
                          style={{ backgroundColor: branding[color.key] }}
                        />
                        <p className="text-sm font-bold text-slate-800">
                          {color.label}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {color.desc}
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="color"
                            value={branding[color.key]}
                            onChange={(e) =>
                              updateBranding(color.key, e.target.value)
                            }
                            aria-label={color.label}
                            className="h-10 w-11 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                          />
                          <input
                            value={branding[color.key]}
                            onChange={(e) =>
                              updateBranding(color.key, e.target.value)
                            }
                            className={`${inputClass} font-mono uppercase`}
                            maxLength={7}
                            aria-label={`${color.label} hex code`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </>
            )}

            {/* TEAM & ROLES */}
            {activeTab === "Team & Roles" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={Users}
                    title="Team members"
                    description="Manage who can access your website administration."
                    action={
                      <button
                        type="button"
                        onClick={() => setShowInvite(true)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                      >
                        <Users size={15} /> Invite member
                      </button>
                    }
                  />

                  <div className="mb-5 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        label: "Team members",
                        value: String(team.length),
                        icon: Users,
                      },
                      {
                        label: "Active members",
                        value: String(
                          team.filter((m) => m.status === "Active").length,
                        ),
                        icon: CheckCircle2,
                      },
                      {
                        label: "Pending invitations",
                        value: String(
                          team.filter((m) => m.status === "Pending").length,
                        ),
                        icon: Mail,
                      },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                        >
                          <Icon size={18} className="text-violet-600" />
                          <p className="mt-3 text-2xl font-black text-slate-900">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {stat.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-3 pr-4">Member</th>
                          <th className="pb-3 pr-4">Role</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.map((member, index) => (
                          <tr
                            key={`${member.email}-${index}`}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-sm font-bold text-violet-700">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-bold text-slate-800">
                                    {member.name}
                                  </span>
                                  <span className="mt-1 block text-xs text-slate-500">
                                    {member.email}
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td className="py-4 pr-4">
                              <select
                                value={member.role}
                                onChange={(e) => {
                                  setTeam((old) =>
                                    old.map((m, i) =>
                                      i === index
                                        ? { ...m, role: e.target.value }
                                        : m,
                                    ),
                                  );
                                  setSaved(false);
                                }}
                                disabled={member.role === "Owner"}
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-violet-400 disabled:bg-slate-50 disabled:text-slate-400"
                              >
                                {[
                                  "Owner",
                                  "Admin",
                                  "Editor",
                                  "Developer",
                                  "Viewer",
                                ].map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-4 pr-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
                                  member.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {member.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              {member.role !== "Owner" ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Remove ${member.name} from the team?`,
                                      )
                                    ) {
                                      setTeam((old) =>
                                        old.filter((_, i) => i !== index),
                                      );
                                      setSaved(false);
                                    }
                                  }}
                                  className="rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                >
                                  Remove
                                </button>
                              ) : (
                                <span className="pr-2 text-xs text-slate-400">
                                  Primary
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={ShieldCheck}
                    title="Role permissions"
                    description="Use these as a starting point for your authorization policy."
                  />

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[540px] text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          <th className="pb-3 pr-4">Permission</th>
                          <th className="pb-3 px-2 text-center">Admin</th>
                          <th className="pb-3 px-2 text-center">Editor</th>
                          <th className="pb-3 px-2 text-center">Developer</th>
                          <th className="pb-3 px-2 text-center">Viewer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          [
                            "Manage company settings",
                            true,
                            false,
                            false,
                            false,
                          ],
                          ["Manage team members", true, false, false, false],
                          [
                            "Edit services and products",
                            true,
                            true,
                            false,
                            false,
                          ],
                          [
                            "Manage courses and content",
                            true,
                            true,
                            false,
                            false,
                          ],
                          [
                            "Manage portfolio projects",
                            true,
                            true,
                            false,
                            false,
                          ],
                          ["Manage integrations", true, false, true, false],
                          ["View enquiries", true, true, false, true],
                        ].map((row) => (
                          <tr
                            key={String(row[0])}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="py-3.5 pr-4 text-xs font-medium text-slate-700">
                              {row[0]}
                            </td>
                            {row.slice(1).map((allowed, i) => (
                              <td key={i} className="px-2 py-3.5 text-center">
                                {allowed ? (
                                  <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <Check size={12} />
                                  </span>
                                ) : (
                                  <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-slate-200" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Panel>
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "Notifications" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={Bell}
                    title="Email notifications"
                    description="Choose which website events should trigger email notifications."
                  />

                  <div className="mb-4 rounded-xl border border-violet-100 bg-violet-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        size={18}
                        className="mt-0.5 shrink-0 text-violet-600"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Notification recipient
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Notifications are intended for your configured
                          administrative email address.
                        </p>
                        <p className="mt-2 break-all text-sm font-semibold text-violet-700">
                          {general.supportEmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <SettingRow
                    icon={Mail}
                    title="New enquiries"
                    description="Receive an alert when a potential client submits an enquiry."
                    checked={notifications.newEnquiry}
                    onChange={(v) => updateNotification("newEnquiry", v)}
                  />
                  <SettingRow
                    icon={Smartphone}
                    title="Contact form submissions"
                    description="Get notified when someone submits your website contact form."
                    checked={notifications.contactForm}
                    onChange={(v) => updateNotification("contactForm", v)}
                  />
                  <SettingRow
                    icon={ImageIcon}
                    title="Content changes"
                    description="Receive updates about changes to website pages and published content."
                    checked={notifications.contentChanges}
                    onChange={(v) => updateNotification("contentChanges", v)}
                  />
                  <SettingRow
                    icon={Sparkles}
                    title="Course updates"
                    description="Receive notifications about new or updated training programs."
                    checked={notifications.courseUpdates}
                    onChange={(v) => updateNotification("courseUpdates", v)}
                  />
                  <SettingRow
                    icon={Activity}
                    title="Portfolio updates"
                    description="Receive notifications when portfolio projects are added or updated."
                    checked={notifications.portfolioUpdates}
                    onChange={(v) => updateNotification("portfolioUpdates", v)}
                  />
                  <SettingRow
                    icon={ShieldCheck}
                    title="Security alerts"
                    description="Receive alerts about important account and security events."
                    checked={notifications.securityAlerts}
                    onChange={(v) => updateNotification("securityAlerts", v)}
                  />
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={Bell}
                    title="Digest and product updates"
                    description="Choose which additional updates you would like to receive."
                  />
                  <SettingRow
                    icon={Activity}
                    title="Weekly activity summary"
                    description="A summary of website activity, content changes and enquiries."
                    checked={notifications.weeklySummary}
                    onChange={(v) => updateNotification("weeklySummary", v)}
                  />
                  <SettingRow
                    icon={Sparkles}
                    title="Product and feature announcements"
                    description="Updates about new tools, improvements and platform features."
                    checked={notifications.productUpdates}
                    onChange={(v) => updateNotification("productUpdates", v)}
                  />
                </Panel>
              </>
            )}

            {/* INTEGRATIONS */}
            {activeTab === "Integrations" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={Link2}
                    title="Connected services"
                    description="Manage the external tools you plan to connect to your website."
                  />

                  <div className="space-y-3">
                    {[
                      {
                        key: "analytics" as const,
                        name: "Google Analytics",
                        description:
                          "Measure website visits, page engagement and traffic sources.",
                        icon: Activity,
                        color: "bg-orange-50 text-orange-600",
                        tag: "Analytics",
                      },
                      {
                        key: "searchConsole" as const,
                        name: "Google Search Console",
                        description:
                          "Monitor search visibility, indexing and website search performance.",
                        icon: Search,
                        color: "bg-blue-50 text-blue-600",
                        tag: "SEO",
                      },
                      {
                        key: "emailService" as const,
                        name: "Email service",
                        description:
                          "Configure a provider for contact forms and administrative emails.",
                        icon: Mail,
                        color: "bg-violet-50 text-violet-600",
                        tag: "Communication",
                      },
                      {
                        key: "cloudStorage" as const,
                        name: "Cloud storage",
                        description:
                          "Plan storage integration for uploaded images and project assets.",
                        icon: Cloud,
                        color: "bg-cyan-50 text-cyan-600",
                        tag: "Storage",
                      },
                    ].map((integration) => {
                      const Icon = integration.icon;
                      const connected = integrations[integration.key];

                      return (
                        <div
                          key={integration.key}
                          className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:flex-row sm:items-center"
                        >
                          <div className="flex min-w-0 items-start gap-3">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${integration.color}`}
                            >
                              <Icon size={20} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-bold text-slate-800">
                                  {integration.name}
                                </h3>
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                                  {integration.tag}
                                </span>
                              </div>
                              <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500">
                                {integration.description}
                              </p>
                              <p
                                className={`mt-2 text-[11px] font-semibold ${
                                  connected
                                    ? "text-emerald-600"
                                    : "text-slate-400"
                                }`}
                              >
                                {connected
                                  ? "Marked as configured"
                                  : "Not configured"}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              updateIntegration(integration.key, !connected)
                            }
                            className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                              connected
                                ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                : "bg-violet-600 text-white hover:bg-violet-700"
                            }`}
                          >
                            {connected
                              ? "Mark unconfigured"
                              : "Mark configured"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </Panel>

                <Panel>
                  <SectionHeading
                    icon={Globe}
                    title="Social media links"
                    description="Add your official social profiles for use in the public website footer."
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Facebook"
                      value={social.facebook}
                      onChange={(v) => {
                        setSocial((old) => ({ ...old, facebook: v }));
                        setSaved(false);
                      }}
                      placeholder="https://facebook.com/yourpage"
                    />
                    <Field
                      label="Instagram"
                      value={social.instagram}
                      onChange={(v) => {
                        setSocial((old) => ({ ...old, instagram: v }));
                        setSaved(false);
                      }}
                      placeholder="https://instagram.com/yourpage"
                    />
                    <Field
                      label="LinkedIn"
                      value={social.linkedin}
                      onChange={(v) => {
                        setSocial((old) => ({ ...old, linkedin: v }));
                        setSaved(false);
                      }}
                      placeholder="https://linkedin.com/company/..."
                    />
                    <Field
                      label="GitHub"
                      value={social.github}
                      onChange={(v) => {
                        setSocial((old) => ({ ...old, github: v }));
                        setSaved(false);
                      }}
                      placeholder="https://github.com/yourorg"
                    />
                    <Field
                      label="YouTube"
                      value={social.youtube}
                      onChange={(v) => {
                        setSocial((old) => ({ ...old, youtube: v }));
                        setSaved(false);
                      }}
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>
                </Panel>
              </>
            )}

            {/* SECURITY */}
            {activeTab === "Security" && (
              <>
                <Panel>
                  <SectionHeading
                    icon={ShieldCheck}
                    title="Account security"
                    description="Review security preferences for the admin workspace."
                  />

                  <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          Protect your administrator account
                        </p>
                        <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                          Use strong passwords, restrict administrative access
                          and enable multi-factor authentication through your
                          actual authentication provider.
                        </p>
                      </div>
                    </div>
                  </div>

                  <SettingRow
                    icon={LockKeyhole}
                    title="Two-factor authentication"
                    description="Enable an additional verification step when signing in."
                    checked={security.twoFactor}
                    onChange={(v) => updateSecurity("twoFactor", v)}
                  />
                  <SettingRow
                    icon={Bell}
                    title="Login alerts"
                    description="Request notifications for new or unusual account sign-ins."
                    checked={security.loginAlerts}
                    onChange={(v) => updateSecurity("loginAlerts", v)}
                  />
                  <SettingRow
                    icon={Activity}
                    title="Session expiry"
                    description="Require users to sign in again after a period of inactivity."
                    checked={security.sessionExpiry}
                    onChange={(v) => updateSecurity("sessionExpiry", v)}
                  />
                  <SettingRow
                    icon={KeyRound}
                    title="Strong password policy"
                    description="Require secure passwords through your authentication provider."
                    checked={security.strongPasswords}
                    onChange={(v) => updateSecurity("strongPasswords", v)}
                  />
                </Panel>
              </>
            )}

            {/* Footer Save */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:px-5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-emerald-600" />
                Review your settings before publishing changes.
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {saved && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 size={15} />
                    Ready
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/15 transition hover:bg-violet-700 active:scale-[0.98] disabled:opacity-50"
                >
                  {saved ? <Check size={16} /> : <Save size={16} />}
                  {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Invite team member modal */}
      {showInvite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowInvite(false);
          }}
        >
          <div className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 p-5">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Users size={19} />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add team member
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Add a team member to the local settings preview.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowInvite(false)}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={inviteMember} className="space-y-4 p-5">
              <Field
                label="Full name"
                value={inviteName}
                onChange={setInviteName}
                placeholder="Enter full name"
              />
              <Field
                label="Email address"
                value={inviteEmail}
                onChange={setInviteEmail}
                type="email"
                placeholder="name@company.com"
              />
              <SelectField
                label="Role"
                value={inviteRole}
                onChange={setInviteRole}
                options={["Admin", "Editor", "Developer", "Viewer"]}
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInvite(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  <Users size={15} />
                  Add member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
