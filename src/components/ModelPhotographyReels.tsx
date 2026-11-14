import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Music,
  Check,
  Film
} from 'lucide-react';
import { useModalScrollLock } from '../utils/modalScrollLock';
import { AnimatedContent } from './AnimatedContent';

export interface ModelReelItem {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  poster: string;
  duration: string;
  tag: string;
  likes: string;
  location: string;
}

export const MODEL_REELS_DATA: ModelReelItem[] = [
  {
    id: 'reel-3988',
    title: 'Gujarathi Street Launch & Set Walk',
    caption: 'Students setting up prime lens camera rigs, checking exposure on heritage architecture, and framing the opening street look.',
    videoUrl: '/assets/events/model-photography/IMG_3988.MP4',
    poster: '/assets/events/model-photography/IMG_3988-thumb.webp',
    duration: '0:22',
    tag: 'Set Walk · Gujarathi St',
    likes: '1.8K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3989',
    title: 'Model Posing & Prime Lens Framing',
    caption: 'Directing natural street poses, balancing depth of field, and capturing crisp eye-level editorial portraits.',
    videoUrl: '/assets/events/model-photography/IMG_3989.MP4',
    poster: '/assets/events/model-photography/IMG_3989-thumb.webp',
    duration: '0:12',
    tag: 'Portrait Framing',
    likes: '2.1K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3990',
    title: 'Multi-Angle Gimbal Tracking Drills',
    caption: 'Dynamic camera movement training with student camera operators matching the model’s walking pace across cobblestone lanes.',
    videoUrl: '/assets/events/model-photography/IMG_3990.MP4',
    poster: '/assets/events/model-photography/IMG_3990-thumb.webp',
    duration: '0:27',
    tag: 'Gimbal Tracking',
    likes: '3.4K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3991',
    title: 'Natural Light & Reflector Bounce',
    caption: 'Mastering sunlight diffusion and silver bounce reflectors in narrow heritage alleyways to lift shadow detail.',
    videoUrl: '/assets/events/model-photography/IMG_3991.MP4',
    poster: '/assets/events/model-photography/IMG_3991-thumb.webp',
    duration: '0:21',
    tag: 'Lighting Drills',
    likes: '1.5K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3992',
    title: 'Street Fashion Styling & Attitude',
    caption: 'Guiding the model through varied wardrobe styling, dynamic gestures, and high-fashion urban attitude.',
    videoUrl: '/assets/events/model-photography/IMG_3992.MP4',
    poster: '/assets/events/model-photography/IMG_3992-thumb.webp',
    duration: '0:20',
    tag: 'Street Fashion',
    likes: '2.7K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3993',
    title: 'Model Direction & Mentor Coaching',
    caption: 'Faculty mentor guiding students on vocal communication, eyeline direction, and building confidence on live sets.',
    videoUrl: '/assets/events/model-photography/IMG_3993.MP4',
    poster: '/assets/events/model-photography/IMG_3993-thumb.webp',
    duration: '0:22',
    tag: 'Mentor Guidance',
    likes: '2.9K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3994',
    title: 'Low-Angle Shutter Speed Action',
    caption: 'Testing high shutter speeds, low-angle perspective, and fluid motion on urban pavement.',
    videoUrl: '/assets/events/model-photography/IMG_3994.MP4',
    poster: '/assets/events/model-photography/IMG_3994-thumb.webp',
    duration: '0:14',
    tag: 'Low-Angle Shots',
    likes: '1.9K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3995',
    title: 'Close-Up Beauty & Detail Frames',
    caption: 'Fine-tuning focus peaking on eye details, skin tone fidelity, and cinematic shadow roll-off.',
    videoUrl: '/assets/events/model-photography/IMG_3995.MP4',
    poster: '/assets/events/model-photography/IMG_3995-thumb.webp',
    duration: '0:15',
    tag: 'Close-Up Beauty',
    likes: '2.3K',
    location: 'Gujarathi Street, Calicut'
  },
  {
    id: 'reel-3996',
    title: 'Production Wrap & On-Camera Review',
    caption: 'Reviewing raw footage on camera monitors, analyzing exposure histograms, and wrapping the on-location session.',
    videoUrl: '/assets/events/model-photography/IMG_3996.MP4',
    poster: '/assets/events/model-photography/IMG_3996-thumb.webp',
    duration: '0:24',
    tag: 'Production Wrap',
    likes: '4.1K',
    location: 'Gujarathi Street, Calicut'
  }
];

interface ReelCardProps {
  reel: ModelReelItem;
  index: number;
  onOpen: (index: number) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onClick={() => onOpen(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex-shrink-0 w-[240px] sm:w-[270px] md:w-[290px] aspect-[9/16] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-white/50 transition-all duration-500 shadow-2xl cursor-pointer select-none"
    >
      {/* Poster Image */}
      <img
        src={reel.poster}
        alt={reel.title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          isHovered && videoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video Preview on Hover (Muted) */}
      {isHovered && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      )}

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-white border border-white/20">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>REEL {index + 1}</span>
        </div>
        <div className="text-[11px] font-mono font-bold text-neutral-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          {reel.duration}
        </div>
      </div>

      {/* Center Play Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <div className="inline-block px-2.5 py-0.5 rounded bg-white/15 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-widest text-neutral-200 mb-2 border border-white/10">
          {reel.tag}
        </div>
        <h4 className="text-white text-base sm:text-lg font-black leading-snug line-clamp-2 drop-shadow-md">
          {reel.title}
        </h4>
        <p className="text-neutral-300 text-xs font-light line-clamp-2 mt-1.5 leading-relaxed opacity-90">
          {reel.caption}
        </p>

        <div className="flex items-center justify-between text-neutral-400 text-[11px] font-mono mt-3 pt-3 border-t border-white/15">
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>{reel.likes}</span>
          </div>
          <span className="text-neutral-300 font-bold group-hover:text-white group-hover:underline">
            Tap to Watch &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};

export const ModelPhotographyReels: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const railRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const isModalOpen = activeReelIndex !== null;
  const activeReel = activeReelIndex !== null ? MODEL_REELS_DATA[activeReelIndex] : null;

  useModalScrollLock(isModalOpen, () => setActiveReelIndex(null));

  const scrollRail = (direction: 'left' | 'right') => {
    if (railRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      railRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextReel = useCallback(() => {
    if (activeReelIndex === null) return;
    const nextIdx = (activeReelIndex + 1) % MODEL_REELS_DATA.length;
    setActiveReelIndex(nextIdx);
    setProgress(0);
    setIsPlaying(true);
  }, [activeReelIndex]);

  const handlePrevReel = useCallback(() => {
    if (activeReelIndex === null) return;
    const prevIdx = (activeReelIndex - 1 + MODEL_REELS_DATA.length) % MODEL_REELS_DATA.length;
    setActiveReelIndex(prevIdx);
    setProgress(0);
    setIsPlaying(true);
  }, [activeReelIndex]);

  const togglePlay = () => {
    if (!modalVideoRef.current) return;
    if (isPlaying) {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    } else {
      modalVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    const nextMuted = !isMuted;
    modalVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleLike = (id: string) => {
    setLikedReels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDoubleClickVideo = () => {
    if (activeReel) {
      setLikedReels(prev => ({ ...prev, [activeReel.id]: true }));
      setShowHeartAnim(true);
      setTimeout(() => setShowHeartAnim(false), 900);
    }
  };

  const handleShare = () => {
    if (!activeReel) return;
    if (navigator.share) {
      navigator.share({
        title: activeReel.title,
        text: `${activeReel.title} — Lenor Academy Gujarathi Street Model Shoot Reel`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard controls in modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleNextReel, handlePrevReel, isPlaying, isMuted]);

  // Handle video progress updates
  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const { currentTime, duration } = modalVideoRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  return (
    <section className="px-4 sm:px-10 pt-10 pb-6">
      {/* SECTION HEADER */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-black uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Live Field Workshop · 9 Vertical Reels
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl text-white leading-none">
              MODEL PHOTOGRAPHY
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl font-light mt-3 leading-relaxed">
              Gujarathi Street On-Location Shoot — Real-world studio lighting, multi-camera gimbal drills, and model direction filmed live by Lenor Academy students.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scrollRail('left')}
              aria-label="Scroll reels left"
              className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollRail('right')}
              aria-label="Scroll reels right"
              className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </AnimatedContent>

      {/* REELS HORIZONTAL RAIL */}
      <div
        ref={railRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MODEL_REELS_DATA.map((reel, idx) => (
          <div key={reel.id} className="snap-start">
            <ReelCard
              reel={reel}
              index={idx}
              onOpen={(i) => {
                setActiveReelIndex(i);
                setProgress(0);
                setIsPlaying(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* BOTTOM HINT */}
      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono pt-3 border-t border-neutral-900">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-white" />
          <span>Swipe or scroll sideways to explore all 9 field workshop reels</span>
        </div>
        <span className="hidden sm:inline-block">Click any reel for fullscreen immersive player</span>
      </div>

      {/* FULLSCREEN REELS VIEWER MODAL */}
      {isModalOpen && activeReel && createPortal(
        <div
          data-lenor-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6"
        >
          {/* Close Backdrop click */}
          <div
            className="absolute inset-0 z-0 cursor-pointer"
            onClick={() => setActiveReelIndex(null)}
          />

          {/* Top Bar Controls */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-30 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="w-9 h-9 rounded-full bg-white text-black font-black text-xs flex items-center justify-center tracking-tighter">
                LR
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs sm:text-sm font-extrabold">lenoracademy</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-neutral-400 text-[11px] font-mono">
                    Reel {activeReelIndex + 1} of {MODEL_REELS_DATA.length}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-light flex items-center gap-1.5">
                  <span>📍 {activeReel.location}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveReelIndex(null)}
              className="w-11 h-11 rounded-full bg-neutral-900/80 hover:bg-white hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer pointer-events-auto shadow-xl"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prev / Next Buttons (Desktop Floaters) */}
          <button
            onClick={handlePrevReel}
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-neutral-900/90 hover:bg-white hover:text-black text-white border border-white/20 items-center justify-center transition-all cursor-pointer shadow-2xl"
            aria-label="Previous reel"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextReel}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-neutral-900/90 hover:bg-white hover:text-black text-white border border-white/20 items-center justify-center transition-all cursor-pointer shadow-2xl"
            aria-label="Next reel"
          >
            <ChevronDown className="w-6 h-6" />
          </button>

          {/* MAIN VERTICAL PHONE FRAME */}
          <div className="relative z-10 w-full max-w-[420px] aspect-[9/16] max-h-[85vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col justify-between">
            {/* Real-time Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Video Element */}
            <video
              ref={modalVideoRef}
              key={activeReel.id}
              src={activeReel.videoUrl}
              poster={activeReel.poster}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleNextReel}
              onClick={togglePlay}
              onDoubleClick={handleDoubleClickVideo}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer select-none"
            />

            {/* Heart Pop Animation on Double Click */}
            {showHeartAnim && (
              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-ping">
                <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-2xl" />
              </div>
            )}

            {/* Play/Pause Watermark Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center shadow-2xl">
                  <Play className="w-10 h-10 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Top Right Floating Sound Toggle */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Right Side Action Rails (Instagram Style) */}
            <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
              {/* Like Button */}
              <button
                onClick={() => toggleLike(activeReel.id)}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    likedReels[activeReel.id]
                      ? 'bg-red-500 text-white shadow-red-500/50 shadow-lg'
                      : 'bg-black/60 border border-white/20 text-white group-hover:scale-110'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${likedReels[activeReel.id] ? 'fill-current' : ''}`}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-white drop-shadow">
                  {likedReels[activeReel.id] ? 'Liked' : activeReel.likes}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-all">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
                </div>
                <span className="text-[11px] font-mono font-bold text-white drop-shadow">
                  {copied ? 'Copied' : 'Share'}
                </span>
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-16 p-4 sm:p-5 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto">
              {/* Account handle & tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white text-xs sm:text-sm font-black tracking-tight">
                  @lenoracademy
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider text-white">
                  Model Shoot
                </span>
              </div>

              {/* Title & Caption */}
              <h3 className="text-white text-sm sm:text-base font-bold leading-snug drop-shadow">
                {activeReel.title}
              </h3>
              <p className="text-neutral-200 text-xs font-light mt-1 line-clamp-3 leading-relaxed drop-shadow">
                {activeReel.caption}
              </p>

              {/* Hashtags */}
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono font-semibold text-neutral-300 mt-2">
                <span>#ModelPhotography</span>
                <span>#GujarathiStreet</span>
                <span>#LenorAcademy</span>
              </div>

              {/* Audio Track Tag */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-300 mt-3 pt-2 border-t border-white/10">
                <Music className="w-3.5 h-3.5 text-neutral-300 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="truncate">Original Field Audio · Gujarathi Street Shoot</span>
              </div>
            </div>

            {/* Mobile Prev / Next Controls (Floating Bottom Pill) */}
            <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <button
                onClick={handlePrevReel}
                className="text-white hover:text-neutral-300 p-1"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-white text-[11px] font-mono font-bold">
                {activeReelIndex + 1}/{MODEL_REELS_DATA.length}
              </span>
              <button
                onClick={handleNextReel}
                className="text-white hover:text-neutral-300 p-1"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

