import React, { useState } from 'react';
import { SiteConfig, initialSiteConfig } from '../data/siteConfig';
import { X, Download, Copy, Check, RotateCcw, Building, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'hero' | 'json'>('company');
  const [draftConfig, setDraftConfig] = useState<SiteConfig>(config);
  const [copied, setCopied] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUpdate = (fieldPath: string, value: any) => {
    setDraftConfig((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const parts = fieldPath.split('.');
      let curr = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        curr = curr[parts[i]];
      }
      curr[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const handleApply = () => {
    onSaveConfig(draftConfig);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleReset = () => {
    setDraftConfig(initialSiteConfig);
    onSaveConfig(initialSiteConfig);
  };

  const generateTsFile = () => {
    return `/**
 * Site Configuration & Content Repository
 * JEB Innovations & Technologies Pte Ltd
 * Exported via JEB Live Site Editor
 */

import { SiteConfig } from './siteConfig';

export const initialSiteConfig: SiteConfig = ${JSON.stringify(draftConfig, null, 2)};
`;
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([generateTsFile()], { type: 'text/typescript' });
    element.href = URL.createObjectURL(file);
    element.download = 'siteConfig.ts';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(draftConfig, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Live Site Content Editor</h3>
              <p className="text-xs text-slate-400">Easily modify company info, contacts, and text without touching code</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedNotice && (
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" /> Live preview updated!
              </span>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 gap-2 pt-2">
          {[
            { id: 'company', label: 'Company & Address' },
            { id: 'contact', label: 'Contacts & Emails' },
            { id: 'hero', label: 'Hero Messaging' },
            { id: 'json', label: 'Raw Config & Export' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'company' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={draftConfig.company.legalName}
                    onChange={(e) => handleUpdate('company.legalName', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Trade / Display Name</label>
                  <input
                    type="text"
                    value={draftConfig.company.tradeName}
                    onChange={(e) => handleUpdate('company.tradeName', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={draftConfig.company.tagline}
                  onChange={(e) => handleUpdate('company.tagline', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Company Description</label>
                <textarea
                  rows={3}
                  value={draftConfig.company.description}
                  onChange={(e) => handleUpdate('company.description', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Headquarters Location</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Building</label>
                    <input
                      type="text"
                      value={draftConfig.company.headquarters.building}
                      onChange={(e) => handleUpdate('company.headquarters.building', e.target.value)}
                      className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Unit</label>
                    <input
                      type="text"
                      value={draftConfig.company.headquarters.unit}
                      onChange={(e) => handleUpdate('company.headquarters.unit', e.target.value)}
                      className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={draftConfig.company.headquarters.postalCode}
                      onChange={(e) => handleUpdate('company.headquarters.postalCode', e.target.value)}
                      className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-xs font-medium text-slate-300 block mb-1">Full Formatted Address</label>
                  <input
                    type="text"
                    value={draftConfig.company.headquarters.fullAddress}
                    onChange={(e) => handleUpdate('company.headquarters.fullAddress', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Primary Email (Jon Bong)</label>
                  <input
                    type="email"
                    value={draftConfig.company.contact.primaryEmail}
                    onChange={(e) => handleUpdate('company.contact.primaryEmail', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white font-mono border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Sales Desk Email</label>
                  <input
                    type="email"
                    value={draftConfig.company.contact.salesEmail}
                    onChange={(e) => handleUpdate('company.contact.salesEmail', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white font-mono border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Main Line Phone</label>
                  <input
                    type="text"
                    value={draftConfig.company.contact.phone}
                    onChange={(e) => handleUpdate('company.contact.phone', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white font-mono border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">WhatsApp Line</label>
                  <input
                    type="text"
                    value={draftConfig.company.contact.whatsapp}
                    onChange={(e) => handleUpdate('company.contact.whatsapp', e.target.value)}
                    className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white font-mono border border-slate-800 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Operating Hours & SLA Notice</label>
                <input
                  type="text"
                  value={draftConfig.company.contact.operatingHours}
                  onChange={(e) => handleUpdate('company.contact.operatingHours', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Hero Kicker (Lead-in)</label>
                <input
                  type="text"
                  value={draftConfig.hero.kicker}
                  onChange={(e) => handleUpdate('hero.kicker', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Hero Main Title</label>
                <input
                  type="text"
                  value={draftConfig.hero.title}
                  onChange={(e) => handleUpdate('hero.title', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Hero Gradient Highlight</label>
                <input
                  type="text"
                  value={draftConfig.hero.highlight}
                  onChange={(e) => handleUpdate('hero.highlight', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={draftConfig.hero.subtitle}
                  onChange={(e) => handleUpdate('hero.subtitle', e.target.value)}
                  className="w-full rounded-lg bg-slate-950 px-3 py-2 text-xs text-white border border-slate-800 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">
                  Full configuration JSON. You can edit this directly or copy/download for your VS Code project.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy JSON'}
                  </button>
                  <button
                    onClick={handleDownloadFile}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs font-semibold text-slate-950"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download siteConfig.ts
                  </button>
                </div>
              </div>
              <textarea
                rows={14}
                value={JSON.stringify(draftConfig, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setDraftConfig(parsed);
                  } catch (err) {
                    // ignore partial json edits
                  }
                }}
                className="w-full rounded-xl bg-slate-950 p-4 font-mono text-xs text-cyan-300 border border-slate-800 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 bg-slate-950">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to Defaults
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              Export siteConfig.ts for VS Code
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-xs font-bold text-slate-950 transition-colors shadow-md shadow-cyan-950"
            >
              Apply Live Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
