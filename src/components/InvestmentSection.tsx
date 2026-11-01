import React, { useState } from 'react';
import { Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROGRAMMES } from '../data/academyData';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';

interface InvestmentSectionProps {
  onOpenEnrol: (programId?: string) => void;
  onOpenBrochure: () => void;
  className?: string;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({
  onOpenEnrol,
  onOpenBrochure,
  className = ''
}) => {
  // Track selected course: default to the flagship 'media-master' course
  const [selectedId, setSelectedId] = useState<string>('media-master');

  return (
    <AnimatedContent distance={50} duration={0.8} threshold={0.1} className={className}>
      <section
        id="programmes"
        className="mt-16 bg-white text-black rounded-[24px] p-6 sm:p-12 lg:p-16 border border-neutral-200 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-600">
              Stop 09 · Enrol
            </div>
            <h2 className="h1 text-5xl sm:text-7xl lg:text-8xl text-black mt-2">
              The investment
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-700 font-medium max-w-md leading-relaxed">
            Two programmes, transparent pricing, and zero hidden equipment fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {PROGRAMMES.map((prog) => {
            const isSelected = prog.id === selectedId;

            return (
              <div
                key={prog.id}
                onClick={() => setSelectedId(prog.id)}
                className={`cursor-pointer rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative select-none ${
                  isSelected
                    ? 'bg-black text-white border-2 border-black shadow-2xl scale-[1.01] -translate-y-1'
                    : 'bg-white text-black border border-neutral-200 shadow-md hover:border-black/30 hover:-translate-y-0.5'
                }`}
              >
                {/* Active Selection Badge on Top Right */}
                {isSelected && (
                  <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-black text-white text-[10px] font-mono tracking-widest uppercase border border-white/30 shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Selected Course</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                      }`}
                    >
                      {prog.duration} · {prog.modulesCount}
                    </span>
                    <span
                      className={`text-xs font-extrabold tracking-wider uppercase transition-colors ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {prog.badge}
                    </span>
                  </div>

                  <h3
                    className={`h1 text-3xl sm:text-4xl mb-3 tracking-tight transition-colors ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}
                  >
                    {prog.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 font-light transition-colors ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {prog.description}
                  </p>

                  {/* Price Display */}
                  <div
                    className={`py-4 my-4 border-y flex items-baseline gap-3 transition-colors ${
                      isSelected ? 'border-neutral-800' : 'border-neutral-200'
                    }`}
                  >
                    <div
                      className={`text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
                        isSelected ? 'text-white' : 'text-black'
                      }`}
                    >
                      {prog.price}
                    </div>
                    <div
                      className={`text-xs transition-colors ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      All-inclusive fee
                    </div>
                  </div>

                  {/* Modules list */}
                  <ul className="fl mb-8 space-y-2">
                    {prog.highlights.map((h, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-sm transition-colors ${
                          isSelected ? 'text-neutral-200' : 'text-neutral-800'
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="pt-4 flex flex-col sm:flex-row gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PillButton
                    variant={isSelected ? 'primary' : 'dark'}
                    size="md"
                    onClick={() => {
                      setSelectedId(prog.id);
                      onOpenEnrol(prog.id);
                    }}
                    icon={
                      <Sparkles className="w-4 h-4 text-current" />
                    }
                    className="w-full sm:flex-1"
                  >
                    Enrol Now · 2026 Batch
                  </PillButton>
                  <PillButton
                    variant="ghost"
                    size="md"
                    onClick={onOpenBrochure}
                    className={`w-full sm:w-auto transition-colors ${
                      isSelected
                        ? '!border-white/30 !text-white hover:!border-white hover:!bg-white/10'
                        : '!border-black/30 !text-black hover:!border-black hover:!bg-black/5'
                    }`}
                  >
                    Syllabus
                  </PillButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AnimatedContent>
  );
};

export default InvestmentSection;
