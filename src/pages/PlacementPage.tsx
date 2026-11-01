import React, { useState } from 'react';
import { PLACED_STUDENTS, HIRING_PARTNERS, ACADEMY_INFO } from '../data/academyData';
import { AnimatedContent } from '../components/AnimatedContent';
import { StudentHoloCard } from '../components/StudentHoloCard';
import { PillButton } from '../components/PillButton';
import { InvestmentSection } from '../components/InvestmentSection';

interface PlacementPageProps {
  onOpenEnrol: () => void;
  onOpenBrochure: () => void;
}

export const PlacementPage: React.FC<PlacementPageProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Photography' | 'Videography' | 'Editing' | 'Design'>('All');

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
          <div className="text-6xl sm:text-7xl font-black text-black tracking-tighter leading-none">
            {ACADEMY_INFO.stats.studentsPlaced}
          </div>
          <div className="eye text-neutral-600 mt-4">
            Students Placed in Industry
          </div>
        </div>

        <div className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between shadow-md">
          <div className="text-6xl sm:text-7xl font-black text-black tracking-tighter leading-none">
            {ACADEMY_INFO.stats.hiringPartners}
          </div>
          <div className="eye text-neutral-600 mt-4">
            Studio & Production Partners
          </div>
        </div>

        <div className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between shadow-md">
          <div className="text-6xl sm:text-7xl font-black text-black tracking-tighter leading-none">
            {ACADEMY_INFO.stats.placementRate}
          </div>
          <div className="eye text-neutral-600 mt-4">
            Direct Career Placement Rate
          </div>
        </div>
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
    </div>
  );
};
