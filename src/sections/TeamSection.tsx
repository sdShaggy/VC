import React, { useEffect, useRef } from 'react';
import { Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Dhananjay Priyadarshi',
    role: 'Co-Founder & CTO',
    focus: 'Technical implementation & systems architecture',
    linkedin: 'https://www.linkedin.com/in/dhananjay-priyadarshi-332673244/',
  },
  {
    name: 'Ayush Kumar',
    role: 'Co-Founder',
    focus: 'Strategy, financial modeling & climate data analytics',
    linkedin: 'https://www.linkedin.com/in/ayush-kumar-6ba47a277/',
  },
  {
    name: 'Swapnil Tirkey',
    role: 'Co-Founder',
    focus: 'Operations & On-ground project execution',
    linkedin: 'https://www.linkedin.com/in/swapnil-tirkey-8a1407335/',
  },
  {
    name: 'Dr. Tanushree Bhattacharya',
    role: 'Lead Geochemist',
    focus: '20+ years expertise in soil remediation & biochar science',
    linkedin: 'https://www.linkedin.com/in/tanushree-bhattacharya-a1b149a3/',
  },
  {
    name: 'Colin Heffell',
    role: 'Senior Advisor',
    focus: 'European carbon markets & commercialization',
    linkedin: 'https://www.linkedin.com/in/colinheffell/',
  },
];

export const TeamSection: React.FC = () => {
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

  return (
    <section id="team" ref={sectionRef} className="py-28 bg-vc-offwhite relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vc-green/20 to-transparent" />
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Core Team & Scientific Oversight</p>
          <h2 className="display-heading text-4xl md:text-5xl font-bold mb-5">
            The People Behind
            <br />
            <span className="text-vc-green italic">Every Verified Ton</span>
          </h2>
          <p className="text-vc-text-muted text-base max-w-xl mx-auto leading-relaxed">
            Our leadership and scientific board ensure rigorous implementation, strategic direction, and uncompromising scientific integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
          {team.map((member) => (
            <div
              key={member.name}
              className="reveal card-surface p-6 h-full min-h-[320px] flex flex-col justify-between group hover:shadow-lg hover:shadow-vc-green/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Info */}
              <div className="mb-4">
                <h3 className="font-display font-bold text-vc-dark text-lg leading-snug mb-1">
                  {member.name}
                </h3>
                <span className="font-mono text-xs text-vc-green tracking-wider uppercase">
                  {member.role}
                </span>
              </div>
              <p className="flex-1 text-vc-text-muted text-sm leading-relaxed mt-4">
                {member.focus}
              </p>

              {/* Social */}
              <div className="mt-5 pt-4 border-t border-vc-green/10 flex gap-2">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-vc-green-mist flex items-center justify-center text-vc-green hover:bg-vc-green hover:text-white transition-all duration-200"
                >
                  <Linkedin size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};