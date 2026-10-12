import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Innovation First",
      description:
        "We leverage cutting-edge tech stacks like Next.js, React, and modern UI architectures to craft forward-thinking digital products.",
      gradient: "from-blue-500 to-cyan-500",
      accentBg: "bg-blue-500/10 text-blue-600",
      icon: "🚀",
    },
    {
      title: "Clean Code & Performance",
      description:
        "Scalability, sub-second load times, and maintainable component architectures are built directly into our core development process.",
      gradient: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-500/10 text-purple-600",
      icon: "⚡",
    },
    {
      title: "Human-Centric Design",
      description:
        "Every line of code and pixel we deliver focuses on intuitive user experiences that solve real-world operational challenges.",
      gradient: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-500/10 text-pink-600",
      icon: "🎯",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Colorful Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Who We Are
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Crafting Digital Excellence Since Day One
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At NewaNext, we are passionate about engineering high-performing, scalable software solutions that empower modern enterprises to grow.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Our Mission Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
            🎯
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-blue-100 leading-relaxed text-base">
            To deliver exceptional full-stack web applications and digital tools that streamline complex operations, accelerate digital transformation, and provide incredible user experiences.
          </p>
        </div>

        {/* Our Vision Card */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
            🌟
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Our Vision</h2>
          <p className="text-purple-100 leading-relaxed text-base">
            To become a benchmark software engineering hub known for cutting-edge technology adoption, aesthetic design systems, and reliable enterprise solution delivery.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-6xl mx-auto mt-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Our Guiding Principles
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            The core pillars behind our product quality and development culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-100 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${item.gradient}`}
              ></div>

              <div>
                <div className="w-12 h-12 mb-6 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-3xl p-10 sm:p-12 shadow-2xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Want to Partner with NewaNext?
        </h2>
        <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-base">
          Whether you need a custom SaaS platform, product consultation, or tailored web applications, we are ready to bring your vision to life.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-purple-700 hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
        >
          Get in Touch &rarr;
        </Link>
      </section>
    </main>
  );
}