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
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(() => {
    return typeof window !== 'undefined' && !!(window as any).__heroVideoCompleted;
  });

  const isPlayingRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const scrollIntensityRef = useRef(0);
  const touchStartYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Full high-quality video provided by client
  const videoSrc = '/Hero-scroll.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Initially lock scroll at the top while loading and before user completes the video
    if (!hasCompletedRef.current) {
      (window as any).__scrollLocked = true;
      if ((window as any).__lenis) {
        (window as any).__lenis.stop();
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    // 2. Finish Hero and Unlock Page for the rest of the site
    const finishHeroAndUnlock = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      isPlayingRef.current = false;
      setIsCompleted(true);

      const vid = videoRef.current;
      if (vid) {
        vid.playbackRate = 1.0;
        vid.pause();
        // Show last frame of video
        if (vid.duration && !isNaN(vid.duration)) {
          vid.currentTime = Math.max(0, vid.duration - 0.05);
        }
      }

      // Hide overlay
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
        // Smoothly glide down into the main content
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
      const vid = videoRef.current;
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

    // 4. Handle Scroll Delta (intllx logic: scrollIntensity accumulation)
    const handleScrollInput = (delta: number) => {
      // ONLY affects the hero video section! Never interferes when scrolled into rest of site
      if (hasCompletedRef.current || window.scrollY > 15) return;

      if (!isPlayingRef.current) {
        // In first scroll, the video plays automatically!
        startPlayback();
      }

      // Pump up scroll intensity as user scrolls faster
      scrollIntensityRef.current += Math.abs(delta);
    };

    // Event Listeners for wheel, touch, and keys
    const onWheel = (e: WheelEvent) => {
      // STRICT ISOLATION: If hero has finished or user is in the rest of the site, DO NOTHING!
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
      const vid = videoRef.current;
      if (vid && isPlayingRef.current && !hasCompletedRef.current) {
        // Smoothen the intensity decay (decay factor 0.92 from intllx)
        scrollIntensityRef.current *= 0.92;
        if (scrollIntensityRef.current < 0.01) scrollIntensityRef.current = 0;

        // Base speed 1.0, scales up as user scrolls faster (up to 3.5x max)
        const targetRate = 1.0 + (scrollIntensityRef.current * 0.015);
        const clampedRate = Math.min(Math.max(1.0, targetRate), 3.5);
        vid.playbackRate = clampedRate;

        // Completion check near video end
        if (vid.duration && vid.currentTime >= vid.duration - 0.45) {
          finishHeroAndUnlock();
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);

    // Also listen to native ended event
    const onEnded = () => {
      finishHeroAndUnlock();
    };
    video.addEventListener('ended', onEnded);

    // 6. Preload video in memory with authentic progress tracking
    let readyTriggered = false;
    const unlockWhenReady = () => {
      if (readyTriggered) return;
      readyTriggered = true;

      setLoadProgress(100);
      try {
        video.currentTime = 0;
      } catch {
        // ignore
      }

      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    };

    const xhr = new XMLHttpRequest();
    xhr.open('GET', videoSrc, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0) {
        const pct = Math.min(99, Math.round((e.loaded / e.total) * 100));
        setLoadProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const blob = xhr.response;
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        video.src = blobUrl;
        video.load();

        if (video.readyState >= 2) {
          unlockWhenReady();
        } else {
          video.addEventListener('loadeddata', unlockWhenReady, { once: true });
          video.addEventListener('canplay', unlockWhenReady, { once: true });
        }
      } else {
        video.src = videoSrc;
        video.addEventListener('canplaythrough', unlockWhenReady, { once: true });
      }
    };

    xhr.onerror = () => {
      video.src = videoSrc;
      video.addEventListener('canplaythrough', unlockWhenReady, { once: true });
    };

    xhr.send();

    return () => {
      xhr.abort();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      video.removeEventListener('ended', onEnded);

      // Clean up event listeners
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);

      // Restore scroll if unmounted
      (window as any).__scrollLocked = false;
      if ((window as any).__lenis) {
        (window as any).__lenis.start();
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [videoSrc]);

  // Replay hero function: locks screen again, restarts from first frame, hides navbar
  const handleReplay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const vid = videoRef.current;
    if (!vid) return;

    // 1. Immediately lock scroll across window, body, and Lenis
    (window as any).__heroVideoCompleted = false;
    (window as any).__scrollLocked = true;

    if ((window as any).__lenis) {
      (window as any).__lenis.stop();
      (window as any).__lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // 2. Dispatch reset event to hide Navbar and main content
    window.dispatchEvent(new CustomEvent('lenor-hero-reset'));

    // 3. Reset internal tracking state
    hasCompletedRef.current = false;
    isPlayingRef.current = true;
    scrollIntensityRef.current = 0;
    setIsCompleted(false);
    setHasStarted(true);

    // 4. Reset and play video from the very first frame
    vid.pause();
    vid.currentTime = 0;
    vid.playbackRate = 1.0;
    vid.play().catch(() => {});

    // Ensure title overlay remains hidden so the replaying video takes center stage
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

    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.playbackRate = 1.0;
      // Seek to the last frame of the video
      const lastTime = Math.max(0, (vid.duration || 23.76) - 0.05);
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
      {/* Background Cinematic Video */}
      <video
        ref={videoRef}
        poster="/assets/hero-poster.webp"
        preload="auto"
        muted
        playsInline
        className="w-full h-full object-cover block pointer-events-none"
      />

      {/* Brand Logo in Top-Left — Exact design from screenshot, ALWAYS visible when video is active */}
      <div className="absolute top-5 left-5 sm:top-6 sm:left-8 z-40 flex items-center gap-2.5 pointer-events-auto select-none">
        <img
          src="/assets/58a07343-9b5e-42c1-a584-51e6caee9f7c.webp"
          alt="Lenor Academy"
          className="h-6 sm:h-7 w-auto object-contain brightness-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/White_Lenor_OG_Logo_Master_File.webp';
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
          className="absolute top-5 right-5 sm:top-6 sm:right-8 z-50 px-4 py-2 rounded-full bg-black/60 hover:bg-white text-neutral-200 hover:text-black border border-white/20 hover:border-white text-xs font-mono tracking-wider uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-2xl group"
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
              src="/assets/camera-equipments.webp"
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

          <div className="mt-8 sm:mt-12 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
            <ArrowDown className="w-4 h-4 text-white animate-bounce" />
            <span className="text-white font-bold tracking-widest">Scroll to Play Experience</span>
          </div>
        </div>
      </div>

      {/* Replay Pill when user scrolls back to top after completing */}
      {isCompleted && (
        <button
          type="button"
          onClick={handleReplay}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/25 hover:border-white text-xs font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-2xl group"
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
