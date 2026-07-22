import React, { useEffect, useRef } from 'react';
import { FileText, Shield, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const OCEAN_IMAGE = 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1400&q=80&fit=crop';

export const OfftakeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const terms = [
    { icon: <Shield size={16} />, label: 'Standard', value: 'Isometric Enhanced Weathering V1.1 + CSI C-sink protocol' },
    { icon: <CheckCircle2 size={16} />, label: 'Zero Financial Risk', value: 'No upfront capital required. Pay on delivery only.' },
    { icon: <Clock size={16} />, label: 'Pay on Delivery', value: 'Financial exchange contingent on successful credit issuance.' },
    { icon: <FileText size={16} />, label: 'Est. Delivery', value: '75 tCO₂e (2028) + 500 tCO₂e (2029)' },
  ];

  return (
    <section id="offtake" ref={sectionRef} className="relative py-0 overflow-hidden">
      {/* Background image */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center">
        <img src={OCEAN_IMAGE} alt="Ocean storage" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vc-offwhite via-vc-dark/60 to-vc-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-vc-dark/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl reveal">
            <p className="section-label text-[#F8F6EE] mb-4"><strong>Offtake Opportunity</strong></p>
            <div className="font-mono text-vc-cream text-xs tracking-widest mb-3">AVAILABLE NOW</div>
            <div className="font-display text-8xl md:text-9xl font-bold text-vc-offwhite leading-none mb-2">575</div>
            <div className="font-display text-3xl font-bold text-vc-green-pale mb-5">Tons of Verified CDR</div>
            <p className="text-vc-parchment/80 text-base mb-8 leading-relaxed max-w-lg">
              Secure forward supply of high-permanence CDR credits through a non-binding Letter of Intent. No upfront capital. Pay only on successful delivery.
            </p>
            <a href="mailto:contact@veridiancarbon.com" className="btn-primary bg-vc-green-light text-lg px-10 py-5">
              Initiate LOI
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Terms section */}
      <div className="bg-vc-dark py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {terms.map((term) => (
              <div key={term.label} className="border border-white/10 rounded-2xl p-6 hover:border-vc-green/30 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3 text-vc-green-sage">
                  {term.icon}
                  <span className="font-mono text-xs tracking-wider uppercase">{term.label}</span>
                </div>
                <p className="text-vc-parchment/70 text-sm leading-relaxed">{term.value}</p>
              </div>
            ))}
          </div>

          {/* ERW vs Biochar split */}
          <div className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 rounded-2xl p-7 bg-white/3">
              <p className="font-mono text-xs text-[#D0F0C0] tracking-widest mb-4">ERW CREDITS</p>
              <div className="font-display text-4xl font-bold text-vc-offwhite mb-2">575 tCO₂e</div>
              <p className="text-vc-parchment/60 text-sm">Enhanced Rock Weathering via Deccan Trap basalt — Isometric V1.1 verified. Delivery: 75t (2028) + 500t (2029).</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D0F0C0] animate-pulse" />
                <span className="font-mono text-xs text-[#D0F0C0]">Active Project Sagar Pilot</span>
              </div>
            </div>
            <div className="border border-white/10 rounded-2xl p-7 bg-white/3">
              <p className="font-mono text-xs text-[#D0F0C0] tracking-widest mb-4">BIOCHAR CREDITS</p>
              <div className="font-display text-4xl font-bold text-vc-offwhite mb-2">5,000 tCO₂e</div>
              <p className="text-vc-parchment/60 text-sm">Biochar CDR from invasive species - CSI C-sink protocol. First issuance 500 tCO₂e (2027). Scale 4,500 tCO₂e by 2029.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D0F0C0] animate-pulse" />
                <span className="font-mono text-xs text-[#D0F0C0]">Morbi Pilot, Gujarat · Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
