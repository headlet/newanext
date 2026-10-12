export default function Portfolio() {
  const portfolioList = [
    {
      title: "Corporate Website",
      description: "Modern, responsive corporate website with CMS integration",
      tags: ["React", "Node.js", "MongoDB"],
      gradient: "from-purple-600 to-indigo-800",
      icon: "🛒",
    },
    {
      title: "Mobile Banking App",
      description: "Secure, user-friendly banking application for iOS and Android",
      tags: ["React Native", "Firebase", "REST API"],
      gradient: "from-cyan-400 to-blue-600",
      icon: "📱",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-featured online store with payment integration",
      tags: ["Vue.js", "Laravel", "MySQL"],
      gradient: "from-pink-500 to-red-500",
      icon: "🛍️",
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50 text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
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
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Colored Top Header Banner */}
              <div className={`relative h-48 bg-gradient-to-r ${item.gradient} p-6 flex items-center justify-center text-white`}>
                <span className="text-5xl drop-shadow-md">{item.icon}</span>
              </div>

              {/* Bottom Content Area */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                  {item.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex} 
                      className="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md"
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