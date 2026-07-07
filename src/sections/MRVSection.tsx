import React, { useEffect, useRef, useState } from 'react';
import { Activity, Scale, Droplets, Lock, ChevronRight, Terminal, Wifi, Cpu, FileCheck } from 'lucide-react';

// Live ledger rows — mimics your real dMRV system from veridiancarbon.com
const LEDGER_ROWS = [
  { time: '2026-06-13 08:42:11Z', batch: 'BCR-7741', temp: '801°C', hash: 'a3f9c1e8b7d240f6' },
  { time: '2026-06-13 08:41:58Z', batch: 'BCR-7740', temp: '798°C', hash: '7c8f9012ab34cd56' },
  { time: '2026-06-13 08:41:39Z', batch: 'BCR-7739', temp: '803°C', hash: 'e15a6b3d7c8f9012' },
  { time: '2026-06-13 08:41:12Z', batch: 'BCR-7738', temp: '796°C', hash: 'd8f02c9e15a6b3d7' },
  { time: '2026-06-13 08:40:55Z', batch: 'BCR-7737', temp: '799°C', hash: 'f6c93a1e7b4d8f02' },
];

const pillars = [
  {
    icon: <Activity size={20} />,
    label: '3-Plot In-Field Monitoring',
    desc: 'Project area divided into Control (2.5%), Treatment (2.5%), and Deployment (95%) zones for high-resolution baseline accuracy.',
    badge: 'Field Scale',
    detail: 'Eliminates confounding variables',
  },
  {
    icon: <Scale size={20} />,
    label: 'Solid-Phase Quantification',
    desc: 'Isotope dilution mass balance calculating Ca²⁺/Mg²⁺ depletion against immobile reference tracers (Ti, Zr).',
    badge: 'Lab Grade',
    detail: 'Zero model approximations',
  },
  {
    icon: <Droplets size={20} />,
    label: 'Aqueous-Phase Validation',
    desc: 'Independent sense-checks using porewater alkalinity and DIC measurements. Dual-method verification eliminates false positives.',
    badge: 'Cross-Validated',
    detail: 'Eliminates the Ash Spike problem',
  },
  {
    icon: <Lock size={20} />,
    label: 'Cryptographic Anchoring',
    desc: 'IoT hardware data anchored to Polygon blockchain via Merkle Trees. Every field photo SHA-256 hashed at capture.',
    badge: 'On-Chain',
    detail: 'Tamper-proof, audit-grade',
  },
];

const lcaSteps = [
  {
    label: 'Gross Biochar Drawdown',
    value: '1.00t',
    sign: '+',
    color: '#2D6A2D',
  },
  {
    label: 'Harvest & Transport',
    value: '0.05t',
    sign: '−',
    color: '#B85C38',
  },
  {
    label: 'Pyrolysis Emissions',
    value: '0.08t',
    sign: '−',
    color: '#B85C38',
  },
  {
    label: 'Net Verified Removal',
    value: '0.87t',
    sign: '=',
    color: '#2D6A2D',
    highlight: true,
  },
];

export const MRVSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLedgerRow, setActiveLedgerRow] = useState(0);
  const [tickCount, setTickCount] = useState(0);

  // Simulate live ledger ticking
  useEffect(() => {
    const t = setInterval(() => {
      setActiveLedgerRow((i) => (i + 1) % LEDGER_ROWS.length);
      setTickCount((c) => c + 1);
    }, 1800);
    return () => clearInterval(t);
  }, []);

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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="mrv" ref={sectionRef} className="py-24 bg-[#F8F7F2] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(#D9DDD6 1px, transparent 1px),linear-gradient(90deg, #D9DDD6 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-vc-green/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-vc-green/10 border border-vc-green/25 rounded-full px-4 py-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-vc-green-light animate-pulse" />
            <span className="font-mono text-xs text-vc-green-light tracking-widest">LIVE VERIFICATION LEDGER STREAMING</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#16361D] mb-4">
            Uncompromising{' '}
            <span className="text-[#4A8C3F] italic">dMRV</span>
          </h2>
          <p className="text-[#1A110]/60 text-base max-w-xl mx-auto leading-relaxed">
            <b>Every credit SHA-256 fingerprinted at the edge. No cloud dependency. No fraud vector. Engineered for Isometric V1.1 and CSI C-sink registry.</b>
          </p>
        </div>

        {/* ── Live Ledger Console ────────────────────────── */}
         
          {/* <div className="reveal mb-14">
          <div className="relative bg-[#0E1410] border border-[#253428] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.22)]"> */}

            {/* subtle grid */}
            {/* <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />   */}

            {/* Header */}
            {/* <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#253428]">

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#7AE582] uppercase">
                  Live Verification Ledger
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-[#17301F] text-[#7AE582] text-[10px] font-mono">
                  ONLINE
                </span>

                <span className="px-2 py-1 rounded-full bg-[#1B2320] text-[#9AA89C] text-[10px] font-mono">
                  POLYGON
                </span>
              </div>
            </div> */}

            {/* Command Bar */}
            {/* <div className="px-6 py-3 border-b border-[#253428] bg-black/10">
              <span className="font-mono text-xs text-[#7AE582]">
                verifying field records • anchoring hashes • syncing ledger
              </span>
            </div> */}

            {/* Column Header */}
            {/* <div className="grid grid-cols-4 px-6 py-3 border-b border-[#253428]">
              {['TIMESTAMP', 'BATCH', 'TEMP', 'SHA-256 HASH'].map((h) => (
                <span
                  key={h}
                  className="font-mono text-[10px] tracking-[0.18em] text-[#6C8A73]"
                >
                  {h}
                </span>
              ))}
            </div> */}

            {/* Rows */}
            {/* {LEDGER_ROWS.map((row, i) => (
              <div
                key={row.batch}
                className="grid grid-cols-4 px-6 py-3 transition-all duration-500 border-b border-[#1A241D]"
                style={{
                  background:
                    i === activeLedgerRow
                      ? 'rgba(74,222,128,0.06)'
                      : 'transparent',
                  borderLeft:
                    i === activeLedgerRow
                      ? '3px solid #4ADE80'
                      : '3px solid transparent',
                  opacity: i === activeLedgerRow ? 1 : 0.72,
                }}
              >
                <span className="font-mono text-xs text-[#C8D1CB]">
                  {row.time}
                </span>

                <span className="font-mono text-xs font-semibold text-[#7AE582]">
                  {row.batch}
                </span>

                <span className="font-mono text-xs text-[#D9C27A]">
                  {row.temp}
                </span>

                <span className="font-mono text-xs text-[#7E8B82] truncate">
                  {row.hash}…
                </span>
              </div>
            ))} */}

            {/* Footer Stats */}
            {/* <div className="grid grid-cols-4 gap-4 px-6 py-5 bg-[#0A0F0B]">

              <div>
                <p className="font-mono text-[10px] text-[#6C8A73] uppercase">
                  Node Status
                </p>
                <p className="font-semibold text-[#7AE582] text-sm">
                  Online
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] text-[#6C8A73] uppercase">
                  Sync State
                </p>
                <p className="font-semibold text-[#9FD4FF] text-sm">
                  Verified
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] text-[#6C8A73] uppercase">
                  Hardware
                </p>
                <p className="font-semibold text-[#E5E7EB] text-sm">
                  Nominal
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] text-[#6C8A73] uppercase">
                  Events Logged
                </p>
                <p className="font-semibold text-[#E5E7EB] text-sm">
                  {tickCount}
                </p>
              </div>

            </div>
          </div>
        </div> */}


        {/* ── LCA + Protocols side by side ────────────────── */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* LCA Engine */}
          <div className="bg-white/4 border border-vc-green/15 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-6">
              <FileCheck size={16} className="text-vc-green-light" />
              <span className="font-mono text-xs text-vc-green-light tracking-widest uppercase"><b>Automated LCA Engine</b></span>
            </div>
            <p className="text-[#1A110]/50 text-xs mb-6 leading-relaxed">
              Strict net-negativity. Every tonne claimed is mathematically proven to exceed operational emissions. Python FastAPI — audit-ready reports in seconds.
            </p>
            <div className="space-y-3">
              {lcaSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <span className="font-mono text-sm w-4 text-center flex-shrink-0"
                    style={{
                      color:
                        step.sign === '−'
                          ? '#B85C38'
                          : step.sign === '+'
                            ? '#4A8C3F'
                            : step.highlight
                              ? '#2D6A2D'
                              : 'transparent',
                    }} >
                    {step.sign || (i === 0 ? '' : '')}
                  </span>
                  <div className={`flex-1 flex items-center justify-between rounded-xl px-4 py-3 ${step.highlight ? 'border border-vc-green/30' : ''}`}
                    style={{ backgroundColor: step.highlight ? 'rgba(45,106,45,0.2)' : 'rgba(255,255,255,0.04)' }}>
                    <span className="text-[#1A110]/70 text-xs">{step.label}</span>
                    <span
                      className="font-display font-bold text-base" style={{ color: step.color }}>
                      {step.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocol compliance */}
          <div className="bg-white/4 border border-vc-green/15 rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock size={16} className="text-vc-green-light" />
                <span className="font-mono text-xs text-vc-green-light tracking-widest uppercase"><b>Protocol Compliance</b></span>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { label: 'Isometric Enhanced Weathering V1.1', status: 'Compliant' },
                  { label: 'CSI Global Artisan C-Sink Registry', status: 'Verified' },
                  { label: 'Polygon Blockchain Anchoring', status: 'Active' },
                  { label: 'ISO 14064-2 LCA Methodology', status: 'Aligned' },
                  { label: 'SHA-256 Field Photo Hashing', status: 'Enforced' },
                ].map(b => (
                  <div key={b.label} className="flex items-center justify-between py-2.5 border-b border-vc-green/8 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-vc-green-light animate-pulse flex-shrink-0" />
                      <span className="font-sans text-xs text-[#1A110]/70">{b.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-vc-green-light bg-vc-green/10 px-2 py-0.5 rounded-full flex-shrink-0 ml-3">
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Greenwashing callout */}
            <div className="bg-vc-terracotta/8 border border-vc-terracotta/20 rounded-xl p-4">
              <p className="font-sans font-semibold text-[#2B1B17] text-sm mb-1">
                Closing the Greenwashing Loophole
              </p>
              <p className="text-[#1A110]/50 text-xs leading-relaxed">
                Afforestation credits: 20 - 100 yr storage. SBTi now mandates only high-permanence CDR. Our credits meet every standard — now and in the future.
              </p>
            </div>

            <a href="#contact" className="btn-primary mt-5 w-full justify-center">
              Request Technical Docs
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* ── IoT hardware strip ──────────────────────────── */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Cpu size={16} />, label: 'BLE ESP32 Thermocouple', sub: 'Wireless kiln temp logging' },
            { icon: <Terminal size={16} />, label: 'SQLite Drift DB', sub: 'Offline-first edge capture' },
            { icon: <Lock size={16} />, label: 'SHA-256 EXIF Hash', sub: 'Photo tamper detection' },
            { icon: <FileCheck size={16} />, label: 'Python FastAPI LCA', sub: 'Auto audit reports' },
          ].map(item => (
            <div key={item.label} className="bg-white/3 border border-vc-green/10 rounded-xl px-4 py-4 flex items-start gap-3">
              <div className="text-vc-green-light mt-0.5 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-mono text-xs text-[#2B1B17]/80 font-bold leading-tight">{item.label}</p>
                <p className="font-mono text-[10px] text-[#1A110]/40 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};