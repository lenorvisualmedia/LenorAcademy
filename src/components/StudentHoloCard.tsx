import React from 'react';
import { Instagram, Globe, Mail, Briefcase } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkBadge01Icon, FingerPrintIcon } from '@hugeicons/core-free-icons';
import { ReflectiveCard } from './ReflectiveCard';
import { PlacedStudent } from '../data/academyData';

interface StudentHoloCardProps {
  student: PlacedStudent;
  theme?: 'dark' | 'light';
}

export const StudentHoloCard: React.FC<StudentHoloCardProps> = ({ student, theme = 'dark' }) => {
  return (
    <ReflectiveCard
      theme={theme}
      metalness={0.92}
      roughness={0.28}
      blurStrength={6}
      shine={1.2}
      glare={0.65}
      enableTilt={true}
      tiltStrength={15}
      intro={false}
      width="100%"
      height={500}
      radius={24}
      className="mx-auto w-full transition-transform duration-300"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Header: Verified category badge & Placed status */}
        <div className="reflective-card__header">
          <span className="reflective-card__badge">
            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={16} strokeWidth={1.8} />
            {student.category}
          </span>
          <span className="reflective-card__status">
            <span className={`reflective-card__dot ${student.careerStatus === 'Own Studio / Agency' ? '!bg-amber-400 !shadow-[0_0_8px_rgba(251,191,36,0.8)]' : ''}`} />
            {student.careerStatus === 'Own Studio / Agency' ? 'Founder' : student.careerStatus === 'Freelance Professional' ? 'Freelance' : 'Placed'} · {student.batch}
          </span>
        </div>

        {/* Student Work / Photo Frame */}
        <div className="my-auto py-2 flex items-center justify-center">
          <div className="relative w-full max-w-[250px] aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-neutral-900">
            <img
              src={student.cardImage}
              alt={`${student.name} - ${student.role}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              width="250"
              height="172"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white/95 drop-shadow">
              <span className="font-bold tracking-wider truncate mr-2">{student.company}</span>
              <span className="opacity-80 shrink-0">{student.location}</span>
            </div>
          </div>
        </div>

        {/* Identity & Role */}
        <div className="reflective-card__identity pt-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="reflective-card__name font-bold tracking-tight text-xl truncate" title={student.name}>
              {student.name}
            </h3>
            
            {student.portfolioUrl ? (
              <a
                href={student.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1 font-mono shrink-0"
                title={student.instagram}
              >
                {student.portfolioType === 'behance' ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Bē
                  </span>
                ) : student.portfolioType === 'drive' ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Briefcase className="w-2.5 h-2.5" />
                    <span>Work</span>
                  </span>
                ) : student.portfolioType === 'email' ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                    <Mail className="w-2.5 h-2.5" />
                    <span>Mail</span>
                  </span>
                ) : student.portfolioType === 'portfolio' ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <Globe className="w-2.5 h-2.5" />
                    <span>Web</span>
                  </span>
                ) : (
                  <>
                    <Instagram className="w-3.5 h-3.5 text-neutral-400 group-hover:text-pink-400" />
                    <span className="text-[11px] max-w-[100px] truncate">@{student.instagram}</span>
                  </>
                )}
              </a>
            ) : (
              <span className="text-[11px] text-neutral-500 font-mono">@{student.instagram}</span>
            )}
          </div>

          <p className="reflective-card__role mt-1 font-medium text-xs leading-snug line-clamp-1" title={student.role}>
            {student.role}
          </p>

          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/10">
              {student.careerStatus || 'Alumni'}
            </span>
            <span className="text-[11px] text-neutral-400 font-medium truncate">
              {student.company}
            </span>
          </div>
        </div>

        {/* Footer: Credential ID & Fingerprint Tile */}
        <div className="reflective-card__footer mt-3 pt-3 border-t border-white/10">
          <div className="reflective-card__id">
            <span className="reflective-card__label">Alumni Credential</span>
            <span className="reflective-card__value text-xs font-mono font-bold">
              LENOR-{student.batch.replace(/\D/g, '') || '2024'}-{student.id.replace('st-', 'ALM')}
            </span>
          </div>
          <span className="reflective-card__tile" title="Lenor Verified Graduate">
            <HugeiconsIcon icon={FingerPrintIcon} size={22} strokeWidth={1.6} />
          </span>
        </div>
      </div>
    </ReflectiveCard>
  );
};

export default StudentHoloCard;
