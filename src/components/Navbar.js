'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',         href: '/' },
  { id: 'about',    label: 'About Us',     href: '/#about' },
  { id: 'values',   label: 'Our Values',   href: '/#values' },
  { id: 'services', label: 'Our Services', href: '/services' },
  { id: 'training', label: 'Training',     href: '/training' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on a dark-hero page (home) or a light page
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages the navbar starts solid immediately
  const solidNav = isScrolled || !isHomePage;

  // Smooth-scroll for anchor links on the same page; navigate for cross-page links
  const handleNavClick = (e, href) => {
    if (href.startsWith('/#') && isHomePage) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/services') return pathname === '/services';
    return false; // anchor links aren't "active" on other pages
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solidNav ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0">
           <div className="flex flex-col items-center">
                <div className="relative h-10 w-30  overflow-hidden flex justify-items-start">
                  <Image
                    src="/images/mp logo.png"
                    alt="Multipoint Advisory"
                    fill
                    className="w-fit mt-2 h-auto object-contain"
                    priority
                  />
                  {/* <h1
                  className={` font-black tracking-tight transition-colors duration-300 ${
                    solidNav ? 'text-slate-900' : 'text-white'
                  }`}
                >MULTIPOINT ADVISORY</h1> */}

              </div>
              <div>
                <h1
                  className={` font-black tracking-tight transition-colors duration-300 ${
                    solidNav ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  MULTIPOINT ADVISORY
                </h1>
                
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive(item.href)
                    ? solidNav
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-white bg-white/20'
                    : solidNav
                    ? 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              solidNav ? 'hover:bg-slate-100' : 'hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 transform transition-all duration-300 ${
                  solidNav ? 'bg-slate-900' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`w-full h-0.5 transition-all duration-300 ${
                  solidNav ? 'bg-slate-900' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`w-full h-0.5 transform transition-all duration-300 ${
                  solidNav ? 'bg-slate-900' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-1 pt-2 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-3 rounded-lg text-left font-semibold transition-all ${
                  isActive(item.href)
                    ? 'text-blue-900 bg-blue-50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}