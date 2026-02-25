'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'values', 'services'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-900 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">MP</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">MULTIPOINT</h1>
                  <p className="text-xs text-slate-600 uppercase tracking-wider">Advisory</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'values', label: 'Our Values' },
                { id: 'services', label: 'Our Services' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-slate-900 transform transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-slate-900 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-slate-900 transform transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}>
            <div className="flex flex-col space-y-2 pt-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'values', label: 'Our Values' },
                { id: 'services', label: 'Our Services' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-all ${
                    activeSection === item.id
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in-up">
            {/* Logo */}
            {/* <div className="mb-8 flex justify-center">
              <div className="relative w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <span className="text-blue-900 font-bold text-4xl">MP</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              MULTIPOINT ADVISORY
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8"></div> */}

            <p className="text-2xl md:text-3xl text-slate-200 mb-6 font-light leading-relaxed">
              Integrated Solutions Across Infrastructure, Digital Transformation, and Sustainable Development
            </p>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Empowering organizations with strategic depth, technical expertise, and innovative solutions
            </p>

            <button
              onClick={() => scrollToSection('about')}
              className="group relative px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Discover Our Expertise
              <span className="ml-2 inline-block transform group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="inline-block px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-semibold mb-4 tracking-wide">
              CORPORATE PROFILE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Us</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-900 to-red-600 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed">
                We are a multidisciplinary advisory firm providing integrated solutions across infrastructure, 
                digital transformation, research, climate change, and public sector development. Our work 
                supports governments, development partners, and private sector clients in navigating complex 
                projects that require technical depth, strategic insight, and long-term sustainability.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                Our team brings together expertise in infrastructure development, information technology, 
                finance, policy analysis, data and research, and climate and sustainability advisory. This cross-sector 
                flexibility allows us to deliver practical, evidence-based advice that is responsive to evolving 
                economic, technological, and environmental challenges.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                We adopt a holistic perspective—combining strategic advisory, technical analysis, and institution-al 
                strengthening—to support impactful development, decision-making, and implementation. By 
                integrating innovation, digital tools, and climate considerations into our engagements, we help 
                clients deliver resilient, efficient, and future-ready outcomes.
              </p>

              <p className="text-lg text-slate-700 leading-relaxed">
                Our commitment is to provide objective, high-quality advisory services that create measurable 
                impact, strengthen institutions, and support sustainable growth across the sectors we serve.
              </p>
            </div>

            {/* Image Placeholder - You'll add actual images from public folder */}
            <div className="relative">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-slate-600 text-sm">Replace with image from /public folder</p>
                    <p className="text-slate-500 text-xs mt-2">(e.g., corporate office or team photo)</p>
                  </div>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl -z-10 opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl -z-10 opacity-20"></div>
            </div>
          </div>

          {/* Port/Infrastructure Image Section */}
          <div className="relative h-80 md:h-96 bg-slate-200 rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder for port/infrastructure image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm">Replace with port/infrastructure image from /public folder</p>
                <p className="text-slate-500 text-xs mt-2">(Similar to the aerial port view in your corporate profile)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections for Values and Services */}
      <section id="values" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
          <p className="text-slate-600">Section coming next...</p>
        </div>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-600">Section coming next...</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MP</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">MULTIPOINT</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Advisory</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Integrated solutions for sustainable development
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'About Us', 'Our Values', 'Our Services'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', ''))}
                    className="block text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-slate-400 text-sm">
                <p>Email: info@multipointadvisory.com</p>
                <p>Phone: +254 XXX XXX XXX</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Multipoint Advisory. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}