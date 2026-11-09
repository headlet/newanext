
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  GraduationCap,
  Laptop,
  Monitor,
  Palette,
  Rocket,
  Target,
  Trophy,
  Layers3,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web Designing Course in Nepal | NewaNext Academy",
  description:
    "Learn HTML5, CSS3, JavaScript, jQuery and Bootstrap 5 with NewaNext Academy. A practical beginner-to-intermediate web designing course in Nepal.",
  keywords: [
    "Web Designing Course in Nepal",
    "HTML CSS JavaScript Course",
    "Bootstrap Course Nepal",
    "NewaNext Academy",
    "Frontend Development Training",
  ],
};

const technologies = [
  { name: "HTML5", description: "Web structure", icon: Code2 },
  { name: "CSS3", description: "Styling and layouts", icon: Palette },
  { name: "JavaScript", description: "Web interactivity", icon: Code2 },
  { name: "jQuery", description: "DOM and effects", icon: Layers3 },
  { name: "Bootstrap 5", description: "Responsive UI", icon: Monitor },
];

const outcomes = [
  "Understand how websites and the internet work.",
  "Build structured webpages using HTML5.",
  "Create beautiful layouts using CSS3.",
  "Make websites interactive with JavaScript.",
  "Manipulate webpage elements using the DOM.",
  "Use jQuery for common interactive tasks.",
  "Build responsive interfaces using Bootstrap 5.",
  "Create, test and publish a complete website.",
];

const modules = [
  {
    number: "01",
    title: "Introduction to Web Designing",
    duration: "Week 1",
    topics: [
      "Introduction to web designing",
      "Internet and World Wide Web",
      "Website vs webpage",
      "Frontend vs backend development",
      "Static vs dynamic websites",
      "How a website works",
      "Introduction to HTML, CSS and JavaScript",
      "Introduction to jQuery and Bootstrap",
    ],
    practical:
      "Understand website structure and create your first project folder.",
  },
  {
    number: "02",
    title: "HTML5 – Building Web Structure",
    duration: "Weeks 2–3",
    topics: [
      "Introduction to HTML5",
      "Basic HTML document structure",
      "Tags, elements and attributes",
      "Headings and paragraphs",
      "Text formatting elements",
      "Links and images",
      "Ordered and unordered lists",
      "HTML tables",
      "Forms and input types",
      "Audio, video and iframe",
      "Semantic HTML5 elements",
      "Accessibility basics",
    ],
    practical:
      "Build a personal profile page, student registration form and school information page.",
  },
  {
    number: "03",
    title: "CSS3 – Styling and Layout Design",
    duration: "Weeks 4–5",
    topics: [
      "Introduction to CSS3",
      "Inline, internal and external CSS",
      "CSS syntax and selectors",
      "Colors and backgrounds",
      "Typography and Google Fonts",
      "CSS box model",
      "Display and positioning",
      "Flexbox layouts",
      "CSS Grid layouts",
      "Pseudo-classes and pseudo-elements",
      "Transitions and transforms",
      "CSS animations",
      "Responsive design",
      "Media queries",
    ],
    practical:
      "Design a responsive landing page, navigation menu and image gallery.",
  },
  {
    number: "04",
    title: "JavaScript – Programming and Interactivity",
    duration: "Weeks 6–7",
    topics: [
      "Introduction to JavaScript",
      "Connecting JavaScript with HTML",
      "Variables: let, const and var",
      "Data types",
      "Operators",
      "Conditional statements",
      "Loops",
      "Functions",
      "Arrays and objects",
      "Browser events",
      "DOM manipulation",
      "Form validation",
      "Date and error handling",
      "JSON fundamentals",
    ],
    practical:
      "Build an interactive calculator, form validation system and dynamic webpage.",
  },
  {
    number: "05",
    title: "jQuery – Simplifying JavaScript",
    duration: "Week 8",
    topics: [
      "Introduction to jQuery",
      "Connecting jQuery using CDN",
      "Basic syntax and selectors",
      "Document ready function",
      "Event handling",
      "Hide, show and toggle",
      "Fade and slide effects",
      "Changing HTML content",
      "Changing CSS properties",
      "Adding and removing classes",
    ],
    practical:
      "Build an interactive FAQ section and image gallery with animation effects.",
  },
  {
    number: "06",
    title: "Bootstrap 5 – Responsive Framework",
    duration: "Week 9",
    topics: [
      "Introduction to Bootstrap 5",
      "Connecting Bootstrap using CDN",
      "Containers and grid system",
      "Responsive breakpoints",
      "Typography and colors",
      "Spacing utilities",
      "Buttons and alerts",
      "Bootstrap cards",
      "Responsive navigation bar",
      "Forms and tables",
      "Modals and dropdowns",
      "Accordions and carousels",
    ],
    practical:
      "Create a responsive website interface using Bootstrap components.",
  },
  {
    number: "07",
    title: "Integration, Testing and Publishing",
    duration: "Week 10",
    topics: [
      "Combining HTML, CSS and JavaScript",
      "Integrating Bootstrap components",
      "Using jQuery where appropriate",
      "Website testing",
      "Responsive testing",
      "Browser developer tools",
      "Debugging common errors",
      "Accessibility checks",
      "Website optimization basics",
      "Preparing files for publishing",
      "Introduction to static hosting",
    ],
    practical:
      "Prepare a complete responsive website for publishing.",
  },
  {
    number: "08",
    title: "Practical Projects and Final Assessment",
    duration: "Final project",
    topics: [
      "Personal portfolio website",
      "Interactive calculator",
      "School website",
      "Responsive e-commerce frontend",
      "Project planning",
      "Code organization",
      "Final project presentation",
      "Practical evaluation",
    ],
    practical:
      "Complete and present a responsive multi-page website.",
  },
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio Website",
    level: "Beginner",
    description:
      "Create your own professional portfolio with profile, skills, education, projects and contact sections.",
    features: [
      "Navigation menu",
      "Profile section",
      "Skills and projects",
      "Responsive layout",
    ],
  },
  {
    number: "02",
    title: "Interactive Calculator",
    level: "Beginner",
    description:
      "Build a functional calculator using HTML, CSS and JavaScript.",
    features: [
      "Number buttons",
      "Arithmetic operations",
      "Clear function",
      "Result display",
    ],
  },
  {
    number: "03",
    title: "School Website",
    level: "Intermediate",
    description:
      "Design a complete school website with multiple pages and interactive components.",
    features: [
      "Home and About",
      "Facilities and gallery",
      "Notices",
      "Contact page",
    ],
  },
  {
    number: "04",
    title: "E-Commerce Frontend",
    level: "Major Project",
    description:
      "Develop a responsive e-commerce frontend demonstrating real-world website design skills.",
    features: [
      "Product cards",
      "Categories and search",
      "Product details",
      "Cart interface",
    ],
  },
];

const faqs = [
  {
    question: "Do I need prior programming knowledge?",
    answer:
      "No. This course is designed for complete beginners. Basic computer operation, file management and browser usage are recommended.",
  },
  {
    question: "How long does the course take?",
    answer:
      "The suggested course duration is approximately 10 weeks. The actual schedule can be adjusted according to class hours and learner progress.",
  },
  {
    question: "What technologies will I learn?",
    answer:
      "You will learn HTML5, CSS3, JavaScript, jQuery and Bootstrap 5.",
  },
  {
    question: "Will I build real projects?",
    answer:
      "Yes. You will work on a personal portfolio, calculator, school website and a responsive e-commerce frontend.",
  },
  {
    question: "Will I learn responsive website development?",
    answer:
      "Yes. You will learn Flexbox, CSS Grid, media queries and Bootstrap's responsive grid system.",
  },
  {
    question: "Can I become a professional frontend developer after this course?",
    answer:
      "This course builds your web designing foundation. You can continue with advanced JavaScript, React, Next.js and professional frontend development afterward.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
        {eyebrow}
      </span>

      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-base leading-8 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default function WebDesigningCoursePage() {
  return (
    <main className="overflow-hidden bg-[#0F172A] text-white">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#0F172A]">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-300">
              <GraduationCap size={17} />
              NewaNext Academy
            </div>

            <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Web Designing
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                Course in Nepal
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Start your journey into web development. Learn to design,
              build and publish responsive websites using HTML5, CSS3,
              JavaScript, jQuery and Bootstrap 5.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/Contact"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>

              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                Explore Curriculum
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-7 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-black text-white">10 Weeks</p>
                <p className="mt-1 text-sm text-slate-400">Suggested duration</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">5</p>
                <p className="mt-1 text-sm text-slate-400">Core technologies</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-1 text-sm text-slate-400">Practical projects</p>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-amber-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111C32] p-6 shadow-2xl sm:p-9">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-slate-400">
                  my-first-website.html
                </span>
              </div>

              <div className="mt-8 space-y-5 font-mono text-sm sm:text-base">
                <p className="text-blue-400">{"<html>"}</p>
                <p className="pl-5 text-cyan-300">{"<head>"}</p>
                <p className="pl-10 text-amber-300">
                  {"<title>My Website</title>"}
                </p>
                <p className="pl-5 text-cyan-300">{"</head>"}</p>
                <p className="pl-5 text-cyan-300">{"<body>"}</p>

                <div className="ml-5 rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="text-slate-400">
                    {"<!-- Your future starts here -->"}
                  </p>
                  <p className="mt-4 text-xl font-bold text-white sm:text-2xl">
                    Hello, World!
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    My first responsive website.
                  </p>
                  <div className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-xs font-bold text-white">
                    Explore More
                  </div>
                </div>

                <p className="pl-5 text-cyan-300">{"</body>"}</p>
                <p className="text-blue-400">{"</html>"}</p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {["HTML5", "CSS3", "JS"].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 py-3 text-center text-xs font-bold text-blue-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE OVERVIEW */}
      <section className="bg-[#111C32] py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Course Overview
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Turn your ideas into beautiful websites.
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              Web designing is the process of planning and creating the
              appearance, structure and user experience of websites.
              It combines layout, colours, typography, images, navigation
              and responsive behaviour.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              This beginner-to-intermediate course introduces the essential
              frontend technologies through short lessons, demonstrations,
              guided coding, independent practice and real-world projects.
            </p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
              <Target className="shrink-0 text-blue-400" size={28} />
              <p className="text-sm leading-6 text-slate-300">
                <strong className="text-white">Course goal:</strong> Develop
                the practical skills needed to plan, design, code, test and
                publish responsive websites.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Clock3, title: "Duration", value: "10 Weeks" },
              {
                icon: Laptop,
                title: "Learning Level",
                value: "Beginner to Intermediate",
              },
              {
                icon: BookOpen,
                title: "Learning Style",
                value: "Theory + Practical",
              },
              {
                icon: Trophy,
                title: "Final Outcome",
                value: "Responsive Website",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6 transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
              >
                <item.icon className="text-blue-400" size={30} />
                <h3 className="mt-5 text-sm font-semibold text-slate-400">
                  {item.title}
                </h3>
                <p className="mt-2 text-lg font-extrabold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What You Will Learn"
            title="Master the essential web technologies"
            description="Learn the technologies that work together to create modern, responsive and interactive websites."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className="group rounded-2xl border border-slate-700 bg-[#1E293B] p-6 transition hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                  <tech.icon size={28} />
                </div>

                <p className="mt-6 text-xl font-extrabold text-white">
                  {tech.name}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {tech.description}
                </p>

                <p className="mt-6 text-xs font-bold text-blue-400">
                  TECHNOLOGY 0{index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING OUTCOMES */}
      <section className="bg-[#111C32] py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Learning Outcomes
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
              What will you be able to do?
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              By the end of this course, you will have the foundation
              and practical experience to develop your own responsive
              websites.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-blue-400"
                />
                <p className="text-sm leading-7 text-slate-300">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section
        id="curriculum"
        className="scroll-mt-24 bg-[#0F172A] py-24"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Course Curriculum"
            title="Your learning journey, step by step."
            description="Explore the complete beginner-to-intermediate curriculum, organized into eight progressive learning modules."
          />

          <div className="space-y-4">
            {modules.map((module, index) => (
              <details
                key={module.number}
                className="group overflow-hidden rounded-2xl border border-slate-700 bg-[#1E293B] transition hover:border-blue-500/50"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-7 [&::-webkit-details-marker]:hidden">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white">
                    {module.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-extrabold text-white sm:text-lg">
                      {module.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-blue-400">
                      {module.duration}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xl text-slate-300 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="border-t border-slate-700 px-5 pb-7 pt-6 sm:px-7">
                  <h4 className="mb-5 text-sm font-bold text-white">
                    Topics Covered
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {module.topics.map((topic) => (
                      <div key={topic} className="flex gap-2.5">
                        <CheckCircle2
                          size={16}
                          className="mt-1 shrink-0 text-blue-400"
                        />
                        <span className="text-sm leading-6 text-slate-300">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-blue-400">
                      Practical Work
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      {module.practical}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-[#111C32] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Hands-on Experience"
            title="Build projects. Develop real skills."
            description="Apply what you learn through practical projects and develop a portfolio that demonstrates your web designing skills."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.number}
                className="group rounded-3xl border border-slate-700 bg-[#1E293B] p-7 transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-black text-blue-400/20">
                    {project.number}
                  </span>
                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300">
                    {project.level}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-extrabold text-white">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-xs font-medium text-slate-300"
                    >
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-blue-400"
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Course Evaluation"
            title="Learn, practice and demonstrate."
            description="A balanced assessment approach helps learners understand concepts and demonstrate their practical skills."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Theory and short quizzes", weight: "15%" },
              { name: "HTML and CSS practical work", weight: "25%" },
              { name: "JavaScript and jQuery exercises", weight: "20%" },
              { name: "Bootstrap practical work", weight: "15%" },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-slate-700 bg-[#1E293B] p-6"
              >
                <p className="text-4xl font-black text-blue-400">
                  {item.weight}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  Final Integrated Project
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-white">
                  Responsive E-Commerce Frontend
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Demonstrate your complete frontend learning through a major project.
                </p>
              </div>
              <span className="text-4xl font-black text-blue-400">25%</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-slate-500">
            Assessment weights are suggested and can be adjusted according
            to institutional requirements and course duration.
          </p>
        </div>
      </section>

      {/* COURSE PRICING */}
      <section id="pricing" className="bg-[#111C32] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Course Fee"
            title="Invest in your future."
            description="Get practical web designing training and build your skills with NewaNext Academy."
          />

          <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-blue-500/30 bg-[#1E293B] p-8 text-center shadow-2xl shadow-blue-950/30 sm:p-12">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <GraduationCap size={34} />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                Basic Web Designing Course
              </p>

              <div className="mt-7">
                <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">
                  Rs. 5,000
                </span>
                <p className="mt-3 text-sm text-slate-400">
                  Complete Course Fee
                </p>
              </div>

              <div className="my-8 h-px bg-slate-700" />

              <div className="space-y-4 text-left">
                {[
                  "HTML5, CSS3 and JavaScript",
                  "jQuery and Bootstrap 5",
                  "Practical coding sessions",
                  "4 hands-on projects",
                  "Responsive website development",
                  "Final project presentation",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-blue-400"
                    />
                    <span className="text-sm text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/Contact"
                className="mt-9 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Enroll Now
                <ArrowRight size={20} />
              </Link>

              <p className="mt-5 text-xs text-slate-500">
                NewaNext Academy · Learn Today. Build Tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING APPROACH */}
      <section className="bg-[#0F172A] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Learning Experience"
            title="From your first line of code to your first website."
            description="A structured learning approach that combines explanations, demonstrations and independent practice."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Learn the Concepts",
                description:
                  "Understand the fundamentals through simple explanations and examples.",
              },
              {
                icon: Laptop,
                title: "Follow Demonstrations",
                description:
                  "Watch practical demonstrations and learn how developers build websites.",
              },
              {
                icon: Code2,
                title: "Practice Coding",
                description:
                  "Write your own code and solve practical exercises after each lesson.",
              },
              {
                icon: Rocket,
                title: "Build Projects",
                description:
                  "Combine your knowledge and create complete website projects.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700 bg-[#1E293B] p-7 transition hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <item.icon size={27} />
                </div>

                <p className="mt-5 text-xs font-bold text-blue-400">
                  STEP 0{index + 1}
                </p>

                <h3 className="mt-3 text-lg font-extrabold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#111C32] py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Got questions? We have answers."
            description="Find answers to common questions about the Basic Web Designing Course."
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-700 bg-[#1E293B] p-6 transition hover:border-blue-500/50"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-white [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 text-xl text-blue-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0F172A] px-5 pb-24 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-900 via-[#172554] to-[#0F172A] px-7 py-16 text-center sm:px-16 sm:py-20">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
              <GraduationCap size={34} className="text-blue-300" />
            </div>

            <h2 className="mx-auto mt-7 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
              Your journey into web development starts here.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
              Learn the fundamentals, develop practical skills and turn
              your creative ideas into responsive websites with NewaNext Academy.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/Contact"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-950/30 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Enroll Now
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                Explore Other Courses
              </Link>
            </div>

            <p className="mt-8 text-sm font-semibold text-slate-400">
              NewaNext Academy · Learn Today. Build Tomorrow.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
