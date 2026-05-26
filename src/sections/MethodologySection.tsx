import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Mountain, Layers, Waves, Globe } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <Cloud size={28} />,
    title: 'Atmosphere CO₂ & Rainfall',
    subtitle: 'The Trigger',
    description: 'Rainwater absorbs atmospheric CO₂, forming carbonic acid — nature\'s primary weathering agent. This is the starting point of the 5,000-year permanence chain.',
    color: '#4A8C3F',
    bgColor: '#E8F2E5',
    image: '/atmco2.jpg?w=600&q=80&fit=crop',
  },
  {
    number: '02',
    icon: <Mountain size={28} />,
    title: 'Silicate Rock + Biochar Applied',
    subtitle: 'The Catalyst',
    description: 'Crushed Deccan Trap basalt (<100 microns) and pyrolyzed biochar are co-applied to agricultural soils at 20 tons/hectare — accelerating natural weathering by orders of magnitude.',
    color: '#8B6F47',
    bgColor: '#F5EFE6',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop',
  },
  {
    number: '03',
    icon: <Layers size={28} />,
    title: 'Soil Integration',
    subtitle: 'The Reaction',
    description: 'Carbonic acid dissolves silicate minerals, releasing calcium and magnesium ions bound to bicarbonate (HCO₃⁻). Soil biology is enhanced; crop yields improve immediately.',
    color: '#2D6A2D',
    bgColor: '#E8F2E5',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop',
  },
  {
    number: '04',
    icon: <Waves size={28} />,
    title: 'Riverine Transport',
    subtitle: 'The Journey',
    description: 'Dissolved bicarbonate is carried by groundwater and rivers toward the ocean — a natural, irreversible conveyor belt that cannot be reversed by fire, disease, or deforestation.',
    color: '#1E6091',
    bgColor: '#E5F0F7',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80&fit=crop',
  },
  {
    number: '05',
    icon: <Globe size={28} />,
    title: '5,000+ Year Oceanic Storage',
    subtitle: 'The Lock-In',
    description: 'Bicarbonate integrates into oceanic alkalinity — a thermodynamically stable sink. Carbon is locked away for millennia, meeting and exceeding IPCC\'s 1,000-year CDR durability standard.',
    color: '#0A3B5C',
    bgColor: '#E0EEF7',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop',
  },
];

export const MethodologySection: React.FC = () => {
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const container = stickyContainerRef.current;
      const cards = cardsRef.current;

      if (!container || !cards) return;

      const rect = container.getBoundingClientRect();

      // How far section has progressed through viewport
      const scrollStart = window.innerHeight;
      const scrollEnd = container.offsetHeight;

      const current = -rect.top;

      const progress = Math.min(
        Math.max(current / (scrollEnd - scrollStart), 0),
        1
      );

      // Total horizontal overflow
      const maxTranslate =
        cards.scrollWidth - window.innerWidth;

      const translateX = progress * maxTranslate;

      cards.style.transform = `translate3d(-${translateX}px,0,0)`;

      // Active card
      const index = Math.round(
        progress * (steps.length - 1)
      );

      setActiveStep(index);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id="methodology" className="relative">
      {/* Section label above sticky area */}
      <div className="bg-vc-offwhite py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <p className="section-label mb-4">The Carbon Cycle</p>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="display-heading text-4xl md:text-5xl font-bold max-w-xl">
                From Atmosphere{' '}
                <span className="text-vc-green italic">to Permanent</span>
                {' '}Ocean Storage
              </h2>
              <p className="text-vc-text-muted text-base max-w-sm leading-relaxed">
                Scroll through the 5-step journey that locks carbon away for over 5,000 years.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky horizontal scroll */}
      <div
        ref={stickyContainerRef}
        className="relative"
        style={{ height: `${steps.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-vc-parchment" ref={scrollTrackRef}>
          {/* Progress dots */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`transition-all duration-500 rounded-full ${i === activeStep
                  ? 'w-8 h-2.5 bg-vc-green'
                  : i < activeStep
                    ? 'w-2.5 h-2.5 bg-vc-green-light'
                    : 'w-2.5 h-2.5 bg-vc-green/25'
                  }`}
              />
            ))}
          </div>

          {/* Cards container */}
          <div className="h-full flex items-center overflow-hidden">
            <div
              ref={cardsRef}
              className="flex gap-6 px-[8vw]"
              style={{
                width: 'max-content',
                willChange: 'transform',
              }}
            >
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className={`w-[85vw] md:w-[600px] h-[78vh] rounded-3xl overflow-hidden flex-shrink-0 border-2 transition-all duration-500 ${idx === activeStep
                    ? 'border-vc-green shadow-2xl shadow-vc-green/20 scale-100'
                    : 'border-vc-green/10 scale-[0.97] opacity-80'
                    }`}
                  style={{ backgroundColor: step.bgColor }}
                >
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${step.bgColor})` }} />
                      <div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: step.color + '20', color: step.color, border: `1.5px solid ${step.color}30` }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-7 flex flex-col">
                      <div className="flex items-start gap-4 mb-5">
                        <span className="font-mono text-6xl font-bold opacity-10 leading-none" style={{ color: step.color }}>
                          {step.number}
                        </span>
                        <div>
                          <span
                            className="font-mono text-xs tracking-widest uppercase block mb-1"
                            style={{ color: step.color }}
                          >
                            {step.subtitle}
                          </span>
                          <h3 className="font-display text-2xl font-bold text-vc-dark leading-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-vc-text-muted leading-relaxed flex-1">{step.description}</p>

                      {/* Step connector */}
                      {idx < steps.length - 1 && (
                        <div className="mt-5 flex items-center gap-2 text-xs font-mono" style={{ color: step.color }}>
                          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
                          <span>Next: {steps[idx + 1].subtitle}</span>
                        </div>
                      )}
                      {idx === steps.length - 1 && (
                        <div
                          className="mt-5 py-3 px-5 rounded-2xl text-center text-sm font-medium"
                          style={{ backgroundColor: step.color + '15', color: step.color }}
                        >
                          ∞ Thermodynamically Stable — Permanent Storage
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-6 right-8 text-vc-text-muted/50 font-mono text-xs tracking-widest flex items-center gap-2">
            SCROLL TO PROGRESS
            <div className="w-8 h-px bg-vc-text-muted/30" />
          </div>
        </div>

      </div>
    </section>
  );
};
