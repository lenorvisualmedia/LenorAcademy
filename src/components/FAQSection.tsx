import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { FAQS, FAQItem, ACADEMY_INFO } from '../data/academyData';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';

interface FAQSectionProps {
  onOpenEnrol?: () => void;
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenEnrol, className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0].id]); // First question open by default

  const categories = [
    'All',
    'Campuses & Travel',
    'Equipment & Labs',
    'Courses & Eligibility',
    'Placement & Career',
    'Fees & EMI',
    'Hostel & Food'
  ];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const toggleQuestion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <AnimatedContent distance={50} duration={0.8} threshold={0.1} className={className}>
      <section id="faqs" className="mt-16 bg-neutral-950 text-white rounded-[24px] p-6 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94]">
              <HelpCircle className="w-3.5 h-3.5 text-neutral-400" />
              <span>Official Guidance · FAQs</span>
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl text-white mt-3 font-black tracking-tight leading-[1.02]">
              Frequently Asked<br />Questions
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Authentic answers on our 3 Makkaraparamba campuses, Madavanna branch, equipment access, Bajaj EMI, stay facilities, and 100% placement assurance.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`https://wa.me/91${ACADEMY_INFO.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Admissions Counsellor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mt-8 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-6 space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-neutral-900/90 border-neutral-700 shadow-lg'
                    : 'bg-neutral-900/40 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleQuestion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs text-neutral-500 font-bold shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white text-black border-white' : 'text-neutral-400 bg-neutral-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-neutral-300 font-light leading-relaxed border-t border-neutral-800/60 mt-1">
                    <p className="mt-2 text-neutral-300">
                      {faq.answer}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-800 text-[10px] font-mono text-neutral-400 uppercase tracking-wider border border-neutral-700">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Assistance Card */}
        <div className="mt-12 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Have a specific question about batch dates or hostel?</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Visit CP Building, Makkaraparamba, Malappuram or call our admissions desk at {ACADEMY_INFO.phone}
              </div>
            </div>
          </div>

          {onOpenEnrol && (
            <PillButton
              variant="primary"
              size="sm"
              onClick={onOpenEnrol}
              className="shrink-0 w-full md:w-auto"
            >
              Enrol Now · 2026 Batch
            </PillButton>
          )}
        </div>
      </section>
    </AnimatedContent>
  );
};

export default FAQSection;
