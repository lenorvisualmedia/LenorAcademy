import React, { useState } from 'react';
import { Briefcase, ShieldCheck, Globe, Award, TrendingUp, CheckCircle2, Laptop, Maximize2 } from 'lucide-react';
import { PLACED_STUDENTS, HIRING_PARTNERS, ACADEMY_INFO } from '../data/academyData';
import { AnimatedContent } from '../components/AnimatedContent';
import { StudentHoloCard } from '../components/StudentHoloCard';
import { PillButton } from '../components/PillButton';
import { InvestmentSection } from '../components/InvestmentSection';
import { CertificateModal, CertificateData } from '../components/CertificateModal';

const CERTIFICATES: CertificateData[] = [
  {
    title: 'MESC & NSDC Skill India Accredited Certificate',
    subtitle: 'Media & Entertainment Skills Council under National Skill Development Corporation',
    issuer: 'Media & Entertainment Skills Council (MESC) · Skill India · NSDC',
    signatory: 'Dr. Shankar Mahadevan (Chairman, MESC)',
    badge: 'Government Accredited',
    image: '/assets/mesc-nsdc-certificate.jpg'
  },
  {
    title: 'ISO 9001:2015 & HRDS Skill India Certificate',
    subtitle: 'Human Resources Development Society & ISO 9001:2015 Certified Institute',
    issuer: 'Lenor Academy · HRDS · Skill India',
    signatory: 'Sisir Ghosh P (Academic Director, Lenor Academy)',
    badge: 'ISO 9001:2015 Certified',
    image: '/assets/iso-hrds-certificate.jpg'
  }
];

interface PlacementPageProps {
  onOpenEnrol: () => void;
  onOpenBrochure: () => void;
}

export const PlacementPage: React.FC<PlacementPageProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Photography' | 'Videography' | 'Editing' | 'Design'>('All');
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

  const filteredStudents = activeFilter === 'All'
    ? PLACED_STUDENTS
    : PLACED_STUDENTS.filter(s => s.category === activeFilter);

  return (
    <div className="space-y-12">
      {/* HERO SECTION: SIDE-BY-SIDE EDITORIAL DESIGN (NO OVERLAID TEXT) */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.85}
        ease="power3.out"
        className="pt-4 sm:pt-8 px-4 sm:px-6"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Column: Clean Convocation Photograph */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 border border-white/10 shadow-2xl group">
            <img
              src="/assets/179f0e839c946970e2d9cfc3d4064f35.webp"
              alt="Lenor Academy graduating convocation batch"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Editorial Placement Details & Outline Pill CTA */}
          <div className="flex flex-col items-start justify-center py-2 sm:py-6">
            <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94]">
              Stop 07 · Get Placed
            </div>

            <h1 className="h1 text-6xl sm:text-7xl lg:text-8xl text-white font-black tracking-tight uppercase leading-[0.95] mt-4 mb-4">
              Placement
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 max-w-md">
              Every student leaves with a portfolio, a pitch and a place to start.
            </p>

            <PillButton
              variant="ghost"
              size="md"
              onClick={() => {
                const el = document.getElementById('directory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="!border-white !text-white"
            >
              Meet The Students
            </PillButton>
          </div>
        </section>
      </AnimatedContent>

      {/* THREE LIVE STAT METRICS */}
      <AnimatedContent
        distance={50}
        duration={0.8}
        stagger={0.12}
        threshold={0.15}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between shadow-md">
          <div className="text-5xl sm:text-6xl font-black text-black tracking-tighter leading-none">
            {ACADEMY_INFO.stats.studentsPlaced}
          </div>
          <div className="eye text-neutral-600 mt-4">
            Alumni Working in Media & Cinema
          </div>
        </div>

        <div className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between shadow-md">
          <div className="text-5xl sm:text-6xl font-black text-black tracking-tighter leading-none">
            {ACADEMY_INFO.stats.hiringPartners}
          </div>
          <div className="eye text-neutral-600 mt-4">
            Studio, Agency & Post Partners
          </div>
        </div>

        <div className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between shadow-md">
          <div className="text-4xl sm:text-5xl font-black text-black tracking-tighter leading-tight">
            100% Assurance
          </div>
          <div className="eye text-neutral-600 mt-4">
            For 1-Year Media Master (Plus Two)
          </div>
        </div>
      </AnimatedContent>

      {/* PLACEMENT ASSURANCE VS ASSISTANCE ARCHITECTURE */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94]">
                The Lenor Career Framework
              </div>
              <h2 className="h1 text-3xl sm:text-5xl text-white font-black tracking-tight mt-2">
                Placement Assurance & Alumni Network
              </h2>
            </div>
            <p className="text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Transparent career pathways with daily hiring inquiries, Gulf placements, and compensation built on real portfolio quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Box 1: 100% Placement Assurance */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">100% Placement Assurance</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Students graduating from the 1-Year Media Master Programme with a Plus Two qualification receive guaranteed placement support to secure a professional role within 6 months of course completion.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] font-mono text-emerald-400">
                ✓ Plus Two Graduates · 1-Year MMP
              </div>
            </div>

            {/* Box 2: Active WhatsApp Hiring Network */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">5–6 Daily Hiring Inquiries</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Our private Lenor Alumni WhatsApp Group receives 5 to 6 verified job vacancies every single day from ad agencies, wedding studios, and production houses across Kerala, Dubai, Saudi Arabia, and UAE.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] font-mono text-blue-400">
                ✓ Direct Employer Vacancies & CV Forwarding
              </div>
            </div>

            {/* Box 3: Starting Salary Reality */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">₹15,000 to ₹80,000+ / mo</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Salaries are dictated by output quality and portfolio strength. While baseline starters begin at ₹15,000, exceptional students with standout commercial portfolios have achieved first salaries of ₹80,000/month.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] font-mono text-amber-400">
                ✓ Portfolio-Driven Industry Valuations
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* ANIMATED HIRING PARTNERS TICKER */}
      <AnimatedContent
        distance={30}
        duration={0.7}
        threshold={0.1}
      >
        <div className="relative w-full overflow-hidden border-y border-[#262626] py-4 bg-[#101010]">
          <div className="animate-marquee flex items-center gap-8">
            <span className="font-extrabold text-xs uppercase tracking-widest text-neutral-400 px-4">
              Hiring Partners Network:
            </span>
            {HIRING_PARTNERS.concat(HIRING_PARTNERS).map((partner, idx) => (
              <React.Fragment key={idx}>
                <span className="text-sm font-bold text-neutral-200 tracking-wider uppercase whitespace-nowrap">
                  {partner}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedContent>

      {/* PLACED STUDENTS DIRECTORY WITH HOLOGRAPHIC CARDS */}
      <section id="directory" className="px-4 sm:px-8 pt-8">
        <AnimatedContent
          distance={40}
          duration={0.75}
          threshold={0.15}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#262626]"
        >
          <div>
            <div className="eye text-neutral-400">Directory · Holographic Credentials</div>
            <h2 className="h1 text-4xl sm:text-6xl text-white mt-1">
              Placed students
            </h2>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Photography', 'Videography', 'Editing', 'Design'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`chip cursor-pointer ${activeFilter === filter ? 'on' : ''}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedContent>

        {/* Holographic Cards Grid */}
        <AnimatedContent
          distance={50}
          duration={0.75}
          stagger={0.08}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        >
          {filteredStudents.map((student) => (
            <StudentHoloCard key={student.id} student={student} />
          ))}
        </AnimatedContent>
      </section>

      {/* STUDENT KIT & ZERO GEAR EXPENSE CHECKLIST */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-emerald-400">
                Equipment Policy · 100% Provided by Academy
              </div>
              <h2 className="h1 text-2xl sm:text-4xl text-white font-black tracking-tight mt-1">
                What you need to bring vs what we provide
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              You do not need to buy expensive cameras, cinema rigs, or computers to study here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Left: What Academy Provides */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fully Provided by Lenor Academy (Zero Fee)</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Cinema & Mirrorless:</strong> RED Epic, Sony M3/M4/M5/S3, Sony A6400, ZV-E10, Nikon ZR, Z6 III, Z5 II.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Gimbals & Stabilization:</strong> DJI RS5, RS4, RS4 Mini, RS3, Zhiyun Crane 2, and Hoverboard rigs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Drones & Aerial:</strong> DJI Mini 5 Pro, DJI Neo 2, plus dedicated Drone Simulator Lab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Post-Production:</strong> Dedicated high-end editing workstations (1 PC per student during edit sessions).</span>
                </li>
              </ul>
            </div>

            {/* Right: The 3 Personal Essentials to Bring */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-3 flex items-center gap-1.5">
                <Laptop className="w-4 h-4" />
                <span>Only 3 Personal Items You Need to Bring</span>
              </div>
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white">High-Speed SSD or External Hard Drive:</strong>
                    <div className="text-neutral-400 text-xs mt-0.5">To store, back up, and take home raw camera footage and project files.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-white">Reusable Handling Gloves:</strong>
                    <div className="text-neutral-400 text-xs mt-0.5">To protect high-end camera bodies and lenses from hand sweat during long shoots.</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white">Personal Wired Headset:</strong>
                    <div className="text-neutral-400 text-xs mt-0.5">For personal hygiene and accurate sound design during 2–3 hour editing lab sessions.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* GOVERNMENT ACCREDITATION & CERTIFICATION SHOWCASE */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-amber-300">
                Official Accreditations &amp; Credentials
              </div>
              <h2 className="h1 text-2xl sm:text-4xl text-white font-black tracking-tight mt-1">
                Government Recognized Certifications
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md leading-relaxed">
              Lenor graduates receive nationally recognized qualifications accredited under MESC, NSDC, Skill India, and ISO 9001:2015 standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {CERTIFICATES.map((cert, i) => (
              <div
                key={i}
                onClick={() => setSelectedCert(cert)}
                className="group p-5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono font-bold uppercase">
                      {cert.badge}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to view</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                    {cert.subtitle}
                  </p>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden aspect-[16/11] bg-black border border-white/5 relative">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-mono text-neutral-300">
                      Signed by: {cert.signatory}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* CTA FOR STUDIOS / AGENCIES */}
      <AnimatedContent
        distance={50}
        scale={0.98}
        duration={0.8}
        threshold={0.15}
      >
        <section className="card p-8 sm:p-12 bg-white text-black mt-16 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-neutral-600 mb-2">
              Industry Recruiters
            </div>
            <h3 className="h1 text-3xl sm:text-5xl text-black leading-tight">
              Hire certified creative talent from Lenor
            </h3>
            <p className="text-sm text-neutral-700 font-light mt-3 leading-relaxed">
              Need photographers, wedding cinematographers, high-speed editors, or motion artists ready to hit the studio floor from day one? Get in touch with our placement cell.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <PillButton
              variant="dark"
              size="md"
              href={`tel:${ACADEMY_INFO.phone}`}
            >
              Call Placement Cell
            </PillButton>
            <PillButton
              variant="ghost"
              size="md"
              onClick={onOpenBrochure}
              className="!border-black/30 !text-black hover:!border-black"
            >
              Download Hire Guide
            </PillButton>
          </div>
        </section>
      </AnimatedContent>

      {/* THE INVESTMENT & PROGRAMMES SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />

      {/* Lightbox Modal for Certificate Zoom Inspection */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
