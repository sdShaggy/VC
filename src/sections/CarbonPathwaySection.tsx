import React, { useEffect, useRef, useState } from 'react';
import { Cloud, Mountain, Layers, Waves, Globe, ArrowDown } from 'lucide-react';

const STEP_IMAGES = [
  'https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80&fit=crop', // rain/clouds
  'https://images.unsplash.com/photo-1601134467661-3d775b999c0b?w=800&q=80&fit=crop', // basalt rocks
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop', // soil roots
  'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80&fit=crop', // river
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80&fit=crop', // ocean
];

const steps = [
  {
    number: '01',
    icon: Cloud,
    title: 'Atmosphere CO₂ & Rainfall',
    subtitle: 'The Trigger',
    description:
      'Rainwater absorbs atmospheric CO₂, forming carbonic acid — nature\'s primary weathering agent. This weak acid is the starting point of a geochemical chain that locks carbon away for millennia.',
    metric: '420 ppm',
    metricLabel: 'Atmospheric CO₂',
    color: '#4A8C3F',
    lightColor: '#E8F2E5',
  },
  {
    number: '02',
    icon: Mountain,
    title: 'Silicate Rock + Biochar Applied',
    subtitle: 'The Catalyst',
    description:
      'Finely crushed Deccan Trap basalt (<100 microns) and pyrolyzed biochar are co-applied to agricultural soils at 20 tons/hectare — accelerating natural weathering by orders of magnitude while acting as a powerful bio-fertilizer.',
    metric: '20 t/ha',
    metricLabel: 'Application Rate',
    color: '#8B6F47',
    lightColor: '#F5EFE6',
  },
  {
    number: '03',
    icon: Layers,
    title: 'Soil Integration',
    subtitle: 'The Reaction',
    description:
      'Carbonic acid dissolves silicate minerals, releasing calcium and magnesium ions that bind with bicarbonate (HCO₃⁻). Soil pH rises, crop yields improve, and biological activity accelerates — measurable within a single growing season.',
    metric: '15–20%',
    metricLabel: 'Ca+Mg Content',
    color: '#2D6A2D',
    lightColor: '#E8F2E5',
  },
  {
    number: '04',
    icon: Waves,
    title: 'Riverine Transport',
    subtitle: 'The Journey',
    description:
      'Dissolved bicarbonate is carried by groundwater and rivers toward the ocean — a natural, irreversible conveyor belt that cannot be undone by fire, disease, or land-use change. This is what makes ERW structurally superior to afforestation.',
    metric: '100%',
    metricLabel: 'Irreversible Pathway',
    color: '#1E6091',
    lightColor: '#E5F0F7',
  },
  {
    number: '05',
    icon: Globe,
    title: '5,000+ Year Oceanic Storage',
    subtitle: 'The Lock-In',
    description:
      'Bicarbonate integrates into oceanic alkalinity — a thermodynamically stable sink. Carbon is locked away for millennia, exceeding IPCC\'s 1,000-year CDR durability standard and meeting the most stringent SBTi requirements.',
    metric: '>5,000',
    metricLabel: 'Years of Permanence',
    color: '#0A3B5C',
    lightColor: '#E0EEF7',
  },
];

export const CarbonPathwaySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => new Set([...prev, i]));
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="carbon-pathway"
      ref={sectionRef}
      className="py-28 bg-vc-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-vc-green/20 to-transparent" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-vc-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-vc-green/4 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-vc-green-light mb-4">
            Carbon Pathway
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-vc-offwhite leading-tight mb-5">
            From Atmosphere{' '}
            <span className="text-vc-green-pale italic">to Ocean</span>
          </h2>
          <p className="text-vc-parchment/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A natural, accelerated carbon cycle — permanently sequestering CO₂ as
            stable oceanic bicarbonate for over 5,000 years.
          </p>

          {/* Timeline dots row */}
          <div className="flex items-center justify-center gap-0 mt-14 mb-2 px-4">
            {steps.map((step, i) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-700 ${
                      visibleSteps.has(i)
                        ? 'border-vc-green-light bg-vc-green/20 scale-110'
                        : 'border-vc-green/25 bg-transparent'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        visibleSteps.has(i) ? 'bg-vc-green-light' : 'bg-vc-green/30'
                      }`}
                    />
                    <span
                      className={`absolute -top-5 font-mono text-[10px] font-bold transition-colors duration-500 ${
                        visibleSteps.has(i) ? 'text-vc-green-light' : 'text-vc-green/30'
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-px flex-1 mx-1 transition-all duration-700 rounded-full ${
                      visibleSteps.has(i) && visibleSteps.has(i + 1)
                        ? 'bg-vc-green-light'
                        : visibleSteps.has(i)
                        ? 'bg-gradient-to-r from-vc-green-light to-vc-green/20'
                        : 'bg-vc-green/15'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.has(i);
            const isEven = i % 2 === 0;

            return (
              <div key={step.number}>
                <div
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className={`flex flex-col lg:flex-row items-stretch gap-0 rounded-3xl overflow-hidden border transition-all duration-700 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-y-0 border-vc-green/20'
                      : 'opacity-0 translate-y-10 border-transparent'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  {/* Image Panel */}
                  <div className="lg:w-2/5 h-52 lg:h-auto relative overflow-hidden flex-shrink-0">
                    <img
                      src={STEP_IMAGES[i]}
                      alt={step.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isVisible ? 'scale-100' : 'scale-110'
                      }`}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(${isEven ? '270deg' : '90deg'}, ${step.color}CC 0%, transparent 60%)`,
                      }}
                    />
                    {/* Step number overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-display font-bold text-[120px] leading-none select-none pointer-events-none"
                        style={{ color: `${step.color}30` }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content Panel */}
                  <div
                    className="flex-1 p-8 lg:p-10 flex flex-col justify-center"
                    style={{ backgroundColor: `${step.color}12` }}
                  >
                    {/* Icon + subtitle */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${step.color}25`, color: step.color === '#4A8C3F' || step.color === '#2D6A2D' ? '#7AAB74' : step.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <span
                          className="font-mono text-xs tracking-widest uppercase block"
                          style={{ color: step.color === '#4A8C3F' || step.color === '#2D6A2D' ? '#7AAB74' : step.color }}
                        >
                          Step {step.number} — {step.subtitle}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl font-bold text-vc-offwhite mb-4 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-vc-parchment/65 leading-relaxed mb-7 text-sm md:text-base">
                      {step.description}
                    </p>

                    {/* Metric pill */}
                    <div className="flex items-center gap-4">
                      <div
                        className="inline-flex items-end gap-2 px-5 py-3 rounded-2xl border"
                        style={{
                          backgroundColor: `${step.color}15`,
                          borderColor: `${step.color}30`,
                        }}
                      >
                        <span
                          className="font-display text-2xl font-bold leading-none"
                          style={{ color: step.color === '#4A8C3F' || step.color === '#2D6A2D' ? '#C8DFC4' : '#C8DFC4' }}
                        >
                          {step.metric}
                        </span>
                        <span className="font-mono text-xs text-vc-parchment/50 mb-0.5 tracking-wide uppercase">
                          {step.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector arrow between steps */}
                {i < steps.length - 1 && (
                  <div
                    className={`flex justify-center py-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-6 bg-gradient-to-b from-vc-green/40 to-vc-green/10" />
                      <ArrowDown size={14} className="text-vc-green/40" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom permanence callout */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-vc-green/10 border border-vc-green/20 rounded-full px-8 py-4">
            <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
            <span className="font-mono text-sm text-vc-green-pale tracking-wider">
              Estimated Time Horizon: Multi-decadal physical weathering cycle → &gt;5,000 year oceanic storage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
