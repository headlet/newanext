"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { logoutUser } from "@/app/lib/auth";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseApp } from "@/app/lib/firebase";
import { getUserProfile } from "@/app/lib/db/user";

/* ------------------------------------------------------------------ */
/*  CONTENT                                                           */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses", mega: true },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const CONTACTS = [
  {
    label: "Enquiry",
    value: "+977-9847484645",
    href: "tel:+9779847484645",
    icon: "headset",
  },
  {
    label: "Technical support",
    value: "+977-9716686870",
    href: "tel:+9779716686870",
    icon: "phone",
  },
  {
    label: "Community",
    value: "+977-9741704073",
    href: "https://wa.me/9779741704073",
    icon: "whatsapp",
  },
];

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100094078966920",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/newa_next",
    icon: "instagram",
  },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Newanext",
    icon: "youtube",
  },
  { name: "TikTok", href: "#", icon: "tiktok" },
  { name: "whatsapp", href: "https://wa.me/9716686870", icon: "whatsapp" },
];

const COURSE_CATEGORIES = [
  {
    id: "programming",
    title: "Programming and development",
    desc: "Build apps, backends and full-stack products",
    courses: [
      {
        name: "Full-Stack MERN course in Nepal",
        href: "/courses/full-stack-mern",
      },
      { name: "Python Django course in Nepal", href: "/courses/python-django" },
      {
        name: "Frontend software engineering course",
        href: "/courses/frontend-engineering",
      },
      {
        name: "Data Structures and Algorithms course in Nepal",
        href: "/courses/dsa",
      },
      { name: "Complete Flutter course in Nepal", href: "/courses/flutter" },
      {
        name: "WordPress training course in Nepal",
        href: "/courses/wordpress",
      },
    ],
  },
  {
    id: "ai-data",
    title: "AI and data",
    desc: "Work with LLMs, agents, ML and analytics",
    courses: [
      {
        name: "AI and Machine Learning course in Nepal",
        href: "/courses/ai-machine-learning",
      },
      {
        name: "Data Analytics course in Nepal",
        href: "/courses/data-analytics",
      },
      { name: "LLM and AI Agents course", href: "/courses/llm-agents" },
    ],
  },
  {
    id: "design",
    title: "Design and creative",
    desc: "UI/UX, graphics and video",
    courses: [
      { name: "UI/UX Design course in Nepal", href: "/courses/ui-ux" },
      {
        name: "Graphic Design course in Nepal",
        href: "/courses/graphic-design",
      },
      { name: "Video Editing course in Nepal", href: "/courses/video-editing" },
    ],
  },
  {
    id: "marketing",
    title: "Digital marketing",
    desc: "SEO, ads and growth marketing",
    courses: [
      {
        name: "Digital Marketing course in Nepal",
        href: "/courses/digital-marketing",
      },
      { name: "SEO training course in Nepal", href: "/courses/seo" },
      { name: "Social Media Ads course", href: "/courses/social-media-ads" },
    ],
  },
  {
    id: "testing",
    title: "Testing, security and cloud",
    desc: "QA, ethical hacking and DevOps",
    courses: [
      {
        name: "Software Testing (QA) course in Nepal",
        href: "/courses/qa-testing",
      },
      {
        name: "Ethical Hacking course in Nepal",
        href: "/courses/ethical-hacking",
      },
      {
        name: "DevOps and Cloud course in Nepal",
        href: "/courses/devops-cloud",
      },
    ],
  },
  {
    id: "career",
    title: "Career and management",
    desc: "Project management and HR",
    courses: [
      {
        name: "Project Management course in Nepal",
        href: "/courses/project-management",
      },
      { name: "HR Management course in Nepal", href: "/courses/hr-management" },
    ],
  },
  {
    id: "accounting",
    title: "Accounting and finance",
    desc: "Professional accounting, tax and OCR training",
    courses: [
      {
        name: "Professional Accounting course in Nepal",
        href: "/courses/accounting",
      },
      { name: "Tax and VAT training in Nepal", href: "/courses/tax-vat" },
      { name: "OCR training course", href: "/courses/ocr" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering and CAD",
    desc: "AutoCAD, SolidWorks and design drafting",
    courses: [
      { name: "AutoCAD course in Nepal", href: "/courses/autocad" },
      { name: "SolidWorks course in Nepal", href: "/courses/solidworks" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ICONS                                                             */
/* ------------------------------------------------------------------ */

function Icon({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) {
  const fill = {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;
  const line = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "facebook":
      return (
        <svg {...fill}>
          <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...line}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...fill}>
          <path d="M6.9 8.6H3.6V20h3.3zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 20v-6.3c0-3.1-1.7-4.5-3.9-4.5-1.8 0-2.6 1-3 1.7V8.6H10.2V20h3.3v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3V20z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...fill}>
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...fill}>
          <path d="M16.6 3h-2.9v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.9a5.6 5.6 0 1 0 4.7 5.5V9.2a6.6 6.6 0 0 0 3.8 1.2V7.5A3.8 3.8 0 0 1 16.6 3z" />
        </svg>
      );
    case "headset":
      return (
        <svg {...line}>
          <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
          <path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...line}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...line}>
          <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.2-1.8-1-.8.7a3 3 0 0 1-1.6-1.6l.7-.8-1-1.8z" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...line}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...line}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "close":
      return (
        <svg {...line}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "menu":
      return (
        <svg {...line}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState("/dashboard");
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check super admin email override or fetch roleId from Firestore
        const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim().toLowerCase());
        const isSuperAdmin =
          user.email && adminEmails.includes(user.email.toLowerCase());

        if (isSuperAdmin) {
          setDashboardUrl("/admin");
        } else {
          try {
            const profile = await getUserProfile(user.uid);
            const roleId = profile?.roleId?.toLowerCase() || "student";
            if (roleId === "admin") {
              setDashboardUrl("/admin");
            } else if (roleId === "instructor") {
              setDashboardUrl("/instructor");
            } else {
              setDashboardUrl("/student");
            }
          } catch (error) {
            console.error("Error fetching roleId for navbar:", error);
            setDashboardUrl("/");
          }
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutUser();
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(COURSE_CATEGORIES[0].id);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileCoursesOpen(false);
  };
  const closeCourses = () => setCoursesOpen(false);

  const current =
    COURSE_CATEGORIES.find((c) => c.id === activeCategory) ??
    COURSE_CATEGORIES[0];

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

  return (
    <>
      {/* ============ UTILITY STRIP (desktop) ============ */}
      <div className="relative hidden border-b border-gray-100 bg-white md:block">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-2 pt-[11px]">
          <ul className="flex items-center gap-8">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a href={c.href} className="group flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-500/10 text-purple-600 ring-1 ring-purple-600/10 transition group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-500 group-hover:text-white group-hover:shadow-md">
                    <Icon name={c.icon} className="h-4 w-4" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[11px] font-medium text-gray-500">
                      {c.label}
                    </span>
                    <span className="block text-[13px] font-bold tabular-nums text-gray-900 transition-colors group-hover:text-purple-600">
                      {c.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition duration-200 hover:-translate-y-0.5 hover:bg-gradient-to-tr hover:from-blue-600 hover:via-purple-600 hover:to-pink-500 hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600"
                >
                  <Icon name={s.icon} className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ============ MAIN HEADER ============ */}
      <header
        onMouseLeave={closeCourses}
        onKeyDown={(e) => e.key === "Escape" && closeCourses()}
        className="sticky top-0 z-50 border-b border-[#111827]/10 bg-white"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 shadow-md">
              <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                <Image
                  src="/logo.png"
                  alt="NewaNext Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </span>
            </span>
            <span className="text-xl font-extrabold tracking-tight text-[#111827]">
              Newa
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Next
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden h-full items-center gap-1 md:flex"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              const base =
                "relative flex h-full items-center gap-1 px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA]";
              const tone =
                active || (link.mega && coursesOpen)
                  ? "text-[#111827]"
                  : "text-[#111827]/65 hover:text-[#111827]";
              const underline = (
                <span
                  className={`absolute inset-x-3.5 bottom-0 h-[3px] rounded-t bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-transform duration-200 origin-left ${
                    active || (link.mega && coursesOpen)
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              );

              if (link.mega) {
                return (
                  <button
                    key={link.name}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={coursesOpen}
                    onMouseEnter={() => setCoursesOpen(true)}
                    onClick={() => setCoursesOpen((v) => !v)}
                    className={`${base} ${tone}`}
                  >
                    {link.name}
                    <Icon
                      name="chevron"
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`}
                    />
                    {underline}
                  </button>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={closeCourses}
                  className={`${base} ${tone}`}
                >
                  {link.name}
                  {underline}
                </Link>
              );
            })}
          </nav>

          {/* Right side (Dashboard / Login / Logout) */}
          <div className="flex items-center gap-3">
            {!authLoading &&
              (currentUser ? (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href={dashboardUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 py-2.5 px-4 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    title="Logout"
                    className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 p-2.5 text-red-600 shadow-sm transition hover:bg-red-100 active:scale-95 disabled:opacity-60"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-2.5 pl-5 pr-2.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg hover:opacity-95 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9333EA] md:inline-flex"
                >
                  Login
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-white">
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#111827]/15 text-[#111827] md:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ============ MEGA MENU ============ */}
        <div
          className={`absolute inset-x-0 top-full hidden border-b border-[#111827]/10 bg-white shadow-[0_24px_40px_-24px_rgba(30,27,75,0.35)] transition duration-200 md:block ${
            coursesOpen
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-1 opacity-0"
          }`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-10 px-6 py-8">
            <ul
              className="col-span-4 border-l border-[#111827]/10"
              role="tablist"
              aria-orientation="vertical"
            >
              {COURSE_CATEGORIES.map((cat) => {
                const selected = cat.id === activeCategory;
                return (
                  <li key={cat.id} className="relative">
                    <span
                      className={`absolute -left-px top-0 h-full w-[3px] bg-gradient-to-b from-blue-600 via-purple-600 to-pink-500 transition-opacity ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onMouseEnter={() => setActiveCategory(cat.id)}
                      onFocus={() => setActiveCategory(cat.id)}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`block w-full px-5 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA] ${
                        selected ? "bg-purple-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={`block text-sm font-semibold ${
                          selected ? "text-[#111827]" : "text-[#111827]/75"
                        }`}
                      >
                        {cat.title}
                      </span>
                      <span className="block text-xs text-[#111827]/50">
                        {cat.desc}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="col-span-8" role="tabpanel">
              <h3 className="text-2xl font-extrabold tracking-tight text-[#111827]">
                {current.title}
              </h3>
              <p className="mt-1 text-sm text-[#111827]/60">{current.desc}</p>

              <ul className="mt-6 grid grid-cols-2 gap-x-8">
                {current.courses.map((course) => (
                  <li
                    key={course.href}
                    className="border-t border-[#111827]/10"
                  >
                    <Link
                      href={course.href}
                      onClick={closeCourses}
                      className="group flex items-center justify-between gap-4 py-4 text-sm font-semibold text-[#111827] transition-colors hover:text-[#9333EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA]"
                    >
                      <span>{course.name}</span>
                      <Icon
                        name="arrow"
                        className="h-4 w-4 shrink-0 -translate-x-1 text-[#9333EA] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MOBILE DRAWER ============ */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-[#111827]/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#111827]/10 px-5">
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 shadow-sm">
                <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <Image
                    src="/logo.png"
                    alt="NewaNext Logo"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </span>
              </span>
              <span className="text-lg font-extrabold text-[#111827]">
                Newa
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Next
                </span>
              </span>
            </span>
            <button
              type="button"
              onClick={closeMobile}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#111827]/15 text-[#111827]"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);

                if (link.mega) {
                  return (
                    <div
                      key={link.name}
                      className="border-b border-[#111827]/10"
                    >
                      <button
                        type="button"
                        onClick={() => setMobileCoursesOpen((v) => !v)}
                        aria-expanded={mobileCoursesOpen}
                        className={`flex w-full items-center justify-between py-4 text-left text-lg font-bold ${
                          active ? "text-[#9333EA]" : "text-[#111827]"
                        }`}
                      >
                        {link.name}
                        <Icon
                          name="chevron"
                          className={`h-5 w-5 transition-transform duration-200 ${mobileCoursesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {mobileCoursesOpen && (
                        <div className="mb-4 space-y-5 border-l-2 border-[#9333EA] pl-4">
                          {COURSE_CATEGORIES.map((cat) => (
                            <div key={cat.id}>
                              <p className="text-sm font-bold text-[#111827]">
                                {cat.title}
                              </p>
                              <p className="mb-1 text-xs text-[#111827]/50">
                                {cat.desc}
                              </p>
                              <ul>
                                {cat.courses.map((course) => (
                                  <li key={course.href}>
                                    <Link
                                      href={course.href}
                                      onClick={closeMobile}
                                      className="block py-1.5 text-sm text-[#111827]/80 hover:text-[#9333EA]"
                                    >
                                      {course.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobile}
                    className={`border-b border-[#111827]/10 py-4 text-lg font-bold ${
                      active ? "text-[#9333EA]" : "text-[#111827]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <ul className="mt-6 space-y-3">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="block">
                    <span className="block text-xs text-[#111827]/55">
                      {c.label}
                    </span>
                    <span className="block text-sm font-semibold tabular-nums text-[#111827]">
                      {c.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-white hover:text-[#9333EA]"
                  >
                    <Icon name={s.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 border-t border-[#111827]/10 p-5 space-y-3">
            {!authLoading &&
              (currentUser ? (
                <>
                  <Link
                    href={dashboardUrl}
                    onClick={closeMobile}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 border border-red-200 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                  >
                    <LogOut size={18} />
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="block w-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3.5 shadow-lg text-center text-sm font-bold text-white"
                >
                  Login / Sign Up
                </Link>
              ))}
            <p className="mt-3 text-center text-xs font-medium text-[#111827]/50">
              © NewaNext Technologies
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
