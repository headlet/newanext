import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: "🌐",
      title: "Web Application Development",
      description:
        "Building fast, responsive, and scalable web applications using Next.js, React, and modern UI frameworks tailored to your business needs.",
      tags: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      icon: "📱",
      title: "Custom Software Development",
      description:
        "End-to-end software design and development engineered to streamline your workflows, digitize processes, and boost productivity.",
      tags: ["Full Stack", "Node.js", "API Integration"],
    },
    {
      icon: "⚡",
      title: "UI/UX & Frontend Optimization",
      description:
        "Crafting intuitive user experiences and optimizing application performance for speed, SEO, and seamless user interaction.",
      tags: ["UI/UX", "Performance", "SEO"],
    },
    {
      icon: "🛠️",
      title: "Maintenance & Support",
      description:
        "Providing continuous updates, bug fixes, security enhancements, and technical support to keep your software running smoothly.",
      tags: ["Support", "Updates", "Security"],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Our Services & Solutions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer high-quality digital solutions to help your business grow, scale, and succeed in the modern tech landscape.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 mb-4 bg-blue-50 text-2xl rounded-xl flex items-center justify-center">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Let’s discuss your project requirements and turn your vision into a production-ready application.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition-colors"
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}