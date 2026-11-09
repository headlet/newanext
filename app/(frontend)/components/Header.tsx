
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Search, X } from "lucide-react";
import { logoutUser } from "@/app/lib/auth";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseApp } from "@/app/lib/firebase";
import { getUserProfile } from "@/app/lib/db/user";

/* ------------------------------------------------------------------ */
/* NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/Contact" },
];

/* ------------------------------------------------------------------ */
/* COURSE DATA                                                        */
/* ------------------------------------------------------------------ */

const COURSE_CATEGORIES = [
  {
    id: "programming",
    title: "Programming and development",
    courses: [
      { name: "Full-Stack MERN course in Nepal", href: "/mernstack-course-in-Nepal" },
      { name: "Python Django course in Nepal", href: "/python-Django-course-in-Nepal" },
      { name: "Software Engineering Course with AI", href: "/software-engineering-with-ai-in-Nepal" },
      { name: "Data Structures and Algorithms course in Nepal", href: "/data-structure-and-algorithm-in-Nepal" },
      { name: "Complete Flutter course in Nepal", href: "/flutter-course-in-Nepal" },
      { name: "Web designing course in Nepal", href: "/web-designing-course-in-Nepal" },
    ],
  },
  {
    id: "ai-data",
    title: "AI and data",
    courses: [
      { name: "AI and Machine Learning course in Nepal", href: "/courses/ai-machine-learning" },
      { name: "Data Analytics course in Nepal", href: "/courses/data-analytics" },
      { name: "LLM and AI Agents course", href: "/courses/llm-agents" },
    ],
  },
  {
    id: "design",
    title: "Design and creative",
    courses: [
      { name: "UI/UX Design course in Nepal", href: "/courses/ui-ux" },
      { name: "Graphic Design course in Nepal", href: "/courses/graphic-design" },
      { name: "Video Editing course in Nepal", href: "/courses/video-editing" },
    ],
  },
  {
    id: "marketing",
    title: "Digital marketing",
    courses: [
      { name: "Digital Marketing course in Nepal", href: "/courses/digital-marketing" },
      { name: "SEO training course in Nepal", href: "/courses/seo" },
      { name: "Social Media Ads course", href: "/courses/social-media-ads" },
    ],
  },
  {
    id: "testing",
    title: "Testing, security and cloud",
    courses: [
      { name: "Software Testing (QA) course in Nepal", href: "/courses/qa-testing" },
      { name: "Ethical Hacking course in Nepal", href: "/courses/ethical-hacking" },
      { name: "DevOps and Cloud course in Nepal", href: "/courses/devops-cloud" },
    ],
  },
  {
    id: "career",
    title: "Career and management",
    courses: [
      { name: "Project Management course in Nepal", href: "/courses/project-management" },
      { name: "HR Management course in Nepal", href: "/courses/hr-management" },
    ],
  },
  {
    id: "accounting",
    title: "Accounting and finance",
    courses: [
      { name: "Professional Accounting course in Nepal", href: "/courses/accounting" },
      { name: "Tax and VAT training in Nepal", href: "/courses/tax-vat" },
      { name: "OCR training course", href: "/courses/ocr" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering and CAD",
    courses: [
      { name: "AutoCAD course in Nepal", href: "/courses/autocad" },
      { name: "SolidWorks course in Nepal", href: "/courses/solidworks" },
    ],
  },
];

const ALL_COURSES = COURSE_CATEGORIES.flatMap((category) =>
  category.courses.map((course) => ({
    ...course,
    category: category.title,
  }))
);

/* ------------------------------------------------------------------ */
/* CONTACTS                                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* SOCIAL LINKS                                                       */
/* ------------------------------------------------------------------ */

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
  {
    name: "whatsapp",
    href: "https://wa.me/9716686870",
    icon: "whatsapp",
  },
];

/* ------------------------------------------------------------------ */
/* ICONS                                                              */
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

    case "arrow":
      return (
        <svg {...line}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );

    case "menu":
      return (
        <svg {...line}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );

    case "close":
      return (
        <svg {...line}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* HEADER COMPONENT                                                   */
/* ------------------------------------------------------------------ */

export default function Header() {
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState("/dashboard");
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  // Course search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Filter courses
  const filteredCourses = ALL_COURSES.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ).slice(0, 6);

  /* ---------------------------------------------------------------- */
  /* AUTHENTICATION                                                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const auth = getAuth(getFirebaseApp());

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
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

  /* ---------------------------------------------------------------- */
  /* LOGOUT                                                           */
  /* ---------------------------------------------------------------- */

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

  /* ---------------------------------------------------------------- */
  /* MOBILE MENU                                                      */
  /* ---------------------------------------------------------------- */

  const closeMobile = () => {
    setMobileOpen(false);
  };

  /* ---------------------------------------------------------------- */
  /* COURSE SEARCH                                                    */
  /* ---------------------------------------------------------------- */

  const handleCourseSelect = () => {
    setSearchQuery("");
    setSearchOpen(false);
  };

  /* ---------------------------------------------------------------- */
  /* ACTIVE NAVIGATION                                                */
  /* ---------------------------------------------------------------- */

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.href === "/"
      ? pathname === "/"
      : pathname.startsWith(link.href);

  /* ---------------------------------------------------------------- */
  /* JSX                                                              */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* ============ UTILITY STRIP ============ */}

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

      <header className="sticky top-0 z-50 border-b border-[#111827]/10 bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">

          {/* Logo */}

          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA]"
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

          {/* Desktop Navigation */}

          <nav
            className="hidden h-full items-center gap-1 md:flex"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link);

              const base =
                "relative flex h-full items-center px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#9333EA]";

              const tone = active
                ? "text-[#111827]"
                : "text-[#111827]/65 hover:text-[#111827]";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${base} ${tone}`}
                >
                  {link.name}

                  <span
                    className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-transform duration-200 origin-left ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}

            {/* COURSE SEARCH INPUT - RIGHT SIDE OF CONTACT */}

            <div className="relative ml-2 w-[190px] lg:w-[220px]">
              <div
                className={`flex h-10 items-center gap-2 rounded-full border bg-gray-50 px-3 transition-all duration-200 ${
                  searchOpen
                    ? "border-purple-400 bg-white shadow-sm ring-2 ring-purple-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Search className="h-4 w-4 shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }

                    if (e.key === "Enter" && filteredCourses.length > 0) {
                      window.location.href = filteredCourses[0].href;
                    }
                  }}
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="min-w-0 flex-1 bg-transparent text-xs font-medium text-gray-800 outline-none placeholder:text-gray-400"
                />

                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(true);
                    }}
                    className="shrink-0 text-gray-400 transition hover:text-gray-700"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* SEARCH RESULTS */}

              {searchOpen && searchQuery.trim() && (
                <div className="absolute right-0 top-full z-[70] mt-2 w-[300px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Search Results
                    </p>
                  </div>

                  {filteredCourses.length > 0 ? (
                    <ul className="max-h-[320px] overflow-y-auto py-2">
                      {filteredCourses.map((course) => (
                        <li key={course.href}>
                          <Link
                            href={course.href}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleCourseSelect}
                            className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-purple-50"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                              <Search size={15} />
                            </span>

                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-gray-800">
                                {course.name}
                              </span>

                              <span className="mt-1 block text-xs text-gray-400">
                                {course.category}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Search className="mx-auto mb-2 h-6 w-6 text-gray-300" />

                      <p className="text-sm font-semibold text-gray-700">
                        No courses found
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Try another course name.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-100 px-4 py-2.5">
                    <Link
                      href="/courses"
                      onClick={handleCourseSelect}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800"
                    >
                      View all courses →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Side: Dashboard / Login / Logout */}

          <div className="flex shrink-0 items-center gap-3">
            {!authLoading &&
              (currentUser ? (
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href={dashboardUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

            {/* Mobile Menu Button */}

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
      </header>

      {/* ============ MOBILE DRAWER ============ */}

      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          mobileOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}

        <div
          onClick={closeMobile}
          className={`absolute inset-0 bg-[#111827]/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}

        <aside
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}

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

          {/* Mobile Content */}

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {/* Mobile Search */}

            <div className="mb-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  if (filteredCourses.length > 0) {
                    window.location.href = filteredCourses[0].href;
                  } else if (!searchQuery.trim()) {
                    window.location.href = "/courses";
                  }
                }}
                className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100"
              >
                <Search size={17} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                )}
              </form>

              {searchQuery.trim() && (
                <div className="mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        onClick={() => {
                          closeMobile();
                          handleCourseSelect();
                        }}
                        className="block border-b border-gray-100 px-3 py-3 text-sm last:border-0 hover:bg-purple-50"
                      >
                        <span className="block font-semibold text-gray-800">
                          {course.name}
                        </span>
                        <span className="mt-1 block text-xs text-gray-400">
                          {course.category}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-4 text-center text-sm text-gray-500">
                      No courses found.
                    </p>
                  )}

                  <Link
                    href="/courses"
                    onClick={closeMobile}
                    className="block border-t border-gray-100 px-3 py-3 text-sm font-bold text-purple-600"
                  >
                    View all courses →
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}

            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);

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

            {/* Mobile Contacts */}

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

            {/* Mobile Social Links */}

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

          {/* Mobile Bottom Actions */}

          <div className="shrink-0 space-y-3 border-t border-[#111827]/10 p-5">
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                  >
                    <LogOut size={18} />
                    <span>
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="block w-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3.5 text-center text-sm font-bold text-white shadow-lg"
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
