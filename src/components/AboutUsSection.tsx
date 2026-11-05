import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Users, 
  Monitor, 
  Camera, 
  Building2, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  Target, 
  Film, 
  Wind, 
  Airplay, 
  MapPin, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';

interface AboutUsSectionProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ 
  onOpenEnrol, 
  onOpenBrochure 
}) => {
  return (
    <section id="about-us" className="relative w-full bg-black text-white px-4 sm:px-8 lg:px-12 py-12 sm:py-20">
      <AnimatedContent distance={40} duration={0.8} threshold={0.1} once={false}>
        {/* =========================================================================
            HEADER & KERALA RECORD BADGE
            ========================================================================= */}
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <span className="text-base sm:text-lg">🏆</span>
            <span>Kerala’s Only Institute with 525+ Active Photography Students</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 block">
              About Lenor Academy · Est. 2018
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              Turning Creative Passion Into Professional Careers
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto text-neutral-300 font-light text-base sm:text-lg leading-relaxed pt-2">
            <p>
              <strong className="text-white font-medium">Lenor Academy</strong> is a professional Visual Media Training Institute established in 2018, located in <span className="text-white">Makkaraparamba, Malappuram, Kerala</span>, with an additional branch in <span className="text-white">Kochi</span>.
            </p>
            <p className="text-neutral-400 text-sm sm:text-base">
              We offer professional education and hands-on training in Photography, Videography, Cinematography, Video Editing, Photo Editing, Graphic Designing, Drone Operations and other creative media disciplines.
            </p>
            <p className="text-neutral-300 text-sm sm:text-base">
              With <span className="text-white font-bold">3,000+ students trained</span> and <span className="text-white font-bold">525+ students currently enrolled</span>, Lenor Academy has grown into one of Kerala’s leading institutions for visual media education. Our goal is to turn creative passion into professional skills and successful careers.
            </p>
          </div>
        </div>

        {/* =========================================================================
            WHY CHOOSE LENOR ACADEMY? (KEY FAST FACTS GRID)
            ========================================================================= */}
        <div className="mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                Excellence In Numbers
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Why Choose Lenor Academy?
              </h3>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              Makkaraparamba &amp; Kochi
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Established', value: '2018', sub: '6+ Years Experience' },
              { label: 'Students Trained', value: '3,000+', sub: 'Graduated Alumni' },
              { label: 'Active Students', value: '525+', sub: "Kerala's #1 Cohort" },
              { label: 'Faculty Members', value: '50+', sub: 'Industry Professionals' },
              { label: 'Computer Lab', value: '180+', sub: 'Dedicated Workstations' },
              { label: 'Mirrorless Cameras', value: '70+', sub: 'Sony & Nikon Rigs' },
              { label: 'Placement Support', value: '100%', sub: 'Guaranteed on 1-Yr MMP' },
              { label: 'Campus Locations', value: '2 Hubs', sub: 'Malappuram & Kochi' },
            ].map((fact, i) => (
              <div 
                key={i} 
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:scale-105 transition-transform duration-300 origin-left">
                  {fact.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-200 mt-1">
                  {fact.label}
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  {fact.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            FOUNDERS SHOWCASE
            ========================================================================= */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
              Leadership
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">
              Meet The Founders
            </h3>
            <p className="text-sm text-neutral-400 mt-2 font-light">
              Guiding Lenor Academy’s strategic vision, academic rigor, and creative excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Faisal Babu K. */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 relative overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Faisal Babu K.
                  </h4>
                  <p className="text-xs sm:text-sm font-mono font-medium text-amber-300 mt-0.5">
                    Founder, Managing Director &amp; CEO
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-neutral-300 shrink-0">
                  Indian Army Veteran
                </span>
              </div>

              <div className="space-y-3 text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  An Indian Army veteran and entrepreneur, Faisal Babu K. is the driving force behind Lenor Academy&apos;s strategic vision and institutional development. With a strong commitment to excellence in creative media education, he oversees the academy&apos;s operations, academic development, and long-term expansion.
                </p>
                <p className="text-neutral-400 pt-1 border-t border-white/10">
                  His leadership is focused on bridging the gap between education and industry through practical, career-oriented training, while building Lenor Academy into a recognized institution for creative media education across India.
                </p>
              </div>
            </div>

            {/* Farshan K. */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 relative overflow-hidden group hover:border-white/30 transition-all duration-300 shadow-xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Farshan K.
                  </h4>
                  <p className="text-xs sm:text-sm font-mono font-medium text-amber-300 mt-0.5">
                    Co-Founder &amp; Director – Marketing &amp; Growth
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-neutral-300 shrink-0">
                  BMMC Graduate
                </span>
              </div>

              <div className="space-y-3 text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                <p>
                  Farshan K. holds a Bachelor&apos;s degree in Multimedia Communication (BMMC) and brings a strong creative background in digital media, content production, and brand development.
                </p>
                <p>
                  As a digital content creator associated with Lenor Weddings and Lenor Entertainment, he has gained valuable experience in digital storytelling, audience engagement, and creative media production.
                </p>
                <p className="text-neutral-400 pt-1 border-t border-white/10">
                  At Lenor Academy, he spearheads marketing, brand development, student outreach, and growth initiatives, connecting aspiring media professionals with industry-focused education.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VISION & MISSION DUAL CARDS
            ========================================================================= */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Vision */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
              Guiding Principle
            </span>
            <h4 className="text-xl sm:text-2xl font-black uppercase text-white mt-1 mb-3">
              Our Vision
            </h4>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              To become a leading institution in visual media education by empowering aspiring creators with professional knowledge, creative skills, modern technology and industry experience.
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
              <Target className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
              Core Purpose
            </span>
            <h4 className="text-xl sm:text-2xl font-black uppercase text-white mt-1 mb-3">
              Our Mission
            </h4>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              To transform creative passion into professional careers through quality education, practical training and modern infrastructure.
            </p>
          </div>
        </div>

        {/* =========================================================================
            CAMPUS, FACILITIES & FACULTY HIGHLIGHTS
            ========================================================================= */}
        <div className="mt-16 sm:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                Infrastructure
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Campus &amp; Facilities
              </h3>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              Equipped For Industry Standards
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Monitor, title: 'Advanced Computer Lab', desc: '180+ high-performance editing workstations' },
              { icon: Camera, title: '70+ Mirrorless Cameras', desc: 'Sony & Nikon cinema & photo rigs for hands-on drills' },
              { icon: Film, title: 'Pro Production Studio', desc: 'Commercial photography & videography lighting floor' },
              { icon: Building2, title: 'Student Hostel Facility', desc: 'Safe accommodations for boys & dedicated girls hostel' },
              { icon: BookOpen, title: 'Creative Media Library', desc: 'Curated references, art books & visual magazines' },
              { icon: Airplay, title: 'Smart Classrooms', desc: 'Audio-visual enabled interactive presentation suites' },
              { icon: Wind, title: 'Air-Conditioned Suites', desc: 'Full-comfort climate controlled practical labs' },
              { icon: Sparkles, title: 'Pro Equipment Arsenal', desc: 'Cinema lenses, gimbals, drones, and studio strobes' },
            ].map((fac, idx) => {
              const IconComp = fac.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white leading-snug">
                      {fac.title}
                    </h5>
                    <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Our Faculty Callout Banner */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <Users className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                  Mentorship
                </span>
                <h4 className="text-lg sm:text-xl font-black uppercase text-white">
                  Our Faculty Guild · 50+ Professionals
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1">
                  A team of 50+ faculty members and active industry professionals guides students in building technical expertise, creative instincts, and real-world commercial knowledge.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-200">
                1-on-1 Mentorship
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-neutral-200">
                Live Field Shoots
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CERTIFICATIONS & PLACEMENT SUPPORT
            ========================================================================= */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Certifications & Affiliations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Government &amp; Global Standards</span>
              </div>
              <h4 className="text-2xl font-black uppercase text-white mt-2 mb-4">
                Certifications &amp; Affiliations
              </h4>
              <p className="text-sm text-neutral-300 font-light mb-6">
                Accredited qualifications providing national and international credential recognition for career mobility and overseas opportunities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-base font-black text-white">NSDC</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">National Skill Dev. Corp.</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-base font-black text-white">Skill India</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">Government of India</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-base font-black text-white">ISO Certified</div>
                  <div className="text-[11px] text-neutral-400 mt-1 font-mono">Quality Management</div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Development & Placement Support */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                <Briefcase className="w-4 h-4 text-amber-300" />
                <span>Career Assurance</span>
              </div>
              <h4 className="text-2xl font-black uppercase text-white mt-2 mb-4">
                Placement &amp; Career Development
              </h4>

              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 font-light">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white font-medium">100% Placement Guarantee</strong> for the 1-Year Professional Course (Media Master Programme).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white font-medium">100% Placement Assistance</strong> for all other diploma &amp; certificate courses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Practical, hands-on commercial project drills from Day 1.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Career guidance, resume building, and professional skill development.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Internship placements and real-world commercial client project exposure.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OUR COURSES QUICK ROSTER
            ========================================================================= */}
        <div className="mt-16 sm:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
                Curriculum
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Our Courses
              </h3>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              7 Industry-Calibrated Programmes
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { num: '01', code: 'MMP', title: 'MMP – Media Master Programme', duration: '12 Months', fee: '₹ 1,49,000', tag: 'Flagship · 100% Placement Guarantee' },
              { num: '02', code: 'VMP', title: 'VMP – Visual Media Production', duration: '6 Months', fee: '₹ 65,220', tag: 'Diploma · Camera & Post Accelerator' },
              { num: '03', code: 'MDEP', title: 'Media Design and Editing Professional', duration: '6 Months', fee: '₹ 64,000', tag: 'Combined Design & Video Suite' },
              { num: '04', code: 'EGDC', title: 'Editing Course / Graphic Designing Course', duration: '3 Months', fee: '₹ 34,000', tag: 'Fast-Track Professional Diploma' },
              { num: '05', code: 'PHOTO', title: '2-Month Course (Photography)', duration: '2 Months', fee: '₹ 22,420', tag: 'Hands-On Studio & Commercial' },
              { num: '06', code: 'VIDEO', title: '6-Day Videography Course', duration: '6 Days', fee: '₹ 8,600', tag: 'Intensive Camera & Gimbal Sprint' },
              { num: '07', code: 'DRONE', title: '5-Day Drone Course', duration: '5 Days', fee: '₹ 5,990', tag: 'Simulator Lab & Live Outdoor DGCA' },
            ].map((course) => (
              <div 
                key={course.num}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      {course.num}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-bold text-amber-300">
                        {course.fee}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-neutral-300">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 font-mono">
                    {course.tag}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Fee: {course.fee}/-
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenEnrol?.(course.code.toLowerCase())}
                    className="text-xs text-white hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Enrol</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM MOTTO BANNER: "LENOR ACADEMY – LEARN WHAT YOU LOVE"
            ========================================================================= */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-white/15 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#a39c94]">
              Official Motto
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              LENOR ACADEMY – LEARN WHAT YOU LOVE®
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto">
              Makkaraparamba Main Branch (North, South &amp; Studio Campuses) · Kochi Branch
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <PillButton
              variant="primary"
              size="md"
              onClick={() => onOpenEnrol?.('media-master')}
            >
              Enrol Now
            </PillButton>
            {onOpenBrochure && (
              <PillButton
                variant="ghost"
                size="md"
                onClick={onOpenBrochure}
              >
                Download Official Brochure
              </PillButton>
            )}
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
};

export default AboutUsSection;
