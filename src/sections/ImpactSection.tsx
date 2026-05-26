import React, { useEffect, useRef, useState } from 'react';
import { MapPin, TrendingUp, Users, Sprout } from 'lucide-react';

const MP_IMAGE = 'public//sagar.avif' ;

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2200 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export const ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cobenefits = [
    {
      icon: <TrendingUp size={20} />,
      title: 'Agricultural Yields',
      points: ['Raises soil pH in acidic soils', 'Boosts crop yields directly', 'Reduces synthetic fertilizer need', 'Long-term fertility enhancement'],
    },
    {
      icon: <Sprout size={20} />,
      title: 'Ecosystem Health',
      points: ['Removes invasive species', 'Enhances water retention', 'Increases terrestrial biodiversity', 'Reduces soil erosion & runoff'],
    },
    {
      icon: <Users size={20} />,
      title: 'Social Impact',
      points: ['Specialized local employment', 'Equitable benefit sharing', 'Documented informed consent', 'Strengthens food security'],
    },
  ];

  const roadmap = [
    { period: 'Q3 2026', label: 'Sagar Pilot, MP', deployment: '1,050 tons basalt', area: '~52.5 ha', output: null, status: 'active' },
    { period: 'End 2027', label: 'MP Regional Scale', deployment: '10,000 tons cumulative', area: '~500 ha', output: null, status: 'planned' },
    { period: '2028', label: 'Multi-State + First Issuance', deployment: '+40,000 tons', area: '~2,000 ha', output: '75 tCO₂e', status: 'planned' },
    { period: '2029', label: 'Scale Target', deployment: '100,000 tons', area: '~5,000 ha', output: '500 tCO₂e', status: 'planned' },
  ];

  return (
    <section id="impact" ref={sectionRef} className="bg-vc-cream py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="reveal mb-16">
          <p className="section-label mb-4">Operational Scale</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="display-heading text-4xl md:text-5xl font-bold max-w-xl">
              Deployed. Measured.
              <br />
              <span className="text-vc-green italic">Verified.</span>
            </h2>
            <p className="text-vc-text-muted text-base max-w-sm leading-relaxed">
              Not a whitepaper. Active, sensor-instrumented fields generating verified carbon removal in Madhya Pradesh, India.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {[
            { num: 52, suf: '.5', label: 'Hectares, Q3 2026 Pilot', unit: 'ha' },
            { num: 30, suf: '–50', label: 'Sourcing Radius (km)', unit: 'km' },
            { num: 500, suf: '', label: 'tCO₂e Target 2029', unit: 'tCO₂e' },
            { num: 5000, suf: '+', label: 'Year Carbon Permanence', unit: 'yrs' },
          ].map(s => (
            <div key={s.label} className="card-surface p-6 text-center">
              <div className="stat-number text-4xl md:text-5xl mb-1">
                <AnimatedCounter end={s.num} suffix={s.suf} />{' '}
                <span className="text-vc-green-sage text-xl font-sans font-normal">{s.unit}</span>
              </div>
              <p className="text-vc-text-muted text-xs font-mono leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Project Location */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <div>
            <div className="card-surface overflow-hidden relative h-72 group">
              <img src={MP_IMAGE} alt="Madhya Pradesh India" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-vc-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-vc-green-pale" />
                  <span className="font-mono text-xs text-vc-green-pale tracking-wider">PROJECT SAGAR PILOT</span>
                </div>
                <p className="font-display text-vc-offwhite font-bold text-xl">Sagar District, Madhya Pradesh</p>
                <p className="text-vc-parchment/70 text-sm mt-1">52.5 hectares · Deccan Trap Basalt · Q3 2026</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="card-surface p-6">
              <h3 className="font-display font-bold text-vc-dark text-xl mb-4">Project Details</h3>
              {[
                { label: 'Location', value: 'Sagar District, Madhya Pradesh' },
                { label: 'Deployment Date', value: 'Q3 2026 (Initial)' },
                { label: 'Area', value: '52.5 hectares' },
                { label: 'Basalt Rate', value: '20 tons/hectare' },
                { label: 'Sourcing Radius', value: '30–50 km from Deccan Trap quarries' },
                { label: 'Feedstock Quality', value: '<100 microns, 15–20% Ca+Mg' },
                { label: 'Verification', value: 'Isometric V1.1 Protocol' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-vc-green/8 last:border-0">
                  <span className="text-vc-text-muted text-sm">{label}</span>
                  <span className="text-vc-dark text-sm font-medium text-right max-w-[55%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Co-benefits */}
        <div className="reveal mb-14">
          <h3 className="font-display text-2xl font-bold text-vc-dark mb-6 text-center">
            Beyond Carbon: <span className="text-vc-green italic">Yields & Resilience</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cobenefits.map(benefit => (
              <div key={benefit.title} className="card-surface p-8">
                <div className="w-12 h-12 bg-vc-green-mist rounded-2xl flex items-center justify-center text-vc-green mb-5">
                  {benefit.icon}
                </div>
                <h4 className="font-display font-bold text-vc-dark text-xl mb-4">{benefit.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {benefit.points.map(pt => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-vc-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-vc-green-light mt-1.5 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Scaling Roadmap */}
        <div className="reveal">
          <h3 className="font-display text-2xl font-bold text-vc-dark mb-8 text-center">
            Operational Scaling <span className="text-vc-green italic">Roadmap</span>
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {roadmap.map((row, i) => (
                <div key={row.period} className={`flex items-center gap-4 p-5 rounded-2xl mb-3 transition-all duration-300 ${
                  row.status === 'active' ? 'bg-vc-green text-vc-offwhite' : 'bg-white border border-vc-green/10'
                }`}>
                  <div className="w-24 flex-shrink-0">
                    <span className={`font-mono text-xs font-bold ${row.status === 'active' ? 'text-vc-green-pale' : 'text-vc-green'}`}>
                      {row.period}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className={`font-sans font-semibold text-sm ${row.status === 'active' ? 'text-vc-offwhite' : 'text-vc-dark'}`}>
                      {row.label}
                    </div>
                    <div className={`text-xs mt-0.5 ${row.status === 'active' ? 'text-vc-green-pale/80' : 'text-vc-text-muted'}`}>
                      {row.area}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-right text-sm font-bold ${row.status === 'active' ? 'text-vc-green-pale' : 'text-vc-green'}`}>
                      {row.deployment}
                    </div>
                    {row.output && (
                      <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        row.status === 'active' ? 'bg-vc-green-pale/20 text-vc-green-pale' : 'bg-vc-terracotta/10 text-vc-terracotta'
                      }`}>
                        {row.output} output
                      </div>
                    )}
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
