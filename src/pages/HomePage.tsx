import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { HeroVideoShowcase } from '../components/HeroVideoShowcase';
import { AnimatedContent } from '../components/AnimatedContent';
import { StudentHoloCard } from '../components/StudentHoloCard';
import { ScrollJourney } from '../components/ScrollJourney';
import { EditorialStorySequence } from '../components/EditorialStorySequence';
import { PillButton } from '../components/PillButton';
import { InvestmentSection } from '../components/InvestmentSection';
import { FAQSection } from '../components/FAQSection';
import { PROGRAMMES, PLACED_STUDENTS } from '../data/academyData';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HomePageProps {
  onOpenEnrol: (programId?: string) => void;
  onOpenBrochure: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [isHeroCompleted, setIsHeroCompleted] = useState(() => {
    return typeof window !== 'undefined' && !!(window as any).__heroVideoCompleted;
  });

  useEffect(() => {
    const onDone = () => {
      setIsHeroCompleted(true);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    const onReset = () => {
      setIsHeroCompleted(false);
    };

    window.addEventListener('lenor-hero-completed', onDone);
    window.addEventListener('lenor-hero-reset', onReset);

    return () => {
      window.removeEventListener('lenor-hero-completed', onDone);
      window.removeEventListener('lenor-hero-reset', onReset);
    };
  }, []);

  const scrollToJourney = () => {
    const el = document.getElementById('journey');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-black">
      {/* FULL SCREEN SCROLL ANIMATED VIDEO (Auto-play on first scroll with scroll-intensity speedup) */}
      <HeroVideoShowcase />

      {/* REST OF HOMEPAGE CONTENT (Strictly accessible only after full video plays or skip is clicked) */}
      <div
        id="main-content"
        className={`max-w-[1440px] mx-auto px-3 sm:px-6 py-12 sm:py-16 space-y-12 sm:space-y-16 transition-all duration-700 ${
          isHeroCompleted
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none h-0 overflow-hidden'
        }`}
      >
        {/* LEAD MISSION STATEMENT */}
      <section className="px-4 sm:px-12 py-10 sm:py-16">
        <AnimatedContent
          distance={50}
          duration={0.8}
          blur={4}
          threshold={0.15}
          once={false}
        >
          <div className="max-w-5xl">
            <div className="eye text-[#8a8a8a] mb-4">About us · Makkaraparamba & Ernakulam</div>
            <p className="lead font-light text-neutral-100 leading-tight">
              We cultivate the next generation of creative visionaries and skilled multimedia professionals. A beacon of excellence in visual arts education, for aspiring photographers, videographers and editors.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-400">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-200">
                📍 Makkaraparamba, Malappuram (North, South & Studio Campuses)
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-200">
                📍 Madavanna, Ernakulam Branch
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-200">
                🎬 Film Review Theatre & Drone Simulator Lab
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-200">
                ✨ 80% Live Practical Drills (Zero Equipment Fee)
              </span>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* IMMERSIVE SCROLL-DRIVEN STORYTELLING & ACADEMY SHOWCASE
          1. Center Image Reveal (React Bits ScrollExpand Component) with "LET PASSION DRIVE YOUR PROFESSION"
          2. A Creative Media Academy (Makkaraparamba Campus architecture, interactive slider, Mission & Visit Us)
      */}
      <EditorialStorySequence />

      {/* DISCIPLINES CRAFTS BAR */}
      <section className="px-4 sm:px-10 py-6 border-b border-[#222]">
        <AnimatedContent
          distance={30}
          duration={0.6}
          threshold={0.1}
          once={false}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
            Disciplines
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              'Photography',
              'Videography',
              'Photo Editing',
              'Video Editing',
              'Graphic Design',
              'Motion Graphics',
              'Soft Skills'
            ].map((craft) => (
              <span key={craft} className="chip">
                {craft}
              </span>
            ))}
          </div>
        </AnimatedContent>
      </section>

      {/* SCROLL-DRIVEN JOURNEY TIMELINE WITH DYNAMIC DRAWING LINE & BIDIRECTIONAL REVEAL */}
      <ScrollJourney />

      {/* STOP 07: PLACEMENT SHOWCASE TEASER WITH HOLOGRAPHIC CARDS */}
      <AnimatedContent distance={50} duration={0.8} threshold={0.1}>
        <section className="card p-6 sm:p-12 !bg-white !text-black mt-16 border border-neutral-200 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
            <div>
              <div className="eye text-neutral-600">Stop 07 · Get placed</div>
              <h2 className="h1 text-4xl sm:text-6xl text-black mt-2">
                Where our<br />students work
              </h2>
            </div>
            <Link
              to="/placement"
              className="btn ghost !h-11 !px-5 text-xs flex items-center gap-2 self-start md:self-auto !border-black/30 !text-black hover:!bg-black/5"
            >
              <span>View All Placements</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Student placement cards preview with HoloCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {PLACED_STUDENTS.slice(0, 3).map((st) => (
              <StudentHoloCard key={st.id} student={st} />
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* STOP 08: SUCCESS STORIES */}
      <AnimatedContent
        distance={50}
        duration={0.8}
        threshold={0.12}
        once={false}
        className="mt-20 px-4 sm:px-6"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Column: Clean Graduate Convocation Photograph (No text overlaid) */}
          <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 border border-white/10 shadow-2xl group">
            <img
              src="/assets/c67df096-6056-44dd-afb6-2447b7721e4a.webp"
              alt="Lenor Academy graduating batch in convocation robes"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right Column: Editorial Details & Read Success Stories Pill Button */}
          <div className="flex flex-col items-start justify-center py-2 sm:py-6">
            <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94]">
              Stop 08 · Success Stories
            </div>

            <h2 className="h1 text-4xl sm:text-5xl lg:text-6xl text-white font-black tracking-tight leading-[1.05] mt-4 mb-6">
              Stories from our<br className="hidden sm:inline" /> graduates
            </h2>

            <blockquote className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-3">
              “Lenor took my hobby and gave it precision, speed, and real commercial value.”
            </blockquote>

            <div className="text-xs sm:text-sm font-bold text-white tracking-wide mb-8">
              Adil Shan · Batch 2024
            </div>

            <PillButton
              to="/success-stories"
              variant="primary"
              size="md"
            >
              Read Success Stories
            </PillButton>
          </div>
        </section>
      </AnimatedContent>

      {/* STOP 09: THE INVESTMENT & ENROLMENT SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />

      {/* FREQUENTLY ASKED QUESTIONS (15 OFFICIAL QUESTIONS & ANSWERS) */}
      <FAQSection
        onOpenEnrol={() => onOpenEnrol('media-master')}
      />
      </div>
    </div>
  );
};
