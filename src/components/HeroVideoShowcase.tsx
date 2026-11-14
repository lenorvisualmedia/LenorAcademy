import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RotateCcw, ChevronRight } from 'lucide-react';
import { MaskedHeading } from './MaskedHeading';

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoShowcaseProps {
  onScrollDown?: () => void;
  onOpenEnrol?: () => void;
}

export const HeroVideoShowcase: React.FC<HeroVideoShowcaseProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia && window.matchMedia('(max-width: 767px)').matches) return true;
    return window.innerWidth < 768 || (window.innerWidth < 1024 && window.innerHeight > window.innerWidth);
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const isPlayingRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const isLoadedRef = useRef(false);
  const scrollIntensityRef = useRef(0);
  const touchStartYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile((prev) => {
        if (prev !== mobile) {
          if (mobile) {
            desktopVideoRef.current?.pause();
          } else {
            mobileVideoRef.current?.pause();
          }
          return mobile;
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 1. Reset state on mount or breakpoint change
    (window as any).__heroVideoCompleted = false;
    hasCompletedRef.current = false;
    isPlayingRef.current = false;
    isLoadedRef.current = false;
    scrollIntensityRef.current = 0;
    setIsCompleted(false);
    setHasStarted(false);

    const activeVid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    const inactiveVid = isMobile ? desktopVideoRef.current : mobileVideoRef.current;

    if (inactiveVid) {
      inactiveVid.pause();
      inactiveVid.currentTime = 0;
      inactiveVid.playbackRate = 1.0;
    }

    if (activeVid) {
      activeVid.pause();
      activeVid.currentTime = 0;
      activeVid.playbackRate = 1.0;
    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = '1';
      overlayRef.current.style.pointerEvents = 'auto';
      overlayRef.current.style.transform = 'none';
    }

    (window as any).__scrollLocked = true;
    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Broadcast reset event so Navbar and main-content are initially hidden
    window.dispatchEvent(new CustomEvent('lenor-hero-reset'));

    // 2. Finish Hero and Unlock Page for the rest of the site
    const finishHeroAndUnlock = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      isPlayingRef.current = false;
      setIsCompleted(true);

      // Stop RAF ticker immediately to free CPU/GPU cycles
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Detach non-passive scroll interceptors so rest of site scrolls natively
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);

      const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
      if (vid) {
        vid.playbackRate = 1.0;
        vid.pause();
        if (vid.duration && !isNaN(vid.duration)) {
          vid.currentTime = Math.max(0, vid.duration - 0.05);
        }
      }

      if (overlayRef.current) {
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.pointerEvents = 'none';
      }

      // Signal completion so Navbar & main-content show!
      (window as any).__heroVideoCompleted = true;
      window.dispatchEvent(new CustomEvent('lenor-hero-completed'));

      // Unlock scroll across window, body, and Lenis — REST OF WEBSITE SCROLLS NORMALLY
      (window as any).__scrollLocked = false;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      if ((window as any).__lenis) {
        (window as any).__lenis.start();
        (window as any).__lenis.scrollTo(window.innerHeight, { duration: 1.2 });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    // 3. Start Video Playback on First Scroll
    const startPlayback = () => {
      if (isPlayingRef.current || hasCompletedRef.current) return;
      const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
      if (!vid) return;

      isPlayingRef.current = true;
      setHasStarted(true);

      // Smoothly hide initial text overlay so video is front and center
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          y: -40,
          duration: 0.5,
          ease: 'power2.out',
          pointerEvents: 'none'
        });
      }

      vid.play().catch(() => {
        // Fallback for autoplay policy
      });
    };

    // 4. Handle Scroll Delta
    const handleScrollInput = (delta: number) => {
      if (!isLoadedRef.current || hasCompletedRef.current || window.scrollY > 15) return;

      if (!isPlayingRef.current) {
        startPlayback();
      }

      scrollIntensityRef.current += Math.abs(delta);
    };

    // Event Listeners for wheel, touch, and keys
    const onWheel = (e: WheelEvent) => {
      if (hasCompletedRef.current || window.scrollY > 15) return;
      e.preventDefault();
      handleScrollInput(e.deltaY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (hasCompletedRef.current || window.scrollY > 15) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (hasCompletedRef.current || window.scrollY > 15) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = (touchStartYRef.current - currentY) * 2.2;
      touchStartYRef.current = currentY;
      handleScrollInput(deltaY);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (hasCompletedRef.current || window.scrollY > 15) return;
      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        handleScrollInput(35);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });

    // 5. INTLLX RAF TICKER: Update playback speed based on scroll intensity (NO UI speed display)
    const tick = () => {
      const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
      if (vid && isPlayingRef.current && !hasCompletedRef.current) {
        scrollIntensityRef.current *= 0.92;
        if (scrollIntensityRef.current < 0.01) scrollIntensityRef.current = 0;

        const targetRate = 1.0 + (scrollIntensityRef.current * 0.015);
        const clampedRate = Math.min(Math.max(1.0, targetRate), 3.5);
        vid.playbackRate = clampedRate;

        if (vid.duration && vid.currentTime >= vid.duration - 0.45) {
          finishHeroAndUnlock();
          return;
        }
      }

      if (!hasCompletedRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Native ended listener
    const onEnded = () => {
      finishHeroAndUnlock();
    };
    const currentActive = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    currentActive?.addEventListener('ended', onEnded);

    // 6. Fast, authentic preparation tracking with zero delay
    let readyTriggered = false;
    const unlockWhenReady = () => {
      if (readyTriggered) return;
      readyTriggered = true;

      setLoadProgress(100);
      isLoadedRef.current = true;
      const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
      if (vid) {
        try {
          vid.currentTime = 0;
        } catch {
          // ignore
        }
      }

      setTimeout(() => {
        setIsLoaded(true);
      }, 350);
    };

    let progressTimer: ReturnType<typeof setInterval> | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    if (currentActive && currentActive.readyState >= 2) {
      unlockWhenReady();
    } else {
      let currentProgress = 0;
      progressTimer = setInterval(() => {
        const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
        if (vid && vid.readyState >= 2) {
          if (progressTimer) clearInterval(progressTimer);
          unlockWhenReady();
          return;
        }
        currentProgress = Math.min(94, currentProgress + Math.floor(Math.random() * 16) + 12);
        setLoadProgress(currentProgress);
      }, 75);

      const onReady = () => {
        if (progressTimer) clearInterval(progressTimer);
        unlockWhenReady();
      };

      currentActive?.addEventListener('canplay', onReady, { once: true });
      currentActive?.addEventListener('loadeddata', onReady, { once: true });

      safetyTimer = setTimeout(() => {
        if (progressTimer) clearInterval(progressTimer);
        unlockWhenReady();
      }, 1400);
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      currentActive?.removeEventListener('ended', onEnded);

      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);

      (window as any).__heroVideoCompleted = false;
      (window as any).__scrollLocked = false;
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMobile]);

  // Replay hero function: locks screen again, restarts from first frame, hides navbar
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    if (!vid) return;

    (window as any).__heroVideoCompleted = false;
    (window as any).__scrollLocked = true;

    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    window.dispatchEvent(new CustomEvent('lenor-hero-reset'));

    hasCompletedRef.current = false;
    isPlayingRef.current = true;
    isLoadedRef.current = true;
    scrollIntensityRef.current = 0;
    setIsCompleted(false);
    setHasStarted(true);

    vid.pause();
    vid.currentTime = 0;
    vid.playbackRate = 1.0;
    vid.play().catch(() => {});

    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      overlayRef.current.style.pointerEvents = 'none';
    }
  };

  // Skip video function: proceeds directly to the last frame of the video and unlocks
  const handleSkip = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const vid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    if (vid) {
      vid.pause();
      vid.playbackRate = 1.0;
      const defaultDuration = isMobile ? 15.87 : 23.76;
      const lastTime = Math.max(0, (vid.duration || defaultDuration) - 0.05);
      vid.currentTime = lastTime;
    }

    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      overlayRef.current.style.pointerEvents = 'none';
    }

    hasCompletedRef.current = true;
    isPlayingRef.current = false;
    setIsCompleted(true);

    (window as any).__heroVideoCompleted = true;
    window.dispatchEvent(new CustomEvent('lenor-hero-completed'));

    (window as any).__scrollLocked = false;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if ((window as any).__lenis) {
      (window as any).__lenis.start();
      (window as any).__lenis.scrollTo(window.innerHeight, { duration: 0.9 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  };

  return (
    <div
      id="hero-scroll-container"
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      {/* Background Cinematic Video Elements (Strict CSS Isolation via Tailwind media queries) */}
      {/* 1. Mobile Portrait Video (Exclusively rendered on mobile view < 768px, completely hidden on desktop) */}
      <video
        ref={mobileVideoRef}
        poster="/assets/hero/hero-poster-mobile.webp"
        src="/hero-scroll-mobile.mp4"
        preload="auto"
        muted
        playsInline
        className="block md:hidden w-full h-full object-cover pointer-events-none"
      />

      {/* 2. Desktop Landscape Video (Exclusively rendered on desktop view >= 768px, completely hidden on mobile) */}
      <video
        ref={desktopVideoRef}
        poster="/assets/hero/hero-poster.webp"
        src="/Hero-scroll.mp4"
        preload="auto"
        muted
        playsInline
        className="hidden md:block w-full h-full object-cover pointer-events-none"
      />

      {/* Brand Logo in Top-Left — Exact design from screenshot, ALWAYS visible when video is active */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-8 z-40 flex items-center gap-2.5 pointer-events-auto select-none pt-[env(safe-area-inset-top)]">
        <img
          src="/assets/brand/lenor-logo-mark.webp"
          alt="Lenor Academy"
          className="h-6 sm:h-7 w-auto object-contain brightness-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/brand/White_Lenor_OG_Logo_Master_File.webp';
          }}
        />
        <span className="tracking-[0.06em] font-black uppercase text-sm sm:text-base text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          LENOR ACADEMY®
        </span>
      </div>

      {/* Skip Intro Button (Top-Right) — Shows last frame and unlocks website immediately */}
      {isLoaded && !isCompleted && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute top-5 right-5 sm:top-6 sm:right-8 z-50 mt-[env(safe-area-inset-top)] px-4 py-2 rounded-full bg-black/60 hover:bg-white text-neutral-200 hover:text-black border border-white/20 hover:border-white text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-2xl group"
          aria-label="Skip video intro"
        >
          <span className="font-bold">Skip Intro</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}

      {/* Minimalist Cinema Equipment Loading Screen */}
      <div
        className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
          isLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 max-w-lg w-full">
          {/* Camera Equipments Row */}
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] mb-2 flex items-center justify-center">
            <img
              src="/assets/hero/camera-equipments.webp"
              alt="Cinema Equipments"
              className="w-full h-auto object-contain filter drop-shadow-[0_0_24px_rgba(255,255,255,0.2)] brightness-110 contrast-105"
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

      {/* First Frame MaskedHeading Overlay (Fades out smoothly on first scroll) */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-8 select-none bg-black will-change-[opacity,transform] transition-opacity duration-700 ${
          isLoaded && !hasStarted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
            Academy of Media &amp; Cinema Arts
          </span>

          {/* Mobile Masked Heading (Strictly uses mobile portrait poster) */}
          <div className="block md:hidden w-full">
            <MaskedHeading
              text="LENOR ACADEMY"
              tag="h1"
              mediaType="image"
              src="/assets/hero/hero-poster-mobile.webp"
              fillScale={1.15}
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

          {/* Desktop Masked Heading (Strictly uses desktop landscape poster) */}
          <div className="hidden md:block w-full">
            <MaskedHeading
              text="LENOR ACADEMY"
              tag="h1"
              mediaType="image"
              src="/assets/hero/hero-poster.webp"
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

          <div className="mt-8 sm:mt-12 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            <span className="text-white font-bold tracking-widest block md:hidden">
              Swipe to Play Experience
            </span>
            <span className="text-white font-bold tracking-widest hidden md:block">
              Scroll to Play Experience
            </span>
          </div>
        </div>
      </div>

      {/* Replay Pill when user scrolls back to top after completing */}
      {isCompleted && (
        <button
          type="button"
          onClick={handleReplay}
          className="absolute bottom-8 sm:bottom-8 bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-2xl group"
          aria-label="Replay hero video from start"
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180" />
          <span className="font-bold">Replay Video</span>
        </button>
      )}
    </div>
  );
};

export default HeroVideoShowcase;
