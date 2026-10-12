import Link from "next/link";

export default function Courses() {
  const coursesList = [
    {
      title: "Graphic Design",
      description:
        "Adobe Illustrator Course Master Vector Design & Creative Illustration Techniques",
      tag: "starts in 2 days",
      rating: "5.0",
      price: "RS 2500",
      oldPrice: "RS 25000",
      discount: "90% off",
      bgColor: "from-blue-600 via-cyan-500 to-indigo-600",
      tagBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "Cyber Security",
      description:
        "Secure your digital future with trusted cyber security solutions and practical defense techniques.",
      tag: "starts in 5 days",
      rating: "5.0",
      price: "RS 15000",
      oldPrice: "RS 50000",
      discount: "70% off",
      bgColor: "from-purple-700 via-indigo-800 to-slate-900",
      tagBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
    {
      title: "Mernstack",
      description: "Master the MERN Stack. Build the Web of Tomorrow with modern web architectures.",
      tag: "starts in 2 days",
      rating: "5.0",
      price: "RS 10000",
      oldPrice: "RS 20000",
      discount: "50% off",
      bgColor: "from-emerald-600 via-teal-700 to-cyan-800",
      tagBg: "bg-gradient-to-r from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 text-gray-900 relative overflow-hidden">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Upskill Today
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Courses
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Master in-demand skills with practical, project-based learning.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 relative group"
            >
              <div>
                {/* Course Banner Box */}
                <div
                  className={`relative h-52 bg-gradient-to-r ${course.bgColor} p-5 flex flex-col justify-between text-white overflow-hidden`}
                >
                  {/* Glass Accent Blob */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex justify-between items-center relative z-10">
                    <span
                      className={`${course.tagBg} text-xs font-bold px-3.5 py-1.5 rounded-full text-white shadow-md uppercase tracking-wider`}
                    >
                      {course.tag}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md border border-white/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      ⭐ {course.rating}
                    </span>
                  </div>

                  <div className="text-center font-black text-2xl tracking-widest text-white drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                    {course.title.toUpperCase()}
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Pricing & Footer inside Card */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-base font-extrabold text-gray-900">
                      {course.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {course.oldPrice}
                    </span>
                  </div>
                  <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md mt-1">
                    {course.discount}
                  </span>
                </div>

                <Link
                  href="/curriculum"
                  className="mt-4 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  Curriculum &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}