import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Play,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
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

// -----------------------------------------------------------------------------
// Individual Slide in the Vertical Instagram Feed
// -----------------------------------------------------------------------------
interface ReelModalSlideProps {
  reel: ModelReelItem;
  index: number;
  activeIndex: number;
  isMuted: boolean;
  onVideoEnded: () => void;
  onToggleMute: () => void;
  onLike: (id: string) => void;
  isLiked: boolean;
  onShare: (reel: ModelReelItem) => void;
  copied: boolean;
}

const ReelModalSlide: React.FC<ReelModalSlideProps> = ({
  reel,
  index,
  activeIndex,
  isMuted,
  onVideoEnded,
  onToggleMute,
  onLike,
  isLiked,
  onShare,
  copied
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showHeartPop, setShowHeartPop] = useState(false);

  const isActive = index === activeIndex;
  const isAdjacent = Math.abs(index - activeIndex) <= 1;
  const isNext = index === activeIndex + 1;

  // Manage playback based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.muted = isMuted;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          // If browser blocked autoplay with sound, fall back to muted
          video.muted = true;
          video.play().catch(() => {});
        });
    } else {
      video.pause();
      video.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, [isActive, isMuted]);

  // Sync mute state on active video
  useEffect(() => {
    if (videoRef.current && isActive) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, isActive]);

  const handleTimeUpdate = () => {
    if (!isActive || !videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(reel.id);
    setShowHeartPop(true);
    setTimeout(() => setShowHeartPop(false), 900);
  };

  return (
    <div className="absolute inset-0 w-full h-full select-none overflow-hidden bg-black flex flex-col justify-between">
      {/* Top Segmented / Continuous Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${isActive ? progress : 0}%` }}
        />
      </div>

      {/* Video or Poster element */}
      {isAdjacent ? (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          playsInline
          muted={isMuted}
          preload={isActive || isNext ? 'auto' : 'metadata'}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onCanPlay={() => setIsBuffering(false)}
          onEnded={onVideoEnded}
          onClick={handleTogglePlay}
          onDoubleClick={handleDoubleClick}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
      ) : (
        <img
          src={reel.poster}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Buffering Spinner when video is loading or streaming chunks */}
      {isActive && isBuffering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full border-2 border-white/20 border-t-white animate-spin drop-shadow-2xl" />
        </div>
      )}

      {/* Play/Pause Watermark Overlay when paused */}
      {isActive && !isPlaying && (
        <div
          onClick={handleTogglePlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer"
        >
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center shadow-2xl">
            <Play className="w-9 h-9 sm:w-10 sm:h-10 fill-current ml-1" />
          </div>
        </div>
      )}

      {/* Double-tap Heart Animation */}
      {showHeartPop && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none animate-ping">
          <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-2xl" />
        </div>
      )}

      {/* Floating Sound Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors shadow-lg cursor-pointer"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Right Side Action Rails (Instagram Style) */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(reel.id);
          }}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isLiked
                ? 'bg-red-500 text-white shadow-red-500/50 shadow-lg'
                : 'bg-black/60 border border-white/20 text-white group-hover:scale-110'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </div>
          <span className="text-[11px] font-mono font-bold text-white drop-shadow">
            {isLiked ? 'Liked' : reel.likes}
          </span>
        </button>

        {/* Share Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare(reel);
          }}
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

      {/* Bottom Caption Overlay (Full-width seamless gradient spanning edge-to-edge) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pb-6 sm:pb-7 z-20 bg-gradient-to-t from-black via-black/80 via-50% to-transparent pointer-events-auto">
        <div className="pr-16 sm:pr-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white text-xs sm:text-sm font-black tracking-tight">
              @lenoracademy
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider text-white">
              Model Shoot
            </span>
          </div>

          <h3 className="text-white text-sm sm:text-base font-bold leading-snug drop-shadow">
            {reel.title}
          </h3>
          <p className="text-neutral-200 text-xs font-light mt-1 line-clamp-3 leading-relaxed drop-shadow">
            {reel.caption}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono font-semibold text-neutral-300 mt-2">
            <span>#ModelPhotography</span>
            <span>#GujarathiStreet</span>
            <span>#LenorAcademy</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-300 mt-3 pt-2 border-t border-white/10">
            <Music
              className="w-3.5 h-3.5 text-neutral-300 shrink-0 animate-spin"
              style={{ animationDuration: '4s' }}
            />
            <span className="truncate">Original Field Audio · Gujarathi Street Shoot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Main Component: Reels Rail + Instagram-Style Smooth Vertical Feed
// -----------------------------------------------------------------------------
export const ModelPhotographyReels: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Drag physics state for smooth touch sliding
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef<number>(0);
  const wheelLockRef = useRef<boolean>(false);

  const railRef = useRef<HTMLDivElement>(null);

  const isModalOpen = activeReelIndex !== null;
  const currentReel = activeReelIndex !== null ? MODEL_REELS_DATA[activeReelIndex] : null;

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
  }, [activeReelIndex]);

  const handlePrevReel = useCallback(() => {
    if (activeReelIndex === null) return;
    const prevIdx = (activeReelIndex - 1 + MODEL_REELS_DATA.length) % MODEL_REELS_DATA.length;
    setActiveReelIndex(prevIdx);
  }, [activeReelIndex]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleLike = (id: string) => {
    setLikedReels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (reel: ModelReelItem) => {
    if (navigator.share) {
      navigator
        .share({
          title: reel.title,
          text: `${reel.title} — Lenor Academy Gujarathi Street Model Shoot Reel`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleNextReel, handlePrevReel]);

  // Desktop Mouse Wheel support (smooth slide like Instagram web)
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 28) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        handleNextReel();
      } else {
        handlePrevReel();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    }
  };

  // Mobile / Touch Drag gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientY - touchStartY.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than 50px up/down, advance reel
    if (dragOffset < -50) {
      handleNextReel();
    } else if (dragOffset > 50) {
      handlePrevReel();
    }
    setDragOffset(0);
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
                setDragOffset(0);
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
        <span className="hidden sm:inline-block">Click any reel for vertical Instagram-style feed</span>
      </div>

      {/* FULLSCREEN VERTICAL INSTAGRAM REELS VIEWER MODAL */}
      {isModalOpen && currentReel && activeReelIndex !== null && createPortal(
        <div
          data-lenor-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6"
        >
          {/* Backdrop Click */}
          <div
            className="absolute inset-0 z-0 cursor-pointer"
            onClick={() => setActiveReelIndex(null)}
          />

          {/* Top Bar Header */}
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
                  <span>📍 {currentReel.location}</span>
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

          {/* Prev / Next Floater Buttons (Desktop) */}
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

          {/* MAIN VERTICAL INSTAGRAM PHONE FRAME */}
          <div
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full max-w-[420px] aspect-[9/16] max-h-[85vh] sm:max-h-[88vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl select-none"
          >
            {/* CONTINUOUS VERTICAL SLIDING TRACK */}
            <div className="relative w-full h-full">
              {MODEL_REELS_DATA.map((reel, idx) => {
                const offset = (idx - activeReelIndex) * 100;
                // Only render slides within visible or adjacent range for top performance
                const isRendered = Math.abs(idx - activeReelIndex) <= 2;
                if (!isRendered) return null;

                return (
                  <div
                    key={reel.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transform: `translateY(calc(${offset}% + ${dragOffset}px))`,
                      transition: isDragging ? 'none' : 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  >
                    <ReelModalSlide
                      reel={reel}
                      index={idx}
                      activeIndex={activeReelIndex}
                      isMuted={isMuted}
                      onVideoEnded={handleNextReel}
                      onToggleMute={toggleMute}
                      onLike={toggleLike}
                      isLiked={!!likedReels[reel.id]}
                      onShare={handleShare}
                      copied={copied}
                    />
                  </div>
                );
              })}
            </div>

            {/* Mobile Prev / Next Pill */}
            <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
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
