import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Leaf, Shield, Clock, MapPin } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=80&fit=crop';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; r: number;
      vx: number; vy: number; opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 140, 63, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const stats = [
    { icon: <Shield size={14} />, label: 'Isometric V1.1', value: 'Verified' },
    { icon: <Clock size={14} />, label: 'Storage Permanence', value: '>5,000 yrs' },
    { icon: <Leaf size={14} />, label: '2029 Target', value: '500 tCO₂e' },
  ];

  const projectStats = [
    { val: '52.5 ha', label: 'Deployment Area' },
    { val: 'Q3 2026', label: 'Go-Live Date' },
    { val: '1,050 t', label: 'Basalt Applied' },
    { val: 'Isometric V1.1', label: 'Protocol' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Indian agricultural fields"
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
        />
        {/* Lighter overlays so the image breathes */}
        <div className="absolute inset-0 bg-gradient-to-b from-vc-offwhite/60 via-vc-offwhite/40 to-vc-offwhite/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-vc-offwhite/70 via-vc-offwhite/20 to-transparent" />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Decorative organic shapes */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-vc-green/8 organic-blob z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-vc-green-pale/30 rounded-full blur-2xl z-10 pointer-events-none" />

      {/* Content — two column layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 xl:gap-20">

          {/* ── Left: Main text ── */}
          <div className="flex-1 max-w-xl">
            {/* Status badge */}
            <div
              className={`inline-flex items-center gap-2 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-center gap-2 bg-vc-green-mist border border-vc-green/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                <span className="font-mono text-xs text-vc-green tracking-wider">Your one stop solution for CDR</span>
              </div>
            </div>

            {/* Main Headline */}
            <div
              className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '350ms' }}
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-vc-dark leading-[1.05] tracking-tight mb-2">
                Building
              </h1>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-vc-green leading-[1.05] tracking-tight mb-2">
                on-ground
              </h1>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-vc-dark leading-[1.05] tracking-tight mb-2">
                Carbon Removal
              </h1>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold italic text-vc-text-muted leading-[1.05] tracking-tight">
                in India.
              </h1>
            </div>

            {/* Subtext */}
            <div
              className={`mt-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-vc-text-muted text-lg md:text-xl leading-relaxed max-w-xl font-light">
                We co-deploy Enhanced Rock Weathering and Biochar across Indian farmlands, locking atmospheric CO₂ away for over 5,000 years while restoring soil health for smallholder farmers.
              </p>
            </div>

            {/* CTA Row */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '650ms' }}
            >
              <a href="mailto:contact@veridiancarbon.com" className="btn-primary text-base px-8 py-4">
                <Leaf size={16} />
                Secure CDR Credits
              </a>
              <a href="#technology" className="btn-ghost text-base px-8 py-4">
                Explore the Science
              </a>
            </div>

            {/* Stat pills */}
            <div
              className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '800ms' }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-vc-green/15 rounded-2xl px-5 py-3"
                >
                  <div className="text-vc-green">{stat.icon}</div>
                  <div>
                    <div className="font-display font-bold text-vc-green text-sm leading-none">{stat.value}</div>
                    <div className="font-mono text-xs text-vc-text-muted mt-0.5">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Live project card stack ── */}
          <div
            className={`flex-shrink-0 w-full lg:w-[360px] flex flex-col gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            {/* Project card */}
            <div className="bg-white/80 backdrop-blur-md border border-vc-green/15 rounded-2xl p-6 shadow-lg shadow-vc-green/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                  <span className="font-mono text-xs text-vc-green tracking-widest uppercase">Live Project</span>
                </div>
                <span className="font-mono text-xs text-vc-text-muted bg-vc-green-mist px-2.5 py-1 rounded-full">
                  Q3 2026
                </span>
              </div>

              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 bg-vc-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-vc-dark text-lg leading-tight">Project Sagar</p>
                  <p className="text-vc-text-muted text-sm">Sagar District, Madhya Pradesh</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {projectStats.map(s => (
                  <div key={s.label} className="bg-vc-green-mist border border-vc-green/10 rounded-xl p-3">
                    <div className="font-display font-bold text-vc-green text-base leading-tight">{s.val}</div>
                    <div className="font-mono text-xs text-vc-text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credits available card */}
            <div className="bg-vc-dark border border-vc-green/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-vc-green rounded-xl flex items-center justify-center flex-shrink-0">
                <Leaf size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-vc-offwhite text-base leading-tight">575 tons available</p>
                <p className="text-vc-parchment/60 text-xs mt-0.5">CDR credits · Pay on delivery · Zero upfront</p>
              </div>
              <a
                href="mailto:contact@veridiancarbon.com"
                className="flex-shrink-0 bg-vc-green hover:bg-vc-green-light text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors duration-300"
              >
                Inquire
              </a>
            </div>

            {/* Protocol trust strip */}
            <div className="bg-white/60 backdrop-blur-sm border border-vc-green/10 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-vc-green-light" />
                <span className="font-mono text-xs text-vc-text-muted">Isometric V1.1</span>
              </div>
              <div className="w-px h-4 bg-vc-green/15" />
              <div className="flex items-center gap-2">
                <Shield size={13} className="text-vc-green-light" />
                <span className="font-mono text-xs text-vc-text-muted">CSI C-sink</span>
              </div>
              <div className="w-px h-4 bg-vc-green/15" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
                <span className="font-mono text-xs text-vc-green">Verified</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-xs text-vc-text-muted tracking-widest">SCROLL</span>
        <ArrowDown size={14} className="text-vc-green-light" />
      </div>
    </section>
  );
};