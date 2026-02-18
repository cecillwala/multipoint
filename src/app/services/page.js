'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
      },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    title: 'Infrastructure & Urban Development',
    desc: 'We provide integrated advisory services across the full infrastructure lifecycle, supporting governments and private sector players in the planning, structuring, financing, and delivery of resilient infrastructure. Our approach combines technical, financial, digital, and climate considerations to ensure projects are sustainable, bankable, and aligned with long-term development objectives.',
    img: '/images/mp service1.jpg',
    alt: 'Infrastructure & Urban Development',
    tag: 'Planning · Finance · Delivery',
    icon: '🏗️',
    highlights: ['Project Structuring', 'Infrastructure Finance', 'Urban Planning', 'Climate Resilience'],
  },
  {
    num: '02',
    title: 'Digital Transformation & IT Services',
    desc: 'We support organizations in leveraging technology to improve efficiency, transparency, and service delivery. Our services span IT strategy, digital infrastructure, data analytics, and systems advisory, underpinned by applied research and innovation to enable secure, scalable, and future-ready digital solutions.',
    img: '/images/mp service2.jpg',
    alt: 'Digital Transformation',
    tag: 'IT Strategy · Data Analytics · Innovation',
    icon: '💻',
    highlights: ['IT Strategy', 'Digital Infrastructure', 'Data Analytics', 'Systems Advisory'],
  },
  {
    num: '03',
    title: 'Climate Change, Energy & Sustainability',
    desc: 'We advise on climate risk, clean energy transitions, and sustainability strategies that align with international frameworks and local contexts. Our work helps clients integrate ESG considerations, access green finance, and build resilient operations in a changing climate landscape.',
    img: '/images/mp service3.jpg',
    alt: 'Climate & Sustainability',
    tag: 'ESG · Green Finance · Resilience',
    icon: '🌿',
    highlights: ['Climate Risk Advisory', 'Clean Energy Transition', 'ESG Integration', 'Green Finance'],
  },
  {
    num: '04',
    title: 'Research, Policy & Development Advisory',
    desc: 'We deliver evidence-based research and policy advisory to inform decision-making at national, regional, and institutional levels. Our services include sector studies, impact assessments, feasibility analysis, and data analytics, bridging research with practical implementation across infrastructure, technology, and climate-related initiatives.',
    img: '/images/mp service4.jpg',
    alt: 'Research & Policy Advisory',
    tag: 'Research · Policy · Analytics',
    icon: '🔬',
    highlights: ['Sector Studies', 'Impact Assessments', 'Feasibility Analysis', 'Policy Design'],
  },
  {
    num: '05',
    title: 'Public Sector & Institutional Advisory',
    desc: 'We partner with public institutions, development agencies, and corporates to strengthen governance, institutional capacity, and project delivery. Our multidisciplinary advisory integrates infrastructure development, digital systems, research, and climate considerations to enhance accountability, performance, and long-term public value.',
    img: '/images/mp service5.jpg',
    alt: 'Public Sector Advisory',
    tag: 'Governance · Capacity · Delivery',
    icon: '🏛️',
    highlights: ['Governance Strengthening', 'Institutional Capacity', 'Project Delivery', 'Public Value'],
  },
];

// ─── Service Card Component ───────────────────────────────────────────────────
function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl mb-10`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
      }}
    >
      {/* Image side */}
      <div
        className={`relative h-72 lg:h-auto min-h-[320px] bg-slate-200 ${
          isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
        }`}
      >
        <Image src={service.img} alt={service.alt} fill className="object-cover" />

        {/* Number overlay */}
        <div className="absolute top-5 left-5 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-blue-900 font-black text-sm">{service.num}</span>
        </div>

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 ${
            isEven ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } from-transparent to-slate-900/20`}
        />
      </div>

      {/* Text side */}
      <div
        className={`bg-white flex flex-col justify-center p-10 ${
          isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
        }`}
      >
        {/* Tag */}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full mb-4 w-fit tracking-wide uppercase">
          {service.tag}
        </span>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{service.title}</h3>

        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-900 to-red-600 mb-5" />

        <p className="text-slate-600 leading-relaxed text-base mb-6">{service.desc}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [headerRef, headerInView] = useInView();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero Banner ── */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px),
                                repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px)`,
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #dc2626, transparent 70%)',
              transform: 'translate(30%, 30%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-12 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Our Services</span>
          </div>

          <p className="text-red-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            What We Do
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Our Services
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-red-500 to-transparent mt-5" />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div
          ref={headerRef}
          className="max-w-6xl mx-auto px-6 lg:px-8 text-center"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Five integrated service areas designed to address the most complex challenges facing
            governments, institutions, and businesses today. Each area draws on our
            multidisciplinary expertise to deliver practical, evidence-based solutions.
          </p>

          {/* Service number pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {SERVICES.map((s) => (
              <a
                key={s.num}
                href={`#service-${s.num}`}
                className="group flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-full text-sm font-medium text-slate-700 hover:text-blue-900 transition-all duration-200"
              >
                <span className="text-base">{s.icon}</span>
                {s.title.split(' ').slice(0, 2).join(' ')}…
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {SERVICES.map((service, i) => (
            <div key={service.num} id={`service-${service.num}`}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-gradient-to-br from-blue-950 to-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-400 uppercase tracking-widest text-xs font-semibold mb-4">
            Ready to Work Together?
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
            Let's deliver meaningful impact for your organisation
          </h2>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8" />
          <p className="text-slate-400 text-base mb-10 max-w-xl mx-auto">
            Whether you're a government, development partner, or private sector client — we bring
            the expertise, agility, and commitment to make your project succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@multipointadvisory.com"
              className="group px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Get in Touch
              <span className="ml-2 inline-block group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
            <Link
              href="/#about"
              className="group px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Global Styles ── */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}