import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface AccreditationBannerProps {
  className?: string;
  variant?: 'card' | 'dark' | 'compact';
  showTitleBadge?: boolean;
}

export const AccreditationBanner: React.FC<AccreditationBannerProps> = ({
  className = '',
  variant = 'card',
  showTitleBadge = false
}) => {
  const isDark = variant === 'dark';

  const accreditations = [
    {
      id: 'nsdc',
      name: 'NSDC',
      fullName: 'National Skill Development Corporation',
      tagline: 'Transforming the skill landscape',
      logo: '/assets/accreditation-nsdc.png',
      alt: 'National Skill Development Corporation (NSDC) official logo'
    },
    {
      id: 'mesc',
      name: 'MESC',
      fullName: 'Media & Entertainment Skills Council',
      tagline: 'Empanelled Awarding Body',
      logo: '/assets/accreditation-mesc.png',
      alt: 'Media and Entertainment Skills Council (MESC) official logo'
    },
    {
      id: 'skill-india',
      name: 'Skill India',
      fullName: 'Skill India Mission',
      tagline: 'कौशल भारत - कुशल भारत',
      logo: '/assets/accreditation-skill-india.png',
      alt: 'Skill India official logo'
    },
    {
      id: 'ncvet',
      name: 'NCVET',
      fullName: 'National Council for Vocational Education and Training',
      tagline: 'कौशल गुणवत्ता प्रगति',
      logo: '/assets/accreditation-ncvet.png',
      alt: 'National Council for Vocational Education and Training (NCVET) official logo'
    }
  ];

  return (
    <div
      className={`rounded-[22px] sm:rounded-[26px] transition-all duration-300 ${
        isDark
          ? 'bg-neutral-900/90 text-white border border-neutral-800 shadow-2xl'
          : 'bg-white text-black border border-neutral-200/90 shadow-xl'
      } p-5 sm:p-7 lg:p-8 ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
        
        {/* Left Side: Statement of Empanelment */}
        <div className="max-w-xl text-center lg:text-left space-y-2">
          {showTitleBadge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Credibility &amp; Affiliations</span>
            </div>
          )}
          <p className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-snug">
            We are empaneled for conducting skill development training activities under
          </p>
          <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Government of India Recognized Qualifications · NSDC · MESC · Skill India · NCVET
          </p>
        </div>

        {/* Right Side: Official 4 Accreditation Logos Lockup */}
        <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6 lg:gap-7 bg-white rounded-2xl p-3.5 sm:p-4 border border-neutral-200/70 shadow-sm">
          {accreditations.map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && (
                <div className="hidden sm:block w-px h-10 bg-neutral-200 shrink-0" />
              )}
              <div 
                className="group relative flex items-center justify-center p-1.5 hover:scale-105 transition-transform duration-300"
                title={`${item.fullName} (${item.name}) - ${item.tagline}`}
              >
                <img
                  src={item.logo}
                  alt={item.alt}
                  className="h-9 sm:h-11 md:h-12 w-auto max-w-[95px] sm:max-w-[120px] object-contain shrink-0"
                  loading="lazy"
                />
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

