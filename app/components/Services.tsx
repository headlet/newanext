export default function Services() {
  const servicesList = [
    {
      title: "Custom Software Development",
      description: "Build scalable, robust software solutions tailored to your specific business requirements using the latest technologies and best practices.",
      icon: "💻",
      iconBg: "bg-purple-600",
      features: ["Web Applications", "Desktop Applications", "API Development"],
    },
    {
      title: "Mobile App Development",
      description: "Create powerful, user-friendly mobile applications for iOS and Android platforms that deliver exceptional user experiences.",
      icon: "📱",
      iconBg: "bg-cyan-500",
      features: ["Native iOS & Android", "Cross-Platform Apps", "UI/UX Design"],
    },
    {
      title: "Cloud Solutions",
      description: "Leverage cloud computing to scale your business, improve efficiency, and reduce costs with our comprehensive cloud services.",
      icon: "☁️",
      iconBg: "bg-pink-500",
      features: ["Cloud Migration", "DevOps & CI/CD", "Infrastructure Setup"],
    },
    {
      title: "UI/UX Design",
      description: "Design intuitive, beautiful user interfaces that enhance user experience and drive engagement across all platforms.",
      icon: "🎨",
      iconBg: "bg-amber-500",
      features: ["User Research", "Prototyping", "Design Systems"],
    },
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions and best practices to keep your business safe.",
      icon: "🛡️",
      iconBg: "bg-emerald-600",
      features: ["Security Audit", "Vulnerability Testing", "Security Consulting"],
    },
    {
      title: "Support & Maintenance",
      description: "Ensure your software runs smoothly with our 24/7 support and regular maintenance services.",
      icon: "⚙️",
      iconBg: "bg-indigo-600",
      features: ["24/7 Support", "Regular Updates", "Performance Monitoring"],
    },
  ];

  return (
    <section className="py-20 bg-gray-50/50 text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
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
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100/80 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center text-white text-xl mb-6 shadow-sm`}>
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Feature Checkmarks List */}
              <ul className="space-y-2.5 pt-4 border-t border-gray-100">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                    <span className="text-blue-600 font-bold text-xs">✓</span>
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