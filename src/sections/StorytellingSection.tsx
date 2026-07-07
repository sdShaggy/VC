import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const VIDEO_URL =
  "https://veridiancarbon.com/images/hero_video.mp4";

const stories = [
  {
    label: 'The Soil Crisis',
    chapter: '01',
    heading: "India's Soil Crisis",
    quote: '"120 million farmers. Increasingly acidic soils. A crisis hiding in plain sight."',
    body: 'Over 120 million smallholder farmers depend on soils that are increasingly acidic, depleted of nutrients, and vulnerable to erratic monsoons. Lantana camara has colonised over 13 million hectares of Indian forest — destroying biodiversity and rural livelihoods.',
    stat: '13M ha',
    statLabel: 'Lantana Colonised',
    attribution: null,
    grade: 'linear-gradient(135deg, rgba(101,60,20,0.72) 0%, rgba(60,30,10,0.45) 50%, rgba(20,36,20,0.30) 100%)',
    accentColor: '#D4956A',
  },
  {
    label: '5,000 Years of Proof',
    chapter: '02',
    heading: 'Earth Has Been Doing This For Billions of Years',
    quote: '"We\'re not inventing something new. We\'re accelerating what nature already does."',
    body: "Silicate rock weathering is the planet's own carbon thermostat — a geologic process that has regulated atmospheric CO₂ for eons. The science isn't speculative. It's written in rock.",
    stat: '5,000+',
    statLabel: 'Years of Permanence',
    attribution: null,
    grade: 'linear-gradient(135deg, rgba(10,50,80,0.72) 0%, rgba(10,40,60,0.45) 50%, rgba(12,22,12,0.30) 100%)',
    accentColor: '#7AB8D4',
  },
  {
    label: 'Where Rock Meets Farmland',
    chapter: '03',
    heading: 'Giving Nature a Head Start',
    quote: '"Farmers see the difference in one season. The planet feels it for millennia."',
    body: 'We harvest invasive Lantana, pyrolyse it at 800°C in Kon-Tiki kilns, and co-apply the resulting biochar with crushed Deccan Trap basalt. Carbon locked permanently. Soil restored immediately. Verified cryptographically.',
    stat: '+40%',
    statLabel: 'Crop Yield Boost',
    attribution: null,
    grade: 'linear-gradient(135deg, rgba(20,70,20,0.70) 0%, rgba(30,80,30,0.40) 50%, rgba(12,22,12,0.25) 100%)',
    accentColor: '#C8DFC4',
  },
  {
    label: 'India as CDR Powerhouse',
    chapter: '04',
    heading: "India as the World's CDR Powerhouse",
    quote: '"The richest basalt deposits. The most invasive biomass. The biggest opportunity."',
    body: "India holds some of the world's richest basalt deposits and the worst invasive species crisis — both concentrated near its most degraded farmland. Our hyper-localised model scales to 150,000 tons of verified removal by 2030, across 10,000+ farmers.",
    stat: '1,50,000t',
    statLabel: 'Target by 2030',
    attribution: null,
    grade: 'linear-gradient(135deg, rgba(12,22,12,0.80) 0%, rgba(20,50,30,0.50) 50%, rgba(10,30,40,0.30) 100%)',
    accentColor: '#4A8C3F',
  },
];

const INTERVAL_MS = 6500;
// How many seconds before video end we seek back to 0.
// Must be large enough that the RAF check catches it every frame (~16ms),
// but small enough to not waste visible runtime. 0.5s is safe.
const LOOP_PREEMPT_S = 0.5;

export const StorytellingSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Video ref declared here so the RAF tick can read currentTime directly
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Persistent RAF-driven timer ───────────────────────────────────────
  // We keep a single rAF loop running forever so slide changes never
  // cause a timer-recreation pause. All state lives in refs.
  const startTimeRef = useRef<number>(performance.now());
  const pausedAtRef  = useRef<number | null>(null);   // wall-time when pause started
  const activeIdxRef = useRef(0);
  const isPausedRef  = useRef(false);
  const rafRef       = useRef<number>(0);

  const advanceSlide = useCallback(() => {
    const next = (activeIdxRef.current + 1) % stories.length;
    setPrevIdx(activeIdxRef.current);
    activeIdxRef.current = next;
    setActiveIdx(next);
    startTimeRef.current = performance.now();
    setProgress(0);
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
    if (isPaused) {
      // record when we paused so we can offset the start time on resume
      pausedAtRef.current = performance.now();
    } else if (pausedAtRef.current !== null) {
      // shift startTime forward by however long we were paused
      const pausedDuration = performance.now() - pausedAtRef.current;
      startTimeRef.current += pausedDuration;
      pausedAtRef.current = null;
    }
  }, [isPaused]);

  useEffect(() => {
    const tick = (now: number) => {
      // ── Video loop: poll every frame instead of relying on timeupdate ──
      // timeupdate fires every ~250ms from the media thread — far too slow.
      // Reading currentTime in RAF costs nothing and fires every 16ms,
      // so we catch the end-of-clip well before the browser has to seek.
      const video = videoRef.current;
      if (video && video.duration && !video.paused) {
        if (video.currentTime >= video.duration - LOOP_PREEMPT_S) {
          video.currentTime = 0;
        }
      }

      // ── Slide timer ──
      if (!isPausedRef.current) {
        const elapsed = now - startTimeRef.current;
        const pct = Math.min((elapsed / INTERVAL_MS) * 100, 100);
        setProgress(pct);
        if (elapsed >= INTERVAL_MS) {
          advanceSlide();
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [advanceSlide]);

  const goTo = useCallback((idx: number) => {
    setPrevIdx(activeIdxRef.current);
    activeIdxRef.current = idx;
    setActiveIdx(idx);
    startTimeRef.current = performance.now();
    setProgress(0);
  }, []);

  // Safety-net only: if the browser fires 'ended' before our RAF poll catches it
  // (e.g. tab was backgrounded and RAF was throttled), restart immediately.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);

  const active = stories[activeIdx];

  return (
    <section
      id="conviction"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* loop is kept as a genuine safety net for backgrounded tabs where RAF
          is throttled; our RAF poll will pre-empt it in normal operation */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, filter: 'grayscale(1)' }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Per-chapter colour grade — fast fade (600ms) ── */}
      {stories.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: s.grade,
            opacity: i === activeIdx ? 1 : 0,
            // 600ms instead of 1100ms; snappier cubic-bezier
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}

      {/* ── Base darkening overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to right, rgba(8,16,8,0.78) 0%, rgba(8,16,8,0.40) 55%, rgba(8,16,8,0.10) 100%)',
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(8,16,8,0.65) 100%)',
        }}
      />

      {/* ── Top centre label ── */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-none select-none">
        <div className="h-px w-8 bg-white/20" />
        <p className="font-mono text-xs text-white/40 tracking-[0.3em] uppercase">The Conviction</p>
        <div className="h-px w-8 bg-white/20" />
      </div>

      {/* ── Two-column content grid ── */}
      <div
        className="absolute inset-0 z-10 grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr',
          paddingTop: '80px',
          paddingBottom: '100px',
          paddingLeft: 'clamp(2rem, 6vw, 5rem)',
          paddingRight: 'clamp(2rem, 6vw, 5rem)',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'start',
        }}
      >
        {/* LEFT: Story text */}
        <div className="relative" style={{ paddingTop: 'clamp(1rem, 4vh, 3rem)' }}>
          {stories.map((story, i) => {
            const isActive = i === activeIdx;
            const wasActive = i === prevIdx;
            return (
              <div
                key={story.label}
                className="absolute top-0 left-0 right-0"
                style={{
                  opacity: isActive ? 1 : 0,
                  // Reduced from 20px → 8px; custom easing instead of ease-out
                  transform: isActive
                    ? 'translateY(0px)'
                    : wasActive
                    ? 'translateY(-8px)'
                    : 'translateY(8px)',
                  transition: 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <p
                  className="font-mono text-xs tracking-[0.3em] uppercase mb-5 select-none"
                  style={{ color: story.accentColor, opacity: 0.8 }}
                >
                  {story.chapter} / {String(stories.length).padStart(2, '0')} — {story.label}
                </p>

                <h2
                  className="font-display font-bold text-white leading-tight mb-5"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3.4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
                >
                  {story.heading}
                </h2>

                <blockquote
                  className="font-display italic leading-relaxed mb-5 pl-5"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                    color: story.accentColor,
                    borderLeft: `2px solid ${story.accentColor}`,
                    opacity: 0.9,
                  }}
                >
                  {story.quote}
                </blockquote>

                <p
                  className="leading-relaxed mb-8 font-light"
                  style={{
                    fontSize: 'clamp(0.875rem, 1.1vw, 0.975rem)',
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '480px',
                  }}
                >
                  {story.body}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className="inline-flex items-end gap-2 rounded-2xl px-6 py-4"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${story.accentColor}30`,
                    }}
                  >
                    <span
                      className="font-display font-bold leading-none"
                      style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', color: story.accentColor }}
                    >
                      {story.stat}
                    </span>
                    <span
                      className="font-mono text-xs mb-1 tracking-wider uppercase"
                      style={{ color: `${story.accentColor}80` }}
                    >
                      {story.statLabel}
                    </span>
                  </div>

                  {story.attribution && (
                    <div
                      className="inline-flex items-center gap-3 rounded-2xl px-4 py-3"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.10)',
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: '#2D6A2D' }}
                      >
                        {(story.attribution as any).initials}
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold leading-tight">
                          {(story.attribution as any).name}
                        </p>
                        <p className="text-xs leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>
                          {(story.attribution as any).role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Large chapter number watermark */}
        <div
          className="flex items-start justify-end select-none pointer-events-none"
          style={{ paddingTop: 'clamp(0.5rem, 2vh, 2rem)' }}
        >
          <div className="relative">
            <span
              className="font-display font-bold leading-none block"
              style={{
                fontSize: 'clamp(8rem, 18vw, 18rem)',
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                // Chapter number transitions smoothly too
                transition: 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {active.chapter}
            </span>
            <div
              className="absolute bottom-4 right-0 h-0.5"
              style={{
                width: '60%',
                backgroundColor: active.accentColor,
                opacity: 0.4,
                transition: 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom chapter tabs ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          paddingLeft: 'clamp(2rem, 6vw, 5rem)',
          paddingRight: 'clamp(2rem, 6vw, 5rem)',
        }}
      >
        <div className="flex items-stretch border-t border-white/10">
          {stories.map((s, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="flex-1 flex flex-col items-start gap-1.5 pt-4 pb-5 pr-6 focus:outline-none group"
                style={{
                  borderTop: `2px solid ${isActive ? s.accentColor : 'transparent'}`,
                  marginTop: '-1px',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Progress bar */}
                <div
                  className="w-full h-0.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  {isActive && (
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: s.accentColor,
                        // rAF updates ~every 16ms; linear here is correct
                        transition: 'width 0.016s linear',
                      }}
                    />
                  )}
                  {i < activeIdx && (
                    <div
                      className="h-full w-full rounded-full"
                      style={{ backgroundColor: `${s.accentColor}50` }}
                    />
                  )}
                </div>

                <span
                  className="font-mono text-xs select-none"
                  style={{
                    color: isActive ? s.accentColor : 'rgba(255,255,255,0.28)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {s.chapter}
                </span>
                <span
                  className="font-sans text-xs font-medium leading-tight text-left hidden sm:block select-none"
                  style={{
                    color: isActive ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.28)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};