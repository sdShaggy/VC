import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Shield, Clock, FlaskConical } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1800&q=80&fit=crop';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    interface Particle { x: number; y: number; r: number; vx: number; vy: number; opacity: number; }
    const particles: Particle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1, vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.35 - 0.15, opacity: Math.random() * 0.3 + 0.08,
    }));
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,140,63,${p.opacity})`; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const stats = [
    { icon: <Shield size={20} />, value: 'Verified', label: 'Isometric V1.1' },
    { icon: <Clock size={20} />, value: '>5,000 yrs', label: 'Storage Permanence' },
    { icon: <Leaf size={20} />, value: '500 tCO₂e', label: '2029 Target' },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Indian agricultural fields"
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(224,238,220,0.88) 0%, rgba(245,242,236,0.75) 45%, rgba(195,220,190,0.60) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(245,242,236,0.50) 0%, rgba(245,242,236,0.15) 55%, rgba(232,242,229,0.75) 100%)'
        }} />
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-vc-green/5 organic-blob z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-vc-green-pale/20 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* Status badge */}
        <div
          className={`inline-flex items-center gap-2 mb-10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center gap-2 bg-vc-green-mist border border-vc-green/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
            <span className="font-mono text-xs text-vc-green tracking-wider">Your one stop solution for CDR</span>
          </div>
        </div>

        {/* ── Two-column grid — headline left, buttons right ── */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '350ms' }}
        >
          {/* LEFT — headline + subtext in same column */}
          <div>
            <h1
              className="font-display font-bold text-vc-text-muted leading-[1.05] tracking-tight mb-1"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)' }}
            >
              Building
            </h1>
            <h1
              className="font-display font-bold text-vc-green leading-[1.05] tracking-tight mb-1"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)' }}
            >
              on-ground
            </h1>
            <h1
              className="font-display font-bold text-vc-dark leading-[1.05] tracking-tight mb-1"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)' }}
            >
              Carbon Removal
            </h1>
            <h1
              className="font-display font-bold text-vc-green-light leading-[1.05] tracking-tight mb-1"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 7.5rem)' }}
            >
              in India.
            </h1>

            {/* Subtext sits inside left column — never bleeds right */}
            <p
              className="text-vc-text-muted leading-relaxed font-light mt-8"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: '540px' }}
            >
              We co-deploy Enhanced Rock Weathering and Biochar across Indian farmlands,
              locking atmospheric CO₂ away for over 5,000 years while restoring soil
              health for smallholder farmers.
            </p>
          </div>

          {/* RIGHT — buttons column */}
          <div
            className={`flex flex-col gap-3 transition-all duration-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
            style={{ transitionDelay: '600ms' }}
          >
            {/* Ongoing Ventures */}
            <a
              href="#impact"
              className="flex items-center justify-center gap-2.5 bg-vc-green hover:bg-vc-green-light text-vc-green-mist px-6 py-4 rounded-2xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-vc-green/25 hover:-translate-y-0.5"
            >
              <span className="w-2 h-2 rounded-full bg-vc-green-pale animate-pulse flex-shrink-0" />
              Ongoing Ventures
            </a>

            {/* Secure CDR Credits */}
            <a
              href="mailto:contact@veridiancarbon.com"
              className="flex items-center justify-center gap-2.5 bg-vc-dark hover:bg-vc-charcoal text-vc-green-pale px-6 py-4 rounded-2xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-vc-dark/20 hover:-translate-y-0.5"
            >
              <Leaf size={15} className="flex-shrink-0" />
              Secure CDR Credits
            </a>

            {/* Explore the Science */}
            <a
              href="#technology"
              className="flex items-center justify-center gap-2.5 bg-vc-green/90 hover:bg-vc-green text-vc-green-mist px-6 py-4 rounded-2xl font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-vc-green/20 hover:-translate-y-0.5"
            >
              <FlaskConical size={15} className="flex-shrink-0" />
              Explore the Science
            </a>

            {/* Trust pill */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1 px-4 py-3 bg-white/50 backdrop-blur-sm border border-vc-green/15 rounded-xl">
              <span className="font-sans text-xs text-vc-green">Pay on delivery ·</span>
              <span className="font-sans font-xs text-vc-green">575 tCO₂e available</span>
              <span className="font-sans text-xs text-vc-green">· Zero upfront</span>
            </div>
          </div>
        </div>

        {/* ── Full-width stat bar ── */}
        <div
          className={`mt-14 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-vc-green/25 to-transparent" />
          <div className="grid grid-cols-3 divide-x divide-vc-green/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-8 px-4 bg-white/35 backdrop-blur-sm hover:bg-white/55 transition-colors duration-300 group cursor-default"
              >
                <div className="w-11 h-11 bg-vc-green-mist rounded-xl flex items-center justify-center text-vc-green mb-4 group-hover:bg-vc-green group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div
                  className="font-display font-bold text-vc-green leading-none mb-2 text-center"
                  style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-vc-text-muted tracking-wider text-center uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-vc-green/25 to-transparent" />
        </div>
      </div>
    </section>
  );
};