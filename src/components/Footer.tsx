import React from 'react';
import { SiteConfig } from '../data/siteConfig';
import { ShieldCheck, MapPin, Mail, Phone, Edit3, Cloud, ArrowUp, Download } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOpenEditor: () => void;
  onOpenDeployGuide: () => void;
  onDownloadZip: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenEditor,
  onOpenDeployGuide,
  onDownloadZip,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-sm">
                JEB
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {config.company.legalName}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {config.company.description}
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{config.company.headquarters.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${config.company.contact.primaryEmail}`} className="text-cyan-400 hover:underline font-mono">
                  {config.company.contact.primaryEmail}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="font-mono">{config.company.contact.phone}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li><a href="#it-infrastructure" className="hover:text-cyan-400 transition-colors">Enterprise Compute & SAN</a></li>
              <li><a href="#physical-security" className="hover:text-cyan-400 transition-colors">Commercial IP CCTV & VMS</a></li>
              <li><a href="#physical-security" className="hover:text-cyan-400 transition-colors">Biometric Access Control</a></li>
              <li><a href="#it-infrastructure" className="hover:text-cyan-400 transition-colors">Core Switching & Firewalls</a></li>
              <li><a href="#solutions" className="hover:text-cyan-400 transition-colors">Server Room Telemetry</a></li>
              <li><a href="#solution-sizer" className="hover:text-cyan-400 transition-colors">VAR Solution Sizer</a></li>
            </ul>
          </div>

          {/* Col 4: VAR Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              OEM Ecosystem
            </h4>
            <ul className="space-y-2">
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Dell Technologies</a></li>
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Cisco Systems</a></li>
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Milestone Systems</a></li>
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Axis Communications</a></li>
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Suprema Biometrics</a></li>
              <li><a href="#partners" className="hover:text-cyan-400 transition-colors">Softerra LDAP Solutions</a></li>
            </ul>
          </div>

          {/* Col 5: Tools & Deployment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Site Maintenance
            </h4>
            <div className="space-y-2 flex flex-col items-start">
              <button
                onClick={onDownloadZip}
                className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white font-medium transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-cyan-400" />
                Download for VS Code (.ZIP)
              </button>
              <button
                onClick={onOpenEditor}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5 text-cyan-400" />
                Live Content Editor
              </button>
              <button
                onClick={onOpenDeployGuide}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                <Cloud className="h-3.5 w-3.5" />
                Cloudflare Free Tier Docs
              </button>
              <p className="text-[11px] text-slate-500 pt-1 leading-normal">
                Easily update company details or export clean code for VS Code.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {config.company.legalName}. All rights reserved.</span>
            <span>·</span>
            <span>Singapore UEN Registered</span>
            <span>·</span>
            <span className="text-slate-400 font-mono">jeb-int.com</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Back to Top <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
