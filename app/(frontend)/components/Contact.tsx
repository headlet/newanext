"use client";

export default function Contact() {
  const socialIcons = [
    { label: "f", bg: "hover:bg-blue-600 hover:text-white" },
    { label: "𝕏", bg: "hover:bg-slate-900 hover:text-white" },
    { label: "in", bg: "hover:bg-blue-700 hover:text-white" },
    { label: "📸", bg: "hover:bg-pink-600 hover:text-white" },
    { label: "gh", bg: "hover:bg-purple-700 hover:text-white" },
  ];

  return (
    <section className="py-24 bg-slate-400 text-gray-900 relative overflow-hidden">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
            Let&apos;s Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Ready to start your project? Let&apos;s discuss how we can help bring your ideas to life.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="space-y-8 bg-white/50 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"></div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We&apos;re here to help! Reach out to us through any of the following channels, and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Address</h4>
                  <p className="text-sm text-gray-600">Kathmandu Valley, Nepal</p>
                  <p className="text-xs text-gray-400 mt-0.5">Shankhamul, Kathmandu</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Phone</h4>
                  <p className="text-sm text-gray-600">+977-9800000000</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mon - Fri from 9am to 6pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-xl shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Email</h4>
                  <p className="text-sm text-gray-600">info@newanext.com</p>
                  <p className="text-sm text-gray-600">hello@newanext.com</p>
                </div>
              </div>

            </div>

            {/* Social Icons */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-3">
                {socialIcons.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`w-10 h-10 rounded-xl bg-slate-100 border border-gray-200/80 flex items-center justify-center text-gray-600 ${item.bg} transition-all cursor-pointer text-sm font-bold shadow-sm active:scale-95`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="bg-white/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-xl relative overflow-hidden">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+977-98xxxxxxxx" 
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry regarding software development" 
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your project requirements..." 
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all shadow-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-95 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span>Send Message</span>
                <span>✈️</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}