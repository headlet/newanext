export default function About() {
  return (
    <section className="py-24 bg-slate-50 text-gray-900 relative overflow-hidden">
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-200/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
            About Newanext
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Crafting Digital Solutions with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Heritage & Precision
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Combining traditional craftsmanship values with modern web and software technology.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Main Story Block (Spans 2 cols & 2 rows on large screens) */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl flex flex-col justify-between relative group hover:border-purple-300 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-lg">
                🚀
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-snug">
                Crafting Digital Excellence Since Day One
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Newanext was founded by a passionate Newari entrepreneur with a vision to bridge the gap between innovative ideas and cutting-edge technology. Starting from humble beginnings in the heart of the Kathmandu Valley, we&apos;ve grown into a trusted software development company.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Our journey reflects the rich cultural heritage of Newari craftsmanship—meticulous attention to detail, dedication to quality, and a commitment to creating something extraordinary.
              </p>
            </div>

            {/* Quality Badges Bar */}
            <div className="pt-8 mt-8 border-t border-gray-100 flex flex-wrap gap-3">
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                ✓ Quality First
              </span>
              <span className="bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                ✓ Client Focused
              </span>
              <span className="bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                ✓ Innovation
              </span>
            </div>
          </div>

          {/* Stat Block 1: Purple */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg flex flex-col justify-between group hover:border-purple-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">💻</span>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg">
                Delivered
              </span>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">50+</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Projects Completed</div>
            </div>
          </div>

          {/* Stat Block 2: Blue */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg flex flex-col justify-between group hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">👥</span>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                Clients
              </span>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">30+</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Satisfied Clients</div>
            </div>
          </div>

          {/* Stat Block 3: Emerald */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg flex flex-col justify-between group hover:border-emerald-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">🏆</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Recognition
              </span>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">15+</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Awards Won</div>
            </div>
          </div>

          {/* Stat Block 4: Rose */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg flex flex-col justify-between group hover:border-pink-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">🌐</span>
              <span className="text-xs font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-lg">
                Reach
              </span>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">10+</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">Countries Served</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}