import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

// Reusable singleton Web Audio context to prevent memory leaks and browser context exhaustion
let sharedAudioCtx: AudioContext | null = null;
const getAudioCtx = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
};

// Procedural mechanical camera shutter sound using Web Audio API
const playCameraShutter = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Mirror slap impulse (low body thump)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(160, now);
    osc1.frequency.exponentialRampToValueAtTime(35, now + 0.04);
    gain1.gain.setValueAtTime(0.07, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    // 2. Focal plane shutter curtain snap (metallic micro-noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.035);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.065, now + 0.004);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);
    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now + 0.004);

    // 3. Shutter release latch close (crisp second click)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220, now + 0.042);
    osc2.frequency.exponentialRampToValueAtTime(45, now + 0.075);
    gain2.gain.setValueAtTime(0.05, now + 0.042);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.042);
    osc2.stop(now + 0.075);
  } catch {
    // Fail-safe: silently continue if audio autoplay is restricted
  }
};

export const CameraFlashTransition: React.FC = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const isFirstMount = useRef(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const flashBgRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on first initial mount so user is not flashed on initial load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setIsActive(true);
    playCameraShutter();

    const flashBg = flashBgRef.current;
    const beam = beamRef.current;
    const hud = hudRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsActive(false);
      }
    });

    if (flashBg) {
      tl.set(flashBg, { opacity: 1 });
      tl.to(flashBg, {
        opacity: 0,
        duration: 0.44,
        ease: 'power3.out'
      }, 0.02);
    }

    if (beam) {
      tl.set(beam, { opacity: 0.95, scaleX: 0.25, scaleY: 1 });
      tl.to(beam, {
        scaleX: 1.8,
        scaleY: 0.3,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.out'
      }, 0.02);
    }

    if (hud) {
      tl.set(hud, { opacity: 0.65, scale: 1.02 });
      tl.to(hud, {
        opacity: 0,
        scale: 1,
        duration: 0.24,
        ease: 'power1.out'
      }, 0.03);
    }

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* High-Intensity Xenon Strobe Burst */}
      <div
        ref={flashBgRef}
        className="absolute inset-0 bg-white"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #ffffff 65%, rgba(255, 255, 255, 0.92) 100%)',
          willChange: 'opacity'
        }}
      />

      {/* Horizontal Anamorphic Lens Flare Streak */}
      <div
        ref={beamRef}
        className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0) 100%)',
          boxShadow: '0 0 30px 10px rgba(255,255,255,0.9)',
          willChange: 'transform, opacity'
        }}
      />

      {/* Viewfinder Framing Reticle HUD */}
      <div
        ref={hudRef}
        className="absolute inset-0 flex items-center justify-center p-8 sm:p-16 pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] border border-black/15 rounded-lg flex items-center justify-center">
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-black/40" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-black/40" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-black/40" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-black/40" />

          {/* Center Autofocus Reticle */}
          <div className="w-7 h-7 border border-black/35 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-black/60 rounded-full" />
          </div>

          {/* Camera Telemetry */}
          <div className="absolute top-3 left-4 text-[9px] font-mono tracking-widest uppercase text-black/50">
            LENOR · SHUTTER 1/250 · F/2.8
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono tracking-widest uppercase text-black/50">
            AF-C · ISO 100 · 4K 60P
          </div>
        </div>
      </div>
    </div>
  );
};

