"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for reaching out! We will get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a project in mind, a question about our products, or want to collaborate? We'd love to hear from you.
        </p>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Details Cards */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 mb-3 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
              📍
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Location</h3>
            <p className="text-gray-600 text-sm mt-1">Kathmandu, Nepal</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 mb-3 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
              ✉️
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
            <p className="text-gray-600 text-sm mt-1">contact@newanext.com</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 mb-3 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Working Hours</h3>
            <p className="text-gray-600 text-sm mt-1">
              Sun – Fri: 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Product Query"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project or inquiry..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow hover:shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}