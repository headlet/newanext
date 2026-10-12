import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Web Application Development",
      category: "Frontend & Full-Stack",
      description:
        "Building fast, responsive, and scalable web applications using Next.js, React, and Tailwind CSS engineered for seamless user experiences.",
      gradient: "from-blue-600 to-cyan-500",
      accentBg: "bg-blue-500/10 text-blue-600",
      icon: "🌐",
      techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "Custom Software Solutions",
      category: "Enterprise & SaaS",
      description:
        "End-to-end software design and development engineered to automate operational workflows, digitize processes, and boost productivity.",
      gradient: "from-purple-600 to-indigo-600",
      accentBg: "bg-purple-500/10 text-purple-600",
      icon: "💻",
      techStack: ["Full Stack", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "UI/UX & Performance Optimization",
      category: "Optimization & Design",
      description:
        "Crafting intuitive design layouts and optimizing frontend performance for sub-second page loads, SEO readiness, and cross-device responsiveness.",
      gradient: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-500/10 text-pink-600",
      icon: "⚡",
      techStack: ["UI/UX Design", "Page Speed", "SEO", "Responsive UI"],
    },
    {
      title: "Maintenance & Support",
      category: "Managed Services",
      description:
        "Providing continuous updates, security patches, component refactoring, and technical support to ensure high availability and uptime.",
      gradient: "from-cyan-500 to-blue-600",
      accentBg: "bg-cyan-500/10 text-cyan-600",
      icon: "🛠️",
      techStack: ["Bug Fixing", "Security", "Code Refactoring", "Support"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Colorful Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          What We Offer
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          High-Impact Digital Services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We deliver custom software, modern web apps, and performance optimizations designed to elevate your business.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient}`}
            ></div>

            <div>
              {/* Header Badges & Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.accentBg}`}>
                  {service.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div>
              {/* Tech / Skill Tags */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Key Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, techIdx) => (
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

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-3xl p-10 sm:p-12 shadow-2xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Need a Custom Solution for Your Business?
        </h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-base">
          Let’s discuss your technical requirements and build a scalable solution tailored to your goals.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-purple-700 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
        >
          Request a Quote &rarr;
        </Link>
      </section>
    </main>
  );
}