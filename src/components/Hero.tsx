import React from 'react';
import { SiteConfig } from '../data/siteConfig';
import { ArrowRight, Sliders, CheckCircle2, Building, Shield, Server, Lock } from 'lucide-react';
import heroOpsImg from '../assets/images/hero_security_ops_1791808906137.jpg';

interface HeroProps {
  config: SiteConfig;
  onOpenSizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenSizer }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial gradient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#0f2444_0%,transparent_60%)] opacity-70" />
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-10 -z-10 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Human title-case kicker without code comment slashes */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <span>{config.hero.kicker}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">VISION EXCHANGE HQ</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.9rem] leading-[1.15] text-balance">
              {config.hero.title}{' '}
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                {config.hero.highlight}
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {config.hero.subtitle}
            </p>

            {/* Twin Pillar Badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-lg">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                <Server className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Enterprise IT Systems</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
                <Lock className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Physical Security & CCTV</span>
              </div>
            </div>

            {/* CTA action cluster */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors shadow-lg shadow-cyan-950/50"
              >
                {config.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenSizer}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
              >
                <Sliders className="h-4 w-4 text-cyan-400" />
                {config.hero.secondaryCta}
              </button>
            </div>

            {/* Trust guarantees list */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                Authorized Tier-1 OEM Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                On-Site Staging & Burn-In Testing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                Singapore PDPA & IM8 Compliant
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-2 shadow-2xl backdrop-blur-sm overflow-hidden group">
              {/* Media image container with resilient fallback */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={heroOpsImg}
                  alt="Enterprise Security Operations Center & IT Datacenter by JEB Innovations"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized SVG background if image fails
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-slate-900', 'to-slate-800');
                    }
                  }}
                />
                
                {/* Visual overlay gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Live telemetry badge simulation */}
                <div className="absolute top-3 right-3 flex items-center gap-2 rounded-md bg-slate-950/85 px-3 py-1.5 border border-slate-700/60 text-xs font-mono backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-300">OPS CENTER CONVERGED</span>
                </div>

                {/* Bottom card highlight */}
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-slate-950/90 p-3 border border-slate-800/80 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">Full-Stack Physical & IT Architecture</p>
                      <p className="text-[11px] text-slate-400">Optical Fabric · CCTV Storage Arrays · Biometric Access</p>
                    </div>
                    <span className="font-mono text-cyan-400 font-semibold shrink-0">UEN Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-KPI Strip below hero split */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 lg:grid-cols-4 lg:gap-8 backdrop-blur-sm">
          {config.hero.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400 tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
