import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { EVENTS_DATA, EventItem } from '../data/academyData';
import { RegisterEventModal } from '../components/RegisterEventModal';
import { AnimatedContent } from '../components/AnimatedContent';
import { InvestmentSection } from '../components/InvestmentSection';

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

  const featuredEvent = EVENTS_DATA.find(e => e.id === 'ev-hoverboard') || EVENTS_DATA[0];

  const filteredUpcoming = EVENTS_DATA.filter(e => {
    if (activeCategory === 'All') return true;
    return e.category === activeCategory;
  });

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
                className="btn !h-12 !px-8 text-xs font-extrabold tracking-wider bg-black text-white hover:bg-neutral-800"
              >
                <span>Register For Workshop</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

            {/* Featured Image */}
            <div className="h-[340px] lg:h-auto relative overflow-hidden bg-[#1a1a1a]">
              <img
                src={featuredEvent.image || "/assets/f9607b8e989abbaa401503b580e2dbe8.webp"}
                alt="Camera operator on a self-balancing board"
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
                  {item.registrationOpen ? 'Register Free' : 'Details'}
                </button>
              </div>
            </div>
          ))}
        </AnimatedContent>
      </section>

      {/* PAST EVENTS GALLERY */}
      <section className="px-4 sm:px-10 pt-10">
        <AnimatedContent distance={40} duration={0.75} threshold={0.15}>
          <div className="eye text-neutral-400">Archives</div>
          <h2 className="h1 text-4xl sm:text-6xl text-white mt-1 mb-8">
            Past events & field shoots
          </h2>
        </AnimatedContent>

        <AnimatedContent
          distance={50}
          duration={0.8}
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <figure className="card h-[380px] group">
            <img
              src="/assets/179f0e839c946970e2d9cfc3d4064f35.webp"
              alt="Graduation day group photo"
              className="cover gs group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Convocation Day
            </figcaption>
          </figure>

          <figure className="card h-[380px] group">
            <img
              src="/assets/1fb7aa06fcb8e992f56088cc1a94cdd3.webp"
              alt="Drone flying over a snowy landscape"
              className="cover gs group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Aerial Drone Expedition
            </figcaption>
          </figure>

          <figure className="card h-[380px] group">
            <img
              src="/assets/610f9b6df212ed06c84a6f395b70946b.webp"
              alt="Camera operator filming on stairs"
              className="cover gs group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-widest text-white border border-white/20">
              Cinematic Stair Movement
            </figcaption>
          </figure>
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
