import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowUpRight, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Maximize2, 
  X,
  Building2,
  Users,
  Compass,
  Target
} from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';

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

  return (
    <div id="about" className="relative w-full bg-black text-white selection:bg-white selection:text-black">
      {/* =========================================================================
          SECTION 1: HERO OVERVIEW CARD
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="relative overflow-hidden rounded-[22px] bg-[#121212] border border-[#262626] p-8 sm:p-14 lg:p-16 shadow-2xl">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            About us · Established 2018
          </div>

          <h1 className="h1 text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.94] mt-6">
            About<br />Lenor Academy
          </h1>

          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 border border-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase bg-white/5 backdrop-blur-sm shadow-md">
            <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Kerala’s only institute with 525+ active photography students</span>
          </div>

          <p className="mt-10 max-w-4xl text-2xl sm:text-3xl lg:text-[34px] font-light leading-snug text-[#e6e6e6]">
            Lenor Academy is a professional Visual Media Training Institute established in 2018, located in Makkaraparamba, Malappuram, Kerala, with an additional branch in Kochi.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 pt-8 border-t border-[#333]">
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                2018
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#bdbdbd]">
                Established
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                3,000+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#bdbdbd]">
                Students trained
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none text-amber-300">
                525+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#bdbdbd]">
                Students enrolled
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                50+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#bdbdbd]">
                Faculty members
              </span>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 2: BUILDING IMAGE CARD & TWO-COLUMN OVERVIEW
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-16 sm:pt-24 space-y-10 sm:space-y-14">
          <div className="relative overflow-hidden rounded-[22px] bg-[#161616] border border-[#262626] h-[280px] sm:h-[420px] lg:h-[560px] shadow-2xl group cursor-pointer"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                Makkaraparamba Main Campus
              </span>
              <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand Photo</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 text-[#e6e6e6] text-lg sm:text-xl lg:text-[22px] font-light leading-relaxed">
            <p>
              We offer professional education and hands-on training in Photography, Videography, Cinematography, Video Editing, Photo Editing, Graphic Designing, Drone Operations and other creative media disciplines.
            </p>
            <p>
              With 3,000+ students trained and 525+ students currently enrolled, Lenor Academy has grown into one of Kerala’s leading institutions for visual media education. Our goal is to turn creative passion into professional skills and successful careers.
            </p>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 3: FOUNDERS — THE PEOPLE BEHIND IT
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            Founders
          </div>
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-4">
            The people behind it
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14">
            {/* Faisal Babu K. */}
            <article className="rounded-[22px] bg-[#161616] border border-[#262626] p-8 sm:p-11 flex flex-col justify-between space-y-6 hover:border-white/25 transition-colors duration-300 shadow-xl">
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9] mb-2 flex items-center justify-between">
                  <span>Founder, Managing Director &amp; CEO</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/20">
                    Army Veteran
                  </span>
                </div>
                <h3 className="h1 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
                  Faisal Babu K.
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg text-[#d6d6d6] font-light leading-relaxed">
                  <p>
                    An Indian Army veteran and entrepreneur, Faisal Babu K. is the driving force behind Lenor Academy&apos;s strategic vision and institutional development. With a strong commitment to excellence in creative media education, he oversees the academy&apos;s operations, academic development, and long-term expansion.
                  </p>
                  <p>
                    His leadership is focused on bridging the gap between education and industry through practical, career-oriented training, while building Lenor Academy into a recognized institution for creative media education across India.
                  </p>
                </div>
              </div>
            </article>

            {/* Farshan K. */}
            <article className="rounded-[22px] bg-[#161616] border border-[#262626] p-8 sm:p-11 flex flex-col justify-between space-y-6 hover:border-white/25 transition-colors duration-300 shadow-xl">
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9] mb-2 flex items-center justify-between">
                  <span>Co-Founder &amp; Director – Marketing &amp; Growth</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 text-[10px] font-mono border border-white/15">
                    BMMC Graduate
                  </span>
                </div>
                <h3 className="h1 text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
                  Farshan K.
                </h3>
                <div className="mt-6 space-y-4 text-base sm:text-lg text-[#d6d6d6] font-light leading-relaxed">
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
          SECTION 4: OUR COURSES — SEVEN WAYS IN
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            Our courses
          </div>
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-4 mb-8 sm:mb-12">
            Seven ways in
          </h2>

          <div className="divide-y divide-[#262626] border-t border-[#262626]">
            {[
              { num: '01', title: 'MMP – Media Master Programme', duration: '12 Months', id: 'media-master' },
              { num: '02', title: 'VMP – Visual Media Production', duration: '6 Months', id: 'visual-media-production' },
              { num: '03', title: 'Media Design & Editing Professional', duration: '6 Months', id: 'media-design-editing-pro' },
              { num: '04', title: 'Editing & Graphic Designing Course', duration: '3 Months', id: 'editing-graphic-design' },
              { num: '05', title: 'Photography Course', duration: '2 Months', id: 'photography-course' },
              { num: '06', title: 'Videography Course', duration: '6 Days', id: 'videography-course' },
              { num: '07', drone: true, title: 'Drone Course', duration: '5 Days', id: 'drone-course' },
            ].map((course) => (
              <div 
                key={course.num}
                onClick={() => onOpenEnrol?.(course.id)}
                className="grid grid-cols-[60px_1fr_auto] sm:grid-cols-[90px_1fr_auto] gap-4 sm:gap-6 items-center py-6 sm:py-7 hover:bg-white/[0.02] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl transition-all cursor-pointer group"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tighter text-white group-hover:text-amber-300 transition-colors">
                  {course.num}
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                  {course.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 border border-[#3a3a3a] rounded-full text-xs sm:text-sm font-semibold text-[#e2e2e2] whitespace-nowrap group-hover:border-white transition-colors">
                    {course.duration}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#262626]" />
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 5: CAMPUS & FACILITIES — BUILT FOR HANDS-ON LEARNING
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Campus Studio Shoot Image Card */}
            <div 
              className="relative rounded-[22px] overflow-hidden bg-[#161616] border border-[#262626] min-h-[360px] sm:min-h-[460px] shadow-2xl group cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                  Practical Studio Stage
                </span>
                <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>

            {/* Campus Facilities List */}
            <div className="rounded-[22px] bg-[#161616] border border-[#262626] p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
                Campus &amp; facilities
              </div>
              <h2 className="h1 text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.98] mt-4 mb-8">
                Built for hands-on learning
              </h2>
              <ul className="space-y-0 divide-y divide-[#2a2a2a] border-t border-[#2a2a2a] text-base sm:text-lg lg:text-[19px] font-semibold text-[#e6e6e6]">
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Advanced computer lab with 180+ computers</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>70+ mirrorless cameras for practical training</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Professional photography and videography studio</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Student hostel facility</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Library</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Smart classrooms</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Air-conditioned classrooms</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
                <li className="py-3.5 sm:py-4 flex items-center justify-between">
                  <span>Professional photography and videography equipment</span>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 6: OUR FACULTY — 50+ INDUSTRY MENTORS
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Faculty text & giant metric */}
            <div className="space-y-4 lg:pr-6">
              <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
                Our faculty
              </div>
              <h2 className="h1 text-6xl sm:text-8xl lg:text-[140px] font-black text-white leading-none tracking-tight">
                50+
              </h2>
              <p className="text-xl sm:text-2xl text-[#d6d6d6] font-light leading-relaxed max-w-xl pt-2">
                A team of 50+ faculty members and industry professionals guides students in building technical expertise, creative skills and real-world knowledge.
              </p>
            </div>

            {/* Convocation batch card */}
            <div 
              className="relative rounded-[22px] overflow-hidden bg-[#161616] border border-[#262626] h-[340px] sm:h-[460px] shadow-2xl group cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-mono text-neutral-300 uppercase tracking-widest">
                  Annual Convocation Batch
                </span>
                <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 7: CERTIFICATIONS & AFFILIATIONS — RECOGNISED, CERTIFIED
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            Certifications &amp; affiliations
          </div>
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-4">
            Recognised, certified
          </h2>

          <div className="flex gap-2.5 sm:gap-3 flex-wrap mt-6 sm:mt-8">
            <span className="px-5 py-2.5 rounded-full border border-[#3a3a3a] text-sm sm:text-base font-semibold text-white bg-white/5">
              NSDC
            </span>
            <span className="px-5 py-2.5 rounded-full border border-[#3a3a3a] text-sm sm:text-base font-semibold text-white bg-white/5">
              Skill India
            </span>
            <span className="px-5 py-2.5 rounded-full border border-[#3a3a3a] text-sm sm:text-base font-semibold text-white bg-white/5">
              ISO Certification
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {/* ISO 9001:2015 & HRDS Certificate Card */}
            <div 
              onClick={() => setSelectedImage({
                title: "ISO 9001:2015 & HRDS Skill India Certificate",
                subtitle: "Human Resources Development Society & ISO 9001:2015 Certified Institute",
                image: "/assets/9092412f1e562172ffc6ff80c098cf43.jpg",
                category: "certificate"
              })}
              className="rounded-[22px] bg-white p-3.5 sm:p-5 shadow-2xl cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center aspect-[1/1.38]">
                <img 
                  src="/assets/9092412f1e562172ffc6ff80c098cf43.jpg" 
                  alt="Lenor Academy ISO certificate" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to inspect certificate</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 px-1 flex items-center justify-between text-neutral-800 text-xs font-mono font-semibold">
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
              className="rounded-[22px] bg-white p-3.5 sm:p-5 shadow-2xl cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center aspect-[1/1.38]">
                <img 
                  src="/assets/e3325af456a8223afae4551328ad48fa.jpg" 
                  alt="Certificate issued with the Media and Entertainment Skills Council, Skill India and NSDC" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono font-bold flex items-center gap-1.5 backdrop-blur-sm border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to inspect certificate</span>
                  </span>
                </div>
              </div>
              <div className="mt-3 px-1 flex items-center justify-between text-neutral-800 text-xs font-mono font-semibold">
                <span>MESC &amp; NSDC Skill India</span>
                <span className="text-neutral-500">Official Document ↗</span>
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 8: CAREER DEVELOPMENT & PLACEMENT SUPPORT — HIGH CONTRAST LIGHT CARD
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="mt-20 sm:mt-28 rounded-[22px] bg-[#f2f2f2] text-[#0d0d0d] p-8 sm:p-14 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div>
              <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#555]">
                Career development &amp; placement support
              </div>
              <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#0d0d0d] tracking-tight leading-[0.98] mt-4">
                From first frame to first job
              </h2>
            </div>

            <ul className="divide-y divide-[#bdbdbd] border-t border-[#bdbdbd] text-base sm:text-lg lg:text-[19px] font-semibold text-[#0d0d0d]">
              <li className="py-4">100% Placement Guarantee for the 1-Year Professional Course.</li>
              <li className="py-4">100% Placement Assistance for all other courses.</li>
              <li className="py-4">Practical, hands-on training.</li>
              <li className="py-4">Career guidance and professional skill development.</li>
              <li className="py-4">Internship and real-world project exposure.</li>
            </ul>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 9: OUR VISION & OUR MISSION
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Vision */}
            <article className="rounded-[22px] bg-[#161616] border border-[#262626] p-8 sm:p-14 flex flex-col justify-between space-y-6 hover:border-white/20 transition-colors shadow-xl">
              <div>
                <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9] mb-4 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>Our vision</span>
                </div>
                <p className="text-2xl sm:text-3xl font-light leading-snug text-white">
                  To become a leading institution in visual media education by empowering aspiring creators with professional knowledge, creative skills, modern technology and industry experience.
                </p>
              </div>
            </article>

            {/* Mission */}
            <article className="rounded-[22px] bg-[#1b1b1b] border border-[#262626] p-8 sm:p-14 flex flex-col justify-between space-y-6 hover:border-white/20 transition-colors shadow-xl">
              <div>
                <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9] mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Our mission</span>
                </div>
                <p className="text-2xl sm:text-3xl font-light leading-snug text-white">
                  To transform creative passion into professional careers through quality education, practical training and modern infrastructure.
                </p>
              </div>
            </article>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 10: FEATURED IN — SUCCESS KERALA (PRESS SCANS)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            Featured in
          </div>
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-4">
            Success Kerala
          </h2>
          <p className="text-lg sm:text-xl text-[#bdbdbd] font-light mt-4">
            Youth Story · Lenor Academy in the press
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-12">
            {/* Press Article 1: Building & Headline */}
            <div 
              onClick={() => setSelectedImage({
                title: "Success Kerala — Youth Story Feature",
                subtitle: "Lenor Academy headline profile and institutional milestone",
                image: "/assets/727669df5799659827b14fae6ea587ef.jpg",
                category: "press"
              })}
              className="rounded-[22px] overflow-hidden bg-[#161616] border border-[#262626] shadow-2xl cursor-pointer group hover:border-white/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900">
                <img 
                  src="/assets/727669df5799659827b14fae6ea587ef.jpg" 
                  alt="Success Kerala Youth Story page featuring Lenor Academy building and headline" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-mono text-neutral-300">
                    Youth Story Feature Page 1
                  </span>
                  <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to read article</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Press Article 2: Founders Interview */}
            <div 
              onClick={() => setSelectedImage({
                title: "Success Kerala — Founders Feature",
                subtitle: "Faisal Babu K. and Farshan K. interview on visual media education",
                image: "/assets/5cbf2c78a73a7f75c8b7de91a033348a.jpg",
                category: "press"
              })}
              className="rounded-[22px] overflow-hidden bg-[#161616] border border-[#262626] shadow-2xl cursor-pointer group hover:border-white/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900">
                <img 
                  src="/assets/5cbf2c78a73a7f75c8b7de91a033348a.jpg" 
                  alt="Success Kerala Youth Story page featuring founders Faisal Babu and Farshan" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-mono text-neutral-300">
                    Founders Interview Page 2
                  </span>
                  <span className="text-xs font-mono text-white flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/20">
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
          SECTION 11: WHY CHOOSE LENOR ACADEMY? — EIGHT GOOD REASONS
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="pt-20 sm:pt-28">
          <div className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#a9a9a9]">
            Why choose Lenor Academy?
          </div>
          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-4 mb-8 sm:mb-12">
            Eight good reasons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 column-gap-14">
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
                className="flex items-center gap-5 sm:gap-6 py-6 border-t border-[#262626] text-lg sm:text-xl font-semibold text-white hover:text-amber-300 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white shrink-0">
                  {reason.num}
                </span>
                <span>{reason.text}</span>
              </div>
            ))}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          SECTION 12: MOTTO & FINAL CALL TO ACTION CARD
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="mt-20 sm:mt-28 rounded-[22px] bg-[#121212] border border-[#262626] p-12 sm:p-20 lg:p-24 text-center shadow-2xl">
          <h2 className="h1 text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02]">
            Lenor Academy –<br />Learn what you love.
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenEnrol?.('media-master')}
              className="px-8 h-12 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            >
              Enrol In Programme
            </button>
            {onOpenBrochure && (
              <button
                type="button"
                onClick={onOpenBrochure}
                className="px-8 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Download Official Brochure
              </button>
            )}
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          IMAGE & CERTIFICATE LIGHTBOX MODAL
          ========================================================================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#121212] border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
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
        </div>
      )}
    </div>
  );
};

export default AboutUsSection;
