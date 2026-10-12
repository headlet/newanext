import Link from "next/link";

export default function Products() {
  const productsList = [
    {
      title: "E-Commerce Suite",
      description: "Complete e-commerce platform with inventory management, payment processing, and analytics dashboard.",
      features: ["Multi-vendor marketplace", "Payment gateway integration", "Real-time analytics"],
      bgCard: "bg-purple-50/50",
      iconBg: "bg-purple-100 text-purple-600",
      icon: "🛒",
    },
    {
      title: "Project Management Tool",
      description: "Streamline your workflow with our comprehensive project management and collaboration platform.",
      features: ["Team collaboration", "Task tracking & scheduling", "Progress reporting"],
      bgCard: "bg-blue-50/50",
      iconBg: "bg-blue-100 text-blue-600",
      icon: "📊",
    },
    {
      title: "E-Commerce Suite",
      description: "Complete e-commerce platform with inventory management, payment processing, and analytics dashboard.",
      features: ["Multi-vendor marketplace", "Payment gateway integration", "Real-time analytics"],
      bgCard: "bg-emerald-50/50",
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: "📈",
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
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
              className={`${product.bgCard} rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow`}
            >
              <div>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${product.iconBg} flex items-center justify-center text-xl mb-6 shadow-sm`}>
                  {product.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Features & Link */}
              <div>
                <ul className="space-y-2.5 pt-4 border-t border-gray-200/60 mb-6">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                      <span className="text-emerald-600 font-bold text-xs">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className="text-purple-600 hover:text-purple-700 text-sm font-semibold inline-flex items-center gap-1 transition-colors"
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