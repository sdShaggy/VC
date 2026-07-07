# Veridian Carbon — Technical Documentation

> Production-grade for Veridian Carbon, a climate tech startup building Enhanced Rock Weathering (ERW) and Biochar co-deployment projects across Indian agriculture.
>
> **Live:** [vc-two-steel.vercel.app](https://vc-two-steel.vercel.app) · **Repo:** [github.com/sdShaggy/VC](https://github.com/sdShaggy/VC)

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Getting Started](#3-getting-started)
4. [Design System](#4-design-system)
5. [Component Architecture](#5-component-architecture)
6. [Animation & Scroll System](#6-animation--scroll-system)
7. [StorytellingSection — Deep Dive](#7-storytellingsection--deep-dive)
8. [Navbar — Behaviour Contract](#8-navbar--behaviour-contract)
9. [Footer](#9-footer)
10. [Performance Notes](#10-performance-notes)
11. [Deployment](#11-deployment)
12. [Content Updates](#12-content-updates)
13. [Known Constraints & TODOs](#13-known-constraints--todos)

---

## 1. Tech Stack

| Layer | Choice | Version | Reason |
|---|---|---|---|
| Framework | React | 18.2 | Component model, concurrent features |
| Language | TypeScript | 5.4 | Type safety across all components |
| Build tool | Vite | 5.2 | Sub-second HMR, fast production builds |
| Styling | Tailwind CSS | 3.4 | Utility-first, custom token system |
| Animation | Framer Motion | 11.0 | Complex entrance/exit animations |
| Icons | Lucide React | 0.363 | Consistent SVG icon set |
| Routing | React Router DOM | 6.22 | Client-side routing (single-page) |
| CSS processor | PostCSS + Autoprefixer | — | Tailwind pipeline |
| Deployment | Vercel | — | Zero-config, CDN edge |

No component library (MUI, Shadcn, etc.) is used. All UI is hand-built to match the design language exactly.

---

## 2. Project Structure

```
VC/
├── public/
│   ├── logo.png              # Navbar logo (hex icon + wordmark)
│   ├── foot_logo.png         # Footer logo (green square variant)
│   └── images/
│       └── hero_video.mp4    # Background video for StorytellingSection
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Pinned → floating pill navbar
│   │   ├── Hero.tsx              # Full-screen hero with particle canvas
│   │   ├── Problem.tsx           # CDR gap + India vulnerability
│   │   ├── StorytellingSection.tsx  # Full-screen video narrative (4 chapters)
│   │   ├── Technology.tsx        # ERW + Biochar + Synergy cards
│   │   ├── Methodology.tsx       # Horizontal scroll carbon cycle (5 steps)
│   │   ├── DMRV.tsx              # dMRV scientific rigor, 4-pillar grid
│   │   ├── Impact.tsx            # Animated counters + project roadmap
│   │   ├── Team.tsx              # 4-person grid
│   │   ├── Offtake.tsx           # Ocean-bg CTA + LOI terms
│   │   └── Footer.tsx            # Dark footer with anchor links
│   │
│   ├── hooks/
│   │   └── useReveal.ts          # IntersectionObserver scroll-reveal hook
│   │
│   ├── App.tsx                   # Root: section composition + scroll wiring
│   ├── main.tsx                  # React DOM entry point
│   └── index.css                 # Global styles, design tokens, keyframes
│
├── index.html                    # HTML shell, font imports, meta tags
├── vite.config.ts                # Vite config (React plugin, port 3000)
├── tailwind.config.js            # Custom tokens, font families, animations
├── tsconfig.json                 # Strict TypeScript config
└── package.json                  # Dependencies and scripts
```

---

## 3. Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & run

```bash
git clone https://github.com/sdShaggy/VC.git
cd VC
npm install
npm run dev
# → http://localhost:3000
```

### Build for production

```bash
npm run build       # tsc + vite build → dist/
npm run preview     # preview the dist/ bundle locally
```

### Environment

No `.env` variables are required. All content is static and co-located in components or the `public/` directory.

---

## 4. Design System

### 4.1 Color Tokens

Defined in `tailwind.config.js` under `theme.extend.colors` and mirrored as CSS custom properties in `index.css`.

| Token | Hex | Usage |
|---|---|---|
| `vc-offwhite` | `#F5F2EC` | Page background, navbar fill |
| `vc-cream` | `#EDE8DF` | Alternating section backgrounds |
| `vc-dark` | `#1A2E1A` | Primary text, footer background |
| `vc-text` | `#2C3A2C` | Body text |
| `vc-text-muted` | `#6B7A6B` | Secondary text, nav links |
| `vc-parchment` | `#C8B89A` | Muted text on dark backgrounds |
| `vc-green` | `#2D6A2D` | Primary brand, CTAs |
| `vc-green-light` | `#4A8C3F` | Hover states, accents |
| `vc-green-pale` | `#C8DFC4` | Text on dark backgrounds |
| `vc-green-sage` | `#7A9E7A` | Labels, badges, mono text |
| `vc-green-mist` | `#E8F2E5` | Subtle background tints |
| `vc-terracotta` | `#B85C38` | Warnings, data highlights |

### 4.2 Typography

Loaded from Google Fonts via `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?
  family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700
  &family=DM+Sans:wght@300;400;500;600
  &family=JetBrains+Mono:wght@400;500
  &display=swap" rel="stylesheet">
```

| Role | Family | Class | Used for |
|---|---|---|---|
| Display | Playfair Display | `font-display` | H1–H3, pull-quotes, hero |
| Body | DM Sans | `font-sans` (default) | Paragraphs, nav, buttons |
| Mono | JetBrains Mono | `font-mono` | Section labels, badges, stats |

### 4.3 Spacing & Layout

- Max content width: `max-w-7xl` (1280px) with `px-6` (mobile) / `px-8` (desktop) gutters
- Section vertical rhythm: `py-24` (96px) standard, `py-32` (128px) for major sections
- Grid system: CSS Grid via Tailwind (`grid-cols-2`, `grid-cols-4`, etc.) — no fixed breakpoint framework

### 4.4 Global CSS Classes

Defined in `index.css` for reuse across components:

```css
.section-label    /* mono uppercase tracking label above headings */
.btn-primary      /* filled green CTA button with flex + gap */
.btn-ghost        /* outlined CTA button */
.animated-underline  /* nav link with CSS underline slide-in on hover */
.organic-blob     /* border-radius morphing shape for decorative use */
.reveal           /* initial state for scroll-reveal (opacity:0, translateY:24px) */
.reveal.visible   /* triggered state (opacity:1, translateY:0) */
```

---

## 5. Component Architecture

All components are co-located functional components with `React.FC` typing. No global state management (Redux, Zustand, etc.) — each component is self-contained with local `useState`/`useEffect`.

### 5.1 App.tsx

Root composition file. Renders all section components in page order and applies the grain texture overlay:

```tsx
// Section render order mirrors visual page order
<Navbar />
<Hero />          {/* #hero */}
<Problem />       {/* #problem */}
<StorytellingSection />   {/* #conviction */}
<Technology />    {/* #technology */}
<Methodology />   {/* #methodology */}
<DMRV />          {/* #dmrv */}
<Impact />        {/* #impact */}
<Team />          {/* #team */}
<Offtake />       {/* #offtake */}
<Footer />        {/* #contact */}
```

### 5.2 Section IDs (anchor targets)

| Section | `id` attribute | Linked from |
|---|---|---|
| Hero | `hero` | Logo click |
| Problem | `problem` | — |
| Conviction/Story | `conviction` | — |
| Technology | `technology` | Navbar, Footer |
| Methodology | `methodology` | Navbar, Footer |
| dMRV | `dmrv` | Footer |
| Impact | `impact` | Navbar, Footer |
| Operational Scale | `operational-scale` | Footer |
| Team | `team` | Navbar |
| Contact / Footer | `contact` | Navbar CTA |

### 5.3 useReveal Hook

`src/hooks/useReveal.ts` — attaches an `IntersectionObserver` to a container ref and adds the `.visible` class to all `.reveal` children when the container enters the viewport.

```ts
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.reveal')
          .forEach(el => el.classList.add('visible'))
      }
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}
```

Usage in any section component:

```tsx
const ref = useReveal()
return (
  <section ref={ref}>
    <h2 className="reveal">Heading</h2>
    <p className="reveal reveal-delay-1">Body</p>
  </section>
)
```

Delay variants `.reveal-delay-1` through `.reveal-delay-4` are defined in `index.css` as `transition-delay` offsets (0.1s increments).

---

## 6. Animation & Scroll System

### 6.1 Scroll Reveal

CSS class-based, driven by `useReveal`. No JS animation library involved — just `transition: opacity 0.7s ease, transform 0.7s ease` with `IntersectionObserver` toggling `.visible`.

### 6.2 Framer Motion

Used selectively for complex entrance sequences (Hero stat pills, Technology card stagger). Import pattern:

```tsx
import { motion, useInView } from 'framer-motion'
```

Kept intentionally limited — most animations are CSS transitions to avoid bundle overhead.

### 6.3 Particle Canvas (Hero)

A `<canvas>` element in `Hero.tsx` runs a lightweight particle system:
- ~60 particles with random velocity and size
- Drawn with `requestAnimationFrame`
- Canvas sized to `window.innerWidth × window.innerHeight`, resized on `resize` event
- Particles wrap at edges (torus topology)
- Colour: `rgba(45, 106, 45, opacity)` — matches `vc-green`

### 6.4 Animated Counters (Impact)

`IntersectionObserver` triggers a `setInterval` counting animation from 0 to target value over ~1.2s. Easing is applied manually: `Math.ceil(current + (target - current) * 0.08)` per tick, giving a natural deceleration.

### 6.5 Horizontal Scroll (Methodology)

`Methodology.tsx` implements a sticky horizontal scroll section:

```
┌─ sticky outer (100vh height × N cards) ─────────────────────────────┐
│  └─ sticky inner (position: sticky; top: 0; height: 100vh)          │
│     └─ flex row of cards, translateX driven by scroll progress       │
└──────────────────────────────────────────────────────────────────────┘
```

`useEffect` attaches a `scroll` listener. Progress `0→1` maps to `translateX(0 → -(totalWidth - viewportWidth))`. Cards snap via CSS `scroll-snap-type` is not used — translation is manual and continuous.

---

## 7. StorytellingSection — Deep Dive

This is the most complex component. Full-screen video background with 4 auto-advancing narrative chapters.

### 7.1 Architecture

```
StorytellingSection
├── <video> — grayscale background, manually looped
├── Grade overlays × 4 — per-chapter colour tints (position: absolute, z-index: 1)
├── Base darkening overlay — left-to-right gradient (z-index: 2)
├── Bottom vignette — top-to-bottom gradient (z-index: 2)
├── Top label — "The Conviction" (z-index: 20)
├── Two-column content grid (z-index: 10)
│   ├── LEFT: Story slides stack (absolute, crossfade)
│   └── RIGHT: Giant chapter number watermark
└── Bottom tab strip (z-index: 20)
    └── 4 chapter tabs with progress bars
```

### 7.2 Timer Architecture

**Problem with naive `setTimeout` in `useEffect`:** React tears down and recreates timers on every `activeIdx` state change. This causes a ~16–50ms dead zone between slides, visible as a stutter.

**Solution: persistent `requestAnimationFrame` loop**

```ts
// All mutable state lives in refs, not React state
const startTimeRef = useRef(performance.now())
const pausedAtRef  = useRef<number | null>(null)
const activeIdxRef = useRef(0)
const isPausedRef  = useRef(false)
const rafRef       = useRef<number>(0)

// Single RAF loop, never torn down
const tick = (now: number) => {
  // 1. Video loop check (every 16ms)
  // 2. Slide timer check
  rafRef.current = requestAnimationFrame(tick)
}
rafRef.current = requestAnimationFrame(tick)
return () => cancelAnimationFrame(rafRef.current)
```

Pause/resume works by recording `pausedAtRef` on pause and offsetting `startTimeRef` on resume, so elapsed time is never double-counted.

### 7.3 Video Loop — The Jerk Problem

**Root cause:** The browser's native `loop` attribute seeks from `duration` to `0` in the media decoder. This always produces a dropped frame (~1–3 frames) because the decoder stalls while re-buffering.

**Solution: RAF-based pre-emptive seek**

The `tick` function reads `video.currentTime` every frame (~16ms). When `currentTime >= duration - 0.5s`, it manually sets `currentTime = 0`. By seeking 500ms before the clip ends, the browser has frames buffered at position 0 already, making the transition invisible.

```ts
const video = videoRef.current
if (video && video.duration && !video.paused) {
  if (video.currentTime >= video.duration - LOOP_PREEMPT_S) {
    video.currentTime = 0
  }
}
```

`loop` is kept on the `<video>` element as a true safety net for when the tab is backgrounded (browsers throttle or suspend RAF in hidden tabs).

### 7.4 Transition Timings

| Property | Value | Rationale |
|---|---|---|
| Grade overlay fade | `0.6s cubic-bezier(0.4,0,0.2,1)` | Fast enough to feel instant, easing avoids pop |
| Text translateY | `8px` (was 20px) | Subtle motion — large values feel heavy |
| Text transition | `0.55s cubic-bezier(0.4,0,0.2,1)` | Matches overlay, same easing family |
| Slide interval | `6500ms` | Enough time to read the longest body copy |
| Progress bar | `0.016s linear` | Matches RAF cadence (1 frame = 16ms) |

### 7.5 Story Data Shape

```ts
type Story = {
  label: string        // Tab label
  chapter: string      // '01' – '04'
  heading: string      // H2 text
  quote: string        // Italic pull-quote
  body: string         // Paragraph body
  stat: string         // Large stat value
  statLabel: string    // Stat descriptor
  attribution: null | { initials: string; name: string; role: string }
  grade: string        // CSS gradient for colour overlay
  accentColor: string  // Hex — used for quote border, stat, tab active
}
```

---

## 8. Navbar — Behaviour Contract

### 8.1 States

| Scroll position | State | Visual |
|---|---|---|
| `scrollY ≤ 80px` | **Pinned** | `top:0, left:0, right:0` — full width, square corners, thin bottom border |
| `scrollY > 80px` | **Floating** | `top:12px, left:16px, right:16px` — rounded pill, shadow, all-around border |

### 8.2 Implementation

The wrapper `<div>` animates `top/left/right` via inline styles with `transition: all 500ms ease-in-out`. The inner `<nav>` animates `borderRadius`, `boxShadow`, `border`, and `padding` on the same transition.

Background is always `rgba(247, 245, 240, 0.97)` with `backdrop-filter: blur(12px)` — no transparency toggle. The perceived "fading into hero" at scroll=0 is the hero's own background image showing through beneath the navbar before the user scrolls.

### 8.3 Active Section Tracking

`IntersectionObserver` watches all section elements. When a section crosses `30%` of viewport height (with `-100px 0px -60% 0px` rootMargin), its `id` is set as `activeSection`. The matching nav link receives `text-vc-green`.

### 8.4 Mobile Menu

Full-screen overlay (`position: fixed; inset: 0; z-index: 40`) with `opacity` transition. Links render at `text-3xl` Playfair Display with bottom borders. CTAs stack vertically at the bottom of the overlay.

---

## 9. Footer

### 9.1 Logo

```tsx
<img src="/foot_logo.png" alt="Veridian Carbon" className="h-14 w-auto object-contain" />
```

Place `foot_logo.png` in `public/`. Vite serves `public/` at root — no import needed.

### 9.2 Protocol Link Map

| Label | `href` | Target section `id` |
|---|---|---|
| Technology | `#technology` | `TechnologySection` |
| Methodology | `#methodology` | `MethodologySection` |
| Operational Scale | `#operational-scale` | `ImpactSection` (scale subsection) |
| dMRV System | `#dmrv` | `DMRVSection` |
| Protocol Impact | `#impact` | `ImpactSection` |

Ensure target sections carry the exact matching `id` attribute or smooth-scroll anchors won't resolve.

### 9.3 Contact Details

These are hardcoded in `Footer.tsx`. Update in-file if they change.

---

## 10. Performance Notes

### Bundle

The production build (`tsc && vite build`) outputs to `dist/`. With the current dependency set, approximate chunk sizes:

| Chunk | Approx. size (gzip) |
|---|---|
| `react` + `react-dom` | ~45 KB |
| `framer-motion` | ~35 KB |
| `lucide-react` (tree-shaken) | ~8 KB |
| App code (all components) | ~30 KB |
| **Total** | **~118 KB** |

### Images & Video

- `hero_video.mp4` is the single largest asset. Host it on a CDN (currently served from `veridiancarbon.com/images/`). Do not commit large video files to the repo.
- Stock images (Unsplash URLs) are loaded remotely — no image build step needed. For production, consider downloading and serving from your own CDN to avoid Unsplash rate limits and ensure availability.

### Animations

- All CSS transitions use `transform` and `opacity` only — these are GPU-composited and do not trigger layout.
- The RAF loop in `StorytellingSection` reads `video.currentTime` and calls `setProgress` every frame. This triggers a React re-render every ~16ms on that component. This is acceptable (the component has no expensive children) but if you add heavy child components, move the progress bar to a `ref`-driven DOM mutation instead.
- `IntersectionObserver` is used instead of `scroll` events for reveal animations — far cheaper, no scroll jank.

---

## 11. Deployment

The site is deployed on **Vercel** with zero configuration.

### Automatic deploys

Push to `main` → Vercel builds and deploys automatically.

```
Build command:  npm run build
Output dir:     dist
Node version:   18.x
```

### Manual deploy

```bash
npm i -g vercel
vercel --prod
```

### Custom domain

Set in Vercel dashboard → Project → Settings → Domains.

---

## 12. Content Updates

All user-facing content lives directly in component files. There is no CMS or content layer.

| What to change | Where |
|---|---|
| Hero headline / subheading | `src/components/Hero.tsx` |
| Story chapters (narrative, stats) | `src/components/StorytellingSection.tsx` → `stories` array |
| Technology cards (ERW/Biochar) | `src/components/Technology.tsx` |
| Carbon cycle steps | `src/components/Methodology.tsx` → `steps` array |
| dMRV pillars | `src/components/DMRV.tsx` |
| Impact stats / roadmap numbers | `src/components/Impact.tsx` |
| Team members | `src/components/Team.tsx` |
| Offtake terms (575 tons, dates) | `src/components/Offtake.tsx` |
| Footer links and contact | `src/components/Footer.tsx` |
| Nav links | `src/components/Navbar.tsx` → `navLinks` array |
| Color palette | `tailwind.config.js` + `src/index.css` |

---

## 13. Known Constraints & TODOs

### Known constraints

- **Video loop on Safari mobile:** RAF is aggressively throttled when the page is not in focus on iOS Safari. Native `loop` handles this as a fallback but there may be a 1-frame flash on very low-end devices.
- **Horizontal scroll on touch:** `Methodology.tsx` uses JS-driven `translateX`. On touch devices, this fights with native scroll momentum. A `touch-action: pan-y` on the sticky container mitigates this but does not eliminate it.
- **No SSR:** Pure client-side React. If SEO beyond the static `<meta>` tags in `index.html` is needed, migrate to Next.js App Router.

---

## Authors

**Sarvagya Dwivedi**
