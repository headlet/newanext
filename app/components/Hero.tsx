import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-slate-900 text-white pt-20 pb-28 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-semibold text-purple-300 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-pulse"></span>
            Next-Generation Tech Solutions
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Building the Future with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Cutting-Edge Software
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            NewaNext delivers innovative software solutions that transform businesses. From concept to deployment, we craft high-performing digital experiences that matter.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/25 hover:opacity-95 transition-all text-sm uppercase tracking-wider"
            >
              Start Your Project &rarr;
            </Link>
            <Link 
              href="/portfolio" 
              className="bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold px-7 py-3.5 rounded-xl hover:bg-slate-800 transition-all text-sm"
            >
              View Our Work
            </Link>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 mt-10">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">20+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">15+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-pink-400">2+</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Right Illustration Box */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-md rounded-3xl p-3 shadow-2xl border border-slate-700/60 relative group hover:border-purple-500/50 transition-all duration-300">
            {/* Ambient Backlight behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-40 blur transition-all duration-500 pointer-events-none"></div>

            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative border border-slate-800">
              <Image 
                src="/images/hero.png" 
                alt="NewaNext Hero Showcase" 
                width={600}
                height={337}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}