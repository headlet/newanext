export default function Services() {
  const servicesList = [
    {
      title: "Custom Software Development",
      description:
        "Build scalable, robust software solutions tailored to your specific business requirements using the latest technologies and best practices.",
      icon: "💻",
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
      gradient: "from-purple-500 to-indigo-600",
      checkColor: "text-purple-600",
      features: ["Web Applications", "Desktop Applications", "API Development"],
    },
    {
      title: "Mobile App Development",
      description:
        "Create powerful, user-friendly mobile applications for iOS and Android platforms that deliver exceptional user experiences.",
      icon: "📱",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white",
      gradient: "from-cyan-500 to-blue-600",
      checkColor: "text-blue-600",
      features: ["Native iOS & Android", "Cross-Platform Apps", "UI/UX Design"],
    },
    {
      title: "Cloud Solutions",
      description:
        "Leverage cloud computing to scale your business, improve efficiency, and reduce costs with our comprehensive cloud services.",
      icon: "☁️",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600 text-white",
      gradient: "from-pink-500 to-rose-600",
      checkColor: "text-pink-600",
      features: ["Cloud Migration", "DevOps & CI/CD", "Infrastructure Setup"],
    },
    {
      title: "UI/UX Design",
      description:
        "Design intuitive, beautiful user interfaces that enhance user experience and drive engagement across all platforms.",
      icon: "🎨",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      gradient: "from-amber-500 to-orange-600",
      checkColor: "text-amber-600",
      features: ["User Research", "Prototyping", "Design Systems"],
    },
    {
      title: "Cybersecurity",
      description:
        "Protect your digital assets with comprehensive security solutions and best practices to keep your business safe.",
      icon: "🛡️",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
      gradient: "from-emerald-500 to-teal-600",
      checkColor: "text-emerald-600",
      features: ["Security Audit", "Vulnerability Testing", "Security Consulting"],
    },
    {
      title: "Support & Maintenance",
      description:
        "Ensure your software runs smoothly with our 24/7 support and regular maintenance services.",
      icon: "⚙️",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-700 text-white",
      gradient: "from-indigo-500 to-blue-700",
      checkColor: "text-indigo-600",
      features: ["24/7 Support", "Regular Updates", "Performance Monitoring"],
    },
  ];

  return (
    <section className="py-20 bg-slate-50 text-gray-900 relative overflow-hidden">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative group overflow-hidden"
            >
              {/* Top Gradient Accent Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient}`}
              ></div>

              <div>
                {/* Icon Box */}
                <div
                  className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Feature Checkmarks List */}
              <ul className="space-y-2.5 pt-4 border-t border-gray-100">
                {service.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-700"
                  >
                    <span className={`font-bold text-xs ${service.checkColor}`}>
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}