"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        
        {/* Company Info (Takes 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white">
              N
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Newanext
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            A tech-based software company driven by innovation, quality, and the rich heritage of Newari craftsmanship. Building the future, one line of code at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Quick Links</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-400 transition-colors">Services</Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-400 transition-colors">Product</Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Services</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">Software Development</li>
            <li className="hover:text-white transition-colors cursor-pointer">Mobile Apps</li>
            <li className="hover:text-white transition-colors cursor-pointer">Cloud Solutions</li>
            <li className="hover:text-white transition-colors cursor-pointer">UI/UX Design</li>
            <li className="hover:text-white transition-colors cursor-pointer">Consulting</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-base">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get updates on our latest projects and tech insights.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-[#131b36] rounded-lg border border-gray-700 overflow-hidden p-1">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-transparent px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors flex items-center justify-center"
            >
              {/* <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg> */}
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar / Copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800/80 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center">
        <p>&copy; 2024 Newanext. All rights reserved. | Founded with passion by a Newari entrepreneur</p>
      </div>
    </footer>
  );
}