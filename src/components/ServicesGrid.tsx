import React, { useState } from 'react';
import { SiteConfig, ServicePillar } from '../data/siteConfig';
import { Server, Camera, KeyRound, ShieldAlert, Cpu, Wrench, Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ServicesGridProps {
  config: SiteConfig;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ config }) => {
  const [filter, setFilter] = useState<'all' | 'it' | 'physical' | 'var_services'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredServices = config.services.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server className="h-6 w-6 text-cyan-400" />;
      case 'Camera':
        return <Camera className="h-6 w-6 text-cyan-400" />;
      case 'KeyRound':
        return <KeyRound className="h-6 w-6 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-6 w-6 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="h-6 w-6 text-cyan-400" />;
      case 'Wrench':
      default:
        return <Wrench className="h-6 w-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
              End-to-End VAR Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineered for Enterprise Reliability
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Turnkey delivery from certified architectural pre-sales to on-premise rack commissioning and rapid-response spares support.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Capabilities ({config.services.length})
            </button>
            <button
              onClick={() => setFilter('it')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'it'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IT Infrastructure
            </button>
            <button
              onClick={() => setFilter('physical')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'physical'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Physical Security
            </button>
            <button
              onClick={() => setFilter('var_services')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'var_services'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VAR Staging & SLA
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">
                      {service.category === 'it' ? 'IT SYSTEMS' : service.category === 'physical' ? 'PHYSICAL SEC' : 'VAR SERVICES'}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Capabilities List */}
                  <div className="mt-4 space-y-2">
                    {service.capabilities.slice(0, isExpanded ? undefined : 3).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                      <p className="text-xs text-slate-300">{service.fullDesc}</p>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1.5">
                          Certified OEM Stacks
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {service.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono rounded bg-slate-950 px-2 py-0.5 text-cyan-300 border border-slate-800">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                    {service.metrics}
                  </span>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    {isExpanded ? 'Less' : 'Details'}
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
