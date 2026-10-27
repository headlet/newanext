
import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Introduction to Flutter",
    topics: [
      "Introduction to Flutter and Dart",
      "Flutter installation and environment setup",
      "Android Studio and VS Code setup",
      "Understanding widgets and Flutter architecture",
    ],
  },
  {
    number: "02",
    title: "Dart Programming Fundamentals",
    topics: [
      "Variables, data types, and operators",
      "Conditions, loops, and functions",
      "Lists, maps, and sets",
      "Object-oriented programming",
      "Null safety and exception handling",
    ],
  },
  {
    number: "03",
    title: "Flutter UI Development",
    topics: [
      "StatelessWidget and StatefulWidget",
      "Rows, columns, containers, and layouts",
      "Text, images, icons, and buttons",
      "Styling, themes, and custom fonts",
      "Responsive UI for different screens",
    ],
  },
  {
    number: "04",
    title: "Navigation and Forms",
    topics: [
      "Navigation between screens",
      "Routes and passing data",
      "Text fields and form validation",
      "Reusable widgets and components",
    ],
  },
  {
    number: "05",
    title: "State Management",
    topics: [
      "Understanding application state",
      "setState fundamentals",
      "Provider for state management",
      "Organizing application logic",
    ],
  },
  {
    number: "06",
    title: "APIs and Backend Integration",
    topics: [
      "HTTP requests and REST APIs",
      "JSON parsing and model classes",
      "Loading, error, and empty states",
      "Connecting Flutter to a backend",
    ],
  },
  {
    number: "07",
    title: "Database and Authentication",
    topics: [
      "Firebase fundamentals",
      "User registration and login",
      "Cloud Firestore basics",
      "CRUD operations",
      "Authentication and access control",
    ],
  },
  {
    number: "08",
    title: "Advanced Flutter",
    topics: [
      "Local data storage",
      "App architecture and clean code",
      "Animations and user experience",
      "Debugging and performance optimization",
      "Testing fundamentals",
    ],
  },
  {
    number: "09",
    title: "Deployment and Capstone",
    topics: [
      "App icons and splash screens",
      "Build configuration",
      "Creating Android APK and app bundles",
      "Release preparation",
      "Final real-world Flutter application",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Personal Profile App",
    description: "Build a polished personal profile with reusable Flutter widgets.",
  },
  {
    number: "02",
    title: "To-Do Application",
    description: "Practice state management, forms, and local data storage.",
  },
  {
    number: "03",
    title: "Weather Application",
    description: "Fetch live weather data from a REST API and display it clearly.",
  },
  {
    number: "04",
    title: "Authentication App",
    description: "Implement registration, login, and Firebase integration.",
  },
  {
    number: "05",
    title: "Capstone Project",
    description: "Build a complete mobile application ready to demonstrate in a portfolio.",
  },
];

const outcomes = [
  "Build responsive Flutter applications",
  "Write Dart code using OOP principles",
  "Connect mobile apps to REST APIs",
  "Implement authentication and database operations",
  "Manage application state",
  "Build and prepare Android releases",
];

export default function FlutterCoursePage() {
  return (
    <main className="min-h-screen bg-[#080D18] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              NewaNext Academy · Mobile App Development
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Complete{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Flutter
              </span>{" "}
              Course
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Turn your ideas into mobile applications. Learn Dart, build
              beautiful interfaces, connect APIs and databases, and create
              real-world projects from scratch.
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
                className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-blue-400/60 hover:bg-white/5"
              >
                Explore Curriculum
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-bold text-white">Beginner</p>
                <p className="mt-1 text-sm text-slate-400">Friendly</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Projects</p>
                <p className="mt-1 text-sm text-slate-400">Hands-on learning</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Android</p>
                <p className="mt-1 text-sm text-slate-400">App development</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-blue-950/30 sm:p-8">
              <div className="rounded-2xl border border-blue-400/20 bg-[#0D1526] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Your learning journey</p>
                    <p className="mt-1 text-xl font-bold">Idea → Mobile App</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl">
                    📱
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    ["01", "Learn Dart", "Programming foundations"],
                    ["02", "Build UI", "Design beautiful interfaces"],
                    ["03", "Connect Data", "APIs and databases"],
                    ["04", "Launch App", "Build your final project"],
                  ].map(([number, title, description]) => (
                    <div
                      key={number}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 font-bold text-blue-300">
                        {number}
                      </span>
                      <div>
                        <p className="font-semibold">{title}</p>
                        <p className="mt-1 text-sm text-slate-400">{description}</p>
                      </div>
                      <span className="ml-auto text-blue-300">↗</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-center text-sm text-slate-400">
                Learn by building. Improve by practicing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course overview */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Course Overview
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            One course. A complete mobile development journey.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Start with programming fundamentals and progress toward complete
            mobile applications. The curriculum combines guided learning,
            practical assignments, and portfolio projects.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Dart Fundamentals", "Understand the language behind Flutter."],
            ["02", "Modern UI", "Create clean, responsive app interfaces."],
            ["03", "Backend Integration", "Connect your apps to APIs and databases."],
            ["04", "Real Projects", "Apply your skills through practical builds."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"
            >
              <p className="text-sm font-bold text-amber-400">{number}</p>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Learning Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Complete course curriculum
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              A structured path from your first Dart program to a complete
              Flutter application.
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
                  <div>
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
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Practical Learning
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Build projects, not just notes.
            </h2>
          </div>
          <p className="max-w-md leading-7 text-slate-400">
            Each project helps you practice a different part of the mobile
            development workflow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
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
              <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              What You Will Learn
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Skills you can put into practice.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Develop the practical skills needed to create, test, and prepare
              Flutter applications for release.
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
              Start Building
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold sm:text-5xl">
              Your next idea could become an app.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Begin your Flutter journey with NewaNext Academy and turn what
              you learn into real projects.
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
