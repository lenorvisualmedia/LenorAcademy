import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const WIPES: Record<string, string> = {
  up: 'linear-gradient(to top, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  down: 'linear-gradient(to bottom, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  left: 'linear-gradient(to left, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  right: 'linear-gradient(to right, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))',
  center:
    'radial-gradient(farthest-corner at 50% 50%, #000 calc(var(--ac-wipe) * 140% - 40%), transparent calc(var(--ac-wipe) * 140%))'
};

export interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: string | HTMLElement | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  blur?: number;
  rotate?: number;
  tilt?: number;
  wipe?: 'none' | 'up' | 'down' | 'left' | 'right' | 'center';
  threshold?: number;
  delay?: number;
  stagger?: number;
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random';
  trigger?: 'scroll' | 'mount';
  once?: boolean;
  scrub?: boolean | number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onStart?: () => void;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 50,
  direction = 'vertical',
  reverse = false,
  duration = 0.75,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  blur = 0,
  rotate = 0,
  tilt = 0,
  wipe = 'none',
  threshold = 0.12,
  delay = 0,
  stagger = 0,
  staggerFrom = 'start',
  trigger = 'scroll',
  once = true, // Default to true for silky smooth performance; once revealed, avoids scroll jank
  scrub = false,
  onStart,
  onComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const callbacksRef = useRef({ onStart, onComplete });
  callbacksRef.current = { onStart, onComplete };

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let scroller: any = container || null;
    if (typeof scroller === 'string') scroller = document.querySelector(scroller);

    const reduce = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 && el.children.length ? Array.from(el.children) : [el];
      const horizontal = direction === 'horizontal';
      const axis = horizontal ? 'x' : 'y';
      const sign = reverse ? -1 : 1;
      const mask = WIPES[wipe];

      // Initial hidden state at bottom
      const hiddenBottom: gsap.TweenVars = {
        [axis]: distance * sign,
        opacity: animateOpacity ? initialOpacity : 1,
        scale,
        overwrite: 'auto'
      };
      if (blur > 0) hiddenBottom.filter = `blur(${blur}px)`;
      if (rotate) hiddenBottom.rotation = rotate * sign;
      if (mask) {
        hiddenBottom.maskImage = mask;
        hiddenBottom.webkitMaskImage = mask;
        hiddenBottom['--ac-wipe'] = 0;
      }

      // Hidden state at top (when scrolled past upwards)
      const hiddenTop: gsap.TweenVars = {
        [axis]: -distance * 0.6 * sign,
        opacity: animateOpacity ? initialOpacity : 1,
        scale: Math.max(0.96, scale * 0.98),
        overwrite: 'auto'
      };
      if (blur > 0) hiddenTop.filter = `blur(${Math.max(2, blur * 0.6)}px)`;

      // Visible state
      const visible: gsap.TweenVars = {
        [axis]: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration,
        ease,
        overwrite: 'auto'
      };
      if (blur > 0) visible.filter = 'blur(0px)';
      if (mask) {
        visible['--ac-wipe'] = 1;
      }

      if (tilt) {
        const tiltAxis = horizontal ? 'rotationY' : 'rotationX';
        hiddenBottom[tiltAxis] = horizontal ? -tilt * sign : tilt * sign;
        hiddenTop[tiltAxis] = horizontal ? tilt * 0.5 * sign : -tilt * 0.5 * sign;
        visible[tiltAxis] = 0;
        gsap.set(targets, { transformPerspective: 900 });
      }

      gsap.set(el, { visibility: 'visible' });

      if (reduce) {
        gsap.set(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'none',
          rotation: 0
        });
        callbacksRef.current.onComplete?.();
        return;
      }

      if (trigger === 'mount') {
        gsap.set(targets, hiddenBottom);
        gsap.to(targets, {
          ...visible,
          delay,
          stagger: stagger > 0 ? { each: stagger, from: staggerFrom } : undefined,
          onStart: () => callbacksRef.current.onStart?.(),
          onComplete: () => callbacksRef.current.onComplete?.()
        });
        return;
      }

      // Set initial hidden state
      gsap.set(targets, hiddenBottom);

      const start = `top ${(1 - threshold) * 100}%`;
      const end = 'bottom 5%';

      if (scrub) {
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(targets, hiddenBottom, visible);
        ScrollTrigger.create({
          trigger: el,
          scroller: scroller || undefined,
          start,
          end: `top ${Math.max((1 - threshold) * 100 - 45, 5)}%`,
          scrub: scrub === true ? true : Math.max(Number(scrub) || 0, 0.01),
          animation: tl
        });
        return;
      }

      ScrollTrigger.create({
        trigger: el,
        scroller: scroller || undefined,
        start,
        end,
        once,
        onEnter: () => {
          // Scrolling DOWN: enters view from bottom -> APPEARS!
          callbacksRef.current.onStart?.();
          gsap.to(targets, {
            ...visible,
            delay,
            stagger: stagger > 0 ? { each: stagger, from: staggerFrom } : undefined,
            onComplete: () => callbacksRef.current.onComplete?.()
          });
        },
        onLeave: () => {
          // Scrolling DOWN: leaves view out of top -> DISAPPEARS!
          if (once) return;
          gsap.to(targets, {
            ...hiddenTop,
            duration: Math.min(duration, 0.5),
            ease: 'power2.in',
            stagger: stagger > 0 ? { each: stagger * 0.5, from: 'start' } : undefined
          });
        },
        onEnterBack: () => {
          // Scrolling UP: re-enters view from top -> APPEARS!
          callbacksRef.current.onStart?.();
          gsap.to(targets, {
            ...visible,
            stagger: stagger > 0 ? { each: stagger * 0.7, from: 'end' } : undefined,
            onComplete: () => callbacksRef.current.onComplete?.()
          });
        },
        onLeaveBack: () => {
          // Scrolling UP: leaves view out of bottom -> DISAPPEARS!
          if (once) return;
          gsap.to(targets, {
            ...hiddenBottom,
            duration: Math.min(duration, 0.55),
            ease: 'power2.in',
            stagger: stagger > 0 ? { each: stagger * 0.5, from: 'end' } : undefined
          });
        }
      });
    }, el);

    return () => ctx.revert();
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    blur,
    rotate,
    tilt,
    wipe,
    threshold,
    delay,
    stagger,
    staggerFrom,
    trigger,
    once,
    scrub
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden', ...style }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
