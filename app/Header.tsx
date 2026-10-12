import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
              <Image 
                src="/logo.png" 
                alt="NewaNext Logo" 
                width={24} 
                height={24} 
                className="h-6 w-6 object-contain"
              />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Newa<span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Next</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-purple-600 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-purple-600 transition-colors">
            Services
          </Link>
          <Link href="/products" className="hover:text-purple-600 transition-colors">
            Products
          </Link>
          <Link href="/portfolio" className="hover:text-purple-600 transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="hover:text-purple-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link href="/login">
            <button className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:opacity-95 transition-all active:scale-95">
              Login
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}