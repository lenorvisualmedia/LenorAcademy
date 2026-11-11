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
  Tv,
  Zap,
  Box,
  List as ListIcon,
  Table as TableIcon,
  Sun,
  Droplets
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

  // Multi-brand camera fleet data: Sony (40) + Nikon (30) + Canon (3) = 73 Total
  const [cameraBrandFilter, setCameraBrandFilter] = useState<'All' | 'Sony' | 'Nikon' | 'Canon'>('All');
  const cameraFleet = [
    // Sony Cameras (40 Units)
    { model: 'Sony A7 III (M3)', brand: 'Sony', count: 10, pct: 100.0, badge: 'Full-Frame Industry Standard' },
    { model: 'Sony A6400', brand: 'Sony', count: 10, pct: 100.0, badge: 'High-Speed APS-C Video Rig' },
    { model: 'Sony ZV-E10', brand: 'Sony', count: 10, pct: 100.0, badge: 'Compact Vlog & Creator Rig' },
    { model: 'Sony A7 IV (M4)', brand: 'Sony', count: 5, pct: 50.0, badge: 'Next-Gen 4K 10-Bit Hybrid' },
    { model: 'Sony A7R V (M5)', brand: 'Sony', count: 3, pct: 30.0, badge: '61MP Flagship High-Res' },
    { model: 'Sony A7S III (S3)', brand: 'Sony', count: 2, pct: 20.0, badge: 'Low-Light 4K 120p Cinema' },
    // Nikon Cameras (30 Units)
    { model: 'Nikon Z R', brand: 'Nikon', count: 15, pct: 100.0, badge: 'Primary Practice Rig' },
    { model: 'Nikon Z5 II', brand: 'Nikon', count: 10, pct: 66.7, badge: 'Full-Frame Hybrid' },
    { model: 'Nikon Z6 III', brand: 'Nikon', count: 5, pct: 33.3, badge: 'High-Speed 6K Raw' },
    // Canon Cameras (3 Units)
    { model: 'Canon EOS 70D', brand: 'Canon', count: 1, pct: 10.0, badge: 'Dual Pixel DSLR Rig' },
    { model: 'Canon EOS 1100D', brand: 'Canon', count: 1, pct: 10.0, badge: 'Beginner Practice DSLR' },
    { model: 'Canon EOS 1300D', brand: 'Canon', count: 1, pct: 10.0, badge: 'Foundation Training DSLR' }
  ];

  const filteredCameraFleet = cameraBrandFilter === 'All'
    ? cameraFleet
    : cameraFleet.filter(cam => cam.brand === cameraBrandFilter);

  // Multi-brand optics fleet data: Nikkor Z (36) + Sony & E-Mount (42) = 78 Total
  const [lensBrandFilter, setLensBrandFilter] = useState<'All' | 'Nikkor Z' | 'Sony & E-Mount'>('All');
  const lensFleet = [
    // Nikkor Z (36 Units)
    { name: 'Nikkor Z 50mm f/1.4', brand: 'Nikkor Z', count: 15, pct: 100.0, tag: 'Standard Prime' },
    { name: 'Nikkor Z 85mm f/1.8 S', brand: 'Nikkor Z', count: 8, pct: 53.3, tag: 'Portrait & Bokeh' },
    { name: 'Nikkor Z 180-600mm f/5.6-6.3 VR', brand: 'Nikkor Z', count: 3, pct: 20.0, tag: 'Wildlife & Action' },
    { name: 'Nikkor Z 24mm f/1.8 S', brand: 'Nikkor Z', count: 2, pct: 13.3, tag: 'Wide Prime' },
    { name: 'Nikkor Z 35mm f/1.8 S', brand: 'Nikkor Z', count: 2, pct: 13.3, tag: 'S-Line Cine' },
    { name: 'Nikkor Z 50mm f/1.8 S', brand: 'Nikkor Z', count: 2, pct: 13.3, tag: 'Low-Light Master' },
    { name: 'Nikkor Z 35mm f/1.4', brand: 'Nikkor Z', count: 1, pct: 6.7, tag: 'Street & Doc' },
    { name: 'Nikkor Z 85mm f/1.2', brand: 'Nikkor Z', count: 1, pct: 6.7, tag: 'Flagship Portrait' },
    { name: 'Nikkor Z 70-200mm f/2.8 VR S', brand: 'Nikkor Z', count: 1, pct: 6.7, tag: 'Pro Telephoto' },
    { name: 'Nikkor Z 100-400mm f/4.5-5.6 VR S', brand: 'Nikkor Z', count: 1, pct: 6.7, tag: 'Super-Telephoto' },
    // Sony & E-Mount (42 Units)
    { name: 'Sony FE 50mm f/1.8', brand: 'Sony', count: 10, pct: 66.7, tag: 'Full-Frame Standard Prime' },
    { name: '35mm f/1.4 Fast Prime', brand: 'Sony / E-Mount', count: 8, pct: 53.3, tag: 'Street & Cinematic Prime' },
    { name: '85mm f/1.4 Pro Portrait Prime', brand: 'Sony / E-Mount', count: 8, pct: 53.3, tag: 'Flagship Bokeh & Low Light' },
    { name: '85mm f/1.8 Portrait Prime', brand: 'Sony / E-Mount', count: 8, pct: 53.3, tag: 'Studio & Location Bokeh' },
    { name: 'Sony E 16mm Wide Prime', brand: 'Sony', count: 5, pct: 33.3, tag: 'Ultra-Wide Compact Prime' },
    { name: '24-70mm Standard Zoom', brand: 'E-Mount', count: 1, pct: 6.7, tag: 'Commercial Zoom' },
    { name: '24mm Wide Prime', brand: 'E-Mount', count: 1, pct: 6.7, tag: 'Architecture & Landscape' },
    { name: 'Sony E 18mm Wide', brand: 'Sony', count: 1, pct: 6.7, tag: 'Wide-Angle Cine' }
  ];

  const filteredLensFleet = lensBrandFilter === 'All'
    ? lensFleet
    : lensBrandFilter === 'Nikkor Z'
      ? lensFleet.filter(lens => lens.brand === 'Nikkor Z')
      : lensFleet.filter(lens => lens.brand !== 'Nikkor Z');

  // Studio categories & state
  const studioCategories = ['All', 'Strobes & Flash', 'Continuous Light', 'Modifiers & Shapers', 'Grip & Support', 'Backdrops & Surfaces'] as const;
  const [studioCategory, setStudioCategory] = useState<string>('All');
  const [studioViewMode, setStudioViewMode] = useState<'list' | 'table'>('list');

  // Product Lab categories & state
  const productLabCategories = ['All', 'Tripods & Support', 'Modifiers & Diffusers', 'Tabletop Backdrops', 'Staging, Grip & FX'] as const;
  const [productLabCategory, setProductLabCategory] = useState<string>('All');
  const [productLabViewMode, setProductLabViewMode] = useState<'list' | 'table'>('list');

  // Studio & Lighting Inventory (68 Total Units including 35 Portable/Location Flash & Video Light Units)
  const studioInventory = [
    // Portable & On-Location Flash & Light Units (35 Units)
    { name: 'Pocket Location Strobe', brand: 'Godox', model: 'AD 200 PRO', qty: 16, category: 'Strobes & Flash', pct: 100 },
    { name: 'Handheld Light Stick', brand: 'Godox', model: 'LC 500 LED Wand', qty: 5, category: 'Continuous Light', pct: 50 },
    { name: 'Studio Strobe System', brand: 'Godox', model: 'Studio Flash Units', qty: 4, category: 'Strobes & Flash', pct: 40 },
    { name: 'Continuous Video Light', brand: 'Godox / Studio', model: 'High-Output Video Lights', qty: 4, category: 'Continuous Light', pct: 40 },
    { name: 'Round-Head On-Camera Flash', brand: 'Godox', model: 'V1 Flash', qty: 3, category: 'Strobes & Flash', pct: 30 },
    { name: 'Pocket Location Strobe', brand: 'Godox', model: 'AD 200 PRO II', qty: 2, category: 'Strobes & Flash', pct: 25 },
    { name: 'Video Light LED Panel', brand: 'Studio', model: 'High-CRI Video LED', qty: 1, category: 'Continuous Light', pct: 20 },
    // Studio Fixed Equipment (33 Units)
    { name: 'Light - Strobe', brand: 'Godox', model: 'SK400 II', qty: 2, category: 'Strobes & Flash', pct: 50 },
    { name: 'Light - Strobe', brand: 'Godox', model: 'DP 600 III', qty: 2, category: 'Strobes & Flash', pct: 50 },
    { name: 'Trigger - DP 600', brand: 'Godox', model: 'Wireless Studio Trigger', qty: 1, category: 'Strobes & Flash', pct: 25 },
    { name: 'Light - Continuous Light', brand: 'Digitek', model: 'DCL 60w', qty: 1, category: 'Continuous Light', pct: 25 },
    { name: 'Light - Continuous Light', brand: 'Kodak', model: 'V225', qty: 2, category: 'Continuous Light', pct: 50 },
    { name: 'Tripod', brand: 'Manfrotto', model: 'MT055 XPRO3 Pro Tripod', qty: 1, category: 'Grip & Support', pct: 25 },
    { name: 'Modifier - Gobo', brand: 'Godox', model: 'BLP Gobo Projector', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Modifier - Soft Box', brand: 'Godox', model: 'P 120 L Parabolic', qty: 4, category: 'Modifiers & Shapers', pct: 100 },
    { name: 'Modifier - Strip Soft Box', brand: 'Jenie', model: 'Beauty Box BX 35 x 150', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Modifier - Soft Box', brand: 'Godox', model: 'S120 W', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Modifier - Umbrella Soft box', brand: 'Godox', model: 'CB 85D', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Modifier - Snooter', brand: '', model: 'Directional Conical Snoot', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Modifier - Reflector', brand: '', model: 'Multi-Disc Spill Reflector', qty: 1, category: 'Modifiers & Shapers', pct: 25 },
    { name: 'Stand', brand: '', model: 'C-Stand with Boom Arm', qty: 2, category: 'Grip & Support', pct: 50 },
    { name: 'Stand (Heavy Duty)', brand: '', model: 'Heavy Duty Stand', qty: 3, category: 'Grip & Support', pct: 75 },
    { name: 'Stand (Mini Duty)', brand: '', model: 'Mini Duty Stand', qty: 4, category: 'Grip & Support', pct: 100 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Chroma Green', qty: 1, category: 'Backdrops & Surfaces', pct: 25 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Muted Brown', qty: 1, category: 'Backdrops & Surfaces', pct: 25 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Seamless Black', qty: 1, category: 'Backdrops & Surfaces', pct: 25 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: '1 Extra Studio Wall', qty: 1, category: 'Backdrops & Surfaces', pct: 25 },
    { name: 'Clear Sheet', brand: '', model: 'Reflection Table Acrylic', qty: 1, category: 'Backdrops & Surfaces', pct: 25 }
  ];

  // Product Lab Inventory (23 Total Units)
  const productLabInventory = [
    { name: 'Tripod', brand: 'Digitek', model: 'DTR-620 BH Ballhead', qty: 1, category: 'Tripods & Support', pct: 10 },
    { name: 'Tripod', brand: 'Digitek', model: 'DTR-520 BH Ballhead', qty: 1, category: 'Tripods & Support', pct: 10 },
    { name: 'Modifier - Softbox', brand: 'Digitek', model: '30CM Diffuser', qty: 10, category: 'Modifiers & Diffusers', pct: 100 },
    { name: 'Modifier - Snooter', brand: '', model: 'Macro Tabletop Snoot', qty: 1, category: 'Modifiers & Diffusers', pct: 10 },
    { name: 'Light Box', brand: '', model: 'Product Box - Tent Booth', qty: 1, category: 'Modifiers & Diffusers', pct: 10 },
    { name: 'Backdrop', brand: '', model: 'PVC Plain Black (Waterproof)', qty: 1, category: 'Tabletop Backdrops', pct: 10 },
    { name: 'Backdrop', brand: '', model: 'PVC Plain White (Waterproof)', qty: 1, category: 'Tabletop Backdrops', pct: 10 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Seamless White', qty: 1, category: 'Tabletop Backdrops', pct: 10 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Seamless Black', qty: 1, category: 'Tabletop Backdrops', pct: 10 },
    { name: 'Backdrop - Wall Backdrop', brand: '', model: 'Seamless Red', qty: 1, category: 'Tabletop Backdrops', pct: 10 },
    { name: 'Stand', brand: '', model: 'Tabletop T-Stand', qty: 1, category: 'Staging, Grip & FX', pct: 10 },
    { name: 'Hard Foam', brand: '', model: 'Black Bounce / Flag Board', qty: 1, category: 'Staging, Grip & FX', pct: 10 },
    { name: 'Hard Foam', brand: '', model: 'White Bounce Board', qty: 1, category: 'Staging, Grip & FX', pct: 10 },
    { name: 'Clips / Clamps', brand: '', model: 'Backdrop Clamps Grip', qty: 1, category: 'Staging, Grip & FX', pct: 10 },
    { name: 'Aquarium', brand: '', model: 'High-Speed Water Splash Tank', qty: 1, category: 'Staging, Grip & FX', pct: 10 }
  ];

  const filteredStudioItems = studioCategory === 'All'
    ? studioInventory
    : studioInventory.filter(item => item.category === studioCategory);

  const filteredProductLabItems = productLabCategory === 'All'
    ? productLabInventory
    : productLabInventory.filter(item => item.category === productLabCategory);

  // Campus spaces grid
  const campusSpaces = [
    {
      title: 'Main Academy Facade',
      subtitle: 'CP Building, Makkaraparamba, Malappuram',
      category: 'Exterior Architecture',
      caption: 'Illuminated LR Lenor sign on the academy front facade',
      image: '/assets/0ef2aab79facfc772f2abf0b48668909.jpg',
      fallback: '/assets/facility-studio-1-exterior.jpg',
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
              Computer labs, a professional photography and videography studio, smart classrooms, and a comprehensive fleet of professional mirrorless gear — all built under one roof.
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
                73
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Total cameras
              </span>
            </div>

            <div className="rounded-[22px] bg-white text-black p-6 sm:p-8 shadow-xl border border-neutral-100 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black leading-none">
                78
              </span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 mt-3 block">
                Total lenses
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

          {/* Authentic Lab Images Grid (4 Real Photos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Image 1: Authentic 180+ Editing Lab */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "180+ Workstations Central Editing Bay",
                subtitle: "Dedicated High-Performance Editing & Grading Stations",
                category: "Computer Lab",
                caption: "Lenor Academy 180+ computer lab with dual-display setups, ergonomic seating, and central presentation display",
                image: "/assets/facility-editing-workstation-lab.jpg",
                fallbackImage: "/assets/facility-editing-workstation-lab.jpg"
              })}
            >
              <img 
                src="/assets/facility-editing-workstation-lab.jpg" 
                alt="180+ high performance workstations at Lenor Academy editing lab"
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
                Workstation Lab · Dual-Display Editing Bay
              </div>
            </div>

            {/* Image 2: Wide Panoramic Editing Lab in Action */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "180+ Workstations Panoramic Lab",
                subtitle: "Dual-Display High-Speed Video Editing & Motion Graphics Stations",
                category: "Active Lab Session",
                caption: "Wide perspective of the 180+ editing lab showing active student workstations, collaborative center discussion desk, and climate control",
                image: "/assets/facility-workstation-lab-panoramic.jpg",
                fallbackImage: "/assets/facility-workstation-lab-panoramic.jpg"
              })}
            >
              <img 
                src="/assets/facility-workstation-lab-panoramic.jpg" 
                alt="Panoramic view of 180+ workstations lab in action at Lenor Academy"
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
                Panoramic Lab · Active Student Workstations
              </div>
            </div>

            {/* Image 3: Live Instructor Mentorship & Timeline Masterclass */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "Live Instructor Mentorship Session",
                subtitle: "Interactive Timeline & Color Grading Masterclass",
                category: "Hands-on Mentorship",
                caption: "Industry mentor conducting a live DaVinci Resolve & Premiere Pro timeline walkthrough with real-time student participation",
                image: "/assets/facility-workstation-mentor-lecture.jpg",
                fallbackImage: "/assets/facility-workstation-mentor-lecture.jpg"
              })}
            >
              <img 
                src="/assets/facility-workstation-mentor-lecture.jpg" 
                alt="Live instructor mentorship session in the 180+ workstations editing lab"
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
                Live Mentorship · Timeline & Color Grading
              </div>
            </div>

            {/* Image 4: Authentic Multimedia Classroom & Design Lab */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "Multimedia Classroom & Design Lab",
                subtitle: "Air-Conditioned Creative Lab with 'Learn What You Love' Mural",
                category: "Interactive Teaching",
                caption: "Panoramic view of the multimedia lab featuring motivational murals, air conditioning, and individual design suites",
                image: "/assets/facility-multimedia-classroom-mural.jpg",
                fallbackImage: "/assets/facility-multimedia-classroom-mural.jpg"
              })}
            >
              <img 
                src="/assets/facility-multimedia-classroom-mural.jpg" 
                alt="Lenor Academy multimedia classroom with wall mural and editing workstations"
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
                Creative Media Lab · Learn What You Love
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
          3B. COMMERCIAL PHOTOGRAPHY & VIDEOGRAPHY STUDIO STAGE
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <section className="rounded-[24px] bg-white text-black p-8 sm:p-12 lg:p-14 shadow-2xl border border-neutral-100 space-y-8">
          <div>
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-500">
              On-Campus Production Stage
            </div>
            <h2 className="h1 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black leading-[0.96] mt-2">
              Commercial Photography &amp; Videography Studio
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-700 font-light max-w-3xl leading-relaxed">
              Step inside our fully rigged professional shooting stage. Designed for live commercial shoots, fashion editorials, and cinematic filmmaking with high-end Godox strobes, continuous lights, motorized backdrops, and hands-on mentor coaching.
            </p>

            {/* Spec Pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Studio-1 Dedicated Facility
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Ceiling Pantograph Light Grid
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Godox Parabolic Softboxes &amp; Strip Lights
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Motorized Seamless Backdrops
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                Live Model Commercial Shoots
              </span>
              <span className="px-4 py-2 bg-neutral-100 text-neutral-900 border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider">
                1 Camera Per 3–4 Students
              </span>
            </div>
          </div>

          {/* Studio-1 Dedicated Building Facade (Hero Card) */}
          <div 
            className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[280px] sm:h-[400px] lg:h-[460px] shadow-lg group cursor-pointer"
            onClick={() => setSelectedImage({
              title: "Lenor Academy Studio-1 Building",
              subtitle: "Dedicated Commercial Photography & Film Production Stage",
              category: "Studio Facility",
              caption: "Modern architectural exterior of Lenor Academy Studio-1 featuring contemporary glass curtain wall, dedicated shooting floors, and client staging areas",
              image: "/assets/facility-studio-1-exterior.jpg",
              fallbackImage: "/assets/facility-studio-1-exterior.jpg"
            })}
          >
            <img 
              src="/assets/facility-studio-1-exterior.jpg" 
              alt="Lenor Academy Studio-1 exterior architecture with LR LENOR signage and glass facade"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/facility-studio-commercial-shoot.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-5 left-5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Studio-1 · Dedicated Commercial Production Facility
            </div>
          </div>

          {/* Interior Studio Shoots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Studio Image 2: Live Commercial Shoot */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "Live Fashion & Commercial Shoot Session",
                subtitle: "Practical Studio Lighting & Direction Under Mentors",
                category: "Studio Stage",
                caption: "Lenor Academy students actively directing and capturing a live fashion model shoot with Godox parabolic softboxes and ceiling lighting grid",
                image: "/assets/facility-studio-commercial-shoot.jpg",
                fallbackImage: "/assets/facility-studio-commercial-shoot.jpg"
              })}
            >
              <img 
                src="/assets/facility-studio-commercial-shoot.jpg" 
                alt="Lenor Academy students in uniform shooting live fashion model with Godox parabolic softbox and ceiling grid"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/facility-studio-1-exterior.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-white">
                Commercial Studio · Live Model &amp; Mentor Session
              </div>
            </div>

            {/* Studio Image 3: Lighting Setup & Camera Calibration */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 h-[260px] sm:h-[360px] shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage({
                title: "Studio Lighting Calibration & Modifiers",
                subtitle: "Mastering Key, Fill, and Rim Lighting Setups",
                category: "Studio Stage",
                caption: "Students configuring camera exposure and light ratios with large Godox modifiers, strip boxes, and seamless black backdrop",
                image: "/assets/facility-studio-lighting-setup.jpg",
                fallbackImage: "/assets/facility-studio-lighting-setup.jpg"
              })}
            >
              <img 
                src="/assets/facility-studio-lighting-setup.jpg" 
                alt="Students calibrating camera settings beside large Godox studio softbox modifier"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/facility-studio-1-exterior.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-bold uppercase tracking-wider text-white">
                Lighting Rig · Modifiers, Strips &amp; Calibration
              </div>
            </div>
          </div>
        </section>
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
          5. EQUIPMENT FLEET: NIKON CAMERAS, NIKKOR Z LENSES, STUDIO & PRODUCT LAB
          ========================================================================= */}
      <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
        <div className="space-y-6">
          <div className="px-2">
            <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-400">
              Fleet, Optics &amp; Studio Breakdown
            </div>
            <h2 className="h1 text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95] mt-2">
              Gear you’ll shoot with
            </h2>
            <p className="mt-3 text-neutral-300 font-light text-base sm:text-lg max-w-3xl leading-relaxed">
              Students train on professional Sony, Nikon and Canon camera bodies, prime and zoom optics, high-output Godox strobes, and commercial tabletop product rigs. 200+ specialized production assets with zero equipment deposit or camera fee required.
            </p>
          </div>

          {/* Row 1: Camera Fleet & Optics (Distinct White Boxes with Black Text) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Box 1: Cameras */}
            <article className="rounded-[24px] bg-white text-black border border-neutral-100 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title & Subtitle + Total Count */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                      01 · Multi-Brand Fleet
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight mt-1">
                      Camera Bodies
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl sm:text-7xl font-black text-black tracking-tighter leading-none">
                      73
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                      Total cameras
                    </div>
                  </div>
                </div>

                {/* Brand Filter Pills */}
                <div className="flex flex-wrap gap-1.5 py-3 border-b border-neutral-200">
                  {(['All', 'Sony', 'Nikon', 'Canon'] as const).map((brand) => {
                    const count = brand === 'All' ? 73 : brand === 'Sony' ? 40 : brand === 'Nikon' ? 30 : 3;
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setCameraBrandFilter(brand)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                          cameraBrandFilter === brand
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {brand} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Camera List */}
                <div className="divide-y divide-neutral-200 pt-2 max-h-[440px] overflow-y-auto minimal-scrollbar pr-1">
                  {filteredCameraFleet.map((cam, i) => (
                    <div key={i} className="py-3 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-3 items-center">
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-neutral-900">
                            {cam.model}
                          </span>
                          <span className="sm:hidden px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[9px] font-bold uppercase border border-neutral-200">
                            {cam.brand}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono truncate">
                          {cam.badge}
                        </div>
                      </div>
                      
                      <div className="hidden sm:flex items-center justify-start gap-2">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                          {cam.brand}
                        </span>
                      </div>

                      <div className="text-base sm:text-lg font-bold text-black text-right font-mono">
                        {cam.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-medium">
                <span>Sony (40) · Nikon (30) · Canon (3)</span>
                <span className="text-amber-700 font-bold">1 Camera per 3–4 students</span>
              </div>
            </article>

            {/* Box 2: Lenses & Optics */}
            <article className="rounded-[24px] bg-white text-black border border-neutral-100 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title & Subtitle + Total Count */}
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-neutral-200">
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                      02 · Camera optics
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight mt-1">
                      Prime &amp; Zoom Lenses
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl sm:text-7xl font-black text-black tracking-tighter leading-none">
                      78
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                      Total lenses
                    </div>
                  </div>
                </div>

                {/* Brand Filter Pills */}
                <div className="flex flex-wrap gap-1.5 py-3 border-b border-neutral-200">
                  {(['All', 'Nikkor Z', 'Sony & E-Mount'] as const).map((brand) => {
                    const count = brand === 'All' ? 78 : brand === 'Nikkor Z' ? 36 : 42;
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setLensBrandFilter(brand)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                          lensBrandFilter === brand
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {brand} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Lens List */}
                <div className="divide-y divide-neutral-200 pt-2 max-h-[440px] overflow-y-auto minimal-scrollbar pr-1">
                  {filteredLensFleet.map((lens, i) => (
                    <div key={i} className="py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-3 items-center">
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                            {lens.name}
                          </span>
                          <span className="sm:hidden px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[9px] font-bold uppercase border border-neutral-200">
                            {lens.brand}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono truncate">
                          {lens.tag}
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center justify-start gap-2">
                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                          {lens.brand}
                        </span>
                      </div>

                      <div className="text-base sm:text-lg font-bold text-black text-right font-mono">
                        {lens.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-medium">
                <span>Nikkor Z (36) · Sony &amp; E-Mount (42)</span>
                <span className="text-emerald-700 font-bold">Fast Primes &amp; Zooms</span>
              </div>
            </article>
          </div>

          {/* Row 2: Studio Production Stage & Product Lab Stages (Distinct White Boxes with Black Text) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Box 3: Commercial Studio Stage */}
            <article className="rounded-[24px] bg-white text-black border border-neutral-100 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title, View Switcher & Total Count */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                        03 · Studio equipment
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                        Godox &amp; Manfrotto
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight mt-1">
                      Studio Lighting &amp; Grip
                    </div>
                  </div>

                  <div className="flex items-center sm:items-end justify-between sm:justify-start gap-4">
                    {/* View Switcher: List vs Table */}
                    <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setStudioViewMode('list')}
                        className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all ${
                          studioViewMode === 'list'
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                        title="List View"
                      >
                        <ListIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">List</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudioViewMode('table')}
                        className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all ${
                          studioViewMode === 'table'
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                        title="Table View"
                      >
                        <TableIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">Table</span>
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-5xl sm:text-7xl font-black text-black tracking-tighter leading-none">
                        68
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                        Total assets
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 py-3 border-b border-neutral-200">
                  {studioCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setStudioCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                        studioCategory === cat
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Content Container (Scrollable minimal-scrollbar) */}
                <div className="max-h-[500px] overflow-y-auto minimal-scrollbar pr-2 overscroll-contain">
                  {studioViewMode === 'list' ? (
                    <div>
                      {studioCategories
                        .filter(cat => cat !== 'All' && (studioCategory === 'All' || studioCategory === cat))
                        .map(cat => {
                          const items = studioInventory.filter(i => i.category === cat);
                          if (items.length === 0) return null;
                          return (
                            <div key={cat} className="pt-4 first:pt-2">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-700">
                                  {cat}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                                  {items.reduce((sum, item) => sum + item.qty, 0)} units
                                </span>
                              </div>
                              <div className="divide-y divide-neutral-200">
                                {items.map((item, i) => (
                                  <div key={i} className="py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-3 items-center">
                                    <div className="min-w-0 pr-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs sm:text-sm font-bold text-neutral-900">
                                          {item.name}
                                        </span>
                                        {item.brand && (
                                          <span className="sm:hidden px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[9px] font-bold uppercase border border-neutral-200">
                                            {item.brand}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-neutral-500 font-mono truncate">
                                        {item.model}
                                      </div>
                                    </div>
                                    
                                    <div className="hidden sm:flex items-center justify-start gap-2">
                                      {item.brand ? (
                                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                                          {item.brand}
                                        </span>
                                      ) : (
                                        <span className="text-neutral-400 font-mono text-[10px] uppercase">
                                          Studio Spec
                                        </span>
                                      )}
                                    </div>

                                    <div className="text-base sm:text-lg font-bold text-black text-right font-mono">
                                      {item.qty}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    /* Table View */
                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b-2 border-neutral-300 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                            <th className="py-2.5 pr-3 font-bold">Asset Name</th>
                            <th className="py-2.5 px-3 font-bold">Brand</th>
                            <th className="py-2.5 px-3 font-bold">Model</th>
                            <th className="py-2.5 pl-3 font-bold text-right">Qty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {filteredStudioItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                              <td className="py-2.5 pr-3 font-bold text-neutral-900">
                                {item.name}
                              </td>
                              <td className="py-2.5 px-3">
                                {item.brand ? (
                                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                                    {item.brand}
                                  </span>
                                ) : (
                                  <span className="text-neutral-400 font-mono text-[11px]">—</span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-neutral-600 text-[11px]">
                                {item.model || '—'}
                              </td>
                              <td className="py-2.5 pl-3 font-mono font-black text-black text-right text-sm">
                                {item.qty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-medium">
                <span>Godox Strobes · Softboxes · C-Stands &amp; Chroma Backdrops</span>
                <span className="text-amber-700 font-bold">Commercial Studio Ready</span>
              </div>
            </article>

            {/* Box 4: Product Lab Inventory */}
            <article className="rounded-[24px] bg-white text-black border border-neutral-100 p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Header with Title, View Switcher & Total Count */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                        04 · Product lab inventory
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                        Macro &amp; Tabletop
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight mt-1">
                      Product Lab &amp; FX Staging
                    </div>
                  </div>

                  <div className="flex items-center sm:items-end justify-between sm:justify-start gap-4">
                    {/* View Switcher: List vs Table */}
                    <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg border border-neutral-200">
                      <button
                        type="button"
                        onClick={() => setProductLabViewMode('list')}
                        className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all ${
                          productLabViewMode === 'list'
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                        title="List View"
                      >
                        <ListIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">List</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductLabViewMode('table')}
                        className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all ${
                          productLabViewMode === 'table'
                            ? 'bg-black text-white font-bold shadow-sm'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                        title="Table View"
                      >
                        <TableIcon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">Table</span>
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-5xl sm:text-7xl font-black text-black tracking-tighter leading-none">
                        23
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                        Total assets
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 py-3 border-b border-neutral-200">
                  {productLabCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setProductLabCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                        productLabCategory === cat
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Content Container (Scrollable minimal-scrollbar) */}
                <div className="max-h-[500px] overflow-y-auto minimal-scrollbar pr-2 overscroll-contain">
                  {productLabViewMode === 'list' ? (
                    <div>
                      {productLabCategories
                        .filter(cat => cat !== 'All' && (productLabCategory === 'All' || productLabCategory === cat))
                        .map(cat => {
                          const items = productLabInventory.filter(i => i.category === cat);
                          if (items.length === 0) return null;
                          return (
                            <div key={cat} className="pt-4 first:pt-2">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-700">
                                  {cat}
                                </span>
                                <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                                  {items.reduce((sum, item) => sum + item.qty, 0)} units
                                </span>
                              </div>
                              <div className="divide-y divide-neutral-200">
                                {items.map((item, i) => (
                                  <div key={i} className="py-2.5 grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_48px] gap-3 items-center">
                                    <div className="min-w-0 pr-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs sm:text-sm font-bold text-neutral-900">
                                          {item.name}
                                        </span>
                                        {item.brand && (
                                          <span className="sm:hidden px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 font-mono text-[9px] font-bold uppercase border border-neutral-200">
                                            {item.brand}
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-neutral-500 font-mono truncate">
                                        {item.model}
                                      </div>
                                    </div>
                                    
                                    <div className="hidden sm:flex items-center justify-start gap-2">
                                      {item.brand ? (
                                        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                                          {item.brand}
                                        </span>
                                      ) : (
                                        <span className="text-neutral-400 font-mono text-[10px] uppercase">
                                          Lab Gear
                                        </span>
                                      )}
                                    </div>

                                    <div className="text-base sm:text-lg font-bold text-black text-right font-mono">
                                      {item.qty}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    /* Table View */
                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b-2 border-neutral-300 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                            <th className="py-2.5 pr-3 font-bold">Asset Name</th>
                            <th className="py-2.5 px-3 font-bold">Brand</th>
                            <th className="py-2.5 px-3 font-bold">Model</th>
                            <th className="py-2.5 pl-3 font-bold text-right">Qty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {filteredProductLabItems.map((item, idx) => (
                            <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                              <td className="py-2.5 pr-3 font-bold text-neutral-900">
                                {item.name}
                              </td>
                              <td className="py-2.5 px-3">
                                {item.brand ? (
                                  <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider border border-neutral-200">
                                    {item.brand}
                                  </span>
                                ) : (
                                  <span className="text-neutral-400 font-mono text-[11px]">—</span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-neutral-600 text-[11px]">
                                {item.model || '—'}
                              </td>
                              <td className="py-2.5 pl-3 font-mono font-black text-black text-right text-sm">
                                {item.qty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Support Rigs Note */}
              <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-medium">
                <span>10 Softboxes · Tent Booth · PVC Backdrops &amp; Water Splash Tank</span>
                <span className="text-emerald-700 font-bold">Macro &amp; Commercial Lab</span>
              </div>
            </article>
          </div>

          {/* Support Cinema Equipment Strip (White Box with Black Text) */}
          <div className="rounded-[22px] bg-white text-black border border-neutral-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black shrink-0 shadow-sm">
                <Film className="w-6 h-6 text-black" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-black">
                  Cinema Rigs &amp; Production Gear
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 font-light mt-0.5">
                  RED Epic Cinema Rig · DJI Ronin Gimbals · DJI Drones · Godox Strobe Studio Lighting · Wireless Audio Systems
                </p>
              </div>
            </div>
            <button
              onClick={onOpenBrochure}
              className="btn btn-dark !h-10 text-xs tracking-wider !bg-black !text-white hover:!bg-neutral-800 shrink-0 font-bold uppercase shadow-md"
            >
              <span className="!text-white">View Full Gear Sheet</span>
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
              className="btn btn-dark !h-12 !px-8 text-xs font-black uppercase tracking-wider !bg-black !text-white hover:!bg-neutral-800 rounded-full shadow-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4 !text-white" />
              <span className="!text-white">Call +91 91883 74232</span>
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
            className="relative w-full max-w-4xl bg-neutral-900 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] overscroll-contain minimal-scrollbar-dark"
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

