import React, { useState } from 'react';
import { SiteConfig } from '../data/siteConfig';
import { ShieldCheck, Sliders, Menu, X, Edit3, Cloud, ChevronRight, Download } from 'lucide-react';

interface NavbarProps {
  config: SiteConfig;
  onOpenEditor: () => void;
  onOpenDeployGuide: () => void;
  onOpenSizer: () => void;
  onDownloadZip: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  onOpenEditor,
  onOpenDeployGuide,
  onOpenSizer,
  onDownloadZip,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Utility sub-strip for enterprise trust */}
      <div className="hidden border-b border-slate-800/50 bg-slate-900/60 px-6 py-1.5 text-xs text-slate-400 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
              Singapore IT VAR · Vision Exchange, Jurong Lake District
            </span>
            <span className="text-slate-600">|</span>
            <span>Direct Inquiries: <a href={`mailto:${config.company.contact.primaryEmail}`} className="text-cyan-400 hover:underline">{config.company.contact.primaryEmail}</a></span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onDownloadZip}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-white font-medium transition-colors"
              title="Download complete project as a ZIP file for VS Code"
            >
              <Download className="h-3 w-3 text-cyan-400" />
              <span>Download for VS Code (.ZIP)</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenDeployGuide}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Cloudflare Free Tier Deployment & VS Code Instructions"
            >
              <Cloud className="h-3 w-3 text-amber-400" />
              Cloudflare Deploy Docs
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenEditor}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Quickly edit website content in your browser"
            >
              <Edit3 className="h-3 w-3 text-cyan-400" />
              Live Site Editor
            </button>
          </div>
        </div>
      </div>

      {/* Top Bar Contract (Brand, Nav links, 1 Primary CTA) */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-lg tracking-wider shadow-sm">
            JEB
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              JEB Innovations
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              IT & Physical Security VAR
            </span>
          </div>
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {config.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-cyan-400 transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSizer}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            Solution Sizer
          </button>
          <a
            href="#contact"
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-cyan-950"
          >
            Request VAR Quote
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenEditor}
            className="p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800 sm:hidden"
            title="Edit Site Content"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {config.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-medium text-slate-200 hover:text-cyan-400 py-1.5 border-b border-slate-900"
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSizer();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-lg"
              >
                <Sliders className="h-4 w-4 text-cyan-400" />
                Launch Solution Sizer
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
              >
                Request VAR Quote
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadZip();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg shadow-sm"
              >
                <Download className="h-4 w-4" />
                Download Project ZIP for VS Code
              </button>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEditor();
                  }}
                  className="flex-1 py-2 text-[11px] font-medium text-slate-400 bg-slate-900/60 border border-slate-800 rounded-md"
                >
                  Live Site Editor
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDeployGuide();
                  }}
                  className="flex-1 py-2 text-[11px] font-medium text-slate-400 bg-slate-900/60 border border-slate-800 rounded-md"
                >
                  Cloudflare Docs
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
