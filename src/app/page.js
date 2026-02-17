'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: '⚖️',
    title: 'Ethics and Integrity',
    desc: 'We act with honesty, fairness and accountability in every sector we serve.',
    color: 'from-blue-900 to-blue-700',
    accent: '#1e3a5f',
  },
  {
    icon: '💡',
    title: 'Adaptable Innovation',
    desc: 'We embrace the agility to adapt our expertise to the diverse regulatory frameworks and evolving needs of each sector.',
    color: 'from-red-600 to-orange-500',
    accent: '#dc2626',
  },
  {
    icon: '🎯',
    title: 'Impact-Oriented',
    desc: 'We are focused on delivering results that drive meaningful change and lasting benefits for clients.',
    color: 'from-slate-700 to-slate-600',
    accent: '#475569',
  },
  {
    icon: '🏆',
    title: 'Operational Excellence',
    desc: 'We ensure consistent, high-quality services across every sector. Through efficiency, reliability, and continuous improvement, we set the benchmark for excellence and client satisfaction.',
    color: 'from-blue-800 to-blue-600',
    accent: '#1d4ed8',
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    desc: 'We integrate Environmental, Social and Governance (ESG) principles into our operations, delivering services that meet current needs while contributing to a better future.',
    color: 'from-emerald-700 to-emerald-500',
    accent: '#059669',
  },
];

const SERVICES = [
  {
    num: '01',
    title: 'Infrastructure & Urban Development',
    desc: 'We provide integrated advisory services across the full infrastructure lifecycle, supporting governments and private sector players in the planning, structuring, financing, and delivery of resilient infrastructure. Our approach combines technical, financial, digital, and climate considerations to ensure projects are sustainable, bankable, and aligned with long-term development objectives.',
    img: '/images/mp service1.jpg',
    alt: 'Infrastructure & Urban Development',
    tag: 'Planning · Finance · Delivery',
  },
  {
    num: '02',
    title: 'Digital Transformation & IT Services',
    desc: 'We support organizations in leveraging technology to improve efficiency, transparency, and service delivery. Our services span IT strategy, digital infrastructure, data analytics, and systems advisory, underpinned by applied research and innovation to enable secure, scalable, and future-ready digital solutions.',
    img: '/images/mp service2.jpg',
    alt: 'Digital Transformation',
    tag: 'IT Strategy · Data Analytics · Innovation',
  },
  {
    num: '03',
    title: 'Climate Change, Energy & Sustainability',
    desc: 'We advise on climate risk, clean energy transitions, and sustainability strategies that align with international frameworks and local contexts. Our work helps clients integrate ESG considerations, access green finance, and build resilient operations in a changing climate landscape.',
    img: '/images/mp service3.jpg',
    alt: 'Climate & Sustainability',
    tag: 'ESG · Green Finance · Resilience',
  },
  {
    num: '04',
    title: 'Research, Policy & Development Advisory',
    desc: 'We deliver evidence-based research and policy advisory to inform decision-making at national, regional, and institutional levels. Our services include sector studies, impact assessments, feasibility analysis, and data analytics, bridging research with practical implementation across infrastructure, technology, and climate-related initiatives.',
    img: '/images/mp service4.jpg',
    alt: 'Research & Policy Advisory',
    tag: 'Research · Policy · Analytics',
  },
  {
    num: '05',
    title: 'Public Sector & Institutional Advisory',
    desc: 'We partner with public institutions, development agencies, and corporates to strengthen governance, institutional capacity, and project delivery. Our multidisciplinary advisory integrates infrastructure development, digital systems, research, and climate considerations to enhance accountability, performance, and long-term public value.',
    img: '/images/mp service5.jpg',
    alt: 'Public Sector Advisory',
    tag: 'Governance · Capacity · Delivery',
  },
];

// ─── Value Card ───────────────────────────────────────────────────────────────
function ValueCard({ value, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s`,
      }}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${value.color}`}></div>

      <div className="p-7">
        {/* Icon bubble */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {value.icon}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{value.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
      </div>

      {/* Hover corner glow */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: value.accent }}
      ></div>
    </div>
  );
}

// ─── Service Row ──────────────────────────────────────────────────────────────
function ServiceRow({ service, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl mb-10 ${isEven ? '' : 'lg:flex-row-reverse'}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      }}
    >
      {/* Image side */}
      <div className={`relative h-72 lg:h-auto min-h-[300px] bg-slate-200 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
        <Image
          src={service.img}
          alt={service.alt}
          fill
          className="object-cover"
        />
        {/* Number overlay */}
        <div className="absolute top-5 left-5 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-blue-900 font-black text-sm">{service.num}</span>
        </div>
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${isEven ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-slate-900/20`}></div>
      </div>

      {/* Text side */}
      <div className={`bg-white flex flex-col justify-center p-10 ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
        {/* Tag */}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-4 w-fit tracking-wide uppercase">
          {service.tag}
        </span>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{service.title}</h3>

        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-900 to-red-600 mb-5"></div>

        <p className="text-slate-600 leading-relaxed text-base">{service.desc}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [valuesRef, valuesInView] = useInView();
  const [aboutRef, aboutInView] = useInView();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'values', label: 'Our Values' },
    { id: 'services', label: 'Our Services' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
<div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
  <div className="flex items-center space-x-3">
    <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-lg">
      <Image
        src="/images/mp logo3.jpg"
        alt="Multipoint Advisory Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
    <div>
      <h1 className={`text-xl font-black tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
        MULTIPOINT
      </h1>
      <p className={`text-xs uppercase tracking-widest transition-colors duration-300 ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`}>
        Advisory
      </p>
    </div>
  </div>
</div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.id
                      ? isScrolled ? 'text-blue-900 bg-blue-50' : 'text-white bg-white/20'
                      : isScrolled ? 'text-slate-700 hover:text-blue-900 hover:bg-slate-100' : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 transform transition-all duration-300 ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 transition-all duration-300 ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 transform transition-all duration-300 ${isScrolled ? 'bg-slate-900' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-1 pt-2 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 rounded-lg text-left font-semibold transition-all ${
                    activeSection === item.id ? 'text-blue-900 bg-blue-50' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px),
                              repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px)`,
          }}></div>
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 70%)' }}>
          </div>
          {/* Red accent blob */}
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #dc2626, transparent 70%)', transform: 'translate(30%, 30%)' }}>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="animate-hero-in">
            {/* Logo mark */}
            <div className="mb-10 flex justify-center">
  <div className="relative w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-black/40">
    <div className="relative w-20 h-20">
      <Image
        src="/images/mp logo3.jpg"
        alt="Multipoint Advisory Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
    <div className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-ping-slow"></div>
  </div>
</div>

            <p className="text-red-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-fade-delay-1">
              Corporate Profile
            </p>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05] animate-fade-delay-2">
              MULTIPOINT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-400">
                ADVISORY
              </span>
            </h1>

            <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8 animate-fade-delay-3"></div>

            <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto font-light leading-relaxed animate-fade-delay-3">
              Integrated Solutions Across Infrastructure, Digital Transformation,<br className="hidden md:block" /> and Sustainable Development
            </p>

            <p className="text-base text-slate-400 mb-14 max-w-xl mx-auto animate-fade-delay-4">
              Empowering governments, development partners, and private sector clients with strategic depth and technical expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-delay-4">
              <button
                onClick={() => scrollToSection('about')}
                className="group px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Discover Our Expertise
                <span className="ml-2 inline-block group-hover:translate-x-1.5 transition-transform">→</span>
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="group px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 md:grid-cols-3 divide-x divide-white/20">
            {[
              { label: 'Sectors Served', value: '5+' },
              { label: 'Advisory Domains', value: '10+' },
              { label: 'Client Focus', value: '360°' },
            ].map(stat => (
              <div key={stat.label} className="text-center px-4 py-1">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 border border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ── About Us ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div ref={aboutRef} className="mb-16 text-center"
            style={{ opacity: aboutInView ? 1 : 0, transform: aboutInView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <span className="inline-block px-5 py-2 bg-blue-900 text-white rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">About Us</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-red-600 mx-auto rounded-full"></div>
          </div>

          {/* Vision / Mission / Philosophy cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                tag: 'VISION',
                color: 'bg-blue-900',
                text: 'We envision a future where organizations receive consistent, credible, and adaptable advice that aligns with their organizational goals, empowering them to make bold, informed and sustainable decisions.',
                icon: '🔭',
              },
              {
                tag: 'MISSION',
                color: 'bg-red-600',
                text: 'To deliver services across multiple sectors through a multidisciplinary team of experts committed to excellence and impact.',
                icon: '🚀',
              },
              {
                tag: 'PHILOSOPHY',
                color: 'bg-slate-800',
                text: 'We believe in partnering with our clients to offer expert guidance, innovative solutions and empowering growth. Every engagement is built on trust, collaboration and a shared commitment to success.',
                icon: '🤝',
              },
            ].map((item, i) => (
              <div key={item.tag}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-shadow duration-300 group"
                style={{ animation: `fadeInUp 0.6s ease ${i * 0.15}s both` }}>
                <div className={`inline-flex items-center gap-2 ${item.color} text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4`}>
                  <span>{item.icon}</span>
                  {item.tag}
                </div>
                <p className="text-slate-700 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
            <div className="space-y-5">
              <p className="text-lg text-slate-700 leading-relaxed">
                We are a <strong className="text-blue-900">multidisciplinary advisory firm</strong> providing integrated solutions across infrastructure, digital transformation, research, climate change, and public sector development.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our work supports governments, development partners, and private sector clients in navigating complex projects that require <strong className="text-blue-900">technical depth, strategic insight, and long-term sustainability</strong>.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Our team brings together expertise in infrastructure development, information technology, finance, policy analysis, data and research, and climate and sustainability advisory. This cross-sector flexibility allows us to deliver practical, evidence-based advice that is responsive to evolving economic, technological, and environmental challenges.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                We adopt a holistic perspective—combining strategic advisory, technical analysis, and institutional strengthening—to support impactful development, decision-making, and implementation.
              </p>

              {/* Expertise tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Infrastructure', 'Digital Transformation', 'Climate & ESG', 'Policy Advisory', 'Research & Analytics', 'Public Sector'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-800 text-xs font-semibold rounded-full border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image block */}
            <div className="relative">
              <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                <Image
                  src="/images/mp aboutus.jpg"
                  alt="Multipoint Advisory Team"
                  fill
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-sm">A multidisciplinary team committed to impact</p>
                </div>
              </div>
              {/* Floating accent cards */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-xl p-4 shadow-xl border border-slate-100 hidden md:block">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Founded in</p>
                <p className="text-2xl font-black text-blue-900">Nairobi</p>
                <p className="text-xs text-slate-500">Kenya</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 shadow-xl hidden md:block">
                <p className="text-xs text-blue-200 uppercase tracking-wider mb-1">Our Reach</p>
                <p className="text-2xl font-black text-white">Multi-</p>
                <p className="text-sm text-blue-200 font-medium">sectoral</p>
              </div>
            </div>
          </div>

          {/* Port / Infrastructure hero image */}
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/mp hero.jpg"
              alt="Infrastructure & Port Development"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center px-10 md:px-16">
              <div className="max-w-md">
                <p className="text-blue-200 text-xs uppercase tracking-widest mb-2 font-semibold">Our Commitment</p>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug">
                  Objective, high-quality advisory that creates measurable impact.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ─────────────────────────────────────────────────────── */}
      <section id="values" className="py-28 bg-slate-50 relative overflow-hidden">
        {/* Background geometry */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-slate-200 opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-slate-200 opacity-60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div ref={valuesRef} className="mb-16 text-center"
            style={{ opacity: valuesInView ? 1 : 0, transform: valuesInView ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <span className="inline-block px-5 py-2 bg-red-600 text-white rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">Our Values</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-blue-900 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Five core principles that guide every engagement, every recommendation, and every relationship we build.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {VALUES.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>

          {/* Values image with overlay */}
          <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/mp values.jpg"
              alt="Our Team and Values"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-wrap gap-3">
                {VALUES.map(v => (
                  <span key={v.title} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                    {v.icon} {v.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Services ───────────────────────────────────────────────────── */}
      <section id="services" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="inline-block px-5 py-2 bg-blue-900 text-white rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">Our Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-red-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Five integrated service areas designed to address the most complex challenges facing governments, institutions, and businesses today.
            </p>
          </div>

          {/* Service rows */}
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.num} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-5">
  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-white/10">
    <Image
      src="/images/mp logo3.jpg"
      alt="Multipoint Advisory Logo"
      fill
      className="object-contain p-1"
    />
  </div>
  <div>
    <h3 className="font-black text-xl tracking-tight">MULTIPOINT</h3>
    <p className="text-xs text-slate-400 uppercase tracking-widest">Advisory</p>
  </div>
</div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
                A multidisciplinary advisory firm delivering integrated solutions across infrastructure, digital transformation, research, climate, and public sector development.
              </p>
              {/* Expertise dots */}
              <div className="flex flex-wrap gap-2">
                {['Infrastructure', 'Digital', 'Climate', 'Research', 'Public Sector'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded-md border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-slate-300">Navigate</h4>
              <div className="space-y-3">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-slate-400 hover:text-white transition-colors text-sm hover:translate-x-1 transform duration-200"
                  >
                    → {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-5 text-sm uppercase tracking-widest text-slate-300">Contact</h4>
              <div className="space-y-3 text-slate-400 text-sm">
                <div>
                  <p className="text-slate-300 font-semibold">Pinetree Plaza, 8th Floor</p>
                  <p>Kaburu Drive, Off Ngong Road</p>
                  <p>P.O. Box 633-00200</p>
                  <p className="text-white font-medium">Nairobi, Kenya</p>
                </div>
                <div className="pt-2 space-y-2">
                  <a href="tel:+254114294598" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>📞</span> +254 114 294 598
                  </a>
                  <a href="mailto:info@multipointadvisory.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>✉️</span> info@multipointadvisory.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Multipoint Advisory. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Pinetree Plaza · Nairobi, Kenya
            </p>
          </div>
        </div>
      </footer>

      {/* ── Global Styles ───────────────────────────────────────────────────── */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-in { animation: heroIn 1s ease both; }

        @keyframes fadeDelay1 {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-delay-1 { animation: fadeDelay1 0.8s ease 0.2s both; }
        .animate-fade-delay-2 { animation: fadeDelay1 0.8s ease 0.35s both; }
        .animate-fade-delay-3 { animation: fadeDelay1 0.8s ease 0.5s both; }
        .animate-fade-delay-4 { animation: fadeDelay1 0.8s ease 0.65s both; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pingSlow {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .animate-ping-slow { animation: pingSlow 2.5s ease-out infinite; }
      `}</style>
    </div>
  );
}