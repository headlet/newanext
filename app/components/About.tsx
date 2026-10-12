export default function About() {
  return (
    <section className="py-20 bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About Newanext
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            A passion-driven tech company built on the foundation of innovation and excellence
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & Story */}
          <div className="space-y-6">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
              Our Story
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-snug ">
              Crafting Digital Excellence Since Day One
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Newanext was founded by a passionate Newari entrepreneur with a vision to bridge the gap between innovative ideas and cutting-edge technology. Starting from humble beginnings in the heart of the Kathmandu Valley, we&apos;ve grown into a trusted software development company.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our journey reflects the rich cultural heritage of Newari craftsmanship—meticulous attention to detail, dedication to quality, and a commitment to creating something extraordinary. We combine traditional values with modern technology to deliver software solutions that truly make a difference.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Today, Newanext stands as a testament to what&apos;s possible when passion meets technology, serving clients globally while staying rooted in our cultural heritage.
            </p>

            {/* Feature Checkmarks */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
                <span className="text-sm font-semibold text-gray-800">Quality First</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
                <span className="text-sm font-semibold text-gray-800">Client Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-xs">✓</span>
                <span className="text-sm font-semibold text-gray-800">Innovation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Colored Statistics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Purple */}
            <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44">
              <div className="text-5xl">💻</div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">50+</div>
                <div className="text-sm font-medium text-purple-100 mt-1">Projects Completed</div>
              </div>
            </div>

            {/* Card 2: Blue */}
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44">
              <div className="text-5xl">👥</div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">30+</div>
                <div className="text-sm font-medium text-blue-100 mt-1">Satisfied Clients</div>
              </div>
            </div>

            {/* Card 3: Green */}
            <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44">
              <div className="text-5xl">🏆</div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">15+</div>
                <div className="text-sm font-medium text-emerald-100 mt-1">Awards Won</div>
              </div>
            </div>

            {/* Card 4: Orange */}
            <div className="bg-amber-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between h-44">
              <div className="text-5xl">🌐</div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">10+</div>
                <div className="text-sm font-medium text-amber-100 mt-1">Countries Served</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}