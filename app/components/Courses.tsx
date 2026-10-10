
import Link from "next/link";


export default function Courses() {
  const coursesList = [
    {
      title: "Graphic Design",
      description: "Adobe Illustrator Course Master Vector Design & Creative Illustration Techniques",
      tag: "starts in 2 days",
      rating: "5.0",
      price: "RS 2500",
      oldPrice: "RS 25000",
      discount: "90% off",
      bgColor: "from-blue-600 to-cyan-500",
    },
    {
      title: "Cyber Security",
      description: "Secure your digital future with trusted cyber security solutions",
      tag: "starts in 5 days",
      rating: "5.0",
      price: "RS 15000",
      oldPrice: "RS 50000",
      discount: "70% off",
      bgColor: "from-blue-900 to-indigo-900",
    },
    {
      title: "Mernstack",
      description: "Master the MERN Stack. Build the Web of Tomorrow.",
      tag: "starts in 2 days",
      rating: "5.0",
      price: "RS 10000",
      oldPrice: "RS 20000",
      discount: "50% off",
      bgColor: "from-green-900 to-emerald-900",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our courses
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Master in-demand skills with practical, project-based learning.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesList.map((course, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                {/* Course Top Image / Banner Box */}
                <div className={`relative h-48 bg-gradient-to-r ${course.bgColor} p-4 flex flex-col justify-between text-white`}>
                  <div className="flex justify-between items-center">
                    <span className="bg-orange-500 text-xs font-semibold px-3 py-1 rounded-full text-white">
                      {course.tag}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      ⭐ {course.rating}
                    </span>
                  </div>
                  <div className="text-center font-bold text-xl tracking-wider opacity-90">
                    {course.title.toUpperCase()}
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Pricing & Footer inside Card */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{course.price}</span>
                    <span className="text-xs text-gray-400 line-through">{course.oldPrice}</span>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {course.discount}
                  </span>
                </div>
                <Link 
                  href="/curriculum" 
                  className="text-orange-500 hover:text-orange-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  curriculum &rarr;
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}