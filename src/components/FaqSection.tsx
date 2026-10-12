import React, { useState } from 'react';
import { SiteConfig } from '../data/siteConfig';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  config: SiteConfig;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            VAR & Security Integration Insights
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Common questions regarding our IT VAR model, physical security compliance, and procurement timelines.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {config.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-cyan-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
