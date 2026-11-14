import React, { useState, useEffect } from 'react';
import { ScrollExpand } from './ScrollExpand';
import { CreativeMediaAcademySection } from './CreativeMediaAcademySection';

export const EditorialStorySequence: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full bg-black text-white selection:bg-white selection:text-black">
      {/* =========================================================================
          STAGE 1: CENTER IMAGE REVEAL (React Bits ScrollExpand Component)
          - Starts immediately after About Us lead text
          - Center silhouette photograph inside rounded rectangular frame
          - Headline over image: "LET PASSION DRIVE YOUR PROFESSION"
          - Window scrolling expands frame to full-bleed viewport
          - Image zooms naturally down to scale 1.0
          - Headline smoothly lifts and fades out
          ========================================================================= */}
      <section className="relative w-full bg-black">
        <ScrollExpand
          src="/assets/hero/let-passion-drive-sunset.webp"
          alt="Creative visionary in green meadow at sunset - Let passion drive your profession"
          title={
            <div className="flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-300 mb-3 block opacity-90">
                Lenor Academy
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.02]">
                Let passion drive your profession
              </h2>
            </div>
          }
          startWidth={isMobile ? 82 : 44}
          startHeight={isMobile ? 50 : 56}
          startRadius={isMobile ? 18 : 24}
          endRadius={0}
          mediaZoom={1.28}
          scrollDistance={1.3}
          holdDistance={0.4}
          smoothing={0.03}
          overlayScrim={0}
          useWindowScroll={true}
        />
      </section>

      {/* =========================================================================
          STAGE 2: A CREATIVE MEDIA ACADEMY (MAKKARAPARAMBA CAMPUS & MISSION)
          - Replaces former studio lighting & campus frames with the authentic design
          - Headline: A CREATIVE MEDIA ACADEMY with circular arrows (← / →)
          - Wide rounded campus photograph card with interactive slider
          - Two-column details: OUR MISSION & VISIT US
          ========================================================================= */}
      <CreativeMediaAcademySection />
    </div>
  );
};

export default EditorialStorySequence;
