import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Compass, 
  Target, 
  Users, 
  Maximize2,
  FileCheck
} from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';
import { CertificateModal, CertificateData } from './CertificateModal';

interface AboutUsSectionProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

const CERTIFICATES: CertificateData[] = [
  {
    title: 'MESC & NSDC Skill India Accredited Certificate',
    subtitle: 'Media & Entertainment Skills Council under National Skill Development Corporation',
    issuer: 'Media & Entertainment Skills Council (MESC) · Skill India · NSDC',
    signatory: 'Dr. Shankar Mahadevan (Chairman, MESC)',
    badge: 'Government Accredited',
    image: '/assets/mesc-nsdc-certificate.jpg'
  },
  {
    title: 'ISO 9001:2015 & HRDS Skill India Certificate',
    subtitle: 'Human Resources Development Society & ISO 9001:2015 Certified Institute',
    issuer: 'Lenor Academy · HRDS · Skill India',
    signatory: 'Sisir Ghosh P (Academic Director, Lenor Academy)',
    badge: 'ISO 9001:2015 Certified',
    image: '/assets/iso-hrds-certificate.jpg'
  }
];

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ 
  onOpenEnrol, 
  onOpenBrochure 
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCert, setSelectedCert] = useState<CertificateData | null>(null);

  const slides = [
    {
      id: 'story',
      num: '01/05',
      tabLabel: 'Story & Legacy',
      category: 'ABOUT LENOR ACADEMY · EST. 2018',
      badge: '🏆 Kerala’s Only Institute with 525+ Active Students',
      title: 'Turning Creative Passion Into Careers',
      renderContent: () => (
        <div className="space-y-4 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-white font-medium">Lenor Academy</strong> is a professional Visual Media Training Institute established in 2018, located in <span className="text-white">Makkaraparamba, Malappuram, Kerala</span>, with an additional branch in <span className="text-white">Kochi</span>.
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm">
            We offer professional education and hands-on training in Photography, Videography, Cinematography, Video Editing, Photo Editing, Graphic Designing, Drone Operations and other creative media disciplines.
          </p>
          <p className="text-neutral-300 text-xs sm:text-sm">
            With <span className="text-white font-bold">3,000+ students trained</span> and <span className="text-white font-bold">525+ students currently enrolled</span>, Lenor Academy has grown into one of Kerala’s leading institutions for visual media education. Our goal is to turn creative passion into professional skills and successful careers.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Est. 2018
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              3,000+ Alumni
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
              525+ Active Students
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-200">
              Malappuram &amp; Kochi
            </span>
          </div>
        </div>
      ),
      image: '/assets/430e290e-ef97-4964-a65b-a23923adad3f.webp',
      imageAlt: 'Lenor Academy Makkaraparamba Campus',
      caption: 'Makkaraparamba Campus · 3 Specialized Branches + Kochi'
    },
    {
      id: 'founders',
      num: '02/05',
      tabLabel: 'Founders',
      category: 'LEADERSHIP & VISION',
      title: 'Meet The Founders',
      renderContent: () => (
        <div className="space-y-4 text-xs sm:text-sm font-light">
          {/* Faisal Babu K. */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase">
                Faisal Babu K.
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono">
                Army Veteran
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              Founder, Managing Director &amp; CEO
            </p>
            <p className="text-neutral-300 leading-relaxed text-xs">
              An Indian Army veteran and entrepreneur, Faisal Babu K. is the driving force behind Lenor Academy&apos;s strategic vision and institutional development. He oversees operations, academic rigor, and nationwide expansion with a focus on bridging education with industry.
            </p>
          </div>

          {/* Farshan K. */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm sm:text-base font-bold text-white uppercase">
                Farshan K.
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px] font-mono">
                BMMC Graduate
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-400">
              Co-Founder &amp; Director – Marketing &amp; Growth
            </p>
            <p className="text-neutral-300 leading-relaxed text-xs">
              With a background in multimedia and digital content creation (Lenor Weddings &amp; Lenor Entertainment), Farshan spearheads marketing, brand development, student outreach, and industry engagement across India.
            </p>
          </div>
        </div>
      ),
      image: '/assets/c67df096-6056-44dd-afb6-2447b7721e4a.webp',
      imageAlt: 'Lenor Academy Leadership & Convocation',
      caption: 'Leadership & Academic Convocation Guild'
    },
    {
      id: 'purpose',
      num: '03/05',
      tabLabel: 'Vision & Mission',
      category: 'CORE PURPOSE',
      title: 'Our Vision & Mission',
      renderContent: () => (
        <div className="space-y-4 text-xs sm:text-sm font-light">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase mb-1.5">
              <Compass className="w-4 h-4" />
              <span>Our Vision</span>
            </div>
            <p className="text-neutral-200 leading-relaxed text-xs sm:text-sm">
              To become a leading institution in visual media education by empowering aspiring creators with professional knowledge, creative skills, modern technology and industry experience.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase mb-1.5">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <p className="text-neutral-200 leading-relaxed text-xs sm:text-sm">
              To transform creative passion into professional careers through quality education, practical training and modern infrastructure.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 text-center">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mb-0.5">
              Official Motto
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
              LENOR ACADEMY – LEARN WHAT YOU LOVE®
            </span>
          </div>
        </div>
      ),
      image: '/assets/let-passion-drive-sunset.webp',
      imageAlt: 'Let passion drive your profession',
      caption: 'Let passion drive your profession · Learn what you love'
    },
    {
      id: 'facilities',
      num: '04/05',
      tabLabel: 'Facilities & Faculty',
      category: 'CAMPUS & INFRASTRUCTURE',
      title: 'Equipped For Industry',
      renderContent: () => (
        <div className="space-y-3 text-xs sm:text-sm font-light">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">180+ Computers</div>
              <div className="text-[11px] text-neutral-400">High-end PC editing lab</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">70+ Mirrorless</div>
              <div className="text-[11px] text-neutral-400">Sony &amp; Nikon cinema rigs</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">Studio Floor</div>
              <div className="text-[11px] text-neutral-400">Pro lighting &amp; video stage</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">Student Hostel</div>
              <div className="text-[11px] text-neutral-400">Boys &amp; dedicated girls stay</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">50+ Faculty Members &amp; Mentors</div>
              <div className="text-[11px] text-neutral-400">1-on-1 industry mentorship &amp; live practical field drills</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-neutral-400">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">📚 Library</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">❄️ Air-Conditioned</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">✨ Smart Classrooms</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">🚁 Drone Simulator Lab</span>
          </div>
        </div>
      ),
      image: '/assets/c01459e8-da36-4de6-bd3a-a062c8e3c669.webp',
      imageAlt: 'Lenor Academy Studio Lighting Floor',
      caption: 'Commercial Studio Lighting Stage & Practical Floors'
    },
    {
      id: 'certifications',
      num: '05/05',
      tabLabel: 'Certifications',
      category: 'GOVERNMENT RECOGNITION & PLACEMENT',
      badge: '100% Placement Guarantee on 1-Year MMP',
      title: 'Accredited Qualifications',
      renderContent: () => (
        <div className="space-y-3.5 text-xs sm:text-sm font-light">
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Lenor Academy provides accredited credentials recognized across India and abroad for overseas creative and media opportunities.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">NSDC</div>
              <div className="text-[10px] text-neutral-400 font-mono">National Skill Dev.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">Skill India</div>
              <div className="text-[10px] text-neutral-400 font-mono">Govt. of India</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="font-bold text-white">ISO 9001:2015</div>
              <div className="text-[10px] text-neutral-400 font-mono">Quality Certified</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5 text-xs text-neutral-200">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Career Assurance</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-300">
              • <strong className="text-white">100% Placement Guarantee</strong> for the 1-Year Professional MMP.<br />
              • <strong className="text-white">100% Placement Assistance</strong> for all other diploma &amp; certificate courses.<br />
              • Real-world commercial client project drills from Day 1.
            </p>
          </div>

          <p className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Click either certificate on the right to view full official document</span>
          </p>
        </div>
      ),
      image: '/assets/mesc-nsdc-certificate.jpg',
      imageAlt: 'Official MESC NSDC Skill India Certificate',
      caption: 'Official Accredited Certificate Formats'
    }
  ];

  const current = slides[activeSlide];

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section id="about-us" className="relative w-full bg-black text-white px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
        <AnimatedContent distance={30} duration={0.8} threshold={0.1} once={false}>
          {/* Main Storyboard Container */}
          <div className="max-w-6xl mx-auto rounded-3xl bg-neutral-950/70 border border-white/15 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-md">
            
            {/* Top Bar: Storyboard Tabs & Navigation Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
              {/* Storyboard Tab Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 shrink-0 ${
                      idx === activeSlide
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span>{s.num.split('/')[0]} · {s.tabLabel}</span>
                  </button>
                ))}
              </div>

              {/* Slider Controls (← / → and slide indicator) */}
              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                <span className="text-xs font-mono text-neutral-400 tracking-widest">
                  {current.num}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous story slide"
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next story slide"
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split Storyboard Grid (Left: Slider Story Text · Right: Dynamic Visual & Certificates) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-6 sm:pt-8 items-center">
              
              {/* LEFT COLUMN: STORYBOARD CONTENT SLIDER (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#a39c94]">
                      {current.category}
                    </span>
                  </div>

                  {current.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-3">
                      <span>{current.badge}</span>
                    </div>
                  )}

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-4">
                    {current.title}
                  </h3>

                  {/* Dynamic Slide Content */}
                  <div className="min-h-[220px]">
                    {current.renderContent()}
                  </div>
                </div>

                {/* Bottom Storyboard CTAs */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenEnrol?.('media-master')}
                    className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-md"
                  >
                    Enrol Now
                  </button>
                  {onOpenBrochure && (
                    <button
                      type="button"
                      onClick={onOpenBrochure}
                      className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      Download Brochure
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: VISUAL COMPANION & CERTIFICATES SHOWCASE (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* When on Slide 5 (Certifications) OR always accessible: Display Both Official Certificates */}
                {activeSlide === 4 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
                      <span>Official Accredited Certificates</span>
                      <span className="text-amber-300">Click to Inspect</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {CERTIFICATES.map((cert, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedCert(cert)}
                          className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 hover:border-amber-400/60 transition-all duration-300 cursor-pointer shadow-xl aspect-[3/4] flex flex-col"
                        >
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                            <span className="text-[10px] font-mono text-amber-300 font-bold uppercase block leading-tight">
                              {cert.badge}
                            </span>
                            <span className="text-[11px] text-white font-medium line-clamp-1 mt-0.5">
                              {cert.title}
                            </span>
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-300 font-mono">
                              <Maximize2 className="w-2.5 h-2.5 text-amber-300" />
                              <span>View Full Size</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Story Slide Visual with Floating Certificate Quick Access Badge */
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-white/10 shadow-2xl group">
                      <img
                        src={current.image}
                        alt={current.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[11px] text-neutral-300 font-mono">
                          {current.caption}
                        </span>
                      </div>
                    </div>

                    {/* Quick Access Strip: Official Certificates Preview Pill */}
                    <div 
                      onClick={() => setActiveSlide(4)}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                            Official Accreditations &amp; Certificates
                          </div>
                          <div className="text-[10px] text-neutral-400 font-mono">
                            MESC (NSDC) · Skill India · ISO 9001:2015
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-amber-300 shrink-0">
                        View ↗
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Lightbox Modal for Certificate Zoom Inspection */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
};

export default AboutUsSection;
