import React, { useState } from 'react';
import { Check, Sparkles, CheckCircle2, ShieldCheck, Award, CreditCard, Laptop } from 'lucide-react';
import { PROGRAMMES, Program, ACADEMY_INFO } from '../data/academyData';
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
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filterTabs = [
    { label: 'All Programmes (8)', value: 'All' },
    { label: 'Flagship & Long-Term', value: 'Flagship' },
    { label: '3-Month Diplomas', value: 'Diploma' },
    { label: 'Fast-Track & Crash', value: 'Short' }
  ];

  const filteredPrograms = PROGRAMMES.filter((prog) => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Flagship') return prog.track === 'flagship';
    if (filterCategory === 'Diploma') return prog.track === 'diploma';
    if (filterCategory === 'Short') return prog.track === 'short';
    return true;
  });

  return (
    <AnimatedContent distance={50} duration={0.8} threshold={0.1} className={className}>
      <section
        id="programmes"
        className="mt-16 bg-white text-black rounded-[24px] p-5 sm:p-12 lg:p-16 border border-neutral-200 shadow-xl"
      >
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-600">
              Stop 09 · Enrol
            </div>
            <h2 className="h1 text-4xl sm:text-7xl lg:text-8xl text-black mt-2">
              The investment
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
              8 professional programmes, transparent fee schedules, and zero equipment fees. Bajaj Finance easy EMI available.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-600">
              <span className="inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-black" />
                MESC NSDC & Skill India Certified
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-black" />
                Bajaj Finance EMI
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterCategory(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                filterCategory === tab.value
                  ? 'bg-black text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {filteredPrograms.map((prog) => {
            const isSelected = prog.id === selectedId;

            return (
              <div
                key={prog.id}
                onClick={() => setSelectedId(prog.id)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-10 flex flex-col justify-between transition-all duration-300 relative select-none ${
                  isSelected
                    ? 'bg-black text-white border-2 border-black shadow-2xl scale-[1.01] -translate-y-1'
                    : 'bg-white text-black border border-neutral-200 shadow-md hover:border-black/30 hover:-translate-y-0.5'
                }`}
              >
                {/* Active Selection Badge on Top Right */}
                {isSelected && (
                  <div className="absolute -top-3.5 right-4 sm:right-8 px-3.5 py-1 rounded-full bg-black text-white text-[10px] font-mono tracking-widest uppercase border border-white/30 shadow-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Selected Course</span>
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
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
                    className={`h1 text-2xl sm:text-3xl mb-3 tracking-tight transition-colors ${
                      isSelected ? 'text-white' : 'text-black'
                    }`}
                  >
                    {prog.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 font-light transition-colors ${
                      isSelected ? 'text-neutral-300' : 'text-neutral-700'
                    }`}
                  >
                    {prog.description}
                  </p>

                  {/* Certification & Eligibility Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prog.certification && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          isSelected
                            ? 'bg-white/10 text-neutral-200 border border-white/10'
                            : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                        }`}
                      >
                        <Award className="w-3 h-3 text-emerald-400" />
                        <span>{prog.certification}</span>
                      </span>
                    )}
                    {prog.eligibility && (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          isSelected
                            ? 'bg-white/10 text-neutral-300 border border-white/10'
                            : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3 text-blue-400" />
                        <span>Eligibility: {prog.eligibility}</span>
                      </span>
                    )}
                  </div>

                  {/* Price Display */}
                  <div
                    className={`py-4 my-4 border-y flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 transition-colors ${
                      isSelected ? 'border-neutral-800' : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
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
                    <div
                      className={`text-xs font-medium transition-colors ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {prog.installments}
                    </div>
                  </div>

                  {/* Highlights list */}
                  <ul className="fl mb-8 space-y-2">
                    {prog.highlights.slice(0, 5).map((h, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm transition-colors ${
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
                    className={`w-full sm:flex-1 font-extrabold transition-all ${
                      isSelected ? '!bg-white !text-black shadow-[0_4px_20px_rgba(255,255,255,0.35)] scale-[1.02]' : ''
                    }`}
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

        {/* Student Kit & Zero Equipment Fees Guarantee Banner */}
        <div className="mt-12 rounded-3xl bg-neutral-50 border border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
                <Laptop className="w-4 h-4 text-black" />
                <span>Zero Hidden Fees · All Equipment Provided by Lenor Academy</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 mt-2 leading-relaxed font-light">
                {ACADEMY_INFO.studentKit.providedByAcademy} You do not need to purchase a camera or computer.
                Students are only asked to bring 3 personal items: <strong>1) External SSD/Hard Drive</strong>, <strong>2) Reusable Handling Gloves</strong> (gear sweat protection), and <strong>3) Personal Wired Headset</strong> (edit lab hygiene).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${ACADEMY_INFO.phone}`}
                className="btn btn-dark !h-10 text-xs px-5 !bg-black !text-white hover:!bg-neutral-800 w-full sm:w-auto text-center shadow-sm"
              >
                <span className="!text-white">Inquire Fees: {ACADEMY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </AnimatedContent>
  );
};

export default InvestmentSection;
