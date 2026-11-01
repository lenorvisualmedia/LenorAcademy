import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { PillNav } from './PillNav';
import { PillButton } from './PillButton';

interface NavbarProps {
  onOpenEnrol: () => void;
  onOpenBrochure?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnrol, onOpenBrochure }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showNav, setShowNav] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowNav(true);
      return;
    }

    const checkHeroScroll = () => {
      const hero = document.getElementById('hero-scroll-container');
      if (!hero) {
        setShowNav(true);
        return;
      }

      // Check if user has scrolled past the hero scroll animation
      const rect = hero.getBoundingClientRect();
      const hasFinishedHero = rect.bottom <= window.innerHeight + 40;
      setShowNav(hasFinishedHero);
    };

    checkHeroScroll();
    window.addEventListener('scroll', checkHeroScroll, { passive: true });
    window.addEventListener('resize', checkHeroScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkHeroScroll);
      window.removeEventListener('resize', checkHeroScroll);
    };
  }, [isHomePage]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Placement', href: '/placement' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Success Stories', href: '/success-stories' },
    { label: 'Careers', href: '/careers' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out py-2.5 ${
        showNav
          ? 'bg-black/90 backdrop-blur-md shadow-2xl'
          : 'bg-transparent shadow-none'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-1 flex items-center justify-between gap-4">
        {/* Brand Logo in Top-Left — always visible */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 font-extrabold text-[13px] tracking-[0.05em] text-white hover:opacity-90 transition-opacity shrink-0"
        >
          <img 
            src="/assets/58a07343-9b5e-42c1-a584-51e6caee9f7c.png" 
            alt="Lenor Academy Logo" 
            className="h-6 w-auto object-contain brightness-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/Lenor_OG_Logo_Master_File.png';
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
          className={`lg:hidden p-2 text-white hover:text-neutral-300 transition-all duration-500 focus:outline-none ${
            showNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-b border-[#262626] px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-bold tracking-wider uppercase py-2 flex items-center justify-between transition-colors ${
                  location.pathname === link.href ? 'text-white font-extrabold' : 'text-[#a9a9a9] hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-[#262626] flex flex-col gap-3">
              <PillButton
                variant="primary"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnrol();
                }}
                className="w-full"
              >
                Enrol In Programme
              </PillButton>
              {onOpenBrochure && (
                <PillButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrochure();
                  }}
                  className="w-full"
                >
                  Download Brochure
                </PillButton>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

