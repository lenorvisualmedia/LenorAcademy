import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  ArrowUpRight, 
  Award, 
  ShieldCheck, 
  Check, 
  Maximize2, 
  X,
  Compass,
  Target,
  Quote,
  Sparkles
} from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';
import { useModalScrollLock } from '../utils/modalScrollLock';
import { FACULTY_MENTORS } from '../data/academyData';

interface AboutUsSectionProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

interface ImageLightboxData {
  title: string;
  subtitle: string;
  image: string;
  category: 'certificate' | 'press' | 'campus';
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ 
  onOpenEnrol, 
  onOpenBrochure 
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageLightboxData | null>(null);

  // Lock background scroll and pause Lenis when inspecting an image/certificate
  useModalScrollLock(!!selectedImage, () => setSelectedImage(null));

  return (
    <div id="about" className="relative w-full bg-black text-white selection:bg-black selection:text-white space-y-12 sm:space-y-16">
      
      {/* =========================================================================
          1. HERO IDENTITY & STATS (SPLIT INTO MODULAR WHITE BOXES)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="space-y-6">
          {/* Main Hero Card: White with Black Text */}
          <section className="relative overflow-hidden rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-16 shadow-2xl border border-neutral-100">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              About us · Established 2018
            </div>

            <h1 className="h1 text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black leading-[0.94] mt-4">
              About<br />Lenor Academy
            </h1>

            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg">
              <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Kerala’s only institute with 525+ active photography students</span>
            </div>

            <p className="mt-8 max-w-4xl text-xl sm:text-2xl lg:text-[30px] font-light leading-snug text-neutral-800">
              Lenor Academy is a professional Visual Media Training Institute established in 2018, located in Makkaraparamba, Malappuram, Kerala, with an additional branch in Kochi.
            </p>
          </section>

          {/* 4 Distinct Stat Boxes (Modular Grid) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                2018
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Established
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                3,000+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Students trained
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-amber-600 leading-none">
                525+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Active students
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                50+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Faculty members
              </span>
            </div>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          2. CAMPUS PHOTOGRAPH & OVERVIEW PHILOSOPHY (SPLIT BOXES)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Box 1: Building Photo (7 Cols) */}
          <div 
            className="lg:col-span-7 relative overflow-hidden rounded-[24px] bg-neutral-900 border border-neutral-800 min-h-[300px] sm:min-h-[420px] shadow-2xl group cursor-pointer"
            onClick={() => setSelectedImage({
              title: "Lenor Academy Campus",
              subtitle: "Makkaraparamba Main Branch · Malappuram, Kerala",
              image: "/assets/7f6583831c0a3ad672c824faff60557a.jpg",
              category: "campus"
            })}
          >
            <img 
              src="/assets/7f6583831c0a3ad672c824faff60557a.jpg" 
              alt="Lenor Academy building at Makkaraparamba" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                Makkaraparamba Main Campus
              </span>
              <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand Photo</span>
              </span>
            </div>
          </div>

          {/* Box 2: Institutional Story Card (5 Cols, White with Black Text) */}
          <div className="lg:col-span-5 rounded-[24px] bg-white text-black p-8 sm:p-10 shadow-2xl border border-neutral-100 flex flex-col justify-center space-y-5">
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-500">
              Visual Media Excellence
            </div>
            <p className="text-neutral-800 text-lg sm:text-xl font-light leading-relaxed">
              We offer professional education and hands-on training in Photography, Videography, Cinematography, Video Editing, Photo Editing, Graphic Designing, Drone Operations and other creative media disciplines.
            </p>
            <p className="text-neutral-800 text-lg sm:text-xl font-light leading-relaxed">
              With 3,000+ students trained and 525+ students currently enrolled, Lenor Academy has grown into one of Kerala’s leading institutions for visual media education. Our goal is to turn creative passion into professional skills and successful careers.
            </p>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          3. FOUNDERS: TWO DISTINCT WHITE BOXES WITH BLACK TEXT
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="space-y-6">
          <div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-neutral-400">
              Founders
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              The people behind it
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Faisal Babu K. */}
            <article className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-300 border border-neutral-100">
              <div>
                <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-neutral-500 mb-2 flex items-center justify-between">
                  <span>Founder, Managing Director &amp; CEO</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 text-[10px] font-mono font-extrabold uppercase border border-amber-500/30">
                    Army Veteran
                  </span>
                </div>
                <h3 className="h1 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black tracking-tight mt-1">
                  Faisal Babu K.
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
                  <p>
                    An Indian Army veteran and entrepreneur, Faisal Babu K. is the driving force behind Lenor Academy&apos;s strategic vision and institutional development. With a strong commitment to excellence in creative media education, he oversees the academy&apos;s operations, academic development, and long-term expansion.
                  </p>
                  <p>
                    His leadership is focused on bridging the gap between education and industry through practical, career-oriented training, while building Lenor Academy into a recognized institution for creative media education across India.
                  </p>
                </div>
              </div>
            </article>

            {/* Box 2: Farshan K. */}
            <article className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl flex flex-col justify-between space-y-6 hover:scale-[1.01] transition-transform duration-300 border border-neutral-100">
              <div>
                <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-neutral-500 mb-2 flex items-center justify-between">
                  <span>Co-Founder &amp; Director – Marketing &amp; Growth</span>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-900 text-[10px] font-mono font-extrabold uppercase border border-neutral-300">
                    BMMC Graduate
                  </span>
                </div>
                <h3 className="h1 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black tracking-tight mt-1">
                  Farshan K.
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
                  <p>
                    Farshan K. holds a Bachelor&apos;s degree in Multimedia Communication (BMMC) and brings a strong creative background in digital media, content production, and brand development.
                  </p>
                  <p>
                    As a digital content creator associated with Lenor Weddings and Lenor Entertainment, he has gained valuable experience in digital storytelling, audience engagement, and creative media production.
                  </p>
                  <p>
                    At Lenor Academy, he spearheads marketing, brand development, student outreach, and growth initiatives. His combination of creative expertise and business insight contributes to strengthening the academy&apos;s presence and connecting aspiring media professionals with industry-focused education.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          4. CAMPUS & FACILITIES: SPLIT BOXES (WHITE WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left Box: Studio Shoot Photo */}
          <div 
            className="relative rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[360px] sm:min-h-[460px] shadow-2xl group cursor-pointer"
            onClick={() => setSelectedImage({
              title: "Commercial Photography & Lighting Studio",
              subtitle: "Makkaraparamba Studio Floor · Hands-on student drills",
              image: "/assets/9721af4bdf4cbc55776654e88360b40a.jpg",
              category: "campus"
            })}
          >
            <img 
              src="/assets/9721af4bdf4cbc55776654e88360b40a.jpg" 
              alt="Studio shoot with lights and a model" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                Practical Studio Stage
              </span>
              <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </span>
            </div>
          </div>

          {/* Right Box: Facilities Checklist Card (White with Black Text) */}
          <div className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl border border-neutral-100 flex flex-col justify-center">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              Campus &amp; facilities
            </div>
            <h2 className="h1 text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-black tracking-tight leading-[0.98] mt-3 mb-6">
              Built for hands-on learning
            </h2>
            <ul className="space-y-0 divide-y divide-neutral-200 border-t border-neutral-200 text-base sm:text-lg font-bold text-neutral-900">
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Advanced computer lab with 180+ computers</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>70+ mirrorless cameras for practical training</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Professional photography and videography studio</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Student hostel facility</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Library</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Smart classrooms</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Air-conditioned classrooms</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-3.5 sm:py-4 flex items-center justify-between">
                <span>Professional photography and videography equipment</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
            </ul>

            <div className="pt-6 mt-2 border-t border-neutral-200 flex items-center justify-between">
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black hover:text-amber-600 transition-colors group"
              >
                <span>Tour Full Campus &amp; Gear Fleet</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-600 transition-colors" />
              </Link>
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline-block">
                Makkaraparamba &amp; Kochi
              </span>
            </div>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          5. OUR COURSES: DISTINCT WHITE BOX WITH BLACK TEXT
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-14 shadow-2xl border border-neutral-100">
          <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
            Our courses
          </div>
          <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-black tracking-tight leading-[0.95] mt-2 mb-8">
            Seven ways in
          </h2>

          <div className="divide-y divide-neutral-200 border-t border-neutral-200">
            {[
              { num: '01', title: 'MMP – Media Master Programme', duration: '12 Months', id: 'media-master' },
              { num: '02', title: 'VMP – Visual Media Production', duration: '6 Months', id: 'visual-media-production' },
              { num: '03', title: 'Media Design & Editing Professional', duration: '6 Months', id: 'media-designing-editing' },
              { num: '04', title: 'Editing & Graphic Designing Course', duration: '3 Months', id: 'diploma-graphic-designing' },
              { num: '05', title: 'Photography Course', duration: '2 Months', id: 'photography-videography-course' },
              { num: '06', title: 'Videography Course', duration: '6 Days', id: 'videography-crash-course' },
              { num: '07', title: 'Drone Course', duration: '5 Days', id: 'drone-course' },
            ].map((course) => (
              <div 
                key={course.num}
                onClick={() => onOpenEnrol?.(course.id)}
                className="grid grid-cols-[60px_1fr_auto] sm:grid-cols-[90px_1fr_auto] gap-4 sm:gap-6 items-center py-5 sm:py-6 hover:bg-neutral-50 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-all cursor-pointer group"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tighter text-black group-hover:text-amber-600 transition-colors">
                  {course.num}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-black group-hover:translate-x-1 transition-transform">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black text-white rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap group-hover:bg-amber-600 transition-colors">
                    {course.duration}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          6. FACULTY: SPLIT BOXES (WHITE WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Box 1: 50+ Mentors Metric Card */}
          <div className="rounded-[24px] bg-white text-black p-8 sm:p-14 shadow-2xl border border-neutral-100 flex flex-col justify-center space-y-4">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              Our faculty
            </div>
            <h2 className="h1 text-7xl sm:text-9xl lg:text-[130px] font-black text-black leading-none tracking-tight">
              50+
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-700 font-light leading-relaxed max-w-xl">
              A team of 50+ faculty members and industry professionals guides students in building technical expertise, creative skills and real-world knowledge.
            </p>
          </div>

          {/* Box 2: Convocation Batch Photo Card */}
          <div 
            className="relative rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800 min-h-[340px] sm:min-h-[460px] shadow-2xl group cursor-pointer"
            onClick={() => setSelectedImage({
              title: "Lenor Academy Graduating Batch",
              subtitle: "Academic convocation & alumni guild",
              image: "/assets/dd4a6257b20611c9381a2ec6e732b1ec.jpg",
              category: "campus"
            })}
          >
            <img 
              src="/assets/dd4a6257b20611c9381a2ec6e732b1ec.jpg" 
              alt="Lenor Academy graduating batch in gowns" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                Annual Convocation Batch
              </span>
              <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </span>
            </div>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          6B. OUR MENTORS: CORE INSTRUCTIONAL LEADERSHIP (WHITE BOXES WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="space-y-6">
          <div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-neutral-400">
              Our Mentors
            </div>
            <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Learn from industry leaders
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-light mt-2 max-w-2xl">
              Experienced practitioners and department heads guiding your hands-on drills, camera operations, creative lighting, and post-production workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {FACULTY_MENTORS.map((mentor) => (
              <article 
                key={mentor.id}
                className="rounded-[24px] bg-white text-black p-6 sm:p-10 shadow-2xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 space-y-6"
              >
                <div>
                  {/* Photo & Identity Header */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pb-6 border-b border-neutral-200">
                    <div 
                      className="sm:col-span-5 relative rounded-2xl overflow-hidden bg-neutral-100 aspect-[3/4] shadow-md group/img cursor-pointer border border-neutral-200"
                      onClick={() => setSelectedImage({
                        title: mentor.name,
                        subtitle: `${mentor.designation} · Lenor Academy`,
                        image: mentor.image,
                        category: "campus"
                      })}
                    >
                      <img 
                        src={mentor.image} 
                        alt={mentor.name}
                        className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-2">
                        <span className="px-3 py-1.5 rounded-full bg-black/80 text-white text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Expand</span>
                        </span>
                      </div>
                    </div>

                    <div className="sm:col-span-7 flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 text-[10px] font-mono font-extrabold uppercase border border-amber-500/30">
                          {mentor.experience}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                            mentor.designation.includes('Vice Principal')
                              ? 'bg-neutral-900 text-white border-neutral-800'
                              : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                          }`}
                        >
                          {mentor.designation.includes('Vice Principal')
                            ? 'Vice Principal'
                            : mentor.designation.includes('HOD')
                              ? 'HOD'
                              : mentor.designation.includes('Lecturer')
                                ? 'Lecturer'
                                : mentor.designation.toLowerCase().includes('soft skill')
                                  ? 'Soft Skill Faculty'
                                  : 'Senior Instructor'}
                        </span>
                      </div>

                      <h3 className="h1 text-2xl sm:text-3xl font-black uppercase text-black tracking-tight mt-1">
                        {mentor.name}
                      </h3>

                      <div className="text-xs sm:text-sm font-bold text-neutral-600 uppercase tracking-wider">
                        {mentor.designation}
                      </div>

                      {/* Mentor Quote */}
                      <blockquote className="mt-2.5 p-3.5 rounded-xl bg-neutral-50 border-l-2 border-black text-xs sm:text-sm italic text-neutral-800 leading-relaxed font-serif">
                        &ldquo;{mentor.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>

                  {/* Specialisation Section */}
                  <div className="mt-6 space-y-3">
                    <div className="text-[11px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
                      Specialisation &amp; Focus Areas
                    </div>
                    {mentor.specialisationText && (
                      <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                        {mentor.specialisationText}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mentor.specialisations.map((spec, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900 text-[11px] sm:text-xs font-medium border border-neutral-200"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Software & Tools Expertise Footer */}
                <div className="pt-6 border-t border-neutral-200">
                  <div className="text-[10px] font-extrabold tracking-[0.16em] uppercase text-neutral-500 mb-2.5">
                    Software &amp; Tools Expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mentor.tools.map((tool, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-black text-white text-[11px] font-mono font-bold uppercase tracking-wider"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          7. CERTIFICATIONS & AFFILIATIONS (WHITE BOX WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-14 shadow-2xl border border-neutral-100">
          <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
            Certifications &amp; affiliations
          </div>
          <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-black tracking-tight leading-[0.95] mt-2">
            Recognised, certified
          </h2>

          <div className="flex gap-2.5 sm:gap-3 flex-wrap mt-6">
            <span className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold font-mono uppercase tracking-wider">
              NSDC
            </span>
            <span className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold font-mono uppercase tracking-wider">
              Skill India
            </span>
            <span className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold font-mono uppercase tracking-wider">
              ISO Certification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* ISO 9001:2015 & HRDS Certificate Card */}
            <div 
              onClick={() => setSelectedImage({
                title: "ISO 9001:2015 & HRDS Skill India Certificate",
                subtitle: "Human Resources Development Society & ISO 9001:2015 Certified Institute",
                image: "/assets/9092412f1e562172ffc6ff80c098cf43.jpg",
                category: "certificate"
              })}
              className="rounded-[20px] bg-neutral-50 border border-neutral-200 p-4 sm:p-5 shadow-lg cursor-pointer group hover:border-black transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center aspect-[1/1.38]">
                <img 
                  src="/assets/9092412f1e562172ffc6ff80c098cf43.jpg" 
                  alt="Lenor Academy ISO certificate" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to inspect certificate</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 px-1 flex items-center justify-between text-neutral-900 text-xs font-mono font-bold">
                <span>ISO 9001:2015 &amp; HRDS</span>
                <span className="text-neutral-500">Official Document ↗</span>
              </div>
            </div>

            {/* Media and Entertainment Skills Council & NSDC Certificate Card */}
            <div 
              onClick={() => setSelectedImage({
                title: "MESC & NSDC Skill India Accredited Certificate",
                subtitle: "Media & Entertainment Skills Council under National Skill Development Corporation",
                image: "/assets/e3325af456a8223afae4551328ad48fa.jpg",
                category: "certificate"
              })}
              className="rounded-[20px] bg-neutral-50 border border-neutral-200 p-4 sm:p-5 shadow-lg cursor-pointer group hover:border-black transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-white flex items-center justify-center aspect-[1/1.38]">
                <img 
                  src="/assets/e3325af456a8223afae4551328ad48fa.jpg" 
                  alt="Certificate issued with the Media and Entertainment Skills Council, Skill India and NSDC" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to inspect certificate</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 px-1 flex items-center justify-between text-neutral-900 text-xs font-mono font-bold">
                <span>MESC &amp; NSDC Skill India</span>
                <span className="text-neutral-500">Official Document ↗</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          8. CAREER DEVELOPMENT & PLACEMENT SUPPORT (WHITE BOX WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-14 lg:p-16 shadow-2xl border border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
                Career development &amp; placement support
              </div>
              <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-black tracking-tight leading-[0.98] mt-3">
                From first frame to first job
              </h2>
            </div>

            <ul className="divide-y divide-neutral-200 border-t border-neutral-200 text-base sm:text-lg font-bold text-neutral-900">
              <li className="py-4 flex items-center justify-between">
                <span>100% Placement Guarantee for the 1-Year Professional Course.</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-4 flex items-center justify-between">
                <span>100% Placement Assistance for all other courses.</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-4 flex items-center justify-between">
                <span>Practical, hands-on training.</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-4 flex items-center justify-between">
                <span>Career guidance and professional skill development.</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
              <li className="py-4 flex items-center justify-between">
                <span>Internship and real-world project exposure.</span>
                <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-3" />
              </li>
            </ul>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          9. OUR VISION & OUR MISSION: TWO SEPARATE WHITE BOXES
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Vision */}
          <article className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl border border-neutral-100 flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform">
            <div>
              <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-amber-700 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Our vision</span>
              </div>
              <p className="text-2xl sm:text-3xl font-light leading-snug text-neutral-900">
                To become a leading institution in visual media education by empowering aspiring creators with professional knowledge, creative skills, modern technology and industry experience.
              </p>
            </div>
          </article>

          {/* Box 2: Mission */}
          <article className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl border border-neutral-100 flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-transform">
            <div>
              <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-emerald-700 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Our mission</span>
              </div>
              <p className="text-2xl sm:text-3xl font-light leading-snug text-neutral-900">
                To transform creative passion into professional careers through quality education, practical training and modern infrastructure.
              </p>
            </div>
          </article>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          10. FEATURED IN: SUCCESS KERALA (SPLIT SCAN BOXES)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="space-y-6">
          <div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-neutral-400">
              Featured in
            </div>
            <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Success Kerala
            </h2>
            <p className="text-lg text-neutral-400 font-light mt-2">
              Youth Story · Lenor Academy in the press
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Press Scan 1 */}
            <div 
              onClick={() => setSelectedImage({
                title: "Success Kerala — Youth Story Feature",
                subtitle: "Lenor Academy headline profile and institutional milestone",
                image: "/assets/727669df5799659827b14fae6ea587ef.jpg",
                category: "press"
              })}
              className="rounded-[24px] overflow-hidden bg-white p-3 shadow-2xl cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] rounded-xl bg-neutral-100">
                <img 
                  src="/assets/727669df5799659827b14fae6ea587ef.jpg" 
                  alt="Success Kerala Youth Story page featuring Lenor Academy building and headline" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <span className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to read article</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Press Scan 2 */}
            <div 
              onClick={() => setSelectedImage({
                title: "Success Kerala — Founders Feature",
                subtitle: "Faisal Babu K. and Farshan K. interview on visual media education",
                image: "/assets/5cbf2c78a73a7f75c8b7de91a033348a.jpg",
                category: "press"
              })}
              className="rounded-[24px] overflow-hidden bg-white p-3 shadow-2xl cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] rounded-xl bg-neutral-100">
                <img 
                  src="/assets/5cbf2c78a73a7f75c8b7de91a033348a.jpg" 
                  alt="Success Kerala Youth Story page featuring founders Faisal Babu and Farshan" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <span className="px-4 py-2 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to read article</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          11. WHY CHOOSE LENOR ACADEMY? (MODULAR 8-BOX BENTO GRID)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="space-y-6">
          <div>
            <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-neutral-400">
              Why choose Lenor Academy?
            </div>
            <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Eight good reasons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '01', text: 'Established in 2018' },
              { num: '02', text: '3,000+ students trained' },
              { num: '03', text: '525+ active students' },
              { num: '04', text: '50+ faculty members' },
              { num: '05', text: '180+ computer lab and 70+ mirrorless cameras' },
              { num: '06', text: 'Hostel and library facilities' },
              { num: '07', text: 'Career and placement support' },
              { num: '08', text: 'Branches in Malappuram and Kochi' },
            ].map((reason) => (
              <div 
                key={reason.num}
                className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-black leading-none">
                  {reason.num}
                </span>
                <span className="text-base sm:text-lg font-bold text-neutral-800 mt-6 leading-snug">
                  {reason.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          12. FINAL MOTTO & ENROLMENT CARD (WHITE BOX WITH BLACK TEXT)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-10 sm:p-20 text-center shadow-2xl border border-neutral-100">
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black leading-[1.02]">
            Lenor Academy –<br />Learn what you love.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PillButton
              variant="dark"
              size="md"
              onClick={() => onOpenEnrol?.('media-master')}
            >
              Enrol In Programme
            </PillButton>
            {onOpenBrochure && (
              <PillButton
                variant="ghost"
                size="md"
                onClick={onOpenBrochure}
                className="!border-black/30 !text-black hover:!border-black hover:!bg-black/5"
              >
                Download Official Brochure
              </PillButton>
            )}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          IMAGE & CERTIFICATE LIGHTBOX MODAL (PORTALED TO BODY)
          ========================================================================= */}
      {selectedImage && typeof document !== 'undefined' && createPortal(
        <div 
          data-lenor-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#121212] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] overscroll-contain minimal-scrollbar-dark"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
                  {selectedImage.category === 'certificate' ? 'Government Recognized Certificate' : selectedImage.category === 'press' ? 'Press & Media Archive' : 'Academy Campus View'}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  {selectedImage.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Preview with Zoom capability */}
            <div className="relative mt-4 flex-1 overflow-auto rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-2 min-h-[300px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AboutUsSection;
