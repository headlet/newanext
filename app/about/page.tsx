import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Crafting Digital Excellence Since Day One
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At NewaNext, we are passionate about delivering top-notch software solutions that empower businesses to thrive in the modern digital era.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To innovate continuously and provide high-performing, scalable web and software applications that solve real-world challenges for our clients worldwide.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become a leading software development enterprise known for cutting-edge technologies, exceptional code quality, and human-centric design.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
              🚀
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Innovation</h3>
            <p className="text-gray-500 text-sm mt-2">
              Building next-generation software with modern frameworks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Excellence</h3>
            <p className="text-gray-500 text-sm mt-2">
              Delivering high-quality code and responsive user interfaces.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-xl">
              🤝
            </div>
            <h3 className="font-semibold text-lg text-gray-900">Collaboration</h3>
            <p className="text-gray-500 text-sm mt-2">
              Working closely with businesses to transform their vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-10 shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Something Great?</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Get in touch with our team today and let's bring your ideas to life.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}