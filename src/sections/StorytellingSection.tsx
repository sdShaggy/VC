import React, { useEffect, useRef, useState } from 'react';

const STORY_IMAGES = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80&fit=crop', // field
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80&fit=crop', // basalt
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80&fit=crop', // rocks
  'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=1400&q=80&fit=crop', // ocean
];

const stories = [
  {
    label: 'The Challenge',
    heading: 'India\'s Soil Crisis',
    body: 'Over 120 million smallholder farmers depend on soils that are increasingly acidic, depleted of nutrients, and vulnerable to erratic monsoons. Climate change is accelerating degradation, thus reducing yields, deepening poverty.',
    stat: '120M+',
    statLabel: 'Farmers Affected',
  },
  {
    label: 'The Insight',
    heading: 'Earth Has Been Doing This For Billions of Years',
    body: 'Silicate rock weathering is the planet\'s own carbon thermostat - a geologic process that has regulated atmospheric CO₂ for eons. We\'re not inventing something new. We\'re accelerating what nature already does.',
    stat: '5,000+',
    statLabel: 'Years of Permanence',
  },
  {
    label: 'The Solution',
    heading: 'Giving Nature a Head Start',
    body: 'By grinding Deccan Trap basalt to <100 microns and co-deploying with biochar, we compress millions of years of natural weathering into decades, while the farmers whose land we treat see immediate soil health and yield improvements.',
    stat: '20 t/ha',
    statLabel: 'Application Rate',
  },
  {
    label: 'The Vision',
    heading: 'India as the World\'s CDR Powerhouse',
    body: 'India holds some of the world\'s richest basalt deposits and most degraded agricultural land. Our hyper-localized model can scale to 100,000+ tons of basalt across 5,000+ hectares by 2029, generating verified, permanent carbon removal at gigaton trajectory.',
    stat: '100,000',
    statLabel: 'Tons by 2029',
  },
];

export const StorytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.offsetTop;
      const windowH = window.innerHeight;
      const scrolled = window.scrollY - containerTop;
      const containerH = container.offsetHeight;

      const scrollRange = containerH - windowH;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      const idx = Math.min(Math.floor(progress * stories.length), stories.length - 1);
      setActiveIdx(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${stories.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background images with crossfade */}
        {stories.map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === activeIdx ? 1 : 0 }}
          >
            <img
              src={STORY_IMAGES[i]}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-vc-dark/85 via-vc-dark/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-vc-dark/40 to-vc-dark/70 z-10" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              {stories.map((story, i) => (
                <div
                  key={story.label}
                  className="absolute transition-all duration-700"
                  style={{
                    opacity: i === activeIdx ? 1 : 0,
                    transform: i === activeIdx ? 'translateY(0)' : i < activeIdx ? 'translateY(-30px)' : 'translateY(30px)',
                    pointerEvents: i === activeIdx ? 'auto' : 'none',
                  }}
                >
                  <p className="font-mono text-xs tracking-widest text-vc-green-pale mb-4 uppercase">
                    {story.label} — {String(i + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-vc-offwhite leading-tight mb-6">
                    {story.heading}
                  </h2>
                  <p className="text-vc-parchment/80 text-base md:text-lg leading-relaxed mb-8 font-light">
                    {story.body}
                  </p>
                  <div className="inline-flex items-end gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-4">
                    <span className="font-display text-4xl font-bold text-vc-green-pale">{story.stat}</span>
                    <span className="font-mono text-xs text-vc-green-pale/70 mb-1 tracking-wider uppercase">{story.statLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {stories.map((_, i) => (
            <div
              key={i}
              className={`w-0.5 transition-all duration-500 rounded-full ${
                i === activeIdx ? 'h-10 bg-vc-green-pale' : i < activeIdx ? 'h-5 bg-vc-green-pale/50' : 'h-5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Section label */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
          <p className="font-mono text-xs text-vc-green-pale/60 tracking-[0.3em] uppercase text-center">Our Story</p>
        </div>
      </div>
    </div>
  );
};
