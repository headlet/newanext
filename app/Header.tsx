'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Navigation links configuration matching your requirements
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Products', href: '/products' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-4 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
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

        {/* Desktop Navigation Links with Color-Only Active Highlighting */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-purple-600 font-bold'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:opacity-95 transition-all active:scale-95 inline-block"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            type="button"
            aria-label="Toggle Menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors focus:outline-none"
          >
            <span className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
            <span className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 my-1 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
          </button>
        </div>

      </div>

      {/* ----------------- MOBILE DRAWER MENU ----------------- */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={closeMobileMenu}
      >
        <div 
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 p-0.5 shadow-sm">
                  <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                    <Image 
                      src="/logo.png" 
                      alt="NewaNext Logo" 
                      width={20} 
                      height={20} 
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                </div>
                <span className="text-lg font-extrabold text-gray-900">
                  Newa<span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Next</span>
                </span>
              </div>
              <button 
                onClick={closeMobileMenu}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Mobile Nav Links with Color-Only Highlighting */}
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`text-left text-base transition-colors py-1.5 border-b border-gray-50 ${
                      isActive
                        ? 'text-purple-600 font-bold pl-2'
                        : 'text-gray-700 hover:text-purple-600 font-semibold'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer Login CTA */}
          <div className="pt-6 border-t border-gray-100">
            <Link 
              href="/login"
              onClick={closeMobileMenu}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 transition-all text-center block"
            >
              Login / Sign Up
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4">© NewaNext Technologies</p>
          </div>

        </div>
      </div>
    </header>
  );
}