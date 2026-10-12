import Link from "next/link";

export default function ProductsPage() {
  const products = [
    {
      badge: "SaaS Product",
      title: "NewaNext Management Suite",
      description:
        "An all-in-one platform for businesses to manage workflows, client projects, and real-time operations efficiently.",
      features: ["Real-time Analytics", "Team Collaboration", "Automated Workflows"],
      status: "Featured",
    },
    {
      badge: "Education Tech",
      title: "Proxima Assessment Tool",
      description:
        "A smart digital evaluation and assessment platform designed to track student progress and streamline reporting.",
      features: ["Custom Marksheets", "Performance Tracking", "Export & Reporting"],
      status: "Popular",
    },
    {
      badge: "Developer Tool",
      title: "QuickScan Barcode Engine",
      description:
        "A lightweight, mobile-friendly barcode scanner solution for inventory entry without heavy third-party dependencies.",
      features: ["Mobile Camera Integration", "Fast Database Sync", "Zero External APIs"],
      status: "New",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Our Digital Products
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our suite of modern software products designed to simplify complex workflows and accelerate growth.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.badge}
                </span>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded">
                  {product.status}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-2 border-t border-gray-100 pt-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  Key Features
                </p>
                <ul className="space-y-1.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50">
              <Link
                href="/contact"
                className="w-full inline-flex justify-center items-center font-semibold text-sm text-blue-600 hover:text-purple-600 transition-colors"
              >
                Learn More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Product Built?</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          We can design and build custom digital products tailored specifically to your business requirements.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition-colors"
        >
          Request Demo
        </Link>
      </section>
    </main>
  );
}