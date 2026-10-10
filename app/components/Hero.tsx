import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[#6355d8] text-white pt-16 pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Building the Future with{" "}
            <span className="text-[#fde047]">Cutting-Edge Software</span>
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-xl leading-relaxed">
            NewaNext delivers innovative software solutions that transform businesses. From concept to deployment, we craft digital experiences that matter.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/contact" 
              className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </Link>
            <Link 
              href="/portfolio" 
              className="border border-purple-300 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              View Our Work
            </Link>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-purple-500/40 mt-10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">20+</div>
              <div className="text-xs sm:text-sm text-purple-200">Projects Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">15+</div>
              <div className="text-xs sm:text-sm text-purple-200">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold">2+</div>
              <div className="text-xs sm:text-sm text-purple-200">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Right Illustration Box */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full max-w-lg bg-[#2a2468]/60 rounded-2xl p-4 shadow-2xl border border-purple-400/30">
            <div className="aspect-video bg-[#1e293b] rounded-xl flex items-center justify-center text-purple-300 text-sm font-medium border border-slate-700">
              <div className="text-center space-y-2 p-6">
                <div className="text-cyan-400 font-mono text-xs">💻 Software Illustration Mockup</div>
                <p className="text-gray-400 text-xs">Replace this box with your actual image or SVG graphic if needed.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}