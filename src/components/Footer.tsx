import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Phone, MapPin, ArrowUpRight, Instagram } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

interface FooterProps {
  onOpenBrochure: () => void;
  onOpenEnrol: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrochure, onOpenEnrol }) => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-[#1f1f1f]">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="inline-block">
              <img
                src="/assets/30591bb4-8bcf-41d3-b47a-a1b5ad44f09b.webp"
                alt="Lenor Academy — Learn What You Love"
                className="h-10 w-auto object-contain brightness-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/White_Lenor_OG_Logo_Master_File.webp';
                }}
              />
            </Link>
            
            <p className="text-sm text-[#a9a9a9] font-light leading-relaxed max-w-sm">
              We cultivate the next generation of creative visionaries and skilled multimedia professionals in visual arts, cinematography, and post-production.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-[#b5b5b5] pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Makkaraparamba Branch:</strong>
                  <span>CP Building, Makkaraparamba, Malappuram (North, South, Studio Campuses & Theatre)</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Ernakulam Branch:</strong>
                  <span>Madavanna, Ernakulam (Kochi), Kerala</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href={`tel:${ACADEMY_INFO.phone}`} className="hover:text-white transition-colors">
                  {ACADEMY_INFO.phone}
                </a>
              </div>
              <div className="text-[11px] text-[#8a8a8a] pt-1">
                🚆 Nearest Stations: Angadippuram (10-15 km) · Tirur Railway Hub
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenBrochure}
                className="btn ghost !h-9 !px-4 text-[11px] tracking-wider"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Brochure 2026
              </button>
              <button
                onClick={onOpenEnrol}
                className="btn !h-9 !px-4 text-[11px] tracking-wider"
              >
                Apply Online
              </button>
            </div>
          </div>

          {/* Programmes */}
          <div>
            <div className="eye mb-4 text-[#8a8a8a]">Programmes</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Media Master (1 Year)
                </Link>
              </li>
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Visual Media (6 Months)
                </Link>
              </li>
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Design & Editing (6 Months)
                </Link>
              </li>
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Graphic Designing (3 Months)
                </Link>
              </li>
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Professional Editing (3 Months)
                </Link>
              </li>
              <li>
                <Link to="/#programmes" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Drone Course (5 Days)
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <div className="eye mb-4 text-[#8a8a8a]">Explore</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/facilities" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Campus &amp; Facilities
                </Link>
              </li>
              <li>
                <Link to="/placement" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Placement &amp; Career
                </Link>
              </li>
              <li>
                <Link to="/#faqs" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Events & Workshops
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Studio Notes (Blog)
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Admissions 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Career */}
          <div>
            <div className="eye mb-4 text-[#8a8a8a]">Community</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/success-stories" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-[#a9a9a9] hover:text-white transition-colors block">
                  Join Faculty / Careers
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919188374232"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#a9a9a9] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>WhatsApp Admissions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#a9a9a9] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 opacity-60" />
                  <span>@lenoracademy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <div>
            © {new Date().getFullYear()} {ACADEMY_INFO.name}. All rights reserved. MESC (NSDC) & Skill India HRDS Affiliated · ISO Qualified.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#999] tracking-wider uppercase font-semibold">
              {ACADEMY_INFO.subTagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

