import React, { useEffect, useRef, useState } from 'react';
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  // Responsive video source: 720p on mobile devices saves 80% payload & GPU memory
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024));
  const videoSrc = isMobile ? '/hero-scroll-720p.mp4' : '/hero-scroll-60fps.mp4';

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // 1. Immediately lock scroll across window, body, and Lenis
    (window as any).__scrollLocked = true;
    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Prevent wheel, touch, and scroll keys while loading
    const blockScroll = (e: Event) => {
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      if (['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    window.addEventListener('keydown', blockKeys, { passive: false });

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

    // RAF loop ensures continuous synchronization without stutter; pauses when off-screen
    const tick = () => {
      if (isVisibleRef.current) {
        if (!isSeekingRef.current) {
          performSeek(targetTimeRef.current);
        }
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        rafIdRef.current = null;
      }
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Pause RAF when hero scrolls completely out of viewport to save GPU & battery
    const io = new IntersectionObserver(
      ([entry]) => {
        const isNowVisible = entry.isIntersecting;
        isVisibleRef.current = isNowVisible;
        if (isNowVisible && !rafIdRef.current) {
          rafIdRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    // Main scroll scrub trigger for video
    let ctx: gsap.Context | null = null;
    const initScrollTrigger = () => {
      ctx = gsap.context(() => {
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
    };

    initScrollTrigger();

    // 2. Loading state, buffering progress & smooth release
    let readyTriggered = false;

    const unlockScroll = () => {
      if (readyTriggered) return;
      readyTriggered = true;

      // Prime GPU hardware decoder at initial frame
      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }

      setLoadProgress(100);

      setTimeout(() => {
        setIsLoaded(true);

        // Unlock scroll on window, body, and Lenis
        (window as any).__scrollLocked = false;
        if ((window as any).__lenis) {
          (window as any).__lenis.start();
        }
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';

        window.removeEventListener('wheel', blockScroll);
        window.removeEventListener('touchmove', blockScroll);
        window.removeEventListener('keydown', blockKeys);

        // Recalculate ScrollTrigger offsets once unlocked
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }, 500);
    };

    // Buffer tracking from native video events
    const updateProgress = () => {
      if (!video) return;
      if (video.buffered.length > 0 && video.duration > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = Math.min(99, Math.round((bufferedEnd / Math.min(video.duration, 4)) * 95));
        setLoadProgress((prev) => Math.max(prev, percent));
      }
    };

    video.addEventListener('progress', updateProgress);

    // Smooth percentage progression while buffering
    const progressInterval = setInterval(() => {
      if (readyTriggered) {
        clearInterval(progressInterval);
        return;
      }
      setLoadProgress((prev) => {
        if (prev < 40) return prev + 10;
        if (prev < 70) return prev + 5;
        if (prev < 90) return prev + 2;
        return prev;
      });
    }, 120);

    // Video readiness listeners
    if (video.readyState >= 3) {
      unlockScroll();
    } else {
      video.addEventListener('canplay', unlockScroll, { once: true });
      video.addEventListener('canplaythrough', unlockScroll, { once: true });
    }

    // Safety fallback: ensure scroll is never permanently blocked even on throttled connections
    const safetyTimer = setTimeout(() => {
      unlockScroll();
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(safetyTimer);
      io.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('progress', updateProgress);
      video.removeEventListener('canplay', unlockScroll);
      video.removeEventListener('canplaythrough', unlockScroll);

      // Clean up locks if unmounted
      (window as any).__scrollLocked = false;
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('keydown', blockKeys);

      if (ctx) ctx.revert();
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
          src={videoSrc}
          poster="/assets/hero-poster.webp"
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover block pointer-events-none will-change-[transform]"
        />

        {/* Minimalist Cinema Equipment Loading Screen */}
        <div
          className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
            isLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg w-full">
            {/* Camera Equipments Row (Camera, Clapperboard, Film Reel, Drone) */}
            <div className="relative w-full max-w-[320px] sm:max-w-[420px] mb-2 flex items-center justify-center">
              <img
                src="/assets/camera-equipments.webp"
                alt="Cinema Equipments"
                className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(255,255,255,0.2)] brightness-110 contrast-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full pointer-events-none" />
            </div>

            {/* Hairline Luminous Progress Bar */}
            <div className="w-32 sm:w-44 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative mt-4 mb-4">
              <div
                className="h-full bg-gradient-to-r from-neutral-400 via-white to-neutral-200 transition-all duration-300 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Sole Text: "Preparing your Experience" */}
            <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-neutral-400 font-light">
              Preparing your Experience
            </p>
          </div>
        </div>

        {/* First Frame MaskedHeading Overlay */}
        <div
          ref={overlayRef}
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 select-none bg-black will-change-[opacity,transform] transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: '#000000' }}
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
