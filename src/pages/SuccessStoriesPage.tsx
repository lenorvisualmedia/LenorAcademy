import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Instagram, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SUCCESS_STORIES, SuccessStory } from '../data/academyData';
import { AnimatedContent } from '../components/AnimatedContent';
import { PillButton } from '../components/PillButton';
import { InvestmentSection } from '../components/InvestmentSection';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface SuccessStoriesPageProps {
  onOpenEnrol: () => void;
  onOpenBrochure: () => void;
}

export const SuccessStoriesPage: React.FC<SuccessStoriesPageProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const [activeStory, setActiveStory] = useState<SuccessStory | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featuredStory = SUCCESS_STORIES[featuredIndex] || SUCCESS_STORIES[0];

  const handleNext = useCallback(() => {
    setFeaturedIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setFeaturedIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  }, []);

  // Auto-advance loop every 5.5 seconds, pause if hovered or modal open
  useEffect(() => {
    if (isPaused || activeStory !== null) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, activeStory, handleNext]);

  // Preload next image in loop for seamless transitions
  useEffect(() => {
    const nextIdx = (featuredIndex + 1) % SUCCESS_STORIES.length;
    const nextImg = new Image();
    nextImg.src = SUCCESS_STORIES[nextIdx].image;
  }, [featuredIndex]);

  useModalScrollLock(!!activeStory, () => setActiveStory(null));

  return (
    <div className="space-y-12">
      {/* HEADER & FEATURED SUCCESS STORY (Side-by-side design matching reference) */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.8}
        className="px-4 sm:px-10 pt-8 sm:pt-14 pb-4"
      >
        <section>
          {/* Page Heading & Subtitle */}
          <div className="mb-10 sm:mb-14">
            <h1 className="h1 text-5xl sm:text-7xl lg:text-8xl text-white font-black tracking-tight uppercase leading-[0.95]">
              Success Stories
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-light mt-4 max-w-3xl leading-relaxed">
              Different starting points. Different cameras. The same road from first frame to first job.
            </p>
          </div>

          {/* Side-by-side Featured Story Layout (Auto-looping spotlight) */}
          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Left Column: Clean Photograph (No text overlaid) */}
            <div 
              className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 border border-white/10 shadow-2xl group cursor-pointer"
              onClick={() => setActiveStory(featuredStory)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredStory.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: featuredStory.imagePosition || 'center 60%' }}
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-[11px] font-black uppercase tracking-widest text-white border border-white/20">
                      Featured · {featuredStory.category}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column: Featured Story Details with auto-loop controls */}
            <div className="flex flex-col items-start justify-center py-2 sm:py-6 min-h-[300px]">
              <div className="flex items-center justify-between w-full mb-4">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-amber-300">
                    Featured Graduate Spotlight
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-neutral-400 mr-1.5">
                    {String(featuredIndex + 1).padStart(2, '0')} / {String(SUCCESS_STORIES.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous featured story"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next featured story"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredStory.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight leading-tight mb-5">
                    “{featuredStory.quote}”
                  </blockquote>

                  <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-300 uppercase mb-8">
                    {featuredStory.studentName} · {featuredStory.course} · {featuredStory.currentRole} at {featuredStory.currentCompany}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <PillButton
                      variant="primary"
                      size="md"
                      onClick={() => setActiveStory(featuredStory)}
                    >
                      Read The Full Story
                    </PillButton>
                    {featuredStory.instagram && (
                      <a
                        href={featuredStory.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 text-xs font-bold text-neutral-200 hover:border-white hover:text-white hover:bg-white/10 transition-all shadow-sm"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Instagram Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicator pills */}
              <div className="flex items-center gap-1.5 mt-8 w-full flex-wrap">
                {SUCCESS_STORIES.map((story, i) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setFeaturedIndex(i)}
                    aria-label={`Show ${story.studentName}'s story`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === featuredIndex
                        ? 'w-7 sm:w-8 bg-amber-400'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* INDIVIDUAL GRADUATE JOURNEYS (Alternating with AnimatedContent) */}
      <div className="space-y-12 px-2 sm:px-6">
        {SUCCESS_STORIES.map((story, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <AnimatedContent
              key={story.id}
              distance={60}
              direction={isEven ? 'vertical' : 'vertical'}
              duration={0.8}
              threshold={0.15}
            >
              <section className="card !bg-white !text-black border border-neutral-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 sm:p-12 hover:border-black/30 transition-all shadow-xl">
                {/* Image side */}
                <div className={`h-[380px] sm:h-[460px] rounded-2xl overflow-hidden bg-neutral-100 relative ${!isEven ? 'lg:order-2' : ''}`}>
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    className="cover gs hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: story.imagePosition || 'center 20%' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/90 text-[11px] font-black uppercase tracking-widest text-white border border-white/20">
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Story content */}
                <div className={`flex flex-col justify-between gap-6 ${!isEven ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="eye text-neutral-600">{story.course} · {story.batch}</div>
                    <h3 className="h1 text-4xl sm:text-5xl text-black mt-2">
                      {story.studentName}
                    </h3>

                    <blockquote className="text-xl sm:text-2xl text-neutral-900 font-light mt-6 leading-relaxed italic border-l-2 border-black pl-4">
                      "{story.quote}"
                    </blockquote>

                    {story.detailedStory && (
                      <p className="text-xs sm:text-sm text-neutral-700 font-light mt-4 leading-relaxed">
                        {story.detailedStory}
                      </p>
                    )}
                  </div>

                  {/* Structured Path Box */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-xs">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Joined
                      </div>
                      <div className="font-extrabold text-sm text-black mt-0.5">
                        {story.joinedYear}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Learned
                      </div>
                      <div className="font-medium text-xs text-neutral-800 mt-0.5 line-clamp-2">
                        {story.learnedModule}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Now
                      </div>
                      <div className="font-extrabold text-xs text-emerald-800 mt-0.5">
                        {story.currentRole}
                      </div>
                      <div className="text-[10px] text-neutral-600">{story.currentCompany}</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <button
                      onClick={onOpenEnrol}
                      className="btn ghost !h-10 !px-5 text-xs font-bold !border-black/30 !text-black hover:!bg-black/5"
                    >
                      Start Similar Journey
                    </button>
                    {story.instagram && (
                      <a
                        href={story.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-xs font-bold text-neutral-800 hover:border-black hover:bg-neutral-50 transition-all shadow-sm"
                      >
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        <span>Instagram Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </AnimatedContent>
          );
        })}
      </div>

      {/* BOTTOM CTA: START YOUR STORY */}
      <AnimatedContent
        distance={50}
        scale={0.98}
        duration={0.8}
        threshold={0.15}
      >
        <section className="card p-8 sm:p-14 bg-white text-black mt-16 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="text-xs font-extrabold uppercase tracking-widest text-neutral-600 mb-2">
              Next Batch Starts Soon
            </div>
            <h3 className="h1 text-4xl sm:text-6xl text-black leading-tight">
              Write your own story at Lenor
            </h3>
            <p className="text-sm text-neutral-700 font-light mt-3 leading-relaxed">
              In one year, you could be tracking cinematic vehicles, editing national brand spots, or running your own profitable studio in Kerala.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenEnrol}
              className="btn btn-dark !bg-black !text-white hover:!bg-neutral-800 !h-12 !px-8 text-xs font-extrabold tracking-wider whitespace-nowrap shadow-md"
            >
              <span className="!text-white">Apply For Admissions</span>
            </button>
            <button
              onClick={onOpenBrochure}
              className="btn ghost !border-black !text-black hover:!bg-black hover:!text-white !h-12 !px-6 text-xs whitespace-nowrap"
            >
              Download Prospectus
            </button>
          </div>
        </section>
      </AnimatedContent>

      {/* THE INVESTMENT & PROGRAMMES SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />

      {/* DETAIL MODAL IF CLICKED */}
      {activeStory && typeof document !== 'undefined' && createPortal(
        <div 
          data-lenor-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveStory(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div 
            className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain minimal-scrollbar"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="eye text-neutral-600 mb-1">{activeStory.course} · {activeStory.batch}</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mb-3">{activeStory.studentName}</h3>
            <div className="h-48 sm:h-56 rounded-2xl overflow-hidden mb-4 bg-neutral-100">
              <img
                src={activeStory.image}
                alt={activeStory.imageAlt}
                className="cover gs"
                style={{ objectPosition: activeStory.imagePosition || 'center 20%' }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <blockquote className="text-base sm:text-lg text-neutral-800 font-light italic mb-3">
              "{activeStory.quote}"
            </blockquote>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-5">
              {activeStory.detailedStory}
            </p>
            {activeStory.instagram && (
              <a
                href={activeStory.instagram}
                target="_blank"
                rel="noreferrer"
                className="mb-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutral-300 text-xs font-bold text-neutral-800 hover:border-black hover:bg-neutral-50 transition-all shadow-sm w-full justify-center"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>View Instagram Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            )}
            <button onClick={() => setActiveStory(null)} className="btn w-full !h-10 text-xs bg-black text-white hover:bg-neutral-800">
              Close Profile
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
