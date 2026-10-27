
import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Introduction to Web Designing",
    topics: [
      "How websites and browsers work",
      "Web designer vs UI/UX designer vs developer",
      "Domains, hosting, and website structure",
      "VS Code and browser developer tools",
      "Introduction to design principles",
    ],
  },
  {
    number: "02",
    title: "HTML5 Fundamentals",
    topics: [
      "HTML document structure and semantic elements",
      "Headings, paragraphs, links, and lists",
      "Images, audio, video, and tables",
      "Forms, inputs, and buttons",
      "Accessible and SEO-friendly HTML",
    ],
  },
  {
    number: "03",
    title: "CSS3 Styling",
    topics: [
      "Selectors, properties, and values",
      "Colors, backgrounds, and gradients",
      "Typography and Google Fonts",
      "Box model, margin, padding, and borders",
      "Positioning, shadows, and visual effects",
    ],
  },
  {
    number: "04",
    title: "Modern Layout Design",
    topics: [
      "Flexbox layouts",
      "CSS Grid systems",
      "Navigation bars and dropdown menus",
      "Hero sections, cards, and page layouts",
      "Reusable styles and CSS variables",
    ],
  },
  {
    number: "05",
    title: "Responsive Web Design",
    topics: [
      "Mobile-first design principles",
      "Media queries and breakpoints",
      "Responsive images and typography",
      "Mobile navigation patterns",
      "Testing across screen sizes",
    ],
  },
  {
    number: "06",
    title: "UI/UX and Figma",
    topics: [
      "User interface and user experience basics",
      "Color theory and typography hierarchy",
      "Spacing, alignment, and visual consistency",
      "Figma frames, components, and auto layout",
      "Wireframes and clickable prototypes",
    ],
  },
  {
    number: "07",
    title: "Tailwind CSS and Bootstrap",
    topics: [
      "Utility-first CSS fundamentals",
      "Responsive Tailwind classes",
      "Reusable UI components",
      "Bootstrap grid and components",
      "Choosing the right styling approach",
    ],
  },
  {
    number: "08",
    title: "JavaScript for Interactivity",
    topics: [
      "JavaScript variables and functions",
      "DOM selection and manipulation",
      "Events and event listeners",
      "Mobile menus, tabs, and modals",
      "Form validation and interactive elements",
    ],
  },
  {
    number: "09",
    title: "WordPress Website Design",
    topics: [
      "WordPress installation and dashboard",
      "Themes, pages, and navigation menus",
      "Customizing website layouts",
      "Page builders and plugins",
      "Creating business websites and landing pages",
    ],
  },
  {
    number: "10",
    title: "Website Launch and Portfolio",
    topics: [
      "Git and GitHub fundamentals",
      "Website deployment and hosting",
      "Domain connection and HTTPS basics",
      "Image optimization and basic SEO",
      "Final project presentation and portfolio",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    description:
      "Design a personal website to showcase your skills, projects, and contact information.",
  },
  {
    number: "02",
    title: "Business Landing Page",
    description:
      "Create a responsive landing page with a hero section, services, testimonials, and CTA.",
  },
  {
    number: "03",
    title: "Restaurant Website",
    description:
      "Design a restaurant website featuring a menu, gallery, location, and reservation form UI.",
  },
  {
    number: "04",
    title: "WordPress Business Site",
    description:
      "Build a multi-page website using WordPress and customize its design for a business.",
  },
  {
    number: "05",
    title: "Final Capstone",
    description:
      "Design, develop, test, and publish a complete responsive website for your portfolio.",
  },
];

const outcomes = [
  "Build websites using HTML and CSS",
  "Create mobile-friendly responsive layouts",
  "Apply UI/UX design principles",
  "Design prototypes using Figma",
  "Use Tailwind CSS and Bootstrap",
  "Add interactivity using JavaScript",
  "Create websites with WordPress",
  "Publish websites and build a portfolio",
];

const features = [
  {
    icon: "🎨",
    title: "Design First",
    description:
      "Learn layouts, colors, typography, and visual hierarchy.",
  },
  {
    icon: "📱",
    title: "Responsive Websites",
    description:
      "Create websites that adapt to mobile, tablet, and desktop.",
  },
  {
    icon: "🛠️",
    title: "Practical Projects",
    description:
      "Build real website examples instead of only studying concepts.",
  },
  {
    icon: "🚀",
    title: "Publish Your Work",
    description:
      "Learn the fundamentals of launching websites and showcasing your skills.",
  },
];

export default function WebDesigningCoursePage() {
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
              NewaNext Academy · Creative Technology
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Web Designing{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Course
              </span>{" "}
              in Nepal
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Turn creative ideas into beautiful websites. Learn HTML, CSS,
              responsive design, Figma, Tailwind CSS, and JavaScript through
              hands-on projects designed for beginners.
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
                <p className="mt-1 text-sm text-slate-400">Hands-on learning</p>
              </div>
            </div>
          </div>

          {/* Design preview */}
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
                    website-preview
                  </span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-[#101827] p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold tracking-wide">
                      STUDIO<span className="text-blue-400">.</span>
                    </span>
                    <div className="hidden gap-4 text-xs text-slate-300 sm:flex">
                      <span>Home</span>
                      <span>Services</span>
                      <span>About</span>
                    </div>
                    <span className="rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold">
                      Contact
                    </span>
                  </div>

                  <div className="py-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                      Design your future
                    </p>
                    <h3 className="mt-4 max-w-sm text-3xl font-extrabold leading-tight sm:text-4xl">
                      Ideas into
                      <span className="block text-blue-400">
                        digital experiences.
                      </span>
                    </h3>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                      Beautiful design. Thoughtful layouts. Better experiences.
                    </p>
                    <div className="mt-6 inline-flex rounded-lg bg-white px-4 py-3 text-xs font-bold text-slate-950">
                      Explore Our Work →
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 rounded-xl border border-white/10 bg-blue-400/20" />
                    <div className="h-14 rounded-xl border border-white/10 bg-cyan-300/10" />
                    <div className="h-14 rounded-xl border border-white/10 bg-amber-400/20" />
                  </div>
                </div>

                <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.02]">
                  {[
                    ["HTML", "Structure"],
                    ["CSS", "Visuals"],
                    ["JS", "Interaction"],
                  ].map(([name, description]) => (
                    <div key={name} className="p-4 text-center">
                      <p className="font-bold text-blue-300">{name}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-slate-400">
                Imagine it. Design it. Build it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Why Learn Web Designing?
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Creativity meets technology.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Learn to create websites that look professional, work across
            devices, and deliver a clear experience to visitors.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {feature.description}
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
              Start with HTML and CSS, master responsive layouts, explore UI
              design, and finish by publishing a complete website.
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
            Practical Learning
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Build websites you can show the world.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Apply your skills through practical projects and build a portfolio
            that demonstrates what you can design and develop.
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
              Turn your design skills into real websites.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Develop practical skills for creating websites, showcasing
              projects, and starting your journey into web design and frontend
              development.
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
              Start Creating
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold sm:text-5xl">
              Design the Web. Build Your Future.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Start your web designing journey with NewaNext Academy and turn
              your creativity into practical digital skills.
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
