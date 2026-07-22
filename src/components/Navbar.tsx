import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { label: 'About Us', href: '#problem' },
  { label: 'Technology', href: '#technology' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Impact', href: '#impact' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Past this scroll depth the nav detaches into a floating pill
  const FLOAT_AT = 80;
  const isFloating = scrollY > FLOAT_AT;

  return (
    <>
      <div
        className="fixed z-50 transition-all duration-500 ease-in-out"
        style={{
          top:   isFloating ? '12px'  : '0px',
          left:  isFloating ? '16px'  : '0px',
          right: isFloating ? '16px'  : '0px',
        }}
      >
        <nav
          className="transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: 'rgba(247, 245, 240, 0.97)',
            backdropFilter:  'blur(12px)',
            borderRadius:    isFloating ? '16px'  : '0px',
            boxShadow:       isFloating
              ? '0 8px 32px rgba(31,61,42,0.10), 0 2px 8px rgba(0,0,0,0.06)'
              : 'none',
            // pinned: thin bottom line; floating: full border pill
            border: isFloating
              ? '1px solid rgba(74,124,89,0.14)'
              : '0 0 0 0',
            borderBottom: !isFloating ? '1px solid rgba(74,124,89,0.12)' : undefined,
            padding: isFloating ? '8px 24px' : '14px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Veridian Carbon Logo"
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col leading-[0.9]">
                <span className="font-display font-bold text-vc-dark text-base tracking-wide">VERIDIAN</span>
                <span className="font-display font-bold text-vc-dark text-base tracking-wide">CARBON</span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`animated-underline font-sans text-sm font-medium transition-colors duration-200 ${
                    activeSection === href.slice(1)
                      ? 'text-vc-green'
                      : 'text-vc-text-muted hover:text-vc-green'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a href="mailto:contact@veridiancarbon.com" className="btn-ghost text-sm py-2.5 px-5">
                Partner With Us
              </a>
              <a href="mailto:contact@veridiancarbon.com" className="btn-primary text-sm py-2.5 px-5">
                <Leaf size={14} />
                Secure Credits
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-vc-text hover:bg-vc-green-mist transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-vc-offwhite transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-28 pb-10 px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="font-display text-3xl font-semibold text-vc-dark hover:text-vc-green transition-colors border-b border-vc-green/10 pb-5"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3">
            <a href="#contact" className="btn-ghost w-full justify-center">Partner With Us</a>
            <a href="mailto:contact@veridiancarbon.com" className="btn-primary w-full justify-center">
              <Leaf size={14} />
              Secure Credits
            </a>
          </div>
        </div>
      </div>
    </>
  );
};