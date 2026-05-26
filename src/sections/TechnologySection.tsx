import React, { useEffect, useRef } from 'react';
import { Zap, Layers, FlaskConical, Leaf } from 'lucide-react';

const BASALT_IMAGE = '/erw_1.png?w=900&q=80&fit=crop';
const SOIL_IMAGE = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80&fit=crop';

export const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const technologies = [
    {
      number: '01',
      icon: <Layers size={20} />,
      title: 'Enhanced Rock Weathering (ERW)',
      subtitle: 'Accelerating Earth\'s natural cycle',
      description: 'Finely crushed Deccan Trap basalt (<100 microns) is applied to agricultural soils. Rainwater reacts with the silicate minerals, pulling CO₂ from the atmosphere and forming stable bicarbonate, permanently stored in the ocean.',
      specs: ['15–20% Ca+Mg content', '20 tons/hectare rate', 'XRF & ICP-OES verified', 'Zero hazardous metals'],
      color: 'vc-green',
      image: BASALT_IMAGE,
    },
    {
      number: '02',
      icon: <FlaskConical size={20} />,
      title: 'Biochar Carbon Removal',
      subtitle: 'Converting invasive species to stable carbon',
      description: 'Invasive plant species (Prosopis juliflora, Lantana camara) are harvested and converted through pyrolysis into biochar which is a geologically stable, carbon-rich material with 1,000+ year permanence. Applied to soils, it acts as a bio-fertilizer.',
      specs: ['H/Corg ≤ 0.7', 'TOC ≥ 10%', 'PAH ≤ 12 mg/kg', 'CSI C-sink registry'],
      color: 'vc-earth',
      image: SOIL_IMAGE,
    },
    {
      number: '03',
      icon: <Zap size={20} />,
      title: 'Synergistic Co-Deployment',
      subtitle: 'The sum is greater than its parts',
      description: 'By deploying ERW and Biochar together, we unlock compounding benefits: basalt\'s alkalinity maximizes biochar effectiveness, biochar improves water retention for weathering reactions, and together they deliver measurable yield improvements to farmers.',
      specs: ['>5,000 yr storage', 'Synergistic interaction', 'Bio-fertilizer benefit', 'Soil health verified'],
      color: 'vc-green-light',
      image: null,
    },
  ];

  return (
    <section id="technology" ref={sectionRef} className="py-28 bg-vc-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-0 w-1/3 h-full bg-gradient-to-l from-vc-green-mist/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="reveal text-center mb-20">
          <p className="section-label mb-4">The TECH BEHIND</p>
          <h2 className="display-heading text-4xl md:text-5xl font-bold mb-5">
            ERW + Biochar: A{' '}
            <span className="text-vc-green italic">Synergistic</span>
            {' '}Approach
          </h2>
          <p className="text-vc-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            By co-deploying highly reactive alkaline minerals with biochar, we capture atmospheric CO₂ and lock it away for over 5,000 years.
          </p>
        </div>

        {/* Tech cards */}
        <div className="space-y-10">
          {technologies.map((tech, idx) => (
            <div
              key={tech.number}
              className={`reveal`}
            >
              <div className={` card-surface overflow-hidden flex flex-col lg:flex-row ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} min-h-[520px] `} >
                {tech.image && (
                  <div className="lg:w-2/5 min-h-[320px] lg:min-h-full relative overflow-hidden">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                  </div>
                )}

                {/* Content side */}
                <div className={`${tech.image ? 'lg:w-3/5' : 'w-full'} p-8 lg:p-10`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-5xl font-bold text-vc-green/10 leading-none">{tech.number}</span>
                      <div className={`w-10 h-10 bg-${tech.color}/10 rounded-xl flex items-center justify-center text-vc-green`}>
                        {tech.icon}
                      </div>
                    </div>
                    <div className="bg-vc-green-mist border border-vc-green/20 px-3 py-1 rounded-full">
                      <span className="font-mono text-xs text-vc-green">{tech.subtitle}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-vc-dark mb-4">{tech.title}</h3>
                  <p className="text-vc-text-muted leading-relaxed mb-6">{tech.description}</p>

                  {/* Spec tags */}
                  <div className="flex flex-wrap gap-2">
                    {tech.specs.map(spec => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1.5 bg-white border border-vc-green/15 text-vc-text text-xs px-3 py-1.5 rounded-full"
                      >
                        <Leaf size={10} className="text-vc-green-light" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key result callout */}
        <div
          className="reveal mt-16 rounded-3xl p-10 text-center relative overflow-hidden group cursor-default transition-all duration-700"
          style={{ backgroundColor: '#1A2B1A' }}
        >
          {/* Base gradient — always visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-vc-green/20 to-transparent rounded-3xl transition-opacity duration-700 group-hover:opacity-0" />

          {/* Hover gradient: green → deep forest → dark teal */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(135deg, #2D6A2D 0%, #1A4A3A 45%, #0D3B4A 100%)',
            }}
          />

          {/* Shimmer sweep on hover */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(200,223,196,0.06) 50%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <p className="font-mono text-vc-green-sage text-xs tracking-widest mb-4 transition-colors duration-500 group-hover:text-vc-green-pale/80">
              THE RESULT
            </p>
            <p className="font-display text-3xl md:text-4xl font-bold text-vc-offwhite mb-4 transition-colors duration-500">
              A synergistic approach that maximizes high-permanence
              <span className="text-vc-green-pale italic group-hover:text-white transition-colors duration-500"> carbon drawdown </span>
              while delivering a potent bio-fertilizer to degraded agricultural soils.
            </p>

            {/* Divider line that expands on hover */}
            <div className="flex justify-center mt-8 mb-6">
              <div className="h-px w-16 bg-vc-green-pale/20 group-hover:w-48 transition-all duration-700 rounded-full" />
            </div>

            <div className="flex justify-center gap-8 flex-wrap">
              {[
                { val: '>5,000', unit: 'Years', label: 'Carbon Storage' },
                { val: '52.5', unit: 'Hectares', label: 'Pilot Deployment' },
                { val: '575', unit: 'Tons', label: 'Credits Offered' },
              ].map(s => (
                <div
                  key={s.label}
                  className="text-center px-6 py-4 rounded-2xl transition-all duration-500 group-hover:bg-white/5"
                >
                  <div className="font-display text-3xl font-bold text-vc-green-pale leading-none transition-all duration-500 group-hover:text-white group-hover:scale-110 inline-block">
                    {s.val}
                  </div>
                  <div className="font-mono text-xs text-vc-green-sage mt-1 transition-colors duration-500 group-hover:text-vc-green-pale/70">
                    {s.unit}
                  </div>
                  <div className="font-sans text-xs text-vc-offwhite/50 mt-0.5 transition-colors duration-500 group-hover:text-vc-offwhite/80">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
