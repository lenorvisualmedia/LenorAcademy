import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
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

          {/* Side-by-side Featured Story Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left Column: Clean Convocation Photograph (No text overlaid) */}
            <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 border border-white/10 shadow-2xl group">
              <img
                src="/assets/c67df096-6056-44dd-afb6-2447b7721e4a.webp"
                alt="Lenor Academy graduating batch in convocation robes"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right Column: Featured Story Details */}
            <div className="flex flex-col items-start justify-center py-2 sm:py-6">
              <div className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 mb-4">
                Featured Story
              </div>

              <blockquote className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight leading-tight mb-5">
                “Lenor took my raw curiosity and gave it the precision, discipline, and speed demanded by commercial directors.”
              </blockquote>

              <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-neutral-400 uppercase mb-8">
                Adil Shan · Media Master Programme · Batch 2024
              </div>

              <PillButton
                variant="primary"
                size="md"
                onClick={() => setActiveStory(SUCCESS_STORIES[0])}
              >
                Read The Full Story
              </PillButton>
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

                  <div className="pt-2">
                    <button
                      onClick={onOpenEnrol}
                      className="btn ghost !h-10 !px-5 text-xs font-bold !border-black/30 !text-black hover:!bg-black/5"
                    >
                      Start Similar Journey
                    </button>
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
              className="btn bg-black text-white hover:bg-neutral-800 !h-12 !px-8 text-xs font-extrabold tracking-wider whitespace-nowrap"
            >
              Apply For Admissions
            </button>
            <button
              onClick={onOpenBrochure}
              className="btn ghost !border-black !text-black hover:!bg-black/10 !h-12 !px-6 text-xs whitespace-nowrap"
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
            className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain"
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
              <img src={activeStory.image} alt={activeStory.imageAlt} className="cover gs" loading="lazy" decoding="async" />
            </div>
            <blockquote className="text-base sm:text-lg text-neutral-800 font-light italic mb-3">
              "{activeStory.quote}"
            </blockquote>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-5">
              {activeStory.detailedStory}
            </p>
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
