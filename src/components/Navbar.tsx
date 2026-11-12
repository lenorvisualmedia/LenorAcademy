import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { PillNav } from './PillNav';
import { PillButton } from './PillButton';
import { KineticMobileMenu } from './KineticMobileMenu';

interface NavbarProps {
  onOpenEnrol: () => void;
  onOpenBrochure?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // On home page, navbar stays completely hidden until the hero video has played (or skip clicked)
  const [heroCompleted, setHeroCompleted] = useState(() => !isHomePage);
  const [showNav, setShowNav] = useState(() => !isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowNav(true);
      setHeroCompleted(true);
      return;
    }

    // Always reset on Home page mount or navigation back to Home
    (window as any).__heroVideoCompleted = false;
    setHeroCompleted(false);
    setShowNav(false);

    const handleHeroDone = () => {
      (window as any).__heroVideoCompleted = true;
      setHeroCompleted(true);
      setShowNav(true);
    };

    const handleHeroReset = () => {
      (window as any).__heroVideoCompleted = false;
      setHeroCompleted(false);
      setShowNav(false);
    };

    window.addEventListener('lenor-hero-completed', handleHeroDone);
    window.addEventListener('lenor-hero-reset', handleHeroReset);

    let ticking = false;
    const checkHeroScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isDone = (window as any).__heroVideoCompleted;
          // Only show nav on home page if video completed or scrolled down past the hero viewport
          if (!isDone && window.scrollY < window.innerHeight * 0.7) {
            setShowNav(false);
            setHeroCompleted(false);
          } else {
            setShowNav(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', checkHeroScroll, { passive: true });

    return () => {
      window.removeEventListener('lenor-hero-completed', handleHeroDone);
      window.removeEventListener('lenor-hero-reset', handleHeroReset);
      window.removeEventListener('scroll', checkHeroScroll);
    };
  }, [isHomePage, location.key]);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Placement', href: '/placement' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Careers', href: '/careers' },
  ];

  const isNavVisible = !isHomePage || heroCompleted;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out py-2.5 pt-[max(0.625rem,env(safe-area-inset-top))] ${
        !isNavVisible
          ? 'opacity-0 pointer-events-none -translate-y-full'
          : showNav
            ? 'opacity-100 translate-y-0 pointer-events-auto bg-black/90 backdrop-blur-md shadow-2xl'
            : 'opacity-100 translate-y-0 pointer-events-auto bg-transparent shadow-none'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-1 flex items-center justify-between gap-4">
        {/* Brand Logo in Top-Left — always visible */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 font-extrabold text-[13px] tracking-[0.05em] text-white hover:opacity-90 transition-opacity shrink-0"
        >
          <img 
            src="/assets/58a07343-9b5e-42c1-a584-51e6caee9f7c.webp" 
            alt="Lenor Academy Logo" 
            className="h-6 w-auto object-contain brightness-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/Lenor_OG_Logo_Master_File.webp';
            }}
          />
          <span className="tracking-[0.06em] font-black uppercase text-sm sm:text-base text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {ACADEMY_INFO.name}
          </span>
        </Link>

        {/* Desktop Navigation Links — PillNav with React Bits effect */}
        <div
          className={`hidden lg:flex items-center justify-center transition-all duration-500 ${
            showNav
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <PillNav
            items={navLinks}
            activeHref={location.pathname}
            linkComponent={Link}
            theme="dark"
            size="sm"
            itemStyle="plain"
            hoverEffect="fill"
            indicator="dot"
            surface="solid"
            barColor="rgba(24, 24, 28, 0.75)"
            highlightColor="#ffffff"
            intro={false}
          />
        </div>

        {/* Actions (Brochure & Enrol) — appear after hero scroll animation */}
        <div
          className={`hidden sm:flex items-center gap-3 transition-all duration-500 shrink-0 ${
            showNav
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {onOpenBrochure && (
            <button
              onClick={onOpenBrochure}
              className="text-[11px] font-bold tracking-wider uppercase text-neutral-400 hover:text-white px-3 py-2 transition-colors flex items-center gap-1"
            >
              Brochure
            </button>
          )}
          <button
            onClick={onOpenEnrol}
            className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-full bg-white text-black font-extrabold text-[11px] tracking-wider uppercase hover:bg-neutral-200 transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Enrol Now</span>
          </button>
        </div>

        {/* Mobile menu button — appears after hero scroll animation */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 text-white hover:text-neutral-300 transition-all duration-300 focus:outline-none hover:scale-110 active:scale-95 cursor-pointer ${
            showNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Toggle navigation menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Menu
              className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Kinetic Full-Screen Animated Mobile Navigation Drawer */}
      <KineticMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
        currentPath={location.pathname}
      />
    </header>
  );
};

