import Link from "next/link";

export default function Products() {
  const productsList = [
    {
      title: "E-Commerce Suite",
      description:
        "Complete e-commerce platform with inventory management, payment processing, and analytics dashboard.",
      features: [
        "Multi-vendor marketplace",
        "Payment gateway integration",
        "Real-time analytics",
      ],
      bgCard: "bg-white/90",
      iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white",
      gradient: "from-purple-500 to-indigo-600",
      badge: "SaaS Platform",
      badgeBg: "bg-purple-100 text-purple-700",
      checkColor: "text-purple-600",
      icon: "🛒",
    },
    {
      title: "Project Management Tool",
      description:
        "Streamline your workflow with our comprehensive project management and collaboration platform.",
      features: [
        "Team collaboration",
        "Task tracking & scheduling",
        "Progress reporting",
      ],
      bgCard: "bg-white/90",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
      gradient: "from-blue-500 to-cyan-600",
      badge: "Productivity",
      badgeBg: "bg-blue-100 text-blue-700",
      checkColor: "text-blue-600",
      icon: "📊",
    },
    {
      title: "Business Analytics Hub",
      description:
        "Advanced data visualization and reporting engine built for actionable enterprise decision-making.",
      features: [
        "Custom reports & metrics",
        "Automated data sync",
        "Exportable PDF/Excel insights",
      ],
      bgCard: "bg-white/90",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
      gradient: "from-emerald-500 to-teal-600",
      badge: "Analytics",
      badgeBg: "bg-emerald-100 text-emerald-700",
      checkColor: "text-emerald-600",
      icon: "📈",
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
            Digital Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Innovative software products designed to solve real-world problems
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsList.map((product, index) => (
            <div
              key={index}
              className={`${product.bgCard} backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative group overflow-hidden`}
            >
              {/* Top Gradient Accent Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${product.gradient}`}
              ></div>

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${product.iconBg} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}
                  >
                    {product.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${product.badgeBg}`}
                  >
                    {product.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-purple-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Features & Link */}
              <div>
                <ul className="space-y-2.5 pt-4 border-t border-gray-100 mb-6">
                  {product.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2.5 text-sm font-semibold text-gray-700"
                    >
                      <span className={`font-bold text-xs ${product.checkColor}`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-sm"
                >
                  Learn More &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}