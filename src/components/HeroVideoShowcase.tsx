import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MaskedHeading } from './MaskedHeading';

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoShowcaseProps {
  onScrollDown?: () => void;
  onOpenEnrol?: () => void;
}

export const HeroVideoShowcase: React.FC<HeroVideoShowcaseProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Optimization: instruct browser to pause and prepare at frame 0
    video.pause();
    video.currentTime = 0;

    let duration = 23.766;
    if (video.duration && !isNaN(video.duration)) {
      duration = video.duration;
    }

    const onMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration;
      }
    };
    video.addEventListener('loadedmetadata', onMetadata);

    // High-performance seek dispatcher: prevents decoder backlog & drops
    const performSeek = (time: number) => {
      if (!video) return;
      const clamped = Math.max(0, Math.min(duration - 0.02, time));

      if (!isSeekingRef.current) {
        const vid = video as HTMLVideoElement;
        if (Math.abs(vid.currentTime - clamped) > 0.003) {
          isSeekingRef.current = true;
          if ('fastSeek' in vid && typeof (vid as any).fastSeek === 'function') {
            try {
              (vid as any).fastSeek(clamped);
            } catch {
              vid.currentTime = clamped;
            }
          } else {
            vid.currentTime = clamped;
          }
        }
      }
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      // If user scrolled while the last frame was decoding, catch up immediately
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.004) {
        performSeek(targetTimeRef.current);
      }
    };
    video.addEventListener('seeked', onSeeked);

    // RAF loop ensures continuous synchronization without stutter
    const tick = () => {
      if (!isSeekingRef.current) {
        performSeek(targetTimeRef.current);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      // Main scroll scrub trigger for video
      // scrub: true -> direct 1:1 synchronization with Lenis smooth scroll, eliminates compound inertia lag
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          targetTimeRef.current = self.progress * (video.duration || duration);
        }
      });

      // Smooth heading overlay exit as user begins scrolling
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'top -140px',
        scrub: true,
        onUpdate: (self) => {
          if (overlayRef.current) {
            const p = self.progress;
            const opacity = Math.max(0, 1 - p * 1.4);
            const y = -p * 45;
            const scale = 1 - p * 0.04;
            overlayRef.current.style.opacity = opacity.toFixed(3);
            overlayRef.current.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
            overlayRef.current.style.pointerEvents = opacity > 0.03 ? 'auto' : 'none';
          }
        }
      });
    }, container);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', onSeeked);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full h-[500vh] sm:h-[650vh] bg-black"
    >
      {/* Sticky Fullscreen Viewport — 100vw x 100vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* 60 FPS Fast-Decode Hardware-Accelerated Video */}
        <video
          ref={videoRef}
          src="/hero-scroll-60fps.mp4"
          poster="/assets/hero-poster.webp"
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover block pointer-events-none will-change-[transform]"
        />

        {/* First Frame MaskedHeading Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 select-none bg-black will-change-[opacity,transform]"
          style={{ opacity: 1, pointerEvents: 'auto', backgroundColor: '#000000' }}
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
              Academy of Media &amp; Cinema Arts
            </span>

            <div className="w-full">
              <MaskedHeading
                text="LENOR ACADEMY"
                tag="h1"
                mediaType="image"
                src="/assets/hero-poster.webp"
                fillScale={1.3}
                parallax={30}
                reveal="rise"
                trigger="view"
                spotlight={true}
                spotlightRadius={180}
                outline={true}
                outlineColor="rgba(255, 255, 255, 0.45)"
                outlineWidth={1}
                weight={900}
                tracking={-0.03}
                textScale={0.105}
                className="font-black uppercase tracking-tight drop-shadow-2xl"
              />
            </div>

            <div className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-neutral-300 mt-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/40" />
              <span>Learn What You Love</span>
              <span className="w-8 h-[1px] bg-white/40" />
            </div>

            <div className="mt-8 sm:mt-12 flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-neutral-500 animate-pulse">
              <span>Scroll to explore ↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
