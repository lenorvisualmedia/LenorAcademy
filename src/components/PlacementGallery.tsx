import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Building2, 
  Briefcase, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  Globe,
  Award
} from 'lucide-react';
import { PLACEMENT_POSTERS, PlacementPoster } from '../data/placementPostersData';
import { useModalScrollLock } from '../utils/modalScrollLock';

interface PlacementGalleryProps {
  limit?: number;
  showFilters?: boolean;
  showSearch?: boolean;
  theme?: 'dark' | 'light';
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  className?: string;
}

export const PlacementGallery: React.FC<PlacementGalleryProps> = ({
  limit,
  showFilters = true,
  showSearch = true,
  theme = 'dark',
  title = "Placed Students",
  subtitle = "Official placement announcement records and creative studio launches from Lenor Academy graduates.",
  showViewAllLink = false,
  className = ""
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPoster, setSelectedPoster] = useState<PlacementPoster | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(() => limit || 16);

  // Lock scroll when lightbox is active
  useModalScrollLock(!!selectedPoster, () => setSelectedPoster(null));

  const handleFilterChange = (key: string) => {
    setActiveFilter(key);
    setVisibleCount(16);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
  };

  // Filter Categories
  const categories = useMemo(() => {
    return [
      { key: 'All', label: 'All', count: PLACEMENT_POSTERS.length },
      { key: 'Videography', label: 'Videography', count: PLACEMENT_POSTERS.filter(p => p.category === 'Videography').length },
      { key: 'Photography', label: 'Photography', count: PLACEMENT_POSTERS.filter(p => p.category === 'Photography').length },
      { key: 'Editing', label: 'Editing', count: PLACEMENT_POSTERS.filter(p => p.category === 'Editing').length },
      { key: 'Design', label: 'Design', count: PLACEMENT_POSTERS.filter(p => p.category === 'Design').length },
      { key: 'Faculty', label: 'Instructors & Faculty', count: PLACEMENT_POSTERS.filter(p => p.category === 'Faculty').length },
      { key: 'Entrepreneur', label: 'Entrepreneurs', count: PLACEMENT_POSTERS.filter(p => p.category === 'Entrepreneur').length },
      { key: 'Gulf', label: 'Gulf / Overseas', count: PLACEMENT_POSTERS.filter(p => p.isGulf).length },
    ];
  }, []);

  // Filter and Search Logic
  const filteredPosters = useMemo(() => {
    let result = PLACEMENT_POSTERS;

    // Category Filter
    if (activeFilter === 'Gulf') {
      result = result.filter(p => p.isGulf);
    } else if (activeFilter !== 'All') {
      result = result.filter(p => p.category === activeFilter);
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    if (limit && limit > 0) {
      return result.slice(0, limit);
    }

    return result;
  }, [activeFilter, searchQuery, limit]);

  const displayedPosters = useMemo(() => {
    if (limit && limit > 0) return filteredPosters.slice(0, limit);
    return filteredPosters.slice(0, visibleCount);
  }, [filteredPosters, limit, visibleCount]);

  // Navigate next / prev in lightbox
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedPoster) return;
    const currentIndex = filteredPosters.findIndex(p => p.id === selectedPoster.id);
    if (currentIndex === -1) return;

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredPosters.length;
      setSelectedPoster(filteredPosters[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredPosters.length) % filteredPosters.length;
      setSelectedPoster(filteredPosters[prevIndex]);
    }
  };

  const isLight = theme === 'light';

  return (
    <div id="posters" className={`w-full ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Records · 54+ Placed Students
          </div>
          <h2 className={`h1 text-3xl sm:text-5xl font-black uppercase tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
            {title}
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-light max-w-2xl leading-relaxed ${isLight ? 'text-neutral-700' : 'text-neutral-400'}`}>
            {subtitle}
          </p>
        </div>

        {showViewAllLink && (
          <Link
            to="/placement"
            className="btn ghost !h-11 !px-5 text-xs flex items-center gap-2 self-start md:self-auto !border-emerald-500/40 !text-emerald-400 hover:!bg-emerald-500/10 shrink-0"
          >
            <span>View All 54 Placed Students</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Filter and Search Controls (if enabled) */}
      {(showFilters || showSearch) && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Filter Chips */}
            {showFilters && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleFilterChange(cat.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                      activeFilter === cat.key
                        ? 'bg-white text-black shadow-lg scale-105'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-1.5 text-[10px] opacity-70`}>({cat.count})</span>
                  </button>
                ))}
              </div>
            )}

            {/* Instant Search Bar */}
            {showSearch && (
              <div className="relative w-full lg:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search student, company, role..."
                  className="w-full pl-9 pr-8 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Active Result Count / Search Feedback */}
          {searchQuery && (
            <div className="text-xs text-neutral-400 font-mono">
              Found <strong className="text-white">{filteredPosters.length}</strong> student announcements matching "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Grid of Placement Poster Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {displayedPosters.map((poster) => (
          <div
            key={poster.id}
            onClick={() => setSelectedPoster(poster)}
            className="group relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer"
          >
            {/* Top Poster Image Frame */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
              <img
                src={poster.posterImage}
                alt={`${poster.name} - ${poster.role} placed at ${poster.company}`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:from-black/80 transition-opacity" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                {poster.isGulf ? (
                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Gulf Placement</span>
                  </span>
                ) : poster.type === 'Entrepreneur' ? (
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-black text-[10px] font-mono font-black uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Founder</span>
                  </span>
                ) : poster.type === 'Faculty' ? (
                  <span className="px-2.5 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>Instructor</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Placed Student</span>
                  </span>
                )}

                <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>

              {/* Bottom Overlay Label */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {poster.category}
                </div>
                <h3 className="text-base font-extrabold text-white truncate drop-shadow">
                  {poster.name}
                </h3>
              </div>
            </div>

            {/* Bottom Card Content Info */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800/80 space-y-2">
              <div className="flex items-start gap-2 text-xs text-neutral-300">
                <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span className="font-semibold line-clamp-1">{poster.role}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{poster.company}</span>
              </div>

              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-500" />
                  <span className="truncate max-w-[130px]">{poster.location}</span>
                </span>
                <span className="text-emerald-400 font-bold group-hover:underline">
                  View Poster →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progressive Load Button for Silky Smooth Rendering */}
      {!limit && filteredPosters.length > visibleCount && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 16, filteredPosters.length))}
            className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-emerald-500/50 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <span>Show More Placements</span>
            <span className="text-emerald-400 font-mono">({visibleCount} of {filteredPosters.length})</span>
          </button>
        </div>
      )}

      {filteredPosters.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-400 mt-8">
          <p className="text-base font-bold text-white">No placement records matched your search</p>
          <p className="text-xs text-neutral-500 mt-1">Try searching another name or reset filters.</p>
          <button
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-neutral-900 border border-neutral-700 text-xs font-bold text-white rounded-full uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedPoster && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 sm:p-6"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] bg-neutral-950 border border-neutral-800 rounded-3xl overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row minimal-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster Image Area */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center p-2 sm:p-4 min-h-[260px] sm:min-h-[350px] md:min-h-[580px] shrink-0">
              <img
                src={selectedPoster.posterImage}
                alt={`${selectedPoster.name} official placement offer`}
                className="max-h-[50vh] md:max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev / Next controls */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Previous poster"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Next poster"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Poster Details Sidebar */}
            <div className="md:w-2/5 p-5 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-800 bg-neutral-950 text-white shrink-0">
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Placement Announcement</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {selectedPoster.name}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-400 mt-1">
                    {selectedPoster.role}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-900 text-sm">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
                      Hiring Company / Studio
                    </div>
                    <div className="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                      <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{selectedPoster.company}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
                      Location / Territory
                    </div>
                    <div className="text-sm font-semibold text-neutral-200 flex items-center gap-2 mt-0.5">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>{selectedPoster.location}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
                      Discipline &amp; Track
                    </div>
                    <div className="text-sm font-semibold text-neutral-200 mt-0.5">
                      {selectedPoster.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-900 space-y-3">
                <div className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                  Every Lenor graduate is trained under commercial set conditions with 100% equipment access, producing client-ready portfolios.
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Lenor Academy Placement Cell</span>
                  <span className="text-emerald-400 font-bold">100% Assurance</span>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PlacementGallery;

