"use client";

export default function Contact() {
  return (
    <section className="bg-[#0b1329] text-white py-20 px-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get In Touch
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Ready to start your project? Let&apos;s discuss how we can help bring your ideas to life.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Info Column */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                We&apos;re here to help! Reach out to us through any of the following channels, and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Address</h4>
                  <p className="text-sm text-gray-400">Kathmandu Valley, Nepal</p>
                  <p className="text-xs text-gray-500">Near you, wherever you are</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Phone</h4>
                  <p className="text-sm text-gray-400">+977-XXXX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Email</h4>
                  <p className="text-sm text-gray-400">info@newanext.com</p>
                  <p className="text-sm text-gray-400">hello@newanext.com</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="font-semibold text-white text-sm mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {["f", "𝕏", "in", "📸", "gh"].map((icon, idx) => (
                  <div 
                    key={idx} 
                    className="w-10 h-10 rounded-xl bg-[#131b36] border border-gray-700/60 flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:border-transparent transition-colors cursor-pointer text-sm font-bold"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="bg-[#131b36] p-8 rounded-2xl border border-gray-800 shadow-xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#0b1329] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com" 
                  className="w-full bg-[#0b1329] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="+977-xxx-xxxxxx" 
                  className="w-full bg-[#0b1329] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-[#0b1329] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="tell us about your project" 
                  className="w-full bg-[#0b1329] border border-gray-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
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