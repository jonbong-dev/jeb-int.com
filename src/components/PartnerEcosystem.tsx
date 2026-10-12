import React, { useState } from 'react';
import { SiteConfig, VendorPartner } from '../data/siteConfig';
import { Shield, CheckCircle, ExternalLink } from 'lucide-react';

interface PartnerEcosystemProps {
  config: SiteConfig;
}

export const PartnerEcosystem: React.FC<PartnerEcosystemProps> = ({ config }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Brands' },
    { id: 'compute_storage', label: 'Compute & Storage' },
    { id: 'networking_cyber', label: 'Networking & Cyber' },
    { id: 'physical_security', label: 'IP CCTV & VMS' },
    { id: 'access_control', label: 'Biometric Access' },
    { id: 'software', label: 'Software & Directory' },
  ];

  const filteredPartners = config.partners.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="partners" className="py-16 sm:py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            OEM Vendor Relationships
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            Authorized Tier-1 Partner Ecosystem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            JEB holds direct authorized reseller agreements with global hardware and security leaders, providing authentic warranty registration, manufacturer support escalation, and competitive volume pricing.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="mt-8 flex justify-center overflow-x-auto pb-2">
          <div className="inline-flex gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-cyan-500/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-8 flex items-center">
                    <span className="font-mono text-base font-extrabold tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                      {partner.logoText}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 border border-slate-800 rounded px-1.5 py-0.5">
                    {partner.tier}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-200">{partner.name}</h4>
                <p className="mt-1 text-xs text-slate-400 leading-snug">{partner.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="h-3 w-3" /> Genuine OEM
                </span>
                <span className="font-mono text-slate-500 text-[10px]">SG Stock</span>
              </div>
            </div>
          ))}
        </div>

        {/* Software highlight note: e.g. Softerra LDAP, Microsoft */}
        <div className="mt-10 rounded-xl bg-slate-900/50 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Looking for a specific enterprise software or appliance license?</p>
              <p className="text-[11px] text-slate-400">JEB procures and licenses Softerra LDAP Administrator, Microsoft Enterprise, Veeam Backup, Red Hat, and custom appliance warranties.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg whitespace-nowrap transition-colors"
          >
            Check License Availability
          </a>
        </div>
      </div>
    </section>
  );
};
