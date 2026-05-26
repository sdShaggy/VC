import React, { useEffect, useRef } from 'react';
import { Activity, Scale, Droplets, Lock, ChevronRight } from 'lucide-react';

const pillars = [
  {
    icon: <Activity size={22} />,
    label: '3-Plot In-Field Monitoring',
    desc: 'Project area divided into Control (2.5%), Treatment (2.5%), and Deployment (95%) zones for high-resolution baseline accuracy and isolated measurement.',
    badge: 'Field Scale',
  },
  {
    icon: <Scale size={22} />,
    label: 'Solid-Phase Quantification',
    desc: 'Isotope dilution mass balance methodology calculating Ca²⁺/Mg²⁺ depletion against immobile reference tracers (Ti, Zr) for deterministic CDR quantification.',
    badge: 'Lab Grade',
  },
  {
    icon: <Droplets size={22} />,
    label: 'Aqueous-Phase Validation',
    desc: 'Independent local sense-checks using porewater alkalinity and DIC measurements. Dual-method verification eliminates false positives.',
    badge: 'Cross-Validated',
  },
  {
    icon: <Lock size={22} />,
    label: 'Cryptographic Security',
    desc: 'IoT hardware data and core MRV metrics anchored to Polygon blockchain via Merkle Trees — tamper-proof, audit-grade records from soil to credit.',
    badge: 'On-Chain',
  },
];

export const MRVSection: React.FC = () => {
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
    <section id="mrv" ref={sectionRef} className="py-28 bg-vc-offwhite overflow-hidden relative">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left content */}
          <div className="lg:col-span-2">
            <div className="reveal">
              <p className="section-label mb-4">Scientific Rigor</p>
              <h2 className="display-heading text-4xl font-bold mb-6">
                Uncompromising
                <br />
                <span className="text-vc-green italic">dMRV</span>
              </h2>
              <p className="text-vc-text-muted leading-relaxed mb-6">
                Engineered for the Isometric V1.1 Protocol and CSI C-sink registry. All quantification is based exclusively on direct physical measurements — zero model approximations.
              </p>
              <p className="text-vc-text-muted leading-relaxed mb-8">
                Our four-layer verification stack eliminates the <strong>"Ash Spike"</strong> false positive problem that plagues naive ERW MRV platforms, delivering 99.8%+ confidence in every credit issued.
              </p>

              {/* Protocol badges */}
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Isometric Enhanced Weathering V1.1', status: 'Compliant' },
                  { label: 'CSI C-Sink Registry Protocol', status: 'Compliant' },
                  { label: 'Polygon Blockchain Anchoring', status: 'Active' },
                  { label: 'ISO 14064-2 LCA', status: 'Aligned' },
                ].map(b => (
                  <div key={b.label} className="flex items-center justify-between p-3 bg-white rounded-xl border border-vc-green/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                      <span className="font-sans text-sm text-vc-text">{b.label}</span>
                    </div>
                    <span className="font-mono text-xs text-vc-green bg-vc-green-mist px-2 py-0.5 rounded-full">{b.status}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn-primary mt-8">
                Request Technical Docs
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* Right: pillars grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <div
                  key={p.label}
                  className="reveal card-surface p-7 group hover:border-vc-green/30 hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 bg-vc-green-mist rounded-2xl flex items-center justify-center text-vc-green group-hover:bg-vc-green group-hover:text-white transition-all duration-300">
                      {p.icon}
                    </div>
                    <span className="font-mono text-xs text-vc-green-light bg-vc-green-mist px-2.5 py-1 rounded-full border border-vc-green/15">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-vc-dark text-base mb-3 leading-snug">{p.label}</h3>
                  <p className="text-vc-text-muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Greenwashing callout */}
            <div className="reveal mt-6 bg-vc-parchment border border-vc-earth/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-vc-terracotta/10 rounded-xl flex items-center justify-center text-vc-terracotta flex-shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-vc-dark mb-2">Closing the Greenwashing Loophole</h4>
                  <p className="text-vc-text-muted text-sm leading-relaxed">
                    Afforestation credits offer 20–100 years storage at best. SBTi now mandates only high-permanence CDR for net-zero claims. Our credits meet and exceed all regulatory requirements — now and in the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
