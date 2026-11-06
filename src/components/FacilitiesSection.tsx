import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Building, 
  Camera, 
  Film, 
  Monitor, 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  Home, 
  BookOpen, 
  Layers, 
  Sliders, 
  Maximize2, 
  X,
  Compass,
  Tv
} from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';
import { PillButton } from './PillButton';
import { ACADEMY_INFO } from '../data/academyData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface FacilitiesSectionProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

interface FacilityImageLightbox {
  title: string;
  subtitle: string;
  image: string;
  fallbackImage?: string;
  category: string;
  caption?: string;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  onOpenEnrol,
  onOpenBrochure
}) => {
  const [selectedImage, setSelectedImage] = useState<FacilityImageLightbox | null>(null);

  // Lock background scroll and pause Lenis smooth scroll while lightbox is open
  useModalScrollLock(!!selectedImage, () => setSelectedImage(null));

  // Nikon cameras data from Facilities reference
  const cameraFleet = [
    { model: 'Nikon Z5 II', count: 10, pct: 66.7, badge: 'Full-Frame Hybrid' },
    { model: 'Nikon Z6 III', count: 5, pct: 33.3, badge: 'High-Speed 6K Raw' },
    { model: 'Nikon Z R', count: 15, pct: 100.0, badge: 'Primary Practice Rig' }
  ];

  // Prime lenses from Facilities reference
  const primeLenses = [
    { name: 'Nikkor Z 24mm f/1.8 S', count: 2, pct: 13.3, tag: 'Wide Prime' },
    { name: 'Nikkor Z 35mm f/1.4', count: 1, pct: 6.7, tag: 'Street & Doc' },
    { name: 'Nikkor Z 35mm f/1.8 S', count: 2, pct: 13.3, tag: 'S-Line Cine' },
    { name: 'Nikkor Z 50mm f/1.4', count: 15, pct: 100.0, tag: 'Standard Prime' },
    { name: 'Nikkor Z 50mm f/1.8 S', count: 2, pct: 13.3, tag: 'Low-Light Master' },
    { name: 'Nikkor Z 85mm f/1.2', count: 1, pct: 6.7, tag: 'Flagship Portrait' },
    { name: 'Nikkor Z 85mm f/1.8 S', count: 8, pct: 53.3, tag: 'Portrait & Bokeh' },
  ];

  // Zoom lenses from Facilities reference
  const zoomLenses = [
    { name: 'Nikkor Z 70-200mm f/2.8 VR S', count: 1, pct: 6.7, tag: 'Pro Telephoto' },
    { name: 'Nikkor Z 100-400mm f/4.5-5.6 VR S', count: 1, pct: 6.7, tag: 'Super-Telephoto' },
    { name: 'Nikkor Z 180-600mm f/5.6-6.3 VR', count: 3, pct: 20.0, tag: 'Wildlife & Action' },
  ];

  // Campus spaces grid
  const campusSpaces = [
    {
      title: 'Main Academy Facade',
      subtitle: 'CP Building, Makkaraparamba, Malappuram',
      category: 'Exterior Architecture',
      caption: 'Illuminated LR Lenor sign on the academy front facade',
      image: '/assets/0ef2aab79facfc772f2abf0b48668909.jpg',
      fallback: '/assets/Modern LR LENOR Storefront Facade.png',
      span: 'lg:col-span-2'
    },
    {
      title: 'The Mural Pavilion',
      subtitle: 'Student Community & Creative Breakout',
      category: 'Social Space',
      caption: 'Vibrant artistic mural pavilion where students collaborate & unwind',
      image: '/assets/4cc613dfd77a45cb25a537c82f622d08.jpg',
      fallback: '/assets/Modern Lenor Pavilion with Vibrant Mural.png',
      span: 'lg:col-span-1'
    },
    {
      title: 'Executive Office & Mentorship Suite',
      subtitle: 'Portfolio Review & Dean Consultations',
      category: 'Academic Administration',
      caption: 'Executive office space featuring bespoke lion fine-art installation',
      image: '/assets/7edc3827043ac24a159f64e95db21fa3.jpg',
      fallback: '/assets/Modern Executive Office with Lion Artwork.png',
      span: 'lg:col-span-1'
    },
    {
      title: 'Front Office & Admissions Lounge',
      subtitle: 'Welcome Desk, Campus Guides & Enrolment',
      category: 'Visitor Welcome',
      caption: 'Modern reception desk where prospective creators and parents consult',
      image: '/assets/4673d9ef7c565dd1bc65fbc845d8006c.jpg',
      fallback: '/assets/Modern Lenor Office Workspace.png',
      span: 'lg:col-span-2'
    }
  ];

  return (
    <div id="facilities" className="relative w-full bg-black text-white selection:bg-black selection:text-white space-y-12 sm:space-y-16">
      
      {/* =========================================================================
          1. HERO HEADER & CAMPUS OVERVIEW
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="space-y-6">
          {/* Main White Display Card */}
          <section className="relative overflow-hidden rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-16 shadow-2xl border border-neutral-100">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              Campus &amp; Facilities · Makkaraparamba, Malappuram
            </div>

            <h1 className="h1 text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black leading-[0.94] mt-4">
              Where learning<br />happens
            </h1>

            <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 bg-black text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Full In-House Infrastructure · Zero Equipment Rental Fees</span>
            </div>

            <p className="mt-8 max-w-4xl text-xl sm:text-2xl lg:text-[28px] font-light leading-snug text-neutral-800">
              Computer labs, a professional photography and videography studio, smart classrooms, and a comprehensive fleet of Nikon mirrorless gear — all built under one roof.
            </p>
          </section>

          {/* Tropical Campus Hero Banner Image with Click-to-Zoom */}
          <div 
            className="relative rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group cursor-pointer h-[320px] sm:h-[480px] lg:h-[620px]"
            onClick={() => setSelectedImage({
              title: "Lenor Academy Campus",
              subtitle: "Makkaraparamba, Malappuram, Kerala",
              category: "Campus Architecture",
              caption: "Lenor Academy campus set against lush tropical palm trees and clear skies",
              image: "/assets/0789ef7328d8862a03968a1ea42b98ea.jpg",
              fallbackImage: "/assets/Lenor Academy Modern Tropical Campus.png"
            })}
          >
            <img 
              src="/assets/0789ef7328d8862a03968a1ea42b98ea.jpg" 
              alt="Lenor Academy campus with palm trees and blue sky" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/Lenor Academy Modern Tropical Campus.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs sm:text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Makkaraparamba Main Campus
              </span>
              <span className="text-white/80 font-mono text-[11px] hidden sm:block">
                Click to inspect full view
              </span>
            </div>
          </div>

          {/* 4 Key Stat Metric Boxes (Distinct Modular Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                180+
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Computers in the lab
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-amber-600 leading-none">
                30
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Nikon mirrorless cameras
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                36
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Nikkor Z lenses
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black leading-none">
                Hostel
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                &amp; Library on campus
              </span>
            </div>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          2. COMPUTER LAB & 180+ WORKSTATIONS
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-16 shadow-2xl border border-neutral-100 space-y-8">
          <div>
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              Editing &amp; Post-Production Facility
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-black tracking-tight leading-[0.95] mt-2">
              180+ workstations
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-neutral-700 font-light max-w-3xl leading-relaxed">
              An advanced high-performance computer lab with 180+ individual editing stations dedicated to DaVinci Resolve color grading, Premiere Pro editing, After Effects compositing, and Photoshop design.
            </p>

            {/* Spec Pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                1 PC Per Student
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Color-Calibrated IPS Panels
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                High-Speed NVMe Storage
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Full AC Climate Controlled
              </span>
            </div>
          </div>

          {/* Two Lab Images in Stack / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Image 1: Wide Lab Perspective */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "180+ Computer Editing Bay",
                subtitle: "Individual High-Performance Workstations",
                category: "Computer Lab",
                caption: "Wide view of the Lenor computer lab with students practicing video editing and motion design",
                image: "/assets/ca858b534f9bde82252c65c8a58512c8.jpg",
                fallbackImage: "/assets/Modern Symmetrical Tech Workspace.png"
              })}
            >
              <img 
                src="/assets/ca858b534f9bde82252c65c8a58512c8.jpg" 
                alt="Wide view of the Lenor computer lab with students at workstations"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/Modern Symmetrical Tech Workspace.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-white">
                Workstation Lab · Symmetrical Editing Suite
              </div>
            </div>

            {/* Image 2: Instructor Teaching Session */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "Live Mentorship & Demonstration",
                subtitle: "Hands-On Practical Lab Guidance",
                category: "Interactive Teaching",
                caption: "Mentor demonstrating advanced video color grading & timeline editing directly to students",
                image: "/assets/9a6cc97f6dbd0f6fc17d8471afc3d8fa.jpg",
                fallbackImage: "/assets/Modern Media Editing Classroom.png"
              })}
            >
              <img 
                src="/assets/9a6cc97f6dbd0f6fc17d8471afc3d8fa.jpg" 
                alt="Instructor teaching video editing in front of students"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/Modern Media Editing Classroom.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-white">
                Live Mentorship · Timeline &amp; Color Grading
              </div>
            </div>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          3. SMART CLASSROOMS: LEARN. BUILD. GROW.
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Smart Classroom Image Card */}
          <div 
            className="relative rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group cursor-pointer min-h-[340px] sm:min-h-[460px]"
            onClick={() => setSelectedImage({
              title: "Smart Classroom Lecture Session",
              subtitle: "Interactive Digital Projection & Acoustic Audio",
              category: "Smart Classroom",
              caption: "Lenor Academy students engaged during an interactive visual lecture in the air-conditioned smart room",
              image: "/assets/ad17389e15d746910cb972e2f5679ea9.jpg",
              fallbackImage: "/assets/Modern Classroom Learning Session.png"
            })}
          >
            <img 
              src="/assets/ad17389e15d746910cb972e2f5679ea9.jpg" 
              alt="Students attending a class in a smart classroom"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/Modern Classroom Learning Session.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-6 left-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Smart Classroom · Makkaraparamba Campus
            </div>
          </div>

          {/* Right Checklist Card: White with Black Text */}
          <div className="rounded-[24px] bg-white text-black p-8 sm:p-12 shadow-2xl border border-neutral-100 flex flex-col justify-between">
            <div>
              <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
                Academic Environment
              </div>
              <h2 className="h1 text-4xl sm:text-6xl font-black uppercase text-black tracking-tight leading-[0.95] mt-2 mb-6">
                Learn.<br />Build.<br />Grow.
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-light mb-8 leading-relaxed">
                Every space is carefully curated to minimize distractions and inspire artistic ambition through experiential learning.
              </p>

              {/* Verified Feature Checklist */}
              <ul className="divide-y divide-neutral-200 border-t border-neutral-200 text-sm sm:text-base font-bold">
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5 text-black" />
                    <span>Smart interactive classrooms with projection</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </li>
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-black" />
                    <span>Air-conditioned learning halls</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </li>
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-black" />
                    <span>Academic library &amp; visual media archives</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </li>
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-black" />
                    <span>Student hostel accommodation facility</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </li>
                <li className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-black" />
                    <span>Dedicated photography &amp; videography studio</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-semibold">
              <span>Hostels: 10 facilities (9 Boys, 1 Ladies with warden)</span>
              <span>Walking distance</span>
            </div>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          4. AROUND THE CAMPUS: SPACES TO CREATE
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="space-y-6">
          <div className="px-2">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-400">
              Around the campus
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Spaces to create
            </h2>
            <p className="mt-3 text-neutral-300 font-light text-base sm:text-lg max-w-2xl leading-relaxed">
              Explore the functional studios, discussion spaces, administrative suites, and artistic installations that make Lenor Academy feel like a genuine creative studio.
            </p>
          </div>

          {/* Architectural Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campusSpaces.map((space, idx) => (
              <div 
                key={idx}
                className={`group rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-300 hover:border-white/30 cursor-pointer flex flex-col justify-between ${space.span}`}
                onClick={() => setSelectedImage({
                  title: space.title,
                  subtitle: space.subtitle,
                  category: space.category,
                  caption: space.caption,
                  image: space.image,
                  fallbackImage: space.fallback
                })}
              >
                {/* Image Box */}
                <div className="relative h-[260px] sm:h-[340px] overflow-hidden bg-neutral-950">
                  <img 
                    src={space.image} 
                    alt={space.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      if (space.fallback) (e.target as HTMLImageElement).src = space.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
                      {space.category}
                    </span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="p-5 sm:p-6 bg-neutral-900 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {space.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">
                      {space.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest shrink-0 hidden sm:block">
                    Click to Zoom
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          5. EQUIPMENT FLEET: NIKON CAMERAS & NIKKOR Z LENSES
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="space-y-6">
          <div className="px-2">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-400">
              Fleet &amp; Optics Breakdown
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Gear you’ll shoot with
            </h2>
            <p className="mt-3 text-neutral-300 font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              Students train on professional Nikon mirrorless bodies and Nikkor Z lenses, from fast primes to long telephoto zooms. Zero equipment deposit or camera fee required.
            </p>
          </div>

          {/* Side-by-Side Equipment Breakdowns (Cards matching Reference) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Box 1: Nikon Cameras */}
            <article className="rounded-[24px] bg-neutral-900 border border-neutral-800 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title & English Subtitle + Huge Count */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                      01 · Nikon cameras
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-1">
                      Mirrorless Bodies
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl sm:text-7xl font-black text-white tracking-tighter leading-none">
                      30
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                      Total cameras
                    </div>
                  </div>
                </div>

                {/* Camera List with Animated Meter Bars */}
                <div className="divide-y divide-neutral-800/80 pt-2">
                  {cameraFleet.map((cam, i) => (
                    <div key={i} className="py-4 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-4 items-center">
                      <div>
                        <div className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {cam.model}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          {cam.badge}
                        </div>
                      </div>
                      
                      {/* Bar (hidden on very small screens, visible sm+) */}
                      <div className="hidden sm:block h-2 rounded-full bg-neutral-800 overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-1000"
                          style={{ width: `${cam.pct}%` }}
                        />
                      </div>

                      <div className="text-2xl sm:text-3xl font-extrabold text-white text-right font-mono">
                        {cam.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
                <span>1 Camera provided per 3–4 students</span>
                <span className="text-amber-400 font-bold">100% Offline Access</span>
              </div>
            </article>

            {/* Box 2: Nikkor Z Lenses */}
            <article className="rounded-[24px] bg-neutral-900 border border-neutral-800 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title & English Subtitle + Huge Count */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                      02 · Nikkor lenses
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mt-1">
                      Z-Mount Optics
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl sm:text-7xl font-black text-white tracking-tighter leading-none">
                      36
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mt-1">
                      Total lenses
                    </div>
                  </div>
                </div>

                {/* Prime Lenses Subsection */}
                <div className="pt-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-2">
                    Prime Lenses
                  </div>
                  <div className="divide-y divide-neutral-800/80">
                    {primeLenses.map((lens, i) => (
                      <div key={i} className="py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-4 items-center">
                        <div className="text-xs sm:text-sm font-semibold text-white truncate">
                          {lens.name}
                        </div>
                        <div className="hidden sm:block h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-1000"
                            style={{ width: `${lens.pct}%` }}
                          />
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white text-right font-mono">
                          {lens.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zoom Lenses Subsection */}
                <div className="pt-6">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 mb-2">
                    Zoom Lenses
                  </div>
                  <div className="divide-y divide-neutral-800/80">
                    {zoomLenses.map((lens, i) => (
                      <div key={i} className="py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-4 items-center">
                        <div className="text-xs sm:text-sm font-semibold text-white truncate">
                          {lens.name}
                        </div>
                        <div className="hidden sm:block h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all duration-1000"
                            style={{ width: `${lens.pct}%` }}
                          />
                        </div>
                        <div className="text-base sm:text-lg font-bold text-white text-right font-mono">
                          {lens.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
                <span>Fast primes (f/1.2 &amp; f/1.4) + Telephoto zooms</span>
                <span className="text-emerald-400 font-bold">S-Line Quality</span>
              </div>
            </article>
          </div>

          {/* Support Cinema Equipment Strip */}
          <div className="rounded-[22px] bg-neutral-950 border border-neutral-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Cinema Rigs &amp; Production Gear
                </h4>
                <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                  RED Epic Cinema Rig · DJI Ronin Gimbals · DJI Drones · Godox Strobe Studio Lighting · Wireless Audio Systems
                </p>
              </div>
            </div>
            <button
              onClick={onOpenBrochure}
              className="btn !h-10 text-xs tracking-wider bg-white text-black hover:bg-neutral-200 shrink-0 font-bold uppercase"
            >
              View Full Gear Sheet
            </button>
          </div>
        </div>
      </AnimatedContent>

      {/* =========================================================================
          6. VISIT US / SEE IT IN PERSON (DISTINCT WHITE BOX)
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-14 lg:p-16 shadow-2xl border border-neutral-100 text-center flex flex-col items-center">
          <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
            Visit us · Open campus walk
          </div>

          <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-black tracking-tight leading-[0.95] mt-3">
            See it in person
          </h2>

          <p className="text-base sm:text-xl text-neutral-700 font-light max-w-xl mx-auto mt-4 leading-relaxed">
            Lenor Academy, CP Building, Makkaraparamba, Malappuram, Kerala — experience the labs, studio lights, and gear vault firsthand.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919188374232"
              className="btn !h-12 !px-8 text-xs font-black uppercase tracking-wider bg-black text-white hover:bg-neutral-800 rounded-full shadow-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 91883 74232</span>
            </a>

            <button
              onClick={() => onOpenEnrol?.('media-master')}
              className="btn ghost !h-12 !px-8 text-xs font-bold uppercase tracking-wider !border-black !text-black hover:!bg-black hover:!text-white rounded-full transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enrol for 2026 Batch</span>
            </button>
          </div>
        </section>
      </AnimatedContent>

      {/* =========================================================================
          7. IMAGE LIGHTBOX MODAL (PORTALED TO DOCUMENT.BODY)
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
            className="relative w-full max-w-4xl bg-neutral-900 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-amber-300 block">
                  {selectedImage.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close image inspection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative my-3 sm:my-4 flex-1 min-h-0 flex items-center justify-center bg-black/60 rounded-xl overflow-hidden">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-lg select-none"
                onError={(e) => {
                  if (selectedImage.fallbackImage) {
                    (e.target as HTMLImageElement).src = selectedImage.fallbackImage;
                  }
                }}
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs text-neutral-400 shrink-0">
              <p className="font-light text-neutral-300 truncate">
                {selectedImage.caption || selectedImage.subtitle}
              </p>
              <span className="text-neutral-500 font-mono text-[10px] shrink-0">
                Lenor Academy Infrastructure
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default FacilitiesSection;

