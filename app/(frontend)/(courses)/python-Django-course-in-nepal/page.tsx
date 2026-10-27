
import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Python Fundamentals",
    topics: [
      "Python installation and development environment",
      "Variables, data types, and operators",
      "Conditions, loops, and functions",
      "Strings, lists, tuples, sets, and dictionaries",
      "Exception handling and file operations",
    ],
  },
  {
    number: "02",
    title: "Object-Oriented Programming",
    topics: [
      "Classes and objects",
      "Constructors and instance methods",
      "Inheritance and polymorphism",
      "Encapsulation and abstraction",
      "Writing reusable and maintainable code",
    ],
  },
  {
    number: "03",
    title: "Python Tools and Git",
    topics: [
      "Modules and packages",
      "Virtual environments and pip",
      "Working with requirements.txt",
      "Git and GitHub fundamentals",
      "Debugging and code organization",
    ],
  },
  {
    number: "04",
    title: "Web Development Fundamentals",
    topics: [
      "How the web works",
      "HTTP requests and responses",
      "HTML and CSS essentials",
      "Client-server architecture",
      "Introduction to databases and SQL",
    ],
  },
  {
    number: "05",
    title: "Django Fundamentals",
    topics: [
      "Django installation and project setup",
      "Project structure and applications",
      "URLs, views, and templates",
      "Django Template Language",
      "Static files and reusable layouts",
    ],
  },
  {
    number: "06",
    title: "Models and Databases",
    topics: [
      "Django models and ORM",
      "Database migrations",
      "CRUD operations",
      "Relationships and foreign keys",
      "PostgreSQL integration",
    ],
  },
  {
    number: "07",
    title: "Forms and Authentication",
    topics: [
      "Django forms and ModelForms",
      "Form validation and error handling",
      "User registration and login",
      "Sessions, permissions, and authorization",
      "Password security and access control",
    ],
  },
  {
    number: "08",
    title: "Django REST Framework",
    topics: [
      "REST API fundamentals",
      "Serializers and API views",
      "ViewSets and routers",
      "Authentication and permissions",
      "Pagination, filtering, and API testing",
    ],
  },
  {
    number: "09",
    title: "Testing and Security",
    topics: [
      "Unit and integration testing basics",
      "Django testing tools",
      "CSRF and XSS protection",
      "Environment variables and secret management",
      "Performance and query optimization basics",
    ],
  },
  {
    number: "10",
    title: "Deployment and Capstone",
    topics: [
      "Production settings and static files",
      "Environment configuration",
      "Deployment fundamentals",
      "Application testing and documentation",
      "Final full-stack Django project",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    description:
      "Create a professional portfolio with reusable templates and dynamic content.",
  },
  {
    number: "02",
    title: "Blog Application",
    description:
      "Build a blog with posts, categories, authentication, and comments.",
  },
  {
    number: "03",
    title: "Student Management System",
    description:
      "Manage student records, classes, and academic information using Django ORM.",
  },
  {
    number: "04",
    title: "REST API",
    description:
      "Create an API with Django REST Framework for frontend or mobile applications.",
  },
  {
    number: "05",
    title: "Capstone Project",
    description:
      "Develop a complete database-driven web application suitable for your portfolio.",
  },
];

const outcomes = [
  "Write Python programs using OOP principles",
  "Build dynamic websites with Django",
  "Design database models and relationships",
  "Implement authentication and permissions",
  "Develop REST APIs using Django REST Framework",
  "Use Git and GitHub in development workflows",
  "Test and debug web applications",
  "Prepare projects for production deployment",
];

const highlights = [
  {
    icon: "🐍",
    title: "Python First",
    description: "Build strong programming foundations before learning Django.",
  },
  {
    icon: "🌐",
    title: "Full-Stack Web",
    description: "Understand templates, databases, backend logic, and APIs.",
  },
  {
    icon: "🛠️",
    title: "Practical Projects",
    description: "Apply each major concept through hands-on development.",
  },
  {
    icon: "🚀",
    title: "Production Skills",
    description: "Learn testing, security fundamentals, and deployment workflows.",
  },
];

export default function PythonDjangoCoursePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              NewaNext Academy · Backend Development
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Python &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Django
              </span>{" "}
              Course in Nepal
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Start with Python programming and progress to dynamic websites,
              database-driven applications, and REST APIs. Learn by building
              real projects from the ground up.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400"
              >
                Enroll Now <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#curriculum"
                className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold transition hover:border-blue-400/60 hover:bg-white/5"
              >
                Explore Curriculum
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xl font-bold sm:text-2xl">Beginner</p>
                <p className="mt-1 text-sm text-slate-400">Friendly</p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">10 Modules</p>
                <p className="mt-1 text-sm text-slate-400">Structured path</p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">Projects</p>
                <p className="mt-1 text-sm text-slate-400">Practical learning</p>
              </div>
            </div>
          </div>

          {/* Code-inspired visual */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-blue-950/30 sm:p-7">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">
                    views.py
                  </span>
                </div>

                <div className="overflow-x-auto p-5 font-mono text-sm leading-8 sm:p-7">
                  <p>
                    <span className="text-purple-400">from</span>{" "}
                    <span className="text-cyan-300">django.http</span>{" "}
                    <span className="text-purple-400">import</span>{" "}
                    <span className="text-amber-300">JsonResponse</span>
                  </p>
                  <p className="mt-5">
                    <span className="text-purple-400">def</span>{" "}
                    <span className="text-blue-300">welcome</span>
                    <span className="text-slate-300">(request):</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-amber-300">JsonResponse</span>
                    <span className="text-slate-300">(</span>
                  </p>
                  <p className="pl-10 text-emerald-300">
                    {"{"}
                    <span className="text-amber-200">'message'</span>:{" "}
                    <span className="text-amber-200">'Hello, Developer!'</span>
                    {"}"}
                  </p>
                  <p className="pl-5 text-slate-300">)</p>
                </div>

                <div className="border-t border-white/10 bg-white/[0.02] px-5 py-4">
                  <p className="text-xs text-slate-500">
                    YOUR JOURNEY
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-lg bg-blue-500/15 px-3 py-2 text-blue-300">
                      Python
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-300">
                      Django
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="rounded-lg bg-amber-500/10 px-3 py-2 text-amber-300">
                      Build
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-slate-400">
                Learn the logic. Build the application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Why This Course
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            From your first Python program to a real web application.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Follow a practical learning path designed to help beginners
            understand programming concepts and apply them to backend
            development.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section
        id="curriculum"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Learning Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Complete course curriculum
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Learn programming fundamentals first, then move through Django,
              database integration, APIs, testing, and deployment.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-2xl border border-white/10 bg-[#0B1220] p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 font-bold text-blue-300">
                    {module.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                        >
                          <span className="mt-1 text-amber-400">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Hands-on Development
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Build projects that demonstrate your skills.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Practice what you learn through increasingly challenging projects,
            culminating in a complete Django application.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-400/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400">
                  PROJECT {project.number}
                </span>
                <span className="text-xl text-slate-500 transition group-hover:text-amber-400">
                  ↗
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Learning Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Develop skills you can use in real projects.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Gain practical experience with Python, web development, database
              operations, and backend API development.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0B1220] p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-sm text-emerald-300">
                  ✓
                </span>
                <p className="text-sm leading-6 text-slate-300">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — no footer */}
      <section className="px-6 py-20 md:px-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/80 to-[#0D1526] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Start Your Journey
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold sm:text-5xl">
              Learn Python. Master Django. Build the Future.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Take the next step toward backend development with NewaNext
              Academy. Turn your knowledge into working applications.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Contact Us to Enroll <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
