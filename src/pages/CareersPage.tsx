import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Mail, Send, X } from 'lucide-react';
import { JOB_OPENINGS, JobOpening, ACADEMY_INFO } from '../data/academyData';
import { AnimatedContent } from '../components/AnimatedContent';
import { InvestmentSection } from '../components/InvestmentSection';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface CareersPageProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  onOpenEnrol = () => {},
  onOpenBrochure = () => {}
}) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleReset = () => {
    setAppliedSuccess(false);
    setSelectedJob(null);
    setApplicantName('');
    setApplicantEmail('');
    setPortfolioLink('');
  };

  useModalScrollLock(!!selectedJob, handleReset);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSuccess(true);
  };

  return (
    <div className="space-y-12">
      {/* Application Modal */}
      {selectedJob && typeof document !== 'undefined' && createPortal(
        <div 
          data-lenor-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={handleReset}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div 
            className="relative w-full max-w-lg !bg-white !text-black border border-neutral-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain minimal-scrollbar"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {appliedSuccess ? (
              <div className="py-6 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="h1 text-2xl text-black mb-2">Application Submitted!</h3>
                <p className="text-sm text-neutral-700 max-w-xs mb-6">
                  Thank you, {applicantName}. Our academic dean will review your portfolio for the <strong>{selectedJob.title}</strong> role and reach out to {applicantEmail}.
                </p>
                <button onClick={handleReset} className="btn w-full !h-10 text-xs bg-black text-white hover:bg-neutral-800">
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="eye text-neutral-600 mb-1">Apply for Position</div>
                <h3 className="h1 text-2xl text-black mb-1">{selectedJob.title}</h3>
                <div className="text-xs text-neutral-600 mb-4">{selectedJob.type} · {selectedJob.location}</div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 mb-5 space-y-1.5">
                  <div className="font-bold text-black mb-1">Requirements:</div>
                  {selectedJob.requirements.map((r, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-neutral-700">
                      <span>•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleApply} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Suhail K."
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Portfolio URL / Showreel Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      placeholder="https://instagram.com/... or Vimeo/Behance"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-black placeholder-neutral-500 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="btn w-full !h-10 text-xs font-bold bg-black text-white hover:bg-neutral-800">
                      <Send className="w-3.5 h-3.5 mr-1" />
                      Send Faculty Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* HEADER HERO SECTION */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.85}
      >
        <section className="card relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-end p-8 sm:p-14 overflow-hidden border border-[#262626]">
          <img
            src="/assets/8ba53ea25eca22da1f3017b76d4e1868.webp"
            alt="Film camera on a tripod"
            className="absolute right-0 top-0 h-full w-full sm:w-[50%] object-cover gs brightness-75 hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="eye text-neutral-400">Careers</div>
            <h1 className="h1 text-5xl sm:text-7xl lg:text-[100px] text-white mt-4 leading-[0.92]">
              Make a living behind the lens
            </h1>
            <p className="lead text-xl sm:text-3xl text-neutral-300 mt-6 font-light max-w-lg leading-relaxed">
              Where a Lenor education can take you, and how to join the team that teaches it.
            </p>
          </div>
        </section>
      </AnimatedContent>

      {/* TICKER */}
      <AnimatedContent distance={20} duration={0.6}>
        <div className="relative w-full overflow-hidden border-y border-[#262626] py-3.5 bg-[#101010]">
          <div className="animate-marquee flex items-center gap-8">
            {[
              'Photographer',
              'Videographer',
              'Video Editor',
              'Motion Designer',
              'Graphic Designer',
              'Drone Operator',
              'Content Creator',
              'Photographer',
              'Videographer'
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-xs font-extrabold tracking-widest uppercase text-neutral-400">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedContent>

      {/* SIX CRAFTS. SIX WAYS TO EARN */}
      <section className="px-4 sm:px-10 pt-4">
        <AnimatedContent distance={40} duration={0.7} threshold={0.15}>
          <div className="eye text-[#8a8a8a]">Career paths</div>
          <h2 className="h1 text-4xl sm:text-6xl text-white mt-1 mb-8 max-w-2xl">
            Six crafts. Six ways to earn.
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          duration={0.8}
          stagger={0.08}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Photography</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Photographer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Portrait, product, wedding, travel, wildlife, food. Or launching your own studio space.
            </p>
          </div>

          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Videography</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Videographer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Cinematography, short films, automotive commercials, music videos, and drone work.
            </p>
          </div>

          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Video Editing</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Video Editor
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Reels, wedding teasers, commercial highlights, musical albums, and long-form feature edits.
            </p>
          </div>

          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Photo Editing</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Retoucher
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              High-end frequency separation, skin tones, color grading and batch catalog editing in Photoshop.
            </p>
          </div>

          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Graphic Design</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Graphic Designer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Brand systems, vector illustrations, editorial typography, and client social media identities.
            </p>
          </div>

          <div className="card p-8 !bg-white !text-black border border-neutral-200 hover:border-black/30 transition-all shadow-md">
            <div className="eye text-neutral-600">Motion Graphics</div>
            <h3 className="h1 text-2xl sm:text-3xl text-black mt-2 mb-3">
              Motion Designer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
              Animated title sequences, kinetic typography, promotional explainer videos in After Effects.
            </p>
          </div>
        </AnimatedContent>
      </section>

      {/* WORK WITH US / OPEN ROLES */}
      <section className="px-4 sm:px-10 pt-10">
        <AnimatedContent distance={40} duration={0.7} threshold={0.15}>
          <div className="eye text-[#8a8a8a]">Work with us</div>
          <h2 className="h1 text-4xl sm:text-6xl text-white mt-1 mb-8">
            Open faculty & staff roles
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={30}
          duration={0.75}
          stagger={0.09}
          threshold={0.1}
          className="divide-y divide-[#262626]"
        >
          {JOB_OPENINGS.map((job) => (
            <div
              key={job.id}
              className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] px-4 rounded-xl transition-colors"
            >
              <div className="md:w-80">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {job.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Craft: {job.craft}
                </div>
              </div>

              <div className="text-xs font-semibold text-neutral-300">
                {job.type}
              </div>

              <div className="text-xs text-neutral-400">
                📍 {job.location}
              </div>

              <div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="btn ghost !h-9 !px-5 text-xs font-bold"
                >
                  Apply For Role
                </button>
              </div>
            </div>
          ))}
        </AnimatedContent>

        {/* Speculative inquiry */}
        <AnimatedContent distance={40} duration={0.75} threshold={0.15}>
          <div className="mt-12 p-8 rounded-2xl !bg-white !text-black border border-neutral-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-black text-lg text-black">Don't see your specific role?</h4>
              <p className="text-xs sm:text-sm text-neutral-700 font-light mt-1">
                We are constantly scouting visionary guest mentors, masterclass leads, and lab technicians.
              </p>
            </div>
            <a
              href={`mailto:${ACADEMY_INFO.careersEmail}`}
              className="btn !h-10 !px-5 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 bg-black text-white hover:bg-neutral-800"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Portfolio to Careers</span>
            </a>
          </div>
        </AnimatedContent>
      </section>

      {/* THE INVESTMENT & PROGRAMMES SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />
    </div>
  );
};
