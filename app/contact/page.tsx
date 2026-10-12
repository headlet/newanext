"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dhanyabad! We have received your message and will contact you shortly.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Colorful Background Blur Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Let's Connect / सम्पर्क गर्नुहोस्
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Get in Touch with NewaNext
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a project idea, need custom software, or want to visit our hub in Kathmandu? Drop us a message below!
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Colorful Contact Info Cards */}
        <div className="space-y-6 lg:col-span-1">
          {/* Location Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg border border-blue-400/30">
            <div className="w-12 h-12 mb-4 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl">
              📍
            </div>
            <h3 className="font-bold text-xl mb-1">Our Location</h3>
            <p className="text-blue-100 text-sm font-medium">Shankhamul, Kathmandu, Nepal</p>
            <p className="text-blue-200 text-xs mt-2">Kathmandu Valley, Bagmati Province</p>
          </div>

          {/* Email Card */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg border border-purple-400/30">
            <div className="w-12 h-12 mb-4 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl">
              ✉️
            </div>
            <h3 className="font-bold text-xl mb-1">Email Us</h3>
            <p className="text-purple-100 text-sm font-medium">info@newanext.com</p>
            <p className="text-purple-200 text-xs mt-2">We respond within 24 hours</p>
          </div>

          {/* Phone & Working Hours */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-2xl shadow-lg border border-pink-400/30">
            <div className="w-12 h-12 mb-4 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl">
              📞
            </div>
            <h3 className="font-bold text-xl mb-1">Phone & Hours</h3>
            <p className="text-pink-100 text-sm font-medium">+977 9800000000 / 01-4XXXXXX</p>
            <p className="text-pink-200 text-xs mt-2">Sun – Fri: 10:00 AM – 6:00 PM (NPT)</p>
          </div>
        </div>

        {/* Contact Form with Modern Gradient Glow */}
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl lg:col-span-2 relative">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
            <p className="text-sm text-gray-500">Fill out the details and our team in Kathmandu will get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name / पूरा नाम
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Manish Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address / इमेल
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="manish@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number (Nepal)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject / विषय
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Web Development Inquiry"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Message / संदेश
              </label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your project requirements or message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm transition-all bg-slate-50 focus:bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm tracking-wide"
            >
              Send Message / पठाउनुहोस् &rarr;
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}