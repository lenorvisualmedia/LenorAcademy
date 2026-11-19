import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, X, ChevronLeft, ChevronRight, Maximize2, Trophy, Music, Calendar } from 'lucide-react';
import { EVENTS_DATA, EventItem, PAST_EVENTS_GALLERY, PastEventGalleryItem } from '../data/academyData';
import { RegisterEventModal } from '../components/RegisterEventModal';
import { AnimatedContent } from '../components/AnimatedContent';
import { InvestmentSection } from '../components/InvestmentSection';
import { ModelPhotographyReels } from '../components/ModelPhotographyReels';

interface EventsPageProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onOpenEnrol = () => {},
  onOpenBrochure = () => {}
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Workshops' | 'Camps' | 'Ceremonies' | 'Open days'>('All');
  const [galleryCategory, setGalleryCategory] = useState<'All' | 'Onam Celebration' | 'Sports League' | 'Cultural Fest'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredEvent = EVENTS_DATA.find(e => e.id === 'ev-sony-alpha') || EVENTS_DATA[0];
  const brandWorkshops = EVENTS_DATA.filter(e => e.category === 'Workshops');

  const filteredUpcoming = EVENTS_DATA.filter(e => {
    if (activeCategory === 'All') return true;
    return e.category === activeCategory;
  });

  const filteredGallery = PAST_EVENTS_GALLERY.filter((item) => {
    if (galleryCategory === 'All') return true;
    return item.category === galleryCategory;
  });

  // Handle keyboard navigation for full-screen photo lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredGallery.length]);

  return (
    <div className="space-y-12">
      {/* Registration Modal */}
      <RegisterEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* HEADER HERO */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.8}
      >
        <section className="px-4 sm:px-10 pt-8 sm:pt-14 pb-8">
          <div className="eye text-[#8a8a8a]">What's happening</div>
          <h1 className="h1 text-6xl sm:text-8xl lg:text-[140px] text-white mt-4 leading-[0.9]">
            Events
          </h1>
          <p className="lead text-2xl sm:text-4xl text-neutral-300 mt-6 max-w-3xl font-light">
            Workshops, camps and ceremonies. Learning that happens outside the classroom, on location and on camera.
          </p>
        </section>
      </AnimatedContent>

      {/* FEATURED EVENT CARD */}
      <AnimatedContent
        distance={60}
        duration={0.85}
        blur={4}
        threshold={0.1}
      >
        <section className="card min-h-[520px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-neutral-200 !bg-white !text-black shadow-xl">
          <div className="p-8 sm:p-12 flex flex-col justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-black border border-neutral-300 text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Featured Masterclass
              </div>
              <h2 className="h1 text-4xl sm:text-5xl lg:text-6xl text-black mt-2 leading-[0.95]">
                {featuredEvent.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 font-light mt-4 leading-relaxed max-w-lg">
                {featuredEvent.description}
              </p>
            </div>

            <div>
              {/* Meta badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-neutral-200">
                <div>
                  <div className="eye text-neutral-600">Date</div>
                  <div className="text-base sm:text-lg font-bold text-black mt-1">
                    {featuredEvent.date}
                  </div>
                </div>
                <div>
                  <div className="eye text-neutral-600">Time</div>
                  <div className="text-base sm:text-lg font-bold text-black mt-1">
                    {featuredEvent.time}
                  </div>
                </div>
                <div>
                  <div className="eye text-neutral-600">Venue</div>
                  <div className="text-base sm:text-lg font-bold text-black mt-1">
                    {featuredEvent.venue}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvent(featuredEvent)}
                className="btn btn-dark !h-12 !px-8 text-xs font-extrabold tracking-wider !bg-black !text-white hover:!bg-neutral-800 shadow-md"
              >
                <span>{featuredEvent.buttonText || (featuredEvent.date.toLowerCase().includes('coming soon') ? 'COMING SOON' : 'NOTIFY ME')}</span>
                <ArrowUpRight className="w-4 h-4 ml-1 !text-white" />
              </button>
            </div>
          </div>

            {/* Featured Image */}
            <div className="h-[340px] lg:h-auto relative overflow-hidden bg-[#1a1a1a]">
              <img
                src={featuredEvent.image || "/assets/facilities/facility-studio-lighting-setup.jpg"}
                alt={featuredEvent.title}
                className="cover gs hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
        </section>
      </AnimatedContent>

      {/* TICKER */}
      <AnimatedContent distance={20} duration={0.6}>
        <div className="relative w-full overflow-hidden border-y border-[#262626] py-3.5 bg-[#101010]">
          <div className="animate-marquee flex items-center gap-8">
            {[
              'Workshops',
              'Camps',
              'Ceremonies',
              'Open days',
              'Workshops',
              'Camps',
              'Ceremonies',
              'Open days'
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

      {/* BRAND MASTERCLASS WORKSHOPS */}
      <section className="px-4 sm:px-10 pt-4">
        <AnimatedContent distance={40} duration={0.8} threshold={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-[12px] font-extrabold tracking-[0.16em] uppercase text-neutral-400">
                Official Brand Masterclasses
              </div>
              <h2 className="h1 text-4xl sm:text-6xl text-white mt-1">
                Brand Workshops
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
              Hands-on technical masterclasses with industry brand specialists hosted live on the Lenor studio floor.
            </p>
          </div>

          {/* 4 Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="rounded-2xl bg-white text-black border border-neutral-200 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-neutral-400 transition-all duration-300 group"
              >
                <div>
                  {/* Top Tag & Date */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-neutral-100 text-black border border-neutral-300 text-[11px] font-black uppercase tracking-wider">
                      {workshop.category}
                    </span>
                    <span className="text-xs font-bold text-neutral-600 font-mono">
                      {workshop.date}
                    </span>
                  </div>

                  {/* Brand Subtitle */}
                  {workshop.brand && (
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-500 mb-1.5">
                      {workshop.brand}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-black text-black leading-snug group-hover:text-neutral-700 transition-colors">
                    {workshop.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                    {workshop.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  {/* Location */}
                  <div className="flex items-start gap-1.5 text-xs text-neutral-700 font-medium">
                    <span className="shrink-0">📍</span>
                    <span>{workshop.venue}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedEvent(workshop)}
                    className="w-full mt-4 h-11 px-4 rounded-xl !bg-black !text-white hover:!bg-neutral-800 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <span className="!text-white">{workshop.buttonText || (workshop.date.toLowerCase().includes('coming soon') ? 'COMING SOON' : 'NOTIFY ME')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 !text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AnimatedContent>
      </section>

      {/* MODEL PHOTOGRAPHY REELS (Gujarathi Street Live Workshop) */}
      <ModelPhotographyReels />

      {/* UPCOMING EVENTS SCHEDULE */}
      <section className="px-4 sm:px-10 pt-6">
        <AnimatedContent
          distance={40}
          duration={0.7}
          threshold={0.15}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#262626]"
        >
          <div>
            <div className="eye text-neutral-400">Schedule</div>
            <h2 className="h1 text-4xl sm:text-6xl text-white mt-1">
              Upcoming
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Workshops', 'Camps', 'Ceremonies', 'Open days'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`chip cursor-pointer ${activeCategory === cat ? 'on' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedContent>

        {/* Schedule List */}
        <AnimatedContent
          distance={30}
          duration={0.7}
          stagger={0.08}
          threshold={0.1}
          className="divide-y divide-[#262626] mt-4"
        >
          {filteredUpcoming.map((item) => (
            <div
              key={item.id}
              className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] px-4 rounded-xl transition-colors"
            >
              {/* Date */}
              <div className="md:w-48 text-sm font-extrabold tracking-wider text-neutral-300 font-mono">
                {item.date}
              </div>

              {/* Title & Category */}
              <div className="flex-1">
                <div className="text-xl sm:text-2xl font-black text-white hover:text-neutral-200">
                  {item.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-semibold">
                    {item.category}
                  </span>
                  <span>·</span>
                  <span>{item.description.slice(0, 75)}...</span>
                </div>
              </div>

              {/* Venue */}
              <div className="md:w-60 text-xs text-neutral-400 font-medium">
                📍 {item.venue}
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => setSelectedEvent(item)}
                  className="btn ghost !h-9 !px-4 text-xs font-bold whitespace-nowrap"
                >
                  {item.buttonText || (item.date.toLowerCase().includes('coming soon') ? 'COMING SOON' : 'NOTIFY ME')}
                </button>
              </div>
            </div>
          ))}
        </AnimatedContent>
      </section>

      {/* PAST EVENTS & CAMPUS LIFE GALLERY */}
      <section className="px-4 sm:px-10 pt-10">
        <AnimatedContent distance={40} duration={0.75} threshold={0.15}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#262626]">
            <div>
              <div className="eye text-neutral-400">Campus Chronicles · Photo Gallery</div>
              <h2 className="h1 text-4xl sm:text-6xl text-white mt-1">
                Past events &amp; campus life
              </h2>
              <p className="text-neutral-400 text-sm max-w-xl font-light mt-3 leading-relaxed">
                Authentic moments from student life at Lenor Academy — from festive Onam celebrations and vibrant cultural nights to high-stakes turf football tournaments.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 self-start sm:self-auto">
              {(
                [
                  { id: 'All', label: 'All Photos', count: PAST_EVENTS_GALLERY.length },
                  { id: 'Onam Celebration', label: 'Onam Festival', count: PAST_EVENTS_GALLERY.filter(i => i.category === 'Onam Celebration').length },
                  { id: 'Sports League', label: 'Turf Football', count: PAST_EVENTS_GALLERY.filter(i => i.category === 'Sports League').length },
                  { id: 'Cultural Fest', label: 'Cultural Fest', count: PAST_EVENTS_GALLERY.filter(i => i.category === 'Cultural Fest').length }
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setGalleryCategory(cat.id as any);
                    setLightboxIndex(null);
                  }}
                  className={`chip cursor-pointer flex items-center gap-2 !px-3.5 !py-2 ${
                    galleryCategory === cat.id ? 'on' : ''
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    galleryCategory === cat.id ? 'bg-black text-white' : 'bg-white/10 text-neutral-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </AnimatedContent>

        {/* Gallery Grid */}
        <AnimatedContent
          distance={40}
          duration={0.8}
          stagger={0.06}
          threshold={0.05}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-8"
        >
          {filteredGallery.map((item, idx) => (
            <article
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl ${
                item.aspect === 'wide' ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.aspect === 'wide'
                    ? 'aspect-[16/9] sm:aspect-[21/10]'
                    : item.aspect === 'landscape'
                      ? 'aspect-[4/3] sm:aspect-[16/11]'
                      : 'aspect-[3/4] sm:aspect-[4/5]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                {/* Deep cinematic gradient for contrast and readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:via-black/25 transition-colors pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-white border border-white/20">
                    {item.categoryLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300 border border-white/10">
                    {item.dateBadge}
                  </span>
                </div>

                {/* Hover Maximize Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="w-12 h-12 rounded-full bg-black/75 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Bottom Caption & Title */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white pointer-events-none z-10">
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-snug group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </AnimatedContent>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 sm:top-7 sm:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-200 cursor-pointer shadow-2xl"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1));
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-200 cursor-pointer shadow-2xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0));
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-200 cursor-pointer shadow-2xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
            />

            {/* Meta Bar */}
            <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white px-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white border border-white/20">
                    {filteredGallery[lightboxIndex].categoryLabel}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    {filteredGallery[lightboxIndex].dateBadge}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {filteredGallery[lightboxIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5 max-w-2xl">
                  {filteredGallery[lightboxIndex].caption}
                </p>
              </div>

              <div className="shrink-0 text-xs font-mono text-neutral-400">
                {lightboxIndex + 1} / {filteredGallery.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THE INVESTMENT & PROGRAMMES SECTION */}
      <InvestmentSection
        onOpenEnrol={onOpenEnrol}
        onOpenBrochure={onOpenBrochure}
      />
    </div>
  );
};
