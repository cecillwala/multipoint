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
      { threshold: 0.12, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROGRAMMES = [
  {
    num: '01',
    title: 'Infrastructure & Engineering Programmes',
    desc: 'These programmes focus on the planning, development, delivery, and management of infrastructure projects. They are designed for engineers, project sponsors, regulators, and implementing agencies and cover areas such as infrastructure planning, design coordination, construction oversight, asset management, and sustainable infrastructure development.',
    img: '/images/training p1.jpg',
    icon: '🏗️',
    tags: ['Infrastructure Planning', 'Design Coordination', 'Construction Oversight', 'Asset Management'],
    color: 'from-blue-900 to-blue-700',
  },
  {
    num: '02',
    title: 'Project Management & Delivery',
    desc: 'This category equips professionals with practical tools for effective project planning, execution, monitoring, and control. Training covers project lifecycle management, risk and cost control, scheduling, quality assurance, stakeholder engagement, and performance reporting, with applications across public and private sector projects.',
    img: '/images/training p2.jpg',
    icon: '📊',
    tags: ['Project Lifecycle Management', 'Risk & Cost Control', 'Quality Assurance', 'Stakeholder Engagement'],
    color: 'from-red-700 to-red-500',
  },
  {
    num: '03',
    title: 'Public–Private Partnerships (PPP) & Infrastructure Finance',
    desc: 'Our PPP programmes build capacity in the structuring, procurement, financing, and management of PPP projects. Topics include PPP frameworks, project preparation, financial modelling, risk allocation, contract management, and governance of concession arrangements.',
    img: '/images/training p3.jpg',
    icon: '🤝',
    tags: ['PPP Frameworks', 'Financial Modelling', 'Risk Allocation', 'Contract Management'],
    color: 'from-slate-800 to-slate-600',
  },
  {
    num: '04',
    title: 'Corporate Governance, Leadership & Compliance',
    desc: 'These programmes strengthen governance and leadership capacity at board and senior management levels. They address corporate governance frameworks, board effectiveness, ethics and integrity, regulatory compliance, internal controls, fiduciary responsibilities, and organisational accountability.',
    img: '/images/training p4.jpg',
    icon: '⚖️',
    tags: ['Governance Frameworks', 'Board Effectiveness', 'Regulatory Compliance', 'Internal Controls'],
    color: 'from-blue-800 to-blue-600',
  },
  {
    num: '05',
    title: 'Environmental, Social & Governance (ESG) & Sustainability',
    desc: 'Our ESG programmes support organisations in integrating sustainability into strategy and operations. Training covers ESG risk management, sustainability reporting, climate and social safeguards, responsible investment, stakeholder engagement, and alignment with international ESG standards and frameworks.',
    img: '/images/training p5.jpg',
    icon: '🌿',
    tags: ['ESG Risk Management', 'Sustainability Reporting', 'Climate Safeguards', 'Responsible Investment'],
    color: 'from-emerald-800 to-emerald-600',
  },
  {
    num: '06',
    title: 'Business Management & Administration',
    desc: 'This category focuses on core management and operational skills required for effective organisational performance. Programmes include strategic management, financial and operational planning, human resource management, performance management, and organisational development.',
    img: '/images/training p6.jpg',
    icon: '💼',
    tags: ['Strategic Management', 'HR Management', 'Financial Planning', 'Organisational Development'],
    color: 'from-orange-700 to-orange-500',
  },
  {
    num: '07',
    title: 'Administration, Secretarial & Records Management',
    desc: 'These programmes enhance professional administrative capability and institutional efficiency. Training covers office administration, executive and board secretarial practice, records and information management, document control, compliance, and governance support functions.',
    img: '/images/training p7.jpg',
    icon: '📋',
    tags: ['Office Administration', 'Board Secretarial Practice', 'Records Management', 'Document Control'],
    color: 'from-slate-700 to-slate-500',
  },
  {
    num: '08',
    title: 'Information Technology & Digital Skills',
    desc: 'Our IT programmes build digital competence to support modern organisational operations. Training areas include information systems management, digital transformation, data management, cybersecurity awareness, office productivity tools, and the effective use of technology in administration and project delivery.',
    img: '/images/training p8.jpg',
    icon: '💻',
    tags: ['Information Systems', 'Digital Transformation', 'Cybersecurity Awareness', 'Data Management'],
    color: 'from-blue-700 to-cyan-600',
  },
];

const STATS = [
  { value: '8', label: 'Thematic Areas' },
  { value: '50+', label: 'Programme Topics' },
  { value: '2', label: 'Sector Focus' },
  { value: '360°', label: 'Capacity Building' },
];

// ─── Programme Card ───────────────────────────────────────────────────────────
function ProgrammeCard({ programme, index }) {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      id={`prog-${programme.num}`}
      className="group grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-xl mb-10 bg-white"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.7s ease ${(index % 3) * 0.1}s, transform 0.7s ease ${(index % 3) * 0.1}s`,
      }}
    >
      {/* Image — 2/5 width */}
      <div
        className={`relative lg:col-span-2 h-64 lg:h-auto min-h-[280px] bg-slate-200 ${
          isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
        }`}
      >
        <Image
          src={programme.img}
          alt={programme.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${programme.color} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
        {/* Number badge */}
        <div className="absolute top-5 left-5 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-blue-900 font-black text-xs">{programme.num}</span>
        </div>
        {/* Icon */}
        <div className="absolute bottom-5 right-5 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl border border-white/30">
          {programme.icon}
        </div>
      </div>

      {/* Text — 3/5 width */}
      <div
        className={`lg:col-span-3 flex flex-col justify-center p-8 lg:p-10 ${
          isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
        }`}
      >
        {/* Number label */}
        <span className={`inline-block px-3 py-1 bg-gradient-to-r ${programme.color} text-white text-xs font-bold rounded-full mb-4 w-fit tracking-widest uppercase`}>
          Programme {programme.num}
        </span>

        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors duration-300">
          {programme.title}
        </h3>

        <div className="w-10 h-0.5 bg-gradient-to-r from-blue-900 to-red-600 mb-4" />

        <p className="text-slate-600 leading-relaxed text-sm lg:text-base mb-6">
          {programme.desc}
        </p>

        {/* Topic tags */}
        <div className="flex flex-wrap gap-2">
          {programme.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-200 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200 transition-colors duration-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrainingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [aboutRef, aboutInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [programsHeaderRef, programsHeaderInView] = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="/images/training-hero.jpg"
            alt="Multipoint Training Institute"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Deep gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-blue-950/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

        {/* Geometric grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px),
                              repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px)`,
          }}
        />

        {/* Red diagonal accent — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] opacity-15"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #dc2626 40%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">

            {/* Breadcrumb */}
            <div
              className="flex items-center gap-2 text-slate-400 text-sm mb-8"
              style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Training Institute</span>
            </div>
             {/* <div className="relative h-14 w-28 rounded-xl bg-white shadow-md flex items-center justify-center">
                 <div className="relative w-40 h-14">
          <Image
            src="/images/mp training logo.jpg"
            alt="Multipoint Training Institute"
            fill
            className="object-contain"
            priority
          />
        </div>

             </div> */}
              <div className="flex flex-col items-start space-x-3 mb-5">
                          <div className="relative h-10 w-30 bg-white rounded-xl overflow-hidden flex justify-items-start">
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
                                           MULTIPOINT TRAINING INSTITUTE
                                         </h1>
                                         
                                       </div>
                                     </div>
             

            <p
              className="text-red-400 uppercase tracking-[0.3em] text-sm font-semibold mb-5"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease 0.2s' }}
            >
              Capacity Building · Professional Development
            </p>

            <h1
              className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.0]"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease 0.3s' }}
            >
              MULTIPOINT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-red-400">
                TRAINING
              </span>
              <br />
              <span className="text-white">INSTITUTE</span>
            </h1>

            <div
              className="h-px w-28 bg-gradient-to-r from-red-500 to-transparent mb-8"
              style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.7s ease 0.45s' }}
            />

            <p
              className="text-xl text-slate-300 mb-5 leading-relaxed font-light max-w-2xl"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease 0.5s' }}
            >
              A professional training and capacity-building institute dedicated to strengthening
              skills and institutional performance across the public and private sectors.
            </p>

            <p
              className="text-base text-slate-400 mb-12 max-w-xl leading-relaxed"
              style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}
            >
              High-impact training programmes aligned to global best practice, regulatory requirements,
              and emerging market needs.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'all 0.7s ease 0.7s' }}
            >
              <a
                href="#programmes"
                className="group px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Explore Programmes
                <span className="ml-2 inline-block group-hover:translate-x-1.5 transition-transform">↓</span>
              </a>
              <a
                href="mailto:multipointtraininginstitute@gmail.com"
                className="group px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-5 h-8 border border-white/40 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────────── */}
      <div className="bg-blue-900 text-white">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-700"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center px-4 py-2"
              style={{
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'none' : 'translateY(15px)',
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT SECTION ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-70" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div
              ref={aboutRef}
              style={{
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? 'none' : 'translateX(-40px)',
                transition: 'all 0.8s ease',
              }}
            >
              <span className="inline-block px-5 py-2 bg-blue-900 text-white rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
                Who We Are
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                About the<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-600">
                  Training Institute
                </span>
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-900 to-red-600 rounded-full mb-7" />

              <p className="text-lg text-slate-700 leading-relaxed mb-5">
                <strong className="text-blue-900">Multipoint Training Institute</strong> is a professional
                training and capacity-building institute dedicated to strengthening skills and institutional
                performance across the public and private sectors.
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                We design and deliver high-impact training programmes aligned to global best practice,
                regulatory requirements, and emerging market needs — empowering professionals and
                organisations to perform at their highest level.
              </p>

              {/* Vision & Mission cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-900 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🔭</span>
                    <span className="font-bold text-sm uppercase tracking-wider text-blue-200">Vision</span>
                  </div>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    To empower institutions and professionals with skills that drive sustainable
                    infrastructure, strong governance, and lasting impact.
                  </p>
                </div>
                <div className="bg-red-600 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🚀</span>
                    <span className="font-bold text-sm uppercase tracking-wider text-red-200">Mission</span>
                  </div>
                  <p className="text-sm text-red-100 leading-relaxed">
                    To deliver practical, high-quality training that builds capacity, strengthens
                    leadership, and improves organisational performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Image block */}
            <div
              style={{
                opacity: aboutInView ? 1 : 0,
                transform: aboutInView ? 'none' : 'translateX(40px)',
                transition: 'all 0.8s ease 0.2s',
              }}
            >
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                <Image
                  src="/images/training aboutus.jpg"
                  alt="Multipoint Training Institute Building"
                  fill
                  className="object-cover"
                />
                {/* Diagonal overlay — matching brand aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30"
                  style={{ background: 'linear-gradient(135deg, transparent 50%, #dc2626 50%)' }}
                />
                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-sm">Pinetree Plaza, Kaburu Drive — Nairobi</p>
                  <p className="text-blue-200 text-xs mt-0.5">Our training hub in the heart of Nairobi</p>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden lg:block">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Serving</p>
                <p className="text-2xl font-black text-blue-900">Public &</p>
                <p className="text-sm font-bold text-red-600">Private Sectors</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMMES SECTION ───────────────────────────────────────────────── */}
      <section id="programmes" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900" />

        {/* Background geometry */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-slate-200 opacity-50" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-slate-200 opacity-50" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div
            ref={programsHeaderRef}
            className="text-center mb-16"
            style={{
              opacity: programsHeaderInView ? 1 : 0,
              transform: programsHeaderInView ? 'none' : 'translateY(30px)',
              transition: 'all 0.7s ease',
            }}
          >
            <span className="inline-block px-5 py-2 bg-red-600 text-white rounded-full text-xs font-bold mb-5 tracking-widest uppercase">
              Our Programmes
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">
              Key Thematic Areas
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-blue-900 mx-auto rounded-full mb-6" />
            <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
              Our programmes are structured across eight key thematic areas, each designed to
              build targeted expertise and drive measurable impact in your organisation.
            </p>

            {/* Programme quick-jump pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {PROGRAMMES.map((p) => (
                <a
                  key={p.num}
                  href={`#prog-${p.num}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-900 transition-all duration-200 shadow-sm"
                >
                  <span>{p.icon}</span>
                  <span className="font-black text-blue-900">{p.num}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Programme Cards */}
          {PROGRAMMES.map((programme, i) => (
            <ProgrammeCard key={programme.num} programme={programme} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA / CONTACT BANNER ─────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
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
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #dc2626, transparent 70%)', transform: 'translate(-30%, 30%)' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-400 uppercase tracking-widest text-xs font-semibold mb-4">
            Enrol Today
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
            Build the skills that<br />drive lasting impact
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8" />
          <p className="text-slate-400 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you represent a government body, development agency, or private organisation —
            our programmes are tailored to your context, your sector, and your goals.
          </p>

          {/* Contact details */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-3 text-white">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">📞</span>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Call Us</p>
                <a href="tel:+254114294598" className="font-bold hover:text-blue-300 transition-colors">+254 114 294 598</a>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3 text-white">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">✉️</span>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Email Us</p>
                <a href="mailto:multipointtraininginstitute@gmail.com" className="font-bold hover:text-blue-300 transition-colors text-sm">multipointtraininginstitute@gmail.com</a>
              </div>
            </div>
            <div className="w-px h-10 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3 text-white">
              <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">📍</span>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Visit Us</p>
                <p className="font-bold text-sm">Delta Corner Annex, Westlands</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:multipointtraininginstitute@gmail.com"
              className="group px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Enquire About a Programme
              <span className="ml-2 inline-block group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
            <Link
              href="/"
              className="group px-8 py-4 border border-white/30 text-white rounded-xl font-semibold text-base hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              Back to Advisory
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
