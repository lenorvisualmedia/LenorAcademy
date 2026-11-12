import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowUpRight, Sparkles, Download } from 'lucide-react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

interface KineticMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
  onOpenEnrol: () => void;
  onOpenBrochure?: () => void;
  currentPath: string;
}

export const KineticMobileMenu: React.FC<KineticMobileMenuProps> = ({
  isOpen,
  onClose,
  navLinks,
  onOpenEnrol,
  onOpenBrochure,
  currentPath,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMountRef = useRef(true);

  // Setup CustomEase and shape hover listeners
  useEffect(() => {
    if (!containerRef.current) return;

    try {
      if (!gsap.parseEase('kineticEase')) {
        CustomEase.create('kineticEase', '0.65, 0.01, 0.05, 0.99');
      }
    } catch {
      // Fallback to power2.out
    }

    const ctx = gsap.context(() => {
      const menuItems = containerRef.current!.querySelectorAll('.kinetic-menu-item[data-shape]');
      const shapesContainer = containerRef.current!.querySelector('.kinetic-ambient-shapes');

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute('data-shape');
        const shape = shapesContainer ? shapesContainer.querySelector(`.kinetic-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll('.kinetic-shape-el');

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.kinetic-shape').forEach((s) => s.classList.remove('active'));
          }
          shape.classList.add('active');

          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.7)', overwrite: 'auto' }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto',
          });
        };

        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('mouseleave', onLeave);
        item.addEventListener('touchstart', onEnter, { passive: true });
        item.addEventListener('touchend', onLeave, { passive: true });

        (item as any)._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter);
          item.removeEventListener('mouseleave', onLeave);
          item.removeEventListener('touchstart', onEnter);
          item.removeEventListener('touchend', onLeave);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.kinetic-menu-item[data-shape]');
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Open/Close GSAP Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector('.kinetic-overlay-wrapper');
      const menu = containerRef.current!.querySelector('.kinetic-menu-content');
      const overlay = containerRef.current!.querySelector('.kinetic-backdrop-overlay');
      const bgPanels = containerRef.current!.querySelectorAll('.kinetic-layer');
      const menuLinks = containerRef.current!.querySelectorAll('.kinetic-nav-link');
      const fadeTargets = containerRef.current!.querySelectorAll('[data-menu-fade]');
      const closeBtn = containerRef.current!.querySelector('.kinetic-close-btn');

      const tl = gsap.timeline();

      if (isOpen) {
        isFirstMountRef.current = false;
        if (navWrap) navWrap.setAttribute('data-nav', 'open');

        tl.set(navWrap, { display: 'block' })
          .set(menu, { xPercent: 0 }, '<')
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, '<')
          .fromTo(
            bgPanels,
            { xPercent: 101 },
            { xPercent: 0, stagger: 0.08, duration: 0.55, ease: 'power3.out' },
            '<'
          )
          .fromTo(
            menuLinks,
            { yPercent: 120, opacity: 0, rotate: 6, x: 0 },
            { yPercent: 0, opacity: 1, rotate: 0, x: 0, stagger: 0.035, duration: 0.45, ease: 'power3.out' },
            '<+=0.25'
          )
          .fromTo(
            fadeTargets,
            { autoAlpha: 0, yPercent: 30 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, duration: 0.35, clearProps: 'all' },
            '<+=0.15'
          )
          .fromTo(
            closeBtn,
            { rotate: -90, opacity: 0, scale: 0.7 },
            { rotate: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' },
            '<+=0.1'
          );
      } else {
        if (isFirstMountRef.current) {
          if (navWrap) gsap.set(navWrap, { display: 'none' });
          return;
        }

        if (navWrap) navWrap.setAttribute('data-nav', 'closed');

        // Silky smooth close animation on X button / backdrop click
        tl.to(closeBtn, { rotate: 90, scale: 0.8, opacity: 0, duration: 0.28, ease: 'power2.inOut' })
          .to(menuLinks, { opacity: 0, x: 20, stagger: 0.02, duration: 0.24, ease: 'power2.in' }, '<')
          .to(fadeTargets, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' }, '<')
          .to(
            bgPanels,
            { xPercent: 101, stagger: 0.05, duration: 0.48, ease: 'power3.inOut' },
            '<+=0.06'
          )
          .to(menu, { xPercent: 105, duration: 0.5, ease: 'power3.inOut' }, '<')
          .to(overlay, { autoAlpha: 0, duration: 0.42, ease: 'power2.inOut' }, '<+=0.04')
          .set(navWrap, { display: 'none' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="lg:hidden">
      <div data-nav="closed" className="kinetic-overlay-wrapper fixed inset-0 z-[99999] hidden">
        {/* Dimmer overlay */}
        <div className="kinetic-backdrop-overlay fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer" onClick={onClose} />

        {/* Sliding menu drawer */}
        <nav className="kinetic-menu-content fixed top-0 right-0 bottom-0 w-full sm:w-[460px] h-full z-10 overflow-hidden flex flex-col justify-between bg-black text-white shadow-2xl">
          {/* Triple-layer kinetic background curtains */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="kinetic-layer absolute inset-0 bg-[#1c1c22]" />
            <div className="kinetic-layer absolute inset-0 bg-[#0d0d12]" />
            <div className="kinetic-layer absolute inset-0 bg-[#000000]" />

            {/* Ambient Background Shapes triggered on hover/tap */}
            <div className="kinetic-ambient-shapes absolute inset-0 overflow-hidden opacity-75">
              {/* Shape 1: Floating circles */}
              <svg className="kinetic-shape kinetic-shape-1 absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-300" viewBox="0 0 400 400" fill="none">
                <circle className="kinetic-shape-el" cx="80" cy="120" r="45" fill="rgba(99,102,241,0.22)" />
                <circle className="kinetic-shape-el" cx="300" cy="80" r="65" fill="rgba(139,92,246,0.18)" />
                <circle className="kinetic-shape-el" cx="200" cy="300" r="85" fill="rgba(236,72,153,0.15)" />
                <circle className="kinetic-shape-el" cx="350" cy="280" r="35" fill="rgba(99,102,241,0.22)" />
              </svg>

              {/* Shape 2: Wave pattern */}
              <svg className="kinetic-shape kinetic-shape-2 absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-300" viewBox="0 0 400 400" fill="none">
                <path className="kinetic-shape-el" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.25)" strokeWidth="60" fill="none" />
                <path className="kinetic-shape-el" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(139,92,246,0.2)" strokeWidth="40" fill="none" />
              </svg>

              {/* Shape 3: Grid dots */}
              <svg className="kinetic-shape kinetic-shape-3 absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-300" viewBox="0 0 400 400" fill="none">
                <circle className="kinetic-shape-el" cx="50" cy="50" r="10" fill="rgba(99,102,241,0.35)" />
                <circle className="kinetic-shape-el" cx="150" cy="50" r="10" fill="rgba(139,92,246,0.35)" />
                <circle className="kinetic-shape-el" cx="250" cy="50" r="10" fill="rgba(236,72,153,0.35)" />
                <circle className="kinetic-shape-el" cx="350" cy="50" r="10" fill="rgba(99,102,241,0.35)" />
                <circle className="kinetic-shape-el" cx="100" cy="150" r="14" fill="rgba(139,92,246,0.3)" />
                <circle className="kinetic-shape-el" cx="200" cy="150" r="14" fill="rgba(236,72,153,0.3)" />
                <circle className="kinetic-shape-el" cx="300" cy="150" r="14" fill="rgba(99,102,241,0.3)" />
              </svg>

              {/* Shape 4: Organic blobs */}
              <svg className="kinetic-shape kinetic-shape-4 absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-300" viewBox="0 0 400 400" fill="none">
                <path className="kinetic-shape-el" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.18)" />
                <path className="kinetic-shape-el" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(236,72,153,0.14)" />
              </svg>

              {/* Shape 5: Diagonal lines */}
              <svg className="kinetic-shape kinetic-shape-5 absolute inset-0 w-full h-full opacity-0 pointer-events-none transition-opacity duration-300" viewBox="0 0 400 400" fill="none">
                <line className="kinetic-shape-el" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.2)" strokeWidth="30" />
                <line className="kinetic-shape-el" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.18)" strokeWidth="25" />
                <line className="kinetic-shape-el" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.15)" strokeWidth="20" />
              </svg>
            </div>
          </div>

          {/* Header row inside drawer */}
          <div className="relative z-10 px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-4 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
                Menu Navigation
              </span>
            </div>
            <button
              onClick={onClose}
              className="kinetic-close-btn p-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-500 transition-all duration-300 hover:rotate-90 active:scale-90 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white transition-transform duration-300" />
            </button>
          </div>

          {/* Main Links Container */}
          <div className="relative z-10 px-6 py-4 overflow-y-auto flex-1 flex flex-col justify-start sm:justify-center my-auto min-h-0 touch-pan-y overscroll-contain minimal-scrollbar">
            <ul className="space-y-2 list-none p-0 m-0">
              {navLinks.map((link, idx) => {
                const shapeIndex = (idx % 5) + 1;
                const isActive = currentPath === link.href;

                return (
                  <li
                    key={link.href}
                    className="kinetic-menu-item overflow-hidden"
                    data-shape={shapeIndex}
                  >
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className="kinetic-nav-link group py-1.5 flex items-center justify-between text-white hover:text-white transition-transform duration-300 block w-full"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-neutral-500 font-bold w-5">
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-2xl sm:text-3xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 ${
                            isActive ? 'text-white' : 'text-neutral-300'
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? 'text-white translate-x-0 opacity-100'
                            : 'text-neutral-500 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer CTAs (Enrol & Brochure) */}
          <div className="relative z-10 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 border-t border-neutral-800 space-y-3" data-menu-fade>
            <button
              onClick={() => {
                onClose();
                onOpenEnrol();
              }}
              className="w-full h-12 rounded-full !bg-white !text-black hover:!bg-neutral-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Enrol In Programme (2026 Batch)</span>
            </button>

            {onOpenBrochure && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBrochure();
                }}
                className="w-full h-11 rounded-full bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                <span>Download Brochure</span>
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

