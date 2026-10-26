
import Link from "next/link";

const modules = [
  {
    week: "01",
    duration: "Week 1",
    title: "Web Development Fundamentals",
    topics: [
      "How the web works: Browser, server, HTTP",
      "HTML5, semantic elements and forms",
      "CSS, Flexbox, Grid and responsive design",
      "Git, GitHub and developer tools",
    ],
    project: "Responsive Portfolio Website",
  },
  {
    week: "02",
    duration: "Weeks 2–4",
    title: "JavaScript Fundamentals",
    topics: [
      "Variables, data types, operators and conditions",
      "Functions, scope, closures and hoisting",
      "Arrays, objects and modern ES6+",
      "DOM manipulation and event handling",
      "Promises, async/await and Fetch API",
      "Event loop, modules and error handling",
    ],
    project: "Quiz App, To-do App and Weather App",
  },
  {
    week: "03",
    duration: "Weeks 5–7",
    title: "React.js Frontend Development",
    topics: [
      "React, JSX, components and props",
      "State, events and conditional rendering",
      "Hooks: useState, useEffect and custom hooks",
      "React Router and nested routes",
      "Forms, validation and Tailwind CSS",
      "Context API, API integration and TanStack Query",
    ],
    project: "Student Management Dashboard",
  },
  {
    week: "04",
    duration: "Weeks 8–9",
    title: "Node.js & Express.js",
    topics: [
      "Node.js runtime, npm and modules",
      "Express server and REST API design",
      "Routes, controllers and middleware",
      "HTTP methods and status codes",
      "Validation and centralized error handling",
      "API testing with Postman",
    ],
    project: "Student Records REST API",
  },
  {
    week: "05",
    duration: "Week 10",
    title: "MongoDB & Mongoose",
    topics: [
      "MongoDB Atlas and database fundamentals",
      "Collections, documents and CRUD",
      "Mongoose schemas and models",
      "Data relationships and population",
      "Indexes, queries and aggregation basics",
    ],
    project: "Inventory Management API",
  },
  {
    week: "06",
    duration: "Weeks 11–12",
    title: "Full-Stack MERN Development",
    topics: [
      "Connecting React with Express APIs",
      "Registration, login and authentication",
      "Password hashing and protected routes",
      "Role-based authorization",
      "File uploads and form validation",
      "Search, pagination and filtering",
      "Secure configuration and environment variables",
    ],
    project: "Full-Stack E-commerce Application",
  },
  {
    week: "07",
    duration: "Week 13",
    title: "Testing, Security & Deployment",
    topics: [
      "Clean code and project architecture",
      "Unit and integration testing fundamentals",
      "Web security and input validation",
      "Git branches, pull requests and code reviews",
      "Production configuration and deployment",
      "Documentation and debugging",
    ],
    project: "Production-Ready Application",
  },
  {
    week: "08",
    duration: "Weeks 14–16",
    title: "Capstone Project",
    topics: [
      "Requirement analysis and project planning",
      "Database and API architecture",
      "Frontend and backend implementation",
      "Authentication and complete CRUD",
      "Testing, deployment and documentation",
      "Final demonstration and presentation",
    ],
    project: "A Complete Full-Stack Application",
  },
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    level: "BEGINNER",
    description: "Build a responsive portfolio using HTML, CSS and Git.",
  },
  {
    number: "02",
    title: "JavaScript Applications",
    level: "BEGINNER",
    description: "Create interactive applications with API integration.",
  },
  {
    number: "03",
    title: "React Admin Dashboard",
    level: "INTERMEDIATE",
    description: "Build reusable UI components, forms and dashboards.",
  },
  {
    number: "04",
    title: "MERN E-commerce",
    level: "ADVANCED",
    description: "Implement products, authentication, cart and orders.",
  },
  {
    number: "05",
    title: "Capstone Project",
    level: "FINAL PROJECT",
    description: "Plan, build and deploy a real-world full-stack product.",
  },
];

const outcomes = [
  "Build responsive React applications",
  "Develop REST APIs with Node.js and Express",
  "Design and query MongoDB databases",
  "Implement authentication and authorization",
  "Use Git and GitHub professionally",
  "Test and deploy full-stack applications",
];

export default function MernStackCoursePage() {
  return (
    <main className="min-h-screen bg-[#080D18] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            NewaNext Academy · Professional Training
          </div>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Master the MERN Stack.
            <span className="block text-blue-400">
              Build Real Products.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Start from the fundamentals and progress to full-stack
            development. Learn by building real-world applications,
            solving problems and deploying your own projects.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#curriculum"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
            >
              Explore Curriculum →
            </a>
            <a
              href="#projects"
              className="rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:bg-white/5"
            >
              View Projects
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["04 Months", "Suggested duration"],
              ["08 Modules", "Structured learning"],
              ["05 Projects", "Hands-on practice"],
              ["01 Capstone", "Final application"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-2xl font-bold text-blue-400">{value}</p>
                <p className="mt-2 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Your Technology Stack
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Four technologies. One complete skill set.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              name: "MongoDB",
              role: "Database",
              color: "text-green-400",
            },
            {
              name: "Express.js",
              role: "Backend Framework",
              color: "text-slate-200",
            },
            {
              name: "React",
              role: "Frontend Library",
              color: "text-cyan-400",
            },
            {
              name: "Node.js",
              role: "JavaScript Runtime",
              color: "text-green-400",
            },
          ].map((tech) => (
            <div
              key={tech.name}
              className="rounded-2xl border border-white/10 bg-[#101827] p-6"
            >
              <h3 className={`text-xl font-bold ${tech.color}`}>
                {tech.name}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{tech.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section
        id="curriculum"
        className="scroll-mt-20 border-y border-white/10 bg-[#0B1220]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Learning Roadmap
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Your journey, step by step.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Each module combines essential concepts, guided coding
            practice and a project to apply what you have learned.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.week}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6 transition hover:border-blue-400/40 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl font-bold text-blue-400">
                    {module.week}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {module.duration}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {module.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex gap-3 text-sm leading-6 text-slate-400"
                    >
                      <span className="text-blue-400">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-blue-500/[0.08] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Practical project
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-200">
                    {module.project}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Learn by Building
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            From your first project to a real product.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.number}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6"
              >
                <p className="text-sm font-bold text-blue-400">
                  PROJECT {project.number}
                </p>
                <h3 className="mt-5 text-xl font-bold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>
                <p className="mt-6 text-xs font-semibold tracking-wider text-amber-400">
                  {project.level}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-y border-white/10 bg-[#0B1220]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Learning Outcomes
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Skills you can put into practice.
            </h2>
            <p className="mt-5 leading-7 text-slate-400">
              By the end of the course, students should be able to
              build and explain a complete web application using
              the MERN stack.
            </p>
          </div>

          <ul className="space-y-4">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="text-blue-400">✓</span>
                <span className="text-slate-200">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-[#101827] px-6 py-14 text-center md:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            NewaNext Academy
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Your next step starts with code.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Learn the fundamentals. Build real projects. Develop
            the confidence to create your own applications.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500"
          >
            Contact NewaNext →
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NewaNext Academy. Learn.
        Build. Innovate.
      </footer>
    </main>
  );
}
