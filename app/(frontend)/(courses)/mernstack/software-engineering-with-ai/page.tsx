
import Link from "next/link";

const modules = [
  {
    number: "01",
    weeks: "Week 1",
    title: "Introduction to Software Engineering",
    description: "Understand how professional software is planned, designed, developed and maintained.",
    topics: [
      "What is software engineering?",
      "Software development life cycle (SDLC)",
      "Problem solving and computational thinking",
      "Requirements gathering and documentation",
      "Agile, Scrum and project management",
      "Introduction to AI-assisted development",
    ],
    project: "Software Requirement Document",
  },
  {
    number: "02",
    weeks: "Weeks 2–3",
    title: "Web Fundamentals & Programming Logic",
    description: "Build the foundation required to understand and create software.",
    topics: [
      "How the internet, browsers and servers work",
      "HTML, CSS and responsive design",
      "JavaScript fundamentals and ES6+",
      "Variables, functions, arrays and objects",
      "Conditions, loops and problem-solving",
      "Git, GitHub and version control",
    ],
    project: "Responsive Personal Portfolio",
  },
  {
    number: "03",
    weeks: "Week 4",
    title: "AI Tools & Prompt Engineering",
    description: "Learn to use AI as a development assistant without becoming dependent on generated code.",
    topics: [
      "Introduction to LLMs and generative AI",
      "Prompt structure and context engineering",
      "Using AI to explain unfamiliar code",
      "Generating and improving code with AI",
      "Debugging and error analysis with AI",
      "Hallucinations, verification and limitations",
      "Privacy, security and responsible AI use",
    ],
    project: "AI-Assisted JavaScript Application",
  },
  {
    number: "04",
    weeks: "Weeks 5–6",
    title: "Vibe Coding & AI Development Workflow",
    description: "Turn ideas into working prototypes using structured prompts and iterative development.",
    topics: [
      "Vibe coding: concepts and limitations",
      "AI coding editors and development agents",
      "Writing project specifications before prompting",
      "Planning features and breaking down tasks",
      "Generating UI, components and application logic",
      "Reading, reviewing and refactoring generated code",
      "Debugging failed AI-generated solutions",
      "Git checkpoints and safe iteration",
    ],
    project: "AI-Assisted Task Management App",
  },
  {
    number: "05",
    weeks: "Weeks 7–8",
    title: "Modern Frontend Development",
    description: "Build maintainable user interfaces using modern JavaScript frameworks.",
    topics: [
      "React fundamentals and component architecture",
      "Props, state, hooks and reusable components",
      "Routing and form handling",
      "Tailwind CSS and responsive UI",
      "API integration and asynchronous requests",
      "TypeScript fundamentals",
      "Accessibility and frontend validation",
    ],
    project: "Interactive Admin Dashboard",
  },
  {
    number: "06",
    weeks: "Weeks 9–10",
    title: "Backend & Database Engineering",
    description: "Understand how real applications process requests, store data and enforce business rules.",
    topics: [
      "Node.js and Express.js",
      "REST API design and HTTP methods",
      "Controllers, services and middleware",
      "MongoDB and database modeling",
      "SQL and relational database fundamentals",
      "Authentication and authorization",
      "Validation and centralized error handling",
    ],
    project: "Backend API with Database",
  },
  {
    number: "07",
    weeks: "Weeks 11–12",
    title: "Full-Stack Application Development",
    description: "Combine frontend, backend and database into a complete application.",
    topics: [
      "Connecting frontend to backend APIs",
      "Registration, login and protected routes",
      "Role-based access control",
      "CRUD operations and data relationships",
      "File uploads and third-party API integration",
      "Environment variables and configuration",
      "AI-assisted feature implementation",
      "Code review and security verification",
    ],
    project: "Full-Stack Business Application",
  },
  {
    number: "08",
    weeks: "Week 13",
    title: "AI Integration in Software",
    description: "Integrate AI capabilities into applications using existing AI models and APIs.",
    topics: [
      "AI APIs and model fundamentals",
      "API keys and secure server-side integration",
      "Prompt templates and structured outputs",
      "Building an AI chatbot",
      "Text summarization and content generation",
      "AI response validation and error handling",
      "Token usage, cost and rate limits",
    ],
    project: "AI-Powered Assistant",
  },
  {
    number: "09",
    weeks: "Week 14",
    title: "Testing, Deployment & Software Quality",
    description: "Prepare applications for real users with testing, security and deployment practices.",
    topics: [
      "Unit, integration and end-to-end testing concepts",
      "Debugging and troubleshooting",
      "OWASP-informed security fundamentals",
      "Git branches and collaborative workflows",
      "Deployment and production configuration",
      "Logging, monitoring and error reporting",
      "Documentation and maintenance",
    ],
    project: "Deploy and Test a Complete Application",
  },
  {
    number: "10",
    weeks: "Weeks 15–16",
    title: "Final Capstone Project",
    description: "Plan, build, test and present a complete software product using engineering principles and AI tools.",
    topics: [
      "Problem discovery and requirement analysis",
      "Project specification and architecture",
      "UI design and database planning",
      "Incremental implementation and code reviews",
      "Testing, security and debugging",
      "Production deployment",
      "Documentation, demo and final presentation",
    ],
    project: "Production-Style AI-Enabled Application",
  },
];

const projects = [
  {
    number: "01",
    title: "AI-Assisted Portfolio",
    category: "FOUNDATION",
    description:
      "Create a responsive portfolio and learn how to review AI-generated HTML, CSS and JavaScript.",
  },
  {
    number: "02",
    title: "Smart Task Manager",
    category: "VIBE CODING",
    description:
      "Use AI tools to plan, generate, debug and iteratively improve a working application.",
  },
  {
    number: "03",
    title: "Business Dashboard",
    category: "FRONTEND",
    description:
      "Build a dashboard with reusable components, forms, API integration and data visualization.",
  },
  {
    number: "04",
    title: "Full-Stack Business App",
    category: "FULL STACK",
    description:
      "Implement authentication, database operations, APIs and role-based permissions.",
  },
  {
    number: "05",
    title: "AI-Powered Capstone",
    category: "FINAL PROJECT",
    description:
      "Solve a real problem with a tested, documented and deployed software product.",
  },
];

const outcomes = [
  "Understand the software development life cycle",
  "Translate ideas into clear software requirements",
  "Use AI coding tools with effective prompts",
  "Understand, debug and review generated code",
  "Build responsive frontend applications",
  "Develop backend APIs and work with databases",
  "Integrate AI APIs into software products",
  "Test, secure and deploy applications",
  "Collaborate with Git and GitHub",
  "Present a complete capstone project",
];

const tools = [
  { name: "ChatGPT", role: "Planning, reasoning and debugging" },
  { name: "Cursor / AI Editor", role: "AI-assisted coding workflow" },
  { name: "Git & GitHub", role: "Version control and collaboration" },
  { name: "React / Next.js", role: "Modern application development" },
  { name: "Node.js", role: "Backend development" },
  { name: "AI APIs", role: "Integrating AI capabilities" },
];

export default function SoftwareEngineeringAICoursePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">
      {/* HERO */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
            <span>✦</span>
            NewaNext Academy · Future-Ready Skills
          </div>

          <h1 className="mt-8 max-w-5xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Software Engineering
            <span className="block text-blue-400">with AI & Vibe Coding.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Learn to think like an engineer, build with AI and turn
            ideas into real software. Master the fundamentals,
            work with modern development tools and create
            applications that solve real-world problems.
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
              className="rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:border-blue-400/50 hover:bg-white/5"
            >
              Explore Projects
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["16 Weeks", "Suggested duration"],
              ["10 Modules", "Structured learning"],
              ["05 Projects", "Hands-on practice"],
              ["01 Capstone", "Final application"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur"
              >
                <p className="text-2xl font-bold text-blue-400">
                  {value}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              Beyond Prompting
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Don&apos;t just generate code.
              <span className="block text-blue-400">
                Learn to engineer software.
              </span>
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              AI can accelerate development, but reliable software
              still requires problem-solving, system design,
              testing, security and human judgment. This program
              teaches students to combine both.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "01",
                title: "Think",
                text: "Analyze problems and define requirements.",
              },
              {
                icon: "02",
                title: "Prompt",
                text: "Give AI tools clear context and instructions.",
              },
              {
                icon: "03",
                title: "Build",
                text: "Implement and improve working software.",
              },
              {
                icon: "04",
                title: "Verify",
                text: "Test, debug and review every solution.",
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6"
              >
                <span className="text-sm font-bold text-amber-400">
                  STEP {item.icon}
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section
        id="curriculum"
        className="scroll-mt-20 border-y border-white/10 bg-[#0B1220]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Course Curriculum
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            From fundamentals to AI-powered software.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-400">
            A progressive roadmap combining software engineering,
            programming, AI-assisted development and full-stack
            application building.
          </p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6 transition hover:border-blue-400/40 md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-3xl font-bold text-blue-400">
                    {module.number}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {module.weeks}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {module.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {module.description}
                </p>

                <ul className="mt-5 space-y-3">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-0.5 text-blue-400">✓</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-amber-400/10 bg-amber-400/[0.05] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Practical Deliverable
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

      {/* TOOLS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Development Toolkit
        </p>
        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Learn with modern tools.
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-slate-400">
          Students learn the purpose of each tool and when to use it,
          rather than relying on one AI platform for everything.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl border border-white/10 bg-[#101827] p-6"
            >
              <h3 className="text-lg font-bold text-blue-300">
                {tool.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {tool.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="scroll-mt-20 border-y border-white/10 bg-[#0B1220]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            Practical Learning
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Build. Test. Improve. Deploy.
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.number}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"
              >
                <p className="text-sm font-bold text-blue-400">
                  PROJECT {project.number}
                </p>
                <h3 className="mt-5 text-xl font-bold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>
                <p className="mt-6 text-xs font-semibold tracking-wider text-amber-400">
                  {project.category}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Learning Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Skills that go beyond AI prompts.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              The goal is to help students become capable developers
              who can understand their code, make technical decisions
              and use AI responsibly throughout the software lifecycle.
            </p>
          </div>

          <ul className="space-y-3">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="text-blue-400">✓</span>
                <span className="text-sm leading-6 text-slate-200">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="border-y border-white/10 bg-[#0B1220]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Assessment
          </p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Progress through practical work.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["15%", "Weekly assignments"],
              ["20%", "Module projects"],
              ["15%", "Technical assessments"],
              ["10%", "Git and code quality"],
              ["30%", "Final capstone"],
              ["10%", "Presentation and viva"],
            ].map(([percentage, title]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-[#101827] p-6"
              >
                <p className="text-3xl font-bold text-blue-400">
                  {percentage}
                </p>
                <p className="mt-3 text-sm text-slate-300">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-[#101827] to-amber-500/[0.08] px-6 py-16 text-center md:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
            NewaNext Academy
          </p>
          <h2 className="mt-5 text-3xl font-bold md:text-5xl">
            Think like an engineer.
            <span className="block text-blue-400">
              Build with AI.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">
            Learn the fundamentals, master modern AI workflows
            and turn your ideas into useful software products.
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
        © {new Date().getFullYear()} NewaNext Academy. Learn. Build. Innovate.
      </footer>
    </main>
  );
}
