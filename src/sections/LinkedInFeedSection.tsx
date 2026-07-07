import React from 'react';
import { Linkedin } from 'lucide-react';

const ALL_POSTS = [
  { id: 1,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7459975647449300992?collapsed=1' },
  { id: 2,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7464277847889719296' },
  { id: 3,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7432080826462310401' },
  { id: 4,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7429351428546211840' },
  { id: 5,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7425017848298823681' },
  { id: 6,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7436042563285037056?collapsed=1' },
  { id: 7,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7424145236647440384' },
  { id: 8,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7427216564669648896' },
  { id: 9,  src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7452989686240739328' },
  { id: 10, src: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7446534354371059712' },
];

const LANE_1 = ALL_POSTS.slice(0, 5);
const LANE_2 = ALL_POSTS.slice(5, 10);

// ── Card ─────────────────────────────────────────────────────────
// On hover:
//   • card scales up + lifts (transform)
//   • z-index raises above the moving track
//   • a transparent pointer-events overlay is removed so iframe is clickable
//   • lane continues scrolling behind — NO animation-play-state change
const PostCard: React.FC<{ src: string; id: number }> = ({ src, id }) => (
  <div
    className="li-card group"
    style={{
      position: 'relative',
      flexShrink: 0,
      width: '340px',
      marginLeft: '12px',
      marginRight: '12px',
      borderRadius: '16px',
      overflow: 'visible',           // allow the card to pop outside its container
      zIndex: 1,
      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), z-index 0s',
    }}
  >
    {/* Inner wrapper — this is what scales. Separate from outer so overflow:visible works */}
    <div
      className="
        relative rounded-2xl overflow-hidden
        border border-vc-green/12 bg-white
        shadow-sm shadow-vc-green/5
        transition-all duration-350
        group-hover:shadow-2xl group-hover:shadow-vc-green/20
        group-hover:border-vc-green/35
      "
      style={{
        transform: 'scale(1) translateY(0px)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'scale(1.045) translateY(-10px)';
        el.style.zIndex = '50';
        // Show iframe by removing the pointer-events overlay
        const overlay = el.querySelector('.li-overlay') as HTMLElement | null;
        if (overlay) overlay.style.pointerEvents = 'none';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'scale(1) translateY(0px)';
        el.style.zIndex = '1';
        // Restore overlay so hover detection works again
        const overlay = el.querySelector('.li-overlay') as HTMLElement | null;
        if (overlay) overlay.style.pointerEvents = 'auto';
      }}
    >
      {/* iframe */}
      <iframe
        src={src}
        height="500"
        width="340"
        frameBorder="0"
        allowFullScreen
        title={`LinkedIn post ${id}`}
        loading="lazy"
        className="block"
        style={{ minHeight: '500px', display: 'block' }}
      />

      {/*
        Overlay — catches hover OVER the iframe (which normally swallows events).
        Removed on mouseEnter above so the user can click into the post.
        Restored on mouseLeave so the next hover is detected correctly.
      */}
      <div
        className="li-overlay absolute inset-0 z-10"
        style={{ pointerEvents: 'auto', background: 'transparent' }}
      />
    </div>
  </div>
);

// ── Lane ─────────────────────────────────────────────────────────
// Lane NEVER pauses — animation runs constantly.
// Cards pop above via z-index/transform only.
interface LaneProps {
  posts: typeof LANE_1;
  direction: 'left' | 'right';
  duration: string;
}

const MarqueeLane: React.FC<LaneProps> = ({ posts, direction, duration }) => {
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className="overflow-hidden w-full"
      // Enough vertical padding so the popped card isn't clipped
      style={{ paddingTop: '18px', paddingBottom: '18px' }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
          willChange: 'transform',
        }}
      >
        {posts.map((p) => (
          <PostCard key={`a-${p.id}`} src={p.src} id={p.id} />
        ))}
        {posts.map((p) => (
          <PostCard key={`b-${p.id}`} src={p.src} id={p.id} />
        ))}
      </div>
    </div>
  );
};

// ── Section ──────────────────────────────────────────────────────
export const LinkedInFeedSection: React.FC = () => (
  <section id="linkedin" className="py-24 bg-vc-offwhite relative" style={{ overflow: 'hidden' }}>
    <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
    <div className="relative z-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-vc-green-light mb-3">
            From the Field
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-vc-dark leading-tight">
            Latest from{' '}
            <span className="text-vc-green italic">LinkedIn</span>
          </h2>
          <p className="text-vc-text-muted text-base mt-3 max-w-md leading-relaxed">
            Hover any post to read it — the feed keeps moving behind.
          </p>
        </div>
        <a
          href="https://www.linkedin.com/company/veridiancarbon"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0958a8] text-white px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 flex-shrink-0"
        >
          <Linkedin size={15} />
          Follow Veridian Carbon
        </a>
      </div>

      {/* Lane 1 → left */}
      <div className="mb-1">
        <MarqueeLane posts={LANE_1} direction="left" duration="38s" />
      </div>

      {/* Lane 2 → right */}
      <MarqueeLane posts={LANE_2} direction="right" duration="48s" />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-vc-green-mist border border-vc-green/20 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center flex-shrink-0">
              <Linkedin size={18} className="text-white" />
            </div>
            <div>
              <p className="font-sans font-semibold text-vc-dark text-sm">Follow Veridian Carbon on LinkedIn</p>
              <p className="text-vc-text-muted text-xs mt-0.5">
                Weekly updates on CDR science, project milestones &amp; carbon markets.
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
    </div>
  </section>
);