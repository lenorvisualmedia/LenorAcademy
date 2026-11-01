import React, { useState } from 'react';
import { Clock, ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/academyData';
import { ArticleModal } from '../components/ArticleModal';
import { AnimatedContent } from '../components/AnimatedContent';
import { InvestmentSection } from '../components/InvestmentSection';

interface BlogPageProps {
  onOpenEnrol?: (programId?: string) => void;
  onOpenBrochure?: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenEnrol = () => {},
  onOpenBrochure = () => {}
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Photography' | 'Videography' | 'Editing' | 'Design' | 'Careers'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Article Reader Modal */}
      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* HEADER HERO */}
      <AnimatedContent
        trigger="mount"
        distance={50}
        duration={0.8}
      >
        <section className="px-4 sm:px-10 pt-8 sm:pt-14 pb-4">
          <div className="eye text-[#8a8a8a]">Notes from the studio</div>
          <h1 className="h1 text-6xl sm:text-8xl lg:text-[140px] text-white mt-4 leading-[0.9]">
            Blog
          </h1>
          <p className="lead text-2xl sm:text-4xl text-neutral-300 mt-6 max-w-3xl font-light">
            Lessons, techniques and stories from the people who teach and learn at Lenor.
          </p>
        </section>
      </AnimatedContent>

      {/* FEATURED ARTICLE HERO CARD */}
      <AnimatedContent
        distance={60}
        duration={0.85}
        threshold={0.1}
      >
        <section className="card min-h-[500px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-neutral-200 !bg-white !text-black shadow-xl">
          <div className="p-8 sm:p-12 flex flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-black border border-neutral-300 text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Featured · {featured.category}
              </div>

              <h2 className="h1 text-3xl sm:text-5xl text-black leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-neutral-700 font-light mt-4 leading-relaxed max-w-lg">
                {featured.summary}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 text-xs text-neutral-600 font-semibold mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span className="text-black font-bold">{featured.author}</span>
              </div>

              <button
                onClick={() => setSelectedArticle(featured)}
                className="btn !h-12 !px-8 text-xs font-extrabold tracking-wider bg-black text-white hover:bg-neutral-800"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>

            {/* Featured Image */}
            <div className="h-[320px] lg:h-auto relative overflow-hidden bg-[#1a1a1a]">
              <img
                src={featured.image}
                alt={featured.imageAlt}
                className="cover gs hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
        </section>
      </AnimatedContent>

      {/* FILTER & SEARCH BAR */}
      <section className="px-4 sm:px-10 pt-4">
        <AnimatedContent
          distance={40}
          duration={0.7}
          threshold={0.15}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#262626]"
        >
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Photography', 'Videography', 'Editing', 'Design', 'Careers'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`chip cursor-pointer ${activeCategory === cat ? 'on' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search studio notes..."
              className="w-full bg-white border border-neutral-300 rounded-full pl-9 pr-4 py-2 text-xs text-black placeholder-neutral-500 focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </AnimatedContent>

        {/* ARTICLES GRID */}
        <AnimatedContent
          distance={50}
          duration={0.8}
          stagger={0.1}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedArticle(post)}
              className="card !bg-white !text-black border border-neutral-200 overflow-hidden flex flex-col justify-between cursor-pointer group hover:border-black/30 hover:shadow-xl transition-all duration-300 shadow-md"
            >
              <div>
                {/* Image */}
                <div className="h-48 overflow-hidden bg-neutral-100 relative">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="cover gs group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/90 text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono mb-2">
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="h1 text-2xl text-black group-hover:text-neutral-800 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-700 font-light mt-3 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="px-6 pb-6 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
                <span className="font-bold text-black">{post.author}</span>
                <span className="text-black font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
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
