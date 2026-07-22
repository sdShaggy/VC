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
              Reaching Net-Zero requires massive emission reductions paired with gigaton-scale Carbon Dioxide Removal (CDR). Meeting global climate targets requires durable Carbon Dioxide Removal alongside deep emissions cuts. Scientific consensus indicates annual CDR demand must scale from less than 1 GtCO₂ today to over 10 GtCO₂ by 2050.
            </p>

            {/* Bar chart visual */}
            {/* CDR Comparison */}
            <div className="mt-10">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">

                {/* Current */}
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 rounded-2xl bg-vc-text-muted/10 flex flex-col items-center justify-center border border-vc-text-muted/10">
                    <span className="font-display text-4xl font-bold text-vc-dark">
                      &lt;1
                    </span>
                    <span className="text-xs tracking-widest text-vc-text-muted mt-1">
                      GtCO₂/yr
                    </span>
                  </div>

                  <p className="font-mono text-sm mt-4 text-vc-text-muted">
                    Current State
                  </p>

                  <p className="text-xs text-vc-text-muted mt-2 leading-relaxed">
                    Global durable Carbon Dioxide Removal deployed today.
                  </p>
                </div>

                {/* Gap */}
                <div className="flex flex-col items-center">
                  <div className="w-24 border-t border-dashed border-vc-green/40" />

                  <div className="my-4 flex flex-col items-center text-vc-terracotta">
                    <BarChart3 size={24} />

                    <span className="font-display font-bold mt-2">
                      20×
                    </span>

                    <span className="text-xs uppercase tracking-wider">
                      Increase Needed
                    </span>
                  </div>

                  <div className="w-24 border-t border-dashed border-vc-green/40" />
                </div>

                {/* Target */}
                <div className="text-center">
                  <div className="mx-auto w-24 h-24 rounded-2xl bg-vc-green/10 border border-vc-green/20 flex flex-col items-center justify-center">
                    <span className="font-display text-4xl font-bold text-vc-green">
                      10+
                    </span>

                    <span className="text-xs  tracking-widest text-vc-green mt-1">
                      GtCO₂/yr
                    </span>
                  </div>

                  <p className="font-mono text-sm mt-4 text-vc-text-muted">
                    Net-Zero 2050
                  </p>

                  <p className="text-xs text-vc-text-muted mt-2 leading-relaxed">
                    Annual CDR required to meet global climate goals.
                  </p>
                </div>

              </div>

              {/* Bottom Insight */}
              <div className="mt-8 rounded-2xl bg-vc-green-mist border border-vc-green/15 p-4 text-center">
                <p className="font-semibold text-vc-dark">
                  Durable CDR demand is expected to grow more than
                  <span className="text-vc-green"> 20× </span>
                  by 2050.
                </p>
              </div>
            </div>

            {/* Regulatory Drivers */}
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'SBTi Mandated CDR',
                'EU Green Claims Act',
                'SEC Disclosure Rules',
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-vc-green-mist border border-vc-green/20 text-vc-green text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
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
                Corporate buyers demand high-durability CDR that simultaneously captures carbon, restores soil health, and delivers social benefits. No single solution has delivered all three - until now.
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
