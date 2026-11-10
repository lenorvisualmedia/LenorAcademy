'use client';

import React, { memo, useRef, useState, useCallback } from 'react';
import './ReflectiveCard.css';

export interface ReflectiveCardProps {
  children?: React.ReactNode;
  theme?: 'dark' | 'light';
  tint?: string;
  metalness?: number;
  roughness?: number;
  blurStrength?: number;
  grayscale?: number;
  warp?: number;
  warpScale?: number;
  shine?: number;
  bevel?: number;
  glare?: number;
  enableTilt?: boolean;
  tiltStrength?: number;
  intro?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  onWebcamError?: (error: unknown) => void;
}

export const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  children,
  theme = 'dark',
  metalness = 0.9,
  shine = 1,
  glare = 0.6,
  enableTilt = true,
  tiltStrength = 14,
  width = '100%',
  height = 500,
  radius = 24,
  className = '',
  style
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableTilt) return;
    const root = rootRef.current;
    if (!root) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const maxAngle = Math.min(Math.max(tiltStrength, 2), 25);
      const rx = (0.5 - py) * maxAngle;
      const ry = (px - 0.5) * maxAngle;

      setTilt({
        rx,
        ry,
        glareX: px * 100,
        glareY: py * 100,
        active: true
      });
    });
  }, [enableTilt, tiltStrength]);

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, active: false });
    });
  }, []);

  const isDark = theme !== 'light';

  const cardStyle: React.CSSProperties = {
    ...style,
    ['--rc-width' as any]: typeof width === 'number' ? `${width}px` : width,
    ['--rc-height' as any]: typeof height === 'number' ? `${height}px` : height,
    ['--rc-radius' as any]: `${radius}px`,
    ['--rc-rotate-x' as any]: `${tilt.rx.toFixed(2)}deg`,
    ['--rc-rotate-y' as any]: `${tilt.ry.toFixed(2)}deg`,
    ['--rc-lift' as any]: tilt.active ? '-6px' : '0px',
  };

  return (
    <div
      ref={rootRef}
      className={`reflective-card ${className}`}
      style={cardStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div 
        className="reflective-card__body"
        style={{
          transition: tilt.active 
            ? 'transform 0.08s ease-out, box-shadow 0.2s ease-out' 
            : 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.2, 1, 0.3, 1)',
          background: isDark
            ? 'linear-gradient(155deg, #1c1c20 0%, #121215 40%, #0a0a0c 80%, #050506 100%)'
            : 'linear-gradient(155deg, #ffffff 0%, #f4f4f6 60%, #e8e8ec 100%)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.12)',
          boxShadow: tilt.active
            ? isDark
              ? '0 30px 60px -15px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 0.06)'
              : '0 25px 50px -15px rgba(0, 0, 0, 0.25)'
            : isDark
              ? '0 15px 35px -10px rgba(0, 0, 0, 0.8)'
              : '0 10px 25px -10px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Specular Reflective Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: tilt.active ? glare : 0.18,
            background: isDark
              ? `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 70%)`
              : `radial-gradient(circle 320px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)`,
            mixBlendMode: isDark ? 'screen' : 'overlay',
          }}
        />

        {/* Holographic Iridescent Edge Sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-25 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `linear-gradient(${115 + tilt.ry * 3}deg, rgba(255, 0, 128, 0.15) 0%, rgba(0, 200, 255, 0.2) 50%, rgba(255, 215, 0, 0.15) 100%)`,
          }}
        />

        {/* Content Container */}
        <div className="reflective-card__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default memo(ReflectiveCard);
