import React, { useEffect, useRef } from 'react';
import { Zap, Layers, FlaskConical } from 'lucide-react';

const BASALT_IMAGE = '/erw_1.png?w=900&q=80&fit=crop';
const SOIL_IMAGE = 'https://veridiancarbon.com/images/VERIDIAN%20PHOTOS/IMG_1482.JPG';

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
      subtitle: "Accelerating Earth's natural cycle",
      description:
        'Finely crushed Deccan Trap basalt (<100 microns) is applied to agricultural soils. Rainwater reacts with the silicate minerals, pulling CO₂ from the atmosphere and forming stable bicarbonate, permanently stored in the ocean.',
      specs: [
        { label: 'Ca+Mg Content', value: '15–20%' },
        { label: 'Application Rate', value: '20 t/ha' },
        { label: 'Verification', value: 'XRF & ICP-OES' },
        { label: 'Heavy Metals', value: 'Zero' },
      ],
      image: BASALT_IMAGE,
    },
    {
      number: '02',
      icon: <FlaskConical size={20} />,
      title: 'Biochar Carbon Removal',
      subtitle: 'Converting invasive species to stable carbon',
      description:
        'Invasive species (Prosopis juliflora, Lantana camara) are harvested and pyrolysed at 800°C in Kon-Tiki kilns - producing geologically stable, carbon-rich biochar with 1,000+ year permanence and 72% carbon purity.',
      specs: [
        { label: 'H/Corg Ratio', value: '≤ 0.7' },
        { label: 'Organic Carbon', value: 'TOC ≥ 10%' },
        { label: 'PAH Limit', value: '≤ 12 mg/kg' },
        { label: 'Registry', value: 'CSI C-sink' },
      ],
      image: SOIL_IMAGE,
    },
    {
      number: '03',
      icon: <Zap size={20} />,
      title: 'Synergistic Co-Deployment',
      subtitle: 'The sum is greater than its parts',
      description:
        "By deploying ERW and Biochar together, we unlock compounding benefits: basalt's alkalinity maximises biochar effectiveness, biochar improves water retention for weathering reactions, and together they deliver measurable yield improvements.",
      specs: [
        { label: 'Storage', value: '>5,000 yrs' },
        { label: 'Yield Boost', value: '+40%' },
        { label: 'Soil pH', value: 'Corrected' },
        { label: 'Net CO₂', value: '0.87t/t gross' },
      ],
      image: null,
    },
  ];

  return (
    <section id="technology" ref={sectionRef} className="py-28 bg-vc-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
      <div className="absolute top-20 right-0 w-1/3 h-full bg-gradient-to-l from-vc-green-mist/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="reveal text-center mb-20">
          <p className="section-label mb-4">The Tech Behind</p>
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
        <div className="space-y-8">
          {technologies.map((tech, idx) => (
            <div key={tech.number} className="reveal">
              <div
                className={`card-surface overflow-hidden flex flex-col lg:flex-row min-h-[420px] ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                {tech.image && (
                  <div className="lg:w-2/5 min-h-[260px] lg:min-h-full relative overflow-hidden flex-shrink-0">
                    <img
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                    {/* Number watermark on image */}
                    <div className="absolute bottom-4 left-4">
                      <span className="font-display text-7xl font-bold text-white/10 leading-none select-none">
                        {tech.number}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`${tech.image ? 'lg:w-3/5' : 'w-full'} p-8 lg:p-10 flex flex-col justify-between`}>
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        {!tech.image && (
                          <span className="font-mono text-5xl font-bold text-vc-green/10 leading-none">
                            {tech.number}
                          </span>
                        )}
                        <div className="w-10 h-10 bg-vc-green-mist rounded-xl flex items-center justify-center text-vc-green">
                          {tech.icon}
                        </div>
                      </div>
                      <div className="bg-vc-green-mist border border-vc-green/20 px-3 py-1 rounded-lg">
                        <span className="font-mono text-xs text-vc-green">{tech.subtitle}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-vc-dark mb-3">{tech.title}</h3>
                    <p className="text-vc-text-muted leading-relaxed mb-7">{tech.description}</p>
                  </div>

                  {/* Specs — table style instead of pills */}
                  <div className="border border-vc-green/10 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-y divide-vc-green/8">
                      {tech.specs.map((spec) => (
                        <div key={spec.label} className="flex flex-col px-5 py-4 bg-white/40">
                          <span className="font-mono text-[10px] text-vc-text-muted/60 uppercase tracking-wider mb-1">
                            {spec.label}
                          </span>
                          <span className="font-display font-bold text-vc-green text-lg leading-tight">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* THE RESULT callout — keep your hover gradient from before */}
        <div
          className="reveal mt-14 rounded-3xl p-10 text-center relative overflow-hidden group cursor-default transition-all duration-700"
          style={{ backgroundColor: '#1A2B1A' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-vc-green/20 to-transparent rounded-3xl transition-opacity duration-700 group-hover:opacity-0" />
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'linear-gradient(135deg, #2D6A2D 0%, #1A4A3A 45%, #0D3B4A 100%)' }}
          />
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(200,223,196,0.06) 50%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <p className="font-mono text-vc-green-sage text-xs tracking-widest mb-4 group-hover:text-vc-green-pale/80 transition-colors duration-500">
              THE RESULT
            </p>
            <p className="font-display text-3xl md:text-4xl font-bold text-vc-offwhite mb-4">
              A synergistic approach that maximizes high-permanence
              <span className="text-vc-green-pale italic group-hover:text-white transition-colors duration-500">
                {' '}carbon drawdown{' '}
              </span>
              while delivering a potent bio-fertilizer to degraded agricultural soils.
            </p>

            <div className="flex justify-center mt-8 mb-6">
              <div className="h-px w-16 bg-vc-green-pale/20 group-hover:w-48 transition-all duration-700 rounded-full" />
            </div>

            {/* Stats — table style matching rest of section */}
            <div className="flex justify-center gap-0 flex-wrap max-w-xl mx-auto border border-vc-green-pale/10 rounded-2xl overflow-hidden">
              {[
                { val: '>5,000', unit: 'Years', label: 'Carbon Storage' },
                { val: '52.5', unit: 'Hectares', label: 'Pilot Deployment' },
                { val: '575', unit: 'Tons', label: 'Credits Offered' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 text-center px-6 py-5 transition-all duration-500 group-hover:bg-white/5 ${
                    i < 2 ? 'border-r border-vc-green-pale/10' : ''
                  }`}
                >
                  <div className="font-display text-3xl font-bold text-vc-green-pale leading-none group-hover:text-white group-hover:scale-105 transition-all duration-500 inline-block">
                    {s.val}
                  </div>
                  <div className="font-mono text-xs text-vc-green-sage mt-1 group-hover:text-vc-green-pale/70 transition-colors duration-500">
                    {s.unit}
                  </div>
                  <div className="font-sans text-xs text-vc-offwhite/40 mt-0.5 group-hover:text-vc-offwhite/70 transition-colors duration-500">
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