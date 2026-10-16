import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      title: "NewaNext Management Suite",
      badge: "SaaS Platform",
      status: "Featured",
      description:
        "An all-in-one management suite engineered for tech enterprises to streamline client projects, internal workflows, and operational analytics.",
      gradient: "from-blue-600 to-indigo-600",
      badgeBg: "bg-blue-100 text-blue-700",
      statusBg: "bg-blue-50 text-blue-600 border border-blue-200",
      features: ["Real-time Analytics", "Team Collaboration", "Automated Workflows"],
      icon: "🚀",
    },
    {
      title: "Proxima Assessment Tool",
      badge: "EdTech Solution",
      status: "Popular",
      description:
        "A digital evaluation and assessment platform designed for educational institutes to create custom marksheets and track student progress.",
      gradient: "from-purple-600 to-pink-600",
      badgeBg: "bg-purple-100 text-purple-700",
      statusBg: "bg-purple-50 text-purple-600 border border-purple-200",
      features: ["Custom Marksheets", "Performance Analytics", "Exportable Reports"],
      icon: "📊",
    },
    {
      title: "QuickScan Barcode Engine",
      badge: "Developer Utility",
      status: "New",
      description:
        "A lightweight, mobile-friendly camera barcode scanning module designed for fast database inventory logging without heavy third-party APIs.",
      gradient: "from-pink-500 to-rose-600",
      badgeBg: "bg-pink-100 text-pink-700",
      statusBg: "bg-pink-50 text-pink-600 border border-pink-200",
      features: ["Mobile Camera Integration", "Instant Database Sync", "Zero External Dependencies"],
      icon: "📱",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Our Products
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Software Built for Growth
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our suite of digital products engineered for efficiency, scalability, and seamless operational workflows.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${product.gradient}`}></div>

            <div>
              {/* Badges & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.badgeBg}`}>
                  {product.badge}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${product.statusBg}`}>
                  {product.status}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{product.icon}</span>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {product.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Key Features
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Link */}
            <div className="mt-8 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="w-full inline-flex justify-center items-center font-bold text-sm text-purple-600 hover:text-pink-600 transition-colors"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Colorful Call to Action */}
      <section className="max-w-5xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-3xl p-10 sm:p-12 shadow-2xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
          Need a Custom Product Built?
        </h2>
        <p className="text-purple-100 mb-8 max-w-xl mx-auto text-base">
          We can tailor and engineer custom digital products designed specifically for your business requirements.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-purple-700 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
        >
          Request Demo &rarr;
        </Link>
      </section>
    </main>
  );
}