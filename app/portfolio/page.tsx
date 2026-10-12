import Link from "next/link";

export default function PortfolioPage() {
  const projects = [
    {
      title: "NewaNext SaaS Web Platform",
      category: "Full Stack Web Application",
      description:
        "A responsive, modern web application featuring clean components, dynamic routing, and an optimized user experience.",
      techStack: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      title: "Proxima Interactive Learning Suite",
      category: "Educational Digital Platform",
      description:
        "Custom evaluation tables, marksheets, and interactive learning tools designed for structured student performance tracking.",
      techStack: ["React", "JavaScript", "Tailwind CSS"],
    },
    {
      title: "QuickScan Mobile Barcode System",
      category: "Mobile Web Application",
      description:
        "A lightweight mobile camera-based barcode scanning module built for rapid database entries without external API dependencies.",
      techStack: ["Node.js", "Express", "MongoDB"],
    },
    {
      title: "HakimBlog Web Portal",
      category: "Content Management & Publishing",
      description:
        "A fully managed, search-engine-optimized personal blogging and publishing platform with customized layout structures.",
      techStack: ["WordPress", "CSS3", "PHP"],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Our Featured Projects
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our recent work, case studies, and full-stack digital solutions built for efficiency, scalability, and user engagement.
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {project.category}
              </span>

              <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-3">
                {project.title}
              </h2>

              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {project.techStack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Inspired by Our Work?</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Let’s collaborate to build your next custom web application or software product from the ground up.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition-colors"
        >
          Start a Project
        </Link>
      </section>
    </main>
  );
}