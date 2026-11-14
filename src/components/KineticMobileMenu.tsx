import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Download } from 'lucide-react';

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

  return (
    <div className="lg:hidden">
      {/* Mobile Backdrop overlay covering screen beneath navbar */}
      <div
        className={`fixed inset-0 top-0 bg-black/75 backdrop-blur-sm -z-10 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Smooth Expanding Dropdown Container */}
      <div
        className={`grid transition-all duration-300 ease-out border-b border-neutral-800 bg-[#0a0a0c]/98 backdrop-blur-2xl shadow-2xl ${
          isOpen
            ? 'grid-rows-[1fr] opacity-100 visible'
            : 'grid-rows-[0fr] opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="overflow-hidden max-h-[calc(100dvh-70px)] overflow-y-auto overscroll-contain minimal-scrollbar">
          <nav className="flex flex-col px-5 py-4 divide-y divide-neutral-800/80">
            {/* Navigation Links list */}
            <ul className="flex flex-col space-y-1 pb-4 list-none p-0 m-0">
              {navLinks.map((link, idx) => {
                const isActive = currentPath === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-white/10 text-white font-extrabold shadow-sm'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-neutral-500 w-4">
                          0{idx + 1}
                        </span>
                        <span className="text-sm tracking-wider uppercase font-sans">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-white opacity-100 translate-x-0'
                            : 'text-neutral-500 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTAs Section: Enrol & Brochure */}
            <div className="pt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenEnrol();
                }}
                className="w-full h-11 rounded-full bg-white text-black font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Enrol In Programme (2026 Batch)</span>
              </button>

              {onOpenBrochure && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBrochure();
                  }}
                  className="w-full h-10 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-white hover:bg-neutral-800 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Download Brochure</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default KineticMobileMenu;
