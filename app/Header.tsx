import Link from "next/link"

export default function Header() {
    return(
      <header className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Replace this div with an <Image> component if you have a logo file */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Newa<span className="text-purple-600">Next</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">contact</Link>
        </nav>

        {/* CTA Button */}
        <div>
          <button className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>

      </div>
    </header>
    )
}
