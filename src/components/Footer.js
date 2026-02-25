'use client';

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

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* ── Brand ── */}
          <div className="md:col-span-2">
            {/* <div className="flex items-center space-x-3 mb-5">
              <div className="relative h-14 w-28 rounded-xl bg-white shadow-md flex items-center justify-center">
                                <Image
                                  src="/images/mp logo33.jpg"
                                  alt="Multipoint Advisory"
                                  fill
                                  className="object-contain p-3"
                                  priority
                                />
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tight">MULTIPOINT</h3>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Advisory</p>
              </div>
            </div> */}
            <div className="flex flex-col items-start space-x-3 mb-5">
             <div className="relative h-10 w-30  overflow-hidden flex justify-items-start">
                              <Image
                                src="/images/mp logo.png"
                                alt="Multipoint Advisory"
                                fill
                                className="w-fit mt-2 h-auto object-contain"
                                priority
                              />
                             
                          </div>
                          <div>
                            <h1
                              className={` font-black tracking-tight transition-colors duration-300 text-white`}
                            >
                              MULTIPOINT ADVISORY
                            </h1>
                            
                          </div>
                        </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              A multidisciplinary advisory firm delivering integrated solutions across
              infrastructure, digital transformation, research, climate, and public sector
              development.
            </p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {['Infrastructure', 'Digital', 'Climate', 'Research', 'Public Sector'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded-md border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-slate-300">
              Navigate
            </h4>
            <div className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-200"
                >
                  → {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-slate-300">
              Contact
            </h4>
            <div className="space-y-3 text-slate-400 text-sm">
              <div>
                <p className="text-slate-300 font-semibold">Pinetree Plaza, 8th Floor</p>
                <p>Kaburu Drive, Off Ngong Road</p>
                <p>P.O. Box 633-00200</p>
                <p className="text-white font-medium">Nairobi, Kenya</p>
              </div>
              <div className="pt-2 space-y-2">
                <a
                  href="tel:+254114294598"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span>📞</span> +254 114 294 598
                </a>
                <a
                  href="mailto:info@multipointadvisory.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <span>✉️</span> info@multipointadvisory.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Multipoint Advisory. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">Pinetree Plaza · Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}