import React, { useState } from 'react';
import { Linkedin, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const embedPosts = [
  {
    id: 1,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7459975647449300992?collapsed=1',
  },
  {
    id: 2,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7464277847889719296',
  },
  {
    id: 3,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7432080826462310401',
  },
  {
    id: 4,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7429351428546211840',
  },
  {
    id: 5,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7425017848298823681',
  },
  {
    id: 6,
    src: "https://www.linkedin.com/embed/feed/update/urn:li:share:7436042563285037056?collapsed=1",
  },
  {
    id: 7,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7424145236647440384',
  },
  {
    id: 8,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7427216564669648896',
  },
  {
    id: 9,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7452989686240739328',
  },
  {
    id: 10,
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7446534354371059712',
  },
];

export const LinkedInFeedSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const visibleCount = 3; // how many show at once on desktop
  const maxIdx = embedPosts.length - visibleCount;

  const prev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const next = () => setActiveIdx((i) => Math.min(maxIdx, i + 1));

  const handleLoad = (id: number) => {
    setLoadedIds((prev) => new Set([...prev, id]));
  };

  return (
    <section id="linkedin" className="py-24 bg-vc-offwhite overflow-hidden relative">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-vc-green-light mb-3">
              From the Field
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-vc-dark leading-tight">
              Latest from{' '}
              <span className="text-vc-green italic">LinkedIn</span>
            </h2>
            <p className="text-vc-text-muted text-base mt-3 max-w-md leading-relaxed">
              Follow our journey - from soil sampling to verified carbon credits.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Follow button */}
            <a
              href="https://www.linkedin.com/company/veridiancarbon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
            >
              <Linkedin size={15} />
              Follow Us
            </a>

            {/* Prev / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={activeIdx === 0}
                className="w-10 h-10 rounded-full border border-vc-green/20 flex items-center justify-center text-vc-text-muted hover:border-vc-green hover:text-vc-green disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={activeIdx >= maxIdx}
                className="w-10 h-10 rounded-full border border-vc-green/20 flex items-center justify-center text-vc-text-muted hover:border-vc-green hover:text-vc-green disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Iframe Grid with slide ── */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${activeIdx} * (360px + 24px)))`,
              width: `${embedPosts.length * (360 + 24)}px`,
            }}
          >
            {embedPosts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 w-[360px] flex flex-col gap-3"
              >
                {/* Label chip */}
                <div className="flex items-center justify-between px-1">
                  {/* <span className="font-mono text-xs text-vc-green bg-vc-green-mist border border-vc-green/20 px-3 py-1 rounded-full">
                    {post.label}
                  </span> */}
                  <a
                    href="https://www.linkedin.com/company/veridiancarbon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vc-text-muted hover:text-vc-green transition-colors duration-200 flex items-center gap-1 text-xs"
                  >
                    <ExternalLink size={11} />
                    <span className="font-mono">View</span>
                  </a>
                </div>

                {/* iframe wrapper */}
                <div className="relative rounded-2xl overflow-hidden border border-vc-green/10 bg-white shadow-sm shadow-vc-green/5">
                  {/* Loading skeleton */}
                  {!loadedIds.has(post.id) && (
                    <div className="absolute inset-0 bg-vc-green-mist animate-pulse flex items-center justify-center z-10">
                      <div className="flex flex-col items-center gap-3">
                        <Linkedin size={24} className="text-vc-green/40" />
                        <span className="font-mono text-xs text-vc-text-muted">Loading post…</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={post.src}
                    height="500"
                    width="360"
                    frameBorder="0"
                    allowFullScreen
                    // title={post.label}
                    onLoad={() => handleLoad(post.id)}
                    className="block w-full"
                    style={{ minHeight: '500px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {embedPosts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(Math.min(i, maxIdx))}
              className={`rounded-full transition-all duration-300 ${
                i >= activeIdx && i < activeIdx + visibleCount
                  ? 'w-6 h-2 bg-vc-green'
                  : 'w-2 h-2 bg-vc-green/25 hover:bg-vc-green/50'
              }`}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-vc-green-mist border border-vc-green/20 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center flex-shrink-0">
              <Linkedin size={18} className="text-white" />
            </div>
            <div>
              <p className="font-sans font-semibold text-vc-dark text-sm">
                Follow Veridian Carbon on LinkedIn
              </p>
              <p className="text-vc-text-muted text-xs mt-0.5">
                Get weekly updates on CDR science, project milestones & carbon markets.
              </p>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/company/veridiancarbon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-300 flex-shrink-0"
          >
            <Linkedin size={15} />
            Follow Now
          </a>
        </div>

      </div>
    </section>
  );
};