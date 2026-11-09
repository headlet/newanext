
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Star,
  Code2,
  Brain,
  Palette,
  Megaphone,
  ShieldCheck,
  BriefcaseBusiness,
  Calculator,
  DraftingCompass,
  GraduationCap,
  BookOpen,
  Sparkles,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// =============================================
// TYPES
// =============================================

type Category =
  | "Programming and Development"
  | "AI and Data"
  | "Design and Creative"
  | "Digital Marketing"
  | "Testing, Security and Cloud"
  | "Career and Management"
  | "Accounting and Finance"
  | "Engineering and CAD";

type Course = {
  title: string;
  description: string;
  category: Category;
  level: string;
  duration: string;
  href: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  startLabel: string;
  featured?: boolean;
};

// =============================================
// CATEGORIES
// =============================================

const categories = [
  {
    name: "All Courses",
    description: "Explore all learning programs",
    icon: GraduationCap,
  },
  {
    name: "Programming and Development",
    description: "Build apps, backends and full-stack products",
    icon: Code2,
  },
  {
    name: "AI and Data",
    description: "Work with LLMs, agents, ML and analytics",
    icon: Brain,
  },
  {
    name: "Design and Creative",
    description: "UI/UX, graphics and video",
    icon: Palette,
  },
  {
    name: "Digital Marketing",
    description: "SEO, ads and growth marketing",
    icon: Megaphone,
  },
  {
    name: "Testing, Security and Cloud",
    description: "QA, ethical hacking and DevOps",
    icon: ShieldCheck,
  },
  {
    name: "Career and Management",
    description: "Project management and HR",
    icon: BriefcaseBusiness,
  },
  {
    name: "Accounting and Finance",
    description: "Accounting, tax and finance",
    icon: Calculator,
  },
  {
    name: "Engineering and CAD",
    description: "AutoCAD, SolidWorks and drafting",
    icon: DraftingCompass,
  },
] as const;

// =============================================
// COURSE DATA
// Update prices, images and routes as required.
// =============================================

const courses: Course[] = [
  // PROGRAMMING AND DEVELOPMENT

  {
    title: "Full Stack Web Development",
    description:
      "Learn frontend, backend, databases and build complete real-world web applications.",
    category: "Programming and Development",
    level: "Beginner to Advanced",
    duration: "3 Months",
    href: "/full-stack-development-course-in-Nepal",
    image: "/images/courses/full-stack.jpg",
    price: 5000,
    originalPrice: 10000,
    rating: 5.0,
    startLabel: "Starts Tomorrow",
    featured: true,
  },
  {
    title: "Software Engineering with AI",
    description:
      "Learn modern software engineering workflows and build applications using AI tools.",
    category: "Programming and Development",
    level: "Beginner to Advanced",
    duration: "3 Months",
    href: "/software-engineering-with-ai",
    image: "/images/courses/software-engineering-ai.jpg",
    price: 5000,
    originalPrice: 10000,
    rating: 5.0,
    startLabel: "Enrollment Open",
    featured: true,
  },
  {
    title: "Web Designing Course",
    description:
      "Master HTML, CSS, JavaScript, Bootstrap and responsive website development.",
    category: "Programming and Development",
    level: "Beginner",
    duration: "2 Months",
    href: "/web-designing-course-in-Nepal",
    image: "/images/courses/web-designing.jpg",
    price: 2500,
    originalPrice: 5000,
    rating: 4.9,
    startLabel: "Starts in 5 days",
  },
  {
    title: "Next.js Development",
    description:
      "Build modern full-stack applications using Next.js, React and server-side tools.",
    category: "Programming and Development",
    level: "Intermediate",
    duration: "2 Months",
    href: "/nextjs-development-course",
    image: "/images/courses/nextjs.jpg",
    price: 3500,
    originalPrice: 6000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "Python and Django",
    description:
      "Learn Python programming, Django, databases and backend development.",
    category: "Programming and Development",
    level: "Beginner to Advanced",
    duration: "3 Months",
    href: "/python-django-course-in-Nepal",
    image: "/images/courses/python-django.jpg",
    price: 4000,
    originalPrice: 7000,
    rating: 4.8,
    startLabel: "Starts in 10 days",
  },
  {
    title: "Complete Flutter Development",
    description:
      "Create cross-platform mobile applications using Flutter and Dart.",
    category: "Programming and Development",
    level: "Beginner to Advanced",
    duration: "3 Months",
    href: "/flutter-course-in-Nepal",
    image: "/images/courses/flutter.jpg",
    price: 4500,
    originalPrice: 8000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "Data Structures and Algorithms",
    description:
      "Understand problem-solving, algorithms, data structures and coding patterns.",
    category: "Programming and Development",
    level: "Intermediate",
    duration: "2 Months",
    href: "/dsa-course-in-Nepal",
    image: "/images/courses/dsa.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.8,
    startLabel: "Starts in 15 days",
  },
  {
    title: "JavaScript Programming",
    description:
      "Build a strong foundation in JavaScript, DOM, asynchronous programming and APIs.",
    category: "Programming and Development",
    level: "Beginner to Advanced",
    duration: "2 Months",
    href: "/javascript-course",
    image: "/images/courses/javascript.jpg",
    price: 2500,
    originalPrice: 4500,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },

  // AI AND DATA

  {
    title: "AI and Machine Learning",
    description:
      "Understand artificial intelligence, machine learning and practical AI applications.",
    category: "AI and Data",
    level: "Beginner to Advanced",
    duration: "3 Months",
    href: "/ai-machine-learning-course-in-Nepal",
    image: "/images/courses/machine-learning.jpg",
    price: 5000,
    originalPrice: 9000,
    rating: 5.0,
    startLabel: "Starts in 10 days",
    featured: true,
  },
  {
    title: "Data Analytics",
    description:
      "Learn data analysis, visualization, reporting and data-driven decision making.",
    category: "AI and Data",
    level: "Beginner",
    duration: "2 Months",
    href: "/data-analytics-course-in-Nepal",
    image: "/images/courses/data-analytics.jpg",
    price: 3500,
    originalPrice: 6000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "LLM and AI Agents",
    description:
      "Build AI-powered applications, work with LLMs and create intelligent AI agents.",
    category: "AI and Data",
    level: "Intermediate",
    duration: "2 Months",
    href: "/llm-ai-agents-course",
    image: "/images/courses/llm-agents.jpg",
    price: 4500,
    originalPrice: 7500,
    rating: 5.0,
    startLabel: "Starts in 15 days",
    featured: true,
  },

  // DESIGN AND CREATIVE

  {
    title: "UI/UX Design",
    description:
      "Learn user research, wireframing, prototyping and modern interface design.",
    category: "Design and Creative",
    level: "Beginner",
    duration: "2 Months",
    href: "/ui-ux-design-course",
    image: "/images/courses/ui-ux.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "Graphic Design",
    description:
      "Learn visual communication, branding, typography and graphic design tools.",
    category: "Design and Creative",
    level: "Beginner",
    duration: "2 Months",
    href: "/graphic-design-course",
    image: "/images/courses/graphic-design.jpg",
    price: 2500,
    originalPrice: 4500,
    rating: 4.8,
    startLabel: "Starts in 5 days",
  },
  {
    title: "Video Editing",
    description:
      "Learn video editing, transitions, storytelling and professional editing workflows.",
    category: "Design and Creative",
    level: "Beginner",
    duration: "2 Months",
    href: "/video-editing-course",
    image: "/images/courses/video-editing.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.8,
    startLabel: "Enrollment Open",
  },

  // DIGITAL MARKETING

  {
    title: "Digital Marketing",
    description:
      "Learn digital marketing strategies, campaigns and online business growth.",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "2 Months",
    href: "/digital-marketing-course",
    image: "/images/courses/digital-marketing.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "SEO Training",
    description:
      "Understand search engine optimization, keyword research and website ranking.",
    category: "Digital Marketing",
    level: "Beginner to Intermediate",
    duration: "1 Month",
    href: "/seo-course",
    image: "/images/courses/seo.jpg",
    price: 2000,
    originalPrice: 3500,
    rating: 4.8,
    startLabel: "Starts in 7 days",
  },
  {
    title: "Social Media Marketing",
    description:
      "Learn social media strategy, content planning, audience growth and advertising.",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "1 Month",
    href: "/social-media-marketing-course",
    image: "/images/courses/social-media.jpg",
    price: 2000,
    originalPrice: 3500,
    rating: 4.8,
    startLabel: "Enrollment Open",
  },

  // TESTING, SECURITY AND CLOUD

  {
    title: "Software Testing and QA",
    description:
      "Learn software testing fundamentals, test cases, bug reporting and automation basics.",
    category: "Testing, Security and Cloud",
    level: "Beginner",
    duration: "2 Months",
    href: "/software-testing-course",
    image: "/images/courses/software-testing.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 5.0,
    startLabel: "Starts in 10 days",
  },
  {
    title: "Cybersecurity Fundamentals",
    description:
      "Understand network security, common vulnerabilities and cybersecurity practices.",
    category: "Testing, Security and Cloud",
    level: "Beginner",
    duration: "2 Months",
    href: "/cybersecurity-course",
    image: "/images/courses/cybersecurity.jpg",
    price: 3500,
    originalPrice: 6000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "Docker and DevOps",
    description:
      "Learn Docker, containers, deployment workflows and DevOps fundamentals.",
    category: "Testing, Security and Cloud",
    level: "Intermediate",
    duration: "1 Month",
    href: "/docker-devops-course",
    image: "/images/courses/docker-devops.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.9,
    startLabel: "Starts in 15 days",
  },
  {
    title: "Cloud Computing",
    description:
      "Explore cloud infrastructure, hosting, deployment and cloud computing concepts.",
    category: "Testing, Security and Cloud",
    level: "Beginner to Intermediate",
    duration: "2 Months",
    href: "/cloud-computing-course",
    image: "/images/courses/cloud-computing.jpg",
    price: 3500,
    originalPrice: 6000,
    rating: 4.8,
    startLabel: "Enrollment Open",
  },

  // CAREER AND MANAGEMENT

  {
    title: "Project Management",
    description:
      "Learn project planning, task management, teamwork and project delivery.",
    category: "Career and Management",
    level: "Beginner",
    duration: "1 Month",
    href: "/project-management-course",
    image: "/images/courses/project-management.jpg",
    price: 2500,
    originalPrice: 4000,
    rating: 4.8,
    startLabel: "Enrollment Open",
  },
  {
    title: "Professional Communication Skills",
    description:
      "Improve workplace communication, presentation and professional collaboration.",
    category: "Career and Management",
    level: "All Levels",
    duration: "1 Month",
    href: "/communication-skills-course",
    image: "/images/courses/communication.jpg",
    price: 1500,
    originalPrice: 2500,
    rating: 4.8,
    startLabel: "Starts in 5 days",
  },

  // ACCOUNTING AND FINANCE

  {
    title: "Computerized Accounting",
    description:
      "Learn practical accounting, bookkeeping and computerized accounting workflows.",
    category: "Accounting and Finance",
    level: "Beginner",
    duration: "2 Months",
    href: "/computerized-accounting-course",
    image: "/images/courses/accounting.jpg",
    price: 2500,
    originalPrice: 4000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "Tax, VAT and TDS Training",
    description:
      "Understand practical tax concepts, VAT, TDS and basic financial compliance.",
    category: "Accounting and Finance",
    level: "Beginner to Intermediate",
    duration: "1 Month",
    href: "/tax-vat-tds-course",
    image: "/images/courses/tax-vat.jpg",
    price: 2000,
    originalPrice: 3500,
    rating: 4.8,
    startLabel: "Starts in 7 days",
  },

  // ENGINEERING AND CAD

  {
    title: "AutoCAD",
    description:
      "Learn technical drawing, 2D drafting and professional AutoCAD workflows.",
    category: "Engineering and CAD",
    level: "Beginner",
    duration: "2 Months",
    href: "/autocad-course",
    image: "/images/courses/autocad.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.9,
    startLabel: "Enrollment Open",
  },
  {
    title: "SolidWorks",
    description:
      "Learn 3D modelling, mechanical design and product visualization.",
    category: "Engineering and CAD",
    level: "Beginner to Intermediate",
    duration: "2 Months",
    href: "/solidworks-course",
    image: "/images/courses/solidworks.jpg",
    price: 3500,
    originalPrice: 6000,
    rating: 4.8,
    startLabel: "Starts in 10 days",
  },
  {
    title: "Civil Engineering Drawing",
    description:
      "Understand building drawings, drafting standards and technical design basics.",
    category: "Engineering and CAD",
    level: "Beginner",
    duration: "2 Months",
    href: "/civil-engineering-drawing-course",
    image: "/images/courses/civil-drawing.jpg",
    price: 3000,
    originalPrice: 5000,
    rating: 4.8,
    startLabel: "Enrollment Open",
  },
];

// =============================================
// COURSE CARD
// =============================================

function CourseCard({ course }: { course: Course }) {
  const discount = Math.round(
    ((course.originalPrice - course.price) /
      course.originalPrice) *
      100
  );

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      {/* COURSE IMAGE */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* OFFER BADGE */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#F59E0B] px-3 py-1.5 text-xs font-bold text-[#0F172A] shadow-md">
          ⚡ {course.startLabel}
        </span>

        {/* RATING */}
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md">
          <Star size={13} fill="#F59E0B" color="#F59E0B" />
          {course.rating.toFixed(1)}
        </span>
      </div>

      {/* COURSE DETAILS */}
      <div className="flex h-[230px] flex-col p-4">

        <h3 className="line-clamp-1 text-base font-bold leading-6 text-slate-900 transition-colors group-hover:text-[#2563EB]">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-600">
          {course.description}
        </p>

        {/* META */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <GraduationCap size={14} />
            {course.level}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {course.duration}
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-auto border-t border-slate-100 pt-3">
          <p className="text-xl font-extrabold text-[#0F172A]">
            Rs. {course.price.toLocaleString("en-IN")}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-slate-400 line-through">
              Rs. {course.originalPrice.toLocaleString("en-IN")}
            </span>

            <span className="rounded-sm bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              {discount}% OFF
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">
              Course fee
            </span>

            <Link
              href={course.href}
              className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600 transition hover:bg-[#F59E0B] hover:text-[#0F172A]"
            >
              Curriculum
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

// =============================================
// FEATURED COURSES CAROUSEL
// =============================================

function FeaturedCarousel({
  courses,
}: {
  courses: Course[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>(
        "[data-course-card]"
      );

    if (!firstCard) return;

    const gap = 20;
    const amount = firstCard.offsetWidth + gap;

    const maxScroll =
      container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: amount,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft <= 5) {
        container.scrollTo({
          left: maxScroll,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -amount,
          behavior: "smooth",
        });
      }
    }
  };

  // AUTOMATIC SLOW SLIDING
  useEffect(() => {
    if (paused || courses.length <= 1) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (!container) return;

      const firstCard =
        container.querySelector<HTMLElement>(
          "[data-course-card]"
        );

      if (!firstCard) return;

      const amount = firstCard.offsetWidth + 20;

      const maxScroll =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: amount,
          behavior: "smooth",
        });
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [paused, courses.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(
            event.relatedTarget as Node | null
          )
        ) {
          setPaused(false);
        }
      }}
      className="relative"
    >
      {/* ARROWS */}
      <div className="mb-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous featured courses"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#2563EB] hover:bg-[#2563EB]"
        >
          <ChevronLeft size={21} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next featured courses"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-[#2563EB] hover:bg-[#2563EB]"
        >
          <ChevronRight size={21} />
        </button>
      </div>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <div
            key={course.title}
            data-course-card
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-40px)/3)]"
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {/* CAROUSEL INFO */}
      <div className="mt-1 flex items-center justify-center gap-2 text-xs text-slate-400">
        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
        Auto sliding · Hover to pause
      </div>
    </div>
  );
}

// =============================================
// MAIN PAGE
// =============================================

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] =
    useState("All Courses");

  const [search, setSearch] = useState("");

  // FEATURED COURSES
  const featuredCourses = courses.filter(
    (course) => course.featured
  );

  // FILTER COURSES
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All Courses" ||
        course.category === activeCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        course.title.toLowerCase().includes(searchText) ||
        course.description.toLowerCase().includes(searchText) ||
        course.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="relative overflow-hidden bg-[#0F172A]">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 lg:py-24">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/20 bg-[#F59E0B]/10 px-4 py-2 text-sm font-semibold text-[#F59E0B]">
            <Sparkles size={16} />
            NewaNext Academy
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Learn Skills.

            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-[#F59E0B] bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore practical courses in programming, artificial
            intelligence, design, business and technology. Learn
            by building real-world skills.
          </p>

          {/* SEARCH */}
          <div className="mx-auto mt-9 max-w-xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  if (e.target.value) {
                    setActiveCategory("All Courses");
                  }
                }}
                placeholder="Search courses..."
                className="h-14 w-full rounded-xl border border-white/10 bg-white/10 pl-12 pr-12 text-base text-white outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
                >
                  <X size={19} />
                </button>
              )}
            </div>

            <a
              href="#all-courses"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
            >
              Explore Courses
              <ArrowUpRight size={19} />
            </a>
          </div>

          {/* STATS */}
          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm text-slate-300">

            <span className="flex items-center gap-2">
              <BookOpen size={19} className="text-blue-400" />
              {courses.length}+ Courses
            </span>

            <span className="flex items-center gap-2">
              <GraduationCap
                size={20}
                className="text-purple-400"
              />
              8 Learning Categories
            </span>

            <span className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-[#F59E0B]"
              />
              Practical Learning
            </span>

          </div>
        </div>
      </section>

      {/* =====================================
          FEATURED COURSES
      ===================================== */}

      <section className="bg-[#0F172A] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
                Handpicked for you
              </p>

              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Featured Courses
              </h2>

              <p className="mt-3 text-base leading-7 text-slate-400">
                Explore our popular learning programs and start
                building your future.
              </p>
            </div>

            <a
              href="#all-courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F59E0B] transition hover:text-white"
            >
              View all courses
              <ArrowUpRight size={18} />
            </a>

          </div>

          <FeaturedCarousel courses={featuredCourses} />

        </div>
      </section>

      {/* =====================================
          ALL COURSES
      ===================================== */}

      <section
        id="all-courses"
        className="border-t border-white/10 bg-[#111C32] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          {/* SECTION HEADING */}
          <div className="mb-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              Course Directory
            </p>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Explore All Courses
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
              Find the right course for your interests and career
              goals. Choose a category or search for a specific course.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

            {/* CATEGORY SIDEBAR */}
            <aside className="h-fit rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-sm lg:sticky lg:top-24">

              <h3 className="mb-4 px-2 text-sm font-extrabold uppercase tracking-wider text-slate-400">
                Browse Categories
              </h3>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">

                {categories.map((category) => {
                  const Icon = category.icon;

                  const isActive =
                    activeCategory === category.name;

                  const count =
                    category.name === "All Courses"
                      ? courses.length
                      : courses.filter(
                          (course) =>
                            course.category === category.name
                        ).length;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category.name);
                      }}
                      className={`flex min-w-[230px] items-start gap-3 rounded-xl border p-3 text-left transition lg:min-w-0 ${
                        isActive
                          ? "border-blue-500/30 bg-blue-500/15"
                          : "border-transparent hover:border-white/10 hover:bg-white/5"
                      }`}
                    >

                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-white/5 text-slate-400"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between gap-2">

                          <span
                            className={`text-sm font-bold ${
                              isActive
                                ? "text-blue-400"
                                : "text-slate-200"
                            }`}
                          >
                            {category.name}
                          </span>

                          <span className="text-xs font-semibold text-slate-500">
                            {count}
                          </span>

                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {category.description}
                        </p>

                      </div>
                    </button>
                  );
                })}

              </div>
            </aside>

            {/* COURSE CONTENT */}
            <div>

              {/* COURSE HEADER */}
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {activeCategory}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Showing {filteredCourses.length} courses
                  </p>
                </div>

                {activeCategory !== "All Courses" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCategory("All Courses")
                    }
                    className="w-fit rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-[#2563EB] hover:text-blue-400"
                  >
                    Clear filter
                  </button>
                )}

              </div>

              {/* COURSE GRID */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.title}
                      course={course}
                    />
                  ))}

                </div>
              ) : (

                /* EMPTY STATE */
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-5 py-16 text-center">

                  <Search
                    size={40}
                    className="mx-auto mb-4 text-slate-500"
                  />

                  <h3 className="text-xl font-bold text-white">
                    No courses found
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    Try another keyword or select a different category.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All Courses");
                    }}
                    className="mt-6 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                  >
                    Show All Courses
                  </button>

                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section className="bg-[#0F172A] px-5 py-20 sm:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#172640] to-[#111827] px-6 py-16 text-center sm:px-12">

          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-600/20 blur-[100px]" />

          <div className="relative">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-purple-600 text-white shadow-lg shadow-purple-900/30">
              <GraduationCap size={32} />
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              Your Future Starts Here
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Start Your

              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Learning Journey?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
              Choose your course, develop practical skills and
              take the next step toward your career with
              NewaNext Academy.
            </p>

            <Link
              href="/Contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-9 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
            >
              Enroll Now
              <ArrowUpRight size={19} />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
