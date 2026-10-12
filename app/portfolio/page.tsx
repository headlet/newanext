import Link from "next/link";

export default function PortfolioPage() {
  const featuredProjects = [
    {
      title: "NewaNext SaaS Web Platform",
      category: "Full-Stack Web App",
      description:
        "A modern, responsive web application built with Next.js App Router, dynamic component architecture, and tailwind styling for streamlined team workflows.",
      gradient: "from-blue-600 to-indigo-600",
      accentBg: "bg-blue-500/10 text-blue-600",
      badge: "SaaS",
      techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Proxima Interactive Assessment Tool",
      category: "EdTech Application",
      description:
        "A digitized evaluation system featuring custom marksheets, student performance analytics, and automated reporting interfaces.",
      gradient: "from-purple-600 to-pink-600",
      accentBg: "bg-purple-500/10 text-purple-600",
      badge: "EdTech",
      techStack: ["React", "JavaScript", "Tailwind CSS", "Node.js"],
    },
    {
      title: "QuickScan Mobile Barcode System",
      category: "Mobile Web Engine",
      description:
        "A lightweight, camera-driven barcode scanner module for inventory management and instant database sync without external API dependencies.",
      gradient: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-500/10 text-pink-600",
      badge: "Utility",
      techStack: ["Node.js", "Express", "MongoDB", "Tailwind CSS"],
    },
    {
      title: "HakimBlog Content Hub",
      category: "CMS & Publishing",
      description:
        "A customized digital publishing portal optimized for fast search indexation, responsive multi-column layouts, and seamless reading experiences.",
      gradient: "from-cyan-500 to-blue-600",
      accentBg: "bg-cyan-500/10 text-cyan-600",
      badge: "Web Portal",
      techStack: ["WordPress", "PHP", "CSS3", "JavaScript"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Colorful Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Our Featured Work
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Crafted with Precision & Excellence
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of modern web applications, digital tools, and scalable software solutions.
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {featuredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient}`}></div>

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.accentBg}`}>
                  {project.category}
                </span>
                <span className="text-xs font-semibold text-gray-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {project.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Stack */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="bg-slate-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Colorful Call to Action */}
      <section className="max-w-5xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-3xl p-10 sm:p-12 shadow-2xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Ready to Build Something Incredible?
        </h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-base">
          Let’s discuss your vision and turn your software ideas into high-performing, scalable web applications.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-purple-700 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
        >
          Start a Project &rarr;
        </Link>
      </section>
    </main>
  );
}