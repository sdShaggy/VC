import React from 'react';
import { Mail, Phone, Linkedin, ArrowUpRight, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-vc-dark text-vc-offwhite relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-vc-green-light to-transparent" />

      {/* Organic shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-vc-green/5 organic-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-vc-green-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        {/* Main CTA Block */}
        <div className="mb-20 max-w-2xl">
          <p className="section-label text-vc-green-sage mb-4">Ready to Act on Climate?</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-vc-offwhite leading-tight mb-6">
            Secure A-Grade,<br />
            <span className="text-vc-green-pale italic">Permanent Credits.</span>
          </h2>
          <p className="text-vc-parchment/70 text-base mb-8 max-w-lg">
            Join forward-thinking corporations securing high-permanence CDR credits that meet SBTi standards. Pay on delivery. Zero financial risk.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:contact@veridiancarbon.com" className="btn-primary bg-vc-green-light hover:bg-vc-green-sage">
              <Mail size={15} />
              Initiate LOI
            </a>
            <a href="mailto:ceo@veridiancarbon.com" className="border border-vc-offwhite/20 text-vc-offwhite hover:bg-white/5 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300">
              Talk to Founders
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-14 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-vc-green rounded-xl flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" stroke="#F5F2EC" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="2.5" fill="#C8DFC4"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-vc-offwhite">VERIDIAN CARBON</div>
                <div className="font-mono text-xs text-vc-green-sage tracking-widest">CDR • India</div>
              </div>
            </div>
            <p className="text-vc-parchment/60 text-sm leading-relaxed">
              Building on-ground Carbon Removal in India through ERW and Biochar co-deployment.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://www.linkedin.com/company/veridian-carbon" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-vc-green-light hover:bg-vc-green/10 transition-all duration-300">
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="font-sans font-semibold text-sm text-vc-offwhite mb-5 tracking-wide">Protocol</h4>
            <ul className="flex flex-col gap-3">
              {['Technology', 'Methodology', 'Operational Scale', 'dMRV System'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-vc-parchment/60 text-sm hover:text-vc-green-pale transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans font-semibold text-sm text-vc-offwhite mb-5 tracking-wide">Company</h4>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Team', 'Careers', 'Press', 'Investors'].map(item => (
                <li key={item}>
                  <a href="#" className="text-vc-parchment/60 text-sm hover:text-vc-green-pale transition-colors animated-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-sm text-vc-offwhite mb-5 tracking-wide">Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-vc-green-sage mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:contact@veridiancarbon.com" className="text-vc-parchment/60 text-sm hover:text-vc-green-pale transition-colors block">
                    contact@veridiancarbon.com
                  </a>
                  <a href="mailto:ceo@veridiancarbon.com" className="text-vc-parchment/60 text-sm hover:text-vc-green-pale transition-colors block">
                    
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-vc-green-sage flex-shrink-0" />
                <a href="tel:+919123252856" className="text-vc-parchment/60 text-sm hover:text-vc-green-pale transition-colors">
                  +91 XXXXXXXXXX
                </a>
              </li>
            </ul>

            {/* Certification badges */}
            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit">
                <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                <span className="font-mono text-xs text-vc-green-sage">Isometric V1.1 Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 w-fit">
                <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                <span className="font-mono text-xs text-vc-green-sage">CSI C-sink Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-vc-parchment/40 text-xs font-mono">
            © 2026 Veridian Carbon Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-vc-parchment/30 text-xs max-w-xl leading-relaxed">
            All carbon removal claims are quantified using ISO 14064-2 compliant LCA methodology. Credits issued ex-post only after verified measurement.
          </p>
        </div>
      </div>
    </footer>
  );
};
