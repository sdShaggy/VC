import React, { useEffect, useRef } from 'react';
import { TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

const FARM_IMAGE = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80&fit=crop';

export const ProblemSection: React.FC = () => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="py-28 bg-vc-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Label + Heading */}
        <div className="reveal mb-16">
          <p className="section-label mb-4">The Dual Imperative</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="display-heading text-4xl md:text-5xl font-bold max-w-2xl">
              Net-Zero Goals &{' '}
              <span className="text-vc-green italic">Food Security</span>
              <br />Can Co-Exist.
            </h2>
            <p className="text-vc-text-muted text-base max-w-sm leading-relaxed">
              India sits at the intersection of the global carbon crisis and one of the world's most vulnerable agricultural systems.
            </p>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: CDR Gap Visual */}
          <div className="reveal card-surface p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-vc-green/5 rounded-full blur-2xl" />
            <p className="section-label mb-3">Global CDR Gap</p>
            <h3 className="font-display text-2xl font-bold text-vc-dark mb-3">
              Gigaton-Scale Removal Needed by 2050
            </h3>
            <p className="text-vc-text-muted text-sm mb-8 leading-relaxed">
              Reaching Net-Zero requires massive emission reductions paired with gigaton-scale Carbon Dioxide Removal (CDR). Traditional afforestation credits don't meet the bar. They offer 20-100 years of storage at best.
            </p>

            {/* Bar chart visual */}
            <div className="flex items-end gap-4 h-36 mb-4">
              {/* Current */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col gap-0.5 items-center justify-end" style={{ height: '100%' }}>
                  <div className="w-full bg-vc-text-muted/20 rounded-t-lg" style={{ height: '72%' }} />
                  <div className="w-full bg-vc-terracotta/30 rounded-t-sm" style={{ height: '8%' }} />
                </div>
                <span className="font-mono text-xs text-vc-text-muted text-center">Current State</span>
              </div>
              <div className="flex flex-col items-center justify-center pb-8 text-vc-terracotta">
                <BarChart3 size={20} />
                <span className="font-display font-bold text-xs mt-1">Gap</span>
              </div>
              {/* Net Zero Target */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex flex-col gap-0.5 items-center justify-end" style={{ height: '100%' }}>
                  <div className="w-full bg-vc-text-muted/20 rounded-t-lg" style={{ height: '28%' }} />
                  <div className="w-full bg-vc-green rounded-t-sm" style={{ height: '52%' }} />
                </div>
                <span className="font-mono text-xs text-vc-text-muted text-center">Net-Zero 2050</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-vc-text-muted/20 inline-block" /> Emission Reductions</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-vc-green inline-block" /> CDR Required</span>
            </div>

            {/* Insight pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['SBTi mandated CDR', 'EU Green Claims Act', 'SEC Disclosure Rules'].map(tag => (
                <span key={tag} className="bg-vc-green-mist border border-vc-green/20 text-vc-green text-xs px-3 py-1.5 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: India's vulnerability */}
          <div className="reveal flex flex-col gap-6">
            {/* Image card */}
            <div className="card-surface overflow-hidden relative h-52 group">
              <img
                src={FARM_IMAGE}
                alt="Indian farmer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vc-dark/60 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="font-display text-vc-offwhite font-bold text-xl">India's Agricultural Vulnerability</span>
              </div>
            </div>

            {/* Threat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <AlertTriangle size={16} />, label: 'Climate Stress', desc: 'Erratic monsoons & rising temperatures threatening crop cycles' },
                { icon: <TrendingUp size={16} />, label: 'Yield Decline', desc: 'Acidic, nutrient-depleted soils reducing productivity' },
                { icon: <AlertTriangle size={16} />, label: 'Food Insecurity', desc: '120M smallholder farmers facing livelihood threats' },
              ].map(item => (
                <div key={item.label} className="card-surface p-5">
                  <div className="w-8 h-8 bg-vc-terracotta/10 rounded-xl flex items-center justify-center text-vc-terracotta mb-3">
                    {item.icon}
                  </div>
                  <div className="font-sans font-semibold text-vc-dark text-sm mb-1">{item.label}</div>
                  <p className="text-vc-text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Market gap highlight */}
            <div className="card-surface p-6 border-l-4 border-vc-green">
              <p className="font-display font-bold text-vc-dark mb-2">The Market Gap</p>
              <p className="text-vc-text-muted text-sm leading-relaxed">
                Corporate buyers demand high-durability CDR that simultaneously captures carbon, restores soil health, and delivers social benefits. No single solution has delivered all three — until now.
              </p>
              <div className="mt-4 flex items-center gap-2 text-vc-green font-medium text-sm">
                <span className="w-2 h-2 rounded-full bg-vc-green animate-pulse" />
                Veridian's Multi-Benefit Solution
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
