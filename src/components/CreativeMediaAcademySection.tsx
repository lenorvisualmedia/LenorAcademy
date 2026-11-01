import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatedContent } from './AnimatedContent';

interface Slide {
  image: string;
  alt: string;
  caption: string;
}

const SLIDES: Slide[] = [
  {
    image: '/assets/430e290e-ef97-4964-a65b-a23923adad3f.webp',
    alt: 'Lenor Academy building at Makkaraparamba',
    caption: 'Makkaraparamba Campus'
  },
  {
    image: '/assets/c01459e8-da36-4de6-bd3a-a062c8e3c669.webp',
    alt: 'Lenor Academy professional studio lighting floor with commercial shoot',
    caption: 'Studio Lighting Floor'
  },
  {
    image: '/assets/4b32a154-0d06-4137-bfbe-d8c580a9073f.webp',
    alt: 'Lenor Academy cinematography and video lab with high-end camera rigs',
    caption: 'Cinematography & Rigging Floor'
  },
  {
    image: '/assets/92829f40-f725-4982-bb4c-b75dfa06bac4.webp',
    alt: 'Lenor Academy digital editing suites and color grading consoles',
    caption: 'Post-Production Suites'
  }
];

export const CreativeMediaAcademySection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-black text-white px-4 sm:px-10 lg:px-14 py-16 sm:py-24">
      <AnimatedContent distance={40} duration={0.8} threshold={0.1} once={false}>
        {/* Header Row: Title & Circular Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.95]">
            A Creative Media<br />Academy
          </h2>

          <div className="flex items-center gap-3 self-end sm:self-auto pb-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Campus Image & Slides */}
        <div className="relative mt-4 sm:mt-6 w-full rounded-[20px] sm:rounded-[28px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] bg-neutral-900 border border-white/10 shadow-2xl group">
          {SLIDES.map((slide, idx) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                idx === currentSlide
                  ? 'opacity-100 z-10 scale-100'
                  : 'opacity-0 z-0 pointer-events-none scale-105'
              }`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Two-Column Info: Our Mission & Visit Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-10 sm:pt-14">
          <div>
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
              Our Mission
            </div>
            <p className="mt-3 text-base sm:text-lg lg:text-xl font-light text-[#e6e6e6] leading-relaxed max-w-lg">
              To empower individuals with the knowledge, skills, and confidence to thrive in the dynamic world of visual storytelling.
            </p>
          </div>

          <div>
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#a39c94]">
              Visit Us
            </div>
            <p className="mt-3 text-base sm:text-lg lg:text-xl font-light text-[#e6e6e6] leading-relaxed max-w-lg">
              Lenor Academy, CP Building, Makkaraparamba, Malappuram<br />
              <span className="text-white font-medium">+91 91883 74232</span> ·{' '}
              <a
                href="https://www.lenoracademy.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300 hover:text-white underline decoration-white/30 hover:decoration-white transition-colors"
              >
                www.lenoracademy.com
              </a>
            </p>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
};

export default CreativeMediaAcademySection;

