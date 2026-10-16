export default function Portfolio() {
  const portfolioList = [
    {
      title: "Corporate Website",
      description: "Modern, responsive corporate website with CMS integration",
      tags: ["React", "Node.js", "MongoDB"],
      gradient: "from-purple-600 via-indigo-700 to-slate-900",
      accentBg: "bg-purple-100 text-purple-700",
      category: "Web Application",
      icon: "🌐",
    },
    {
      title: "Mobile Banking App",
      description: "Secure, user-friendly banking application for iOS and Android",
      tags: ["React Native", "Firebase", "REST API"],
      gradient: "from-cyan-500 via-blue-600 to-indigo-800",
      accentBg: "bg-blue-100 text-blue-700",
      category: "Mobile App",
      icon: "📱",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store with payment integration",
      tags: ["Vue.js", "Laravel", "MySQL"],
      gradient: "from-pink-500 via-rose-600 to-purple-800",
      accentBg: "bg-pink-100 text-pink-700",
      category: "E-Commerce",
      icon: "🛍️",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 text-gray-900 relative overflow-hidden">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Showcasing our best work and successful projects
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioList.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative group"
            >
              {/* Colored Top Header Banner */}
              <div
                className={`relative h-52 bg-gradient-to-r ${item.gradient} p-6 flex items-center justify-center text-white overflow-hidden`}
              >
                {/* Glass Accent Blobs */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>

                {/* Main Icon */}
                <div className="w-20 h-20 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-5xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Bottom Content Area */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mt-auto">
                  {item.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="bg-slate-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}