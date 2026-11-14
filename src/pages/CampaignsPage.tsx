import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { AnimatedContent } from '../components/AnimatedContent';
import { PillButton } from '../components/PillButton';
import { InvestmentSection } from '../components/InvestmentSection';

interface CampaignsPageProps {
  onOpenEnrol: (programId?: string) => void;
  onOpenBrochure: () => void;
}

export const CampaignsPage: React.FC<CampaignsPageProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  return (
    <div className="space-y-12">
      {/* HEADER HERO */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.8}
        className="px-4 sm:px-10 pt-8 sm:pt-14 pb-2"
      >
        <section>
          <h1 className="h1 text-6xl sm:text-8xl lg:text-[120px] text-white uppercase font-black leading-[0.9] tracking-tight">
            Campaigns
          </h1>
          <p className="text-base sm:text-2xl text-neutral-300 font-light mt-4 max-w-2xl leading-relaxed">
            Programmes, camps and open days that bring new storytellers through the door.
          </p>
        </section>
      </AnimatedContent>

      {/* ADMISSIONS 2026 FEATURE SECTION: SIDE-BY-SIDE (NO OVERLAID TEXT) */}
      <AnimatedContent
        distance={50}
        duration={0.85}
        threshold={0.1}
        className="px-4 sm:px-10"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Column: Clean Makkaraparamba Campus Photo */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 border border-white/10 shadow-2xl group">
            <img
              src="/assets/campaigns/graduation-exhibition.webp"
              alt="Lenor Academy Makkaraparamba campus building"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Editorial Admissions Details & Pill CTA Buttons */}
          <div className="flex flex-col items-start justify-center py-2 sm:py-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider mb-3">
              Now Open
            </span>

            <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94] mb-2">
              Admissions 2026
            </div>

            <h2 className="h1 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.0] mb-4">
              Let passion drive<br />your profession
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8 max-w-md">
              8 specialized programmes, one academy. From our flagship 1-year Media Master to intensive 6-month, 3-month diplomas and 5-day crash courses.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <PillButton
                variant="primary"
                size="md"
                onClick={() => onOpenEnrol('media-master')}
              >
                Apply Now
              </PillButton>
              <PillButton
                variant="ghost"
                size="md"
                onClick={onOpenBrochure}
                className="!border-white !text-white"
              >
                View Programmes
              </PillButton>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* TICKER */}
      <AnimatedContent distance={20} duration={0.6}>
        <div className="relative w-full overflow-hidden border-y border-[#262626] py-3.5 bg-[#101010]">
          <div className="animate-marquee flex items-center gap-8">
            {[
              'Media Master Programme · 1 Year',
              'Visual Media Production · 6 Months',
              'Media Designing & Editing · 6 Months',
              'Diploma in Graphic Designing · 3 Months',
              'Professional Editing Course · 3 Months',
              'Photography & Videography · 2 Months',
              'Videography Crash Course · 6 Days',
              'Drone Course · 5 Days'
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-xs font-extrabold tracking-widest uppercase text-neutral-400">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedContent>

      {/* CURRENT OUTREACH INITIATIVES */}
      <section className="px-4 sm:px-10 pt-4">
        <AnimatedContent distance={40} duration={0.7} threshold={0.15}>
          <div className="eye text-neutral-400">Initiatives</div>
          <h2 className="h1 text-4xl sm:text-6xl text-white mt-1 mb-8">
            Outreach & special camps
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          duration={0.8}
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Campaign 1: Learn what you love */}
          <article className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between hover:border-black/30 transition-all shadow-md">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-black text-[10px] font-black uppercase tracking-widest mb-6 border border-neutral-300">
                Upcoming
              </span>
              <h3 className="h1 text-3xl text-black leading-tight">
                Learn what you love
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-light mt-4 leading-relaxed">
                Free 1-day media orientation for school & college leavers who want to know how cameras, lights, and editing suites translate into high-paying creative careers.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-600">
                12 Nov 2026
              </span>
              <button
                onClick={() => onOpenEnrol('media-master')}
                className="btn btn-dark !h-9 !px-4 text-xs font-bold !bg-black !text-white hover:!bg-neutral-800 shadow-sm"
              >
                <span className="!text-white">Learn More</span>
              </button>
            </div>
          </article>

          {/* Campaign 2: Personality Building Camp */}
          <article className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between hover:border-black/30 transition-all shadow-md">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-black text-[10px] font-black uppercase tracking-widest mb-6 border border-neutral-300">
                Upcoming
              </span>
              <h3 className="h1 text-3xl text-black leading-tight">
                Personality building camp
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-light mt-4 leading-relaxed">
                Transform from a shy technician into an articulate, confident creative director who commands the room, pitches high-ticket clients, and directs large crews.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-600">
                28 Nov 2026
              </span>
              <button
                onClick={() => onOpenEnrol('media-master')}
                className="btn btn-dark !h-9 !px-4 text-xs font-bold !bg-black !text-white hover:!bg-neutral-800 shadow-sm"
              >
                <span className="!text-white">Learn More</span>
              </button>
            </div>
          </article>

          {/* Campaign 3: Open studio day */}
          <article className="card p-8 !bg-white !text-black border border-neutral-200 flex flex-col justify-between hover:border-black/30 transition-all shadow-md">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-black text-[10px] font-black uppercase tracking-widest mb-6 border border-neutral-300">
                Upcoming
              </span>
              <h3 className="h1 text-3xl text-black leading-tight">
                Open studio day
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-light mt-4 leading-relaxed">
                Step onto our Makkaraparamba studio floor, try out mirrorless cinema rigs, balance a gimbal, and sit down for an informal portfolio evaluation with faculty.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-600">
                20 Dec 2026
              </span>
              <button
                onClick={() => onOpenEnrol('media-master')}
                className="btn btn-dark !h-9 !px-4 text-xs font-bold !bg-black !text-white hover:!bg-neutral-800 shadow-sm"
              >
                <span className="!text-white">Learn More</span>
              </button>
            </div>
          </article>
        </AnimatedContent>
      </section>

      {/* PAST CAMPAIGNS RETROSPECTIVE */}
      <section className="px-4 sm:px-10 pt-10">
        <AnimatedContent distance={40} duration={0.7} threshold={0.15}>
          <div className="eye text-neutral-400">Retrospective</div>
          <h2 className="h1 text-4xl sm:text-6xl text-white mt-1 mb-8">
            Past campaigns
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          duration={0.8}
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card h-[380px] group">
            <img
              src="/assets/campaigns/creative-showcase.webp"
              alt="Studio shoot"
              className="cover gs group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Studio Lighting Blitz · 2025
            </div>
          </div>

          <div className="card h-[380px] group">
            <img
              src="/assets/success/rinshad-k.webp"
              alt="Camera operator"
              className="cover gs group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Cinematography Sprint · 2024
            </div>
          </div>

          <div className="card h-[380px] group">
            <img
              src="/assets/campaigns/billboard-kattadippaadam.webp"
              alt="Gimbal shoot"
              className="cover gs group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Gimbal & Drone Boot Camp · 2024
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* THE INVESTMENT & PROGRAMMES SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />
    </div>
  );
};
