import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY_STOPS, JourneyStop } from '../data/academyData';
import { AnimatedContent } from './AnimatedContent';

gsap.registerPlugin(ScrollTrigger);

export const ScrollJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackLineRef = useRef<HTMLDivElement | null>(null);
  const glowHeadRef = useRef<HTMLDivElement | null>(null);
  const stopsRef = useRef<(HTMLElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const trackLine = trackLineRef.current;
    if (!container || !trackLine) return;

    const ctx = gsap.context(() => {
      // 1. ANKLE-TO-HEAD SCROLL-DRIVEN TIMELINE LINE
      // Line is initially blank (scaleY: 0).
      // As user scrolls down, line draws down smoothly through the screen.
      // When user scrolls backwards, it shrinks back up and disappears.
      gsap.set(trackLine, { scaleY: 0, transformOrigin: 'top center' });

      // Cache height to eliminate layout thrashing during scroll
      let cachedHeight = container.clientHeight;

      ScrollTrigger.create({
        trigger: container,
        start: 'top 65%',
        end: 'bottom 80%',
        scrub: 0.35, // Fluid scrub that reverses naturally on backward scroll
        onRefresh: () => {
          cachedHeight = container.clientHeight;
        },
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(trackLine, { scaleY: progress });
          
          if (glowHeadRef.current) {
            // Position the glowing tip dot at the current bottom of the line without DOM layout thrashing
            const currentY = progress * cachedHeight;
            gsap.set(glowHeadRef.current, {
              y: currentY,
              opacity: progress > 0.01 && progress < 0.99 ? 1 : 0
            });
          }
        }
      });

      // 2. EACH CHAPTER APPEARS ON SCROLL DOWN, DISAPPEARS ON SCROLL BACKWARDS
      stopsRef.current.forEach((stopEl, idx) => {
        if (!stopEl) return;
        const dotEl = dotsRef.current[idx];

        // Initially hide each stop and set initial offset
        gsap.set(stopEl, {
          opacity: 0,
          y: 60,
          filter: 'blur(6px)',
          visibility: 'visible'
        });

        if (dotEl) {
          gsap.set(dotEl, {
            scale: 0.8,
            backgroundColor: '#1a1a1a',
            borderColor: '#3a3a3a',
            boxShadow: '0 0 0 4px #000000'
          });
        }

        ScrollTrigger.create({
          trigger: stopEl,
          start: 'top 78%',
          end: 'bottom 5%',
          onEnter: () => {
            // Forward scroll: content appears
            gsap.to(stopEl, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              ease: 'power3.out',
              overwrite: 'auto'
            });

            if (dotEl) {
              gsap.to(dotEl, {
                scale: 1.35,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                boxShadow: '0 0 0 6px #000000, 0 0 16px rgba(255, 255, 255, 0.9)',
                duration: 0.5,
                ease: 'back.out(2)',
                overwrite: 'auto'
              });
            }
          },
          onLeave: () => {
            // Forward scroll past top: disappears towards top
            gsap.to(stopEl, {
              opacity: 0,
              y: -40,
              filter: 'blur(4px)',
              duration: 0.5,
              ease: 'power2.in',
              overwrite: 'auto'
            });
          },
          onEnterBack: () => {
            // Backward scroll into view: re-appears
            gsap.to(stopEl, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.75,
              ease: 'power3.out',
              overwrite: 'auto'
            });

            if (dotEl) {
              gsap.to(dotEl, {
                scale: 1.35,
                backgroundColor: '#ffffff',
                borderColor: '#ffffff',
                boxShadow: '0 0 0 6px #000000, 0 0 16px rgba(255, 255, 255, 0.9)',
                duration: 0.4,
                overwrite: 'auto'
              });
            }
          },
          onLeaveBack: () => {
            // Backward scroll out of view: disappears cleanly
            gsap.to(stopEl, {
              opacity: 0,
              y: 60,
              filter: 'blur(6px)',
              duration: 0.6,
              ease: 'power2.in',
              overwrite: 'auto'
            });

            if (dotEl) {
              gsap.to(dotEl, {
                scale: 0.8,
                backgroundColor: '#1a1a1a',
                borderColor: '#3a3a3a',
                boxShadow: '0 0 0 4px #000000',
                duration: 0.4,
                ease: 'power2.in',
                overwrite: 'auto'
              });
            }
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative pt-10">
      {/* SECTION HEADER */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.12}>
        <div id="journey" className="px-4 sm:px-10 pb-12">
          <div className="eye text-[#8a8a8a]">The journey</div>
          <h2 className="h1 text-5xl sm:text-7xl lg:text-8xl text-white mt-4 max-w-4xl leading-[0.92]">
            From first frame to first job
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light mt-4 max-w-2xl leading-relaxed">
            Our curriculum is structured as an unrelenting six-stage progression from raw optics to international post-production standards.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Scroll down to advance timeline · Reverses when scrolling up</span>
          </div>
        </div>
      </AnimatedContent>

      {/* TIMELINE CONTAINER */}
      <div ref={containerRef} className="relative px-4 sm:px-10">
        {/* Static Background Rail (Subtle ghost path) */}
        <div className="absolute left-[24px] lg:left-[150px] top-0 bottom-0 w-[1px] bg-white/10 pointer-events-none" />

        {/* Dynamic Animated Scroll Line (Starts blank, draws down on scroll down, disappears on scroll up) */}
        <div
          ref={trackLineRef}
          className="absolute left-[24px] lg:left-[150px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/40 via-white to-white shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.5)] pointer-events-none z-10"
          style={{ willChange: 'transform' }}
        />

        {/* Leading Tip Glow Bead */}
        <div
          ref={glowHeadRef}
          className="absolute left-[24px] lg:left-[150px] -translate-x-[3px] top-0 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_14px_#fff,0_0_28px_rgba(255,255,255,0.8)] pointer-events-none z-20 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* The 6 Chapters */}
        <div className="space-y-6 sm:space-y-12">
          {JOURNEY_STOPS.map((stop, idx) => (
            <article
              key={stop.stopNumber}
              ref={(el) => (stopsRef.current[idx] = el)}
              className="relative grid grid-cols-1 lg:grid-cols-[120px_minmax(0,1.1fr)_minmax(0,0.9fr)] gap-6 lg:gap-12 py-10 border-t border-[#222] items-center pl-10 lg:pl-0 group"
              style={{ visibility: 'hidden' }}
            >
              {/* Interactive Chapter Dot */}
              <span
                ref={(el) => (dotsRef.current[idx] = el)}
                className="absolute left-[19px] lg:left-[145px] top-12 w-3 h-3 rounded-full border border-neutral-600 bg-neutral-900 transition-colors z-20"
                style={{ willChange: 'transform, background-color, box-shadow' }}
              />

              {/* Stop Number */}
              <div className="num select-none text-5xl lg:text-6xl font-black text-neutral-300 group-hover:text-white transition-colors">
                {stop.stopNumber}
              </div>

              {/* Stop Details */}
              <div>
                <div className="eye text-[#8a8a8a]">{stop.tag}</div>
                <h3 className="h1 text-3xl sm:text-5xl text-white mt-2 tracking-tight">
                  {stop.title}
                </h3>
                <div className="sub text-xl sm:text-2xl text-neutral-300 font-light mt-1">
                  {stop.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light mt-3 leading-relaxed max-w-lg">
                  {stop.description}
                </p>

                {/* Chips */}
                <div className="chips">
                  {stop.chips.map((chip, cIdx) => (
                    <span key={cIdx} className="chip !text-[12px] !py-1 !px-3">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stop Photography Preview */}
              <div className="cimg relative group-hover:scale-[1.02] transition-transform duration-300 rounded-2xl overflow-hidden bg-[#1b1b1b] shadow-xl">
                <img
                  src={stop.image}
                  alt={stop.imageAlt}
                  className="cover gs group-hover:filter-none transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollJourney;

