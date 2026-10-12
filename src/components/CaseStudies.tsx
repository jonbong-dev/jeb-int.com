import React from 'react';
import { SiteConfig, CaseStudy } from '../data/siteConfig';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface CaseStudiesProps {
  config: SiteConfig;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ config }) => {
  return (
    <section className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Proven Singapore Engagements
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Realized Results & Measurable Impact
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            How leading financial institutions, logistics operators, and cleanroom facilities deployed converged IT and physical security with JEB.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono text-cyan-400 font-semibold">{cs.tag}</span>
                  <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                    <MapPin className="h-3 w-3 text-slate-500" /> {cs.location}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {cs.clientType}
                </h3>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800/80">
                    <span className="font-semibold text-slate-300 block mb-1">Challenge:</span>
                    <p className="text-slate-400">{cs.challenge}</p>
                  </div>
                  <div className="rounded-lg bg-slate-950/80 p-3 border border-slate-800/80">
                    <span className="font-semibold text-slate-300 block mb-1">Delivered Solution:</span>
                    <p className="text-slate-400">{cs.solution}</p>
                  </div>
                </div>
              </div>

              {/* Quantified impact metrics */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-2">
                  Verified Outcome
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {cs.impactMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="rounded bg-slate-950 p-2 border border-slate-800 text-center">
                      <span className="font-mono text-xs font-bold text-cyan-400 block tabular-nums">
                        {m.value}
                      </span>
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-tight">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
