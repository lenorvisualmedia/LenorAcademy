import React from 'react';
import { Instagram } from 'lucide-react';
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
            <span className="reflective-card__dot" />
            Placed · {student.batch}
          </span>
        </div>

        {/* Student Work / Photo Frame */}
        <div className="my-auto py-2 flex items-center justify-center">
          <div className="relative w-full max-w-[250px] aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
            <img
              src={student.cardImage}
              alt={`${student.name} - ${student.role}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              width="250"
              height="172"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white/90">
              <span className="font-bold tracking-wider">{student.company}</span>
              <span className="opacity-80">{student.location}</span>
            </div>
          </div>
        </div>

        {/* Identity & Role */}
        <div className="reflective-card__identity pt-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="reflective-card__name font-bold tracking-tight text-xl">
              {student.name}
            </h3>
            <a
              href={`https://instagram.com/${student.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1 font-mono"
              title={`@${student.instagram}`}
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="text-[11px]">@{student.instagram}</span>
            </a>
          </div>

          <p className="reflective-card__role mt-1 font-medium text-xs leading-snug">
            {student.role}
          </p>

          {student.quote && (
            <p className="text-[11px] italic text-neutral-400 mt-2 line-clamp-2 leading-relaxed font-light">
              "{student.quote}"
            </p>
          )}
        </div>

        {/* Footer: Credential ID & Fingerprint Tile */}
        <div className="reflective-card__footer mt-3 pt-3 border-t border-white/10">
          <div className="reflective-card__id">
            <span className="reflective-card__label">Alumni Credential</span>
            <span className="reflective-card__value text-xs">
              LENOR-{student.batch.replace(/\D/g, '') || '2024'}-{student.id.slice(0, 4).toUpperCase()}
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
